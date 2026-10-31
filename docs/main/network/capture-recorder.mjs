// Passive CDP evidence recorder. Receives the documented browser capability;
// never issues HTTP requests, replays traffic or modifies application state.
import fs from 'node:fs/promises';
import {safeUrl,summarizeText} from './evidence-utils.mjs';
export const eventMethods=['Network.requestWillBeSent','Network.responseReceived','Network.loadingFinished','Network.loadingFailed','Network.webSocketCreated','Network.webSocketFrameSent','Network.webSocketFrameReceived','Network.webSocketClosed','Network.webSocketFrameError','Target.attachedToTarget','Target.detachedFromTarget'];
export class CaptureRecorder {
 constructor(cdp,file){this.cdp=cdp;this.file=file;this.targets=new Map();this.current=new Map();}
 async start(id,workflowIds,startUrl,startingState){if(this.step)throw Error('Previous step not closed; recover interruption first');this.current.clear();this.targets.clear();this.data=JSON.parse(await fs.readFile(this.file,'utf8'));if(this.data.runs.some(r=>r.id===id))throw Error('Run ID already exists');await this.cdp.send('Network.enable');const b=await this.cdp.readEvents({methods:eventMethods});this.cursor=b.cursor;this.run={id,workflowIds,role:'broker session; exact current role unverified',startedAt:new Date().toISOString(),endedAt:new Date().toISOString(),startUrl:safeUrl(startUrl),startingState,captureCompleteness:'partial',limits:['Parent/observed source events only; child-target coverage not established','Metadata and structural payload summaries only; no completeness claim for bodies','No explicit operational form submissions; view interactions may issue automatic writes'],pages:[{cursor:b.cursor,hasMore:b.hasMore,truncated:b.truncated,baseline:true}]};this.data.runs.push(this.run);}
 async begin(id,action){if(this.step)throw Error('Previous step not closed');this.step={id,runId:this.run.id,action,startedAt:new Date().toISOString(),requestIds:[],streamEventIds:[],screenshotPaths:[]};this.data.steps.push(this.step);await this.persist();}
 target(source={}){if(!source.sessionId)return 'parent';if(!this.targets.has(source.sessionId))this.targets.set(source.sessionId,'child-'+(this.targets.size+1));return this.targets.get(source.sessionId);}
 ensure(p,e){const target=this.target(e.source), key=target+':'+p.requestId;let r=this.current.get(key);if(!r){r={id:this.run.id+':'+key+':orphan-'+e.sequence,runId:this.run.id,stepId:this.step.id,browserRequestId:p.requestId,target,requestStartMissing:true,completion:'unknown'};this.data.requests.push(r);this.current.set(key,r);this.step.requestIds.push(r.id);}return r;}
 process(e){const p=e.params||{},target=this.target(e.source),key=target+':'+p.requestId;
 if(e.method==='Network.requestWillBeSent'){
  let prior=this.current.get(key);if(p.redirectResponse&&prior){prior.redirectResponse={url:safeUrl(p.redirectResponse.url),status:p.redirectResponse.status};prior.completion='redirected';}
  let leg=this.data.requests.filter(r=>r.runId===this.run.id&&r.target===target&&r.browserRequestId===p.requestId).length;
  const r={id:this.run.id+':'+key+':'+leg,runId:this.run.id,stepId:this.step.id,browserRequestId:p.requestId,target,redirectLeg:leg,method:p.request.method,url:safeUrl(p.request.url),resourceType:p.type,sequence:e.sequence,monotonicTimestamp:p.timestamp,initiatorType:p.initiator?.type,completion:'outstanding-at-close',requestPayload:p.request.hasPostData?summarizeText(p.request.postData):{availability:'not-present-in-event',reason:'no post data supplied in event'}};
  this.data.requests.push(r);this.step.requestIds.push(r.id);this.current.set(key,r);
 } else if(e.method==='Network.responseReceived'){
  const r=this.ensure(p,e),q=p.response;Object.assign(r,{url:safeUrl(q.url),status:q.status,mimeType:q.mimeType,protocol:q.protocol,fromDiskCache:q.fromDiskCache,fromServiceWorker:q.fromServiceWorker});
  if(q.timing)r.timing=Object.fromEntries(Object.entries(q.timing).filter(([,v])=>typeof v==='number'));
 } else if(e.method==='Network.loadingFinished'||e.method==='Network.loadingFailed'){
  const r=this.ensure(p,e);Object.assign(r,{completion:e.method==='Network.loadingFinished'?'finished':'failed',encodedDataLength:p.encodedDataLength,canceled:p.canceled,failureReason:e.method==='Network.loadingFailed'?'failure observed; raw error text omitted':undefined});
 } else if(e.method.startsWith('Network.webSocket')){
  const r={id:this.run.id+':event:'+e.sequence,runId:this.run.id,stepId:this.step.id,sequence:e.sequence,target,method:e.method,browserRequestId:p.requestId,monotonicTimestamp:p.timestamp,opcode:p.response?.opcode,url:p.url?safeUrl(p.url):undefined,payload:p.response?summarizeText(p.response.payloadData):{availability:'not-applicable'}};
  this.data.streamEvents??=[];this.data.streamEvents.push(r);this.step.streamEventIds.push(r.id);
 } else if(e.method.startsWith('Target.')){this.run.childTargetEvents??=[];this.run.childTargetEvents.push({sequence:e.sequence,method:e.method,target:this.target({sessionId:p.sessionId})});}
 }
 async drain(){let page;do{page=await this.cdp.readEvents({afterSequence:this.cursor,methods:eventMethods,limit:1000});this.cursor=page.cursor;this.run.pages.push({cursor:page.cursor,hasMore:page.hasMore,truncated:page.truncated});if(page.truncated)this.run.eventLossReported=true;for(const e of page.events)this.process(e);}while(page.hasMore);}
 async end(observed,{screenshots=[],evidenceIds=[],details={}}={}){await this.drain();Object.assign(this.step,{endedAt:new Date().toISOString(),observed,screenshotPaths:screenshots,evidenceIds,details});this.run.endedAt=this.step.endedAt;this.run.outstandingRequestIds=this.data.requests.filter(r=>r.runId===this.run.id&&r.completion==='outstanding-at-close').map(r=>r.id);this.step=null;await this.persist();}
 async recoverInterrupted(){
  this.data=JSON.parse(await fs.readFile(this.file,'utf8'));const now=new Date().toISOString();let recovered=0;
  for(const s of this.data.steps.filter(s=>!s.endedAt)){Object.assign(s,{endedAt:now,status:'interrupted',observed:'Capture interrupted before a settled result was recorded; no successful action inferred'});const r=this.data.runs.find(r=>r.id===s.runId);if(r){Object.assign(r,{endedAt:now,interrupted:true,captureCompleteness:'partial'});r.outstandingRequestIds=this.data.requests.filter(q=>q.runId===r.id&&q.completion==='outstanding-at-close').map(q=>q.id);}recovered++;}
  if(recovered)await fs.writeFile(this.file,JSON.stringify(this.data,null,2)+'\n');this.step=null;return recovered;
 }
 async persist(){
  const old=new Set(this.data.payloads.map(p=>p.requestId));for(const r of this.data.requests.filter(r=>r.runId===this.run.id))if(!old.has(r.id))this.data.payloads.push({requestId:r.id,request:r.requestPayload||{availability:'unavailable',reason:'request start not observed'},response:{availability:'not-collected',reason:'body not retrieved; not an empty response'}});
  const cat=new Map(this.data.endpointCatalog.map(c=>[c.method+' '+c.urlPattern,c]));for(const r of this.data.requests.filter(r=>r.runId===this.run.id&&r.method&&r.url)){let k=r.method+' '+r.url,c=cat.get(k);if(!c){c={method:r.method,urlPattern:r.url,runIds:[],requestIds:[],classification:'browser-observed; private server/provider calls unproven'};cat.set(k,c);}if(!c.runIds.includes(r.runId))c.runIds.push(r.runId);if(!c.requestIds.includes(r.id))c.requestIds.push(r.id);}this.data.endpointCatalog=[...cat.values()];await fs.writeFile(this.file,JSON.stringify(this.data,null,2)+'\n');
 }
}
