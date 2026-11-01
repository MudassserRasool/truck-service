// Structural query evidence only: no requests, scalar values or raw URLs saved.
import {summarizeText} from './evidence-utils.mjs';

export function summarizeQuery(rawUrl) {
  let url;
  try { url = new URL(rawUrl); } catch { return {availability:'unavailable',reason:'URL unavailable'}; }
  if (!url.search) return {availability:'not-present',reason:'No query in observed request URL'};
  const groups = new Map();
  for (const [key,value] of url.searchParams) {
    let parsed=value;
    if (/^[\[{]/.test(value.trim())) { try { parsed=JSON.parse(value); } catch {} }
    if (!groups.has(key)) groups.set(key,[]);
    groups.get(key).push(parsed);
  }
  const query=Object.fromEntries([...groups].map(([key,values])=>[key,values.length===1?values[0]:values]));
  return {...summarizeText(JSON.stringify(query)),reason:'Decoded query field names/types only; scalar values omitted; repeated keys grouped'};
}

export async function enrichObservedQueries(cdp,recorder) {
  const baseline=recorder.run.pages.find(p=>p.baseline)?.cursor;
  if (baseline===undefined) throw Error('A recorded baseline is required');
  let cursor=baseline,page,matched=0,unmatched=0;
  const pages=[];
  do {
    page=await cdp.readEvents({afterSequence:cursor,methods:['Network.requestWillBeSent'],limit:1000});
    cursor=page.cursor;
    pages.push({cursor,hasMore:page.hasMore,truncated:page.truncated});
    for (const event of page.events) {
      if (event.method!=='Network.requestWillBeSent') continue;
      const request=recorder.data.requests.find(r=>r.runId===recorder.run.id&&r.sequence===event.sequence&&r.browserRequestId===event.params?.requestId);
      if (!request) { unmatched++; continue; }
      request.querySummary=summarizeQuery(event.params.request.url);
      matched++;
    }
  } while (page.hasMore);
  recorder.run.queryCapture={mode:'Supplementary passive pass over observed starts; no replay',pages,matched,unmatched,eventLossReported:pages.some(p=>p.truncated)};
  await recorder.persist();
  return {matched,unmatched,eventLossReported:pages.some(p=>p.truncated)};
}
