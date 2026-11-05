// Encrypts private/projects.json -> projects.enc.json (the only copy that gets committed).
// Usage: PROJECTS_PASSWORD='...' node tools/encrypt-projects.mjs
import { webcrypto as crypto } from 'node:crypto';
import fs from 'node:fs';

const password = process.env.PROJECTS_PASSWORD;
if (!password || password.length < 12) throw new Error('Set PROJECTS_PASSWORD (12+ chars)');

const b64 = (buf) => Buffer.from(buf).toString('base64');
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const iterations = 600000;

const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, base,
    { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
// {{web/x.webp}} in projects.json becomes a data URI, so images live inside the ciphertext
const source = fs.readFileSync('private/projects.json', 'utf8').replace(/\{\{([^}]+)\}\}/g, (_, file) =>
    `data:${file.endsWith('.mp4') ? 'video/mp4' : 'image/webp'};base64,${fs.readFileSync(`private/media/${file}`).toString('base64')}`);
JSON.parse(source); // fail here, not in the visitor's browser
const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(source));

fs.writeFileSync('projects.enc.json', JSON.stringify({ iterations, salt: b64(salt), iv: b64(iv), ct: b64(ct) }));
console.log('Wrote projects.enc.json');
