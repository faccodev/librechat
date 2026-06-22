/**
 * Phase 1: Discord webhook feedback only. Telegram lands in phase 2.
 *
 * Why a dedicated feedback module: the executor should not know how to
 * talk to Discord directly — it just hands off the run summary. This
 * keeps the executor easy to test and lets us add Telegram / Slack /
 * webhook-generic later by extending this module.
 */
import { logger } from '@librechat/data-schemas';

const DISCORD_MAX_MESSAGE_LENGTH = 2000;

/**
 * Truncates `text` to fit Discord's 2000-char message limit. If the
 * original is longer, appends `[... truncated, full output is N chars]`
 * so operators know the result was clipped.
 */
function clampToDiscordLimit(text: string): string {
  if (text.length <= DISCORD_MAX_MESSAGE_LENGTH) {
    return text;
  }
  const marker = `\n\n[... truncated, full output is ${text.length} chars]`;
  const budget = DISCORD_MAX_MESSAGE_LENGTH - marker.length;
  return text.slice(0, Math.max(0, budget)) + marker;
}

/**
 * Posts a run summary to a Discord incoming webhook. The webhook URL is
 * the value stored on `cronjob.feedback.discordWebhookUrl`.
 *
 * Discord expects `application/json` with at least `{ content: string }`.
 * We send a single message; long outputs are clamped to 2000 chars (the
 * platform hard limit per message).
 *
 * Failures are logged but never thrown — feedback is best-effort and
 * must not affect the recorded run status. Network errors, non-2xx
 * responses, and validation errors all funnel to `logger.error`.
 */
export async function sendDiscordWebhook(params: {
  webhookUrl: string;
  jobName: string;
  status: 'success' | 'error';
  output: string;
  error?: string | null;
  durationMs?: number | null;
  provider?: string | null;
  model?: string | null;
}): Promise<void> {
  const statusEmoji = params.status === 'success' ? '✅' : '❌';
  const lines: string[] = [
    `${statusEmoji} **CronJob:** ${params.jobName}`,
    `**Status:** ${params.status}`,
  ];
  if (params.provider) {
    lines.push(`**Provider/Model:** ${params.provider}${params.model ? ` / ${params.model}` : ''}`);
  }
  if (params.durationMs != null) {
    const seconds = (params.durationMs / 1000).toFixed(1);
    lines.push(`**Duration:** ${seconds}s`);
  }
  if (params.status === 'error' && params.error) {
    lines.push(`**Error:**`, '```', params.error.slice(0, 1500), '```');
  } else if (params.output) {
    lines.push('**Output:**', '```', params.output.slice(0, 1500), '```');
  }
  const body = clampToDiscordLimit(lines.join('\n'));

  try {
    const res = await fetch(params.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: body }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      logger.error(
        `[cronjobs.feedback] Discord webhook returned ${res.status} for job "${params.jobName}": ${text}`,
      );
    }
  } catch (err) {
    logger.error(
      `[cronjobs.feedback] Discord webhook request failed for job "${params.jobName}":`,
      err,
    );
  }
}

/**
 * Dispatches a run summary to the cronjob's configured feedback channels.
 * Phase 1 supports Discord webhooks only. Returns silently when no
 * channel is configured.
 */
export async function dispatchFeedback(params: {
  feedback: { discordWebhookUrl?: string | null };
  jobName: string;
  status: 'success' | 'error';
  output: string;
  error?: string | null;
  durationMs?: number | null;
  provider?: string | null;
  model?: string | null;
}): Promise<void> {
  const { discordWebhookUrl } = params.feedback;
  if (!discordWebhookUrl) {
    return;
  }
  await sendDiscordWebhook({
    webhookUrl: discordWebhookUrl,
    jobName: params.jobName,
    status: params.status,
    output: params.output,
    error: params.error,
    durationMs: params.durationMs,
    provider: params.provider,
    model: params.model,
  });
}
