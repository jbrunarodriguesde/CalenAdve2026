// The server clock, not the visitor's device, decides which days can open.
export function available(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const { year, month, day } = Object.fromEntries(parts.map(p => [p.type, p.value]));
  if (year < '2026' || (year === '2026' && month < '12')) return 0;
  return year > '2026' ? 31 : Number(day);
}

export function dayFrom(value) {
  if (typeof value !== 'string' || !/^\d{1,2}$/.test(value)) return null;
  const day = Number(value);
  return day >= 1 && day <= 31 ? day : null;
}
