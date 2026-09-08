import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// The production bundle is ESM (.js), while `dev` runs this source file through
// tsx. Use the project working directory for the bundled server so the sibling
// Vite `dist` directory resolves consistently in Hostinger's Node app.
const moduleDir = process.cwd();

const AI_ROUTER_BASE_URL = (process.env.AI_ROUTER_BASE_URL || 'https://getjobready-ai-proxy.mnijhara.workers.dev').replace(/\/$/, '');
const AI_ROUTER_MODEL = process.env.AI_ROUTER_MODEL || 'gemini-2.5-flash';
const AI_ROUTER_TIMEOUT_MS = Number(process.env.AI_ROUTER_TIMEOUT_MS || 30000);
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

const RATE_WINDOW_MS = 60_000;
const AI_REQUESTS_PER_WINDOW = 30;
const LEAD_REQUESTS_PER_WINDOW = 10;
const MAX_RATE_BUCKETS = 5_000;
const rateBuckets = new Map<string, { startedAt: number; count: number }>();
