/* =====================================================================
   Mid-level checkpoint (World 1 levels, S=="play")
   One banner flag per level, about halfway through (CKX). Walking past it hoists the flag and saves the
   run so far: coins picked up, enemies beaten, hidden bread and the clock.
   Losing all hearts after that sends you back to the flag instead of the start of the level, and only the
   coins picked up after the flag are lost. RESTART LEVEL (pause menu) and RETRY LEVEL start from scratch.
   Hooks: start() calls ckInit(), upd() calls ckUpd(), worldDraw() calls ckDraw(), the game over uses ckRestart().
   ===================================================================== */
const CKX={1:106,2:111,3:101};/* flag position per level, in tiles (on safe ground, no enemy patrol nearby) */
const CKP={x:0,on:0,t:0,s:null};
function ckInit(){CKP.x=CKX[LV]?CKX[LV]*T+16:0;CKP.on=0;CKP.t=0;CKP.s=null}
function ckUpd(){if(CKP.on){CKP.t++;return}if(!CKP.x||p.x+9<CKP.x-6)return;
CKP.on=1;CKP.t=0;cp.x=CKP.x;
CKP.s={lv:lvC,k:kills,cg:C.map(c=>c.g?1:0),ed:E.map(e=>e.dead?1:0),hs:HST.filter(s=>s.l=="p"+LV&&s.got).map(s=>s.id),tm:frame-yt};
[660,880,1320].forEach((f,i)=>sfx(f,.14,"triangle",.05,0,i*.08));noiz(.2,"bandpass",900,2600,.03,0,1.2);
for(let i=0;i<18;i++){const a=rn()*6.28,v=1+rn()*2.6;GP.push({x:CKP.x+10,y:172,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.4,l:26+(rn()*14|0),c:i%2?"#ffd24a":"#fff"})}
POP.push({x:CKP.x+10,y:140,s:"CHECKPOINT!",c:"#ffd24a",f:13,l:80})}
/* back to the flag: a fresh start(), then the saved run is put back and the duck stands at the flag */
function ckRestart(){const s=CKP.s;start();if(!s)return;CKP.on=1;CKP.t=99;CKP.s=s;lvC=s.lv;kills=s.k;
C.forEach((c,i)=>{if(s.cg[i])c.g=1});E.forEach((e,i)=>{if(s.ed[i]){e.dead=1;e.dt=0}});HST.forEach(h=>{if(s.hs.includes(h.id))h.got=1});
yt=frame-s.tm;p.x=CKP.x-9;p.y=224-p.h-2;cp.x=CKP.x;cam=Math.max(0,Math.min(WW-W,p.x-W/2+40))}
/* nobori banner on a wooden pole: furled and pale until you pass it, then hoisted in red with the duck coin */
function ckDraw(c){const x=CKP.x;if(!x||x<c-80||x>c+W+40)return;const top=150,k=CKP.on?ez(Math.min(1,CKP.t/28)):0,
wv=yy=>Math.sin(frame*.11-yy*.2)*(.5+1.7*k)*Math.min(1,yy/10);
if(CKP.on&&CKP.t<26){const a=1-CKP.t/26;g.save();g.globalCompositeOperation="lighter";const gl=g.createRadialGradient(x+10,top+26,2,x+10,top+26,46);gl.addColorStop(0,"rgba(255,230,150,"+.65*a+")");gl.addColorStop(1,"rgba(255,230,150,0)");g.fillStyle=gl;g.fillRect(x-38,top-22,96,96);g.restore()}
/* stone footing, pole, crossbar, finial */
g.fillStyle=FINK;g.beginPath();g.ellipse(x+1,224,9,4.5,0,0,7);g.fill();g.fillStyle="#a9a9a0";g.beginPath();g.ellipse(x+1,223,7.5,3.2,0,0,7);g.fill();
R(x-1.5,top-2,5,226-top,FINK);R(x-.5,top-1,3,224-top,"#9a6a3e");R(x+1.5,top-1,1,224-top,"#6a4424");
R(x-1,top+1,23,4,FINK);R(x,top+2,21,2,"#9a6a3e");
g.fillStyle=FINK;g.beginPath();g.arc(x+1,top-4,3.6,0,7);g.fill();g.fillStyle=CKP.on?"#ffd24a":"#c9c2b0";g.beginPath();g.arc(x+1,top-4,2.4,0,7);g.fill();
/* banner (hoisted from the bottom of the pole up to the crossbar) */
const bw=17,bh=16+26*k,x0=x+3.5,by=top+5+(1-k)*44,body=()=>{g.beginPath();g.moveTo(x0,by);g.lineTo(x0+bw,by);for(let yy=4;yy<=bh;yy+=4)g.lineTo(x0+bw+wv(yy),by+yy);
g.lineTo(x0+bw*.5+wv(bh)*.6,by+bh+2);g.lineTo(x0,by+bh);g.closePath()};
body();g.fillStyle=FINK;g.lineWidth=2.6;g.strokeStyle=FINK;g.stroke();body();g.fillStyle=CKP.on?"#e8453c":"#e6dfcc";g.fill();
R(x0,by,3,bh,CKP.on?"#a8221c":"#c9c2b0");R(x0+3,by+bh-5,bw-3,2,CKP.on?"#ffd24a":"#d4ccb8");
const ex=x0+bw*.56+wv(bh*.42)*.5,ey=by+bh*.42,er=3.2+2.4*k;g.fillStyle=CKP.on?"#fff7e8":"#c9c2b0";g.beginPath();g.arc(ex,ey,er,0,7);g.fill();
if(k>.35)coinIco(g,ex,ey,er*.7)}
