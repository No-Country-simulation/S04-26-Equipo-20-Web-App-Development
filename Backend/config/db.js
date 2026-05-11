import { PrismaClient } from '../generated/prisma/client.ts'; // Ruta relativa al archivo generado
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DB_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });