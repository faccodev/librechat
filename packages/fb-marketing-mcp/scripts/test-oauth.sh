#!/usr/bin/env bash
#
# OAuth 2.0 Integration Tests for fb-marketing-mcp
#
# Usage:
#   ./scripts/test-oauth.sh              # defaults to http://localhost:3000
#   ./scripts/test-oauth.sh 3001         # custom port
#
# Prerequisites:
#   - Server running: node dist/index.js --http --port <port>
#   - DATABASE_URL configured
#   - jq installed
#

PORT="${1:-3000}"
BASE="http://localhost:${PORT}"
PASS=0
FAIL=0
TOTAL=0

# MCP SDK requires both Accept types
MCP_ACCEPT="Accept: application/json, text/event-stream"

# ── Helpers ──

green()  { printf "\033[32m%s\033[0m" "$1"; }
red()    { printf "\033[31m%s\033[0m" "$1"; }
bold()   { printf "\033[1m%s\033[0m" "$1"; }

assert_eq() {
  local label="$1" expected="$2" actual="$3"
  TOTAL=$((TOTAL + 1))
  if [ "$expected" = "$actual" ]; then
    PASS=$((PASS + 1))
    echo "  $(green "PASS") $label"
  else
    FAIL=$((FAIL + 1))
    echo "  $(red "FAIL") $label"
    echo "       expected: $expected"
    echo "       actual:   $actual"
  fi
}

assert_contains() {
  local label="$1" needle="$2" haystack="$3"
  TOTAL=$((TOTAL + 1))
  if echo "$haystack" | grep -q "$needle"; then
    PASS=$((PASS + 1))
    echo "  $(green "PASS") $label"
  else
    FAIL=$((FAIL + 1))
    echo "  $(red "FAIL") $label"
    echo "       expected to contain: $needle"
    echo "       actual: $(echo "$haystack" | head -3)"
  fi
}

assert_not_empty() {
  local label="$1" value="$2"
  TOTAL=$((TOTAL + 1))
  if [ -n "$value" ] && [ "$value" != "null" ]; then
    PASS=$((PASS + 1))
    echo "  $(green "PASS") $label"
  else
    FAIL=$((FAIL + 1))
    echo "  $(red "FAIL") $label (was empty or null)"
  fi
}

# Extract JSON from MCP SSE response (data: {...} lines)
parse_sse() {
  grep '^data: ' | sed 's/^data: //' | head -1
}

# ── Check server ──

echo ""
echo "$(bold "Testing OAuth 2.0 on $BASE")"
echo "─────────────────────────────────────"

if ! curl -s --max-time 5 "$BASE/health" > /dev/null 2>&1; then
  echo "$(red "ERROR:") Server not reachable at $BASE"
  echo "  Start it with: node dist/index.js --http --port $PORT"
  exit 1
fi
echo "$(green "Server is up.")"
echo ""

# ══════════════════════════════════════════════
# 1. Well-Known Endpoints
# ══════════════════════════════════════════════
echo "$(bold "1. Well-Known Endpoints")"

RESOURCE_META=$(curl -s --max-time 5 "$BASE/.well-known/oauth-protected-resource")
assert_eq "oauth-protected-resource returns resource" "$BASE" "$(echo "$RESOURCE_META" | jq -r '.resource')"
assert_contains "has authorization_servers" "$BASE" "$(echo "$RESOURCE_META" | jq -r '.authorization_servers[0]')"

AUTH_SERVER_META=$(curl -s --max-time 5 "$BASE/.well-known/oauth-authorization-server")
assert_eq "authorization_endpoint" "$BASE/oauth/authorize" "$(echo "$AUTH_SERVER_META" | jq -r '.authorization_endpoint')"
assert_eq "token_endpoint" "$BASE/oauth/token" "$(echo "$AUTH_SERVER_META" | jq -r '.token_endpoint')"
assert_eq "registration_endpoint" "$BASE/oauth/register" "$(echo "$AUTH_SERVER_META" | jq -r '.registration_endpoint')"
assert_contains "code_challenge S256" "S256" "$(echo "$AUTH_SERVER_META" | jq -r '.code_challenge_methods_supported[]')"

echo ""

# ══════════════════════════════════════════════
# 2. Dynamic Client Registration
# ══════════════════════════════════════════════
echo "$(bold "2. Dynamic Client Registration")"

REG_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/register" \
  -H "Content-Type: application/json" \
  -d '{"client_name":"Test OAuth Client","redirect_uris":["http://localhost:9999/callback"],"grant_types":["authorization_code","refresh_token"]}')

