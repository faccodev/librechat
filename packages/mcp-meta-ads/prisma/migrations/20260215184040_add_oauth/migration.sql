-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_hash" TEXT;

-- CreateTable
CREATE TABLE "oauth_clients" (
    "id" TEXT NOT NULL,
    "client_secret" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "redirect_uris" TEXT[],
    "grant_types" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oauth_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorization_codes" (
    "code" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "redirect_uri" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT '',
    "code_challenge" TEXT NOT NULL,
    "code_challenge_method" TEXT NOT NULL DEFAULT 'S256',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "authorization_codes_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "oauth_access_tokens" (
    "token" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT '',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oauth_access_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE INDEX "authorization_codes_client_id_idx" ON "authorization_codes"("client_id");

-- CreateIndex
CREATE INDEX "authorization_codes_user_id_idx" ON "authorization_codes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_access_tokens_refresh_token_key" ON "oauth_access_tokens"("refresh_token");

-- CreateIndex
CREATE INDEX "oauth_access_tokens_client_id_idx" ON "oauth_access_tokens"("client_id");

-- CreateIndex
CREATE INDEX "oauth_access_tokens_user_id_idx" ON "oauth_access_tokens"("user_id");

-- CreateIndex
CREATE INDEX "oauth_access_tokens_refresh_token_idx" ON "oauth_access_tokens"("refresh_token");

-- AddForeignKey
ALTER TABLE "authorization_codes" ADD CONSTRAINT "authorization_codes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "oauth_clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorization_codes" ADD CONSTRAINT "authorization_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauth_access_tokens" ADD CONSTRAINT "oauth_access_tokens_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "oauth_clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauth_access_tokens" ADD CONSTRAINT "oauth_access_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
