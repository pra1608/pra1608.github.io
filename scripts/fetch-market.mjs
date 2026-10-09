// Fetches NIFTY 50, India 10Y G-Sec yield and USD/INR into data/market.json.
// Runs in GitHub Actions (Node 20+, no dependencies). The quote endpoints are
// unofficial and block browser CORS, which is why this runs server-side.
// A source that fails keeps the previous value instead of blanking the strip.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const OUT = new URL('../data/market.json', import.meta.url);
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; pra1608-portfolio/1.0)' };

const ITEMS = {
  nifty:  { label: 'NIFTY 50',       cnbc: '.NSEI',    yahoo: '^NSEI', min: 1000, max: 1e6 },
  gsec:   { label: 'IN 10Y G-Sec',   cnbc: 'IN10Y-IN', yahoo: null,    min: 0.5,  max: 20 },
  usdinr: { label: 'USD/INR',        cnbc: 'INR=',     yahoo: 'INR=X', min: 30,   max: 500 }
};

const num = (s) => {
  const n = parseFloat(String(s ?? '').replace(/[^0-9.+-]/g, ''));
  return Number.isFinite(n) ? n : null;
};
const iso = (s) => {
  const d = new Date(String(s ?? '').replace(/([+-]\d{2})(\d{2})$/, '$1:$2'));
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

async function getJson(url){
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(15000) });
  if(!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fromCnbc(symbols){
  const url = 'https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols='
    + encodeURIComponent(symbols.join('|'))
    + '&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json';
  const data = await getJson(url);
  let quotes = data?.FormattedQuoteResult?.FormattedQuote ?? [];
  if(!Array.isArray(quotes)) quotes = [quotes];
  const out = {};
  for(const q of quotes){
    out[q.symbol] = { value: num(q.last), change: num(q.change) ?? 0, changePct: num(q.change_pct) ?? 0, asOf: iso(q.last_time) };
  }
  return out;
}

async function fromYahoo(symbol){
  const data = await getJson(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=5m`);
  const m = data?.chart?.result?.[0]?.meta;
  if(!m) throw new Error(`No Yahoo data for ${symbol}`);
  const value = m.regularMarketPrice, prev = m.chartPreviousClose ?? m.previousClose;
  return {
    value,
    change: prev ? value - prev : 0,
    changePct: prev ? (value / prev - 1) * 100 : 0,
    asOf: m.regularMarketTime ? new Date(m.regularMarketTime * 1000).toISOString() : null
  };
}

const valid = (q, item) => q && q.value !== null && q.value >= item.min && q.value <= item.max;

let previous = { items: {} };
try{ previous = JSON.parse(await readFile(OUT, 'utf8')); }catch{ /* first run */ }

let cnbc = {};
try{ cnbc = await fromCnbc(Object.values(ITEMS).map(i => i.cnbc)); }
catch(e){ console.log(`::warning::CNBC fetch failed: ${e.message}`); }

const items = {};
let fresh = 0;
for(const [key, item] of Object.entries(ITEMS)){
  let q = cnbc[item.cnbc];
  if(!valid(q, item) && item.yahoo){
    try{ q = await fromYahoo(item.yahoo); }
    catch(e){ console.log(`::warning::Yahoo fetch failed for ${item.yahoo}: ${e.message}`); }
  }
  if(valid(q, item)){
    items[key] = { label: item.label, ...q, asOf: q.asOf ?? new Date().toISOString() };
    fresh++;
  } else if(previous.items?.[key]){
    console.log(`::warning::Keeping previous value for ${key}`);
    items[key] = previous.items[key];
  }
}

if(!fresh){
  console.log('::warning::No source returned fresh data; market.json left unchanged.');
  process.exit(0);
}
await mkdir(new URL('.', OUT), { recursive: true });
await writeFile(OUT, JSON.stringify({ updated: new Date().toISOString(), items }, null, 2) + '\n');
console.log(JSON.stringify(items, null, 2));
