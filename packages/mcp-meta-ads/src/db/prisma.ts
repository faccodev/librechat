/**
 * Prisma Client Singleton
 *
 * Lazy initialization — only connects when first called.
 * In stdio mode, this is never called (no DB needed).
 * Uses @prisma/adapter-pg for Prisma v7 driver adapter requirement.
 */

import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

let prisma: PrismaClient | null = null;

/**
 * Returns the Prisma Client singleton, creating it on first call.
 */
export function getPrisma(): PrismaClient {
  if (!prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is required to use database features');
    }
    const adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}

/**
 * Returns true if DATABASE_URL is configured.
 */
export function isDatabaseConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

/**
 * Disconnects the Prisma Client (for graceful shutdown).
 */
export async function disconnectPrisma(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
}
