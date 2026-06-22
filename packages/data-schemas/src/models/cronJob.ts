import cronJobSchema from '~/schema/cronJob';
import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import type { ICronJobDocument } from '~/types/cronjobs';

export function createCronJobModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(cronJobSchema);
  return (
    mongoose.models.CronJob || mongoose.model<ICronJobDocument>('CronJob', cronJobSchema)
  );
}