CLIENT_ID=$(echo "$REG_RESPONSE" | jq -r '.client_id')
CLIENT_SECRET=$(echo "$REG_RESPONSE" | jq -r '.client_secret')

assert_not_empty "client_id returned" "$CLIENT_ID"
assert_not_empty "client_secret returned" "$CLIENT_SECRET"
assert_eq "client_name echoed" "Test OAuth Client" "$(echo "$REG_RESPONSE" | jq -r '.client_name')"

echo "  → client_id=$CLIENT_ID"
echo ""

# ══════════════════════════════════════════════
# 3. PKCE Generation
# ══════════════════════════════════════════════
echo "$(bold "3. PKCE Challenge Generation")"

CODE_VERIFIER=$(openssl rand -base64 32 | tr -d '=' | tr '+/' '-_')
CODE_CHALLENGE=$(printf '%s' "$CODE_VERIFIER" | openssl dgst -sha256 -binary | openssl base64 | tr -d '=' | tr '+/' '-_')

assert_not_empty "code_verifier generated" "$CODE_VERIFIER"
assert_not_empty "code_challenge generated" "$CODE_CHALLENGE"
echo "  → verifier=$CODE_VERIFIER"
echo "  → challenge=$CODE_CHALLENGE"
echo ""

# ══════════════════════════════════════════════
# 4. Login Page (GET /oauth/authorize)
# ══════════════════════════════════════════════
echo "$(bold "4. Login Page Renders")"

LOGIN_PAGE=$(curl -s --max-time 5 "$BASE/oauth/authorize?response_type=code&client_id=$CLIENT_ID&redirect_uri=http://localhost:9999/callback&code_challenge=$CODE_CHALLENGE&code_challenge_method=S256&state=test123&scope=ads_management")

assert_contains "HTML contains form" 'method="POST"' "$LOGIN_PAGE"
assert_contains "HTML contains email field" 'name="email"' "$LOGIN_PAGE"
assert_contains "HTML contains password field" 'name="password"' "$LOGIN_PAGE"
assert_contains "HTML contains hidden client_id" "value=\"$CLIENT_ID\"" "$LOGIN_PAGE"

echo ""

# ══════════════════════════════════════════════
# 5. Register User + Get Auth Code
# ══════════════════════════════════════════════
echo "$(bold "5. Register User → Auth Code")"

TEST_EMAIL="test-oauth-$(date +%s)@example.com"
TEST_PASSWORD="securepassword123"

REGISTER_HEADERS=$(curl -s --max-time 5 -D - -o /dev/null -X POST "$BASE/oauth/authorize" \
  -d "email=$TEST_EMAIL" \
  -d "password=$TEST_PASSWORD" \
  -d "action=register" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "code_challenge=$CODE_CHALLENGE" \
  -d "code_challenge_method=S256" \
  -d "state=test123" \
  -d "scope=ads_management")

LOCATION=$(echo "$REGISTER_HEADERS" | grep -i "^location:" | tr -d '\r' | head -1)
assert_contains "redirect goes to /oauth/settings" "/oauth/settings" "$LOCATION"
assert_contains "redirect contains code=" "code=" "$LOCATION"

# Extract auth code from Location header (settings redirect)
AUTH_CODE=$(echo "$LOCATION" | sed 's/.*code=\([^&]*\).*/\1/' | sed 's/&.*//')
assert_not_empty "auth code extracted" "$AUTH_CODE"
echo "  → code=$AUTH_CODE"
echo ""

# ══════════════════════════════════════════════
# 6. Token Exchange (authorization_code + PKCE)
# ══════════════════════════════════════════════
echo "$(bold "6. Token Exchange")"

TOKEN_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/token" \
  -H "Content-Type: application/json" \
  -d "{\"grant_type\":\"authorization_code\",\"code\":\"$AUTH_CODE\",\"redirect_uri\":\"http://localhost:9999/callback\",\"code_verifier\":\"$CODE_VERIFIER\",\"client_id\":\"$CLIENT_ID\",\"client_secret\":\"$CLIENT_SECRET\"}")

ACCESS_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.access_token')
REFRESH_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.refresh_token')

assert_not_empty "access_token returned" "$ACCESS_TOKEN"
assert_not_empty "refresh_token returned" "$REFRESH_TOKEN"
assert_eq "token_type is bearer" "bearer" "$(echo "$TOKEN_RESPONSE" | jq -r '.token_type')"
assert_eq "expires_in is 3600" "3600" "$(echo "$TOKEN_RESPONSE" | jq -r '.expires_in')"
assert_eq "scope is ads_management" "ads_management" "$(echo "$TOKEN_RESPONSE" | jq -r '.scope')"

