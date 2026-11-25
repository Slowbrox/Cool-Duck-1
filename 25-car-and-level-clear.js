/* =====================================================================
   90s car + level clear screen
   Level-clear sounds, timeline, score rows, car animation and clear-screen drawing.
   ===================================================================== */
/* ---- 90s car + level clear screen ---- */
let SCB,SCL;
function scrLoad(){if(!AC)return;SCL=1;stLoad();try{const q=atob(SCM),u=new Uint8Array(q.length);for(let i=0;i<q.length;i++)u[i]=q.charCodeAt(i);AC.decodeAudioData(u.buffer,x=>SCB=x,()=>{})}catch(_){}}
function scr(o,off,dur,rate,vol){if(!AC||mute)return;if(!SCB){djScratch(4,1,o);return}const q=AC.createBufferSource(),g2=AC.createGain();q.buffer=SCB;q.playbackRate.value=rate||1;g2.gain.value=vol||1;q.connect(g2);g2.connect(AC.destination);q.start(AC.currentTime+o,off||0,dur)}
let STB,STN;
function stLoad(){try{const q=atob(STM),u=new Uint8Array(q.length);for(let i=0;i<q.length;i++)u[i]=q.charCodeAt(i);AC.decodeAudioData(u.buffer,x=>STB=x,()=>{})}catch(_){}}
function stp(){if(!AC||mute||!STB)return;try{const q=AC.createBufferSource(),g2=AC.createGain();q.buffer=STB;g2.gain.value=.9;q.connect(g2);g2.connect(AC.destination);q.start();STN={q,g:g2}}catch(_){}}
function stpStop(){if(!STN)return;try{STN.g.gain.setTargetAtTime(0,AC.currentTime,.02);STN.q.stop(AC.currentTime+.15)}catch(_){}STN=null}
/* clear-screen timeline in frames (60/s): count sound starts at t0, row i lands on ding i, total runs ding 6 -> finale, scratches + rank stamp at rt */
const LCT={t0:44,h:[46,86,125,164,205,244,279,330],rt:425};
const CAR={x:WW-124,ph:0,t:0,v:0};let LC=null;/* the goal car parks at the end of the level */
function djScratch(n,q,o=0){for(let i=0;i<n;i++){const d=i%2,at=o+i*(q?.085:.15);noiz(.08+(i%3)*.02,"bandpass",d?600:3000,d?3000:600,.34,at,5);sfx(d?240:880,.08,"sawtooth",.1,d?880:240,at)}}
function lcInit(){const fl=HST.filter(s=>s.l=="p"+LV&&s.got).length,ne=E.length||1,kl=Math.min(kills,ne),hh=Math.max(0,hearts),ns=nst(),sec=Math.max(0,(frame-yt)/60|0),
rows=[["COIN SCORE",lvC+" coins \u00d7 50",lvC*50],["ENEMY BONUS",kl+"/"+E.length+" \u00d7 500",kl*500],["BREAD BONUS",fl+"/1 \u00d7 2,000",fl*2000],["TIME BONUS",(sec/60|0)+":"+String(sec%60).padStart(2,"0"),Math.max(0,450-sec)*50],["HEART BONUS",hh+" \u00d7 1,000",hh*1000]],
sc=Math.min(1,kl/ne)*30+fl*25+hh/3*25+ns/3*20;LC={t:0,sel:0,rows,tot:rows.reduce((q,r)=>q+r[2],0),rk:sc>=85?"S":sc>=65?"A":sc>=40?"B":"C"};lvRec(LV,LC.tot,LC.rk,fl)}
function carUpd(){const C=CAR,L=LC;frame++;near=null;C.t++;if(shk>0)shk=Math.max(0,shk-.12);if(!SCL)scrLoad();
if(C.ph==1){if(C.t==2)sfx(120,.12,"square",.15,60);if(C.t==14)sfx(70,.7,"sawtooth",.13,200);if(C.t>=26){C.ph=2;C.t=0}}
else{C.v=Math.min(9.5,C.v+.14+C.t*.0006);C.x+=C.v;if(C.t%2==0)dust(C.x+2,221,2,4);if(!L&&C.t%3==0)sfx(60+C.v*12,.06,"sawtooth",.07);if(C.t==20)lcInit()}
if(L){L.t++;const t=L.t;if(t==1)noiz(.4,"highpass",900,5000,.25,0,1);if(t==36)sfx(95,.25,"sine",.35,40);if(t==LCT.t0)stp();if(t>LCT.t0&&t<LCT.rt&&pr("Enter","Space","KeyE")){stpStop();L.t=LCT.rt-1}
if(t==LCT.rt){const k="SABC".indexOf(L.rk),ch=(a,d,v2,o)=>a.forEach(f=>sfx(f,d,"sawtooth",v2,0,o));sfx(70,.5,"sine",.4,28);noiz(.6,"highpass",1500,6000,.3,0,1);
if(k==0){scr(0,0,2.6,1,1);scr(1.1,.3,1.2,1.3,.8);[523,659,784,1047].forEach((f,i)=>sfx(f,.18,"square",.1,0,.75+i*.07));ch([523,659,784,1047,1319],.9,.07,1.05);chime()}
else if(k==1){scr(0,0,2.6,1,1);ch([523,659,784,1047],.7,.06,.85);chime()}
else if(k==2){scr(0,0,1.8,1,.9);ch([392,494,587],.6,.06,.7)}
else{scr(0,0,1.1,.7,.9);scr(.9,.4,1.6,1.1,.9);ch([392,494,587,784],.7,.06,1.1)}}
if(t>LCT.rt+50){if(pr("ArrowUp","KeyW"))L.sel=(L.sel+2)%3;if(pr("ArrowDown","KeyS"))L.sel=(L.sel+1)%3;if(pr("Enter","Space","KeyE")){const q=L.sel;LC=null;chime();if(q==0){const n=LV;trans(()=>wmOpen({at:n,go:1}))}else if(q==1)trans(()=>start());else trans(lobbyOpen);return}}}
fxStep(FX);fxStep(tFx);flUpd()}
/* matte-black muscle car: raked stance, fat tyres on 5-spoke chrome rims, hood scoop, rear wing, red racing stripe,
   fender flames, tinted windows (no visible driver), side pipe that backfires */
