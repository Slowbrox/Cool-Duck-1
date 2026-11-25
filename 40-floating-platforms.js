/* =====================================================================
   Floating platforms: soap bubbles
   - Tutorial: every floating platform is a SOAP BUBBLE.
   - World 1 levels: the platforms of kind "b" are bubbles (placed on purpose by the level design);
     the rest are floating grass islands (isleDraw).
   Landing on a bubble bounces you back up (the bubble squishes like a trampoline). Jump while standing
   on a bubble, or hold jump as you land on one (also after a glide), for a much higher jump.
   Hooks: mv() calls pfLand(), moveA()/t1Upd() call bubJump() + pfUpd(), worldDraw()/t1Draw() call pfDraw().
   ===================================================================== */
let BUBJ=0;
/* 1 = this floating (one-way) platform is a soap bubble */
const pfK=q=>!q||!q.o?0:S=="t1"||q.k=="b"?1:0;
/* jump speed off a soap bubble (a normal jump is -9, melon soda -11) */
const bubV=()=>S=="play"&&soda>0?-12.5:-11;
const BUBC=["#bfe9ff","#ffb8e8","#fff1a0","#c8b8ff"];
function bubPush(q,x,v){q.bx=x;q.bq=q.bq||0;q.bqv=(q.bqv||0)+Math.min(5,.6+v*.5)}
function bubFx(x,y,n){for(let i=0;i<n;i++){const a=-Math.PI*(.12+rn()*.76),s=1+rn()*2;fxAdd(tFx,{x:x+(rn()-.5)*16,y:y-2,vx:Math.cos(a)*s,vy:Math.sin(a)*s*.8,l:22+(rn()*16|0),t:"o",s:1.6+rn()*2,g:-.025,dr:.96,c:BUBC[i%4]})}}
/* called by mv() after the vertical move: bounce off soap bubbles */
function pfLand(o,iv){const q=o.pl;if(o!==p||!q||!o.g||pfK(q)!=1||iv<=1)return;
/* jump held (or just pressed) as you touch down = super bounce; works after a glide too */
const big=p.jb>0||dn("Space","ArrowUp","KeyW")&&(S!="t1"||tAb>1),fx=o.x+o.w/2,fy=o.y+o.h;
bubPush(q,fx,iv+(big?3:0));if(!big&&iv<=3.2)return;/* soft landing: you stand on the bubble */
o.vy=big?bubV():-Math.min(8,iv*.72);o.g=0;o.pl=null;p.jb=p.coy=0;BUBJ=big?40:30;
if(big){sfx(250,.22,"sine",.08,780);sfx(780,.12,"triangle",.03,1400,.05)}else sfx(190+iv*14,.14,"sine",.05,420+iv*30);noiz(.06,"bandpass",1800,3200,.02,0,2);bubFx(fx,fy,big?10:4)}
/* jumping while standing on a soap bubble: much higher */
function bubJump(){const q=p.pl;if(!p.g||pfK(q)!=1)return;p.vy=bubV();bubPush(q,p.x+p.w/2,4);sfx(240,.2,"sine",.07,720);bubFx(p.x+p.w/2,p.y+p.h,7)}
/* per frame, after mv(): bubble springs + bounce timer */
function pfUpd(){if(BUBJ>0)BUBJ--;
for(const q of P)if(q.bq||q.bqv){q.bqv-=q.bq*.3;q.bqv*=.8;q.bq+=q.bqv;if(Math.abs(q.bq)<.04&&Math.abs(q.bqv)<.04)q.bq=q.bqv=0}}
/* a row of bubbles, one per tile, slightly overlapping; the top sits on the platform's surface */
function bubRow(q,f,soft){const n=Math.max(1,Math.round(q.w/T)),bw=q.w/n,on=soft&&p.g&&p.pl===q,fx=p.x+p.w/2;
for(let i=0;i<n;i++){const cx=q.x+(i+.5)*bw,h=hzf(q.x*.13+i*7.1+q.y*.07),r0=(bw/2+2.5)*(.94+h*.12);let s=0;
if(soft){if(q.bq)s+=q.bq*Math.max(0,1-Math.abs(cx-q.bx)/bw*.75);if(on)s+=1.6*Math.max(0,1-Math.abs(cx-fx)/bw)}
s=Math.max(-4,Math.min(7,s));f(cx,q.y-1+s,r0+s*.45,r0*.86-s*.5,i,h)}}
function soapBub(cx,ty,rx,ry,i,h){const A=g.globalAlpha,al=v=>g.globalAlpha=A*v,ph=frame*.02+i*1.7+h*6,br=1+Math.sin(frame*.06+i*1.3+h*4)*.025,ex=rx*br,ey=ry/br,cy=ty+ey,el=(a,b)=>{g.beginPath();g.ellipse(cx,cy,a,b,0,0,7)};
g.save();al(.6);g.strokeStyle="#2a2238";g.lineWidth=1;el(ex+1.3,ey+1.3);g.stroke();
al(.2);g.fillStyle="#d8f4ff";el(ex,ey);g.fill();
/* swirling rainbow film */
g.save();el(ex,ey);g.clip();g.lineWidth=3;al(.32);
g.strokeStyle="#ff9ad8";g.beginPath();g.ellipse(cx+Math.cos(ph)*ex*.35,cy+Math.sin(ph*1.3)*ey*.3,ex*.95,ey*.5,ph*.4,0,7);g.stroke();
g.strokeStyle="#8ff0ff";g.beginPath();g.ellipse(cx-Math.cos(ph*.8)*ex*.3,cy-Math.sin(ph)*ey*.25+ey*.3,ex*.8,ey*.45,-ph*.3,0,7);g.stroke();
al(.25);g.strokeStyle="#fff1a0";g.beginPath();g.ellipse(cx,cy+ey*.55,ex*.7,ey*.3,0,0,7);g.stroke();g.restore();
/* iridescent rim + glints */
const a=ph*.7,gr=g.createLinearGradient(cx+Math.cos(a)*ex,cy+Math.sin(a)*ey,cx-Math.cos(a)*ex,cy-Math.sin(a)*ey);
gr.addColorStop(0,"#ff8ad8");gr.addColorStop(.35,"#ffe98a");gr.addColorStop(.65,"#7ff8ff");gr.addColorStop(1,"#b88cff");
al(.95);g.strokeStyle=gr;g.lineWidth=1.6;el(ex,ey);g.stroke();
g.fillStyle="#fff";g.beginPath();g.ellipse(cx-ex*.42,cy-ey*.48,ex*.24,ey*.12,-.6,0,7);g.fill();g.beginPath();g.arc(cx-ex*.66,cy-ey*.12,1.2,0,7);g.fill();
al(.55);g.strokeStyle="#fff";g.lineWidth=1.2;g.beginPath();g.ellipse(cx,cy,ex*.78,ey*.78,0,.35,1.25);g.stroke();g.restore()}
function pfDraw(q){if(pfK(q))bubRow(q,soapBub,1);else if(S=="play")isleDraw(q);else platDraw(q)}
