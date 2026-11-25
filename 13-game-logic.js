/* =====================================================================
   Core game logic
   start(), movement mv(), damage hurt(), shops/club entry, and the main update upd().
   ===================================================================== */
/* ---- game logic ---- */
function start(lv){if(lv)LV=lv;GO=null;HIT.t=0;HST.forEach(s=>s.got=0);CAR.x=WW-124;CAR.ph=CAR.t=CAR.v=0;LC=null;P.length=0;(LV==3?L3.P:LV==2?L2.P:PM).forEach(q=>P.push(q));P.forEach(q=>{if(q.k=="m")q.hp=22});C=(LV==3?L3.C:LV==2?L2.C:C0).map(o=>({...o}));E=(LV==3?L3.PG:LV==2?L2.PG:PG).map(([x,a,b,k],i)=>({x:x*T,a:a*T,b:b*T,d:1,y:206,vy:0,sq:0,c:k=="s"?3:i%3,sp:k=="s"?1:0,t:i*23}));for(let i=P.length;i--;)if(P[i].lf)P.splice(i,1);PL.forEach(q=>{q.g=SK[q.k]?2:0;q.t=0});BD.k=PCH.k=0;lvC=0;FC.length=SPK.length=SFL.length=GP.length=0;SE.forEach(s=>{s.g=0;if(s.pl)s.e=1});water=MAXW;cd=spt=dr=0;WS=[];FX=[];NP.forEach(n=>n.q=0);p={x:60,y:190,w:18,h:28,vx:0,vy:0,g:0,f:1,jb:0,coy:0,an:0};cam=0;hearts=3;stamps=[1,1,1];secrets=0;soda=0;inv=0;cp={x:69};dlg=null;bn=null;yt=frame;kills=combo=cmT=hs=shk=0;POP=[];tAb=5;tAtt=null;tFl=tCh=tFire=tBe=tGl=tOv=tGag=fR=0;BBL.length=0;EGG.length=EYK.length=0;tEg=eCd=0;tFx=[];AN.length=0;(LV==3?L3.AN:LV==2?L2.AN:L1AN).forEach(([a,b])=>AN.push({x:a*T,y:b*T}));S="play";ckInit();lvPost()}
tutInit();S="boot";
const nst=()=>stamps.filter(x=>x).length;
const say=(n,L,f)=>{dlg={n,L,i:0,c:0,f};sfx(520,.04)};
const ban=s=>{if(S=="play")return;bn={s,t:170}};
/* forgiving player movement ("1-2 frames off" assists):
   - STEP: running into the side of a block / floor whose top is at most 10px above your feet lifts you onto it
   - NUDGE: falling past a ledge or floor edge you missed by up to 6px while moving toward it lands you on it
   both only happen when there is room to stand there, so walking off an edge on purpose still works */
