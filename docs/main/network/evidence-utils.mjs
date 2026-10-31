// Artifact-only utilities. No browser requests or application code.
export function safeUrl(raw) {
  try {
    const u = new URL(raw);
    if (!['https:', 'http:', 'ws:', 'wss:'].includes(u.protocol)) return `[${u.protocol.replace(':','')} resource omitted]`;
    const path=u.pathname.replace(/[a-f0-9]{24}/gi,':recordId').replace(/[a-f0-9]{8}-[a-f0-9-]{27,}/gi,':opaqueId');
    // Omit all query values, including signed tokens, and all fragments/userinfo.
    return `${u.protocol}//${u.host}${path}`+(u.search?'?[query omitted]':'');
  } catch { return '[unparseable URL omitted]'; }
}
export function shape(value, depth=0) {
  if (depth>5) return {type:'depth-limited',omissionReason:'nested value summarized'};
  if (value===null) return {type:'null'};
  if (Array.isArray(value)) return {type:'array',count:value.length,items:value.length?shape(value[0],depth+1):null,sampling:'first element only; values omitted'};
  if (typeof value==='object') {
    const entries=Object.entries(value); const properties={};
    for (const [raw,v] of entries.slice(0,50)) {
      const key=/^[A-Za-z_$][A-Za-z0-9_$ .-]{0,79}$/.test(raw) && !/[a-f0-9]{24}/i.test(raw)?raw:'[dynamic key omitted]';
      properties[key]=/authorization|cookie|csrf|password|token|secret|signature|payment|bank|card|email|phone|address|contact/i.test(key)?{type:'redacted',omissionReason:'sensitive field'}:shape(v,depth+1);
    }
    return {type:'object',properties,truncated:entries.length>50};
  }
  return {type:typeof value};
}
export function summarizeText(text) {
  if(typeof text!=='string') return {availability:'unavailable',reason:'no text supplied'};
  try {return {availability:'summarized',shape:shape(JSON.parse(text)),reason:'all scalar values omitted'};}
  catch {return {availability:'omitted',reason:'non-JSON text; no raw content retained',characterCount:text.length};}
}
