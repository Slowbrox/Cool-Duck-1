/* =====================================================================
   World map (overworld) - S=="map"
   A classic overworld seen from above: World 1 is a grassy island in the sea (cliff edge, round leafy
   trees, hills, mountains in the north, a river with a red bridge and a waterfall, a few cherry trees,
   a torii, a stone lantern). Few props, grass first, no conifers, no machines.
   A sandy path with round level pads: HOME (back to the lobby) -> 1-1 ... 1-9 -> 1-10 mini-boss tower
   -> signpost to WORLD 2. A side path through the torii from 1-1 leads to TRAINING (the tutorial).
   - Cool Duck walks from pad to pad (arrow keys / stick, or click a pad).
   - ENTER / SPACE / click on the duck's pad: he throws up a peace sign, then the level starts.
   - A level unlocks when the one before it is cleared (records = LVR, 35-egg-attack.js).
     Newly unlocked pads are revealed: the path draws itself in, the pad pops up, the duck walks over.
   - 1-1 Hana Meadow, 1-2 Sakura Hills, 1-3 Matsu Cliffs; 1-4..1-10 say COMING SOON.
   - Position + revealed pads are saved under localStorage "cool_duck_1_map".
   Hooks: upd() -> wmUpd(), draw() -> wmDraw() (pixel canvas g) + wmTop() (crisp canvas vg),
   lobby door / story end / level clear / pause menu -> wmOpen().
   ===================================================================== */
const WMW=1090,wmK="#2a2238";
/* k: home | lv | boss | w2 | tut ; w = world-level number */
const WMN=[{k:"home",x:58,y:206},{k:"lv",x:138,y:200,w:"1-1"},{k:"lv",x:226,y:166,w:"1-2"},{k:"lv",x:312,y:210,w:"1-3"},{k:"lv",x:402,y:178,w:"1-4"},
{k:"lv",x:478,y:128,w:"1-5"},{k:"lv",x:566,y:152,w:"1-6"},{k:"lv",x:648,y:206,w:"1-7"},{k:"lv",x:738,y:182,w:"1-8"},{k:"lv",x:818,y:132,w:"1-9"},
{k:"boss",x:914,y:152,w:"1-10"},{k:"w2",x:1022,y:196,w:"2-1"},{k:"tut",x:150,y:122}];
const WME=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[1,12]];
const WMLV=3;/* how many world-1 levels exist so far */
/* path geometry: a gentle curve per edge, sampled every ~4px with cumulative length (for walking + partial reveal) */
const WMG=WME.map(([a,b],e)=>{const A=WMN[a],B=WMN[b],dx=B.x-A.x,dy=B.y-A.y,L0=Math.hypot(dx,dy),bend=(hzf(e*3.1+.7)-.5)*.34*L0,cx=(A.x+B.x)/2-dy/L0*bend,cy=(A.y+B.y)/2+dx/L0*bend,n=Math.ceil(L0/4)+1,p=[],c=[0];
for(let i=0;i<=n;i++){const t=i/n,u=1-t;p.push([u*u*A.x+2*u*t*cx+t*t*B.x,u*u*A.y+2*u*t*cy+t*t*B.y]);if(i)c.push(c[i-1]+Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]))}return{p,c,L:c[n]}});
/* overworld seen from above: an island in the sea. Props kept few and away from the paths -
   round leafy trees, a few cherry trees, hills, mountains in the north, a torii, a stone lantern (no conifers) */