const STEP=10,NUDGE=6;
function mv(o){o.x+=o.vx;for(const q of P)if(!q.o&&ov(o,q)){const up=o.y+o.h-q.y;
if(up>0&&up<=STEP&&o.vy>-2&&!P.some(r=>r!==q&&!r.o&&ov({x:o.x,y:q.y-o.h-.01,w:o.w,h:o.h},r))){o.y=q.y-o.h;if(o.vy>0)o.vy=0;continue}
if(o.vx>0)o.x=q.x-o.w;else if(o.vx<0)o.x=q.x+q.w;o.vx=0}
const pb=o.y+o.h,iv=o.vy;o.y+=o.vy;o.g=0;o.pl=null;
for(const q of P)if(ov(o,q)){if(q.o){if(o.vy>=0&&pb<=q.y+1){o.y=q.y-o.h;o.vy=0;o.g=1;o.pl=q}}else if(o.vy>0){o.y=q.y-o.h;o.vy=0;o.g=1;o.pl=null}else if(o.vy<0){o.y=q.y+q.h;o.vy=0}}
if(!o.g&&o.vy>0)for(const q of P){if(!(pb<=q.y+1&&o.y+o.h>=q.y))continue;const gl=q.x-(o.x+o.w),gr=o.x-(q.x+q.w);let dx=0;
if(gl>=0&&gl<=NUDGE&&o.vx>=0)dx=gl+.5;else if(gr>=0&&gr<=NUDGE&&o.vx<=0)dx=-(gr+.5);else continue;
const t={x:o.x+dx,y:q.y-o.h-.01,w:o.w,h:o.h};if(P.some(r=>!r.o&&ov(t,r)))continue;o.x+=dx;o.y=q.y-o.h;o.vy=0;o.g=1;o.pl=q.o?q:null;break}
pfLand(o,iv)}/* soap bubbles bounce you back up: 40-floating-platforms.js */
function hurt(pit,dx=0){if(GO)return;if(pit){tAtt=null;tFl=0}if(inv>0&&!pit)return;hearts--;gpRumble(220,.5,.8);inv=100;HIT.t=26;hs=Math.max(hs,7);shk=Math.max(shk,7);
sfx(440,.16,"triangle",.045,190);sfx(150,.24,"sine",.06,70,.04);noiz(.14,"lowpass",800,200,.045,0,.8);POP.push({x:p.x+9,y:p.y-6,s:"-1 ♥",c:"#ff5a6e",f:15,l:60});
for(let i=0;i<10;i++){const a=rn()*6.28,v=1.5+rn()*2.5;fxAdd(FX,{x:p.x+9,y:p.y+12,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.5,l:16+(rn()*10|0),t:"c",s:3,c:i%2?"#ff5a6e":"#fff"})}
if(hearts<=0){goStart();return}
if(pit){p.x=cp.x-9;p.y=224-p.h-2;p.vx=p.vy=0}else{p.vy=-5.5;p.vx=dx*3.6}}
function found(s,m){s.g=1;coins+=10;lvC+=10;secrets++;ban(m||"Secret found! +10¢");sfx(880,.1,"square",.05);sfx(1175,.1,"square",.05,0,.1);sfx(1568,.2,"square",.05,0,.2)}
function enter(s){cp={x:s.x*T+80};sh={s,i:0,m:""};S="shop";chime();if(!stamps[s.id]){stamps[s.id]=1;water=Math.min(MAXW,water+2);say("Clerk",[s.cl,s.st,"Club stamp collected! ("+nst()+"/3)","And a free bottle of water for the duck! Press F to spit it."])}}
function club(){S="end";chime();saveG()}
function upd(){frame++;if(shk>0&&(S!="play"||dlg))shk=Math.max(0,shk-.6);
PT.forEach(q=>{q.y+=q.v;q.x-=.6+Math.sin(frame/30+q.y)*.2;if(q.y>H){q.y=-4;q.x=rn()*W+60}if(q.x<-4)q.x=W+4});
if(S=="boot"){if(Object.keys(PR).length)cineStart();return}if(S=="cine"){cineUpd();return}
if(S=="intro"){tutUpd();if(tu.t>20&&Object.keys(PR).length)introEnd();return}
if(S=="title"){tt++;if(tt>=128||(tt>45&&Object.keys(PR).length))lobbyOpen();return}
if(S=="tut"){tutUpd();return}trnUpd();if(S=="story"){storyUpd();return}if(S=="map"){wmUpd();return}if((S=="t1"||S=="play")&&pzUpd())return;if(S=="t1"){t1Upd();return}if(S=="play"&&CAR.ph){carUpd();return}
if(S=="end"){CF.forEach(c=>{c.y+=c.v;if(c.y>H)c.y=-5});if(pr("KeyR"))lobbyOpen();return}
if(S=="lobby"){lobbyUpd();return}
if(S=="play"&&GO){goUpd();return}
if(bn&&bn.t>0)bn.t--;if(hs>0){hs--;return}
if(dlg){dlg.c++;if(pr("KeyE","Enter","Space","ArrowUp")){const l=dlg.L[dlg.i];if(dlg.c*1.2<l.length)dlg.c=999;else if(++dlg.i>=dlg.L.length){const f=dlg.f;dlg=null;f&&f()}else dlg.c=0}return}
if(S=="shop"){const m=sh;if(dr>0)dr--;if(pr("ArrowUp","KeyW"))m.i=(m.i+3)%4;if(pr("ArrowDown","KeyS"))m.i=(m.i+1)%4;if(pr("Escape","KeyQ"))S="play";
if(pr("Enter","KeyE","Space")){if(m.i==0){if(hearts>=5)m.m="Your hearts are already full!";else if(coins>=5){coins-=5;hearts++;m.m="Yum! +1 ♥";sfx(660,.15,"triangle",.06,990)}else m.m="Not enough coins…"}else if(m.i==1){if(coins>=8){coins-=8;soda=1800;m.m="Super jump for 30 seconds!";sfx(500,.2,"triangle",.06,1000)}else m.m="Not enough coins…"}else if(m.i==2){if(water>=MAXW)m.m="Your tank is full!";else if(coins>=3){coins-=3;water=Math.min(MAXW,water+3);dr=70;m.m="Glug glug! Press F to spit.";for(let i=0;i<3;i++)sfx(520-i*70,.1,"sine",.07,0,i*.15)}else m.m="Not enough coins…"}else S="play"}return}
moveA();
if(soda>0)soda--;if(inv>0)inv--;if(p.y>H+40)hurt(1);
if(cd>0)cd--;if(spt>0)spt--;if(Math.abs(p.vx)>.1||!p.g)DK.mv=frame;

WS=WS.filter(w=>{w.vy+=.12;w.x+=w.vx;w.y+=w.vy;let hit=++w.l>90||w.y>H;trail(w);
for(const q of P)if(!q.o&&w.x>q.x&&w.x<q.x+q.w&&w.y>q.y&&w.y<q.y+q.h)hit=1;
for(const e of E)if(!e.dead&&w.x>e.x-2&&w.x<e.x+24&&w.y>e.y-2&&w.y<e.y+20){hit=1;if(!e.sp){kill(e,0);w.k=2}}
for(const q of PL)if(!q.g&&Math.abs(w.x-q.x)<22&&w.y>q.y-40&&w.y<q.y+2){heal(q);hit=1;w.k=3}
if(hit)splash(FX,w);return!hit});
fxStep(FX);fxStep(tFx);flUpd();coinUpd();POP.forEach(q=>{q.y-=.6;q.l--});POP=POP.filter(q=>q.l>0);if(cmT>0&&--cmT==0)combo=0;if(shk>0)shk=Math.max(0,shk-.6);water=MAXW;if(frame%240==0)saveG();

cam+=(Math.max(0,Math.min(WW-W,p.x-W/2+p.f*40))-cam)*.1;
const cx=p.x+9;if(p.g&&p.y+p.h>222&&p.y+p.h<226)for(const[a,b]of(LV==3?L3.seg:LV==2?L2.seg:L1SEG))if(cx>a*T+48&&cx<b*T-48){cp.x=cx;break}
ckUpd();
for(const c of C)if(!c.g&&Math.abs(cx-c.x)<27&&Math.abs(p.y+14-c.y)<29){c.g=1;coins++;lvC++;coinGet(c)}hsUpd();
for(const e of E){if(e.dead){if(e.dt>0)e.dt--;continue}e.t++;const was=e.y<206;if(!was&&e.t%75==0)e.vy=-3.4;e.vy+=.18;e.y+=e.vy;if(e.y>=206){if(was)e.sq=.3;e.y=206;e.vy=0}e.sq*=.9;e.x+=e.d*(e.y<206?1.25:.12)*(e.stk>0?.25:1)+(e.kx||0);e.kx=(e.kx||0)*.88;if(Math.abs(e.kx)<.05)e.kx=0;if(e.stk>0)e.stk--;if(e.fl>0)e.fl--;e.x=Math.max(e.a-60,Math.min(e.b+60,e.x));if(e.x<e.a)e.d=1;if(e.x>e.b)e.d=-1;
for(const q of P)if(!q.o&&q.k!="g"&&e.x+22>q.x&&e.x<q.x+q.w&&e.y+18>q.y&&e.y<q.y+q.h){if(e.x+11<q.x+q.w/2){e.x=q.x-22;e.d=-1}else{e.x=q.x+q.w;e.d=1}break}
const r=e.sp?{x:e.x-2,y:e.y-4,w:26,h:22}:{x:e.x,y:e.y,w:22,h:18};if(ov(p,r)){if(!e.sp&&p.vy>0&&p.y+p.h-p.vy<=e.y+8){kill(e,1);p.vy=dn("Space","ArrowUp","KeyW")?-10:-7}else hurt(0,p.x<e.x?-1:1)}}
for(const s of SE)if(!s.g&&!s.e&&Math.abs(cx-s.x)<22&&Math.abs(p.y+14-s.y)<24)found(s);
near=null;
if(p.g){
for(const n of NP)if(Math.abs(cx-n.x)<40)near={t:"npc",n,x:n.x,l:"E · TALK"};
if(Math.abs(cx-(WW-2*T-12))<70)near={t:"club",x:WW-5.5*T,l:"E · ENTER"};
}
if(near&&pr("KeyE","Enter","KeyS","ArrowDown")){const t=near;
if(t.t=="shop")enter(t.s);else if(t.t=="npc")say(t.n.n,t.n.L[t.n.q++%t.n.L.length]);else if(t.t=="club"){CAR.ph=1;CAR.t=0;p.vx=0;chime();shk=Math.max(shk,2)}else if(t.t=="lock"){sfx(140,.18,"square",.05,90);sfx(110,.2,"square",.04,80,.12);shk=Math.max(shk,1.5);POP.push({x:t.x,y:138,s:"THE CLUB IS LOCKED - BEAT EVERY ENEMY FIRST!",c:"#ff8a8a",f:11,l:90})}else found(t.s,"The machine rattles… a capsule toy! +10¢")}}
