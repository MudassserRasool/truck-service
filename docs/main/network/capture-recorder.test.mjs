import assert from 'node:assert/strict';
import {CaptureRecorder} from './capture-recorder.mjs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
const c=new CaptureRecorder(null,'unused');c.data={requests:[],streamEvents:[]};c.run={id:'SYNTHETIC',pages:[]};c.step={id:'S1',requestIds:[],streamEventIds:[]};
const event=(method,params,sequence)=>({method,params,sequence,source:{}});
c.process(event('Network.requestWillBeSent',{requestId:'same',request:{method:'GET',url:'https://example.test/start?token=FAKE_SECRET'},type:'Fetch'},1));
c.process(event('Network.requestWillBeSent',{requestId:'same',request:{method:'GET',url:'https://example.test/end'},redirectResponse:{url:'https://example.test/start?token=FAKE_SECRET',status:302},type:'Fetch'},2));
c.process(event('Network.responseReceived',{requestId:'same',response:{url:'https://example.test/end',status:200,mimeType:'application/json'}},3));
c.process(event('Network.loadingFinished',{requestId:'same',encodedDataLength:20},4));
c.process(event('Network.requestWillBeSent',{requestId:'retry',request:{method:'GET',url:'https://example.test/end'},type:'Fetch'},5));
c.process(event('Network.loadingFailed',{requestId:'retry',errorText:'private failure FAKE_SECRET'},6));
c.process(event('Network.loadingFinished',{requestId:'missing-start',encodedDataLength:10},7));
assert.equal(c.data.requests.length,4);assert.equal(new Set(c.data.requests.map(r=>r.id)).size,4);
assert.equal(c.data.requests[0].completion,'redirected');assert.equal(c.data.requests[1].completion,'finished');assert.equal(c.data.requests[2].completion,'failed');assert.equal(c.data.requests[3].requestStartMissing,true);
assert(!JSON.stringify(c.data).includes('FAKE_SECRET'));
const pages=[{cursor:10,hasMore:true,truncated:true,events:[]},{cursor:11,hasMore:false,truncated:false,events:[]}];c.cursor=0;c.cdp={readEvents:async()=>pages.shift()};await c.drain();assert.equal(c.run.eventLossReported,true);assert.equal(c.cursor,11);
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'qf-evidence-'));
try {
 const file=path.join(dir,'capture.json');
 await fs.writeFile(file,JSON.stringify({runs:[],steps:[],requests:[],payloads:[],streamEvents:[],endpointCatalog:[]}));
 const stub={send:async()=>({}),readEvents:async()=>({cursor:1,events:[],hasMore:false,truncated:false})};
 const active=new CaptureRecorder(stub,file);
 await active.start('A',['TEST'],'https://example.test/a','synthetic');await active.begin('OPEN','synthetic open');
 active.process(event('Network.requestWillBeSent',{requestId:'inflight',request:{method:'GET',url:'https://example.test/pending'},type:'Fetch'},1));await active.persist();
 const recovered=new CaptureRecorder(null,file);assert.equal(await recovered.recoverInterrupted(),1);
 const saved=JSON.parse(await fs.readFile(file,'utf8'));assert.equal(saved.steps[0].status,'interrupted');assert.equal(saved.runs[0].outstandingRequestIds.length,1);
 await active.recoverInterrupted();
 // New runs must not attach late events to stale objects from a previous run.
 await active.start('B',['TEST'],'https://example.test/b','synthetic');await active.begin('NEXT','synthetic next');
 active.process(event('Network.loadingFinished',{requestId:'inflight',encodedDataLength:1},2));await active.end('synthetic observed');
 const next=JSON.parse(await fs.readFile(file,'utf8'));assert.equal(next.requests.at(-1).runId,'B');assert.equal(next.requests.at(-1).requestStartMissing,true);
 assert.equal(next.payloads.at(-1).response.availability,'not-collected');
} finally {await fs.rm(dir,{recursive:true,force:true});}
console.log('PASS: synthetic redirects, repeated endpoints, failures, missing starts/bodies, redaction, paging/eviction, interruption recovery and run isolation. No live traffic injected.');
