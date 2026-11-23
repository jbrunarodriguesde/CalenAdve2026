import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { available, dayFrom } from '../lib/calendar.js';

const mime = { jpg:'image/jpeg', jpeg:'image/jpeg', png:'image/png', webp:'image/webp' };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET') return res.status(405).end();
  const search = new URL(req.url, 'http://localhost').searchParams;
  const day = dayFrom(search.get('day'));
  const type = search.get('type');
  if (!day || !['photo','caption'].includes(type)) return res.status(400).end();
  if (day > available()) return res.status(403).send('Lembrança ainda fechada');
  const name = String(day).padStart(2, '0');
  if (type === 'caption') {
    try {
      const data = JSON.parse(await readFile(path.join(process.cwd(),'legendas',name+'.json'),'utf8'));
      return res.status(200).json({ caption: typeof data.caption==='string'?data.caption:'', alt:typeof data.alt==='string'?data.alt:'' });
    } catch { return res.status(200).json({}); }
  }
  try {
    const folder = path.join(process.cwd(),'fotos');
    const files = await readdir(folder);
    const filename = files.find(f => f.slice(0,2) === name && /^\d{2}\.(jpe?g|png|webp)$/i.test(f));
    if (!filename) return res.status(404).send('Foto não encontrada');
    const content = await readFile(path.join(folder,filename));
    res.setHeader('Content-Type',mime[filename.split('.').pop().toLowerCase()]);
    return res.status(200).send(content);
  } catch { return res.status(404).send('Foto não encontrada'); }
}
