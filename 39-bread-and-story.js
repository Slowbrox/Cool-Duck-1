/* =====================================================================
   Bread + story
   1. The collectible stars are now loaves of bread: starIcon / starPath are redrawn as a loaf, so every
      HUD counter, hidden collectible, price tag, rating and book marker shows bread.
   2. Story after the tutorial street, on a black screen: a detailed animated picture on the LEFT, the
      narration on the RIGHT in a retro intro-letter style (chunky white letters pop in one by one with a
      blip, bouncing arrow when done). A / Enter / click continues, ESC / B skips.
        p1  Cool Duck chills on his couch next to his most valuable possession: a golden loaf of bread.
        p2  He goes outside with his friends and chills.
        p3  He comes home - the bread is gone, crumbs and footprints lead to the open window.
        p4  The thief runs over the rooftops with the bread - Cool Duck has to find him.
   ===================================================================== */
/* ---------------- bread loaf (replaces the star shape everywhere) ---------------- */
function breadPathL(c,r){c.moveTo(-r,.5*r);c.bezierCurveTo(-1.18*r,-.2*r,-.78*r,-.86*r,0,-.86*r);c.bezierCurveTo(.78*r,-.86*r,1.18*r,-.2*r,r,.5*r);c.quadraticCurveTo(0,.64*r,-r,.5*r);c.closePath()}
function starPath(c,x,y,r,ro){c.save();c.translate(x,y+r*.18);c.rotate((ro==null?-Math.PI/2:ro)+Math.PI/2);c.beginPath();breadPathL(c,r);c.restore()}
function starIcon(c,x,y,r,lit,rot=-Math.PI/2){c.save();c.translate(x,y+r*.18);c.rotate(rot+Math.PI/2);
c.beginPath();breadPathL(c,r+1.5);c.fillStyle="#2a1a00";c.fill();c.beginPath();breadPathL(c,r);
if(lit){const g0=c.createLinearGradient(0,-.86*r,0,.6*r);g0.addColorStop(0,"#ffdc90");g0.addColorStop(.45,"#eaa040");g0.addColorStop(1,"#a85a16");c.fillStyle=g0}else c.fillStyle="#4a3c5a";c.fill();
c.strokeStyle=lit?"rgba(120,58,8,.8)":"rgba(255,255,255,.12)";c.lineWidth=Math.max(.55,r*.13);c.lineCap="round";c.beginPath();for(const k of[-.45,0,.45]){c.moveTo(k*r-.16*r,-.62*r);c.lineTo(k*r+.12*r,-.3*r)}c.stroke();
if(lit){c.fillStyle="rgba(255,248,214,.75)";c.beginPath();c.ellipse(-.38*r,-.55*r,.28*r,.11*r,-.35,0,7);c.fill()}c.restore()}
/* ---------------- story state ---------------- */
let SY=null;
const SYP=[
"This is Cool Duck. Every evening he chills on his couch, right next to his most valuable possession: a perfect, golden loaf of bread.",
"One sunny afternoon he went outside with his friends. They skated, laughed and chilled until the streetlights came on.",
"But when Cool Duck came home... his bread was GONE. Only a trail of crumbs led to the open window.",
"Now Cool Duck has only one mission: find the thief who stole his bread."];
const SYF="900 14px "+FM,SYW=214,SYL=21,SYT=28,SYS=.75,SYCX=380;/* font, column width, line height, page-change frames, chars/frame, text column centre */
const PX=18,PY=60,PW=232,PH=164;/* picture frame on the left */
function storyStart(){S="story";SY={pg:0,t:0,ch:0,turn:0,out:0,end:0}}
function syEnd(){if(SY.out)return;SY.out=1;sfx(523,.3,"sine",.03);sfx(784,.4,"sine",.025,0,.08);trans(()=>wmOpen({at:1}))}
function syBlip(n){sfx(620+((n*53)%7)*28,.04,"triangle",.012,520+((n*31)%5)*20)}
function storyUpd(){const s=SY;if(!s||s.out)return;s.t++;
if(s.turn>0){s.turn++;if(s.turn==Math.floor(SYT/2)){s.pg++;s.ch=0;s.t=0}if(s.turn>=SYT)s.turn=0;return}
const txt=SYP[s.pg],full=txt.length,last=s.pg==SYP.length-1;
if(s.t>24&&s.ch<full){const a=Math.floor(s.ch);s.ch=Math.min(full,s.ch+(txt[a]=="."||txt[a]==","||txt[a]==":"?SYS*.25:SYS));const b=Math.floor(s.ch);if(b>a&&b%2==0&&txt[b-1]!=" ")syBlip(b)}
if(pr("Escape")){syEnd();return}
if(pr("Enter","Space","KeyE","ArrowRight","KeyD","Click")){if(s.ch<full){s.ch=full;return}if(!last){s.turn=1;sfx(880,.06,"sine",.02,660)}else syEnd()}}
/* ---------------- picture helpers ---------------- */
const syH=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
function syGlow(v,x,y,r,a,col){const q=v.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,"rgba("+(col||"255,220,140")+","+a+")");q.addColorStop(1,"rgba("+(col||"255,220,140")+",0)");v.fillStyle=q;v.beginPath();v.arc(x,y,r,0,7);v.fill()}
function syLin(v,x0,y0,x1,y1,stops){const q=v.createLinearGradient(x0,y0,x1,y1);stops.forEach((c,i)=>q.addColorStop(i/(stops.length-1),c));return q}
/* draw a duck in someone else's outfit (friends), then put Cool Duck's outfit back */
function syFit(fit,f){const sv=fit?Object.assign({},CS):null;if(fit)Object.assign(CS,fit);f();if(sv){Object.assign(CS,sv);applyCol()}}
function syDuck(v,x,gy,sc,o,fit){syFit(fit,()=>{DT=v;duckDraw(x,gy,sc,o);DT=g})}
/* screen position (+ depth) of a point on the 3D duck: "lw"/"rw" = wing tips, or a model-space [x,y,z] */
function syProj(o,cx,gy,sc,pt){const Rr=mm(rZ(o.tilt||0),mm(rX(.1),rY(o.yaw)));let q;
if(pt=="lw"){q=mv3(o.lwm||rZ(0),[0,-.95,0]);q=[q[0]-1,q[1]+1.35,q[2]]}else if(pt=="rw"){q=mv3(o.rwm||rZ(0),[0,-.95,0]);q=[q[0]+1,q[1]+1.35,q[2]];if(o.rwo)q=[q[0]+o.rwo[0],q[1]+o.rwo[1],q[2]+o.rwo[2]]}else q=pt;
q=mv3(Rr,[q[0],q[1]-1.2,q[2]]);const px=DN/2+q[0]*22,py=DN*.86-(q[1]+1.2)*22,k=DN*.56*sc,w=k*(o.sx||1),h=k*(o.sy||1);return[cx-w/2+px*w/DN,gy-.86*h+py*h/DN,q[2]]}
/* a little TV remote held in the wing */
function syRemote(v,x,y,t){v.save();v.translate(x,y);v.rotate(-.5);v.fillStyle="rgba(0,0,0,.25)";vrr(-2.2,-5.4,5.6,12.4,2);v.fill();v.fillStyle=syLin(v,-3,0,3,0,["#3a3844","#18161e"]);vrr(-2.8,-6.2,5.6,12.4,2);v.fill();v.strokeStyle="#08080c";v.lineWidth=.6;v.stroke();
v.fillStyle="#ff4848";v.beginPath();v.arc(0,-4,1,0,7);v.fill();v.fillStyle="#9a9aa8";for(let r=0;r<3;r++)for(let c=0;c<2;c++)v.fillRect(-1.7+c*2.3,-1.4+r*2.1,1.2,1.2);v.fillStyle="rgba(255,255,255,.25)";v.fillRect(-2.2,-5.6,1,10.6);
if(Math.sin(t*.09)>.85){syGlow(v,0,-7.5,4,.7,"255,90,90")}v.restore()}
/* the thief: the very same duck shape as Cool Duck, as a dark silhouette (beanie, scarf trailing like a cape),
   glowing eyes, running with the stolen loaf held in its wing */
