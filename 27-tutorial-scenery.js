/* =====================================================================
   Tutorial scenery (t1)
   Depth layers (far haze, fog bands, stone duck statues in the mist), lesson scrolls with keycaps,
   ghost trajectories, checkpoint flags, misty gaps, foreground silhouettes, flakes, lesson tracker.
   ===================================================================== */
const LES=[
{x:2,n:"WALK",c:"#ffc928",k:["←","→"],d:"or A / D to move"},
{x:15,n:"SKATE",c:"#e8302a",k:["SHIFT"],h:1,d:"ride your skateboard"},
{x:31,n:"JUMP",c:"#2e7fd1",k:["SPACE"],d:"hold for a higher jump"},

{x:44,n:"SKATE + JUMP",c:"#e8302a",k:["SHIFT","SPACE"],d:"build speed, then jump the gap"},
{x:57,n:"GLIDE",c:"#3fbf5a",k:["SPACE"],h:1,d:"in the air: jacket parachute",dx:-34},
{x:79,n:"EGG",c:"#ff4fd8",k:["F"],m:1,d:"grab an egg and throw it!"},
{x:85,n:"BIG ENEMY",c:"#ff4fd8",d:"one egg knocks him out,|jump over its shockwave",dx:6},
{x:106,n:"SCARF",c:"#ffc928",k:["Q"],h:1,d:"near a hook: swing,|release to fly",dx:-196},
{x:129,n:"ALL TOGETHER",c:"#e8302a",d:"skate, jump and glide to the exit!"},
{x:141,n:"EXIT",c:"#ffc928",d:"to the street »",dx:-60,y:58}];
const TS={i:-1,pop:0,clr:0,stat:null},
FARB=(()=>{let s=5;const r=()=>(s=s*16807%2147483647)/2147483647,o=[];for(let a=-40;a<WW*.08+W+80;){const w=26+r()*46;o.push({x:a,w,h:46+r()*84,sp:r()<.25?8+r()*18:0});a+=w+2}return o})(),
FGS=(()=>{let s=17;const r=()=>(s=s*16807%2147483647)/2147483647,o=[];for(let a=60;a<WW*1.4+W;a+=200+r()*260)o.push({x:a,t:r()*3|0,w:r()});return o})(),
FLK=(()=>{let s=29;const r=()=>(s=s*16807%2147483647)/2147483647;return Array.from({length:64},(_,i)=>({x:r()*W,y:r()*H,z:i<46?.25+r()*.35:1.3+r()*.4,v:.25+r()*.35,ph:r()*6}))})(),
STP=[[2,{yaw:.9,ev:1,an:1.25,rq:1,wd:.3}],[15,{yaw:1.1,ev:1,sb:1,an:0,tilt:-.08,wd:.3}],[31,{yaw:1,ev:1,air:1,vy:-3,wd:.3}],[57,{yaw:.8,ev:1,air:1,vy:1,fl:2.7,tilt:.04,wd:.3}],[79,{yaw:1.05,ev:1,hp:.1,tilt:.06,wd:.3,lwm:mm(rX(3.55),rZ(-.12)),rwm:mm(rX(.5),rZ(.12)),sy:1.04,sx:.96}],[106,{yaw:.7,ev:1,fl:.6,wd:.3,rwm:mm(rY(-.55),mm(rX(-2.3),rZ(.12))),rwo:[-.28,.3,.5]}],[129,{yaw:0,ev:1,fl:2.6,wd:.3}]];
function tsFog(y0,y1,a,col){const q=g.createLinearGradient(0,y0,0,y1);q.addColorStop(0,"rgba("+col+",0)");q.addColorStop(1,"rgba("+col+","+a+")");g.fillStyle=q;g.fillRect(0,y0,W,y1-y0)}
/* stone props, drawn in the duck's 1x local space (origin = feet) */
function stBoard(v){v.lineCap=v.lineJoin="round";for(const wx of[-9,9]){v.fillStyle="#8c8c94";v.fillRect(wx-1.5,.4,3,2);v.fillStyle="#1a1230";v.beginPath();v.arc(wx,3.2,3.6,0,7);v.fill();v.fillStyle="#f2ece0";v.beginPath();v.arc(wx,3.2,2.7,0,7);v.fill()}
const dk=()=>{v.beginPath();v.moveTo(-16,-4);v.quadraticCurveTo(-14,-.3,-10,-.3);v.lineTo(10,-.3);v.quadraticCurveTo(14,-.3,16,-4)};dk();v.strokeStyle="#1a1230";v.lineWidth=5.6;v.stroke();dk();v.strokeStyle="#ff5a3c";v.lineWidth=3.6;v.stroke()}
function stChute(v,yaw){const U=12.32,fl=2.7,hx=(1+.95*Math.sin(fl))*Math.abs(Math.cos(yaw))*U,hy=-(1.35-.95*Math.cos(fl))*U,hw=12,hh=17,cy=-46,yT=cy-hh/2,yS=yT+3,yH=cy+hh/2,ink="#2a2238",cs="rgb(96,120,170)";v.lineJoin=v.lineCap="round";
for(const d of[-1,1])for(const[c2,w2]of[[ink,8],[cs,5.4]]){v.strokeStyle=c2;v.lineWidth=w2;v.beginPath();v.moveTo(d*hw*.9,yS+3);v.quadraticCurveTo(d*(hx+3),(yS+3+hy-1)/2,d*hx,hy-1);v.stroke()}
const hem=()=>{v.quadraticCurveTo(hw*.5,yH+4,0,yH);v.quadraticCurveTo(-hw*.5,yH+4,-hw,yH)};
v.beginPath();v.moveTo(-hw,yH);v.lineTo(-hw,yS+2);v.quadraticCurveTo(-hw*.9,yT+1,-5,yT);v.quadraticCurveTo(0,yT+4,5,yT);v.quadraticCurveTo(hw*.9,yT+1,hw,yS+2);v.lineTo(hw,yH);hem();v.closePath();v.fillStyle=cs;v.fill();v.strokeStyle=ink;v.lineWidth=2;v.stroke();
v.strokeStyle="#e6e6ee";v.lineWidth=1.5;v.beginPath();v.moveTo(0,yT+4);v.lineTo(0,yH+1);v.stroke();v.beginPath();v.moveTo(hw,yH);hem();v.strokeStyle="#f6efe2";v.lineWidth=2.2;v.stroke()}
function stScarf(v){v.lineCap="round";v.strokeStyle="#2a2238";v.lineWidth=4;v.beginPath();v.arc(32,-50,6.5,0,7);v.stroke();
for(const[c2,w2]of[["#2a2238",6],["#c83040",3.6]]){v.strokeStyle=c2;v.lineWidth=w2;v.beginPath();v.moveTo(4,-21);v.bezierCurveTo(13,-30,20,-38,27,-46);v.stroke()}
for(const[c2,w2]of[["#2a2238",5],["#c83040",3]]){v.strokeStyle=c2;v.lineWidth=w2;v.beginPath();v.moveTo(38,-49);v.quadraticCurveTo(42,-42,40,-35);v.stroke()}}
function stBubble(v,x,y,r){v.save();v.globalAlpha=.5;v.fillStyle="#7fc4ff";v.beginPath();v.arc(x,y,r,0,7);v.fill();v.globalAlpha=1;v.strokeStyle="#04257a";v.lineWidth=2.4;v.stroke();v.strokeStyle="rgba(230,246,255,.95)";v.lineWidth=3;v.beginPath();v.arc(x,y,r*.72,-2.6,-1.5);v.stroke();v.fillStyle="#fff";v.beginPath();v.ellipse(x-r*.38,y-r*.42,r*.18,r*.1,-.6,0,7);v.fill();v.restore()}
function tsStatBuild(){const sc=2.6,k=Math.ceil(DN*.56*sc),kw=Math.ceil(k*1.4),cx=kw/2,gy=k*.86,u=12.32*sc,out=[];
for(const[lx,o0]of STP){const raw=document.createElement("canvas");raw.width=kw;raw.height=k;const q=raw.getContext("2d"),od=DT,lift=lx==15?7*sc:0,o=Object.assign({sid:"st"+lx,id:0},o0);
const loc=f=>{q.save();q.translate(cx,gy-lift);q.scale(sc,sc);f(q);q.restore()};
if(lx==57){o.pc=1;loc(v=>stChute(v,o.yaw))}if(lx==15)loc(stBoard);
DT=q;duckDraw(cx,gy-lift-(lx==15?3.62*sc-.4:0),sc,o);DT=od;if(lx==106)loc(stScarf);
/* EGG statue: the egg just leaving the wing tip, with two throw arcs (turned to stone with the duck) */
if(lx==79&&typeof ciTip=="function"){const[ex,ey]=ciTip(o,cx,gy,sc);q.save();q.lineCap="round";q.strokeStyle="rgba(40,30,50,.55)";q.lineWidth=2.2;for(const k of[0,1]){q.beginPath();q.arc(ex-10-k*4,ey+14+k*5,16+k*7,-1.9,-.6);q.stroke()}q.restore();eggHQ(q,ex+9,ey-5,21,.5,1,1)}
const cv=document.createElement("canvas");cv.width=kw;cv.height=k;const x=cv.getContext("2d");x.filter="grayscale(1) brightness(1.18) contrast(.8)";x.drawImage(raw,0,0);x.filter="none";
x.globalCompositeOperation="source-atop";const lg=x.createLinearGradient(0,0,0,k);lg.addColorStop(0,"rgba(214,206,238,.35)");lg.addColorStop(1,"rgba(120,110,160,.45)");x.fillStyle=lg;x.fillRect(0,0,kw,k);x.globalCompositeOperation="source-over";
out.push({lx,cv,k,kw})}return out}
function tsBack(c){
for(const b of FARB){const x=b.x-c*.08;if(x<-80||x>W+10)continue;R(x,224-b.h,b.w,b.h,"#a9aecb");if(b.sp)R(x+b.w/2-1,224-b.h-b.sp,2,b.sp,"#a9aecb")}
tsFog(110,224,.55,"222,220,238");
for(const b of B1){const x=b.x-c*.2;if(x<-80||x>W)continue;R(x,224-b.h,b.w,b.h,"#7b72a0");R(x,224-b.h,b.w,2,"#958cba")}
tsFog(130,224,.5,"214,208,234");
for(const b of B2){const x=b.x-c*.5;if(x<-140||x>W)continue;R(x,224-b.h,b.w,b.h,"#3a2f58");R(x,224-b.h,b.w,3,"#55497a");b.wn.forEach((l,i)=>{if(l)R(x+8+(i%b.cl)*16,224-b.h+10+((i/b.cl)|0)*18,8,10,"#e9e2ff")})}
tsFog(100,224,.42,"214,208,234");
if(!TS.stat)TS.stat=tsStatBuild();
for(const s of TS.stat){const X=380+.7*(s.lx*T-216)-c*.7;if(X<-120||X>W+120)continue;
g.fillStyle="#8d86ac";g.fillRect(X-34,196,68,28);g.fillStyle="#a39dc0";g.fillRect(X-38,190,76,8);g.fillStyle="#7a7398";g.fillRect(X-34,212,68,2);
g.fillStyle="rgba(40,30,60,.35)";g.font="bold 9px "+FM;g.textAlign="center";const ls=LES.find(l=>l.x==s.lx);if(ls)g.fillText(ls.n,X,207);
g.drawImage(s.cv,X-s.kw/2,191-s.k*.86,s.kw,s.k)}
tsFog(150,226,.62,"226,222,240");
g.fillStyle="#fbf8ff";for(const f of FLK){if(f.z>1)continue;const x=((f.x+Math.sin(frame*.01+f.ph)*12-c*f.z)%W+W)%W,y=(f.y+frame*f.v*f.z*2)%224;g.globalAlpha=.75;g.fillRect(x,y,f.z>.45?2:1,f.z>.45?2:1)}g.globalAlpha=1}
/* gaps: broken road, pillars sinking into mist */
function tsGaps(){const gs=P.filter(q=>q.k=="g");for(let i=0;i<gs.length-1;i++){const a=gs[i].x+gs[i].w,b=gs[i+1].x;if(b<=a)continue;
const q=g.createLinearGradient(0,224,0,288);q.addColorStop(0,"#241c3a");q.addColorStop(.45,"#6e6890");q.addColorStop(1,"#d8d2ea");g.fillStyle=q;g.fillRect(a,224,b-a,64);
for(let x=a+18;x<b-10;x+=46){g.fillStyle="rgba(58,48,86,.55)";g.fillRect(x,244,7,44);g.fillStyle="rgba(58,48,86,.35)";g.fillRect(x-6,252,19,3)}
const fq=g.createLinearGradient(0,240,0,288);fq.addColorStop(0,"rgba(226,222,240,0)");fq.addColorStop(1,"rgba(226,222,240,.85)");g.fillStyle=fq;g.fillRect(a,240,b-a,48)}}
function tsGapEdges(){const gs=P.filter(q=>q.k=="g");for(let i=0;i<gs.length-1;i++){const a=gs[i].x+gs[i].w,b=gs[i+1].x;if(b<=a)continue;
for(const[x,d]of[[a,1],[b,-1]]){g.fillStyle="#2b2740";g.beginPath();g.moveTo(x,224);g.lineTo(x+d*5,228);g.lineTo(x+d*2,234);g.lineTo(x+d*6,241);g.lineTo(x+d*1,249);g.lineTo(x-d*2,262);g.lineTo(x-d*2,224);g.fill();
g.strokeStyle="#8a6a50";g.lineWidth=1.2;g.beginPath();g.moveTo(x,232);g.lineTo(x+d*9,229);g.moveTo(x,239);g.lineTo(x+d*7,245);g.stroke();
for(let k=0;k<4;k++)R(x-d*(4+k*6)-(d<0?0:3),224,3,3,k%2?"#1a1626":"#f2b81c")}}}
/* dotted "how to" paths: jumps, glide, swings (marching dashes) */
function tsGhost(){g.save();g.setLineDash([4,6]);g.lineDashOffset=-frame*.6;g.lineCap="round";g.lineWidth=2;g.strokeStyle="rgba(255,255,255,.7)";
const arc=(x0,y0,x1,y1,pk)=>{g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2,pk,x1,y1);g.stroke();const a=Math.atan2(y1-pk,x1-(x0+x1)/2);g.setLineDash([]);g.beginPath();g.moveTo(x1,y1);g.lineTo(x1-Math.cos(a-.5)*6,y1-Math.sin(a-.5)*6);g.moveTo(x1,y1);g.lineTo(x1-Math.cos(a+.5)*6,y1-Math.sin(a+.5)*6);g.stroke();g.setLineDash([4,6])};
arc(38.6*T,212,43*T,212,120);arc(50.6*T,212,57.2*T,212,100);arc(132.4*T,212,137.8*T,212,128);
g.beginPath();g.moveTo(67.2*T,22);g.bezierCurveTo(70*T,30,74*T,110,78.6*T,212);g.stroke();
for(const q of AN){g.beginPath();g.arc(q.x,q.y,92,.55,Math.PI-.55);g.stroke()}
g.restore()}
/* checkpoint flags */
function tsFlags(){for(const t of CK){const x=t*T+4,on=tCk>=t,h=on?40:22,wv=Math.sin(frame*.12+t)*2;
R(x,184,2,40,"#3a3348");R(x-1,182,4,3,"#c9c2dc");g.fillStyle=on?"#ffc928":"#8a84a8";g.beginPath();g.moveTo(x+2,224-h);g.quadraticCurveTo(x+9,224-h+2+wv,x+16,224-h+4+wv);g.lineTo(x+2,224-h+10);g.closePath();g.fill();g.strokeStyle="#2a2238";g.lineWidth=1;g.stroke()}}
/* lesson scrolls (vg, world space, crisp) */
function tsKey(v,s,x,y){v.save();v.font="900 9px "+FM;const w=Math.max(16,v.measureText(s).width+10);v.fillStyle="#1a1226";v.beginPath();srrV(v,x,y,w,16,3.5);v.fill();v.fillStyle="#f4efe4";v.beginPath();srrV(v,x+1.5,y+1,w-3,12,2.5);v.fill();v.fillStyle="#1a1226";v.textAlign="center";v.fillText(s,x+w/2,y+10.5);v.restore();return w}
function srrV(v,x,y,w,h,r){if(v.roundRect)v.roundRect(x,y,w,h,r);else v.rect(x,y,w,h)}
function tsMouse(v,x,y){v.fillStyle="#1a1226";v.beginPath();srrV(v,x,y,12,17,6);v.fill();v.fillStyle="#f4efe4";v.beginPath();srrV(v,x+1.5,y+1.5,9,14,4.5);v.fill();v.fillStyle="#ff4fd8";v.fillRect(x+1.5,y+1.5,4.2,6);v.fillStyle="#1a1226";v.fillRect(x+5.7,y+1.5,.8,6);v.fillRect(x+1.5,y+7.3,9,.8);return 12}
function tsBanners(c){const v=vg;LES.forEach((l,i)=>{const bx=l.x*T+(l.dx||0);if(bx<c-220||bx>c+W+20)return;const by=l.y||18,ds=l.d.split("|"),done=i<TS.i;
v.save();v.font="900 10px "+FM;let kw=0;if(l.k)for(const s of l.k)kw+=Math.max(16,v.measureText(s).width+10)+(kw?14:0);if(l.h)kw+=34;if(l.m)kw+=26;v.font="800 10px "+FM;
const tw=luW(l.n,20,900)*1.25,dw=Math.max(...ds.map(s=>v.measureText(s).width)),w=Math.max(112,tw,kw,dw)+22,h=46+(l.k?22:0)+ds.length*12;v.restore();
v.save();v.translate(bx+w/2,by);v.rotate(Math.sin(frame*.02+i*1.7)*.012);v.translate(-w/2,0);
v.strokeStyle="#2a2238";v.lineWidth=1.2;v.beginPath();v.moveTo(10,-by);v.lineTo(14,0);v.moveTo(w-10,-by);v.lineTo(w-14,0);v.stroke();
v.fillStyle="rgba(10,6,20,.28)";v.fillRect(4,5,w,h);v.fillStyle=INK;luInk(-2,-1,w+2,h+1,i*13+5,1.6);v.fillStyle="#efe6d0";luInk(1,2,w-1,h-2,i*13+9,1.2);
v.fillStyle="rgba(140,110,70,.10)";for(let k=0;k<5;k++)v.fillRect(4,8+k*(h-14)/4,w-8,1);
for(const yy of[-3,h-2]){v.fillStyle="#4a3424";v.beginPath();srrV(v,-6,yy,w+12,5,2.5);v.fill();v.fillStyle="#7a5a3a";v.fillRect(-4,yy+1,w+8,1)}
luIt("LESSON "+String(i+1).padStart(2,"0"),12,14,8,"#8a7a62","left",900);
v.save();v.translate(12,36);v.font="20px "+FB;v.lineJoin="round";v.lineWidth=4.5;v.strokeStyle="#1a1226";v.strokeText(l.n,0,0);v.fillStyle=l.c;v.fillText(l.n,0,0);v.restore();
let y=44;if(l.k){let x=12;l.k.forEach((s,j)=>{if(j){luIt("+",x+2,y+11,10,"#5a4a3a","left",900);x+=14}x+=tsKey(v,s,x,y)});if(l.m){luIt("/",x+4,y+11,10,"#5a4a3a","left",900);x+=12;x+=tsMouse(v,x,y-1)+2}if(l.h){luIt("HOLD",x+5,y+11,9,"#c0392b","left",900)}y+=22}
ds.forEach((s,j)=>luIt(s,12,y+8+j*12,10,"#2a2238","left",800));
if(done){v.save();v.translate(w-20,16);v.rotate(-.25);v.globalAlpha=.85;v.strokeStyle="#c0392b";v.lineWidth=2;v.beginPath();v.arc(0,0,11,0,7);v.stroke();v.lineWidth=1;v.beginPath();v.arc(0,0,8.5,0,7);v.stroke();v.lineWidth=2.4;v.lineCap="round";v.beginPath();v.moveTo(-5,0);v.lineTo(-1.5,4);v.lineTo(5,-4);v.stroke();v.restore()}
v.restore()})}
/* foreground: dark near-camera silhouettes + big flakes (after the duck) */
function tsFront(c){const v=vg;v.save();for(const f of FGS){const x=f.x-c*1.35;if(x<-80||x>W+80)continue;v.fillStyle="rgba(14,9,26,.94)";
if(f.t==0){v.beginPath();srrV(v,x,250,14,40,6);v.fill();v.fillRect(x-3,262,20,4)}
else if(f.t==1){v.fillRect(x,246,6,42);v.fillRect(x+56,246,6,42);v.fillRect(x-4,252,70,4);v.fillRect(x-4,266,70,4);for(let k=1;k<6;k++)v.fillRect(x+k*10,252,3,36)}
else{v.beginPath();v.moveTo(x-30,288);v.quadraticCurveTo(x-18,262+f.w*8,x,258);v.quadraticCurveTo(x+22,256,x+40,288);v.fill();v.fillRect(x-4,236,3,26);v.beginPath();v.arc(x-2.5,236,4,0,7);v.fill()}
v.fillStyle="rgba(160,150,200,.25)";v.fillRect(x,f.t==1?246:250,f.t==1?62:14,1)}
v.fillStyle="rgba(255,255,255,.75)";for(const f of FLK){if(f.z<=1)continue;const x=((f.x+Math.sin(frame*.012+f.ph)*18-c*f.z)%W+W)%W,y=(f.y+frame*f.v*2.4)%H;v.beginPath();v.arc(x,y,2.2,0,7);v.fill()}v.restore()}
/* lesson tracker HUD */
function tsTrack(){let idx=0;LES.forEach((l,i)=>{if(p.x/T>=l.x-1)idx=i});
if(idx!=TS.i){if(idx>TS.i&&TS.i>=0){TS.clr=70;sfx(880,.07,"triangle",.05,1320);sfx(1320,.09,"triangle",.04,1760,.07)}TS.i=idx;TS.pop=1}TS.pop*=.88;if(TS.clr>0)TS.clr--;
const v=vg,l=LES[idx],x1=W-8,x0=W-150,y0=8,n=LES.length;v.save();v.fillStyle=INK;luInk(x0,y0,x1,y0+38,77,2);
luIt("LESSON "+(idx+1)+" / "+n,x0+10,y0+12,8,MUT,"left",900);const k=1+TS.pop*.25;v.save();v.translate(x0+10,y0+27);v.scale(k,k);luIt(l.n,0,0,12,l.c,"left",900);v.restore();
for(let i=0;i<n;i++){const dx=x0+12+i*12.6,dy=y0+33;v.beginPath();v.arc(dx,dy,i==idx?3.4:2.6,0,7);if(i<idx){v.fillStyle=HL;v.fill()}else if(i==idx){v.fillStyle=Math.sin(frame*.15)>0?"#fff":HL;v.fill()}else{v.strokeStyle="#6a6088";v.lineWidth=1.2;v.stroke()}}
if(TS.clr>0){const a=Math.min(1,TS.clr/15),s=1+Math.max(0,(TS.clr-55)/15)*.8;v.globalAlpha=a;v.save();v.translate(W/2,64);v.scale(s,s);v.rotate(-.06);v.fillStyle=INK;luInk(-62,-16,62,10,91,2.4);luTi("LESSON CLEAR",0,0,16,HL,"center");v.restore();v.globalAlpha=1}
v.restore()}