echo "  → access_token=${ACCESS_TOKEN:0:20}..."
echo ""

# ══════════════════════════════════════════════
# 7. Auth Code Reuse → Error
# ══════════════════════════════════════════════
echo "$(bold "7. Auth Code Reuse → Error")"

REUSE_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/token" \
  -H "Content-Type: application/json" \
  -d "{\"grant_type\":\"authorization_code\",\"code\":\"$AUTH_CODE\",\"redirect_uri\":\"http://localhost:9999/callback\",\"code_verifier\":\"$CODE_VERIFIER\",\"client_id\":\"$CLIENT_ID\"}")

assert_eq "reuse returns invalid_grant" "invalid_grant" "$(echo "$REUSE_RESPONSE" | jq -r '.error')"

echo ""

# ══════════════════════════════════════════════
# 8. Wrong PKCE Verifier → Error
# ══════════════════════════════════════════════
echo "$(bold "8. Wrong PKCE Verifier → Error")"

# Generate new PKCE pair + auth code for this test
CODE_VERIFIER2=$(openssl rand -base64 32 | tr -d '=' | tr '+/' '-_')
CODE_CHALLENGE2=$(printf '%s' "$CODE_VERIFIER2" | openssl dgst -sha256 -binary | openssl base64 | tr -d '=' | tr '+/' '-_')

REGISTER_HEADERS2=$(curl -s --max-time 5 -D - -o /dev/null -X POST "$BASE/oauth/authorize" \
  -d "email=$TEST_EMAIL" \
  -d "password=$TEST_PASSWORD" \
  -d "action=login" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "code_challenge=$CODE_CHALLENGE2" \
  -d "code_challenge_method=S256" \
  -d "state=pkce-test" \
  -d "scope=ads_read")

LOCATION2=$(echo "$REGISTER_HEADERS2" | grep -i "^location:" | tr -d '\r' | head -1)
AUTH_CODE2=$(echo "$LOCATION2" | sed 's/.*code=\([^&]*\).*/\1/' | sed 's/&.*//')

WRONG_PKCE_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/token" \
  -H "Content-Type: application/json" \
  -d "{\"grant_type\":\"authorization_code\",\"code\":\"$AUTH_CODE2\",\"redirect_uri\":\"http://localhost:9999/callback\",\"code_verifier\":\"wrong-verifier-value\",\"client_id\":\"$CLIENT_ID\"}")

assert_eq "wrong PKCE returns invalid_grant" "invalid_grant" "$(echo "$WRONG_PKCE_RESPONSE" | jq -r '.error')"

echo ""

# ══════════════════════════════════════════════
# 9. Bearer Token on /mcp
# ══════════════════════════════════════════════
echo "$(bold "9. Bearer Token on /mcp")"

MCP_RESPONSE=$(curl -s --max-time 10 -X POST "$BASE/mcp" \
  -H "Content-Type: application/json" \
  -H "$MCP_ACCEPT" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"oauth-test","version":"1.0"}}}')

# Response is SSE format: "event: message\ndata: {...}\n"
MCP_JSON=$(echo "$MCP_RESPONSE" | parse_sse)

assert_contains "MCP returns serverInfo" "serverInfo" "$MCP_JSON"
assert_contains "MCP returns protocolVersion" "protocolVersion" "$MCP_JSON"

echo ""

# ══════════════════════════════════════════════
# 10. Invalid Bearer → 401 + WWW-Authenticate
# ══════════════════════════════════════════════
echo "$(bold "10. Invalid Bearer → 401 + WWW-Authenticate")"

INVALID_HEADERS=$(curl -s --max-time 5 -D - -o /dev/null -X POST "$BASE/mcp" \
  -H "Content-Type: application/json" \
  -H "$MCP_ACCEPT" \
  -H "Authorization: Bearer invalid-token-xxx" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}')

assert_contains "returns 401" "401" "$INVALID_HEADERS"
assert_contains "has WWW-Authenticate header" "WWW-Authenticate" "$INVALID_HEADERS"
assert_contains "points to resource metadata" "oauth-protected-resource" "$INVALID_HEADERS"

echo ""

# ══════════════════════════════════════════════
# 11. Refresh Token Rotation
# ══════════════════════════════════════════════
echo "$(bold "11. Refresh Token Rotation")"

REFRESH_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/token" \
  -H "Content-Type: application/json" \
  -d "{\"grant_type\":\"refresh_token\",\"refresh_token\":\"$REFRESH_TOKEN\",\"client_id\":\"$CLIENT_ID\"}")