function carDraw(){const C=CAR,v=vg,x=C.x,t=frame,dr=C.ph==2,bo=dr?Math.sin(t*1.3)*.9:C.ph==1?Math.sin(C.t*.9)*2*(1-C.t/26):Math.sin(t*1.7)*.3,CH="#d6dbe6",CS="#8a90a0",ink="#07060a";
v.save();v.translate(-(cam|0),0);v.lineJoin=v.lineCap="round";
v.fillStyle="rgba(0,0,0,.42)";v.beginPath();v.ellipse(x+50,225,58,4,0,0,7);v.fill();
if(dr&&C.v>2){v.strokeStyle="rgba(255,255,255,.55)";v.lineWidth=2;for(let i=0;i<4;i++){const y=180+i*10,l=20+((i*37+t*5)%30);v.beginPath();v.moveTo(x-12,y);v.lineTo(x-12-l,y);v.stroke()}}
if(C.ph>=1)for(let i=0;i<5;i++){const k=((t*(dr?2:1)+i*8)%40)/40;v.globalAlpha=(1-k)*.55;v.fillStyle="#d8d2e2";v.beginPath();v.arc(x-6-k*(dr?36:14),214-k*10,2+k*7,0,7);v.fill()}v.globalAlpha=1;
/* fat-tyre wheel: rear sits bigger than the front for a raked muscle stance */
const wheel=(wx,r)=>{const wy=224-r;v.fillStyle="#050408";v.beginPath();v.arc(x+wx,wy-1,r+2.6,Math.PI,0);v.fill();
v.save();v.translate(x+wx,wy);v.fillStyle="#0d0c11";v.beginPath();v.arc(0,0,r,0,7);v.fill();v.strokeStyle="#26242e";v.lineWidth=1;v.beginPath();v.arc(0,0,r-1.8,0,7);v.stroke();
const rr=r*.6;v.fillStyle="#a8aebb";v.beginPath();v.arc(0,0,rr,0,7);v.fill();v.fillStyle="#17161e";v.beginPath();v.arc(0,0,rr-1.3,0,7);v.fill();
v.fillStyle="#e02a36";v.beginPath();srrV(v,-rr+1.2,-3,2.6,6,1);v.fill();
v.rotate(C.x/r);v.fillStyle=CH;for(let i=0;i<5;i++){v.beginPath();v.moveTo(-1.2,-1);v.lineTo(-.8,-rr+1.4);v.lineTo(.8,-rr+1.4);v.lineTo(1.2,-1);v.fill();v.rotate(1.2566)}
v.fillStyle="#fff";v.beginPath();v.arc(0,0,1.8,0,7);v.fill();v.fillStyle=ink;v.beginPath();v.arc(0,0,.7,0,7);v.fill();v.restore()};
wheel(22,13);wheel(84,11.5);
v.translate(0,bo);
const body=v.createLinearGradient(0,168,0,210);body.addColorStop(0,"#3e3a4a");body.addColorStop(.32,"#17151d");body.addColorStop(1,"#060509");
const sh=(f,fill,lw)=>{v.beginPath();f();v.fillStyle=fill;v.fill();v.strokeStyle=ink;v.lineWidth=lw||1.6;v.stroke()};
/* rear wing on stilts */
v.strokeStyle=ink;v.lineWidth=2.4;v.beginPath();v.moveTo(x+4,188);v.lineTo(x+3,180);v.moveTo(x+14,188);v.lineTo(x+13,180);v.stroke();
sh(()=>srrV(v,x-5,176.5,24,4,[2,3,1,1]),"#1c1a24",1.3);v.fillStyle="#e02a36";v.fillRect(x-4,177.6,22,1);
/* low, chopped body with wheel arches cut out */
const BODY=()=>{v.moveTo(x-3,208);v.lineTo(x-3,194);v.quadraticCurveTo(x-2,188,x+4,187.5);v.lineTo(x+26,187);v.quadraticCurveTo(x+30,177,x+36,173);v.quadraticCurveTo(x+38,171.6,x+42,171.4);v.lineTo(x+58,171);v.quadraticCurveTo(x+62,171.2,x+64,173.5);v.lineTo(x+75,186);
v.lineTo(x+101,188);v.quadraticCurveTo(x+106,189,x+107,193);v.lineTo(x+107,204);v.quadraticCurveTo(x+107,207.5,x+103,208);v.lineTo(x+98.5,208);
v.arc(x+84,212.5,14.5,-.32,-Math.PI+.32,true);v.lineTo(x+37.5,208);v.arc(x+22,211,15.5,-.2,-Math.PI+.2,true);v.closePath()};
sh(BODY,body,1.8);
/* tinted windows (nobody visible inside) + B-pillar + glint */
v.beginPath();v.moveTo(x+30.5,186);v.quadraticCurveTo(x+34,177,x+39,174.4);v.lineTo(x+58,174);v.quadraticCurveTo(x+60.5,174.4,x+62,176);v.lineTo(x+70,186);v.closePath();
const wg=v.createLinearGradient(0,174,0,186);wg.addColorStop(0,"#262a3a");wg.addColorStop(1,"#0a0b12");v.fillStyle=wg;v.fill();v.strokeStyle="#56596a";v.lineWidth=1;v.stroke();
v.fillStyle="#111017";v.fillRect(x+48,173.6,3.4,12.6);
v.save();v.clip();v.strokeStyle="rgba(255,255,255,.22)";v.lineWidth=2;v.beginPath();v.moveTo(x+38,186);v.lineTo(x+45,172);v.moveTo(x+56,186);v.lineTo(x+62,172);v.stroke();v.lineWidth=.8;v.beginPath();v.moveTo(x+42,186);v.lineTo(x+49,172);v.stroke();v.restore();
/* side mirror */
sh(()=>srrV(v,x+68,181,5,3.4,1.4),"#1c1a24",1);
/* hood scoop */
sh(()=>{v.moveTo(x+79,188.4);v.lineTo(x+81,182.6);v.lineTo(x+94,183);v.lineTo(x+95.5,188.8);v.closePath()},body,1.3);v.fillStyle="#050408";v.fillRect(x+92.6,184,1.8,4);
/* racing stripe + highlights */
v.strokeStyle="#e02a36";v.lineWidth=2.6;v.beginPath();v.moveTo(x-2.4,195);v.lineTo(x+106.4,196.4);v.stroke();v.strokeStyle="#ff8a8a";v.lineWidth=.6;v.beginPath();v.moveTo(x-2,194);v.lineTo(x+106,195.4);v.stroke();
v.strokeStyle="rgba(255,255,255,.2)";v.lineWidth=1;v.beginPath();v.moveTo(x+2,188.6);v.lineTo(x+25,188.2);v.moveTo(x+77,187.4);v.lineTo(x+100,189);v.moveTo(x+43,172.6);v.lineTo(x+57,172.2);v.stroke();
/* flame decal on the front fender */
v.save();v.beginPath();BODY();v.clip();for(const[dy,len]of[[0,30],[3.4,22],[6.6,15]]){const fx=x+106,fy=198+dy;
const fg=v.createLinearGradient(fx,0,fx-len,0);fg.addColorStop(0,"#fff2a0");fg.addColorStop(.35,"#ffb612");fg.addColorStop(1,"#e8302a");v.fillStyle=fg;v.beginPath();v.moveTo(fx,fy-1.6);
v.quadraticCurveTo(fx-len*.55,fy-3.6,fx-len,fy-.4);v.quadraticCurveTo(fx-len*.7,fy-.6,fx-len*.55,fy+.6);v.quadraticCurveTo(fx-len*.3,fy+2.2,fx,fy+1.6);v.closePath();v.fill();v.strokeStyle=ink;v.lineWidth=.6;v.stroke()}v.restore();
/* doors, handle, side exhaust */
v.strokeStyle=ink;v.lineWidth=1;v.beginPath();v.moveTo(x+38,189);v.lineTo(x+38,206.5);v.moveTo(x+71,189);v.lineTo(x+70,206.5);v.stroke();
v.fillStyle=CH;v.fillRect(x+60,190.8,5,1.4);
const eg=v.createLinearGradient(0,205,0,210);eg.addColorStop(0,"#ffffff");eg.addColorStop(.5,CH);eg.addColorStop(1,CS);v.fillStyle=eg;v.beginPath();srrV(v,x+40,205.4,28,3.8,1.8);v.fill();v.strokeStyle=ink;v.lineWidth=.9;v.stroke();
v.fillStyle="#050408";v.beginPath();v.ellipse(x+40.4,207.3,1,1.6,0,0,7);v.fill();
if(dr&&t%26<4||C.ph==1&&C.t>13&&C.t<20){v.fillStyle="#ffb612";v.beginPath();v.moveTo(x+40,205.4);v.lineTo(x+30-Math.random()*6,207.3);v.lineTo(x+40,209.2);v.fill();v.fillStyle="#fff2a0";v.beginPath();v.moveTo(x+40,206.4);v.lineTo(x+34,207.3);v.lineTo(x+40,208.2);v.fill()}
/* tail light, headlight beam, headlight, bumpers */
v.fillStyle="#ff2a3a";v.fillRect(x-3,189.6,2.6,5.4);v.save();v.globalCompositeOperation="lighter";v.fillStyle="rgba(255,40,60,.35)";v.beginPath();v.arc(x-2,192.3,5,0,7);v.fill();v.restore();
if(C.ph>=1||t%240<120){v.fillStyle="rgba(255,240,180,"+(dr?.22:.1)+")";v.beginPath();v.moveTo(x+106,190);v.lineTo(x+172,180);v.lineTo(x+172,208);v.lineTo(x+106,197);v.fill()}
v.fillStyle="#fff6c0";v.beginPath();srrV(v,x+102.4,190,4.6,4.4,1);v.fill();v.strokeStyle=ink;v.lineWidth=.8;v.stroke();v.fillStyle="#ffb612";v.fillRect(x+103,195.2,3.4,1.6);
v.fillStyle=CH;v.beginPath();srrV(v,x+101,203.4,8,3.6,1.6);v.fill();v.beginPath();srrV(v,x-5,203.4,8,3.6,1.6);v.fill();v.strokeStyle=ink;v.lineWidth=.8;v.stroke();
v.restore()}
function lcDraw(){const L=LC;if(!L)return;const v=vg,t=L.t,u=Math.min(1,t/36),e=1-Math.pow(1-u,3),fl=1-e,f=t<44?frame>>2:11,cp=x=>Math.max(0,Math.min(1,x)),nm=n=>n.toLocaleString("en-US"),
j=(a,m)=>(Math.sin(a*12.9898+f*78.233)*43758.5453%1)*m,
it=(s,x,y,z,col,al,w,r)=>{v.save();v.translate(x,y);v.rotate(r||0);v.transform(1,0,-.2,1,0,0);v.font=(w||800)+" "+z+"px "+FM;v.textAlign=al||"left";v.fillStyle=col;v.fillText(s,0,0);v.restore()},
ti=(s,x,y,z,col,r)=>{v.save();v.translate(x,y);v.rotate(r||0);v.transform(1,0,-.18,1,0,0);v.font=z+"px "+FB;v.textAlign="center";v.lineWidth=z/6;v.strokeStyle="#1a1226";v.fillStyle="#1a1226";v.strokeText(s,2,3);v.fillText(s,2,3);v.strokeText(s,0,0);v.fillStyle=col;v.fillText(s,0,0);v.restore()},
ink=(x0,y0,x1,y1,s,rg)=>{v.beginPath();const n=(x1-x0)/9|0,m=(y1-y0)/9|0;for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,y=y0+j(i+s,rg)+(i%2?-rg*.6:0);i?v.lineTo(x,y):v.moveTo(x,y)}for(let i=1;i<=m;i++)v.lineTo(x1+j(i+s+50,rg),y0+(y1-y0)*i/m);for(let i=n;i>=0;i--)v.lineTo(x0+(x1-x0)*i/n,y1+j(i+s+90,rg)+(i%2?rg*.6:0));for(let i=m;i>=1;i--)v.lineTo(x0+j(i+s+130,rg),y0+(y1-y0)*i/m);v.closePath();v.fill()},
sp=(x0,y0,x1,y1,s,c)=>{for(let i=0;i<c;i++){const a=Math.abs(Math.sin(i*91.7+s)),b=Math.abs(Math.sin(i*37.3+s*3)),sd=i%4,x=sd<2?x0+(x1-x0)*a:sd==2?x0-b*14:x1+b*14,y=sd<2?(sd?y1+b*10:y0-b*10):y0+(y1-y0)*a;v.beginPath();v.arc(x,y,.6+b*2.2,0,7);v.fill()}};
v.save();v.lineJoin=v.lineCap="round";v.fillStyle="rgba(10,6,24,"+.5*e+")";v.fillRect(0,0,W,H);
v.save();v.translate(256,60);v.rotate(-fl*.6);v.translate(-256,-60-fl*170);v.fillStyle="#0c0a12";ink(56,18,456,98,1,5);sp(56,18,456,98,3,70);
const pz=1+(t>40?.03*Math.sin(t*.25):0);v.save();v.translate(256,66);v.scale(pz,pz);ti("LEVEL CLEAR!",0,0,42,"#ffb612",-.045);v.restore();
v.strokeStyle="#ff8a1f";v.lineWidth=3;v.beginPath();v.moveTo(104,80);v.lineTo(410,72);v.stroke();it(LVN[LV],256,95,17,"#e8e6f0","center",900,-.03);v.restore();
v.globalAlpha=cp((t-30)/12);v.fillStyle="rgba(10,6,18,.82)";ink(104,102,408,218,7,3);sp(104,102,408,218,9,40);v.globalAlpha=1;
L.rows.forEach((r,i)=>{const k=cp((t-LCT.t0-LCT.h[i])/30);if(!k)return;const y=120+i*14;v.globalAlpha=cp(k*3);it(r[0]+":",116,y,11,"#e8e6f0");it(r[1],236,y,10,"#bdb8d0");it(nm(Math.round(r[2]*k)),398,y,11,"#fff","right");v.globalAlpha=1});
if(t>=LCT.t0+LCT.h[5]){v.globalAlpha=cp((t-LCT.t0-LCT.h[5])/10);v.strokeStyle="rgba(255,255,255,.75)";v.lineWidth=1.5;v.beginPath();v.moveTo(112,188);v.lineTo(400,187);v.stroke();it("TOTAL SCORE:",116,208,19,"#ffb612");it(nm(Math.round(L.tot*cp((t-LCT.t0-LCT.h[5])/(LCT.h[7]-LCT.h[5])))),398,208,21,"#fff","right",900);v.globalAlpha=1}
v.save();v.translate(54,150);v.rotate(t*.25);v.fillStyle="#1a1226";v.beginPath();v.arc(0,0,30,0,7);v.fill();v.strokeStyle="#4a4066";v.lineWidth=1;for(const r of[12,18,24]){v.beginPath();v.arc(0,0,r,0,7);v.stroke()}v.fillStyle="#ffb612";v.beginPath();v.arc(0,0,8,0,7);v.fill();v.fillStyle="#fff";v.fillRect(14,-1,10,2);v.restore();
if(t>=LCT.rt){const k=cp((t-LCT.rt)/9),s=1+(1-k)*2.6,ix="SABC".indexOf(L.rk);
if(t<LCT.rt+18){v.save();v.translate(458,150);v.rotate(t*.2);v.beginPath();for(let i=0;i<16;i++){const r=i%2?30:46+(t-LCT.rt)*2;v.lineTo(Math.cos(i*.3927)*r,Math.sin(i*.3927)*r)}v.closePath();v.fillStyle="#ffd24a";v.fill();v.lineWidth=3;v.strokeStyle="#1a1226";v.stroke();v.restore()}
v.save();v.translate(458,150);v.rotate(-.3);v.scale(s,s);v.globalAlpha=k;v.strokeStyle="#d8263a";v.lineWidth=5;v.beginPath();v.arc(0,0,33,0,7);v.stroke();v.lineWidth=2;v.beginPath();v.arc(0,0,27,0,7);v.stroke();ti(L.rk,0,17,50,"#d8263a",0);v.restore();
if(t>=LCT.rt+8){it(["SICK!","NICE!","OKAY","NEXT TIME!"][ix],458,204,14,"#ffb612","center",900,.05);for(let i=0;i<3;i++)starIcon(v,440+i*18,218,7,i<3-ix)}}
if(t>LCT.rt+40){v.globalAlpha=cp((t-LCT.rt-40)/10);v.fillStyle="#0c0a12";ink(168,226,344,282,11,3);["CONTINUE","RETRY LEVEL","LOBBY"].forEach((m,i)=>{const y=242+i*16,on=i==L.sel;if(on){v.fillStyle="#ffb612";ink(176,y-12,336,y+5,i+3,2.5)}it(m,256,y,14,on?"#1a1226":"#e8e6f0","center",900)});
v.strokeStyle="#e8e6f0";v.lineWidth=2;v.beginPath();v.arc(22,270,8,0,7);v.moveTo(19,267);v.lineTo(25,273);v.moveTo(25,267);v.lineTo(19,273);v.stroke();it("ACCEPT",36,274,11,"#e8e6f0");v.globalAlpha=1}
v.restore();lcFx(L)}
function lcFx(L){const v=vg,d=L.t-LCT.rt;if(d<0)return;if(d<9){v.fillStyle="rgba(255,255,255,"+.75*(1-d/9)+")";v.fillRect(0,0,W,H)}
const n={S:100,A:80,B:60,C:50}[L.rk],cl=["#ff3b6b","#2f7bff","#ffd24a","#4fffe0","#ff9a1f","#fff"];
for(let i=0;i<n;i++){const a=(i*7919%97)/97,b=(i*104729%89)/89,sd=i%2?1:-1,x=(sd>0?14:W-14)+sd*(3+a*9)*d*.8+Math.sin(d*.15+i)*7,y=H-(9+b*8)*d*.8+.09*d*d;if(y>H+10)continue;v.save();v.translate(x,y);v.rotate(d*.25+i);v.fillStyle=cl[i%6];v.fillRect(-3,-2,6,4);v.restore()}}
