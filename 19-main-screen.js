/* =====================================================================
   Main screen / room
   Wall, standing duck, clickable door / duck / wardrobe, boot + title screens, hit-testing.
   ===================================================================== */
/* ---- main screen: wall, standing duck, clickable door / duck / wardrobe ---- */
Object.assign(DM,{ew:eb(.2,.23,.09,[250,250,250],8,6),pp:eb(.08,.1,.06,[24,24,30],6,4),ebr:eb(.28,.05,.07,[24,24,30],6,4)});
function EYQ(o){const r=o.brw||0,px=o.pup||0;return[[DM.ew,-.32,2.06,.93,"h"],[DM.ew,.32,2.06,.93,"h"],[DM.pp,-.32+px,2.05,1.0,"h"],[DM.pp,.32+px,2.05,1.0,"h"],[DM.ebr,-.32,2.34+r*.05,.9,"h"],[DM.ebr,.32,2.34+r*.13,.9,"h"]]}
const CV=document.getElementById("c"),ez=t=>t<=0?0:t>=1?1:t*t*(3-2*t),lkE=(t,a,b)=>ez((t-a)/(b-a));
const RM={cab:{x:338,y:124,w:128,h:138},door:{x:22,y:104,w:68,h:158},dk:{x:262,gy:262,sc:2.5}};
const CABX=344,CABW=116,ROWS=[[130,34],[167,46],[216,34]];
const cellR=(r,c)=>{const cw=CABW/5;return[CABX+c*cw,ROWS[r][0],cw,ROWS[r][1]]};
let MX=-1,MY=-1;
const cpos=e=>{const r=CV.getBoundingClientRect();return[(e.clientX-r.left)*W/(r.width||W),(e.clientY-r.top)*H/(r.height||H)]};
CV.addEventListener("pointermove",e=>{const q=cpos(e);MX=q[0];MY=q[1]});
CV.addEventListener("pointerleave",()=>{MX=MY=-1});
CV.addEventListener("pointerdown",e=>{const q=cpos(e);MX=q[0];MY=q[1];if(S=="lobby")lobbyClick(q[0],q[1],e.button)});
function rcam(){const e=ez(lb.zp),z=1+e;return{e,z,X:x=>(x-338)*z+338+(18-338)*e,Y:y=>(y-124)*z+124+(6-124)*e}}
const inR=(x,y,r)=>x>=r[0]&&x<r[0]+r[2]&&y>=r[1]&&y<r[1]+r[3];
const bx=(x,y,w,h,c)=>{R(x-1,y-1,w+2,h+2,"#2a2238");R(x,y,w,h,c)};
/* ---- smooth shop drawing helpers ---- */
const SOL="#2a2238",scs=(c,k=1)=>"rgb("+c.map(v=>Math.max(0,Math.min(255,v*k|0)))+")";
const srr=(x,y,w,h,r)=>{if(g.roundRect)g.roundRect(x,y,w,h,r);else g.rect(x,y,w,h)};
function sgv(x,y0,y1,c){const q=g.createLinearGradient(x,y0,x,y1);q.addColorStop(0,scs(c,1.18));q.addColorStop(1,scs(c,.8));return q}
function sgh(x0,x1,c){const q=g.createLinearGradient(x0,0,x1,0);q.addColorStop(0,scs(c,1.15));q.addColorStop(.45,scs(c,1.02));q.addColorStop(1,scs(c,.74));return q}
function ssh(p,fill,lw){g.beginPath();p();g.fillStyle=fill;g.fill();g.lineWidth=lw||1.1;g.lineJoin="round";g.lineCap="round";g.strokeStyle=SOL;g.stroke()}
function sln(p,col,lw){g.beginPath();p();g.strokeStyle=col;g.lineWidth=lw||1;g.lineJoin="round";g.lineCap="round";g.stroke()}
function sblob(cs_,fill){g.fillStyle=SOL;for(const[x,y,r]of cs_){g.beginPath();g.arc(x,y,r+1.1,0,7);g.fill()}g.fillStyle=fill;for(const[x,y,r]of cs_){g.beginPath();g.arc(x,y,r,0,7);g.fill()}}
function hatI(i,cx,by){
if(i==0){const c=[205,40,60];
ssh(()=>{g.moveTo(cx-8,by-2);g.bezierCurveTo(cx-8.5,by-15,cx+8.5,by-15,cx+8,by-2);g.quadraticCurveTo(cx,by,cx-8,by-2)},sgv(cx,by-13,by,c));
sln(()=>{g.moveTo(cx,by-11.5);g.quadraticCurveTo(cx-1.2,by-6,cx-.6,by-1.4)},scs(c,.62),.8);
sln(()=>{g.moveTo(cx-4.5,by-9);g.quadraticCurveTo(cx-3.5,by-11,cx-1.5,by-11.5)},"rgba(255,255,255,.45)",1.2);
ssh(()=>{g.moveTo(cx+1.5,by-2.6);g.quadraticCurveTo(cx+9,by-4.5,cx+12,by-1.2);g.quadraticCurveTo(cx+7,by+1.2,cx+1.5,by-.6)},scs(c,.72),1);
ssh(()=>g.arc(cx,by-11.8,1.5,0,7),scs(c,.75),.8)}
else if(i==1){const k=[38,38,48];
ssh(()=>g.ellipse(cx,by-2,11,2.8,0,0,7),sgv(cx,by-5,by,k));
ssh(()=>{g.moveTo(cx-6,by-3);g.lineTo(cx-6.8,by-20);g.quadraticCurveTo(cx,by-22.5,cx+6.8,by-20);g.lineTo(cx+6,by-3);g.quadraticCurveTo(cx,by-1.2,cx-6,by-3)},sgh(cx-7,cx+7,k));
ssh(()=>{g.moveTo(cx-6.2,by-6.5);g.quadraticCurveTo(cx,by-4.6,cx+6.2,by-6.5);g.lineTo(cx+6.4,by-10);g.quadraticCurveTo(cx,by-8.1,cx-6.4,by-10);g.closePath()},scs([195,32,52]),.8);
sln(()=>{g.moveTo(cx-3.6,by-18.5);g.lineTo(cx-3.3,by-11.5)},"rgba(255,255,255,.22)",1.5)}
else if(i==2){sblob([[cx-5,by-12.5,5],[cx+5,by-12.5,5],[cx,by-16.5,6],[cx,by-11.5,5]],sgv(cx,by-23,by-7,[236,236,240]));
sln(()=>{g.moveTo(cx-2.5,by-9);g.quadraticCurveTo(cx-3,by-13,cx-1.5,by-16)},"#c6c6d0",.8);sln(()=>{g.moveTo(cx+2.5,by-9);g.quadraticCurveTo(cx+3,by-13,cx+1.5,by-16)},"#c6c6d0",.8);
ssh(()=>srr(cx-6.5,by-9,13,7.5,2.5),sgv(cx,by-9,by-1,[232,232,238]),1);
sln(()=>{g.moveTo(cx-4,by-5.2);g.lineTo(cx+4,by-5.2)},"#d0d0da",.8)}
else if(i==3){const P=()=>{g.moveTo(cx-8,by-2);g.quadraticCurveTo(cx-3,by-12,cx,by-22);g.quadraticCurveTo(cx+3,by-12,cx+8,by-2);g.quadraticCurveTo(cx,by+1.5,cx-8,by-2)};
ssh(P,sgh(cx-8,cx+8,[240,70,160]));g.save();g.beginPath();P();g.clip();g.fillStyle="#fad23c";
for(const[x,y]of[[-3,-5],[3,-8],[-1,-13],[1.5,-3],[5,-3.5]]){g.beginPath();g.arc(cx+x,by+y,1.3,0,7);g.fill()}
g.restore();sln(P,SOL,1.1);sblob([[cx,by-23,2.8]],"#fad23c")}
else if(i==5){const c=[230,110,40];ssh(()=>{g.moveTo(cx-8,by-4);g.bezierCurveTo(cx-8.5,by-19,cx+8.5,by-19,cx+8,by-4);g.closePath()},sgv(cx,by-17,by-4,c));
for(let x=-5;x<=5;x+=2.5)sln(()=>{g.moveTo(cx+x*.9,by-6);g.quadraticCurveTo(cx+x*.8,by-11,cx+x*.4,by-14)},scs(c,.78),.6);
ssh(()=>srr(cx-8.8,by-6.5,17.6,5.5,2.2),scs(c,.78),1);for(let x=-6;x<=6;x+=2)sln(()=>{g.moveTo(cx+x,by-5.6);g.lineTo(cx+x,by-1.8)},scs(c,.58),.6);
sblob([[cx,by-17,3.3]],"#f6f6f6");sln(()=>{g.moveTo(cx-1.5,by-18);g.lineTo(cx-.5,by-18.6)},"#d0d0da",.7)}
else if(i==6){const c=[165,165,178];for(const s of[-1,1])ssh(()=>{g.moveTo(cx+s*6.4,by-8.5);g.quadraticCurveTo(cx+s*12.5,by-10,cx+s*11.6,by-20);g.quadraticCurveTo(cx+s*10,by-13.5,cx+s*6.8,by-12.8);g.closePath()},"#f0e6c8",.9);
ssh(()=>{g.moveTo(cx-7.5,by-3);g.bezierCurveTo(cx-7.5,by-17,cx+7.5,by-17,cx+7.5,by-3);g.closePath()},sgh(cx-8,cx+8,c));
ssh(()=>srr(cx-8.2,by-5.4,16.4,3.6,1.5),"#7a5028",.9);for(const x of[-5,0,5])ssh(()=>g.arc(cx+x,by-3.6,.8,0,7),"#ffd24a",.5);ssh(()=>srr(cx-1,by-14,2,9,1),"#8a8a98",.7)}
else if(i==7){const c=[160,100,52];ssh(()=>{g.moveTo(cx-6,by-3.2);g.lineTo(cx-6.6,by-13);g.quadraticCurveTo(cx-3,by-16.5,cx,by-13.5);g.quadraticCurveTo(cx+3,by-16.5,cx+6.6,by-13);g.lineTo(cx+6,by-3.2);g.closePath()},sgh(cx-7,cx+7,c));
ssh(()=>srr(cx-6.3,by-6.8,12.6,2.8,1),"#3c2414",.7);
ssh(()=>{g.moveTo(cx-12.5,by-6.5);g.quadraticCurveTo(cx-11,by-1,cx,by-1);g.quadraticCurveTo(cx+11,by-1,cx+12.5,by-6.5);g.quadraticCurveTo(cx+8,by-3.6,cx,by-3.6);g.quadraticCurveTo(cx-8,by-3.6,cx-12.5,by-6.5);g.closePath()},scs(c,.85),1)}
else if(i==8){const bo=Math.sin(frame*.08)*1.3,hy=by-11+bo;g.save();g.globalAlpha=.28;g.fillStyle="#fff2a0";g.beginPath();g.ellipse(cx,hy,11,4.6,0,0,7);g.fill();g.restore();
sln(()=>g.ellipse(cx,hy,8,2.8,0,0,7),SOL,4);sln(()=>g.ellipse(cx,hy,8,2.8,0,0,7),"#ffd84a",2.4);sln(()=>g.ellipse(cx,hy,8,2.8,0,Math.PI*1.1,Math.PI*1.7),"#fffbe0",.9);
g.fillStyle="#fff6c0";for(let k=0;k<3;k++){const a=frame*.05+k*2.1;g.fillRect(cx+Math.cos(a)*10-.6,hy-5+Math.sin(a*1.3)*3-.6,1.2,1.2)}}
else if(i==9){const c=[96,56,190];ssh(()=>{g.moveTo(cx-7,by-3);g.quadraticCurveTo(cx-3,by-14,cx+1,by-19.5);g.quadraticCurveTo(cx+6,by-23.5,cx+10,by-19.5);g.quadraticCurveTo(cx+5,by-18.5,cx+3.5,by-14);g.quadraticCurveTo(cx+4,by-8,cx+7,by-3);g.quadraticCurveTo(cx,by-1.5,cx-7,by-3)},sgh(cx-7,cx+8,c));
ssh(()=>g.ellipse(cx,by-2.4,11,2.6,0,0,7),scs(c,.8),1);ssh(()=>{g.moveTo(cx-6.6,by-4.2);g.quadraticCurveTo(cx,by-2.8,cx+6.6,by-4.2);g.lineTo(cx+6.2,by-6.6);g.quadraticCurveTo(cx,by-5.2,cx-6.2,by-6.6);g.closePath()},"#ffc83c",.7);
g.fillStyle="#ffe27a";for(const[x,y]of[[-2.5,-10],[2,-14],[1,-8.5]]){g.fillRect(cx+x-.4,by+y-1.4,.8,2.8);g.fillRect(cx+x-1.4,by+y-.4,2.8,.8)}ssh(()=>g.arc(cx+10,by-19.5,1.4,0,7),"#ffe27a",.6)}
else{const c=[255,200,60],P=()=>{g.moveTo(cx-9,by-2);g.lineTo(cx-9.5,by-13.5);g.quadraticCurveTo(cx-6.5,by-8,cx-4.5,by-8.5);g.lineTo(cx,by-15.5);g.lineTo(cx+4.5,by-8.5);g.quadraticCurveTo(cx+6.5,by-8,cx+9.5,by-13.5);g.lineTo(cx+9,by-2);g.quadraticCurveTo(cx,by,cx-9,by-2)};
ssh(P,sgv(cx,by-16,by,c));
ssh(()=>{g.moveTo(cx-9,by-2);g.quadraticCurveTo(cx,by,cx+9,by-2);g.lineTo(cx+9.1,by-5.5);g.quadraticCurveTo(cx,by-3.5,cx-9.1,by-5.5);g.closePath()},scs([215,150,30]),.8);
for(const[x,y]of[[-9.5,-14],[0,-16],[9.5,-14]])ssh(()=>g.arc(cx+x,by+y,1.7,0,7),"#fff2b0",.8);
ssh(()=>g.arc(cx,by-4.6,1.5,0,7),"#e8303c",.7);for(const s of[-1,1])ssh(()=>g.arc(cx+s*5.5,by-4.4,1.2,0,7),"#3a7be0",.7)}}
function jackI(i,cx,y0){const c=JKC[i],tr=JKT[i];
sln(()=>{g.moveTo(cx,y0+5);g.lineTo(cx,y0+3.2);g.arc(cx+1.8,y0+3,1.8,Math.PI,Math.PI*2.25)},"#9a9aa4",1.2);
sln(()=>{g.moveTo(cx-10,y0+9.5);g.quadraticCurveTo(cx-5,y0+5.5,cx,y0+5);g.quadraticCurveTo(cx+5,y0+5.5,cx+10,y0+9.5)},"#9a9aa4",1.2);
for(const s of[-1,1]){ssh(()=>{g.moveTo(cx+s*7,y0+7.5);g.quadraticCurveTo(cx+s*11.5,y0+8.5,cx+s*11.8,y0+14);g.lineTo(cx+s*11.2,y0+27);g.quadraticCurveTo(cx+s*9.5,y0+28.6,cx+s*7.8,y0+27);g.lineTo(cx+s*7.6,y0+15)},scs(c,s<0?1.06:.82));
sln(()=>{g.moveTo(cx+s*11.3,y0+24.8);g.quadraticCurveTo(cx+s*9.5,y0+26.2,cx+s*7.7,y0+24.8)},scs(c,.6),.9)}
const B=()=>{g.moveTo(cx-3.5,y0+6);g.quadraticCurveTo(cx-8,y0+6.5,cx-8.5,y0+11);g.lineTo(cx-8.2,y0+30);g.quadraticCurveTo(cx,y0+32.6,cx+8.2,y0+30);g.lineTo(cx+8.5,y0+11);g.quadraticCurveTo(cx+8,y0+6.5,cx+3.5,y0+6);g.quadraticCurveTo(cx,y0+9.5,cx-3.5,y0+6)};
ssh(B,sgh(cx-9,cx+9,c));g.save();g.beginPath();B();g.clip();g.fillStyle=scs(tr[0]);g.beginPath();g.moveTo(cx-9,y0+28.2);g.quadraticCurveTo(cx,y0+30.8,cx+9,y0+28.2);g.lineTo(cx+9,y0+34);g.lineTo(cx-9,y0+34);g.fill();g.restore();sln(B,SOL,1.1);
for(const s of[-1,1]){ssh(()=>{g.moveTo(cx+s*3.5,y0+6);g.quadraticCurveTo(cx+s*6,y0+10,cx+s*4.2,y0+15);g.lineTo(cx+s*.7,y0+11.2);g.quadraticCurveTo(cx+s*1.6,y0+8.4,cx+s*3.5,y0+6)},scs(c,.72),.8);
sln(()=>{g.moveTo(cx+s*2.5,y0+21);g.quadraticCurveTo(cx+s*4.8,y0+22.3,cx+s*7,y0+21)},scs(c,.58),.8)}
sln(()=>{g.moveTo(cx,y0+11.5);g.lineTo(cx,y0+28.5)},scs(tr[1]),.9);for(const yy of[13,18,23])ssh(()=>g.arc(cx+1.8,y0+yy,.75,0,7),scs(tr[2]),.4)}
function scarfI(i,cx,y0){const a=SCC[i][0],b=SCC[i][1],P=SCC[i][2],of=SCC[i][3]?(frame>>3):0;
const T2=()=>{g.moveTo(cx+1,y0+8);g.quadraticCurveTo(cx+5,y0+13,cx+6.8,y0+19.5);g.lineTo(cx+2.2,y0+21);g.quadraticCurveTo(cx+1,y0+14,cx-2,y0+9)},T1=()=>{g.moveTo(cx-1,y0+8);g.quadraticCurveTo(cx-5.5,y0+15,cx-5,y0+23);g.lineTo(cx+.6,y0+23);g.quadraticCurveTo(cx+.4,y0+15,cx+2.5,y0+8.5)};
const pat=(T,k0)=>{g.save();g.beginPath();T();g.clip();for(let k=0,y=y0+7;y<y0+25;k++,y+=2.6){g.fillStyle=scs(P[(k+k0+of)%P.length]);g.fillRect(cx-10,y,20,2.7)}g.restore();sln(T,SOL,1)};
ssh(T2,scs(b),1);if(P)pat(T2,1);else sln(()=>{g.moveTo(cx+1.9,y0+16.3);g.lineTo(cx+5.4,y0+15.2)},"#f6efe2",1.1);
for(let k=0;k<3;k++)sln(()=>{g.moveTo(cx+2.8+k*1.5,y0+20.8-k*.4);g.lineTo(cx+3.1+k*1.6,y0+23-k*.4)},scs(b),.8);
ssh(T1,sgh(cx-6,cx+3,a),1);if(P)pat(T1,0);else sln(()=>{g.moveTo(cx-5.3,y0+18.6);g.quadraticCurveTo(cx-2.3,y0+19.4,cx+.5,y0+18.6)},"#f6efe2",1.2);
for(let k=0;k<4;k++)sln(()=>{g.moveTo(cx-4.4+k*1.6,y0+23.6);g.lineTo(cx-4.6+k*1.7,y0+25.8)},scs(a,.85),.8);
ssh(()=>srr(cx-9.5,y0+3,19,6.5,3.2),sgv(cx,y0+3,y0+9.5,a),1);
sln(()=>{g.moveTo(cx-7.5,y0+6.3);g.quadraticCurveTo(cx,y0+7.6,cx+7.5,y0+6.3)},scs(a,.72),.7);
ssh(()=>g.ellipse(cx,y0+8.6,2.7,2.3,0,0,7),scs(a,.86),.9)}
/* ---- wardrobe: solid wood carcass, velvet display back with spot lamps, hanging rail, open glass doors ---- */
function cabDraw(){const c=RM.cab,dp=ez(lb.mc/22),wf=(x,y,w,h,r,col)=>{g.beginPath();srr(x,y,w,h,r);g.fillStyle=col;g.fill()};
g.fillStyle="rgba(10,6,20,.22)";g.beginPath();srr(c.x+5,c.y-1,c.w+3,c.h-5,6);g.fill();
const wd0=g.createLinearGradient(c.x,0,c.x+c.w,0);wd0.addColorStop(0,"#8f5e35");wd0.addColorStop(.5,"#7a4e2a");wd0.addColorStop(1,"#5c3a1e");
g.fillStyle=wd0;g.beginPath();srr(c.x,c.y,c.w,c.h-6,3);g.fill();
/* boutique display: pleated wine velvet backing, a little brass spot lamp + warm light pool behind every item */
g.fillStyle="#4a2234";g.fillRect(CABX,130,CABW,120);
for(let i=0;i<16;i++){const px=CABX+i*CABW/16,pq=g.createLinearGradient(px,0,px+CABW/16,0);pq.addColorStop(0,"rgba(0,0,0,.14)");pq.addColorStop(.5,"rgba(255,190,210,.06)");pq.addColorStop(1,"rgba(0,0,0,.14)");g.fillStyle=pq;g.fillRect(px,130,CABW/16,120)}
for(let r=0;r<3;r++)for(let k=0;k<5;k++){const[x,y,w,h]=cellR(r,k),cx=x+w/2,ly=y+h*.5,lp=g.createRadialGradient(cx,ly,1,cx,ly,Math.max(w,h)*.62);
lp.addColorStop(0,"rgba(255,226,170,.5)");lp.addColorStop(.55,"rgba(255,196,140,.16)");lp.addColorStop(1,"rgba(255,196,140,0)");g.fillStyle=lp;g.fillRect(x,y,w,h);
g.fillStyle="rgba(255,236,190,.1)";g.beginPath();g.moveTo(cx-2,y+1.5);g.lineTo(cx+2,y+1.5);g.lineTo(cx+w*.42,y+h);g.lineTo(cx-w*.42,y+h);g.fill();
g.fillStyle="#d9a441";g.beginPath();srr(cx-2.2,y,4.4,2,[0,0,1.2,1.2]);g.fill();g.fillStyle="#fff6d0";g.fillRect(cx-1.2,y+1.6,2.4,.7)}
const ao=(x0,y0,x1,y1,a)=>{const q=g.createLinearGradient(x0,y0,x1,y1);q.addColorStop(0,"rgba(20,6,12,"+a+")");q.addColorStop(1,"rgba(20,6,12,0)");return q};
g.fillStyle=ao(0,130,0,138,.35);g.fillRect(CABX,130,CABW,8);g.fillStyle=ao(CABX,0,CABX+6,0,.3);g.fillRect(CABX,130,6,120);g.fillStyle=ao(CABX+CABW,0,CABX+CABW-6,0,.3);g.fillRect(CABX+CABW-6,130,6,120);
for(const y of[167,216]){g.fillStyle=ao(0,y,0,y+5,.3);g.fillRect(CABX,y,CABW,5)}
g.fillStyle="rgba(40,26,14,.6)";g.fillRect(CABX+1,173,CABW-2,1.2);g.fillStyle="#d4d8e0";g.fillRect(CABX+1,171.4,CABW-2,1.6);g.fillStyle="#fff";g.fillRect(CABX+1,171.4,CABW-2,.5);
for(const bx2 of[CABX+1,CABX+CABW-4])wf(bx2,169.5,3,5,1,"#9a9ea8");
{const pg=S=="lobby"?lb.pg||0:0,pt=S=="lobby"?lb.pgT||0:0;g.save();g.beginPath();g.rect(CABX,130,CABW,120);g.clip();g.translate((pt/10)*(lb.pgD||1)*22,0);g.globalAlpha=1-pt/12;
/* items drawn at 76% around their hang/sit point so neighbours get breathing room */
const sk=(px,py,f)=>{g.save();g.translate(px,py);g.scale(.76,.76);g.translate(-px,-py);f();g.restore()};
for(let r=0;r<3;r++)for(let k=0;k<5;k++){const[x,y,w,h]=cellR(r,k),cx=x+w/2,s_=slot(pg,r,k),i=s_.c;if(s_.r==0)sk(cx,y+h-10,()=>hatI(i,cx,y+h-10));else if(s_.r==1)sk(cx,y+5,()=>jackI(i,cx,y+4));else if(s_.r==2)sk(cx,y+3,()=>scarfI(i,cx,y));else if(s_.r==3)sk(cx,y+h/2-3,()=>colI(i,cx,y+h/2-3));else sk(cx,y+h/2-1,()=>boardI(i,cx,y+h/2-1));
/* exclusivity: items you don't own yet twinkle now and then (pricier ones more often) */
const K_=K3[s_.r];if(OWN[K_]&&!OWN[K_].includes(i)){const pr_=CAT[s_.r][2][i],hs=(s_.r*13+i*7.31)%1,ex=s_.r==4||pr_>=50,ph=(frame*(ex?.013:.008)+hs)%1;
if(ph<.16){const a=Math.sin(ph/.16*Math.PI),sx_=cx+(hs-.5)*w*.5,sy_=y+h*(.22+hs*.3),sr=(ex?3.4:2.4)*a;g.fillStyle="rgba(255,248,214,"+a+")";g.beginPath();g.moveTo(sx_,sy_-sr);g.quadraticCurveTo(sx_,sy_,sx_+sr,sy_);g.quadraticCurveTo(sx_,sy_,sx_,sy_+sr);g.quadraticCurveTo(sx_,sy_,sx_-sr,sy_);g.quadraticCurveTo(sx_,sy_,sx_,sy_-sr);g.fill()}}}g.restore()}
for(const y of[163.5,212.5]){g.fillStyle="#5e3a20";g.fillRect(CABX-1,y,CABW+2,3.6);g.fillStyle="#e8c26a";g.fillRect(CABX-1,y,CABW+2,1);g.fillStyle="#fff2c0";g.fillRect(CABX-1,y,CABW+2,.35);g.fillStyle="rgba(20,8,2,.6)";g.fillRect(CABX-1,y+3.2,CABW+2,.7)}
const stile=(x,w)=>{const q=g.createLinearGradient(x,0,x+w,0);q.addColorStop(0,"#9a6a3e");q.addColorStop(1,"#74482a");g.fillStyle=q;g.fillRect(x,c.y+3,w,c.h-9);g.strokeStyle="rgba(50,26,10,.3)";g.lineWidth=.5;for(let i=1;i<3;i++){g.beginPath();g.moveTo(x+w*i/3,c.y+4);g.bezierCurveTo(x+w*i/3+.8,c.y+50,x+w*i/3-.8,c.y+90,x+w*i/3,c.y+c.h-7);g.stroke()}};
stile(c.x,6);stile(c.x+c.w-6,6);
wf(c.x,250,c.w,6.5,[0,0,2,2],"#6e4626");g.fillStyle="#a8743f";g.fillRect(c.x+1,250,c.w-2,1);
ssh(()=>srr(c.x-4,c.y-5,c.w+8,7.5,[3.5,3.5,1,1]),"#94643a",1.1);g.fillStyle="#c08a52";g.fillRect(c.x-2,c.y-4,c.w+4,1.2);g.fillStyle="#6a4424";g.fillRect(c.x,c.y+2.5,c.w,3.5);g.fillStyle="rgba(0,0,0,.3)";g.fillRect(c.x,c.y+5.5,c.w,1);
g.strokeStyle="rgba(50,26,10,.35)";g.lineWidth=.5;g.beginPath();g.moveTo(c.x,c.y-1.5);g.bezierCurveTo(c.x+40,c.y-2.5,c.x+80,c.y-.5,c.x+c.w,c.y-1.5);g.stroke();
g.beginPath();srr(c.x,c.y-5,c.w,c.h-1,3);g.strokeStyle=SOL;g.lineWidth=1.2;g.stroke();
for(const fx of[c.x+9,c.x+c.w-9]){ssh(()=>srr(fx-3,255.5,6,2.2,1),"#5a381c",.8);ssh(()=>g.ellipse(fx,259.4,4.6,2.8,0,0,7),"#6e4626",.9)}
/* glass doors stay swung open against the sides so they never cover the display */
const m=Math.sin(1.5),wd=58*Math.cos(1.5),mg=4*m;
for(const s of[-1,1]){const hx=s<0?CABX:CABX+CABW,ex=hx-s*wd;
g.beginPath();g.moveTo(hx,130);g.lineTo(ex,130-mg);g.lineTo(ex,250+mg);g.lineTo(hx,250);g.closePath();g.globalAlpha=.26;g.fillStyle="#cfe3ea";g.fill();g.globalAlpha=1;g.lineJoin="round";g.lineWidth=3.4;g.strokeStyle="#6e4626";g.stroke();g.lineWidth=1;g.strokeStyle="#b07a44";g.stroke();
if(wd>20){g.strokeStyle="rgba(255,255,255,.32)";g.lineCap="round";g.lineWidth=3;g.beginPath();g.moveTo(hx-s*(wd*.3),240);g.lineTo(hx-s*(wd*.75),150);g.stroke();g.lineWidth=1.2;g.beginPath();g.moveTo(hx-s*(wd*.5),244);g.lineTo(hx-s*(wd*.9),196);g.stroke();g.lineCap="butt"}
if(wd>12){const kx=s<0?ex-4:ex+4,kg=g.createRadialGradient(kx-.6,192.4,.3,kx,193,2.4);kg.addColorStop(0,"#fff0b0");kg.addColorStop(.6,"#d0a038");kg.addColorStop(1,"#6e4c12");g.fillStyle=kg;g.beginPath();g.arc(kx,193,2.3,0,7);g.fill()}}
g.lineJoin="miter";g.lineCap="butt"}
/* ---- wooden panel door with brass knob and a hanging PLAY sign; opens onto daylight ---- */
function doorDraw(){const d=RM.door,o=lb.go>0?ez(lb.go/18):0,x=d.x,y=d.y,w=d.w,h=d.h,dw=Math.max(6,w*(1-o*.86));
R(x-7,y-7,w+14,h+7,"#e6dccb");R(x-7,y-7,w+14,1.5,"#fff6e6");R(x-7,y-7,1.5,h+7,"#fff6e6");R(x+w+5.5,y-7,1.5,h+7,"#b8ab96");R(x-3,y-3,w+6,h+3,"#cdbfa8");R(x-3,y-3,w+6,1,"#b8ab96");
const og2=g.createLinearGradient(0,y,0,y+h);og2.addColorStop(0,"#fff1c4");og2.addColorStop(1,"#f2b874");g.fillStyle=og2;g.fillRect(x,y,w,h);
if(o>0){g.fillStyle="rgba(255,222,150,"+.38*o+")";g.beginPath();g.moveTo(x,y+h);g.lineTo(x+w,y+h);g.lineTo(x+w+34*o,H);g.lineTo(x-12,H);g.fill()}
const wg=g.createLinearGradient(x,0,x+dw,0);wg.addColorStop(0,"#a06f44");wg.addColorStop(1,"#7a4e2c");g.fillStyle=wg;g.fillRect(x,y,dw,h);
g.strokeStyle="rgba(60,32,14,.28)";g.lineWidth=.6;for(let i=0;i<7;i++){const gx=x+dw*(.07+i*.14);g.beginPath();g.moveTo(gx,y+2);g.bezierCurveTo(gx+1.6,y+h*.3,gx-1.6,y+h*.62,gx+.4,y+h-2);g.stroke()}
const pn=(px,py,pw,ph)=>{g.fillStyle="rgba(40,20,8,.22)";g.fillRect(px,py,pw,ph);g.fillStyle="rgba(30,14,4,.4)";g.fillRect(px,py,pw,1.2);g.fillRect(px,py,1.2,ph);g.fillStyle="rgba(255,222,170,.22)";g.fillRect(px+pw-1.2,py,1.2,ph);g.fillRect(px,py+ph-1.2,pw,1.2);g.fillStyle="rgba(255,230,190,.07)";g.fillRect(px+3,py+3,pw-6,ph-6)};
if(dw>16){const mx=dw*.14,pw=(dw-mx*3)/2;for(const[py,ph]of[[y+12,52],[y+76,70]])for(let k=0;k<2;k++)pn(x+mx+k*(pw+mx),py,pw,ph)}
g.fillStyle="rgba(0,0,0,.28)";g.fillRect(x+dw-1.5,y,1.5,h);g.fillStyle="rgba(255,230,190,.25)";g.fillRect(x,y,dw,1);
R(x,y+18,2,9,"#c9a24a");R(x,y+h-28,2,9,"#c9a24a");
if(dw>20){const kx=x+dw-9,ky=y+86;g.fillStyle="#7a5a22";g.beginPath();g.ellipse(kx,ky,2.8,6,0,0,7);g.fill();const kg=g.createRadialGradient(kx-1.2,ky-1.2,.4,kx,ky,3.8);kg.addColorStop(0,"#fff2b8");kg.addColorStop(.5,"#d8a838");kg.addColorStop(1,"#6e4c12");g.fillStyle=kg;g.beginPath();g.arc(kx,ky,3.5,0,7);g.fill()}
if(dw>44){const sx=x+dw/2,sy=y+30;g.save();g.translate(sx,sy);g.rotate(Math.sin(frame*.035)*.06);if(S=="lobby"&&lb.mode=="room"&&!lb.ms&&!lb.go){const k=1.1+Math.sin(frame*.15)*.04;g.scale(k,k)}g.strokeStyle="#3a2a1a";g.lineWidth=.8;g.beginPath();g.moveTo(-11,9);g.lineTo(0,0);g.lineTo(11,9);g.stroke();
g.fillStyle="rgba(0,0,0,.3)";g.beginPath();srr(-17,10,36,17,3);g.fill();g.fillStyle="#2a2238";g.beginPath();srr(-18,8,36,17,3);g.fill();g.fillStyle="#3a3150";g.fillRect(-16,10,32,1);
g.font="13px "+FB;g.textAlign="center";g.lineJoin="round";g.lineWidth=3;g.strokeStyle="#111";g.fillStyle="#ffc928";g.strokeText("PLAY",0,21.5);g.fillText("PLAY",0,21.5);
g.fillStyle="#9a9aa4";g.beginPath();g.arc(0,0,1.3,0,7);g.fill();g.restore()}}
/* ---- sketch helpers: wobbly hand-inked lines that "boil" (re-jitter every few frames) ---- */
const SKI="#1a1226",skJ=(i,s)=>{const v=Math.sin(i*127.1+s*311.7+(frame>>3)*74.7)*43758.5453;return v-Math.floor(v)-.5};
function skLine(x0,y0,x1,y1,s,j){j=j==null?1:j;g.moveTo(x0+skJ(3,s)*j,y0+skJ(4,s)*j);g.quadraticCurveTo((x0+x1)/2+skJ(1,s)*j*1.8,(y0+y1)/2+skJ(2,s)*j*1.8,x1+skJ(5,s)*j,y1+skJ(6,s)*j)}
function skS(p,lw,col){g.beginPath();p();g.strokeStyle=col||SKI;g.lineWidth=lw;g.stroke()}
function skRect(x,y,w,h,s,fill,lw){const o=2;
if(fill){g.fillStyle=fill;g.beginPath();g.moveTo(x+skJ(7,s),y+skJ(8,s));g.lineTo(x+w+skJ(9,s),y+skJ(10,s));g.lineTo(x+w+skJ(11,s),y+h+skJ(12,s));g.lineTo(x+skJ(13,s),y+h+skJ(14,s));g.fill()}
for(let p=0;p<2;p++){const q=s+p*17;skS(()=>{skLine(x-o,y,x+w+o,y,q);skLine(x+w,y-o,x+w,y+h+o,q+1);skLine(x+w+o,y+h,x-o,y+h,q+2);skLine(x,y+h+o,x,y-o,q+3)},lw*(p?.55:1))}}
function skCirc(cx,cy,r,s,fill,lw){if(fill){g.fillStyle=fill;g.beginPath();g.arc(cx+skJ(1,s)*.6,cy+skJ(2,s)*.6,r,0,7);g.fill()}
for(let p=0;p<2;p++){const q=s+p*23,a0=skJ(3,q)*6,n=12;g.beginPath();for(let i=0;i<=n+1;i++){const a=a0+i*(Math.PI*2+.5)/n,rr=r+skJ(i+5,q)*Math.min(1.6,r*.14);i?g.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr):g.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}
g.strokeStyle=SKI;g.lineWidth=lw*(p?.55:1);g.stroke()}}
function skHatch(x,y,w,h,s,st){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.beginPath();for(let i=-h;i<w;i+=st||4)skLine(x+i,y+h,x+i+h,y,s+i,.8);g.strokeStyle="rgba(26,18,38,.5)";g.lineWidth=.9;g.stroke();g.restore()}
/* ---- sketchy boombox: bounces on the beat, cones pump, tape reels spin, notes float up ---- */
function boxDraw(){const u=Math.abs(Math.sin(Math.PI*mBeat())),hop=u*5,c0=u<.3?1-u/.3:0,sx=1+.07*c0,sy=1-.1*c0,hv=S=="lobby"&&lb.hov=="box";
g.fillStyle="rgba(10,6,20,.38)";g.beginPath();g.ellipse(142,263.5,44-hop*1.6,3-hop*.2,0,0,7);g.fill();
g.save();g.translate(142,262);g.scale(.7*sx*(hv?1.05:1),.7*sy*(hv?1.05:1));g.translate(0,-hop);g.lineCap=g.lineJoin="round";
skS(()=>skLine(44,-38,58,-72,1,.8),2.2);skCirc(58,-73,2.6,2,"#ffd24a",1.6);
skS(()=>{skLine(-27,-38,-24,-53,3);skLine(-24,-53,24,-53,4);skLine(24,-53,27,-38,5)},5.5);skS(()=>{skLine(-27,-38,-24,-53,3,.4);skLine(-24,-53,24,-53,4,.4);skLine(24,-53,27,-38,5,.4)},1.8,"#f1e6cf");
skRect(-60,-38,120,37,10,"#e0573f",2.6);skHatch(-60,-11,120,10,11,4);skHatch(50,-36,10,26,12,3.5);
skS(()=>skLine(-58,-32,58,-32,12,.8),1.2);
for(let i=0;i<6;i++)skRect(-21+i*7,-43,5,4.5,20+i,i==4?"#ffd24a":"#f1e6cf",1.3);
for(const px of[-36,36]){const s=px>0?31:37;skCirc(px,-19,14.5,s,"#f1e6cf",2.3);skCirc(px,-19,11.5,s+3,null,1);
skCirc(px,-19,8+c0*1.8,s+5,"#2e2a36",1.8);skCirc(px,-19,2.8+c0*1.2,s+7,"#f1e6cf",1);
g.save();g.beginPath();g.arc(px,-19,14,0,7);g.clip();g.beginPath();for(let i=0;i<5;i++)skLine(px+2+i*3,-5,px+12+i*3,-15,s+i,.6);g.strokeStyle="rgba(26,18,38,.45)";g.lineWidth=.8;g.stroke();g.restore()}
skRect(-17,-31,34,18,40,"#f1e6cf",1.7);skRect(-13,-28,26,10,41,"#2e2a36",1.2);
for(const rx of[-6,6]){g.save();g.translate(rx,-23);g.rotate(frame*.15);skCirc(0,0,3.3,44+rx,"#f1e6cf",1);g.beginPath();for(let k=0;k<3;k++){g.rotate(2.094);g.moveTo(0,-.8);g.lineTo(0,-3)}g.strokeStyle=SKI;g.lineWidth=.9;g.stroke();g.restore()}
for(let i=0;i<5;i++){const lv=(Math.sin(frame*.4+i*1.7)*.5+.5)*(.4+.6*(1-u));skS(()=>skLine(-11+i*5,-8,-11+i*5,-9-lv*4,50+i,.4),2.2,i<3?"#3a8a3a":i<4?"#c98a12":SKI)}
g.restore();g.lineCap="butt";g.lineJoin="miter";
if(c0>0){g.globalAlpha=c0;g.lineCap="round";for(const s of[-1,1])for(let k=0;k<2;k++){const r=12+k*5+(1-c0)*3;g.beginPath();g.arc(142+s*32,248-hop,r,s>0?-.7:Math.PI-.7,s>0?.7:Math.PI+.7);g.strokeStyle=SKI;g.lineWidth=1.3;g.stroke()}g.globalAlpha=1;g.lineCap="butt"}
for(let i=0;i<3;i++){const t=((frame+i*44)%132)/132,nx=142+(i-1)*16+Math.sin(t*7+i)*5,ny=228-t*46;g.globalAlpha=Math.min(1,t*5)*(1-t);g.fillStyle="#fff2c0";g.strokeStyle="#fff2c0";g.lineWidth=1.2;
g.beginPath();g.ellipse(nx,ny,2.6,1.9,-.4,0,7);g.fill();g.beginPath();g.moveTo(nx+2.2,ny-.6);g.lineTo(nx+2.2,ny-9);g.quadraticCurveTo(nx+5,ny-7,nx+5.5,ny-4.5);g.stroke();g.globalAlpha=1}}
/* ---- painted wall with wainscot + framed duck photos (built once) ---- */
let WALLC=null,SPRC=null;
const PICS=[{x:10,y:14,w:72,h:52,b:0,r:-.025},{x:110,y:120,w:50,h:60,b:1,r:.035},{x:422,y:38,w:80,h:56,b:2,r:.02},{x:474,y:134,w:32,h:42,b:3,r:-.04}];
function picArt(P){const cw=(P.w-6)*3,ch=(P.h-6)*3,cv=document.createElement("canvas");cv.width=cw;cv.height=ch;const q=cv.getContext("2d"),G=(y0,y1,st)=>{const l=q.createLinearGradient(0,y0,0,y1);st.forEach((s,i)=>l.addColorStop(i/(st.length-1),s));return l};
let s=P.b*31+7;const r=()=>(s=s*16807%2147483647)/2147483647;let o,dx0,gy,sc,after=null;q.lineCap=q.lineJoin="round";
if(P.b==0){q.fillStyle=G(0,ch*.62,["#2d1f5e","#c2457a","#ff7a4d","#ffc45e"]);q.fillRect(0,0,cw,ch*.62);
q.fillStyle="#fff0b8";q.beginPath();q.arc(cw*.78,ch*.6,ch*.17,0,7);q.fill();
q.fillStyle=G(ch*.6,ch*.8,["#3b3f8f","#1f2a5e"]);q.fillRect(0,ch*.6,cw,ch*.2);q.fillStyle="#ffc45e";for(let i=0;i<5;i++)q.fillRect(cw*.78-(26-i*4),ch*.63+i*ch*.032,(52-i*8),2.5);
q.fillStyle=G(ch*.78,ch,["#f0c27a","#d39250"]);q.beginPath();q.moveTo(0,ch*.82);q.quadraticCurveTo(cw*.5,ch*.74,cw,ch*.82);q.lineTo(cw,ch);q.lineTo(0,ch);q.fill();
q.strokeStyle="#24142e";q.lineWidth=7;q.beginPath();q.moveTo(cw*.1,ch);q.quadraticCurveTo(cw*.04,ch*.55,cw*.17,ch*.24);q.stroke();q.lineWidth=5;
for(const[ex,ey]of[[-50,-4],[-38,24],[42,-8],[48,22],[6,-34]]){q.beginPath();q.moveTo(cw*.17,ch*.24);q.quadraticCurveTo(cw*.17+ex*.5,ch*.24+ey*.5-16,cw*.17+ex,ch*.24+ey);q.stroke()}
o={yaw:.75,ev:1,an:0,hp:-.15,fl:.5,wd:.3,sid:"pa",id:0,rwm:mm(rY(-.55),mm(rX(-2.3),rZ(.12))),rwo:[-.28,.3,.5]};dx0=cw*.44;gy=ch*.98;sc=ch*.98/71.68}
else if(P.b==1){q.fillStyle=G(0,ch*.75,["#3f8ee0","#a9dbff","#e6f6ff"]);q.fillRect(0,0,cw,ch);
q.fillStyle="#8fb0d8";q.beginPath();q.moveTo(0,ch*.62);q.lineTo(cw*.24,ch*.34);q.lineTo(cw*.44,ch*.54);q.lineTo(cw*.68,ch*.26);q.lineTo(cw,ch*.56);q.lineTo(cw,ch);q.lineTo(0,ch);q.fill();
q.fillStyle="#f4faff";for(const[px,py]of[[.24,.34],[.68,.26]]){const X=cw*px,Y=ch*py,a=cw*.08,b=ch*.07;q.beginPath();q.moveTo(X-a,Y+b);q.lineTo(X,Y);q.lineTo(X+a,Y+b);q.lineTo(X+a*.4,Y+b*.75);q.lineTo(X,Y+b*1.05);q.lineTo(X-a*.4,Y+b*.75);q.fill()}
q.fillStyle="#f4faff";q.beginPath();q.moveTo(0,ch*.8);q.quadraticCurveTo(cw*.5,ch*.66,cw,ch*.82);q.lineTo(cw,ch);q.lineTo(0,ch);q.fill();q.fillStyle="#d2e4f6";q.beginPath();q.moveTo(0,ch*.9);q.quadraticCurveTo(cw*.6,ch*.82,cw,ch*.92);q.lineTo(cw,ch);q.lineTo(0,ch);q.fill();
for(const[tx,ts]of[[.12,1],[.9,.75]]){const X=cw*tx,B=ch*.84,k=ch*.11*ts;q.fillStyle="#3a2a20";q.fillRect(X-2,B-k*.4,4,k*.4);for(let j=0;j<3;j++){const yy=B-k*.3-j*k*.55,ww=k*(.75-j*.17);q.fillStyle="#24523f";q.beginPath();q.moveTo(X-ww,yy);q.lineTo(X,yy-k*.8);q.lineTo(X+ww,yy);q.fill();q.fillStyle="#f4faff";q.fillRect(X-ww*.6,yy-2,ww*1.2,2)}}
q.fillStyle="rgba(60,90,140,.3)";q.beginPath();q.ellipse(cw*.52,ch*.87,cw*.2,ch*.025,0,0,7);q.fill();
q.fillStyle="#fff";for(let i=0;i<34;i++){q.beginPath();q.arc(r()*cw,r()*ch*.8,.8+r()*1.6,0,7);q.fill()}
o={yaw:1.05,ev:1,air:1,vy:-3,an:0,sid:"pb",wd:.3,id:0};dx0=cw*.52;gy=ch*.74;sc=cw*.98/71.68}
else if(P.b==2){q.fillStyle=G(0,ch*.8,["#0d0a24","#2a1650","#5a2a6e"]);q.fillRect(0,0,cw,ch);
q.fillStyle="#fff3c8";q.beginPath();q.arc(cw*.84,ch*.2,ch*.09,0,7);q.fill();q.fillStyle="#fff";for(let i=0;i<20;i++)q.fillRect(r()*cw,r()*ch*.4,1.2,1.2);
for(const[c1,base,hm]of[["#241a40",.7,.5],["#140e26",.82,.38]]){let x=-4;while(x<cw){const bw=18+r()*24,bh=ch*(hm*.5+r()*hm),top=ch*base-bh;q.fillStyle=c1;q.fillRect(x,top,bw,ch-top);
for(let wy=top+5;wy<ch*base-4;wy+=8)for(let wx=x+4;wx<x+bw-4;wx+=7){q.fillStyle=r()>.62?"#ffd66b":"rgba(90,70,140,.5)";q.fillRect(wx,wy,3,4)}x+=bw+2}}
q.save();q.shadowColor="#ff3b8d";q.shadowBlur=8;q.strokeStyle="#ff5aa8";q.lineWidth=2.5;q.strokeRect(cw*.1,ch*.36,cw*.16,ch*.09);q.restore();
q.fillStyle="#221a36";q.fillRect(0,ch*.84,cw,ch*.16);q.fillStyle="#3d3358";q.fillRect(0,ch*.84,cw,2.5);q.fillStyle="#ffd66b";for(let x=6;x<cw;x+=30)q.fillRect(x,ch*.93,14,2);
q.strokeStyle="rgba(255,255,255,.55)";q.lineWidth=1.6;for(let i=0;i<5;i++){const yy=ch*(.5+i*.07),l=20+r()*30;q.beginPath();q.moveTo(cw*.3-l,yy);q.lineTo(cw*.3,yy);q.stroke()}
o={yaw:1.35,ev:1,sb:1,an:0,sid:"pc",wd:.3,id:0,tilt:-.08};dx0=cw*.52;gy=ch*.84;sc=ch*.9/71.68;
after=()=>{const k=DN*.56*sc;q.fillStyle="#ffd24a";q.strokeStyle="#0d0818";q.lineWidth=2;for(const wx of[-.2,.2]){q.beginPath();q.arc(dx0+k*wx,gy+3,3.6,0,7);q.fill();q.stroke()}q.fillStyle="#ff3b8d";q.beginPath();srrQ(q,dx0-k*.3,gy-4,k*.6,5,2.5);q.fill();q.stroke()}}
else{q.fillStyle=G(0,ch,["#05031a","#1c0f44","#3a1a5c"]);q.fillRect(0,0,cw,ch);for(let i=0;i<40;i++){q.fillStyle=r()>.8?"#ffe9a0":"#fff";q.fillRect(r()*cw,r()*ch,r()>.85?2:1,r()>.85?2:1)}
const px=cw*.8,py=ch*.84,pr2=cw*.34,pg=q.createRadialGradient(px-pr2*.4,py-pr2*.4,2,px,py,pr2);pg.addColorStop(0,"#ffb070");pg.addColorStop(1,"#b8442a");q.fillStyle=pg;q.beginPath();q.arc(px,py,pr2,0,7);q.fill();
q.strokeStyle="#ffd9a0";q.lineWidth=3;q.beginPath();q.ellipse(px,py,pr2*1.5,pr2*.35,-.35,0,7);q.stroke();
o={yaw:-.7,ev:1,air:1,vy:2,an:0,sid:"pd",wd:.3,tilt:.45,id:0};dx0=cw*.42;gy=ch*.66;sc=cw*1.05/71.68}
const od=DT;DT=q;duckDraw(dx0,gy,sc,o);DT=od;if(after)after();return cv}
function srrQ(q,x,y,w,h,r){if(q.roundRect)q.roundRect(x,y,w,h,r);else q.rect(x,y,w,h)}
function picHang(x,P){const art=picArt(P),cx=P.x+P.w/2,w=P.w,h=P.h;
x.strokeStyle="rgba(25,20,30,.55)";x.lineWidth=.7;x.beginPath();x.moveTo(P.x+8,P.y+3);x.lineTo(cx,P.y-7);x.lineTo(P.x+w-8,P.y+3);x.stroke();x.fillStyle="#3a3036";x.beginPath();x.arc(cx,P.y-7,1.3,0,7);x.fill();
x.save();x.translate(cx,P.y+h/2);x.rotate(P.r);x.fillStyle="rgba(10,10,24,.32)";x.fillRect(-w/2+2,-h/2+3,w,h);
x.fillStyle=["#1d1822","#a8763f","#1d1822","#ece6da"][P.b];x.fillRect(-w/2,-h/2,w,h);
x.fillStyle="rgba(255,255,255,.2)";x.fillRect(-w/2,-h/2,w,1);x.fillRect(-w/2,-h/2,1,h);x.fillStyle="rgba(0,0,0,.28)";x.fillRect(-w/2,h/2-1,w,1);x.fillRect(w/2-1,-h/2,1,h);
x.drawImage(art,-w/2+3,-h/2+3,w-6,h-6);x.strokeStyle="rgba(0,0,0,.4)";x.lineWidth=1;x.strokeRect(-w/2+3.5,-h/2+3.5,w-7,h-7);
x.save();x.beginPath();x.rect(-w/2+3,-h/2+3,w-6,h-6);x.clip();x.fillStyle="rgba(255,255,255,.1)";x.beginPath();x.moveTo(-w/2+w*.18,-h/2);x.lineTo(-w/2+w*.4,-h/2);x.lineTo(-w/2+w*.12,h/2);x.lineTo(-w/2-w*.1,h/2);x.fill();x.restore();x.restore()}
function wallBuild(){const WW2=W+220,cv=document.createElement("canvas");cv.width=WW2*2;cv.height=262*2;const x=cv.getContext("2d");x.scale(2,2);
let s=11;const r=()=>(s=s*16807%2147483647)/2147483647;
x.fillStyle="#7d9a9c";x.fillRect(0,0,WW2,262);
for(let i=0;i<300;i++){x.fillStyle=r()<.5?"rgba(255,255,255,.035)":"rgba(0,0,0,.035)";x.fillRect(r()*WW2,r()*196,6+r()*30,4+r()*50)}
for(let i=0;i<3000;i++){x.fillStyle=r()<.5?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)";x.fillRect(r()*WW2,r()*262,.5,.5)}
const cg=x.createLinearGradient(0,0,0,34);cg.addColorStop(0,"rgba(20,12,30,.28)");cg.addColorStop(1,"rgba(20,12,30,0)");x.fillStyle=cg;x.fillRect(0,0,WW2,34);
x.fillStyle="#5d777b";x.fillRect(0,200,WW2,62);
for(let px=6;px<WW2;px+=64){x.fillStyle="rgba(0,0,0,.2)";x.fillRect(px,209,54,1);x.fillRect(px,209,1,38);x.fillStyle="rgba(255,255,255,.12)";x.fillRect(px,247,54,1);x.fillRect(px+54,209,1,39)}
x.fillStyle="#e6dccb";x.fillRect(0,194,WW2,6);x.fillStyle="#fff6e6";x.fillRect(0,194,WW2,1);x.fillStyle="#b8ab96";x.fillRect(0,198.5,WW2,1.5);x.fillStyle="rgba(0,0,0,.22)";x.fillRect(0,200,WW2,3);
x.fillStyle="rgba(0,0,0,.25)";x.fillRect(0,250,WW2,2);x.fillStyle="#e6dccb";x.fillRect(0,252,WW2,10);x.fillStyle="#fff6e6";x.fillRect(0,252,WW2,1);x.fillStyle="rgba(0,0,0,.08)";x.fillRect(0,256,WW2,1);
for(const P of PICS)picHang(x,P);return cv}
/* ---- spray-painted logo: soft outline, overspray, drips (built once fonts are loaded) ---- */
function fontsReady(){try{if(!document.fonts)return true;for(const f of document.fonts)if(/TagBig/.test(f.family)&&f.status=="loaded")return true;return frame>240}catch(_){return true}}
function sprayBuild(){const Wc=W,Hc=175,K2=2,mk=()=>{const c=document.createElement("canvas");c.width=Wc*K2;c.height=Hc*K2;const x=c.getContext("2d");x.scale(K2,K2);x.font="54px "+FB;x.textAlign="center";x.lineJoin="round";return[c,x]};
const[out,o]=mk(),[,f]=mk(),[,e]=mk(),L=[["COOL DUCK",256,88,"#ffc928","#fff0a0"],["1",256,142,"#e8302a","#ff8a70"]];
for(const l of L){f.fillStyle="#000";f.fillText(l[0],l[1],l[2]);e.lineWidth=17;e.strokeStyle="#000";e.strokeText(l[0],l[1],l[2]);e.fillText(l[0],l[1],l[2])}
const FD=f.getImageData(0,0,Wc*K2,Hc*K2).data,ED=e.getImageData(0,0,Wc*K2,Hc*K2).data,at=(D,x,y)=>{x=x*K2|0;y=y*K2|0;return x<0||y<0||x>=Wc*K2||y>=Hc*K2?0:D[(y*Wc*K2+x)*4+3]};
let s=97;const r=()=>(s=s*16807%2147483647)/2147483647;
o.filter="blur(1.6px)";o.strokeStyle="rgba(20,14,34,.85)";o.lineWidth=9;for(const l of L)o.strokeText(l[0],l[1],l[2]);
o.filter="blur(.5px)";o.lineWidth=5;o.strokeStyle="#1a1226";for(const l of L)o.strokeText(l[0],l[1],l[2]);o.filter="none";
for(let i=0;i<9000;i++){const x=r()*Wc,y=r()*Hc;if(at(ED,x,y)>10&&at(FD,x,y)<10){o.fillStyle="rgba(20,14,34,"+(.2+r()*.55)+")";const z=.4+r()*.8;o.fillRect(x,y,z,z)}}
for(const l of L){const gr=o.createLinearGradient(0,l[2]-44,0,l[2]+2);gr.addColorStop(0,l[4]);gr.addColorStop(.45,l[3]);gr.addColorStop(1,l[3]);o.filter="blur(.55px)";o.fillStyle=gr;o.fillText(l[0],l[1],l[2]);o.filter="none"}
for(let i=0;i<4000;i++){const x=r()*Wc,y=r()*Hc;if(at(FD,x,y)>200&&at(FD,x,y-2.5)<40){o.fillStyle="rgba(255,255,255,"+(.35+r()*.4)+")";o.fillRect(x,y,.7,.7)}}
for(const l of L){const bw=f.measureText(l[0]).width,n=l[0].length>1?13:3;for(let i=0;i<n;i++){const x=l[1]-bw/2+3+r()*(bw-6);let yb=-1;for(let y=l[2]+8;y>l[2]-50;y-=.5)if(at(FD,x,y)>140){yb=y;break}if(yb<0)continue;
const len=3+r()*r()*20,wd=1+r()*1.3;o.lineCap="round";o.strokeStyle="#1a1226";o.lineWidth=wd+1.6;o.beginPath();o.moveTo(x,yb-1);o.lineTo(x,yb+len);o.stroke();o.strokeStyle=l[3];o.lineWidth=wd;o.stroke();o.fillStyle=l[3];o.beginPath();o.arc(x,yb+len,wd*.85,0,7);o.fill()}}
return out}
function sprayDraw(){if(!SPRC){if(!fontsReady())return;SPRC=sprayBuild()}const t=lb.t,k=luC((t-4)/26),x1=110+k*300;
g.drawImage(SPRC,0,0,x1*2,200,0,0,x1,100);if(t>32)g.drawImage(SPRC,0,200,W*2,150,0,100,W,75)}
function roomDraw(){const C=rcam();g.save();g.translate(C.X(0),C.Y(0));g.scale(C.z,C.z);
if(!WALLC)WALLC=wallBuild();g.drawImage(WALLC,0,0,W+220,262);
if(S=="lobby")sprayDraw();
R(0,262,W+220,26,"#4a4258");R(0,262,W+220,3,"#cfc4b4");
for(const[y,h,o]of[[265,6,0],[272,7,31],[280,8,14]]){R(0,y+h,W+220,1,"#3a3348");for(let x=o;x<W+220;x+=62)R(x,y,1,h,"#3a3348")}
g.fillStyle="rgba(10,6,20,.35)";for(const[x,rx]of[[402,68],[56,40]]){g.beginPath();g.ellipse(x,264,rx,3,0,0,7);g.fill()}
ssh(()=>g.ellipse(262,270,56,8,0,0,7),"#7a2f3c",1.4);sln(()=>g.ellipse(262,270,47,5.6,0,0,7),"#d9a441",1.3);ssh(()=>g.ellipse(262,270,36,3.6,0,0,7),"#8e3a48",.9);
for(let k=-3;k<=3;k++){R(204,268+k*1.2,3,1,"#d9a441");R(317,268+k*1.2,3,1,"#d9a441")}g.lineJoin="miter";g.lineCap="butt";
doorDraw();boxDraw();cabDraw();bookDraw();
{const lg=g.createRadialGradient(262,180,10,262,180,200);lg.addColorStop(0,"rgba(255,196,120,.16)");lg.addColorStop(1,"rgba(255,196,120,0)");g.globalCompositeOperation="lighter";g.fillStyle=lg;g.fillRect(0,0,W+220,H);g.globalCompositeOperation="source-over"}
g.restore()}
const wallDraw=roomDraw,lobbyDraw=roomDraw;
function bootDraw(){R(0,0,W,H,"#0006");if(frame%60<40)TX("CLICK OR PRESS ANY KEY",256,281,"#ffd66b",14,"center")}
function titleDraw(){const k=Math.min(1,tt/26),e=Math.max(0,1+2.7*Math.pow(k-1,3)+1.7*Math.pow(k-1,2)),sh=tt<24?Math.sin(tt*2.3)*(24-tt)*.4:0,out=Math.max(0,Math.min(1,(tt-96)/28));
g.globalAlpha=.53*(1-out);R(0,0,W,H,"#000");g.globalAlpha=1;
if(out<1){const s=e*(1+out*1.8);g.save();g.globalAlpha=1-out;g.translate(256,114);g.rotate((tt<50?Math.sin(tt*.55)*1.6:tt*.03)+out*out*5);g.fillStyle="#111";g.beginPath();g.arc(0,0,86*s,0,7);g.fill();g.strokeStyle="#555";g.lineWidth=1;for(let r=28;r<84;r+=8){g.beginPath();g.arc(0,0,r*s,0,7);g.stroke()}g.fillStyle="#e8453c";g.beginPath();g.arc(0,0,25*s,0,7);g.fill();R(-3,-86*s,6,20,"#fff");g.restore()}
if(out<.55||tt%2==0){TX("COOL DUCK",256+sh,88,"#ffc928",54*e,"center");TX("1",256-sh,142,"#e8302a",54*e,"center")}}
function lookP(t){if(t<0)return null;return{turn:lkE(t,0,18)*(1-lkE(t,144,168)),wing:lkE(t,12,38)*(1-lkE(t,142,164)),gz:lkE(t,38,58)*(1-lkE(t,120,140)),brw:lkE(t,58,74)*(1-lkE(t,112,126)),hold:lkE(t,56,70)*(1-lkE(t,114,130))}}
const SHD={x:398,gy:282,sc:3.0};
/* ---- dance styles: (o, beats elapsed, ease 0..1, idle yaw) -> lift in px. Whole beats = landing / nod. ---- */
const DANCES={
/* hype: big hops every beat, wing flaps, a full spin at the end of every 8-beat bar */
hype(o,bt,e,y0){const b=Math.PI*bt,sw=Math.sin(b),u=Math.abs(sw),c0=u<.3?1-u/.3:0,bar=((bt%8)+8)%8,sp=ez((bar-6)/2);
o.tilt=sw*.2*e;o.yaw=y0+(Math.sin(b*.5)*.6*(1-sp)+sp*Math.PI*2)*e;o.an=b/1.3;o.rq=.7*e;o.fl=.5+(.6+Math.sin(b*2)*.65)*e;
o.hz=-sw*.15*e;o.hp=-.22+Math.abs(Math.cos(b))*.15*e;o.sx=1+.08*c0*e;o.sy=1-.1*c0*e;return u*(10+sp*6)*e},
/* swag: calm, cool strut in place - leans back a little, easy step on each beat, small head bob, shoulders roll every two beats */
swag(o,bt,e,y0){const b=Math.PI*bt,u=Math.abs(Math.sin(b)),d=1-u,s2=Math.sin(b*.5);
o.tilt=(s2*.07-.04)*e;o.yaw=y0+Math.sin(b*.25)*.18*e;o.an=b*.5/1.3;o.rq=.25*e;o.fl=.36+Math.abs(s2)*.12*e;
o.hp=-.22+(Math.pow(d,2)*.1-.03)*e;o.hz=-s2*.06*e;o.sy=1-.03*Math.pow(d,3)*e;return u*1.5*e},
/* wave: sunny two-step - one wing waves up on each beat (left, then right), easy side steps, light heel bounce */
wave(o,bt,e,y0){const b=Math.PI*bt,sn=Math.sin(b),u=Math.abs(sn),d=1-u,kl=Math.max(0,sn)*e,kr=Math.max(0,-sn)*e;
o.lwm=mm(rX(-kl*1.9),rZ(-.12-kl*.55));o.rwm=mm(rX(-kr*1.9),rZ(.12+kr*.55));o.tilt=sn*.07*e;o.yaw=y0+Math.sin(b*.5)*.3*e;o.an=b*.5/1.3;o.rq=.3*e;
o.hp=-.22+Math.pow(d,3)*.12*e;o.hz=-sn*.06*e;o.sy=1-.03*Math.pow(d,3)*e;return u*1.8*e},
/* groove: stays on the ground, knee-dip + hard head nod on each beat, side-step, hip sway every two beats */
groove(o,bt,e,y0){const b=Math.PI*bt,u=Math.abs(Math.sin(b)),d=1-u,s2=Math.sin(b*.5);
o.tilt=s2*.12*e;o.yaw=y0+s2*.35*e;o.an=b*.5/1.3;o.rq=.45*e;o.fl=.4+(.25+Math.abs(Math.cos(b))*.35)*e;
o.hp=-.22+Math.pow(d,3)*.28*e;o.hz=-s2*.08*e;o.sx=1+.05*Math.pow(d,4)*e;o.sy=1-.07*Math.pow(d,4)*e;return u*2*e},
/* chill: slow lean over two beats, gentle nod, relaxed wings, barely leaves the floor */
chill(o,bt,e,y0){const b=Math.PI*bt,b2=b*.5,d=1-Math.abs(Math.sin(b));
o.tilt=Math.sin(b2)*.13*e;o.yaw=y0+Math.sin(b2*.5)*.22*e;o.an=0;o.rq=0;o.fl=.38+Math.sin(b)*.08*e;
o.hp=-.22+Math.pow(d,2)*.1*e;o.hz=-Math.sin(b2)*.12*e;o.sy=1-.025*Math.pow(d,2)*e;return(1-Math.cos(b2*2))*.8*e}};
function roomDuck(){const C=rcam(),lob=S=="lobby",lk=lob?lookP(lb.look):null,shop=lob&&lb.zp>.8,sl=lob?ez((lb.zp-.8)/.2):0;
let cx,gy,sc,yawI;
if(shop){cx=560-(560-SHD.x)*sl;gy=SHD.gy;sc=SHD.sc;yawI=Math.sin(lb.t/70)*.55+.3}
else if(lob&&lb.zp>.5)return;
else{cx=C.X(RM.dk.x);gy=C.Y(RM.dk.gy);sc=RM.dk.sc*C.z;yawI=.55}
const o={yaw:yawI,ev:1,an:0,hp:-.22,fl:.5,wd:.3,sid:"rm",id:1,eyes:lk&&lk.gz>.02?1:0};
if(lk){o.yaw=yawI*(1-lk.turn);o.hp=-.22+.2*lk.turn;o.hz=lk.hold*.1;o.gz=lk.gz;o.brw=lk.brw;
if(lk.wing>0){const k=lk.wing;o.rwm=mm(rY(-k*.55),mm(rX(-k*2.3),rZ(.12)));o.rwo=[-k*.28,k*.3,k*.5]}}
if(lob&&!shop&&lb.dn>0){/* dance to the boombox beat, style picked by the playing song */const e=ez(Math.min(lb.dn/12,(DNL-lb.dn)/16)),T=TRACKS[MCUR<0?MTR:MCUR];
gy-=(DANCES[T.dance]||DANCES.hype)(o,mBeat(),e,yawI)*C.z}
DT=vg;if(shop&&lb.sel&&lb.sel.r==4){vg.save();vg.translate(cx,gy-4);vg.scale(sc,sc);boardPaint(vg,BRD[lb.sel.c],frame*.1);vg.restore();gy-=4+3.62*sc-.4}duckDraw(cx,gy,sc,o);DT=g;
if(!lob)return;uiDraw(C)}
function cellAt(x,y){if(lb.mode!="shop")return null;const C=rcam();for(let r=0;r<3;r++)for(let c=0;c<5;c++){const q=cellR(r,c);if(inR(x,y,[C.X(q[0]),C.Y(q[1]),q[2]*C.z,q[3]*C.z]))return slot(lb.pg||0,r,c)}return null}
const cabShop=(x,y)=>{const C=rcam(),c=RM.cab;return inR(x,y,[C.X(c.x),C.Y(c.y),c.w*C.z,c.h*C.z])};
const HOT={duck:[215,166,94,100],cab:[338,96,128,166],door:[18,100,76,162],box:[98,206,90,60],book:[302,254,40,24]},SDK=[SHD.x-60,90,120,196];
function hotAt(x,y){if(S!="lobby"||lb.go>0||x<0)return"";
if(lb.mode=="room"){if(lb.bk)return bookHot(x,y);if(inR(x,y,HOT.book)&&!lb.rad)return"book";if(lb.rad){if(inR(x,y,RADX))return"rx";if(inR(x,y,RADS))return"rs";for(let i=0;i<TRACKS.length;i++)if(inR(x,y,radR(i)))return"r"+i;return""}if(inR(x,y,HOT.box))return"box";if(inR(x,y,HOT.duck))return"duck";if(inR(x,y,HOT.cab))return"cab";if(inR(x,y,HOT.door))return"door"}
else if(lb.mode=="shop"){if(inR(x,y,SBACK))return"back";if(inR(x,y,SPGL))return"pgl";if(inR(x,y,SPGR))return"pgr";const c=cellAt(x,y);if(c)return"c"+c.r+"_"+c.c;if(inR(x,y,SDK))return"duck";if(!cabShop(x,y))return"wall"}
return""}