NEW_ACCESS=$(echo "$REFRESH_RESPONSE" | jq -r '.access_token')
NEW_REFRESH=$(echo "$REFRESH_RESPONSE" | jq -r '.refresh_token')

assert_not_empty "new access_token returned" "$NEW_ACCESS"
assert_not_empty "new refresh_token returned" "$NEW_REFRESH"

# Verify old refresh token no longer works
OLD_REFRESH_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/token" \
  -H "Content-Type: application/json" \
  -d "{\"grant_type\":\"refresh_token\",\"refresh_token\":\"$REFRESH_TOKEN\",\"client_id\":\"$CLIENT_ID\"}")

assert_eq "old refresh_token rejected" "invalid_grant" "$(echo "$OLD_REFRESH_RESPONSE" | jq -r '.error')"

# Verify new token works on /mcp
MCP_NEW=$(curl -s --max-time 10 -X POST "$BASE/mcp" \
  -H "Content-Type: application/json" \
  -H "$MCP_ACCEPT" \
  -H "Authorization: Bearer $NEW_ACCESS" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"oauth-refresh-test","version":"1.0"}}}')

MCP_NEW_JSON=$(echo "$MCP_NEW" | parse_sse)
assert_contains "new token works on /mcp" "serverInfo" "$MCP_NEW_JSON"

echo ""

# ══════════════════════════════════════════════
# 12. Login with Wrong Password → Error
# ══════════════════════════════════════════════
echo "$(bold "12. Wrong Password → Error")"

WRONG_PW_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/authorize" \
  -d "email=$TEST_EMAIL" \
  -d "password=wrongpassword" \
  -d "action=login" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "code_challenge=$CODE_CHALLENGE" \
  -d "code_challenge_method=S256" \
  -d "state=test" \
  -d "scope=ads_read")

assert_contains "error message shown" "Invalid email or password" "$WRONG_PW_RESPONSE"

echo ""

# ══════════════════════════════════════════════
# 13. Duplicate Registration → Error
# ══════════════════════════════════════════════
echo "$(bold "13. Duplicate Email Registration → Error")"

DUP_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE/oauth/authorize" \
  -d "email=$TEST_EMAIL" \
  -d "password=anotherpass123" \
  -d "action=register" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "code_challenge=$CODE_CHALLENGE" \
  -d "code_challenge_method=S256" \
  -d "state=test" \
  -d "scope=ads_read")

assert_contains "shows already exists message" "already exists" "$DUP_RESPONSE"

echo ""

# ══════════════════════════════════════════════
# 14. Health Endpoint (public, no auth)
# ══════════════════════════════════════════════
echo "$(bold "14. Health Endpoint (no auth required)")"

HEALTH=$(curl -s --max-time 5 "$BASE/health")
assert_eq "health returns ok" "ok" "$(echo "$HEALTH" | jq -r '.status')"

echo ""

# ══════════════════════════════════════════════
# 15. Settings Page Renders (GET /oauth/settings)
# ══════════════════════════════════════════════
echo "$(bold "15. Settings Page Renders")"

# Generate a fresh auth code for settings tests
CODE_VERIFIER3=$(openssl rand -base64 32 | tr -d '=' | tr '+/' '-_')
CODE_CHALLENGE3=$(printf '%s' "$CODE_VERIFIER3" | openssl dgst -sha256 -binary | openssl base64 | tr -d '=' | tr '+/' '-_')

SETTINGS_AUTH_HEADERS=$(curl -s --max-time 5 -D - -o /dev/null -X POST "$BASE/oauth/authorize" \
  -d "email=$TEST_EMAIL" \
  -d "password=$TEST_PASSWORD" \
  -d "action=login" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "code_challenge=$CODE_CHALLENGE3" \
  -d "code_challenge_method=S256" \
  -d "state=settings-test" \
  -d "scope=ads_management")

SETTINGS_LOCATION=$(echo "$SETTINGS_AUTH_HEADERS" | grep -i "^location:" | tr -d '\r' | head -1)
SETTINGS_CODE=$(echo "$SETTINGS_LOCATION" | sed 's/.*code=\([^&]*\).*/\1/' | sed 's/&.*//')

SETTINGS_PAGE=$(curl -s --max-time 5 "$BASE/oauth/settings?code=$SETTINGS_CODE&redirect_uri=http://localhost:9999/callback&state=settings-test")

assert_contains "settings page has Meta token field" 'name="meta_access_token"' "$SETTINGS_PAGE"
assert_contains "settings page has Ad Account field" 'name="meta_ad_account_id"' "$SETTINGS_PAGE"
assert_contains "settings page has hidden code" "value=\"$SETTINGS_CODE\"" "$SETTINGS_PAGE"
assert_contains "settings page has Save button" "Save" "$SETTINGS_PAGE"

