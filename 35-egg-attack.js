/* =====================================================================
   Egg attack (replaces the bubble) + level records
   - F / click: the duck reaches back, pulls an egg out from under its tail and lobs it.
     One egg knocks out any enemy: slimes, the big penguin, the helmeted snowmen.
   - LVR: best score / grade / star per level, saved for the star-road book in the lobby.
   - enemyLeft(): enemies still standing.
   ===================================================================== */
const EGG=[],EYK=[];let tEg=0,eCd=0,MBp=0,ECLR=0;
const EGT=24,EGR=14;/* animation length, release frame */
const eFx=()=>S=="t1"?tFx:FX;
/* where the egg is during the grab: under the tail, swung up behind the head, released in front */
function eggHand(t){const cx=p.x+9,fy=p.y+p.h+bdY(),f=p.f,B=[cx-f*9,fy-9],U=[cx-f*9,fy-30],F=[cx+f*8,fy-25];
if(t<10)return[B[0]+Math.sin(t*1.7)*.6,B[1]];const k=Math.min(1,(t-10)/(EGR-10)),a=1-k;return[a*a*B[0]+2*a*k*U[0]+k*k*F[0],a*a*B[1]+2*a*k*U[1]+k*k*F[1]]}
function eggInput(ok){const ck=MB&&!MBp;MBp=MB;if(eCd>0)eCd--;
if(tEg>0){tEg++;
if(tEg==7){sfx(640,.06,"sine",.035,340);sfx(1150,.04,"sine",.014,1500,.04);const[x,y]=eggHand(7);for(let i=0;i<5;i++)fxAdd(eFx(),{x,y,vx:-p.f*(.5+rn()*1.5),vy:-rn()*1.5,l:18,t:"c",s:3,c:i%2?"#fff":"#ffe9a0",g:.05})}
if(tEg==EGR)eggThrow();if(tEg>=EGT)tEg=0}
else if(ok&&(pr("KeyF")||ck)&&eCd<=0&&!tAtt){tEg=1;eCd=EGT+4}}
function eggThrow(){const[x,y]=eggHand(EGR);EGG.push({x,y,vx:p.f*5.4+p.vx*.5,vy:-3.6+Math.min(0,p.vy*.3),r:0,vr:p.f*.32,l:0});noiz(.13,"bandpass",600,1900,.03,0,1);sfx(300,.09,"sine",.025,560)}
/* pose: near wing reaches back to the tail, winds up, whips forward */
function eggApply(A){if(tEg<=0)return;const t=tEg,f=p.f,rc=ez(Math.min(1,t/7)),th=t<10?0:ez(Math.min(1,(t-10)/(EGR-10))),bk=t>EGR?ez(Math.min(1,(t-EGR)/(EGT-EGR))):0;
const a=t<10?1.45*rc:t<=EGR?1.45-3.75*th:-2.3*(1-bk),tl=t<8?-.08*rc:t<10?-.08+.2*ez((t-8)/2):t<=EGR?.12-.3*th:-.18*(1-bk);
if(f>0)A.lwm=mm(rX(a),rZ(-.12));else A.rwm=mm(rX(a),rZ(.12));
A.tilt=(A.tilt||0)+f*tl;A.hp=(A.hp||0)+(t<10?.22*rc:.22*(1-th));if(t>=EGR&&t<EGR+4){A.sy=(A.sy||1)*.95;A.sx=(A.sx||1)*1.04}}
function eggUpd(){
for(let i=EGG.length;i--;){const q=EGG[i];q.l++;q.vy=Math.min(q.vy+.26,10);q.x+=q.vx;q.y+=q.vy;q.r+=q.vr;
if(q.y>H+30||q.l>240){EGG.splice(i,1);continue}let hit=0;
for(const k of P){if(q.x<k.x||q.x>k.x+k.w)continue;if(!k.o){if(q.y>k.y&&q.y<k.y+k.h)hit=1}else if(q.vy>0&&q.y>=k.y&&q.y-q.vy<=k.y+1)hit=1}
if(S=="play"){for(const e of E)if(!e.dead&&q.x>e.x-4&&q.x<e.x+26&&q.y>e.y-5&&q.y<e.y+21){kill(e,0);hit=2;break}}
else if(S=="t1")for(const e of GLM)if(!e.dead&&q.x>e.x-6&&q.x<e.x+e.bw+6&&q.y>e.y-44&&q.y<e.y+e.bh+4){golemKO(e,q.x);hit=2}
if(hit){eggSplat(q,hit==2);EGG.splice(i,1)}}
for(let i=EYK.length;i--;)if(--EYK[i].l<=0)EYK.splice(i,1)}
function eggSplat(q,big){const L=eFx(),x=q.x,y=q.y;if(big)gpRumble(90,.6,.2);
for(let i=0;i<(big?18:12);i++){const a=-Math.PI*rn(),v=1+rn()*(big?3.4:2.4);fxAdd(L,{x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.6,l:18+(rn()*12|0),t:"c",s:3,c:i%3==0?"#fff8ec":i%3==1?"#ffcc22":"#ffb000",g:.18})}
for(let i=0;i<5;i++)fxAdd(L,{x,y,vx:(rn()-.5)*3,vy:-1-rn()*2.4,l:24,t:"c",s:3,c:"#f4ead6",g:.2});
EYK.push({x,y,l:90,r:rn()*6});noiz(.05,"highpass",2600,4200,.035,0,1.4);sfx(220,.08,"sine",.035,95);noiz(.14,"lowpass",800,240,.035,.02,.8);
const FL=S=="t1"?FT1:PL;for(const f of FL)if(!f.g&&Math.hypot(f.x-x,f.y-12-y)<30)heal(f)}
function eggShape(c,x,y,r){c.save();c.translate(x,y);c.rotate(r);const E_=()=>{c.beginPath();c.moveTo(0,-5);c.bezierCurveTo(3.6,-5,4.2,1.2,3.8,2.2);c.bezierCurveTo(3.2,4.6,-3.2,4.6,-3.8,2.2);c.bezierCurveTo(-4.2,1.2,-3.6,-5,0,-5);c.closePath()};
E_();c.fillStyle="#fbf5e6";c.fill();c.save();E_();c.clip();c.fillStyle="#e2d6bc";c.beginPath();c.ellipse(1.6,2,3,2.6,0,0,7);c.fill();c.fillStyle="#fff";c.beginPath();c.ellipse(-1.4,-2.2,1,1.6,-.3,0,7);c.fill();c.restore();
E_();c.lineWidth=1.3;c.strokeStyle="#1a1226";c.stroke();c.restore()}
function eggDraw(c){for(const s of EYK){c.globalAlpha=Math.min(1,s.l/30);c.fillStyle="#fff6e2";c.beginPath();for(let k=0;k<8;k++){const a=k/8*6.283+s.r,rr=k%2?4:6.5;c.lineTo(s.x+Math.cos(a)*rr,s.y+Math.sin(a)*rr*.45)}c.closePath();c.fill();c.fillStyle="#ffc21a";c.beginPath();c.ellipse(s.x,s.y-.5,2.6,1.6,0,0,7);c.fill();c.fillStyle="#fff";c.fillRect(s.x-1,s.y-1.4,1,1)}c.globalAlpha=1;
for(const q of EGG)eggShape(c,q.x,q.y,q.r);if(tEg>=7&&tEg<EGR&&!GO){const[x,y]=eggHand(tEg);eggShape(c,x,y,-p.f*.3)}}
/* ---- scarf hooks: a little spring so the metal ring dips when the scarf catches it and sags while you swing ---- */
function hookUpd(){for(const q of AN){const on=tAtt&&tAtt.a===q&&(tAtt.t||0)>6,sp=on?Math.hypot(p.vx,p.vy):0,tg=on?2.5+Math.min(3.5,sp*.35):0;
q.vy=((q.vy||0)+(tg-(q.dy||0))*.2)*.8;q.dy=(q.dy||0)+q.vy;q.sw=((q.sw||0)+((on?Math.max(-.3,Math.min(.3,p.vx*.05)):0)-(q.sw||0))*.15)}}
const hookKick=(q,v)=>{if(q)q.vy=(q.vy||0)+v};
/* tutorial street: metal ring on a cable, drawn at its sprung position. World 1 levels: a flower wreath on a vine (33-grassland-scenery.js) */
function hookDraw(c,q){if(S=="play"){wreathDraw(c,q);return}const y=q.y+(q.dy||0),x=q.x+(q.sw||0)*4;c.save();c.lineCap="round";c.strokeStyle="#2a2238";c.lineWidth=2.2;c.beginPath();c.moveTo(q.x,0);c.lineTo(x,y-9);c.stroke();
c.fillStyle="#5a5e6a";c.fillRect(x-2,y-11,4,3);
c.lineWidth=4.6;c.strokeStyle="#1e1a26";c.beginPath();c.arc(x,y,8,0,7);c.stroke();const mg=c.createLinearGradient(x-8,y-8,x+8,y+8);mg.addColorStop(0,"#f4f6fa");mg.addColorStop(.45,"#a8afbe");mg.addColorStop(1,"#5e6474");
c.lineWidth=2.6;c.strokeStyle=mg;c.stroke();c.strokeStyle="rgba(255,255,255,.85)";c.lineWidth=1;c.beginPath();c.arc(x,y,8,-2.5,-1.6);c.stroke();
c.fillStyle="#ffc928";c.beginPath();c.arc(x,y,2.4,0,7);c.fill();c.strokeStyle="#1e1a26";c.lineWidth=.8;c.stroke();c.restore()}
/* the big penguin goes down to a single egg (no health bar) */
function golemKO(e,x){if(e.dead)return;e.hp=0;e.fl=16;e.aw=1;e.dead=1;e.dt=0;e.fd=e.x+12>x?1:-1;e.s="die";e.arm=0;snd.ghit(gv(e),2);snd.gdown(gv(e));shk=Math.max(shk,4)}
/* ---- level records for the star-road book ---- */
let LVR={};try{LVR=JSON.parse(localStorage.getItem("cool_duck_1_lv")||"{}")||{}}catch(_){LVR={}}
const RKO="SABC";
function lvRec(n,sc,rk,st){const o=LVR[n]||{},b=o.r?RKO.indexOf(o.r):9;LVR[n]={s:Math.max(o.s||0,sc|0),r:(rk&&b>RKO.indexOf(rk))?rk:(o.r||rk||""),st:Math.max(o.st||0,st|0),c:1};try{localStorage.setItem("cool_duck_1_lv",JSON.stringify(LVR))}catch(_){}}
/* ---- enemies still standing (helper; the club no longer requires 0) ---- */
const enemyLeft=()=>E.filter(e=>!e.dead).length;