const WMD=[["mtn",640,98,1],["mtn",690,86,1.25],["mtn",738,100,.95],["hill",236,112,1],["hill",522,240,1.1],["hill",968,106,.9],
["sakura",98,152],["torii",144,166],["toro",92,238],["tree",188,242],["sakura",254,256],["tree",440,234],["tree",462,248],["rock",300,148],
["tree",552,112],["sakura",694,258],["tree",770,242],["tree",872,218],["rock",858,254],["bush",986,242],["tree",1036,240]].sort((a,b)=>a[2]-b[2]);
/* island outline (map space) */
const WMX0=6,WMX1=WMW-44,wmTopY=x=>68+Math.sin(x*.011+1)*7+Math.sin(x*.029+2)*4,wmBotY=x=>262+Math.sin(x*.013+2)*6+Math.sin(x*.037)*3;
/* river from a pond in the hills down to a waterfall at the south coast; the path to 1-4 crosses it on a red bridge */
const WMRV=[[414,104],[396,132],[376,162],[360,194],[348,228],[340,262]];
const wmRX=y=>{for(let i=0;i<WMRV.length-1;i++){const a=WMRV[i],b=WMRV[i+1];if(y<=b[1])return a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1])}return WMRV[WMRV.length-1][0]};
const WMBR=(()=>{const E=WMG[3];let bi=0,bd=1e9;E.p.forEach(([x,y],i)=>{const d=Math.abs(x-wmRX(y));if(d<bd){bd=d;bi=i}});const a=E.p[Math.max(0,bi-3)],b=E.p[Math.min(E.p.length-1,bi+3)];return{x:E.p[bi][0],y:E.p[bi][1],a:Math.atan2(b[1]-a[1],b[0]-a[0])}})();
/* grass texture (soft patches + tufts + flower dots) and waves on the sea */
const WMM=Array.from({length:50},(_,i)=>[30+hzf(i+800)*(WMW-90),96+hzf(i+810)*150,16+hzf(i+820)*28,hzf(i+830)>.5]);
const WMTF=Array.from({length:90},(_,i)=>[30+hzf(i+940)*(WMW-90),90+hzf(i+950)*160]);
const WMFL=Array.from({length:40},(_,i)=>[30+hzf(i+850)*(WMW-90),100+hzf(i+860)*150,i%3]);
const WMWV=Array.from({length:44},(_,i)=>[hzf(i+960)*(WMW+60),i%2?8+hzf(i+970)*44:274+hzf(i+970)*10]);
let WMS=null;
/* the old levels' records (Konbini Street, Neon Alley, Frost Peaks) don't count for the new 1-1 / 1-2 / 1-3 */
try{if(localStorage.getItem("cool_duck_1_lvv")!="3"){delete LVR[1];delete LVR[2];delete LVR[3];localStorage.setItem("cool_duck_1_lv",JSON.stringify(LVR));localStorage.setItem("cool_duck_1_lvv","3")}}catch(_){}
const wmClr=i=>!!LVR[i];
const wmUnl=i=>{const n=WMN[i];return n.k=="home"||n.k=="tut"?1:n.k=="w2"?wmClr(10):i==1||wmClr(i-1)};
const wmHas=i=>WMN[i].k=="tut"||WMN[i].k=="lv"&&i<=WMLV;
const wmSeen=i=>WMS.seen.includes(i);
const wmName=i=>{const n=WMN[i];return n.k=="home"?"LOBBY":n.k=="tut"?"TRAINING":n.k=="boss"?"MINI BOSS · PENGUIN TOWER":n.k=="w2"?(wmUnl(i)?"COMING SOON":"LOCKED"):i<=WMLV?LVN[i]:"COMING SOON"};
function wmLoad(){try{return JSON.parse(localStorage.getItem("cool_duck_1_map")||"{}")||{}}catch(_){return{}}}
function wmSave(){try{localStorage.setItem("cool_duck_1_map",JSON.stringify({at:WMS.at,seen:WMS.seen}))}catch(_){}}
/* open the map. o.at = pad to stand on, o.go = walk on to a pad that just got unlocked (after CONTINUE) */
function wmOpen(o){o=o||{};const sv=wmLoad(),all=WMN.map((_,i)=>i);S="map";PZ.on=0;dlg=null;LC=null;
WMS={at:o.at!=null?o.at:sv.at!=null?sv.at:1,mv:null,q:[],go:0,an:0,yaw:.55,dir:1,cam:0,toast:null,rv:null,auto:!!o.go,hov:-1,
seen:Array.isArray(sv.seen)?sv.seen.filter(i=>i>=0&&i<WMN.length&&wmUnl(i)):all.filter(wmUnl)};
if(!WMN[WMS.at]||!wmUnl(WMS.at))WMS.at=1;if(!wmSeen(WMS.at))WMS.seen.push(WMS.at);
WMS.rq=all.filter(i=>wmUnl(i)&&!wmSeen(i));WMS.cam=wmCamT();wmSave()}
/* ---------------- movement ---------------- */
const wmEdge=(a,b)=>WME.findIndex(([x,y])=>x==a&&y==b||x==b&&y==a);
const wmAdj=a=>WME.filter(([x,y])=>x==a||y==a).map(([x,y])=>x==a?y:x);
function wmRoute(a,b){const prev={[a]:-1},Q=[a];while(Q.length){const c=Q.shift();if(c==b)break;for(const d of wmAdj(c))if(prev[d]==null&&wmSeen(d)){prev[d]=c;Q.push(d)}}
if(prev[b]==null)return null;const r=[];for(let c=b;c!=a;c=prev[c])r.unshift(c);return r}
function wmNext(){const b=WMS.q.shift();if(b==null){WMS.mv=null;return}const e=wmEdge(WMS.at,b);WMS.mv={e,fw:WME[e][0]==WMS.at,d:0,to:b}}
function wmWalk(r){if(!r||!r.length)return;WMS.q=r.slice();wmNext();sfx(660,.05,"triangle",.035,990)}
function wmAt(E,d){const c=E.c;let i=0;while(i<c.length-2&&c[i+1]<d)i++;const u=Math.max(0,Math.min(1,(d-c[i])/((c[i+1]-c[i])||1)));return[E.p[i][0]+(E.p[i+1][0]-E.p[i][0])*u,E.p[i][1]+(E.p[i+1][1]-E.p[i][1])*u]}
function wmPos(){const m=WMS.mv;if(!m){const n=WMN[WMS.at];return[n.x,n.y]}const E=WMG[m.e];return wmAt(E,m.fw?m.d:E.L-m.d)}
const wmCamT=()=>Math.max(0,Math.min(WMW-W,wmPos()[0]-W*.45));
function wmToast(s,c){WMS.toast={s,c:c||HL,t:110}}
/* try to step toward an arrow direction */
function wmStep(dx,dy){const a=WMN[WMS.at];let best=-1,bs=.35;for(const b of wmAdj(WMS.at)){const n=WMN[b],vx=n.x-a.x,vy=n.y-a.y,s=(vx*dx+vy*dy)/Math.hypot(vx,vy);if(s>bs){bs=s;best=b}}
if(best<0)return;if(!wmSeen(best)){wmToast(WMN[best].k=="w2"?"BEAT THE 1-10 MINI BOSS FIRST!":"LOCKED - CLEAR "+(WMN[WMS.at].w||"THE LEVEL BEFORE")+" FIRST","#ff8a8a");sfx(160,.14,"square",.04,90);return}wmWalk([best])}
/* enter the pad the duck stands on */
function wmEnter(){const i=WMS.at,n=WMN[i];
if(n.k=="home"){sfx(520,.06,"triangle",.05,780);trans(lobbyOpen);return}
if(wmHas(i)){WMS.go=1;WMS.goI=i;[784,988,1175,1568].forEach((f,j)=>sfx(f,.14,"triangle",.05,0,.12+j*.06));noiz(.12,"bandpass",2400,5200,.03,.1,1.4);return}
wmToast(n.k=="w2"?(wmUnl(i)?"WORLD 2 - COMING SOON!":"BEAT THE 1-10 MINI BOSS FIRST!"):n.k=="boss"?"MINI BOSS - COMING SOON!":"LEVEL "+n.w+" - COMING SOON!");sfx(330,.1,"triangle",.04,250)}
function wmHit(x,y){if(x<0)return-1;const mx=x+WMS.cam;let b=-1,bd=1e9;WMN.forEach((n,i)=>{const r=n.k=="boss"?26:18,d=Math.hypot(mx-n.x,(y-n.y+(n.k=="boss"?14:4))*1.3);if(d<r&&d<bd){bd=d;b=i}});
const[px,py]=wmPos();if(b<0&&Math.abs(mx-px)<14&&y>py-40&&y<py+4)b=WMS.mv?-1:WMS.at;return b}
function wmUpd(){const M=WMS;if(M.toast&&M.toast.t>0)M.toast.t--;M.hov=TRN.on?-1:wmHit(MX,MY);M.cam+=(wmCamT()-M.cam)*.1;
if(TRN.on)return;
/* peace sign, then go */
if(M.go>0){if(++M.go==62){const i=M.goI,[x,y]=wmPos();trans(()=>i==12?t1Start():start(i));TRN.cx=Math.max(24,Math.min(W-24,x-M.cam));TRN.cy=y-14}return}
/* walking */
if(M.mv){const m=M.mv,E=WMG[m.e],[x0]=wmPos();m.d+=2.3;const[x1]=wmPos();if(Math.abs(x1-x0)>.4)M.dir=x1>x0?1:-1;M.an+=.3;
if(Math.floor(m.d/13)!=Math.floor((m.d-2.3)/13))noiz(.05,"lowpass",800,300,.018,0,.7);
if(m.d>=E.L){M.at=m.to;wmSave();if(M.q.length)wmNext();else{M.mv=null;sfx(990,.04,"sine",.03,1320)}}return}
/* reveal newly unlocked pads one by one */
if(M.rv){const r=M.rv;r.t++;if(r.t%5==0&&r.t<40)sfx(700+r.t*12,.03,"sine",.02);if(r.t==40){sfx(880,.1,"sine",.05,1320);sfx(1320,.14,"sine",.04,1760,.06)}
if(r.t>=58){M.seen.push(r.b);wmSave();M.rv=null;if(M.auto&&M.at==r.a){M.auto=0;wmWalk([r.b])}}return}
if(M.rq.length){const b=M.rq.shift(),a=wmAdj(b).find(wmSeen);if(a==null){M.seen.push(b);return}M.rv={a,b,e:wmEdge(a,b),t:0};return}
/* input */
if(pr("Escape","Backspace")){sfx(300,.05,"square",.03,150);trans(lobbyOpen);return}
if(pr("Enter","Space","KeyE")){wmEnter();return}
if(pr("Click")){const h=wmHit(MX,MY);if(h>=0){if(h==M.at)wmEnter();else if(wmSeen(h))wmWalk(wmRoute(M.at,h));else{wmToast(WMN[h].k=="w2"?"BEAT THE 1-10 MINI BOSS FIRST!":"LOCKED!","#ff8a8a");sfx(160,.14,"square",.04,90)}}return}
if(pr("ArrowRight","KeyD"))wmStep(1,0);else if(pr("ArrowLeft","KeyA"))wmStep(-1,0);else if(pr("ArrowUp","KeyW"))wmStep(0,-1);else if(pr("ArrowDown","KeyS"))wmStep(0,1)}
/* ---------------- drawing on the pixel canvas g ---------------- */
function wmPathD(E,d0,d1,st){const p=[];for(let i=0;i<E.p.length;i++)if(E.c[i]>=d0&&E.c[i]<=d1)p.push(E.p[i]);if(d1<E.L&&d1>0)p.push(wmAt(E,d1));if(p.length<2)return;
const o=-WMS.cam;g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x+o,y):g.moveTo(x+o,y));g.lineCap=g.lineJoin="round";
if(!st){g.setLineDash([2,7]);g.strokeStyle="rgba(250,236,196,.75)";g.lineWidth=3;g.stroke();g.setLineDash([]);return}
g.strokeStyle="#b98a4e";g.lineWidth=11;g.stroke();g.strokeStyle="#f1d49a";g.lineWidth=8;g.stroke();g.setLineDash([2.5,5]);g.strokeStyle="#fff6dc";g.lineWidth=2.4;g.stroke();g.setLineDash([])}
function wmEll(x,y,rx,ry,c){g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill()}
/* level pad: st 0 locked, 1 open, 2 cleared */
function wmPad(x,y,st,s){wmEll(x,y+3,15*s,7*s,"rgba(30,70,40,.3)");wmEll(x,y,14*s,8.6*s,wmK);
wmEll(x,y-1,12.4*s,7.2*s,st?"#f2c14e":"#aab4c4");wmEll(x,y-.3,12.4*s,6.4*s,st?"#c98a1c":"#8892a4");wmEll(x,y-1.6,12*s,6.6*s,st?"#ffd86a":"#c4ccd8");
wmEll(x,y-1.8,8*s,4.4*s,wmK);wmEll(x,y-1.8,7*s,3.8*s,st==2?"#3fbf5a":st==1?"#e8302a":"#7f8a9c");wmEll(x-2*s,y-3*s,3.2*s,1.4*s,"rgba(255,255,255,.55)");
if(st==2){g.strokeStyle="#fff";g.lineWidth=1.6;g.lineCap="round";g.beginPath();g.moveTo(x-3,y-2);g.lineTo(x-1,y);g.lineTo(x+3.4,y-4);g.stroke()}
if(st==0){R(x-3,y-5,6,5,"#3a3448");g.strokeStyle="#3a3448";g.lineWidth=1.4;g.beginPath();g.arc(x,y-5,2.2,Math.PI,0);g.stroke();R(x-.5,y-3.5,1,2,"#c4ccd8")}}
/* map props: the level scenery (33-grassland-scenery.js) drawn small, plus hills, mountains, rocks, bushes */
function wmProp(k,x,y,s){if(k=="sakura")sakuraTree(x,y,.55);else if(k=="tree")leafTree(x,y,.55);else if(k=="torii")toriiDraw(x,y,.5);else if(k=="toro")toroDraw(x,y,.7);
else if(k=="bush"){const B=[[-7,-4,6],[6,-4,6],[0,-8,7]];for(const[dx,dy,r]of B)wmEll(x+dx,y+dy,r+1.4,r+1.2,wmK);for(const[dx,dy,r]of B)wmEll(x+dx,y+dy,r,r*.92,"#3f9a4c");wmEll(x-2,y-11,3.4,2,"#7fd070")}
else if(k=="rock"){wmEll(x,y-4,9,6.6,wmK);wmEll(x,y-4.4,7.8,5.4,"#9a9a92");wmEll(x-2,y-6.4,4,2.4,"#c4c4bc")}
else if(k=="hill"){g.save();g.translate(x,y);g.scale(s,s);wmEll(0,0,32,9,"rgba(30,70,40,.3)");g.fillStyle=wmK;g.beginPath();g.ellipse(0,-2,31.5,25.5,0,Math.PI,0);g.lineTo(31.5,1);g.lineTo(-31.5,1);g.fill();
g.fillStyle="#4f9e48";g.beginPath();g.ellipse(0,-2,30,24,0,Math.PI,0);g.lineTo(30,0);g.lineTo(-30,0);g.fill();g.fillStyle="#6cc35e";g.beginPath();g.ellipse(-3,-5,24,19,0,Math.PI,0);g.fill();wmEll(-10,-15,8,4,"#9be08a");g.restore()}
else if(k=="mtn"){g.save();g.translate(x,y);g.scale(s,s);const M=o=>{g.beginPath();g.moveTo(-36-o,2+o);g.quadraticCurveTo(-18,-18,-5,-46-o);g.quadraticCurveTo(0,-50-o,5,-46-o);g.quadraticCurveTo(18,-18,36+o,2+o);g.closePath()};
M(1.6);g.fillStyle=wmK;g.fill();M(0);g.fillStyle="#9ea6b8";g.fill();g.fillStyle="#7c8498";g.beginPath();g.moveTo(5,-46);g.quadraticCurveTo(18,-18,36,2);g.lineTo(8,2);g.quadraticCurveTo(10,-20,2,-44);g.closePath();g.fill();
g.fillStyle="#f6f9ff";g.beginPath();g.moveTo(-5,-46);g.quadraticCurveTo(0,-50,5,-46);g.lineTo(12,-32);g.lineTo(6,-34);g.lineTo(2,-28);g.lineTo(-3,-33);g.lineTo(-8,-29);g.lineTo(-12,-33);g.closePath();g.fill();g.restore()}}
function wmHouse(x,y){R(x-13,y-18,26,18,wmK);R(x-12,y-17,24,16,"#f4ecd8");R(x-12,y-6,24,5,"#e0d4b8");g.fillStyle=wmK;g.beginPath();g.moveTo(x-16,y-17);g.lineTo(x,y-31);g.lineTo(x+16,y-17);g.fill();g.fillStyle="#e8453c";g.beginPath();g.moveTo(x-13.5,y-18);g.lineTo(x,y-29);g.lineTo(x+13.5,y-18);g.fill();
R(x+3,y-12,6,11,"#7a4a2a");R(x+7,y-7,1,1,"#ffd24a");R(x-9,y-14,7,6,"#ffe08a");R(x-6,y-14,1,6,wmK);R(x-9,y-11,7,1,wmK);R(x+6,y-33,3,7,wmK)}
function wmHut(x,y){R(x-11,y-15,22,15,wmK);R(x-10,y-14,20,13,"#f4ecd8");g.fillStyle=wmK;g.beginPath();g.moveTo(x-14,y-14);g.lineTo(x,y-25);g.lineTo(x+14,y-14);g.fill();for(let j=0;j<4;j++){g.fillStyle=j%2?"#2fd8c8":"#fff";g.beginPath();g.moveTo(x-12+j*6,y-15);g.lineTo(x,y-23.5);g.lineTo(x-6+j*6,y-15);g.fill()}
R(x-3,y-10,6,9,"#2e7fd1");const bx=x+19,by=y-16;R(bx-1,by,2,16,"#7a4a2e");for(const[r,c]of[[7,wmK],[6,"#fff"],[4.4,"#e8302a"],[2.8,"#fff"],[1.3,"#e8302a"]])wmEll(bx,by,r,r,c)}
function wmTower(x,y){const w=46,top=y-78,b=y-6,ink=wmK,t=frame;
/* flag */R(x-1,top-30,2,32,ink);const fw=Math.sin(t*.12)*2;g.fillStyle=ink;g.beginPath();g.moveTo(x+1,top-30);g.quadraticCurveTo(x+12,top-31+fw,x+23,top-28+fw);g.lineTo(x+23,top-14+fw);g.quadraticCurveTo(x+12,top-17-fw,x+1,top-15);g.fill();
g.fillStyle="#2e3b8a";g.beginPath();g.moveTo(x+2,top-29);g.quadraticCurveTo(x+12,top-30+fw,x+22,top-27+fw);g.lineTo(x+22,top-15+fw);g.quadraticCurveTo(x+12,top-18-fw,x+2,top-16);g.fill();
wmEll(x+11,top-22+fw*.6,4.2,4.6,"#111");wmEll(x+11,top-21+fw*.6,2.6,3,"#fff");g.fillStyle="#ff9a1f";g.beginPath();g.moveTo(x+10,top-21+fw*.6);g.lineTo(x+16,top-20+fw*.6);g.lineTo(x+10,top-19+fw*.6);g.fill();R(x+9.5,top-23+fw*.6,1.2,1.2,"#111");
/* body */const gr=g.createLinearGradient(x-w/2,0,x+w/2,0);gr.addColorStop(0,"#8d96b4");gr.addColorStop(.35,"#b8c1da");gr.addColorStop(1,"#5c6585");
R(x-w/2-1.5,top-1.5,w+3,b-top+3,ink);g.fillStyle=gr;g.fillRect(x-w/2,top,w,b-top);wmEll(x,b,w/2+1.5,6.5,ink);g.fillStyle=gr;g.beginPath();g.ellipse(x,b,w/2,5,0,0,Math.PI);g.fill();
g.strokeStyle="rgba(40,46,80,.35)";g.lineWidth=1;g.beginPath();for(let r=0,yy=top+10;yy<b-2;yy+=9,r++){g.moveTo(x-w/2,yy);g.lineTo(x+w/2,yy);for(let c=-2;c<=2;c++){const bx=x+c*10+(r%2?5:0);if(bx>x-w/2+2&&bx<x+w/2-2){g.moveTo(bx,yy);g.lineTo(bx,yy+9)}}}g.stroke();
/* battlements */for(let c=0;c<5;c++){const mx=x-w/2-2+c*10.5;R(mx-1,top-9,8.5,10,ink);R(mx,top-8,6.5,8,c==1?"#c4cce2":"#9aa3c0")}R(x-w/2-2,top-1,w+4,4,ink);R(x-w/2-1,top,w+2,2,"#c4cce2");
/* windows + door with glowing eyes */for(const dx of[-12,12]){R(x+dx-2.5,top+14,5,9,ink);R(x+dx-1.5,top+15,3,7,"#ffcf5a")}
g.fillStyle=ink;g.beginPath();g.moveTo(x-10,b+1);g.lineTo(x-10,b-16);g.arc(x,b-16,10,Math.PI,0);g.lineTo(x+10,b+1);g.fill();g.fillStyle="#140c1e";g.beginPath();g.moveTo(x-8.5,b+1);g.lineTo(x-8.5,b-16);g.arc(x,b-16,8.5,Math.PI,0);g.lineTo(x+8.5,b+1);g.fill();
if(t%160>8){R(x-5,b-15,3,2,"#ffd24a");R(x+2,b-15,3,2,"#ffd24a")}
g.strokeStyle="#e8b83a";g.lineWidth=1.4;g.beginPath();g.moveTo(x-w/2+3,top+28);g.quadraticCurveTo(x,top+40,x+w/2-3,top+28);g.stroke();wmEll(x,top+38,3,3,"#ffd24a")}
/* signpost to World 2 + a wooden pier that leads off the island */
function wmGate(x,y){R(x+13,y-34,3,34,wmK);R(x+14,y-34,1,34,"#9a6a46");g.fillStyle=wmK;g.beginPath();g.moveTo(x+2,y-34);g.lineTo(x+34,y-34);g.lineTo(x+40,y-28);g.lineTo(x+34,y-22);g.lineTo(x+2,y-22);g.fill();g.fillStyle="#c98a4e";g.beginPath();g.moveTo(x+3,y-33);g.lineTo(x+33.5,y-33);g.lineTo(x+38.5,y-28);g.lineTo(x+33.5,y-23);g.lineTo(x+3,y-23);g.fill()}
function wmPier(x0,x1,y){R(x0,y-7,x1-x0,14,wmK);R(x0,y-6,x1-x0,12,"#c98a4e");for(let x=x0+3;x<x1;x+=7)R(x,y-6,1,12,"#9a6a3a");for(let x=x0+6;x<x1;x+=22){R(x,y+6,3,9,wmK);R(x+.5,y+6,2,8,"#7a4e2c")}}
/* red arched bridge, turned along the path */
function wmBridge(x,y,a){g.save();g.translate(x,y);g.rotate(a);g.lineCap="round";R(-17,-7,34,14,wmK);R(-16,-6,32,12,"#c98a4e");g.strokeStyle="#9a6a3a";g.lineWidth=1;g.beginPath();for(let k=-12;k<=12;k+=4){g.moveTo(k,-6);g.lineTo(k,6)}g.stroke();
for(const s of[-1,1]){g.strokeStyle=wmK;g.lineWidth=4.2;g.beginPath();g.moveTo(-17,s*7);g.quadraticCurveTo(0,s*7-5,17,s*7);g.stroke();g.strokeStyle="#d8312a";g.lineWidth=2.4;g.stroke();for(const px of[-17,0,17]){const py=s*7-(px?0:2.5);R(px-2,py-3,4,4,wmK);R(px-1,py-2,2,2,"#ffd24a")}}g.restore()}
/* the island outline: o grows it outward, dy moves it down (the cliff below the grass) */
function wmIsle(c,o,dy){const tl=x=>wmTopY(x)-o+dy,bl=x=>wmBotY(x)+o+dy,mid=x=>(wmTopY(x)+wmBotY(x))/2+dy;g.beginPath();g.moveTo(WMX0+20-c,tl(WMX0+20));
for(let x=WMX0+32;x<=WMX1-20;x+=12)g.lineTo(x-c,tl(x));g.quadraticCurveTo(WMX1+o-c,tl(WMX1),WMX1+o-c,mid(WMX1));g.quadraticCurveTo(WMX1+o-c,bl(WMX1),WMX1-20-c,bl(WMX1-20));
for(let x=WMX1-32;x>=WMX0+20;x-=12)g.lineTo(x-c,bl(x));g.quadraticCurveTo(WMX0-o-c,bl(WMX0),WMX0-o-c,mid(WMX0));g.quadraticCurveTo(WMX0-o-c,tl(WMX0),WMX0+20-c,tl(WMX0+20));g.closePath()}
function wmDraw(){const M=WMS,c=M.cam;
/* sea + waves */g.fillStyle="#3d8fd8";g.fillRect(0,0,W,H);g.strokeStyle="rgba(220,240,255,.55)";g.lineWidth=1.2;g.lineCap="round";for(const[x,y]of WMWV){const sx=((x-c+frame*.15)%(W+60)+W+60)%(W+60)-30,ph=Math.sin(frame*.04+x)*2;g.beginPath();g.arc(sx,y+ph,5,.4,Math.PI-.4);g.stroke()}
/* foam ring, cliff, grass */wmIsle(c,5,13);g.strokeStyle="rgba(240,250,255,.75)";g.lineWidth=3;g.stroke();
wmIsle(c,0,13);g.fillStyle="#7a4e2c";g.fill();g.strokeStyle=wmK;g.lineWidth=2;g.stroke();
g.save();wmIsle(c,0,13);g.clip();g.strokeStyle="rgba(50,28,12,.45)";g.lineWidth=1.2;for(let x=Math.floor(c/14)*14;x<c+W+14;x+=14){g.beginPath();g.moveTo(x-c,wmBotY(x)+2);g.lineTo(x-c+3,wmBotY(x)+12);g.stroke()}g.restore();
wmIsle(c,0,0);g.fillStyle="#5fb052";g.fill();g.strokeStyle=wmK;g.lineWidth=2;g.stroke();wmIsle(c,-5,0);g.fillStyle="#6cc35e";g.fill();
g.save();wmIsle(c,-5,0);g.clip();
for(const[x,y,r,lt]of WMM){const sx=x-c;if(sx+r<0||sx-r>W)continue;g.globalAlpha=.4;wmEll(sx,y,r,r*.45,lt?"#86d16f":"#56a84c");g.globalAlpha=1}
g.strokeStyle="#4f9e48";g.lineWidth=1;for(const[x,y]of WMTF){const sx=x-c;if(sx<-4||sx>W+4)continue;g.beginPath();g.moveTo(sx-2,y-3);g.lineTo(sx,y);g.lineTo(sx+2,y-3);g.stroke()}
for(const[x,y,k]of WMFL){const sx=x-c;if(sx<-4||sx>W+4)continue;R(sx,y,2,2,["#ffffff","#ffc2d4","#ffe066"][k])}
/* pond + river */{const o=-c;wmEll(418+o,98,22,10,wmK);wmEll(418+o,98,20,8.4,"#3d8fd8");wmEll(412+o,96,9,3,"#8ccdf4");wmEll(428+o,100,4,2,"#4caa48");
g.lineCap=g.lineJoin="round";for(const[cl,lw]of[[wmK,19],["#3d8fd8",15],["#5aaef0",10]]){g.strokeStyle=cl;g.lineWidth=lw;g.beginPath();WMRV.forEach(([x,y],i)=>i?g.lineTo(x+o,y):g.moveTo(x+o,y));g.stroke()}
g.setLineDash([5,9]);g.lineDashOffset=-frame*.4;g.strokeStyle="#c8ecff";g.lineWidth=1.6;g.beginPath();WMRV.forEach(([x,y],i)=>i?g.lineTo(x+o-1,y):g.moveTo(x+o-1,y));g.stroke();g.setLineDash([])}
g.restore();
/* waterfall over the cliff into the sea */{const[x,y]=WMRV[WMRV.length-1],sx=x-c,by=wmBotY(x);R(sx-6,by-1,12,15,wmK);R(sx-5,by-1,10,15,"#7cc4f4");for(let k=0;k<3;k++)R(sx-4+k*3.5,by+((frame*.6+k*5)%13),1.4,4,"#e6f6ff");wmEll(sx,by+15,11,3.6,"#e6f6ff")}
/* paths (+ the pier on to World 2) */WME.forEach(([a,b],e)=>{const E=WMG[e],rv=M.rv&&M.rv.e==e;if(rv){const k=ez(M.rv.t/40),fw=WME[e][0]==M.rv.a;wmPathD(E,0,E.L,0);if(fw)wmPathD(E,0,E.L*k,1);else wmPathD(E,E.L*(1-k),E.L,1)}else wmPathD(E,0,E.L,wmSeen(a)&&wmSeen(b)?1:0)});
{const n=WMN[11];if(n.x-c<W+20)wmPier(WMX1-c-6,WMW-c+30,n.y+2)}
wmBridge(WMBR.x-c,WMBR.y,WMBR.a);
/* props + buildings */WMD.forEach(([k,x,y,s])=>{const sx=x-c;if(sx>-50&&sx<W+50){if(k!="hill"&&k!="mtn"&&k!="rock")wmEll(sx,y+1,k=="torii"?19:k=="bush"?10:13,3.5,"rgba(30,70,40,.3)");wmProp(k,sx,y,s||1)}});
const h=WMN[0],tu=WMN[12],bs=WMN[10],w2=WMN[11];wmHouse(h.x-c-26,h.y-4);wmHut(tu.x-c-4,tu.y-8);if(bs.x-c>-60&&bs.x-c<W+60){wmEll(bs.x-c,bs.y-6,30,8,"rgba(30,70,40,.3)");wmTower(bs.x-c,bs.y-4)}if(w2.x-c<W+80)wmGate(w2.x-c,w2.y);
/* pads */WMN.forEach((n,i)=>{const sx=n.x-c;if(sx<-30||sx>W+30)return;const rv=M.rv&&M.rv.b==i,pop=rv?Math.max(0,M.rv.t-40)/18:1,sc=rv?(pop<=0?1:1+Math.sin(Math.min(1,pop)*Math.PI)*.35):1,st=(wmSeen(i)||rv&&pop>0)?(n.k=="lv"||n.k=="boss"?(wmClr(i)?2:1):n.k=="tut"?(LVR[0]?2:1):1):0;
if(n.k=="home"){wmPad(sx,n.y,1,1);g.fillStyle="#fff";g.beginPath();g.moveTo(sx-5,n.y-4);g.lineTo(sx+1,n.y-4);g.lineTo(sx+1,n.y-6.5);g.lineTo(sx+6,n.y-1.8);g.lineTo(sx+1,n.y+2.8);g.lineTo(sx+1,n.y+.4);g.lineTo(sx-5,n.y+.4);g.closePath();g.fill()}
else wmPad(sx,n.y,st,sc*(n.k=="tut"?.85:1))});
/* duck shadow */const[px,py]=wmPos(),hop=wmHop();wmEll(px-c,py+1,11-hop*.3,4-hop*.1,"rgba(30,70,40,.3)");
/* a few cherry petals drifting */for(let j=0;j<6;j++){const u=((frame*(.12+hzf(j+700)*.1)+hzf(j+710)*500)%420)/420,x=((hzf(j+720)*W*1.3-u*180+Math.sin(frame*.03+j)*10)%W+W)%W,y=-10+u*(H+20);g.save();g.translate(x,y);g.rotate(frame*.05+j);g.fillStyle=j%2?"#ffc2d4":"#ffe0ec";g.fillRect(-1.5,-1,3,2);g.restore()}}
const wmHop=()=>{const M=WMS;return M&&M.go>0?Math.max(0,Math.sin(Math.min(1,Math.max(0,M.go-4)/16)*Math.PI))*10:0};
/* ---------------- crisp layer (vg): tags, duck, peace sign, HUD ---------------- */
function wmVHand(v,x,y,s,a){if(a<=0)return;v.save();v.translate(x,y);v.scale(s,s);v.globalAlpha=a;v.lineJoin=v.lineCap="round";
v.fillStyle="#fff";v.strokeStyle=INK;v.lineWidth=2.2;v.beginPath();v.moveTo(-7,8);v.lineTo(-14,17);v.lineTo(-1,11);v.closePath();v.fill();v.stroke();v.beginPath();v.arc(0,0,13,0,7);v.fill();v.stroke();v.beginPath();v.moveTo(-6.5,8.6);v.lineTo(-1.5,10.4);v.strokeStyle="#fff";v.lineWidth=3;v.stroke();
v.translate(0,4);for(const a2 of[-.34,.34]){v.save();v.rotate(a2);v.beginPath();srrV(v,-2,-12,4,10.5,2);v.fillStyle="#ffd24a";v.fill();v.strokeStyle=INK;v.lineWidth=1.3;v.stroke();v.restore()}
v.beginPath();srrV(v,-5,-3.5,10,8.5,3.2);v.fillStyle="#ffd24a";v.fill();v.strokeStyle=INK;v.lineWidth=1.3;v.stroke();v.beginPath();v.moveTo(-2.4,-.6);v.lineTo(2.6,-.6);v.moveTo(-5,1.6);v.quadraticCurveTo(-1,3.4,1.6,1.2);v.lineWidth=1;v.stroke();v.restore()}
function wmTag(v,s,x,y,bg,fg){v.save();v.font="900 8px "+FM;const w=v.measureText(s).width+10;vrr(x-w/2-1,y-6,w+2,12,6);v.fillStyle=INK;v.fill();vrr(x-w/2,y-5,w,10,5);v.fillStyle=bg;v.fill();v.fillStyle=fg;v.textAlign="center";v.fillText(s,x,y+3);v.restore()}
function wmTop(){const M=WMS,v=vg,c=M.cam;
/* pad tags + pulse on open levels + hover ring */
WMN.forEach((n,i)=>{const sx=n.x-c;if(sx<-30||sx>W+30)return;const se=wmSeen(i);
if(n.w&&n.k!="w2"){const cl=wmClr(i);wmTag(v,n.w,sx,n.y+15,!se?"#5a5470":n.k=="boss"?"#c0392b":cl?"#3fbf5a":HL,!se?"#b8b0cc":n.k=="boss"||cl?"#fff":DKT);if(cl&&LVR[i].st)starIcon(v,sx+17,n.y+15,3.6,1)}
if(se&&wmHas(i)&&n.k=="lv"&&!wmClr(i)&&!M.mv){const u=(frame%60)/60;v.globalAlpha=1-u;v.strokeStyle="#fff2a8";v.lineWidth=1.6;v.beginPath();v.ellipse(sx,n.y-1,13+u*9,7.5+u*5,0,0,7);v.stroke();v.globalAlpha=1}
if(M.hov==i&&i!=M.at&&!M.go){v.strokeStyle=se?"#fff":"#ff8a8a";v.lineWidth=2;v.setLineDash([3,3]);v.lineDashOffset=-frame*.4;v.beginPath();v.ellipse(sx,n.y-1,17,10,0,0,7);v.stroke();v.setLineDash([])}});
{const n=WMN[11],sx=n.x-c;if(sx<W+60){v.save();v.translate(sx+20,n.y-29);v.font="900 8px "+FM;v.textAlign="center";v.fillStyle="#2a1600";v.fillText("WORLD 2",-1,1);v.fillStyle="#fff6dc";v.fillText("WORLD 2",-1.6,.4);v.restore();if(!wmUnl(11)){v.save();v.translate(sx+20,n.y-12);v.fillStyle=INK;vrr(-6,-2,12,10,2);v.fill();v.strokeStyle=INK;v.lineWidth=2.4;v.beginPath();v.arc(0,-2,4,Math.PI,0);v.stroke();v.fillStyle="#ffd24a";v.fillRect(-1,1.5,2,3);v.restore()}}}
/* the duck */
const[px,py]=wmPos(),go=M.go,k=go>0?ez(Math.min(1,go/10))*(go<50?1:1-ez((go-50)/10)):0,walk=!!M.mv;
M.yaw+=((walk?M.dir*1.15:go>0?.05:.55)-M.yaw)*(walk||go>0?.25:.15);
const o={yaw:M.yaw,ev:1,an:walk?M.an:0,rq:walk?.7:0,hp:-.18+k*.06,fl:walk?null:.5,wd:.3,sid:"wm",id:walk?0:1,tilt:walk?-M.dir*.05:Math.sin(go*.35)*.05*k,hz:k*.14};
/* peace: right wing swings up beside the head and wiggles */
if(k>0){const wg=Math.sin(go*.45)*.16*k;o.rwm=mm(rZ(.12+k*2.35+wg),rX(-k*.35))}
if(o.fl==null)delete o.fl;DT=vg;duckDraw(px-c,py-wmHop(),.85,o);DT=g;
if(go>6){const u=Math.min(1,(go-6)/8),s=u<1?u*1.2:1+Math.sin(go*.3)*.04;wmVHand(v,px-c+22,py-62-wmHop(),s,go<54?1:1-(go-54)/8);
if(go>10&&go<54){v.save();v.globalAlpha=Math.min(1,(go-10)/6);luTi("PEACE!",px-c+40,py-66-wmHop(),12,HL,"left",-.12);v.restore()}
v.fillStyle="#fff6c0";for(let j=0;j<6;j++){const a=j*1.047+go*.08,r=18+((go*1.5+j*9)%24);v.globalAlpha=Math.max(0,1-r/42);v.fillRect(px-c+22+Math.cos(a)*r,py-62-wmHop()+Math.sin(a)*r*.8,2,2)}v.globalAlpha=1}
/* HUD plaque: WORLD 1-x + level name + record */
const i=M.mv?M.mv.to:M.at,n=WMN[i],r=LVR[i],t1=n.k=="home"||n.k=="tut"?"WORLD 1":n.k=="w2"?"WORLD 2":"WORLD "+n.w;
v.fillStyle=INK;luInk(8,8,216,58,7,2.2);luTi(t1,18,34,21,HL,"left",-.03);v.strokeStyle="#ff8a1f";v.lineWidth=2;v.lineCap="round";v.beginPath();v.moveTo(18,39);v.lineTo(126,37);v.stroke();
luIt(wmName(i),19,51,9,"#e8e6f0","left",900);
if((n.k=="lv"||n.k=="boss")&&wmHas(i)){starIcon(v,170,33,6,r&&r.st?1:0);if(r&&r.r)srGrade(v,198,26,r.r,1);else luIt("NEW",198,36,9,"#7cff6b","center",900)}
luCoins(1);
/* toast */
if(M.toast&&M.toast.t>0){const s=M.toast.s,w=luW(s,11,900)+30,a=Math.min(1,M.toast.t/12),y=74+(1-Math.min(1,(110-M.toast.t)/8))*-8;v.globalAlpha=a;v.fillStyle=INK;luInk(W/2-w/2,y,W/2+w/2,y+24,13,2);luIt(s,W/2,y+17,11,M.toast.c,"center",900);v.globalAlpha=1}
/* control hints */
v.fillStyle="rgba(12,10,18,.6)";v.fillRect(0,268,GPL?190:250,20);let x=10;if(GPL){for(const[kk,d]of[["A","play"],["B","lobby"]]){x+=luKey(kk,x,281)+4;luIt(d,x,280,10,"#ffffff","left",800);x+=luW(d,10)+10}luIt("stick: move",x,280,10,"#ffffff","left",800)}
else{x+=luKey("←",x,281)+2;x+=luKey("→",x,281)+5;luIt("walk",x,280,10,"#ffffff","left",800);x+=luW("walk",10)+12;x+=luKey("ENTER",x,281)+5;luIt("play",x,280,10,"#ffffff","left",800);x+=luW("play",10)+12;x+=luKey("ESC",x,281)+5;luIt("lobby",x,280,10,"#ffffff","left",800)}
CV.style.cursor=M.hov>=0&&!M.go?"pointer":"default"}