echo ""

# ══════════════════════════════════════════════
# 16. Settings Save Token + Redirect (POST /oauth/settings)
# ══════════════════════════════════════════════
echo "$(bold "16. Settings Save Token + Redirect")"

# Generate another auth code
CODE_VERIFIER4=$(openssl rand -base64 32 | tr -d '=' | tr '+/' '-_')
CODE_CHALLENGE4=$(printf '%s' "$CODE_VERIFIER4" | openssl dgst -sha256 -binary | openssl base64 | tr -d '=' | tr '+/' '-_')

SAVE_AUTH_HEADERS=$(curl -s --max-time 5 -D - -o /dev/null -X POST "$BASE/oauth/authorize" \
  -d "email=$TEST_EMAIL" \
  -d "password=$TEST_PASSWORD" \
  -d "action=login" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "code_challenge=$CODE_CHALLENGE4" \
  -d "code_challenge_method=S256" \
  -d "state=save-test" \
  -d "scope=ads_management")

SAVE_LOCATION=$(echo "$SAVE_AUTH_HEADERS" | grep -i "^location:" | tr -d '\r' | head -1)
SAVE_CODE=$(echo "$SAVE_LOCATION" | sed 's/.*code=\([^&]*\).*/\1/' | sed 's/&.*//')

SAVE_HEADERS=$(curl -s --max-time 5 -D - -o /dev/null -X POST "$BASE/oauth/settings" \
  -d "meta_access_token=EAAtest123faketoken" \
  -d "meta_ad_account_id=act_999888777" \
  -d "code=$SAVE_CODE" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "state=save-test")

SAVE_REDIRECT=$(echo "$SAVE_HEADERS" | grep -i "^location:" | tr -d '\r' | head -1)
assert_contains "save redirects to callback" "localhost:9999/callback" "$SAVE_REDIRECT"
assert_contains "save redirect has code" "code=$SAVE_CODE" "$SAVE_REDIRECT"
assert_contains "save redirect has state" "state=save-test" "$SAVE_REDIRECT"

echo ""

# ══════════════════════════════════════════════
# 17. Settings Shows Existing Token After Save
# ══════════════════════════════════════════════
echo "$(bold "17. Settings Shows Existing Token")"

# Generate yet another auth code
CODE_VERIFIER5=$(openssl rand -base64 32 | tr -d '=' | tr '+/' '-_')
CODE_CHALLENGE5=$(printf '%s' "$CODE_VERIFIER5" | openssl dgst -sha256 -binary | openssl base64 | tr -d '=' | tr '+/' '-_')

EXIST_AUTH_HEADERS=$(curl -s --max-time 5 -D - -o /dev/null -X POST "$BASE/oauth/authorize" \
  -d "email=$TEST_EMAIL" \
  -d "password=$TEST_PASSWORD" \
  -d "action=login" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=http://localhost:9999/callback" \
  -d "code_challenge=$CODE_CHALLENGE5" \
  -d "code_challenge_method=S256" \
  -d "state=exist-test" \
  -d "scope=ads_management")

EXIST_LOCATION=$(echo "$EXIST_AUTH_HEADERS" | grep -i "^location:" | tr -d '\r' | head -1)
EXIST_CODE=$(echo "$EXIST_LOCATION" | sed 's/.*code=\([^&]*\).*/\1/' | sed 's/&.*//')

EXIST_PAGE=$(curl -s --max-time 5 "$BASE/oauth/settings?code=$EXIST_CODE&redirect_uri=http://localhost:9999/callback&state=exist-test")

assert_contains "shows current token configured" "Current token configured" "$EXIST_PAGE"
assert_contains "shows masked token" "EAA...xxxx" "$EXIST_PAGE"
assert_contains "shows masked ad account" "act_" "$EXIST_PAGE"
assert_contains "has continue without changes link" "Continue without changes" "$EXIST_PAGE"
assert_contains "has keep current token helper" "Leave blank to keep current token" "$EXIST_PAGE"

echo ""

# ══════════════════════════════════════════════
# Results
# ══════════════════════════════════════════════
echo "═══════════════════════════════════════"
if [ "$FAIL" -eq 0 ]; then
  echo "$(green "ALL $TOTAL TESTS PASSED")"
else
  echo "$(red "$FAIL FAILED") / $TOTAL total ($(green "$PASS passed"))"
fi
echo "═══════════════════════════════════════"
echo ""

exit "$FAIL"