const THC=document.createElement("canvas");THC.width=THC.height=100;const THX=THC.getContext("2d"),THR=document.createElement("canvas");THR.width=THR.height=100;const THRX=THR.getContext("2d");
function syThiefDuck(v,x,y,t,air,vy){const sc=1.15,o={yaw:1.12,ev:1,an:air?0:t*.45,rq:air?0:1,air:air?1:0,vy:air?vy:0,v:3,id:0,tilt:-.05,wd:.25,fl:.5,sid:"thief",nst:1,lwm:mm(rX(-.8),rZ(-.35))};
THX.clearRect(0,0,100,100);syFit({col:5,hat:5,jk:8,sc:2},()=>{DT=THX;duckDraw(50,90,sc,o);DT=g});
/* pure black shadow - no colours, no outline, no eyes */
THX.globalCompositeOperation="source-atop";THX.fillStyle="#000";THX.fillRect(0,0,100,100);THX.globalCompositeOperation="source-over";
v.drawImage(THC,x-50,y-90);
const[bx,by]=syProj(o,x,y,sc,"lw");syGlow(v,bx,by,12,.6);starIcon(v,bx,by,4.4,1,-Math.PI/2+.2)}
function syBoard(v,x,gy,sc,bd,rot){v.save();v.translate(x,gy-4);v.rotate(rot||0);v.scale(sc,sc);boardPaint(v,BRD[bd]||BRD[0],frame*.12);v.restore();return gy-(4+3.62*sc-.4)}
function syShadow(v,x,y,rx,a){v.fillStyle="rgba(10,6,20,"+(a||.3)+")";v.beginPath();v.ellipse(x,y,rx,rx*.24,0,0,7);v.fill()}
function sySpark(v,x,y,s){if(s<=.2)return;v.beginPath();v.moveTo(x,y-s);v.quadraticCurveTo(x,y,x+s,y);v.quadraticCurveTo(x,y,x,y+s);v.quadraticCurveTo(x,y,x-s,y);v.quadraticCurveTo(x,y,x,y-s);v.fill()}
function syCloud(v,x,y,s,top,bot){v.fillStyle=bot;for(const[dx,dy,r]of[[0,2,7],[10,-2,9],[21,1,7],[12,4,8]]){v.beginPath();v.arc(x+dx*s,y+dy*s+1.5,r*s,0,7);v.fill()}v.fillStyle=top;for(const[dx,dy,r]of[[0,2,7],[10,-2,9],[21,1,7],[12,4,8]]){v.beginPath();v.arc(x+dx*s,y+dy*s,r*s,0,7);v.fill()}v.fillRect(x,y+1*s,21*s,9*s)}
/* glass dome over the bread (or knocked over and empty) */
function syDome(v,x,y,tip){v.save();v.translate(x,y);if(tip)v.rotate(tip);const P_=()=>{v.beginPath();v.moveTo(-12,0);v.lineTo(-12,-15);v.bezierCurveTo(-12,-30,12,-30,12,-15);v.lineTo(12,0)};
P_();v.fillStyle="rgba(190,220,255,.13)";v.fill();v.strokeStyle="rgba(225,242,255,.8)";v.lineWidth=1;v.stroke();
v.strokeStyle="rgba(255,255,255,.75)";v.lineWidth=1.6;v.lineCap="round";v.beginPath();v.moveTo(-8,-4);v.lineTo(-8,-15);v.quadraticCurveTo(-8,-22,-3,-24);v.stroke();v.lineWidth=.8;v.beginPath();v.moveTo(7,-19);v.quadraticCurveTo(9,-16,9,-12);v.stroke();
v.fillStyle="#e0b04a";v.beginPath();v.arc(0,-27,1.8,0,7);v.fill();v.fillStyle="rgba(225,242,255,.5)";v.fillRect(-12.5,-.8,25,1.4);v.restore()}
/* ---------------- 1 + 3: the living room (cosy evening / moonlit and robbed) ---------------- */
function syRoom(v,t,N){const w=PW,h=PH,fy=120;
/* wall + wallpaper + picture rail */
v.fillStyle=syLin(v,0,0,0,fy,N?["#1c1a34","#2a2546"]:["#f2c48c","#e2a068"]);v.fillRect(0,0,w,fy);
v.fillStyle=N?"rgba(255,255,255,.025)":"rgba(255,255,255,.075)";for(let x=4;x<w;x+=14)v.fillRect(x,14,6,fy-14);
v.fillStyle=N?"#2c2848":"#c8885a";v.fillRect(0,13,w,2.5);v.fillStyle=N?"rgba(255,255,255,.05)":"rgba(255,255,255,.25)";v.fillRect(0,13,w,.8);
/* window above the couch: night city, moon */
const wx=82,wy=22,ww=56,wh=44;v.fillStyle=syLin(v,0,wy,0,wy+wh,["#141a48","#3a2a68"]);v.fillRect(wx,wy,ww,wh);
v.fillStyle="#fff";for(let i=0;i<9;i++)v.fillRect(wx+2+syH(i)*52,wy+2+syH(i+9)*20,1,1);syGlow(v,wx+40,wy+12,14,.35,"255,240,200");v.fillStyle="#fff3c4";v.beginPath();v.arc(wx+40,wy+12,5,0,7);v.fill();
v.fillStyle="#18133a";for(let i=0;i<7;i++){const bh=8+syH(i+20)*16;v.fillRect(wx+i*8,wy+wh-bh,7.5,bh)}v.fillStyle="#ffd36a";for(let i=0;i<10;i++)if(Math.sin(t*.02+i*2.3)>-.5)v.fillRect(wx+2+syH(i+30)*52,wy+wh-3-syH(i+40)*12,1.2,1.2);
if(N){v.fillStyle="rgba(170,200,255,.18)";v.beginPath();v.moveTo(wx+ww/2,wy);v.lineTo(wx+ww/2+13,wy+4);v.lineTo(wx+ww/2+13,wy+wh+2);v.lineTo(wx+ww/2,wy+wh);v.closePath();v.fill();v.strokeStyle="#4a3424";v.lineWidth=2;v.stroke()}
v.strokeStyle=N?"#3a2a22":"#7a4a2c";v.lineWidth=3;v.strokeRect(wx,wy,ww,wh);v.lineWidth=2;v.beginPath();if(!N){v.moveTo(wx+ww/2,wy);v.lineTo(wx+ww/2,wy+wh)}v.moveTo(wx,wy+wh/2);v.lineTo(N?wx+ww/2:wx+ww,wy+wh/2);v.stroke();
v.fillStyle=N?"#3a2a22":"#8a5634";v.fillRect(wx-5,wy+wh+1,ww+10,3.5);v.fillStyle=N?"rgba(255,255,255,.06)":"rgba(255,255,255,.3)";v.fillRect(wx-5,wy+wh+1,ww+10,.8);
/* curtains (blowing in at night) */
for(const sd of[-1,1]){const bx=sd<0?wx-3:wx+ww+3,bl=N?(Math.sin(t*.07+sd*1.3)*.5+.5)*12:0,c1=N?"#5a2034":"#c0404c",c2=N?"#3e1626":"#8e2a36";
v.fillStyle=syLin(v,bx-8,0,bx+8,0,[c2,c1,c2]);v.beginPath();v.moveTo(bx-sd*1,wy-6);v.lineTo(bx+sd*9,wy-6);v.quadraticCurveTo(bx+sd*6,wy+wh*.55,bx+sd*8-sd*bl*.3,wy+wh+16);v.lineTo(bx-sd*(3+bl),wy+wh+16);v.quadraticCurveTo(bx-sd*(1+bl*.6),wy+wh*.5,bx-sd*1,wy-6);v.closePath();v.fill();
v.strokeStyle="rgba(0,0,0,.18)";v.lineWidth=.7;for(const o of[2.5,5.5]){v.beginPath();v.moveTo(bx+sd*o,wy-5);v.quadraticCurveTo(bx+sd*(o-1),wy+wh*.5,bx+sd*(o-1)-sd*bl*.5,wy+wh+15);v.stroke()}}
v.fillStyle=N?"#3a2a22":"#6a4028";v.fillRect(wx-14,wy-8,ww+28,2.5);
/* framed bread picture above the side table */
v.fillStyle="#3a2416";v.fillRect(190,26,28,24);v.fillStyle=N?"#4a4458":"#fff3dc";v.fillRect(192.5,28.5,23,19);starIcon(v,204,38,6,!N);v.fillStyle="rgba(255,255,255,.18)";v.fillRect(192.5,28.5,23,3);
/* floor: planks, baseboard, rug */
v.fillStyle=syLin(v,0,fy,0,h,N?["#33261f","#1a120e"]:["#b07648","#6e4226"]);v.fillRect(0,fy,w,h-fy);
v.fillStyle="rgba(0,0,0,.16)";for(let y=fy+5,s=5;y<h;s*=1.22,y+=s){v.fillRect(0,y,w,.8);for(let k=0;k<4;k++)v.fillRect(((y*7+k*61)%w),y,.8,s)}
v.fillStyle=N?"#2e2a40":"#efe2cc";v.fillRect(0,fy-4,w,4);v.fillStyle="rgba(0,0,0,.15)";v.fillRect(0,fy,w,1.5);
v.fillStyle=N?"#2a2038":"#7e3458";v.beginPath();v.ellipse(110,147,88,13,0,0,7);v.fill();v.strokeStyle=N?"#3e3050":"#e8b84a";v.lineWidth=1.4;v.beginPath();v.ellipse(110,147,80,10.5,0,0,7);v.stroke();
v.setLineDash([2,3]);v.lineWidth=1;v.beginPath();v.ellipse(110,147,66,8,0,0,7);v.stroke();v.setLineDash([]);
/* floor lamp (left) */
v.fillStyle="#2a1c14";v.beginPath();v.ellipse(22,131,8,2.2,0,0,7);v.fill();v.fillRect(21,46,2.4,85);
v.fillStyle=N?"#3e3646":syLin(v,0,34,0,50,["#fff0cc","#f2cc88"]);v.beginPath();v.moveTo(10,50);v.lineTo(34,50);v.lineTo(29,33);v.lineTo(15,33);v.closePath();v.fill();v.fillStyle="rgba(0,0,0,.12)";v.fillRect(10,48,24,2);
if(!N){syGlow(v,22,46,80,.3,"255,214,150");v.fillStyle="rgba(255,226,170,.13)";v.beginPath();v.moveTo(11,50);v.lineTo(33,50);v.lineTo(58,131);v.lineTo(-14,131);v.closePath();v.fill()}
/* moonbeam through the open window */
if(N){v.fillStyle="rgba(175,205,255,.09)";v.beginPath();v.moveTo(wx+4,wy+wh);v.lineTo(wx+ww+4,wy+wh);v.lineTo(186,h);v.lineTo(64,h);v.closePath();v.fill();
v.fillStyle="rgba(220,235,255,.5)";for(let i=0;i<8;i++){const u=((t*.15+i*37)%100)/100;v.fillRect(wx+10+syH(i+70)*50+u*20,wy+wh+u*90,.8,.8)}}
/* ---- couch ---- */
const L=42,Rr=176;syShadow(v,109,138,72,.32);
v.fillStyle=syLin(v,0,66,0,112,N?["#4e2232","#341622"]:["#cc4450","#9c2c38"]);vrr(L+6,66,Rr-L-12,48,14);v.fill();
v.fillStyle=N?"rgba(255,255,255,.05)":"rgba(255,255,255,.14)";vrr(L+12,68,Rr-L-24,4,2);v.fill();
for(const by of[80,94])for(const bx of[70,96,122,148]){v.strokeStyle="rgba(0,0,0,.12)";v.lineWidth=.7;v.beginPath();v.moveTo(bx-5,by-4);v.lineTo(bx,by);v.lineTo(bx+5,by-4);v.moveTo(bx-5,by+4);v.lineTo(bx,by);v.lineTo(bx+5,by+4);v.stroke();v.fillStyle="rgba(0,0,0,.28)";v.beginPath();v.arc(bx,by,1.2,0,7);v.fill()}
v.fillStyle=N?"#43202e":"#b0343e";vrr(L+8,106,Rr-L-16,10,4);v.fill();v.fillStyle=N?"rgba(255,255,255,.04)":"rgba(255,255,255,.12)";vrr(L+12,107,Rr-L-24,2.5,1.2);v.fill();
/* popcorn on the seat (couch scene) / thief's footprints on the cushions (robbed scene) */
if(!N){v.fillStyle="#f6f0e4";v.beginPath();v.moveTo(134,104);v.lineTo(152,104);v.lineTo(149,113);v.lineTo(137,113);v.closePath();v.fill();v.fillStyle="#e8403a";v.fillRect(137,106,3,7);v.fillRect(143,106,3,7);v.fillStyle="#fffbe8";for(let i=0;i<7;i++){v.beginPath();v.arc(136+i*2.4,103-(i%2)*1.3,1.7,0,7);v.fill()}}
else{v.fillStyle="rgba(20,12,10,.55)";for(const[x,y,r]of[[86,108,.2],[110,109,-.2],[134,108,.15],[150,84,.3],[132,74,-.2]]){v.save();v.translate(x,y);v.rotate(r);v.beginPath();v.ellipse(0,0,3.2,1.8,0,0,7);v.fill();v.beginPath();v.ellipse(-4,0,1.4,1.2,0,0,7);v.fill();v.restore()}}
v.fillStyle=syLin(v,0,113,0,133,N?["#4a2232","#2c121c"]:["#bc3540","#842630"]);vrr(L+6,113,Rr-L-12,20,7);v.fill();
v.fillStyle=N?"rgba(255,255,255,.05)":"rgba(255,255,255,.16)";vrr(L+10,114,Rr-L-20,2,1);v.fill();v.strokeStyle="rgba(0,0,0,.18)";v.lineWidth=.8;v.beginPath();v.moveTo(109,115);v.lineTo(109,131);v.stroke();
/* Cool Duck sits ON the seat: body on the cushion, legs forward, feet over the front edge, TV remote in his wing */
if(!N){const sc=1.3,u=12.32*sc,gy=108+.08*u+Math.sin(t*.05)*.3,o={sit:1,yaw:.32,ev:1,an:0,id:1,hp:-.1,fl:.2,wd:.32,sid:"syp1",lwm:mm(rX(-1.25),rZ(.45))};syDuck(v,100,gy,sc,o);const[rx,ry]=syProj(o,100,gy,sc,"lw");syRemote(v,rx,ry,t)}
for(const[ax,d]of[[L-8,1],[Rr-14,-1]]){v.fillStyle=syLin(v,ax,0,ax+22,0,N?(d>0?["#5a2838","#341622"]:["#341622","#5a2838"]):(d>0?["#d6505a","#922a36"]:["#922a36","#d6505a"]));vrr(ax,90,22,44,9);v.fill();
v.fillStyle=N?"rgba(255,255,255,.05)":"rgba(255,255,255,.18)";v.beginPath();v.ellipse(ax+11,93,8,2.4,0,0,7);v.fill()}
v.fillStyle="#3a2014";for(const lx of[L-4,Rr+2]){v.beginPath();v.moveTo(lx,133);v.lineTo(lx+5,133);v.lineTo(lx+4,139);v.lineTo(lx+1,139);v.closePath();v.fill()}
/* throw pillow + knitted blanket over the arm */
v.save();v.translate(L+20,100);v.rotate(-.22);v.fillStyle=N?"#5a5032":syLin(v,0,-9,0,9,["#ffd75a","#e8a820"]);vrr(-10,-9,20,18,6);v.fill();v.strokeStyle="rgba(0,0,0,.15)";v.lineWidth=.7;v.beginPath();v.moveTo(-6,-5);v.quadraticCurveTo(0,0,6,-5);v.moveTo(-6,5);v.quadraticCurveTo(0,0,6,5);v.stroke();v.fillStyle="rgba(0,0,0,.25)";v.beginPath();v.arc(0,0,1.3,0,7);v.fill();v.restore();
v.fillStyle=N?"#3a4458":"#f0e2c4";v.beginPath();v.moveTo(Rr-16,90);v.quadraticCurveTo(Rr-3,86,Rr+9,91);v.lineTo(Rr+8,126);v.quadraticCurveTo(Rr+2,129,Rr-3,125);v.lineTo(Rr-4,100);v.quadraticCurveTo(Rr-10,96,Rr-16,98);v.closePath();v.fill();
v.fillStyle=N?"#2a3448":"#d89a3a";for(const yy of[103,111,119])v.fillRect(Rr-3,yy,11,2);v.fillStyle=N?"#3a4458":"#f0e2c4";for(let k=0;k<4;k++)v.fillRect(Rr-2+k*2.8,126,1,3);
/* side table, velvet cushion, the bread under its dome (or knocked over and gone) */
const tx=204;v.fillStyle="#5a3622";vrr(tx-16,100,32,5,2);v.fill();v.fillStyle="rgba(255,255,255,.12)";v.fillRect(tx-15,100,30,1);v.fillStyle="#4a2c1a";v.fillRect(tx-13,105,3,28);v.fillRect(tx+10,105,3,28);v.fillRect(tx-13,121,26,2.5);
v.fillStyle="#d9a441";v.fillRect(tx-5,106.5,10,3.5);v.fillStyle="#6a4410";v.fillRect(tx-3,107.8,6,.9);
v.fillStyle=N?"#3a2450":"#6a3a8e";v.beginPath();v.ellipse(tx,98.5,11,3.4,0,0,7);v.fill();v.strokeStyle="#d9a441";v.lineWidth=.8;v.beginPath();v.ellipse(tx,98.5,11,3.4,0,0,Math.PI);v.stroke();
if(!N){v.fillStyle="rgba(255,236,190,.09)";v.beginPath();v.moveTo(tx-6,0);v.lineTo(tx+6,0);v.lineTo(tx+20,100);v.lineTo(tx-20,100);v.closePath();v.fill();
syGlow(v,tx,88,28,.6);starIcon(v,tx,90,8.5,1);syDome(v,tx,99);v.fillStyle="#fff6d0";for(let k=0;k<4;k++){const a=t*.045+k*1.57,s=Math.max(0,Math.sin(t*.09+k*1.7))*2.6;sySpark(v,tx+Math.cos(a)*18,84+Math.sin(a)*11,s)}}
else{v.fillStyle="rgba(0,0,0,.3)";v.beginPath();v.ellipse(tx-2,97.6,7,1.6,0,0,7);v.fill();syShadow(v,tx-6,151,14,.3);syDome(v,tx-20,150,1.45);v.strokeStyle="rgba(225,242,255,.65)";v.lineWidth=.7;v.beginPath();v.moveTo(tx-6,140);v.lineTo(tx-3,144);v.lineTo(tx-5,148);v.moveTo(tx-3,144);v.lineTo(tx+1,145);v.stroke();
/* crumb trail: cushion -> couch arm -> along the couch back -> window sill */
v.fillStyle="#e6b468";for(const[x,y,r]of[[tx-6,96,1.1],[tx-13,99,.9],[Rr+4,92,1],[Rr-6,88,.9],[164,70,1],[156,68,.8],[148,67,1],[140,66,.9],[134,67,1]]){v.beginPath();v.arc(x,y,r,0,7);v.fill()}
/* Cool Duck: back home, shocked - shades down, eyes wide, wings flung up, trembling */
const tr=Math.sin(t*1.3)*.7;syShadow(v,108+tr,156,17,.35);syDuck(v,108+tr,156,1.34,{yaw:.08,ev:1,an:0,id:0,eyes:1,gz:1,brw:1,hp:-.16,fl:1.55+Math.sin(t*.6)*.08,wd:.32,sid:"syp3"});
v.fillStyle="#8ad8ff";for(const[dx,ph]of[[-15,0],[15,7]]){const u=((t*.5+ph)%14)/14,x=108+dx,y=110+u*8;v.globalAlpha=1-u*.6;v.beginPath();v.moveTo(x,y-3.4);v.quadraticCurveTo(x+2.2,y,x,y+1.6);v.quadraticCurveTo(x-2.2,y,x,y-3.4);v.fill()}v.globalAlpha=1;
const bx=166,by=40,pop=1+Math.max(0,Math.sin(t*.14))*.06;v.save();v.translate(bx,by);v.scale(pop,pop);v.rotate(.08);v.fillStyle="#fff";v.strokeStyle="#140a10";v.lineWidth=1.5;v.lineJoin="round";v.beginPath();for(let k=0;k<18;k++){const a=k/18*6.283,r=k%2?10:14;v.lineTo(Math.cos(a)*r*1.35,Math.sin(a)*r)}v.closePath();v.fill();v.stroke();
v.font="15px "+FB;v.textAlign="center";v.lineWidth=3;v.strokeStyle="#140a10";v.strokeText("?!",0,6);v.fillStyle="#ff3a4a";v.fillText("?!",0,6);v.textAlign="left";v.restore();
v.fillStyle="rgba(40,60,140,.16)";v.fillRect(0,0,w,h)}
/* warm evening light + the flicker of the TV he's watching (just out of frame, towards us) */
if(!N){v.fillStyle="rgba(255,160,80,.06)";v.fillRect(0,0,w,h);const fl=.1+.05*Math.sin(t*.7)*Math.sin(t*.23+1),tv=v.createRadialGradient(108,h+30,10,108,h+30,130);tv.addColorStop(0,"rgba(150,190,255,"+fl+")");tv.addColorStop(1,"rgba(150,190,255,0)");v.fillStyle=tv;v.fillRect(0,0,w,h)}}
/* ---------------- 2: chilling with friends ---------------- */
function syFriends(v,t){const w=PW,h=PH,wt=58,wb=118,gy=136;
v.fillStyle=syLin(v,0,0,0,wt,["#62b6ff","#a8dcff","#ffe6b6"]);v.fillRect(0,0,w,wt);
syGlow(v,200,20,54,.75,"255,240,190");v.fillStyle="#fffbe6";v.beginPath();v.arc(200,20,9,0,7);v.fill();
syCloud(v,((t*.12)%(w+60))-40,14,.8,"#fff","#d6e8f8");syCloud(v,((t*.08+140)%(w+60))-40,30,.6,"#fff","#d6e8f8");
v.strokeStyle="#3a3048";v.lineWidth=.9;v.lineCap="round";for(let i=0;i<3;i++){const bx=((t*.45+i*34)%(w+40))-20,by=22+i*6+Math.sin(t*.1+i)*1.5,fl=Math.sin(t*.45+i*2)*1.8;v.beginPath();v.moveTo(bx-3,by-fl);v.quadraticCurveTo(bx-1.5,by-.8,bx,by);v.quadraticCurveTo(bx+1.5,by-.8,bx+3,by-fl);v.stroke()}
v.fillStyle="#b4cde8";for(let i=0;i<9;i++){const bh=10+syH(i+70)*18;v.fillRect(i*26+4,wt-bh,22,bh)}
for(const[px,ph,pl]of[[26,58,5],[176,48,-3],[214,62,-5]])srPalm(v,px,wt+6,ph,pl,"#2d6650");
/* graffiti wall */
v.fillStyle=syLin(v,0,wt,0,wb,["#ead4b8","#d6bc9e"]);v.fillRect(0,wt,w,wb-wt);v.fillStyle="#c4a888";v.fillRect(0,wt,w,4);v.fillStyle="rgba(255,255,255,.35)";v.fillRect(0,wt,w,1);
v.fillStyle="rgba(120,80,50,.09)";for(let y=wt+4;y<wb;y+=7)for(let x=((y-wt)/7%2)*9-9;x<w;x+=18)v.fillRect(x,y,17,6);
v.save();v.translate(64,80);v.rotate(-.05);v.font="22px "+FB;v.textAlign="center";v.lineJoin="round";
v.fillStyle="#1a1226";v.fillText("CHILL",2,3);v.lineWidth=6;v.strokeStyle="#1a1226";v.strokeText("CHILL",0,0);v.fillStyle=syLin(v,0,-20,0,0,["#ff8ae0","#ff4fd8","#ffb612"]);v.fillText("CHILL",0,0);
v.fillStyle="rgba(255,255,255,.7)";v.fillRect(-34,-15,10,1.5);v.fillStyle="#ff4fd8";for(const[dx,l]of[[-22,3.5],[-6,5],[14,3],[28,4]]){v.fillRect(dx,1,1.6,l);v.beginPath();v.arc(dx+.8,1+l,1.2,0,7);v.fill()}v.restore();
v.fillStyle="#ffd24a";sySpark(v,18,66,4);sySpark(v,112,72,3);v.fillStyle="#2fd8c8";v.beginPath();v.arc(160,74,7,0,7);v.fill();v.strokeStyle="#1a1226";v.lineWidth=1.2;v.stroke();v.fillStyle="#1a1226";v.fillRect(157,71.5,1.8,2.4);v.fillRect(161.4,71.5,1.8,2.4);v.lineWidth=1;v.beginPath();v.arc(160,74.5,3.4,.3,2.8);v.stroke();
v.fillStyle="rgba(0,0,0,.12)";v.fillRect(0,wb-3,w,3);
/* sidewalk, curb, street */
v.fillStyle=syLin(v,0,wb,0,gy+6,["#cfc5d0","#b2a8b6"]);v.fillRect(0,wb,w,gy+6-wb);v.fillStyle="rgba(0,0,0,.1)";for(let x=12;x<w;x+=30)v.fillRect(x,wb,1,gy+6-wb);
v.fillStyle="#efe8f2";v.fillRect(0,gy+6,w,2.5);v.fillStyle="#8a8296";v.fillRect(0,gy+8.5,w,1.5);v.fillStyle=syLin(v,0,gy+10,0,h,["#45404e","#2e2a36"]);v.fillRect(0,gy+10,w,h-gy-10);v.fillStyle="#ffd24a";for(let x=6;x<w;x+=28)v.fillRect(x,gy+19,15,1.8);
/* fire hydrant */
v.fillStyle="#d8323c";vrr(219,118,8,15,2);v.fill();v.fillRect(216,123,14,3);v.beginPath();v.arc(223,118,4,Math.PI,0);v.fill();v.fillStyle="rgba(255,255,255,.3)";v.fillRect(220,120,1.5,12);
/* boombox between the crew, speakers pumping, notes floating */
const bt=Math.abs(Math.sin(t*.16)),bx=80,by=gy;syShadow(v,bx,by+1,14,.25);v.fillStyle=syLin(v,0,by-13,0,by,["#3a3a46","#1a1a22"]);vrr(bx-13,by-13,26,13,2.5);v.fill();v.strokeStyle="#a0a0ac";v.lineWidth=1.2;v.beginPath();v.moveTo(bx-8,by-13);v.quadraticCurveTo(bx,by-20,bx+8,by-13);v.stroke();
for(const sx of[-7,7]){v.fillStyle="#0e0e14";v.beginPath();v.arc(bx+sx,by-6,4.6,0,7);v.fill();v.fillStyle="#6a6a78";v.beginPath();v.arc(bx+sx,by-6,2+bt*1.3,0,7);v.fill()}v.fillStyle="#cdbfa6";v.fillRect(bx-2.5,by-10,5,3);
v.fillStyle="#2a2238";for(let k=0;k<3;k++){const u=((t*.7+k*26)%78)/78;v.globalAlpha=Math.min(1,(1-u)*1.5);const nx=bx-5+k*5+Math.sin(u*7+k)*3,ny=by-18-u*36;v.beginPath();v.ellipse(nx,ny,2.2,1.6,-.4,0,7);v.fill();v.fillRect(nx+1.5,ny-7,1,7)}v.globalAlpha=1;
/* the crew */
const b1=Math.abs(Math.sin(t*.16));syShadow(v,42,gy+1,15);syShadow(v,186,gy+1,15);
syDuck(v,42,gy-b1*2,1.12,{yaw:.7,ev:1,an:0,id:1,hp:-.32+b1*.1,fl:.5+b1*.3,wd:.3,sid:"sypf1",nst:1,tilt:Math.sin(t*.08)*.05},{col:3,hat:5,jk:5,sc:1});
syDuck(v,186,gy,1.12,{yaw:-.7,ev:1,an:0,id:1,hp:-.14,fl:.35,wd:.3,sid:"sypf2",nst:1,rwm:mm(rY(.4),mm(rX(-2.3-Math.sin(t*.2)*.45),rZ(.3))),rwo:[0,.2,.3]},{col:4,hat:7,jk:6,sc:4});
const ph=(t%96)/96,q=ph<.45?Math.sin(ph/.45*Math.PI):0,lift=q*15,rot=-q*.3;syShadow(v,128,gy+1,15-lift*.4,.3-lift*.01);
if(lift>3){v.strokeStyle="rgba(255,255,255,.75)";v.lineWidth=1;for(let k=0;k<3;k++){const y=gy-8-k*6-lift*.5;v.beginPath();v.moveTo(108-k*3,y);v.lineTo(98-k*3,y);v.stroke()}}
const dy=syBoard(v,128,gy+1-lift,1.12,CS.bd|0,rot);syDuck(v,128,dy,1.12,{yaw:.95,ev:1,sb:1,an:0,air:lift>3?1:0,vy:lift>3?(ph<.22?-2:2):0,hp:-.15,tilt:rot*.5,wd:.3,sid:"syp2"});
/* warm afternoon light */
v.fillStyle=syLin(v,w,0,0,h,["rgba(255,190,100,.16)","rgba(255,190,100,0)"]);v.fillRect(0,0,w,h)}
/* ---------------- 4: the thief over the rooftops ---------------- */
const SYR=[[34,98,112],[112,162,102],[178,246,108]];/* rooftops: x0, x1, top y */
function syRoofY(x){for(const[a,b,y]of SYR)if(x>=a&&x<=b)return y;return null}
function syChase(v,t){const w=PW,h=PH;v.fillStyle=syLin(v,0,0,0,h,["#05071c","#141538","#2c1f50"]);v.fillRect(0,0,w,h);
for(let i=0;i<46;i++){const tw=Math.sin(t*.05+i*1.9);if(tw>-.3){v.globalAlpha=.35+.65*tw*.5+.15;v.fillStyle="#fff";const s=tw>.85?1.6:1;v.fillRect(syH(i+80)*w,syH(i+90)*70,s,s)}}v.globalAlpha=1;
const mx=140,my=56,mr=25;syGlow(v,mx,my,74,.32,"255,240,200");v.fillStyle=syLin(v,mx-mr,my-mr,mx+mr,my+mr,["#fffbe0","#f2e2b0"]);v.beginPath();v.arc(mx,my,mr,0,7);v.fill();
v.fillStyle="rgba(200,180,130,.45)";for(const[dx,dy,r]of[[-9,-7,5],[8,5,4],[-3,11,2.8],[11,-10,2.4],[-14,6,2]]){v.beginPath();v.arc(mx+dx,my+dy,r,0,7);v.fill()}
v.fillStyle="rgba(120,100,60,.18)";v.beginPath();v.arc(mx+6,my+4,mr,0,7);v.arc(mx,my,mr,0,7,true);v.fill();
for(let i=0;i<2;i++){const cx=((i*140+t*.2)%(w+90))-50,cy=40+i*22;syCloud(v,cx,cy,.9,"rgba(52,44,96,.92)","rgba(30,24,60,.9)")}
/* two layers of skyline */
v.fillStyle="#1b1a3e";for(let i=0;i<13;i++){const bh=30+syH(i+100)*36,bx=i*19-6;v.fillRect(bx,118-bh,17,bh+10);for(let k=0;k<6;k++)if(syH(i*7+k)>.5){v.fillStyle=Math.sin(t*.02+i+k)>-.8?"#ffcf6a":"#2e2a58";v.fillRect(bx+3+(k%2)*7,124-bh+5+Math.floor(k/2)*8,2.5,3.5);v.fillStyle="#1b1a3e"}}
v.fillStyle=syLin(v,0,86,0,118,["rgba(160,90,200,0)","rgba(160,90,200,.22)"]);v.fillRect(0,86,w,32);
v.fillStyle="#ff4fd8";if(Math.sin(t*.5)>-.85){syGlow(v,178,78,14,.4,"255,79,216");v.fillRect(172,76,12,2.5)}
/* near rooftops with parapets, a water tower, AC units, an antenna with a blinking light, a chimney */
for(const[a,b,y]of SYR){v.fillStyle="#0d0b1e";v.fillRect(a,y,b-a,h-y);v.fillStyle="#2c2850";v.fillRect(a-1,y,b-a+2,2.2);v.fillStyle="#07060f";v.fillRect(a,y+2.2,b-a,2);
v.fillStyle="#161430";for(let yy=y+10;yy<h;yy+=12)for(let xx=a+5;xx<b-6;xx+=12)if(syH(xx*.3+yy)>.55){v.fillStyle=syH(xx+yy*.7)>.4?"#ffcf6a":"#161430";v.fillRect(xx,yy,4,5);v.fillStyle="#161430"}}
v.fillStyle="#0d0b1e";v.fillRect(203,84,2,24);v.fillRect(221,84,2,24);v.fillRect(203,95,20,1.5);v.fillStyle=syLin(v,198,0,228,0,["#1a1734","#0d0b1e"]);vrr(198,64,30,22,3);v.fill();v.fillStyle="#2c2850";v.fillRect(198,70,30,1);v.fillRect(198,78,30,1);v.fillStyle="#0d0b1e";v.beginPath();v.moveTo(196,65);v.lineTo(213,55);v.lineTo(230,65);v.closePath();v.fill();
v.fillStyle="#141230";vrr(124,93,14,9,1.5);v.fill();vrr(141,95,10,7,1.5);v.fill();v.fillStyle="#2c2850";v.fillRect(126,96,10,.8);v.fillRect(126,98.5,10,.8);
v.fillStyle="#0d0b1e";v.fillRect(150,78,1.6,24);v.fillRect(145,84,11,1.2);v.fillRect(147,80,7,1);if(Math.sin(t*.12)>0){syGlow(v,150.8,77,6,.8,"255,60,60");v.fillStyle="#ff4040";v.fillRect(150,76,1.6,1.6)}
v.fillStyle="#141230";v.fillRect(88,100,8,12);for(let k=0;k<4;k++){const u=((t*.35+k*22)%88)/88;v.globalAlpha=(1-u)*.3;v.fillStyle="#a8a4c8";v.beginPath();v.arc(92+u*10,98-u*28,2+u*5,0,7);v.fill()}v.globalAlpha=1;
/* the thief: runs across the roofs left -> right, leaps the gaps, drops crumbs */
const per=210,u=(t%per)/per,x=48+u*(w+10-48),ry=syRoofY(x);let y=ry,air=ry==null,jv=0;
if(air){for(const[a,b,y0,y1]of[[98,112,112,102],[162,178,102,108]])if(x>=a&&x<=b){const q=(x-a)/(b-a);y=y0+(y1-y0)*q-Math.sin(q*Math.PI)*14;jv=q<.5?-2.5:2.5}if(y==null)y=110}
for(let k=1;k<7;k++){const ox=x-k*8,base=syRoofY(ox),fall=Math.min(base!=null?base-(y-12):30,k*4);v.globalAlpha=1-k/7;v.fillStyle="#e6b468";v.beginPath();v.arc(ox,y-12+fall,1,0,7);v.fill()}v.globalAlpha=1;
if(!air){v.fillStyle="rgba(0,0,0,.4)";v.beginPath();v.ellipse(x,y,9,1.6,0,0,7);v.fill()}
v.strokeStyle="rgba(255,255,255,.18)";v.lineWidth=1;for(let k=0;k<3;k++){v.beginPath();v.moveTo(x-16-k*3,y-30+k*8);v.lineTo(x-32-k*3,y-30+k*8);v.stroke()}
syThiefDuck(v,x,y,t,air,jv);
/* Cool Duck on the nearest ledge, scarf in the wind, watching */
v.fillStyle=syLin(v,0,142,0,h,["#191632","#0a0918"]);v.fillRect(0,142,104,h-142);v.fillStyle="#3a3560";v.fillRect(0,142,104,2);v.fillStyle="rgba(255,255,255,.05)";for(let x2=4;x2<104;x2+=11)v.fillRect(x2,147,9,4);
syGlow(v,40,120,40,.12,"160,140,255");syDuck(v,40,143,1.28,{yaw:.95,ev:1,an:0,id:1,hp:.04,tilt:-.04,fl:.45,wd:.35,sid:"syp4"});
const pk=1+Math.max(0,Math.sin(t*.18))*.08;v.save();v.translate(50,90);v.scale(pk,pk);v.font="16px "+FB;v.textAlign="center";v.lineJoin="round";v.lineWidth=4;v.strokeStyle="#140a10";v.strokeText("!",0,0);v.fillStyle="#ffd24a";v.fillText("!",0,0);v.restore();v.textAlign="left";
v.fillStyle="rgba(60,40,140,.12)";v.fillRect(0,0,w,h)}
const SYPICS=[(v,t)=>syRoom(v,t,0),syFriends,(v,t)=>syRoom(v,t,1),syChase];
/* picture frame on the left: soft drop shadow, white rounded border, gentle settle-in */
function syPic(v,pg,t,a){const k=ciEo(t/24);if(a<=0||k<=0)return;v.save();v.globalAlpha=a*k;v.translate(PX+PW/2,PY+PH/2+(1-k)*6);const s=.95+.05*k;v.scale(s,s);v.translate(-PW/2,-PH/2);
v.fillStyle="rgba(255,255,255,.05)";vrr(-6,-6,PW+12,PH+12,12);v.fill();
v.save();vrr(0,0,PW,PH,8);v.clip();SYPICS[pg](v,t);const vg2=v.createRadialGradient(PW/2,PH/2,PH*.35,PW/2,PH/2,PW*.75);vg2.addColorStop(0,"rgba(0,0,0,0)");vg2.addColorStop(1,"rgba(0,0,0,.35)");v.fillStyle=vg2;v.fillRect(0,0,PW,PH);v.restore();
v.strokeStyle="rgba(255,255,255,.9)";v.lineWidth=2;vrr(0,0,PW,PH,8);v.stroke();v.restore()}
/* ---------------- the screen: picture left, text right ---------------- */
function syWrap(v,s,w){const L=[];let line="";for(const wd of s.split(" ")){const ts=line?line+" "+wd:wd;if(v.measureText(ts).width>w&&line){L.push(line);line=wd}else line=ts}if(line)L.push(line);return L}
function storyDraw(){const v=vg,s=SY;v.save();v.setTransform(1,0,0,1,0,0);v.globalAlpha=1;v.fillStyle="#000";v.fillRect(0,0,W,H);if(!s){v.restore();return}
const txt=SYP[s.pg],last=s.pg==SYP.length-1,fade=s.turn>0&&s.turn<SYT/2?1-s.turn/(SYT/2):s.turn>0?0:1;
syPic(v,s.pg,s.t,fade);
v.font=SYF;v.textBaseline="alphabetic";v.textAlign="left";const L=syWrap(v,txt,SYW),blk=L.length*SYL,y0=Math.round(PY+PH/2-blk/2+14);let i0=0;
L.forEach((ln,li)=>{const lw=v.measureText(ln).width;let x=Math.round(SYCX-lw/2);const y=y0+li*SYL;
for(let ci=0;ci<ln.length;ci++){const ch=ln[ci],gi=i0+ci,age=s.ch-gi,cw=v.measureText(ch).width;
if(age>0&&ch!=" "){const k=luC(age/3),sc=1+(1-k)*.55,cx=x+cw/2;v.save();v.globalAlpha=fade*k;v.translate(cx,y-5);v.scale(sc,sc);
v.fillStyle="rgba(40,40,60,.9)";v.fillText(ch,-cw/2+1.5,6.7);v.fillStyle="#fff";v.fillText(ch,-cw/2,5);v.restore()}x+=cw}
i0+=ln.length+1});
const done=s.ch>=txt.length;
if(done&&!s.turn){const ax=SYCX+SYW/2-4,ay=y0+blk+2+Math.abs(Math.sin(s.t*.12))*-3;v.globalAlpha=.6+.4*Math.sin(s.t*.15);
v.fillStyle="rgba(40,40,60,.9)";v.beginPath();v.moveTo(ax-5+1.5,ay-4+1.5);v.lineTo(ax+5+1.5,ay-4+1.5);v.lineTo(ax+1.5,ay+3+1.5);v.closePath();v.fill();v.fillStyle="#fff";v.beginPath();v.moveTo(ax-5,ay-4);v.lineTo(ax+5,ay-4);v.lineTo(ax,ay+3);v.closePath();v.fill()}
v.globalAlpha=.35;v.font="700 7px "+FM;v.fillStyle="#fff";v.textAlign="right";v.fillText((GPL?"B":"ESC")+"  skip",W-10,H-10);
v.globalAlpha=.3;v.textAlign="left";for(let i=0;i<SYP.length;i++){v.fillStyle=i==s.pg?"#fff":"rgba(255,255,255,.35)";v.beginPath();v.arc(PX+PW/2-12+i*8,PY+PH+16,i==s.pg?2.2:1.6,0,7);v.fill()}v.restore()}
