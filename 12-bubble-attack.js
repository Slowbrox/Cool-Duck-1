/* =====================================================================
   Bubble attack
   Bubbles that trap and pop enemies (bubFire, bubUpd, bubDraw).
   ===================================================================== */
/* ---- bubble attack ---- */
const BBL=[];
function bubShape(c,x,y,r,a,w){c.save();c.globalAlpha=a*.85;c.fillStyle="#1e78ff";c.beginPath();c.ellipse(x,y,r*(1+w),r*(1-w),0,0,7);c.fill();c.globalAlpha=a;c.strokeStyle="#04257a";c.lineWidth=1.6;c.stroke();c.fillStyle="#e6f6ff";c.beginPath();c.ellipse(x-r*.35,y-r*.38,r*.32,r*.17,-.6,0,7);c.fill();c.restore()}
function orb(c){if(!(tCh>0)||tFire>0)return;const f=Math.min(1,tCh/60),[mx,my]=mouthXY(),r=1.8+f*9.5+Math.sin(frame*.5)*.5*f;bubShape(c,mx+p.f*r*.6,my+r*.25,r,1,Math.sin(frame*.4)*.04*f)}
function bubFire(c){const ch=Math.min(1,c/60),r=4+ch*9,[mx,my]=mouthXY();BBL.push({x:mx+p.f*r*.7,y:my+1,vx:p.f*(3.2+ch*1.8)+p.vx*.3,vy:-.2-ch*.15,r,ch,st:0,t:0,fz:Math.round(70+ch*30),e:null});snd.blow(ch)}
function bbBurst(b){b.st=2;b.t=0;const ch=b.ch,R=b.R=26+ch*30+(b.e?6:0),en=S=="play"?E:S=="t1"?GLM:[],dmg=ch>=.5?2:1,FL=S=="t1"?FT1:PL;
for(const e of en){if(e.dead)continue;if(e.gl){golemHit(e,b,R,dmg);continue}const ex=e.x+11,ey=e.y+9,d=Math.hypot(ex-b.x,ey-b.y);if(d>=R+12)continue;const dir=Math.sign(ex-b.x)||p.f;e.hp=(e.hp??2)-dmg;if(e.hp<=0)kill(e,0);else{e.kx=dir*(5+ch*3);e.vy=-3.2;e.fl=14;e.stk=0;POP.push({x:ex,y:e.y-8,s:"-"+dmg,c:"#fff",f:11,l:40})}}
for(let i=P.length;i--;){const q=P[i];if(q.k!="m")continue;const dx=Math.max(q.x-b.x,0,b.x-(q.x+q.w)),dy=Math.max(q.y-b.y,0,b.y-(q.y+q.h));if(dx*dx+dy*dy>=R*R)continue;q.hp=(q.hp==null?22:q.hp)-(6+ch*20);if(q.hp<=0){P.splice(i,1);sfx(300,.2,"square",.05,90);noiz(.22,"lowpass",900,200,.09);shk=Math.max(shk,3);for(let j=0;j<14;j++)tFx.push({x:q.x+16,y:q.y+rn()*q.h,vx:rn()*4-2,vy:-rn()*3,l:30})}}
for(const f of FL)if(!f.g&&Math.hypot(f.x-b.x,f.y-12-b.y)<R+14)heal(f);

for(let i=0;i<24;i++){const a=rn()*6.28,v=1.5+rn()*(2+ch*2.5);fxAdd(tFx,{x:b.x,y:b.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.2,l:20+(rn()*14|0),s:1.5+rn()*2.2})}
fxAdd(tFx,{x:b.x,y:b.y,vx:0,vy:0,l:14,r:6,gr:R/9,t:"r",g:0,a0:0});shk=Math.max(shk,1+ch*2);snd.pop(ch)}
function bubUpd(){const en=S=="play"?E:S=="t1"?GLM:[],lim=Math.max(WW,typeof TW=="number"?TW:0)+60;
for(let i=BBL.length;i--;){const b=BBL[i];b.t++;
if(b.st==0){b.vy+=.028;b.vx*=.995;b.x+=b.vx;b.y+=b.vy;if(b.t%3==0)fxAdd(tFx,{x:b.x-b.vx*2,y:b.y+b.r*.5,vx:-b.vx*.1,vy:.2,l:12,s:1+rn()*1.2,g:.05});
let hit=null;for(const e of en){if(e.dead)continue;const dx=Math.max(e.x-b.x,0,b.x-(e.x+(e.bw||22))),dy=Math.max(e.y-6-b.y,0,b.y-(e.y+(e.bh||18)));if(dx*dx+dy*dy<(b.r*.9)**2){hit=e;break}}
if(hit){b.st=1;b.t=0;b.e=hit;b.ox=(b.x-(hit.x+(hit.cx||11)))*.6;b.oy=(b.y-(hit.y+(hit.cy||9)))*.6;snd.stick();for(let j=0;j<6;j++)fxAdd(tFx,{x:b.x,y:b.y,vx:(rn()-.5)*3,vy:-rn()*2,l:14,s:1+rn()*1.5})}
else{let ex=0;for(const q of P){if(q.o)continue;const dx=Math.max(q.x-b.x,0,b.x-(q.x+q.w)),dy=Math.max(q.y-b.y,0,b.y-(q.y+q.h));if(dx*dx+dy*dy<(b.r*.7)**2){ex=1;break}}if(ex||b.t>b.fz)bbBurst(b);else if(b.x<-60||b.x>lim||b.y>H+60)BBL.splice(i,1)}}
else if(b.st==1){const e=b.e;if(!e||e.dead||b.t>36){bbBurst(b);continue}e.stk=3;b.x=e.x+(e.cx||11)+b.ox+Math.sin(frame*1.6)*.8;b.y=e.y+(e.cy||9)+b.oy;if(b.t%6==0)fxAdd(tFx,{x:b.x,y:b.y,vx:(rn()-.5)*2,vy:-rn()*1.5,l:10,s:1})}
else if(++b.t>26)BBL.splice(i,1)}}
function bubDraw(c){for(const b of BBL){if(b.st<2){const g2=b.st?1+Math.min(1,b.t/30)*.35:1,fl=b.st&&b.t>26&&frame%4<2;bubShape(c,b.x,b.y,b.r*g2,fl?.55:1,Math.sin(frame*(b.st?1.2:.5))*(b.st?.1:.05))}
else{const k=Math.min(1,b.t/8),e=1-Math.pow(1-k,3),r=b.r+(b.R-b.r)*e,a=b.t>16?Math.max(0,1-(b.t-16)/10):1;c.save();c.globalAlpha=a*.4;c.fillStyle="#7fc4ff";c.beginPath();c.arc(b.x,b.y,r,0,7);c.fill();c.globalAlpha=a;c.strokeStyle="#04257a";c.lineWidth=2.2;c.stroke();c.strokeStyle="#e6f6ff";c.lineWidth=1.6;c.beginPath();c.arc(b.x,b.y,r*.8,-2.7,-1.3);c.stroke();c.restore()}}}
