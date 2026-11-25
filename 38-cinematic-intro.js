/* =====================================================================
   Cinematic intro
   Black boot screen ("press any button": the browser only allows sound after a key press), then on black:
   1. Cool Duck runs in, skids, turns to the camera, grabs an egg and does a full overhand throw AT the screen
      (the egg sits in his wing tip - its position comes from the 3D wing - and leaves exactly at release).
   2. Clean, juicy splat on the "glass" (squash, flash, shockwave, droplets) with a short hit-pause.
   3. Cool Duck hops on his skateboard and rides off.
   4. The splat pulls itself together: the egg white becomes the SLOWBRO eye, the yolk becomes its gold pupil.
   5. The eye closes, squashes into a glowing line, and opens again as an eye-shaped window onto the main screen.
   Any key / button skips.
   ===================================================================== */
let CI={t:0,an:0,rev:0,fx:[],wr:0};
const CD0=20,CTHR=CD0+105,CSPL=CD0+124,CMRG=CD0+206,COPN=CMRG+36,CTXT=COPN+20,CCLS=CMRG+184,CSQ=CCLS+18,CEND=CSQ+14;
const CSB=132,CSO=138,CSR=142;/* skateboard appears / ollie / ride (duck-frames) */
const SPX=256,SPY=118,EYX=256,EYY=108,EYR=26,EYT=3.5;
const ciEo=x=>{x=luC(x);return 1-Math.pow(1-x,3)};
/* wide-tracked, pixel-snapped type */
function ciT(v,s,x,y,z,w,sp,col){v.font=w+" "+z+"px "+FM;v.textAlign="left";v.textBaseline="alphabetic";const ch=[...s],ws=ch.map(c=>v.measureText(c).width),tw=ws.reduce((a,b)=>a+b,0)+sp*(ch.length-1);let px=x-tw/2;v.fillStyle=col;ch.forEach((c,i)=>{v.fillText(c,Math.round(px),Math.round(y));px+=ws[i]+sp})}
/* ---------- high quality egg, drawn at its real pixel size (no scaled-up outlines) ---------- */
function eggHQ(v,x,y,h,rot,sx,sy){const W_=h*.37,H_=h*.5;v.save();v.translate(x,y);v.rotate(rot||0);v.scale(sx||1,sy||1);
const path=()=>{v.beginPath();for(let i=0;i<=48;i++){const a=i/48*6.2832,c=Math.cos(a),px=W_*Math.sin(a)*(1-.13*c),py=-H_*c;i?v.lineTo(px,py):v.moveTo(px,py)}v.closePath()};
if(h>30){v.fillStyle="rgba(0,0,0,.25)";v.save();v.translate(h*.04,h*.05);path();v.fill();v.restore()}
path();const g0=v.createRadialGradient(-W_*.35,-H_*.38,h*.02,-W_*.1,-H_*.05,H_*1.25);g0.addColorStop(0,"#fffdf6");g0.addColorStop(.38,"#f6eddb");g0.addColorStop(.72,"#e2d2b4");g0.addColorStop(1,"#b8a07c");v.fillStyle=g0;v.fill();
v.save();path();v.clip();
const g1=v.createRadialGradient(W_*.55,H_*.6,1,W_*.55,H_*.6,H_*.95);g1.addColorStop(0,"rgba(110,80,50,.28)");g1.addColorStop(1,"rgba(110,80,50,0)");v.fillStyle=g1;v.fillRect(-W_*1.2,-H_*1.2,W_*2.4,H_*2.4);
const g2=v.createLinearGradient(-W_,0,-W_*.55,0);g2.addColorStop(0,"rgba(255,255,255,.5)");g2.addColorStop(1,"rgba(255,255,255,0)");v.fillStyle=g2;v.fillRect(-W_*1.2,-H_*1.2,W_*.7,H_*2.4);
v.fillStyle="rgba(150,115,80,.28)";for(let i=0;i<14;i++){const a=hzf(i+500)*6.283,r=hzf(i+520)*.82,px=Math.cos(a)*W_*r,py=Math.sin(a)*H_*r*.9;v.beginPath();v.arc(px,py,Math.max(.35,h*(.006+hzf(i+540)*.008)),0,7);v.fill()}
v.restore();
const sp=v.createRadialGradient(-W_*.36,-H_*.46,0,-W_*.36,-H_*.46,H_*.32);sp.addColorStop(0,"rgba(255,255,255,.95)");sp.addColorStop(1,"rgba(255,255,255,0)");v.fillStyle=sp;v.beginPath();v.ellipse(-W_*.36,-H_*.46,W_*.32,H_*.24,-.45,0,7);v.fill();
path();v.strokeStyle="rgba(70,48,28,.55)";v.lineWidth=Math.max(.7,h*.022);v.stroke();v.restore()}
/* screen position of the duck's left wing tip (same maths as the 3D duck in 07-duck-model.js) */
function ciTip(o,cx,gy,sc){if(!o.lwm)return[cx,gy-30];const Rr=mm(rZ(o.tilt||0),mm(rX(.1),rY(o.yaw)));let q=mv3(o.lwm,[0,-.95,0]);q=[q[0]-1,q[1]+1.35,q[2]];q=mv3(Rr,[q[0],q[1]-1.2,q[2]]);
const px=DN/2+q[0]*22,py=DN*.86-(q[1]+1.2)*22,k=DN*.56*sc,w=k*(o.sx||1),h=k*(o.sy||1);return[cx-w/2+px*w/DN,gy-.86*h+py*h/DN]}
function cineStart(){CI={t:0,an:0,rev:0,fx:[],wr:0};S="cine";tutInit();try{AC=AC||new AudioContext();AC.resume&&AC.resume()}catch(_){}}
function cineSkip(){CI.rev=0;introEnd()}
/* duck x: run in to x=150, then (after the throw) skate off to the right */
function ciX(d){if(d<CSR)return-60+210*(1-Math.pow(1-luC(d/60),2.2));const q=d-CSR;return 150+q*q*.06+q*1.2}
/* full duck pose for duck-frame dd (also gives the wing angle used for the egg) */
function ciPose(dd){const k=luC(dd/60),sp=dd<60?210*2.2*Math.pow(1-k,1.2)/60:dd>CSR?(dd-CSR)*.12+1.2:0,run=dd<60?luC(sp/3):0,sk=dd>=CSB,te=dd-80;
let yaw=dd<64?1.15:1.15-.8*ez(luC((dd-64)/14)),tilt=-.1*run+(dd>52&&dd<76?.2*Math.sin(Math.PI*luC((dd-52)/24)):0),hp=-.05,a=null,ra=null,sy=dd>52&&dd<76?.95:1,lift=0;
/* overhand throw: the wing sweeps one way round - back to the tail, up behind the head, over the top, forward, down */
if(te>=0&&te<46){if(te<10){const q=ez(te/10);a=.9*q;hp+=.2*q;tilt-=.05*q}
else if(te<22){const q=ez((te-10)/12);a=.9+1.6*q;hp+=.2-.42*q;tilt+=-.05-.05*q;sy=1-.07*q;ra=-1.1*q}
else if(te<27){const q=(te-22)/5;a=2.5+2.2*Math.pow(q,1.5);hp+=-.22+.42*q;tilt+=-.1+.22*q;sy=.93+.13*q;ra=-1.1+1.7*q}
else{const q=ez(luC((te-27)/19));a=4.7+1.583*q;hp+=.2*(1-q);tilt+=.12*(1-q);sy=1.06-.06*q;ra=.6*(1-q)}}
if(sk){yaw=.35+(1.15-.35)*ez(luC((dd-CSB+6)/10));if(dd>=CSO&&dd<CSO+10)lift=Math.sin((dd-CSO)/10*Math.PI)*16;tilt+=-.12*luC((dd-CSR)/20)}
const o={yaw,ev:1,an:sk?0:CI.an,rq:sk?0:run,sb:sk?1:0,air:lift>1?1:0,vy:lift>1?(dd<CSO+5?-3:2):0,v:sp/2.2,id:dd>78&&!sk&&te>46?1:0,sid:"ci",tilt,hp,wd:.2*run,sy,sx:1/sy};
if(a!=null)o.lwm=mm(rX(a),rZ(-.12));if(ra!=null)o.rwm=mm(rX(ra),rZ(.12));return{o,sp,sk,te,lift}}
function cineUpd(){const t=++CI.t;if(shk>0)shk=Math.max(0,shk-.4);
if(t>20&&Object.keys(PR).length&&t<CEND){cineSkip();return}
const d=t-CD0;if(d>=0){const k=luC(d/60),sp=d<60?210*2.2*Math.pow(1-k,1.2)/60:0;CI.an+=sp/2.2*.12;const x=ciX(d);
if(d<60&&sp>1.6&&d%7==0){snd.step(.9);for(let i=0;i<3;i++)CI.fx.push({x:x-10+(rn()-.5)*8,y:212,vx:-rn()*1.2,vy:-rn()*.8,l:22,s:2+rn()*3,c:"#d8d4e0"})}
if(d==52){noiz(.38,"bandpass",2400,800,.04,0,1.1);sfx(300,.25,"triangle",.014,190)}
if(d>52&&d<74&&d%2==0)CI.fx.push({x:x+14+(rn()-.5)*6,y:212,vx:1+rn()*2.2,vy:-rn()*1.3,l:20,s:2+rn()*2.5,c:"#d8d4e0"});
if(d==86){sfx(640,.06,"sine",.035,340);sfx(1150,.04,"sine",.014,1500,.04)}
if(d==92)noiz(.3,"bandpass",300,900,.02,0,.8);
if(t==CTHR-3)noiz(.2,"bandpass",700,2600,.04,0,1);if(t==CTHR+3)noiz(.34,"bandpass",280,2600,.03,0,.9);
if(t==CSPL){sfx(70,.5,"sine",.16,38);noiz(.28,"lowpass",1100,180,.1,0,.9);noiz(.09,"bandpass",1800,700,.05,0,1.2);sfx(420,.12,"sine",.03,160,.01);shk=5;if(typeof gpRumble=="function")gpRumble(240,.8,1);
for(let i=0;i<22;i++){const a=rn()*6.283,v=2+rn()*5;CI.fx.push({x:SPX+Math.cos(a)*20,y:SPY+Math.sin(a)*16,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,l:26+(rn()*14|0),s:1.5+rn()*2.5,c:i%4?"#f6f1e4":"#ffc928",g:.16})}}
if(d==CSB){snd.board();sfx(520,.05,"sine",.02,800)}if(d==CSO)snd.ollie();if(d==CSO+10)snd.land(4,1);
if(d>CSO+10&&d<206&&d%8==0)snd.clack(Math.min(1,(d-CSR)/30));if(d>CSR&&d<210)CI.wr+=.3+(d-CSR)*.02}
if(t==CMRG){sfx(330,.9,"sine",.02,660);noiz(.8,"bandpass",600,2400,.012,0,.8)}
if(t==COPN){sfx(58,1.4,"sine",.12,38);noiz(1.1,"lowpass",220,60,.04,0,.7)}
if(t==COPN+16){sfx(880,.6,"sine",.032);sfx(1320,.7,"sine",.014,0,.06);sfx(1760,.5,"sine",.007,0,.12)}
if(t==CTXT+2)noiz(.7,"bandpass",300,1300,.014,0,.6);
if(t==CCLS)sfx(180,.3,"sine",.03,120);if(t==CSQ)noiz(.4,"bandpass",400,3000,.03,0,.8);
for(let i=CI.fx.length;i--;){const f=CI.fx[i];f.x+=f.vx;f.y+=f.vy;f.vy+=f.g!=null?f.g:.03;f.vx*=.95;if(--f.l<=0)CI.fx.splice(i,1)}
if(t>=CEND){CI.rev=1;sfx(70,.9,"sine",.08,40);noiz(.6,"lowpass",300,1600,.03,0,.7);introEnd()}}
/* ---------- splat -> SLOWBRO eye ---------- */
const ciR=a=>50+9*Math.sin(3*a+1)+6*Math.sin(5*a+2)+4*Math.sin(7*a+.5);
/* the finished mark: thin white ring, heavy eyelid with a soft curved edge, gold pupil with a glint */
function ciMark(v,op,pa){const r=EYR;v.save();v.beginPath();v.arc(0,0,r-EYT,0,7);v.clip();const ly=r-op*r*1.06,sag=5*op;
v.fillStyle="#000";v.beginPath();v.moveTo(-r,ly);v.quadraticCurveTo(0,ly+sag*2,r,ly);v.lineTo(r,r);v.lineTo(-r,r);v.closePath();v.fill();
if(pa>0){v.globalAlpha*=pa;v.fillStyle="#ffb612";v.beginPath();v.arc(6,11,6.2,0,7);v.fill();v.fillStyle="rgba(255,255,255,.85)";v.beginPath();v.arc(4,9,1.3,0,7);v.fill()}v.restore()}
function ciEye(v,t){const st=t-CSPL,grow=.35+.65*ciEo(st/6),m=ez(luC((t-CMRG)/36)),op=t<CCLS?ez(luC((t-COPN)/22)):1-ez(luC((t-CCLS)/16)),
sq=ez(luC((t-CSQ)/12)),cx=SPX+(EYX-SPX)*m,cy=SPY+(EYY-SPY)*m,pa=t<CCLS?1:Math.max(0,1-(t-CCLS)/10);
v.save();v.translate(cx,cy);if(sq>0)v.scale(1+sq*4,1-sq*.94);
v.fillStyle="#f6f1e4";for(let i=0;i<5;i++){const dx=(hzf(i+100)-.5)*70,top=26*grow,len=Math.min(st,70)*(.35+hzf(i+120)*.5)*(1-m),w=4+hzf(i+140)*4;if(len<.5)continue;v.fillRect(dx-w/2,top,w,len);v.beginPath();v.arc(dx,top+len,w*.6,0,7);v.fill()}
for(let i=0;i<9;i++){const a=hzf(i+40)*6.283,r=(76+hzf(i+60)*30)*grow*(1-m),s=(2.5+hzf(i+80)*4)*(1-m*.7);if(s<.4)continue;v.beginPath();v.arc(Math.cos(a)*r,Math.sin(a)*r*.86,s,0,7);v.fill()}
const n=40,pts=[];for(let i=0;i<n;i++){const a=i/n*6.283,r=ciR(a)*grow*(1-m)+EYR*m;pts.push([Math.cos(a)*r,Math.sin(a)*r*(.86+.14*m)])}
v.beginPath();for(let i=0;i<=n;i++){const p=pts[i%n],q=pts[(i+1)%n],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;i?v.quadraticCurveTo(p[0],p[1],mx,my):v.moveTo(mx,my)}v.closePath();
v.fillStyle=m<1?"rgb("+[246+9*m,241+14*m,228+27*m].map(Math.round)+")":"#fff";v.fill();
if(m<1){const yr=22*grow+(6.2-22*grow)*m,yx=6*m,yy=11*m,yg=v.createRadialGradient(yx-yr*.3,yy-yr*.35,1,yx,yy,yr);yg.addColorStop(0,"#fff1a0");yg.addColorStop(.35,"#ffc928");yg.addColorStop(1,"#e88a0c");
v.fillStyle=m>.9?"#ffb612":yg;v.beginPath();v.arc(yx,yy,yr,0,7);v.fill();v.fillStyle="rgba(255,255,255,"+(.85*(1-m*.6))+")";v.beginPath();v.ellipse(yx-yr*.38,yy-yr*.42,Math.max(1,yr*.26),Math.max(.8,yr*.14),-.5,0,7);v.fill()}
else if(sq<.5)ciMark(v,op,pa);
v.restore();
if(sq>0){const gl=v.createRadialGradient(cx,cy,2,cx,cy,140);gl.addColorStop(0,"rgba(255,230,170,"+(.35*sq)+")");gl.addColorStop(1,"rgba(255,230,170,0)");v.fillStyle=gl;v.fillRect(cx-140,cy-60,280,120)}}
/* ---------- boot + intro screens (UI canvas, full black) ---------- */
function cineDraw(){const v=vg;v.save();v.setTransform(1,0,0,1,0,0);v.globalAlpha=1;v.fillStyle="#000";v.fillRect(0,0,W,H);
if(S=="boot"){v.globalAlpha=.45+.35*Math.sin(frame*.06);ciT(v,"PRESS ANY BUTTON",W/2,H/2+4,9,700,5,"#fff");v.restore();return}
const t=CI.t,d=t-CD0,hpz=Math.max(0,Math.min(4,d-124)),dd=d-hpz;
for(const f of CI.fx){v.globalAlpha=Math.min(1,f.l/14)*(f.g?1:.6);v.fillStyle=f.c;v.beginPath();v.arc(f.x,f.y,f.s*(f.g?1:1.6-f.l/22*.6),0,7);v.fill()}v.globalAlpha=1;
const gy=214,sc=2.2;
if(d>=0&&ciX(dd)<W+80){const x=ciX(dd),P_=ciPose(dd),o=P_.o,sp=P_.sp;
if(sp>3){v.strokeStyle="rgba(255,255,255,.2)";v.lineWidth=1.2;for(let i=0;i<4;i++){const y=146+i*16,l=18+((i*37+dd*7)%26);v.beginPath();v.moveTo(x-34-i*4,y);v.lineTo(x-34-i*4-l,y);v.stroke()}}
v.fillStyle="rgba(255,255,255,.06)";v.beginPath();v.ellipse(x,gy+2,26-P_.lift*.5,3.5,0,0,7);v.fill();
let dy=gy-P_.lift;if(dd>=CSB){const bp=ciEo((dd-CSB)/6),by=dd<CSO?gy-4-(1-bp)*14:gy-4-P_.lift;v.save();v.globalAlpha=Math.min(1,bp*1.5);v.translate(x,by);v.scale(sc,sc);boardPaint(v,BRD[(CS&&CS.bd)|0]||BRD[0],CI.wr);v.restore();if(dd>=CSO)dy-=4+3.62*sc-.4}
DT=v;duckDraw(x,dy,sc,o);DT=g;
/* egg held in the wing tip until release */
if(P_.te>=6&&t<CTHR){const[ex,ey]=ciTip(o,x,dy,sc);eggHQ(v,ex,ey,17,(P_.te<10?-.6:-.6+(P_.te-10)*.25),1,1)}}
/* egg in flight: leaves from the wing tip, tumbles toward the camera, motion trail, squash on impact */
if(t>=CTHR&&t<CSPL){const R0=ciPose(CTHR-CD0),[x0,y0]=ciTip(R0.o,ciX(CTHR-CD0),gy,sc),pos=q=>{const e=q*q;return[x0+(SPX-x0)*e,y0+(SPY-y0)*e-Math.sin(q*Math.PI)*34,17*(1+Math.pow(q,2.6)*3.4),q*3.2]};
const q=(t-CTHR)/(CSPL-CTHR),qs=q>.84?(q-.84)/.16:0;for(let i=3;i>0;i--){const qq=Math.max(0,q-i*.045),[gx,gy2,gs,gr]=pos(qq);v.globalAlpha=.12*(4-i)/3;eggHQ(v,gx,gy2,gs,gr,1,1)}v.globalAlpha=1;
const[ex,ey,es,er]=pos(q);eggHQ(v,ex,ey,es,er*(1-qs),1+qs*.32,1-qs*.28)}
if(t>=CSPL){const st=t-CSPL;
if(st<16){v.globalAlpha=(1-st/16)*.8;v.strokeStyle="#fff";v.lineWidth=3*(1-st/16)+.5;v.beginPath();v.arc(SPX,SPY,20+ciEo(st/16)*150,0,7);v.stroke();v.globalAlpha=1}
ciEye(v,t);if(st<4){v.fillStyle="rgba(255,255,255,"+(.45*(1-st/4))+")";v.fillRect(0,0,W,H)}
/* SLOWBRO PRODUCTION: clean tracked type that eases up into place */
const ta=luC((t-CTXT)/24)*(1-luC((t-CCLS)/16));if(ta>0){const up=(1-ciEo((t-CTXT)/30))*5;v.globalAlpha=ta;ciT(v,"SLOWBRO",EYX,EYY+62+up,20,800,9,"#fff");
const lw=ciEo((t-CTXT-14)/30)*96;v.fillStyle="rgba(255,182,18,.85)";v.fillRect(Math.round(EYX-lw/2),EYY+71,Math.round(lw),1);
v.globalAlpha=ta*luC((t-CTXT-24)/22);ciT(v,"PRODUCTION",EYX,EYY+86+up*.6,7.5,700,7,"rgba(255,255,255,.62)");v.globalAlpha=1}}
v.restore()}
/* ---------- the eye opens onto the main screen: an eye-shaped window that widens past the screen edges ---------- */
function cineReveal(){if(!CI.rev)return;if(tt>42){CI.rev=0;return}const v=vg,q=ez(luC(tt/34)),w=120+q*460,h=q*340,cx=EYX,cy=EYY;v.save();v.setTransform(1,0,0,1,0,0);
const eye=()=>{v.moveTo(cx-w,cy);v.quadraticCurveTo(cx,cy-h,cx+w,cy);v.quadraticCurveTo(cx,cy+h,cx-w,cy);v.closePath()};
v.beginPath();v.rect(0,0,W,H);eye();v.fillStyle="#000";v.fill("evenodd");
v.globalAlpha=Math.max(0,1-tt/26);v.beginPath();eye();v.strokeStyle="#fff";v.lineWidth=2;v.stroke();v.restore()}
