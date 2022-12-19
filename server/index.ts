import express from 'express';
import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import * as trpc from '@trpc/server';
import { z } from 'zod';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const t = trpc.initTRPC.create();

const appRouter = t.router({
	hello: t.procedure
		.input(z.string())
		.output(z.string())
		.query((inp) => {
			return `Hello ${inp}`;
		}),
	getUsers: t.procedure.query(() => {
		return prisma.user.findMany();
	}),
});

export type AppRouter = typeof appRouter;

await prisma.$connect();
console.log(chalk.blue('[DATABASE]: Connected!'));

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(3000, () => {
	console.log(chalk.green(`[SERVER]: Listening on port 3000`));
});

process.on('exit', () => {
	console.log(chalk.red('[SERVER]: Shutting down...'));
	prisma.$disconnect();
});
