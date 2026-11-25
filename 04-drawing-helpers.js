/* =====================================================================
   Drawing helpers
   Tiny shared helpers: filled rectangle R, text queue TX, seeded random rn, rectangle overlap ov.
   ===================================================================== */

const R=(a,b,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(a),Math.round(b),w,h)};
const TQ=[],TX=(s,a,b,c="#fff",f=12,al="left")=>{const m=g.getTransform();TQ.push([s,a+m.e,b+m.f,c,f,al])};
let sd=7;const rn=()=>(sd=sd*16807%2147483647)/2147483647;
const ov=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
