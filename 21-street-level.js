/* =====================================================================
   Street level (t1)
   Level-1 start, update, draw, ink effects, HUD and duck drawing.
   ===================================================================== */
function t1Start(){P.length=0;[[0,40],[42,52],[56,64],[78,108],[128,133],[137,144]].forEach(([a,b])=>sol(a,7,b-a,2,"g"));
sol(33,6,1,1,"c");sol(36,5,1,2,"c");ow(58,5,2,"r");ow(61,3,2,"r");ow(64,1,3,"r");ow(100,5,3,"r");sol(105,1,1,6,"k");HST.forEach(s=>s.got=0);P.forEach(q=>{if(q.k=="m")q.hp=22});
AN.length=0;T1AN.forEach(q=>AN.push(q));tAb=tBl=tCh=tFire=tOv=tGag=fR=0;BBL.length=0;EGG.length=EYK.length=0;tEg=eCd=0;shk=0;lvC=0;tCk=2;tAtt=null;tGl=0;tFx=[];water=MAXW;p={x:2*T,y:190,w:18,h:28,vx:0,vy:0,g:0,f:1,jb:0,coy:0,an:0};cam=0;dlg=null;FT1.forEach(q=>{q.g=SK[q.k]?2:0;q.t=0});BD.k=PCH.k=0;SFL.length=GP.length=0;bn=null;golemInit();S="t1"}
function t1Upd(){frame++;if(bn&&bn.t>0)bn.t--;if(pr("KeyN")){start(1);return}
const L=dn("ArrowLeft","KeyA"),Rt=dn("ArrowRight","KeyD"),jd=dn("Space","ArrowUp","KeyW"),run=tAb>0&&dn("ShiftLeft","ShiftRight"),a=p.g?(BD.k>.6?.42:.7):.45;
while(tAb<5&&p.x/T>=AX[tAb]){tAb++;chime()}CK.forEach(t=>{if(p.x/T>=t)tCk=t});
const gl=tGl=tAb>2&&!p.g&&!tAtt&&jd&&p.vy>.8;
if(L){p.vx-=a;p.f=-1}if(Rt){p.vx+=a;p.f=1}if(L==Rt&&!tAtt)p.vx*=p.g?(BD.k>.6?.965:.75):(tFl>0?.992:.95);
bdUpd(run&&!gl&&!tAtt);const mx=tAtt?9:Math.max(gl||BD.k>.6?4.4:2.7,tFl);p.vx=Math.max(-mx,Math.min(mx,p.vx));
p.jb=tAb>1&&pr("Space","ArrowUp","KeyW")?7:Math.max(0,p.jb-1);p.coy=p.g?9:Math.max(0,p.coy-1);
if(p.jb&&p.coy){p.vy=-9;bubJump();p.jb=p.coy=0;snd.jump()}
if(tAtt&&pr("Space","ArrowUp","KeyW")){if(tAtt.t>6){tFl=Math.min(9,Math.abs(p.vx)*1.15+.5);p.vy-=4}tAtt=null}
if(!jd&&p.vy<-3&&!(BUBJ>0))p.vy*=.6;p.vy=Math.min(p.vy+.5,11);if(gl)p.vy=Math.min(p.vy,1.1);
if(tAb>4&&pr("KeyQ")&&!tAtt){const cx=p.x+9,cy=p.y+10;let b=null,bd=1e9;for(const q of AN){const r=Math.hypot(q.x-cx,q.y-cy),d=r+((q.x-cx)*p.f<0?90:0);if(r<=190&&q.y<p.y&&d<bd){bd=d;b=q}}if(b){tAtt={x:b.x,y:b.y,a:b,L:Math.max(60,Math.hypot(b.x-cx,b.y-cy))};snd.scarf()}}
if(tAtt){SW.hx=tAtt.x+((tAtt.a&&tAtt.a.sw)||0)*4;SW.hy=tAtt.y+((tAtt.a&&tAtt.a.dy)||0);SW.k=Math.min(1,(tAtt.t||0)/6)}else SW.k=Math.max(0,SW.k-.15);tFl=p.g||tAtt?0:tFl*.992;
if(tAtt&&!dn("KeyQ")){if(tAtt.t>6){tFl=Math.min(9,Math.abs(p.vx)*1.15+.5);p.vx*=1.15;p.vy=p.vy*1.08-1.4;snd.fling();hookKick(tAtt.a,-2.4)}tAtt=null}
if(tAtt){tAtt.t=(tAtt.t||0)+1;const cx=p.x+9,cy=p.y+10;if(tAtt.t==6){tAtt.L=Math.max(50,Math.hypot(tAtt.x-cx,tAtt.y-cy));snd.hook();hookKick(tAtt.a,3.4);for(let i=0;i<9;i++){const an=rn()*6.28,v=1+rn()*2.5;fxAdd(tFx,{x:tAtt.x,y:tAtt.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v-1,l:16+(rn()*8|0),t:"c",s:3,c:i%2?scCol(0):"#fff"})}}
if(tAtt.t>6){const dx=cx+p.vx-tAtt.x,dy=cy+p.vy-tAtt.y,d=Math.hypot(dx,dy);if(d>tAtt.L){p.vx=tAtt.x+dx/d*tAtt.L-cx;p.vy=tAtt.y+dy/d*tAtt.L-cy}
const sg=Rt-L;if(sg&&Math.sign(p.vx)==sg)p.vx+=sg*.1;if(Math.hypot(p.vx,p.vy)>4&&frame%2==0)fxAdd(tFx,{x:cx,y:cy+4,vx:-p.vx*.3,vy:-p.vy*.3,l:8,t:"s",g:0,dr:.9})}}
hookUpd();spitUpd();eggInput(tAb>3);eggUpd();spt=0;
mv(p);pfUpd();p.x=Math.max(0,Math.min(TW-p.w,p.x));p.an+=Math.abs(p.vx)*.12;
if(p.y>H+40){tAtt=null;p.x=tCk*T;p.y=150;p.vx=p.vy=0;snd.fall()}
golemUpd();fxStep(tFx);hsUpd();flUpd();
cam+=(Math.max(0,Math.min(TW-W,p.x-W/2+p.f*40))-cam)*.1;
if(p.x>142*T&&!TRN.on){chime();lvRec(0,0,"",0);trans(storyStart)}}
function t1Draw(){const c=cam|0;bgOld(c);tsBack(c);g.save();g.translate(-c,0);tsGaps();
for(const q of P){const{x,y,w,h}=q;if(x+w<c-10||x>c+W+10)continue;
if(q.k=="g"){for(let xx=x;xx<x+w;xx+=T)rdt(xx)}
else if(q.k=="c")crateDraw(x,y,w,h);
else if(q.k=="m"){R(x,y,w,h,"#3a2f1c");for(let i=0;i<9;i++)R(x+4+(i*7)%20,y+6+i*10,8+i%3*3,6,"#5a4a2a")}
else if(q.k=="k"){}
else pfDraw(q)}
tsGapEdges();tsFlags();tsGhost();
for(const q of AN)hookDraw(g,q);
hsDraw();gpDraw();

{const x=142*T;R(x,160,40,64,"#0b0714");R(x,160,40,2,"#4ff");R(x,160,2,64,"#4ff");R(x+38,160,2,64,"#4ff")}

if(0){const x0=p.x+9+p.f*16,y0=p.y+10,x1=x0+p.f*tBe;g.strokeStyle="#000";g.lineWidth=7;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2,y0-4,x1,y0+tBe*.04);g.stroke();g.strokeStyle="#fff";g.lineWidth=4;g.stroke()}
if(0){g.strokeStyle="#b2182c";g.lineWidth=3;g.beginPath();g.moveTo(p.x+9,p.y+10);g.lineTo(tAtt.x,tAtt.y);g.stroke()}
for(const[a,b,t,col]of []){const x=a*T;if(x>c-330&&x<c+W){TX(b,x,92,col,32,"left");t.split("|").forEach((l,i)=>TX(l,x,118+i*15,"#fff",12,"left"))}}
g.restore()}
const iJ=(x,y)=>Math.sin(x*12.9+y*7.7+(frame>>3)*3.1)*1.1;
function iL(a,b,c,d){return;const n=Math.max(2,Math.hypot(c-a,d-b)/14|0);vg.beginPath();for(let i=0;i<=n;i++){const t=i/n,x=a+(c-a)*t,y=b+(d-b)*t;i?vg.lineTo(x+iJ(x,y),y+iJ(y,x)):vg.moveTo(x+iJ(x,y),y+iJ(y,x))}vg.stroke()}
const iR=(x,y,w,h)=>{iL(x,y,x+w,y);iL(x+w,y,x+w,y+h);iL(x+w,y+h,x,y+h);iL(x,y+h,x,y)};
function iH(x,y,w,h,s,a){return;vg.save();vg.beginPath();vg.rect(x,y,w,h);vg.clip();vg.globalAlpha=a;vg.lineWidth=1.2;vg.beginPath();for(let k=-h;k<w;k+=s){vg.moveTo(x+k,y+h);vg.lineTo(x+k+h,y)}vg.stroke();vg.restore()}
function t1Ink(){const c=cam|0;vg.save();vg.lineJoin=vg.lineCap="round";vg.strokeStyle="#000";
vg.lineWidth=2;for(const b of B1){const x=b.x-c*.2;if(x<-80||x>W)continue;iR(x,224-b.h,b.w,b.h)}
vg.translate(-c,0);
for(const q of P){const{x,y,w,h}=q;if(x+w<c-10||x>c+W+10)continue;
if(q.k=="k"){gateInk(q);continue}
if(q.k=="g"){vg.lineWidth=4;iL(x,224,x+w,224);vg.lineWidth=3;iL(x,224,x,290);iL(x+w,224,x+w,290);iH(x,232,w,56,6,.5)}
else{vg.lineWidth=3;iR(x,y,w,h);if(q.k=="c"){vg.lineWidth=1.8;iL(x,y,x+w,y+h);iL(x+w,y,x,y+h)}else if(q.k=="m")iH(x,y,w,h,4,.9)}}
for(const q of AN)hookDraw(vg,q);

{const x=142*T;vg.fillStyle="#000";vg.fillRect(x,160,40,64);vg.strokeStyle="#fff";vg.lineWidth=2;vg.strokeRect(x+3,163,34,58);vg.strokeStyle="#000"}
tsBanners(c);
vg.restore()}
function t1InkOld(){const c=cam|0;vg.save();vg.lineJoin="round";vg.strokeStyle="#000";
for(const b of B1){const x=b.x-c*.2;if(x<-80||x>W)continue;vg.fillStyle="rgba(24,18,40,.5)";vg.fillRect(x,224-b.h,b.w,b.h);vg.lineWidth=2.5;vg.strokeRect(x,224-b.h,b.w,b.h)}
for(const b of B2){const x=b.x-c*.5;if(x<-140||x>W)continue;vg.fillStyle="rgba(14,10,26,.8)";vg.fillRect(x,224-b.h,b.w,b.h);vg.lineWidth=3.5;vg.strokeRect(x,224-b.h,b.w,b.h);b.wn.forEach((l,i)=>{if(l){vg.fillStyle="#ffd77a";vg.fillRect(x+8+(i%b.cl)*16,224-b.h+10+((i/b.cl)|0)*18,8,10)}})}
vg.fillStyle="#000";vg.fillRect(0,224,W,64);vg.translate(-c,0);
for(const q of P){const{x,y,w,h}=q;if(x+w<c-10||x>c+W+10)continue;vg.lineWidth=3;
if(q.k=="g"){vg.fillStyle="#352d4a";vg.fillRect(x,224,w,64);vg.fillStyle="#cdbfe0";vg.fillRect(x,224,w,4);vg.strokeRect(x,224,w,72)}
else{vg.fillStyle=q.k=="c"?"#b9854d":q.k=="m"?"#3a2f1c":q.k=="b"?"#c9a36b":"#6d6288";vg.fillRect(x,y,w,h);vg.strokeRect(x,y,w,h);if(q.k=="m")for(let i=0;i<9;i++){vg.fillStyle="#7a6636";vg.fillRect(x+4+(i*7)%20,y+6+i*10,8+i%3*3,6)}}}
for(const q of AN){vg.lineWidth=3;vg.beginPath();vg.moveTo(q.x,0);vg.lineTo(q.x,q.y-9);vg.stroke();vg.fillStyle="#ffc928";vg.beginPath();vg.arc(q.x,q.y,9,0,7);vg.fill();vg.stroke()}
const s=tSw;vg.fillStyle=s.on?"#3dff5a":"#ff3030";vg.lineWidth=4;vg.beginPath();vg.arc(s.x,s.y,12,0,7);vg.fill();vg.stroke();vg.fillStyle="#fff";vg.beginPath();vg.arc(s.x,s.y,4,0,7);vg.fill();
{const x=142*T;vg.fillStyle="#0b0714";vg.fillRect(x,160,40,64);vg.strokeStyle="#4ff";vg.lineWidth=3;vg.strokeRect(x,160,40,64);vg.strokeStyle="#000"}
for(const[a,b,t,col]of []){const x=a*T;if(x<c-340||x>c+W)continue;vg.font="40px "+FB;vg.textAlign="left";vg.lineWidth=11;vg.strokeStyle="#000";vg.strokeText(b,x,96);vg.fillStyle=col;vg.fillText(b,x,96);vg.font="bold 13px "+FM;const ls=t.split("|"),w=Math.max(...ls.map(l=>vg.measureText(l).width));vg.fillStyle="rgba(0,0,0,.82)";vg.fillRect(x-4,106,w+14,ls.length*17+6);vg.fillStyle="#fff";ls.forEach((l,i)=>vg.fillText(l,x+3,121+i*17))}
vg.restore()}
function t1Hud(){const c=cam|0;vg.save();vg.translate(-c,0);vg.lineCap="round";
swingScarf();if(0){vg.beginPath();vg.moveTo(p.x+9,p.y+10);vg.lineTo(tAtt.x,tAtt.y);vg.strokeStyle="#000";vg.lineWidth=6;vg.stroke();vg.strokeStyle="#e0203c";vg.lineWidth=3.5;vg.stroke()}
if(tFire>0&&tBe>0){const k=Math.min(1,(27-tFire)/4),fd=Math.min(1,tFire/7),[x0,y0]=mouthXY(),x1=x0+p.f*tBe*k,pu=1+Math.sin(frame*.9)*.12,yy=y0+tBe*.05*k;

[["#04257a",11],["#1e78ff",8],["#7fc4ff",4],["#e6f6ff",1.5]].forEach(([col,w],j)=>{vg.strokeStyle=col;let px=x0,py=y0;for(let i=1;i<=12;i++){const u=i/12,nx=x0+(x1-x0)*u,ny=y0+(yy-y0)*u*u+Math.sin(frame*.7-u*14)*1.6*u*(1-j*.2);vg.lineWidth=w*fd*(j>1?pu:1)*(.3+.7*Math.min(1,u*5));vg.beginPath();vg.moveTo(px,py);vg.lineTo(nx,ny);vg.stroke();px=nx;py=ny}});
vg.fillStyle="#e6f6ff";vg.beginPath();vg.arc(x1,yy,5*fd*pu,0,7);vg.fill();vg.globalAlpha=.4*fd;vg.fillStyle="#7fc4ff";vg.beginPath();vg.arc(x1,yy,9,0,7);vg.fill();vg.globalAlpha=1}

if(tCh>0){const x=p.x+9-22,y=p.y-16,f=tCh/60,gr=vg.createLinearGradient(x,0,x+44,0);gr.addColorStop(0,"#2ecc40");gr.addColorStop(.5,"#ffdc00");gr.addColorStop(1,"#ff3030");vg.fillStyle="#000";vg.fillRect(x-3,y-3,50,12);vg.globalAlpha=.3;vg.fillStyle=gr;vg.fillRect(x,y,44,6);vg.globalAlpha=1;vg.save();vg.beginPath();vg.rect(x,y,44*f,6);vg.clip();vg.fillStyle=gr;vg.fillRect(x,y,44,6);vg.restore();if(tOv>0){vg.strokeStyle=frame%8<4?"#ff3030":"#fff";vg.lineWidth=2;vg.strokeRect(x-3,y-3,50,12)}}
vg.restore();if(S!="t1")return;tsFront(c);tsTrack();
vg.font="bold 14px "+FM;if(bn&&bn.t>0){const bw=vg.measureText(bn.s).width+28;vg.fillStyle=INK;luInk(W/2-bw/2,10,W/2+bw/2,38,7,2);vg.textAlign="center";vg.fillStyle="#ffd66b";vg.fillText(bn.s,W/2,31)}
vg.fillStyle=INK;luInk(6,6,70,38,5,2);starIcon(vg,23,22,7+(CN.sb>0?CN.sb*.3:0),HSN()>0);vg.font="bold 15px "+FM;vg.textAlign="left";vg.lineWidth=4;vg.strokeStyle="#000";vg.strokeText(""+HSN(),37,27);vg.fillStyle="#ffe680";vg.fillText(""+HSN(),37,27);starFly(vg)}
function t1Duck(){const A=pa(p),c=cam|0;DT=vg;DK.yaw+=((PCH.k>.1?p.f*.4:p.f*1.15)-DK.yaw)*.2;A.yaw=DK.yaw;if(PCH.k>0){A.fl=1.5+PCH.k*1.2;A.tilt=Math.sin(frame*.07)*.07*PCH.k-p.vx*.015}if(tAtt){const hd=(tAtt.t||0)>=6;A.nsc=1;A.fl=hd?1.35+Math.sin(frame*.25)*.07:1.7;A.tilt=hd?-Math.atan2(tAtt.x-p.x-9,p.y+10-tAtt.y)*.6-p.vx*.02:-p.vx*.04;if(!hd)A.hp=-.3}else if(SW.k>0)A.nsc=1;if(!tAtt&&PCH.k<=0){spitApply(A);eggApply(A)}vg.save();vg.translate(p.x+9-c,p.y+p.h);chuteDraw();boardDraw();duckDraw(A.jx||0,bdY(),1,A);tearDraw(A);vg.restore();DT=g}
