/* =====================================================================
   90s streetwear penguin (tutorial enemy)
   Enemy drawing + AI. Code names still say "golem" (golemInit, golemUpd, ...).
   ===================================================================== */
/* ---- 90s streetwear penguin (tutorial enemy; code names still say golem) ---- */
const GLM=[],GLP=[],GSW=[],GPO=[],GCV=document.createElement("canvas"),GT={gate:null};GCV.width=190;GCV.height=150;
const GX=GCV.getContext("2d"),GST="#b09a72",GHI="#d4c196",GLO="#7d6a48",GIN="#2a1d17",GMS="#64a230",GML="#98d65a",GMD="#3e7a22",GCY="#5ff3ff";
const GRN=[[[-3,-6,-3,6],[-3,-6,2,-3],[2,-3,-3,0],[-3,0,3,6]],[[-3,-6,-3,6],[-3,-3,3,-6],[-3,1,3,-2]],[[-2,-6,-2,6],[-2,-1,3,-5]],[[-3,-6,-3,6],[-3,-4,3,0],[-3,0,3,4]],[[-3,-6,3,6],[3,-6,-3,6],[-3,-6,-3,6]]];
function gRR(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function gMoss(c,x,y,w){const l=x-w/2,n=4;c.beginPath();c.moveTo(l,y+2);for(let i=0;i<n;i++)c.quadraticCurveTo(l+w*(i+.5)/n,y-6-(i%2)*2.5,l+w*(i+1)/n,y+2);for(let i=n;i>0;i--)c.quadraticCurveTo(l+w*(i-.5)/n,y+5+((i*5)%3)*3.2,l+w*(i-1)/n,y+2);c.closePath();c.fillStyle=GMS;c.fill();c.lineWidth=1.5;c.strokeStyle=GMD;c.stroke();c.fillStyle=GML;for(let i=0;i<3;i++){c.beginPath();c.arc(l+w*(.2+i*.3),y-1.5,1.7,0,7);c.fill()}}
function gStn(c,x,y,w,h,r,mo){const l=x-w/2,t=y-h/2;gRR(c,l,t,w,h,r);c.fillStyle=GST;c.fill();c.save();gRR(c,l,t,w,h,r);c.clip();c.fillStyle=GLO;c.fillRect(l,t+h*.64,w,h*.4);c.fillStyle=GHI;c.beginPath();c.ellipse(l+w*.34,t+h*.27,w*.3,h*.2,-.3,0,7);c.fill();c.strokeStyle="rgba(60,40,25,.5)";c.lineWidth=1;c.beginPath();c.moveTo(l+w*.64,t+h*.12);c.lineTo(l+w*.52,t+h*.45);c.lineTo(l+w*.68,t+h*.72);c.stroke();c.restore();gRR(c,l,t,w,h,r);c.lineWidth=2.4;c.strokeStyle=GIN;c.stroke();if(mo)gMoss(c,x,t,w*mo)}
function gRune(c,x,y,k,a,s=1){if(a<=0)return;c.save();c.strokeStyle="rgba(95,243,255,"+a+")";c.shadowColor="#2fe6ff";c.shadowBlur=7;c.lineWidth=2.2*s;c.lineCap="round";c.beginPath();for(const q of GRN[k%GRN.length]){c.moveTo(x+q[0]*s,y+q[1]*s);c.lineTo(x+q[2]*s,y+q[3]*s)}c.stroke();c.restore()}
function gLeaf(c,x,y,a,s){c.save();c.translate(x,y);c.rotate(a);c.fillStyle=GML;c.strokeStyle=GMD;c.lineWidth=1.2;c.beginPath();c.ellipse(s*.6,0,s,s*.5,0,0,7);c.fill();c.stroke();c.restore()}
function gFlower(c,x,y,col){c.fillStyle=col;c.beginPath();c.arc(x,y,2.3,0,7);c.fill();c.fillStyle="#fff";c.beginPath();c.arc(x,y,.9,0,7);c.fill()}
function golemInit(){GLM.length=GLP.length=GSW.length=GPO.length=0;GLM.push({gl:1,x:95*T-12,y:190,bw:24,bh:34,cx:12,cy:18,hp:10,mx:10,d:-1,s:"idle",t:0,fl:0,aw:0,dead:0,dt:0,gone:0,ph:0,sp:0,cd:60,arm:0,bc:0});GT.gate=P.find(q=>q.k=="k")||null}
const gv=e=>Math.max(.25,1-Math.abs(p.x+9-(e.x+12))/650);
/* big enemies have no health: any hit knocks the penguin out (see golemKO in 35-egg-attack.js) */
function golemHit(e,b,R){const dx=Math.max(e.x-b.x,0,b.x-(e.x+e.bw)),dy=Math.max(e.y-6-b.y,0,b.y-(e.y+e.bh));if(Math.hypot(dx,dy)>=R)return;golemKO(e,b.x)}
function golemSlam(e){const cx=e.x+12;GSW.push({x:cx-18,d:-1,t:0,h:0},{x:cx+18,d:1,t:0,h:0});dust(cx-16,224,8,6);dust(cx+16,224,8,6);shk=Math.max(shk,2.6);snd.gslam(gv(e))}
function golemLand(e){dust(e.x+12+e.fd*30,224,8,5);shk=Math.max(shk,2.2);snd.gslam(gv(e));ban("Penguin down! The gate opens >>")}
function golemCrumble(e){e.gone=1}
function golemUpd(){
for(let i=GPO.length;i--;){const q=GPO[i];q.y-=.45;if(--q.l<=0)GPO.splice(i,1)}
for(let i=GLP.length;i--;){const q=GLP[i];q.x+=q.vx;q.y+=q.vy;q.vy+=.4;q.r+=q.vr;const gy=224-q.s*.4;if(q.y>gy){q.y=gy;q.vy*=-.35;q.vx*=.7;q.vr*=.6}if(--q.l<=0)GLP.splice(i,1)}
for(let i=GSW.length;i--;){const w=GSW[i];w.x+=w.d*4.6;w.t++;if(w.t%3==0)dust(w.x,224,1,2);if(!w.h&&p.g&&Math.abs(p.x+9-w.x)<15){w.h=1;p.vx=w.d*7;p.vy=-4.5;p.g=0;snd.bump()}if(w.t>46)GSW.splice(i,1)}
const e=GLM[0];if(!e)return;const G=GT.gate;
if(G&&e.dead&&e.dt>26){if(e.dt==27)snd.gate();G.y+=2.2;G.h-=2.2;if(G.h<=0){P.splice(P.indexOf(G),1);GT.gate=null}else if(e.dt%6==0)dust(G.x+16,224,1,3)}
if(e.dead){e.dt++;if(e.dt==22)golemLand(e);if(e.dt>=88&&!e.gone)golemCrumble(e);return}
e.t++;if(e.fl>0)e.fl--;if(e.cd>0)e.cd--;if(e.bc>0)e.bc--;
const cx=e.x+12,dx=p.x+9-cx,ad=Math.abs(dx);
if(!e.aw){if(ad<440){e.aw=1;ban("A 90s penguin blocks the road!")}else return}
if(e.s=="wind"){e.arm=bsm(Math.min(1,e.t/36));if(e.t>=36){e.s="slam";e.t=0;golemSlam(e)}}
else if(e.s=="slam"){e.arm=Math.max(0,1-e.t/6);if(e.t>=30){e.s="idle";e.t=0;e.cd=80}}
else{e.d=dx>0?1:-1;
if(ad>115){const nx=Math.max(2766,Math.min(3256,e.x+e.d*.5));if(nx!=e.x){e.x=nx;e.s="walk";e.ph+=.085;const k=Math.floor(e.ph/Math.PI);if(k!=e.sp){e.sp=k;snd.gstep(gv(e))}}else e.s="idle"}else e.s="idle";
if(ad<165&&e.cd<=0){e.s="wind";e.t=0;snd.gwind(gv(e))}
if(e.bc<=0&&ad<28&&p.y+p.h>e.y+10){p.vx=(dx>0?1:-1)*6.5;p.vy=-4.5;p.g=0;e.bc=30;snd.bump()}}}
const PXM={sh:eb(.62,.34,.92,[246,246,246]),toe:eb(.46,.26,.48,[216,35,42],8,6),hl:eb(.34,.3,.36,[216,35,42],7,5),co:eb(.5,.13,.5,[21,21,27],8,5),
jg:eb(.8,.98,.8,[76,118,184],10,7),jh:eb(.96,.3,.96,[122,164,224],10,5),jk:eb(.46,.34,.22,[150,185,235],7,5),bx:eb(1.5,.14,1.15,[217,58,58],10,5),
bd:eb(1.62,1.12,1.25,[31,107,63],10,7),hm:eb(1.68,.22,1.3,[255,182,18],10,5),bl:eb(.7,.86,.42,[246,246,242],9,7),pt:eb(.3,.3,.1,[255,182,18],7,5),pd:eb(.12,.14,.06,[31,107,63],6,4),
cl:eb(.98,.3,.92,[255,182,18],10,5),ch:eb(.14,.14,.14,[255,210,74],6,5),pn:eb(.36,.36,.13,[255,210,74],8,6),
sl:eb(.44,.9,.46,[255,182,18],8,6),cu:eb(.48,.2,.5,[31,107,63],8,5),fl:eb(.36,.58,.3,[42,36,56],8,6),
hd:eb(1.15,1,1.05,[42,36,56],10,7),ey:eb(.38,.4,.22,[250,250,250],8,6),es:eb(.38,.27,.22,[250,250,250],8,6),pu:eb(.14,.19,.1,[24,24,30],6,5),ec:eb(.34,.05,.1,[24,24,30],6,4),bw:eb(.24,.06,.1,[24,24,30],5,4),
bk:eb(.3,.14,.55,[255,140,24],8,5),bl2:eb(.26,.09,.42,[226,104,12],8,5),mo:eb(.24,.08,.3,[58,15,12],6,4),
cr:eb(1.06,.64,1.02,[35,95,59],10,6),br:eb(.98,.1,.9,[255,182,18],10,4),lg:eb(.32,.32,.1,[255,182,18],7,5),lg2:eb(.13,.13,.08,[35,95,59],6,4),bu:eb(.1,.1,.1,[255,182,18],5,4),sg:eb(.34,.27,.16,[16,16,22],8,6),sb:eb(.5,.05,.07,[16,16,22],6,4),sq:eb(.1,.06,.04,[255,255,255],5,4),gt:eb(.2,.07,.12,[255,210,74],6,4)};
function scribbleG(){const D=DI.data,f=frame>>2,gl=DK.gl||0,at=(x,y)=>x<0||y<0||x>=DN||y>=DN?0:IB[y*DN+x],h=(x,y)=>((x*7919+y*104729+f*31)%97)/97;
for(let y=0;y<DN;y++)for(let x=0;x<DN;x++){const i=y*DN+x,k=i*4,id=IB[i],
ax=Math.round(Math.sin(y*.23+f*1.9)*1.8+Math.sin(y*.09+f*.7)*1.4),ay=Math.round(Math.sin(x*.21+f*2.3)*1.8+Math.sin(x*.07+f)*1.2),
bx=Math.round(Math.sin(y*.31+f*2.7+2)*2.2),by=Math.round(Math.cos(x*.27+f*1.3)*2.2),r=1+(h(x,y)>.45?1:0),
ed=(sx,sy)=>{const n=[at(sx+r,sy),at(sx-r,sy),at(sx,sy+r),at(sx,sy-r)];return id?n.some(v=>v<id):n.some(v=>v)};
let ln=ed(x+ax,y+ay)||(h(x*5,y*3)>.62&&ed(x+bx,y+by));if(ln&&h(x*3,y*5)<.1)ln=0;
if(ln){const c=gl>.6?255:0;D[k]=c||30;D[k+1]=c||22;D[k+2]=c||40;D[k+3]=255;continue}
if(!id){D[k+3]=0;continue}
const l=LB[i],q=((l<.45&&(x+y+(f&1)*2)%4<1.5)?.7:1)*((l<.1&&(x-y+DN)%4<1.5)?.62:1)*((l<-.2&&(x*2+y+f)%6<1)?.5:1),gr=(h(x*2,y)-.5)*26+(l>.75&&h(x,y*3)>.93?30:0);
for(let c=0;c<3;c++){const v=D[k+c]*q+gr;D[k+c]=Math.max(0,Math.min(255,v+(255-v)*gl))}}}
function golemSprite(e){const c=GX,t=frame,mv=e.s=="walk",wd=e.s=="wind",sl=e.s=="slam",hu=e.fl>0||e.dead,sd=e.d||1,ar=e.arm,SP=13.2,P=PXM,
bob=mv?-Math.abs(Math.sin(e.ph))*.12:Math.sin(t*.07)*-.05,
lean=mv?Math.sin(e.ph)*.07:wd?-sd*.1*ar:sl?sd*.09*Math.max(0,1-e.t/8):Math.sin(t*.05)*.015,
lf=s=>mv?Math.max(0,Math.sin(e.ph+(s>0?0:Math.PI)))*.35:0,op=wd||sl?.22:hu?.1:0,
Rr=mm(rX(.08),rY(sd*1.0)),
GRp={b:[rZ(-lean),[0,2,0]],h:[mm(rZ(hu?-sd*.2:wd?sd*.05:0),rX(hu?.1:0)),[0,4,0]],l:[rZ(-(ar*2.85+.12)),[-1.6,3.9,0]],r:[rZ(ar*2.85+.12),[1.6,3.9,0]],c:[mm(mm(rZ(hu?-sd*.2:wd?sd*.05:0),rX(hu?.1:0)),mm(rZ(sd*.26),rX(-.12))),[0,4.9,0]]},Q=[];
for(const s of[-1,1])Q.push([P.jg,s*.78,1.15+lf(s)*.5,0],[P.jh,s*.78,.55+lf(s)*.5,0],[P.jk,s*.78,1.3+lf(s)*.5,.68]);
for(const s of[-sd,sd])Q.push([P.sh,s*.78,.32+lf(s),.3],[P.toe,s*.78,.27+lf(s),.72],[P.hl,s*.78,.38+lf(s),-.4],[P.co,s*.78,.8+lf(s),.12]);
for(const[s,g]of[[-1,"l"],[1,"r"]])Q.push([P.sl,s*1.78,3.2,0,g],[P.cu,s*1.8,2.45,0,g],[P.fl,s*1.82,1.85,0,g]);
Q.push([P.bd,0,3.15,0,"b"],[P.bx,0,2.08,0,"b"],[P.hm,0,2.35,0,"b"],[P.bl,0,3.15,.92,"b"],[P.pt,-.98,3.42,.9,"b"],[P.pd,-.98,3.42,.98,"b"],[P.cl,0,3.95,.1,"b"]);
for(let i=0;i<7;i++){const u=(i-3)/3,cx=u*.62,cy=3.75-.75*(1-u*u);Q.push([P.ch,cx,cy,.92+.42*Math.sqrt(Math.max(0,1-(cx/.7)**2-((cy-3.15)/.86)**2))+.05,"b"])}
Q.push([P.pn,0,2.82,1.4,"b"],[P.hd,0,4.65,.1,"h"]);
for(const s of[-1,1])Q.push(hu?[P.ec,s*.46,4.62,.98,"h"]:[P.sg,s*.46,wd||sl?4.55:4.62,1,"h"]);
if(!hu){Q.push([P.sb,0,wd||sl?4.58:4.65,1.12,"h"]);for(const s of[-1,1])Q.push([P.sq,s*.46-.1,(wd||sl?4.55:4.62)+.1,1.17,"h"])}
if(wd||sl)for(const s of[-1,1])Q.push([P.bw,s*.22,4.84,1.18,"h"],[P.bw,s*.64,4.96,1.06,"h"]);
if(op>0)Q.push([P.mo,0,4.3-op*.4,1.15,"h"]);
Q.push([P.bl2,0,4.2-op,1.12,"h"],[P.bk,0,4.38,1.25,"h"],[P.cr,0,5.3,.12,"c"],[P.br,0,5.05,1,"c"],[P.lg,0,5.42,1.05,"c"],[P.lg2,.04,5.42,1.1,"c"],[P.bu,0,5.95,.12,"c"],[P.gt,0,4.2-op,1.33,"h"]);
DI.data.fill(0);ZB.fill(-1e9);IB.fill(0);let pid=0;
for(const[m,x,y,z,gk]of Q){pid++;const G2=gk?GRp[gk]:null,Rg=G2&&G2[0],pv=G2&&G2[1],
vs=m.V.map(v=>{let q=[v[0]+x,v[1]+y+(gk?bob:0),v[2]+z];if(Rg){q=mv3(Rg,[q[0]-pv[0],q[1]-pv[1],q[2]-pv[2]]);q=[q[0]+pv[0],q[1]+pv[1],q[2]+pv[2]]}q=mv3(Rr,[q[0],q[1]-1.2,q[2]]);return[DN/2+q[0]*SP,DN*.86-(q[1]+1.2)*SP,q[2]]}),
ns=m.N.map(n=>mv3(Rr,Rg?mv3(Rg,n):n));for(const[i,j,k]of m.I)tri(vs[i],vs[j],vs[k],ns[i],ns[j],ns[k],m.col,pid)}
const og=DK.gl;DK.gl=e.fl>0&&e.fl%4<2?.5:0;scribbleG();DK.gl=og;dx.putImageData(DI,0,0);
c.clearRect(0,0,190,150);const s=.56,j=Math.sin((t>>2)*12.9898)*1.3,sh=[0,0];
c.drawImage(dc,95-64*s+j+sh[0],141-110.08*s-j*.6+sh[1],128*s,128*s)}
function golemDraw(){const e=GLM[0],v=vg;v.save();v.translate(-(cam|0),0);
for(const w of GSW){const a=Math.max(0,1-w.t/46),h=12*a+4;v.save();v.globalAlpha=a;v.fillStyle="#e4dcf0";v.strokeStyle="#2a2238";v.lineWidth=2;v.beginPath();v.moveTo(w.x-w.d*14,224);v.quadraticCurveTo(w.x-w.d*2,224-h*2,w.x+w.d*7,221);v.lineTo(w.x+w.d*7,224);v.closePath();v.fill();v.stroke();v.restore()}
if(e&&!e.gone){const dd=e.dead?e.dt:0,fx=e.fd||1,fa=e.dead?Math.max(0,Math.min(1,1-(dd-46)/40)):1,an=e.dead?(dd<22?(dd/22)**2*1.52:1.52-Math.max(0,1-(dd-22)/10)*Math.abs(Math.sin((dd-22)*.6))*.1):0;v.save();v.globalAlpha=fa;v.fillStyle="rgba(0,0,0,.3)";v.beginPath();v.ellipse(e.x+12+fx*an*9,225,18+an*12,3,0,0,7);v.fill();golemSprite(e);v.translate(Math.round(e.x+12+fx*12),224);v.rotate(fx*an);v.drawImage(GCV,-fx*12-95,-141);v.restore();}
for(const q of GLP){v.save();v.globalAlpha=Math.min(1,q.l/24);v.translate(q.x,q.y);v.rotate(q.r);if(q.c=="#f6f6f2"){v.beginPath();v.ellipse(0,0,q.s*.75,q.s*.26,0,0,7)}else gRR(v,-q.s/2,-q.s/2,q.s,q.s,3);v.fillStyle=q.c;v.fill();v.lineWidth=2;v.strokeStyle=GIN;v.stroke();v.restore()}
v.font="bold 14px "+FM;v.textAlign="center";for(const q of GPO){v.globalAlpha=Math.min(1,q.l/16);v.lineWidth=4;v.strokeStyle="#000";v.strokeText(q.s,q.x,q.y);v.fillStyle="#fff";v.fillText(q.s,q.x,q.y)}v.globalAlpha=1;v.restore()}
function gateInk(q){const v=vg,x=q.x,y=q.y,h=q.h;if(h<=0)return;const e=GLM[0],dead=e&&e.dead,fade=dead?Math.max(0,1-e.dt/26):1;v.save();v.beginPath();v.rect(x-8,y-16,q.w+16,h+16);v.clip();
const n=Math.ceil((h+30)/24);for(let i=0;i<n;i++){const yy=y+i*24,o=(i%2)*3-1.5;gStn(v,x+q.w/2+o,yy+12,q.w+6,23,5,i==0?.95:0);if(i%2==1)gRune(v,x+q.w/2,yy+12,i,fade*(.6+.3*Math.sin(frame*.08+i)),.9)}
v.strokeStyle="#2f6a1e";v.lineWidth=2.2;v.lineCap="round";v.beginPath();v.moveTo(x+6,y+4);v.bezierCurveTo(x-2,y+30,x+12,y+52,x+4,y+84);v.stroke();[[x+4,y+22,.6],[x+7,y+40,-.5],[x+8,y+58,.7],[x+4,y+76,-.4]].forEach(([a,b,r])=>gLeaf(v,a,b,r,5));
v.restore()}
