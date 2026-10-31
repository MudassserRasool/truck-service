import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export function validate(d){
 for(const k of ['schemaVersion','capturePolicy','runs','steps','requests','payloads','endpointCatalog','coverage']) assert(k in d,`Missing ${k}`);
 for(const k of ['runs','requests']) assert.equal(new Set(d[k].map(x=>x.id)).size,d[k].length,`Duplicate ${k} identity`);
 const runs=new Set(d.runs.map(x=>x.id));const reqs=new Set(d.requests.map(x=>x.id));
 for(const r of d.runs){assert(Number.isFinite(Date.parse(r.startedAt)));assert(Date.parse(r.endedAt)>=Date.parse(r.startedAt));assert(['partial','complete','interrupted'].includes(r.captureCompleteness));}
 const steps=new Set(d.steps.map(s=>s.runId+':'+s.id));
 for(const s of d.steps){assert(runs.has(s.runId));for(const r of s.requestIds||[])assert(reqs.has(r));}
 for(const r of d.requests){assert(runs.has(r.runId));assert(steps.has(r.runId+':'+r.stepId));}
 for(const p of d.payloads){assert(reqs.has(p.requestId));assert(p.response.availability);}
 return true;
}
const here=path.dirname(fileURLToPath(import.meta.url));
if(process.argv[1]?.endsWith('validate-evidence.mjs')) {
 const d=JSON.parse(fs.readFileSync(path.join(here,'quote-factory-network.json'),'utf8')); validate(d);
 for(const s of d.steps)for(const f of s.screenshotPaths||[]) assert(fs.existsSync(path.resolve(here,f)),`Missing screenshot ${f}`);
 const fixture=structuredClone(d);fixture.requests.push(structuredClone(d.requests[0]));assert.throws(()=>validate(fixture),/Duplicate/);
 console.log('PASS: JSON required sections, unique run/request IDs, timestamps, relationships, screenshot paths; duplicate identity rejection');
}
