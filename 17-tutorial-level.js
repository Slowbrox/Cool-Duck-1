/* =====================================================================
   Tutorial level
   Tutorial level platform copy (PM), quick-spit and movement helper moveA.
   ===================================================================== */
/* ---- tutorial level ---- */
const PM=P.slice(),TW=145*T,AX=[14,30,56,78,106],CK=[2,15,31,43,57,79,98,106,129],
MSG=["SPRINT unlocked: hold SHIFT while running","JUMP unlocked: Space / W","GLIDE unlocked: hold Space in the air","EGG unlocked: F / CLICK to throw an egg","SCARF unlocked: Q / right-click near a hook"],
TXT=[[2,"WALK","<- ->  or  A D","#ffc928"],[15,"SKATE","hold SHIFT: your duck rides a skateboard","#e8302a"],[31,"JUMP","SPACE / W  (hold = higher)","#2e7fd1"],[44,"SKATE + JUMP","a 4-tile gap: skate, then jump!","#e8302a"],
[57,"GLIDE","climb up, jump off, HOLD SPACE|your jacket becomes a parachute","#7cff6b"],[79,"EGG","F / CLICK: grab an egg|and throw it","#ff4fd8",-34],[85,"BIG ENEMY","a gangsta penguin blocks the road!|one egg knocks him out - jump its shockwave","#ff4fd8",-50],
[106,"SCARF","Q / right-click near a hook, HOLD to swing,|run left/right to pump, RELEASE to fly","#ffc928"],[129,"ALL TOGETHER","skate, jump, then wash the wall!","#e8302a"],[141,"EXIT","to the street  >>","#ffc928"]],
AN=[[110.5,2],[117.5,2],[124.5,2]].map(([a,b])=>({x:a*T,y:b*T}));
let MB=0,tCh=0,tFire=0,tOv=0,tGag=0,fR=0,tAb,tAtt,tBl,tBe,tSw,tCk,tGl,tFx=[];
addEventListener("pointerdown",e=>{if(e.target.tagName=="BUTTON")return;if(e.button==2){K.KeyQ=1;PR.KeyQ=1}else MB=1});
addEventListener("pointerup",e=>{MB=0;if(e.button==2)K.KeyQ=0});addEventListener("contextmenu",e=>e.preventDefault());

const T1AN=AN.slice(),SGN=[[44.3,"SPRINT + JUMP"],[67.6,"HOLD SPACE: GLIDE"],[59.8,"F: THROW EGG"],[93,"WASH THE WALL"],[98.2,"Q: SWING ON HOOKS"]];
function moveA(){const L=dn("ArrowLeft","KeyA"),Rt=dn("ArrowRight","KeyD"),jd=dn("Space","ArrowUp","KeyW"),run=dn("ShiftLeft","ShiftRight"),a=p.g?(BD.k>.6?.42:.7):.45,gl=tGl=!p.g&&!tAtt&&jd&&p.vy>.8;
if(L){p.vx-=a;p.f=-1}if(Rt){p.vx+=a;p.f=1}if(L==Rt&&!tAtt)p.vx*=p.g?(BD.k>.6?.965:.75):(tFl>0?.992:.95);
bdUpd(run&&!gl&&!tAtt);const mx=tAtt?9:Math.max(gl||BD.k>.6?4.4:2.7,tFl);p.vx=Math.max(-mx,Math.min(mx,p.vx));
p.jb=pr("Space","ArrowUp","KeyW")?7:Math.max(0,p.jb-1);p.coy=p.g?9:Math.max(0,p.coy-1);
if(p.jb&&p.coy){p.vy=soda>0?-11:-9;bubJump();p.jb=p.coy=0;snd.jump()}
if(tAtt&&pr("Space","ArrowUp","KeyW")){if(tAtt.t>6){tFl=Math.min(9,Math.abs(p.vx)*1.15+.5);p.vy-=4}tAtt=null}
if(!jd&&p.vy<-3&&!(BUBJ>0))p.vy*=.6;p.vy=Math.min(p.vy+.5,11);if(gl)p.vy=Math.min(p.vy,1.1);
if(pr("KeyQ")&&!tAtt){const cx=p.x+9,cy=p.y+10;let b=null,bd=1e9;for(const q of AN){const r=Math.hypot(q.x-cx,q.y-cy),d=r+((q.x-cx)*p.f<0?90:0);if(r<=190&&q.y<p.y&&d<bd){bd=d;b=q}}if(b){tAtt={x:b.x,y:b.y,a:b,L:Math.max(60,Math.hypot(b.x-cx,b.y-cy))};snd.scarf()}}
if(tAtt){SW.hx=tAtt.x+((tAtt.a&&tAtt.a.sw)||0)*4;SW.hy=tAtt.y+((tAtt.a&&tAtt.a.dy)||0);SW.k=Math.min(1,(tAtt.t||0)/6)}else SW.k=Math.max(0,SW.k-.15);tFl=p.g||tAtt?0:tFl*.992;
if(tAtt&&!dn("KeyQ")){if(tAtt.t>6){tFl=Math.min(9,Math.abs(p.vx)*1.15+.5);p.vx*=1.15;p.vy=p.vy*1.08-1.4;snd.fling();hookKick(tAtt.a,-2.4)}tAtt=null}
if(tAtt){tAtt.t=(tAtt.t||0)+1;const cx=p.x+9,cy=p.y+10;if(tAtt.t==6){tAtt.L=Math.max(50,Math.hypot(tAtt.x-cx,tAtt.y-cy));snd.hook();hookKick(tAtt.a,3.4);for(let i=0;i<9;i++){const an=rn()*6.28,v=1+rn()*2.5;fxAdd(tFx,{x:tAtt.x,y:tAtt.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v-1,l:16+(rn()*8|0),t:"c",s:3,c:i%2?scCol(0):"#fff"})}}
if(tAtt.t>6){const dx=cx+p.vx-tAtt.x,dy=cy+p.vy-tAtt.y,d=Math.hypot(dx,dy);if(d>tAtt.L){p.vx=tAtt.x+dx/d*tAtt.L-cx;p.vy=tAtt.y+dy/d*tAtt.L-cy}
const sg=Rt-L;if(sg&&Math.sign(p.vx)==sg)p.vx+=sg*.1;if(Math.hypot(p.vx,p.vy)>4&&frame%2==0)fxAdd(tFx,{x:cx,y:cy+4,vx:-p.vx*.3,vy:-p.vy*.3,l:8,t:"s",g:0,dr:.9})}}
hookUpd();spitUpd();eggInput(1);
eggUpd();
mv(p);pfUpd();p.x=Math.max(0,Math.min(WW-p.w,p.x));p.an+=Math.abs(p.vx)*.12}
