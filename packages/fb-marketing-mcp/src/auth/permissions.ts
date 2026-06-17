/**
 * Tool Permission Map — Read/Write Access Control
 *
 * Maps each MCP tool to its required permission level.
 * Used by the permission gate in handleApiTool.
 */

export type PermissionLevel = 'read' | 'write';

/**
 * Permission required for each tool.
 * Tools not listed here have no restriction (context tools like get_skill).
 */
export const TOOL_PERMISSIONS: Record<string, PermissionLevel> = {
  // ── Read tools ──
  discover_ad_accounts: 'read',
  list_facebook_pages: 'read',
  get_instagram_account: 'read',
  list_campaigns: 'read',
  get_campaign: 'read',
  list_adsets: 'read',
  get_adset: 'read',
  list_ads: 'read',
  list_campaign_ads: 'read',
  get_ad: 'read',
  list_creatives: 'read',
  get_creative: 'read',
  get_account_insights: 'read',
  get_campaign_insights: 'read',
  get_adset_insights: 'read',
  get_ad_insights: 'read',
  get_attribution_comparison: 'read',
  get_performance_summary: 'read',
  list_campaign_ads_with_insights: 'read',
  list_custom_audiences: 'read',
  get_reach_estimate: 'read',
  list_pixels: 'read',
  get_dataset_quality: 'read',
  search_geolocation: 'read',
  get_video_status: 'read',
  list_value_rule_sets: 'read',
  get_value_rule_set: 'read',
  list_ad_labels: 'read',
  get_budget_schedules: 'read',
  preview_creative: 'read',

  // ── Write tools ──
  create_campaign: 'write',
  update_campaign: 'write',
  pause_campaign: 'write',
  activate_campaign: 'write',
  create_adset: 'write',
  update_adset: 'write',
  pause_adset: 'write',
  activate_adset: 'write',
  create_ad: 'write',
  update_ad: 'write',
  pause_ad: 'write',
  activate_ad: 'write',
  create_creative: 'write',
  create_custom_audience: 'write',
  upload_image: 'write',
  upload_video: 'write',
  create_value_rule_set: 'write',
  update_value_rule_set: 'write',
  delete_value_rule_set: 'write',
  create_ad_label: 'write',
  create_budget_schedule: 'write',
  delete_budget_schedule: 'write',

  // ── Special: execute_api checked dynamically by method ──
};

/**
 * Checks if a user with given permissions can execute a tool.
 *
 * @param toolName - The MCP tool name
 * @param userPermissions - User's permission level ('read' | 'readwrite')
 * @param method - HTTP method for execute_api (GET, POST, DELETE)
 * @returns true if allowed
 */
export function checkPermission(
  toolName: string,
  userPermissions: string,
  method?: string
): boolean {
  // readwrite users can do anything
  if (userPermissions === 'readwrite') return true;

  // Special case: execute_api depends on HTTP method
  if (toolName === 'execute_api') {
    const m = (method || 'GET').toUpperCase();
    return m === 'GET';
  }

  const required = TOOL_PERMISSIONS[toolName];

  // No permission entry = unrestricted (context tools)
  if (!required) return true;

  // read-only user can only use read tools
  return required === 'read';
}
