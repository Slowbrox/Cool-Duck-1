/* =====================================================================
   Star-road book (lobby) - 90s West Coast blackbook
   A black leather book (blue bandana border, gold chain, sunset + palms emblem) lies next to the duck.
   Click it (or press B): it zooms up already open on the star-road page - a sunset boulevard with
   every level, its best grade and best score.
   Click an unlocked level to play it. Records come from LVR (35-egg-attack.js).
   ===================================================================== */
const SRN=[{x:96,y:214},{x:190,y:166},{x:318,y:206},{x:410,y:152}],SRF={x:442,y:136},SRX=[446,30,20,20],SRA=[32,22,448,252],SRO=10,SRH=126;
const bkEo=x=>{x=luC(x);return 1-Math.pow(1-x,3)};/* ease-out, no overshoot */
const bkName=i=>i==0?"THE STREET":LVN[i];
const bkUnl=i=>i==0||!!LVR[i]||!!LVR[i-1];
const bkOut=x=>{x=luC(x);const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
/* smooth road through the nodes, sampled once: [x, y, segment] (24 samples per segment) */
const SRP=(()=>{const P_=[...SRN.map(q=>[q.x,q.y]),[SRF.x,SRF.y]],o=[];
for(let i=0;i<P_.length-1;i++){const a=P_[i],b=P_[i+1],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,c=[mx+(b[1]-a[1])*.25,my-(b[0]-a[0])*.25];
for(let k=0;k<24;k++){const t=k/24,u=1-t;o.push([u*u*a[0]+2*u*t*c[0]+t*t*b[0],u*u*a[1]+2*u*t*c[1]+t*t*b[1],i])}}o.push([...P_[P_.length-1],P_.length-2]);return o})();
const SRG=Array.from({length:46},(_,i)=>[(i*71.3)%224,(i*53.9)%252-126,.6+(i%3)*.4]);/* leather grain */
/* ---------------- West Coast drawing kit ---------------- */
const BND="#1d4fae";
function srPaisley(v,x,y,s,r,col,bg){v.save();v.translate(x,y);v.rotate(r);v.scale(s,s);v.fillStyle=col;v.beginPath();v.moveTo(0,6);v.bezierCurveTo(-6,6,-6,-3,0,-4);v.bezierCurveTo(4,-5,5,-9,2,-11);v.bezierCurveTo(8,-8,7,4,0,6);v.fill();v.fillStyle=bg;v.beginPath();v.arc(0,1,1.8,0,7);v.fill();v.restore()}
/* bandana band around a rectangle: blue with white paisleys + dot trios, white pinstripes */
function srBandana(v,x,y,w,h,b){v.save();v.beginPath();v.rect(x,y,w,h);v.rect(x+b,y+b,w-2*b,h-2*b);v.fillStyle=BND;v.fill("evenodd");
v.strokeStyle="rgba(255,255,255,.85)";v.lineWidth=.7;v.strokeRect(x+1.8,y+1.8,w-3.6,h-3.6);v.strokeRect(x+b-1.8,y+b-1.8,w-2*b+3.6,h-2*b+3.6);
const m=b/2;let k=0;const run=(x0,y0,x1,y1,r)=>{const L=Math.hypot(x1-x0,y1-y0),n=Math.max(1,L/20|0);for(let i=0;i<n;i++){const u=(i+.5)/n,px=x0+(x1-x0)*u,py=y0+(y1-y0)*u;
if((k++)%2)srPaisley(v,px,py,b/24,r+(i%4<2?1.57:-1.57),"#fff",BND);else{v.fillStyle="#fff";for(const d of[-2.6,0,2.6]){v.beginPath();v.arc(px+Math.cos(r)*d,py+Math.sin(r)*d,.75,0,7);v.fill()}}}};
run(x+b,y+m,x+w-b,y+m,0);run(x+w-m,y+b,x+w-m,y+h-b,1.57);run(x+w-b,y+h-m,x+b,y+h-m,3.14);run(x+m,y+h-b,x+m,y+b,-1.57);
for(const[cx,cy]of[[x+m,y+m],[x+w-m,y+m],[x+w-m,y+h-m],[x+m,y+h-m]]){v.fillStyle="#fff";v.beginPath();v.arc(cx,cy,b*.32,0,7);v.fill();v.fillStyle=BND;v.beginPath();v.arc(cx,cy,b*.16,0,7);v.fill()}v.restore()}
/* gold rope chain around a rectangle */
function srChain(v,x,y,w,h){const per=2*(w+h),n=per/5.6|0;v.save();for(let i=0;i<n;i++){const d=i*per/n;let px,py,an;
if(d<w){px=x+d;py=y;an=0}else if(d<w+h){px=x+w;py=y+d-w;an=1.57}else if(d<2*w+h){px=x+w-(d-w-h);py=y+h;an=0}else{px=x;py=y+h-(d-2*w-h);an=1.57}
const big=i%2;v.beginPath();v.ellipse(px,py,big?3.3:2.4,big?1.4:2.1,an,0,7);v.strokeStyle="#3a2600";v.lineWidth=2.4;v.stroke();v.strokeStyle=big?"#ffd86a":"#d8a02c";v.lineWidth=1.2;v.stroke()}v.restore()}
function srPalm(v,x,y,h,lean,col){v.save();v.strokeStyle=col;v.fillStyle=col;v.lineCap="round";v.lineWidth=Math.max(1.4,h*.06);v.beginPath();v.moveTo(x,y);v.quadraticCurveTo(x+lean*.3,y-h*.55,x+lean,y-h);v.stroke();
const tx=x+lean,ty=y-h;v.lineWidth=Math.max(1.1,h*.045);for(let k=0;k<7;k++){const a=-Math.PI+k*Math.PI/6+Math.sin(frame*.03+x)*.04,L=h*(.36+((k*37)%5)*.03);v.beginPath();v.moveTo(tx,ty);
v.quadraticCurveTo(tx+Math.cos(a)*L*.55,ty+Math.sin(a)*L*.55-L*.1,tx+Math.cos(a)*L,ty+Math.sin(a)*L*.5+L*.36);v.stroke()}v.beginPath();v.arc(tx,ty+1,Math.max(1.2,h*.05),0,7);v.fill();v.restore()}
const srSky=(v,y0,y1)=>{const q=v.createLinearGradient(0,y0,0,y1);q.addColorStop(0,"#170a33");q.addColorStop(.45,"#4e1a66");q.addColorStop(.78,"#d9406e");q.addColorStop(1,"#ff9d4a");return q};
/* striped retro sunset sun (stripes are painted with the sky gradient so they read as cut-outs) */
function srSun(v,x,y,r,sky,hz){const gl=v.createRadialGradient(x,y,r*.4,x,y,r*2.1);gl.addColorStop(0,"rgba(255,140,90,.4)");gl.addColorStop(1,"rgba(255,140,90,0)");v.fillStyle=gl;v.fillRect(x-r*2.1,y-r*2.1,r*4.2,r*4.2);
const sg=v.createLinearGradient(0,y-r,0,y+r*.4);sg.addColorStop(0,"#fff27a");sg.addColorStop(.55,"#ffa53a");sg.addColorStop(1,"#ff3d7f");v.fillStyle=sg;v.beginPath();v.arc(x,y,r,0,7);v.fill();
v.fillStyle=sky;for(let yy=y-r*.15,k=0;yy<hz;yy+=r*.16,k++)v.fillRect(x-r-1,yy,2*r+2,.8+k*.55)}
/* graffiti piece: extruded shadow, thick ink outline, gradient fill, drips */
function srTag(v,s,x,y,z,rot,c1,c2,al){v.save();v.translate(x,y);v.rotate(rot);v.font=z+"px "+FB;v.textAlign=al||"left";v.lineJoin="round";const w=v.measureText(s).width,x0=al=="center"?-w/2:0;
for(let i=5;i>0;i--){v.fillStyle=i>2?"#1a0626":"#3a0f4e";v.fillText(s,i*.8,i*1)}
v.lineWidth=z*.26;v.strokeStyle="#0a0610";v.strokeText(s,0,0);
const gr=v.createLinearGradient(0,-z*.75,0,z*.05);gr.addColorStop(0,c1);gr.addColorStop(1,c2);v.fillStyle=gr;v.fillText(s,0,0);
for(let k=0;k<6;k++){const dx=x0+w*(.08+k*.165),ln=z*(.12+((k*7)%5)*.07);v.fillStyle="#0a0610";v.fillRect(dx-1.6,-1,3.2,ln+1.4);v.beginPath();v.arc(dx,ln,2.1,0,7);v.fill();v.fillStyle=c2;v.fillRect(dx-.8,-1,1.6,ln);v.beginPath();v.arc(dx,ln,1.2,0,7);v.fill()}
v.fillStyle="rgba(255,255,255,.7)";v.fillRect(x0+w*.1,-z*.62,w*.18,1.2);v.restore()}
/* graffiti grade letter */
function srGrade(v,x,y,rk,k){if(k<=0)return;const col={S:"#ff3df0",A:"#3de8ff",B:"#7cff6b",C:"#ffb612"}[rk]||"#fff",s=1+(1-k)*.7;v.save();v.translate(x,y);v.rotate(-.22);v.scale(s,s);v.globalAlpha*=k;
v.font="22px "+FB;v.textAlign="center";v.lineJoin="round";v.lineWidth=7;v.strokeStyle="#0a0610";v.strokeText(rk,0,8);v.lineWidth=3.4;v.strokeStyle=col;v.strokeText(rk,0,8);v.fillStyle="#fff";v.fillText(rk,0,8);
if(rk=="S"){v.fillStyle="#ffd86a";v.strokeStyle="#0a0610";v.lineWidth=1.2;v.beginPath();v.moveTo(-7,-10);v.lineTo(-7,-16);v.lineTo(-3.5,-12.5);v.lineTo(0,-18);v.lineTo(3.5,-12.5);v.lineTo(7,-16);v.lineTo(7,-10);v.closePath();v.fill();v.stroke()}v.restore()}
/* gold name-plate for the best score */
function srPlate(v,x,y,s){v.save();v.font="900 8px "+FM;const w=v.measureText(s).width+12,q=v.createLinearGradient(0,y-6,0,y+5);q.addColorStop(0,"#fff0a8");q.addColorStop(.5,"#e8b83a");q.addColorStop(1,"#9a6a10");
vrr(x-w/2-1,y-7,w+2,13,4);v.fillStyle="#0a0610";v.fill();vrr(x-w/2,y-6,w,11,3.5);v.fillStyle=q;v.fill();v.fillStyle="#2a1600";v.textAlign="center";v.fillText(s,x,y+2.6);v.restore()}
/* ---------------- book parts (local coords: spine at x=0, centre y=0) ---------------- */
function srBoard(v,d){const x=d>0?0:-224;v.save();vrr(x,-126,224,252,d>0?[0,10,10,0]:[10,0,0,10]);const q=v.createLinearGradient(0,-126,0,126);q.addColorStop(0,"#231a26");q.addColorStop(1,"#0c080e");v.fillStyle=q;v.fill();
v.fillStyle="rgba(255,255,255,.05)";for(const[gx,gy,r]of SRG){v.beginPath();v.arc(d>0?gx:-gx,gy,r,0,7);v.fill()}srBandana(v,x,-126,224,252,11);v.restore()}
function srCover(v){srBoard(v,1);v.save();
v.fillStyle="#0c080e";v.fillRect(0,-126,9,252);v.fillStyle="#d9a441";v.fillRect(9,-126,1,252);v.fillRect(3,-126,.8,252);
srChain(v,24,-104,176,208);
const cx=112,cy=-26,r=50;v.save();v.beginPath();v.arc(cx,cy,r,0,7);v.clip();const sk=srSky(v,cy-r,cy+12);v.fillStyle=sk;v.fillRect(cx-r,cy-r,2*r,2*r);
v.fillStyle="#fff";for(let i=0;i<14;i++)v.fillRect(cx-r+(i*29.3%(2*r)),cy-r+4+(i*17.1%30),1.2,1.2);srSun(v,cx,cy+8,26,sk,cy+12);
v.fillStyle="#2a0f3a";for(let i=0;i<9;i++){const bw=8+(i*5%7),bh=4+(i*7%9);v.fillRect(cx-r+i*11,cy+12-bh,bw,bh)}
const gq=v.createLinearGradient(0,cy+12,0,cy+r);gq.addColorStop(0,"#3a1850");gq.addColorStop(1,"#14081c");v.fillStyle=gq;v.fillRect(cx-r,cy+12,2*r,r);v.fillStyle="#ffb070";v.fillRect(cx-r,cy+12,2*r,.8);
srPalm(v,cx-28,cy+14,34,-5,"#12051c");srPalm(v,cx+30,cy+14,26,4,"#12051c");srPalm(v,cx-14,cy+14,20,3,"#12051c");v.restore();
v.beginPath();v.arc(cx,cy,r+2,0,7);v.strokeStyle="#0a0610";v.lineWidth=6;v.stroke();v.strokeStyle="#e8b83a";v.lineWidth=3;v.stroke();v.strokeStyle="#fff0a8";v.lineWidth=.8;v.beginPath();v.arc(cx,cy,r+3,-2.6,-1.6);v.stroke();
srTag(v,"BREAD TRAIL",cx,56,25,-.05,"#fff27a","#ff8a1f","center");
for(let i=-1;i<=1;i++)starIcon(v,cx+i*16,84,i?3.4:4.6,1);v.restore()}
function srPaperEdge(v,d){v.fillStyle="#d8cfc0";for(let k=3;k>0;k--){v.fillRect(d>0?0:-212-k,-116+k*.6,212+k,232-k*1.2)}}
/* a blank turning leaf */
function srLeaf(v,ph,al){const c=Math.cos(ph),s=Math.sin(ph),d=c>=0?1:-1;v.save();v.globalAlpha*=al;v.transform(Math.abs(c),-d*s*.1,0,1,0,0);
const x=d>0?0:-212;v.fillStyle="#d8cfc0";v.fillRect(x-(d>0?0:1),-117,213,234);v.fillStyle="#17131c";v.fillRect(x,-116,212,232);
v.strokeStyle="rgba(255,255,255,.06)";v.lineWidth=1;for(let yy=-100;yy<110;yy+=16){v.beginPath();v.moveTo(x+12,yy);v.lineTo(x+200,yy+3);v.stroke()}
v.fillStyle="rgba(0,0,0,"+(.55*(1-Math.abs(c)))+")";v.fillRect(x,-116,212,232);v.restore()}
/* ---------------- the boulevard ----------------
   Road width follows perspective (wider near the bottom of the page, narrow toward the sunset horizon).
   Layers: sidewalks with slab joints + Walk-of-Fame stars, curbs, asphalt, white edge lines, double yellow line,
   crosswalks + a round plaza at every level, street lamps with warm glow and palm trees along the curb. */
const srW=y=>Math.max(4,4+(y-SRH)*.12);
function srNorm(i){const a=SRP[Math.max(0,i-1)],b=SRP[Math.min(SRP.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1;return[dx/d,dy/d,-dy/d,dx/d]}
function srEdge(m0,m1,k){const o=[];for(let i=m0;i<m1;i++){const q=SRP[i],n=srNorm(i),hw=srW(q[1])/2;o.push([q[0]+n[2]*hw*k,q[1]+n[3]*hw*k])}return o}
function srStrip(v,m0,m1,k,col,k2){const L=srEdge(m0,m1,k),Rr=srEdge(m0,m1,k2==null?-k:k2);if(L.length<2)return;v.beginPath();L.forEach((p,i)=>i?v.lineTo(p[0],p[1]):v.moveTo(p[0],p[1]));for(let i=Rr.length-1;i>=0;i--)v.lineTo(Rr[i][0],Rr[i][1]);v.closePath();v.fillStyle=col;v.fill()}
function srLine(v,m0,m1,k,col,lw,dash){const L=srEdge(m0,m1,k);if(L.length<2)return;v.beginPath();L.forEach((p,i)=>i?v.lineTo(p[0],p[1]):v.moveTo(p[0],p[1]));if(dash)v.setLineDash(dash);v.strokeStyle=col;v.lineWidth=lw;v.stroke();if(dash)v.setLineDash([])}
const srNearNode=(x,y,r)=>SRN.some(n=>Math.hypot(n.x-x,n.y-y)<r);
function srStreet(v,nS,ba){const main=SRN.length*24-23,m=Math.min(nS,main);v.lineJoin=v.lineCap="round";
/* unbuilt stretch toward the horizon: gravel track + a construction barrier */
if(nS>main){const e=Math.min(nS,SRP.length);v.globalAlpha=ba*.55;srStrip(v,main-1,e,1.15,"rgba(150,120,110,.45)");srLine(v,main-1,e,1.15,"rgba(255,255,255,.35)",.8,[2,3]);srLine(v,main-1,e,-1.15,"rgba(255,255,255,.35)",.8,[2,3]);v.globalAlpha=ba;
if(nS>main+5){const q=SRP[main+4],n=srNorm(main+4),hw=srW(q[1])/2;v.save();v.translate(q[0],q[1]);v.rotate(Math.atan2(n[3],n[2]));v.fillStyle="#0a0610";v.fillRect(-hw*1.3,-1.6,hw*2.6,3.2);for(let k=0;k<4;k++){v.fillStyle=k%2?"#fff":"#ff7a1a";v.fillRect(-hw*1.2+k*hw*.6,-1.1,hw*.6,2.2)}v.restore()}}
if(m<2)return;
srStrip(v,0,m,2.05,"#0a0610");
const sw=v.createLinearGradient(0,SRH,0,264);sw.addColorStop(0,"#6e6276");sw.addColorStop(1,"#a094a6");srStrip(v,0,m,1.92,sw);
v.strokeStyle="rgba(20,10,30,.28)";v.lineWidth=.6;v.beginPath();for(let i=1;i<m;i+=2){const q=SRP[i],n=srNorm(i),hw=srW(q[1])/2;for(const s of[-1,1]){v.moveTo(q[0]+n[2]*hw*1.3*s,q[1]+n[3]*hw*1.3*s);v.lineTo(q[0]+n[2]*hw*1.9*s,q[1]+n[3]*hw*1.9*s)}}v.stroke();
for(let i=3;i<m;i+=5){const q=SRP[i];if(srNearNode(q[0],q[1],20))continue;const n=srNorm(i),hw=srW(q[1])/2,s=(i/5|0)%2?1:-1,x=q[0]+n[2]*hw*1.6*s,y=q[1]+n[3]*hw*1.6*s,z=Math.max(1.6,hw*.3),lit=bkUnl(q[2]+1);
v.fillStyle=lit?"#c98496":"#5e5266";v.fillRect(x-z,y-z*.8,z*2,z*1.6);v.strokeStyle="rgba(10,6,16,.6)";v.lineWidth=.5;v.strokeRect(x-z,y-z*.8,z*2,z*1.6);
v.fillStyle=lit?"#ffd24a":"#8a7e94";starPath(v,x,y,z*.72,-Math.PI/2);v.fill()}
srStrip(v,0,m,1.34,"#3a3242");srStrip(v,0,m,1.24,"#b4a8b8");
const as=v.createLinearGradient(0,SRH,0,264);as.addColorStop(0,"#3a3442");as.addColorStop(1,"#26222c");srStrip(v,0,m,1.14,as);
srStrip(v,0,m,.45,"rgba(255,190,150,.04)");
v.fillStyle="rgba(255,255,255,.05)";for(let i=2;i<m;i+=3){const q=SRP[i],hw=srW(q[1])/2;v.fillRect(q[0]+((i*37)%7-3)*hw*.2,q[1]+((i*13)%5-2)*hw*.15,.8,.8)}
srLine(v,0,m,.96,"rgba(240,236,246,.85)",.8);srLine(v,0,m,-.96,"rgba(240,236,246,.85)",.8);srLine(v,0,m,.1,"#ffc93a",.75);srLine(v,0,m,-.1,"#ffc93a",.75);
/* crosswalks + plazas */
SRN.forEach((nd,i)=>{for(const c of[i*24-6,i*24+6]){if(c<1||c>=m||c>=main-1)continue;const q=SRP[c],n=srNorm(c),hw=srW(q[1])/2;v.strokeStyle="rgba(245,242,250,.9)";v.lineWidth=Math.max(.8,hw*.2);v.lineCap="butt";v.beginPath();
for(let k=-3;k<=3;k++){const cx=q[0]+n[2]*hw*.3*k,cy=q[1]+n[3]*hw*.3*k;v.moveTo(cx-n[0]*hw*.35,cy-n[1]*hw*.35);v.lineTo(cx+n[0]*hw*.35,cy+n[1]*hw*.35)}v.stroke();v.lineCap="round"}
if(nS>=i*24){const hw=srW(nd.y)/2,r=hw*2.25;v.fillStyle="#0a0610";v.beginPath();v.arc(nd.x,nd.y,r+1.2,0,7);v.fill();const pg=v.createRadialGradient(nd.x,nd.y-r*.3,1,nd.x,nd.y,r);pg.addColorStop(0,"#c2b6c6");pg.addColorStop(1,"#8a7e90");v.fillStyle=pg;v.beginPath();v.arc(nd.x,nd.y,r,0,7);v.fill();
v.strokeStyle="rgba(20,10,30,.25)";v.lineWidth=.6;v.beginPath();v.arc(nd.x,nd.y,r*.72,0,7);for(let k=0;k<12;k++){const a=k/12*6.283;v.moveTo(nd.x+Math.cos(a)*r*.72,nd.y+Math.sin(a)*r*.72);v.lineTo(nd.x+Math.cos(a)*r,nd.y+Math.sin(a)*r)}v.stroke()}});
/* street lamps + palms along the curb (far ones first) */
const props=[];for(let i=5;i<m;i+=9){const q=SRP[i];if(!srNearNode(q[0],q[1],24))props.push([i,(i/9|0)%2?1:-1,"lamp"])}
for(let i=10;i<m;i+=18){const q=SRP[i];if(!srNearNode(q[0],q[1],24))props.push([i,(i/9|0)%2?-1:1,"palm"])}
props.sort((a,b)=>SRP[a[0]][1]-SRP[b[0]][1]);
for(const[i,s,k]of props){const q=SRP[i],n=srNorm(i),hw=srW(q[1])/2,x=q[0]+n[2]*hw*2.15*s,y=q[1]+n[3]*hw*2.15*s,fa=Math.min(1,(m-i)/6);v.globalAlpha=ba*fa;
if(k=="palm")srPalm(v,x,y,hw*4.6,s*hw*.5,"#1c0a28");
else{const h=hw*3+5,gl=v.createRadialGradient(x,y-h,0,x,y-h,hw*2.4+4);gl.addColorStop(0,"rgba(255,214,150,.55)");gl.addColorStop(1,"rgba(255,214,150,0)");v.fillStyle=gl;v.beginPath();v.arc(x,y-h,hw*2.4+4,0,7);v.fill();
v.fillStyle="rgba(255,214,150,.09)";v.beginPath();v.ellipse(x-n[2]*hw*1.2*s,y-n[3]*hw*1.2*s,hw*1.6,hw*.55,0,0,7);v.fill();
v.strokeStyle="#140a1e";v.lineWidth=Math.max(.9,hw*.16);v.beginPath();v.moveTo(x,y);v.lineTo(x,y-h);v.lineTo(x-s*hw*.55,y-h-.5);v.stroke();v.fillStyle="#fff1c8";v.beginPath();v.arc(x-s*hw*.55,y-h+.6,Math.max(.9,hw*.16),0,7);v.fill()}}
v.globalAlpha=ba}
/* ---------------- page content (drawn in screen coords, clipped to one page) ---------------- */
function srContent(v,side,rev,t){const ba=v.globalAlpha,x0=side<0?44:256,x1=side<0?256:468,hz=SRH;v.save();v.translate(-256,-148);v.beginPath();v.rect(x0,32,x1-x0,232);v.clip();
const sk=srSky(v,32,hz);v.fillStyle=sk;v.fillRect(x0,32,x1-x0,hz-32);
v.fillStyle="#fff";for(let i=0;i<38;i++){const x=44+(i*97.3%424),y=36+(i*53.7%60),tw=Math.sin(frame*.06+i*1.7);if(tw>-.2){v.globalAlpha=ba*(.35+.65*tw);v.fillRect(x,y,tw>.8?2:1.2,tw>.8?2:1.2)}}v.globalAlpha=ba;
srSun(v,380,hz+2,40,sk,hz);
v.fillStyle="#2a0f3a";for(let i=0;i<20;i++){const bx=44+i*11.5,bh=5+((i*7)%6)*3.2+(i%5==2?10:0);v.fillRect(bx,hz-bh,9+(i%3),bh);if(i%4==1){v.fillStyle="#ffcf6a";v.fillRect(bx+3,hz-bh+3,1.2,1.2);v.fillStyle="#2a0f3a"}}
const gq=v.createLinearGradient(0,hz,0,264);gq.addColorStop(0,"#3a1850");gq.addColorStop(1,"#120818");v.fillStyle=gq;v.fillRect(x0,hz,x1-x0,264-hz);v.fillStyle="#ffb070";v.fillRect(x0,hz,x1-x0,1);
v.strokeStyle="rgba(255,120,200,.12)";v.lineWidth=1;v.beginPath();for(let k=-6;k<=14;k++){v.moveTo(256,hz);v.lineTo(256+(k-4)*70,268)}for(let yy=hz+6,s=4;yy<264;s*=1.45,yy+=s){v.moveTo(x0,yy);v.lineTo(x1,yy)}v.stroke();
for(const[px,ph,pl]of[[62,46,-6],[104,30,5],[232,40,-4],[286,26,4],[464,44,-5]])srPalm(v,px,hz+2,ph,pl,"#12051c");
/* the boulevard draws itself */
srStreet(v,Math.floor(rev*SRP.length),ba);const nS=Math.floor(rev*SRP.length);
/* future spot */
if(nS>=SRP.length-1){v.globalAlpha=ba*.6;v.setLineDash([3,3]);v.strokeStyle="#fff";v.lineWidth=1.5;v.beginPath();v.arc(SRF.x,SRF.y,11,0,7);v.stroke();v.setLineDash([]);luIt("?",SRF.x,SRF.y+5,13,"#fff","center",900);luIt("SOON",SRF.x,SRF.y+24,8,"#e8e6f0","center",900);v.globalAlpha=ba}
/* level stops */
SRN.forEach((q,i)=>{const pk=bkEo((nS-i*24)/12);if(pk<=0)return;const un=bkUnl(i),rec=LVR[i],hv=t>=SRO&&(lb.hov=="bk"+i||(lb.hov.slice(0,2)!="bk"&&lb.bsel==i)),s=pk*(hv&&un?1.15:1);
v.save();v.translate(q.x,q.y);v.scale(s,s);if(!un)v.globalAlpha=ba*.7;
if(un){const gl=v.createRadialGradient(0,0,4,0,0,26);gl.addColorStop(0,"rgba(255,210,90,"+(hv?.6:.35)+")");gl.addColorStop(1,"rgba(255,210,90,0)");v.fillStyle=gl;v.beginPath();v.arc(0,0,26,0,7);v.fill()}
starIcon(v,0,0,15,un&&rec?1:0);
if(un&&!rec){starPath(v,0,0,15,-Math.PI/2);v.strokeStyle=frame%40<20?"#ffd24a":"#fff2a8";v.lineWidth=2;v.stroke()}
if(!un){v.fillStyle="#cfc6d8";v.beginPath();srrV(v,-5,-1,10,8,1.5);v.fill();v.strokeStyle="#cfc6d8";v.lineWidth=2;v.beginPath();v.arc(0,-1.5,3.4,Math.PI,0);v.stroke();v.fillStyle="#2a1a2a";v.fillRect(-.8,1.5,1.6,3)}
else luIt(i?""+i:"GO",0,4,i?11:8,rec?DKT:"#fff","center",900);
if(lb.go>0&&lb.goLv==i){const u=luC(lb.go/20);v.globalAlpha=ba*(1-u);v.strokeStyle="#fff2a8";v.lineWidth=3;v.beginPath();v.arc(0,0,16+u*40,0,7);v.stroke()}
v.restore();
v.globalAlpha=ba*Math.min(1,pk);luIt(bkName(i),q.x,q.y+30,9,un?"#fff":"#9a8aa8","center",900);
if(rec&&i>0){srGrade(v,q.x+27,q.y-16,rec.r||"-",bkEo((nS-i*24-8)/12));srPlate(v,q.x,q.y+42,(rec.s||0).toLocaleString("en-US"));if(rec.st)starIcon(v,q.x-24,q.y-16,4,1)}
else if(rec&&i==0)luIt("CLEARED",q.x,q.y+42,8,"#7cff6b","center",900);v.globalAlpha=ba});
if(side<0)srTag(v,"BREAD TRAIL",58,70,26,-.05,"#fff27a","#ff8a1f");
if(side>0&&t>=SRO&&!lb.bkc){const cx=SRX[0]+10,cy=SRX[1]+10,h=lb.hov=="bkx";v.lineCap="round";for(const[lw,col]of[[6,"#0a0610"],[2.8,h?HL:"#fff"]]){v.strokeStyle=col;v.lineWidth=lw;v.beginPath();v.moveTo(cx-5,cy-5);v.lineTo(cx+5,cy+5);v.moveTo(cx+5,cy-5);v.lineTo(cx-5,cy+5);v.stroke()}}
v.restore();
v.save();const sp=v.createLinearGradient(side<0?-22:22,0,0,0);sp.addColorStop(0,"rgba(0,0,0,0)");sp.addColorStop(1,"rgba(0,0,0,.55)");v.fillStyle=sp;v.fillRect(side<0?-22:0,-116,22,232);v.restore()}
/* ---------------- the open/close animation ---------------- */
/* opens straight onto the star-road page: a short smooth zoom from the floor book, no cover / page turns */
/* clean open: the book fades in while easing from 95% to full size and settling up a few pixels; closing reverses it */
function bookUI(a){const v=vg,t=lb.bkT,cl=lb.bkc;let fz,oe=1,fl=1,rev=1;
if(cl)fz=1-ez(luC(cl/12));else fz=ciEo(t/18);
const sc=.95+.05*fz,cx=256,cy=148+(1-fz)*6,th=oe*Math.PI,c=Math.cos(th),s=Math.sin(th);
v.save();v.globalAlpha=a;v.fillStyle="rgba(8,4,16,"+.66*fz+")";v.fillRect(0,0,W,H);
if(fz>.05){const gl=v.createRadialGradient(256,150,20,256,150,260);gl.addColorStop(0,"rgba(255,120,90,"+.16*fz+")");gl.addColorStop(1,"rgba(255,120,90,0)");v.fillStyle=gl;v.fillRect(0,0,W,H)}
v.globalAlpha=a*fz;v.translate(cx,cy);v.scale(sc,sc);
v.fillStyle="rgba(0,0,0,.4)";v.beginPath();v.ellipse(112*(1-oe),132,120+112*oe,9,0,0,7);v.fill();
srBoard(v,1);srPaperEdge(v,1);v.fillStyle="#17131c";v.fillRect(0,-116,212,232);if(oe>.3)srContent(v,1,rev,t);
if(th>Math.PI/2){v.save();v.transform(-c,s*.06,0,1,0,0);srBoard(v,-1);srPaperEdge(v,-1);v.fillStyle="#17131c";v.fillRect(-212,-116,212,232);srContent(v,-1,rev,t);v.fillStyle="rgba(0,0,0,"+(.5*s)+")";v.fillRect(-224,-126,224,252);v.restore()}
for(let k=0;k<2;k++){const u=luC(fl*1.5-k*.5);if(u>0&&u<1)srLeaf(v,ez(u)*Math.PI,1-luC((u-.8)/.2))}
if(th<=Math.PI/2){v.save();v.transform(c,-s*.06,0,1,0,0);srCover(v);v.fillStyle="rgba(0,0,0,"+(.5*s)+")";v.fillRect(0,-126,224,252);v.restore()}
v.restore()}
/* book sound kit: soft paper, leather and bells */
const bkS={
whoosh(o){noiz(.4,"lowpass",o?1000:320,o?260:1100,.028,0,.7)},
creak(){noiz(.5,"bandpass",240,480,.022,0,5);sfx(130,.35,"sine",.018,105)},
thud(){sfx(115,.16,"sine",.06,62);noiz(.08,"lowpass",480,150,.03,0,.7)},
flip(){noiz(.16,"bandpass",2400,1000,.024,0,1.1);noiz(.05,"highpass",4200,4200,.008,.1,1)},
star(i){const f=[659,784,988,1319][i%4];sfx(f,.5,"sine",.03);sfx(f*2,.35,"sine",.008,0,.015);sfx(f*1.5,.4,"sine",.006,0,.05)},
stamp(d){sfx(150,.12,"sine",.04,85,d);noiz(.05,"lowpass",800,260,.02,d,.8)},
tick(){sfx(1480,.03,"sine",.012,1320)},
pick(){[523,659,784].forEach((f,i)=>sfx(f,.45,"sine",.03,0,i*.06));noiz(.35,"lowpass",300,1000,.02,.05,.7)}};
/* timers + sounds (called from lobbyUpd) */
function bookTick(){if(lb.bkc){const c=++lb.bkc;if(c==2)bkS.flip();if(c>13){lb.bk=0;lb.bkc=0}return}
const t=++lb.bkT;if(t==2)bkS.flip();if(t==12)bkS.star(1);
if(t>=SRO&&lb.hov!=lb.bkh){if(lb.hov&&lb.hov.slice(0,2)=="bk"&&lb.hov!="bkx")bkS.tick();lb.bkh=lb.hov}if(t>400)lb.bkT=400}
/* ---------------- the closed book on the floor (room canvas g) ---------------- */
function bookDraw(){const x=322,y=271,hv=S=="lobby"&&lb.hov=="book",lf=hv?2.5:0,L=u=>[-14+3*u,-2-7*u],Rr=u=>[12+3*u,-4.5-7*u];
g.fillStyle="rgba(10,6,20,.35)";g.beginPath();g.ellipse(x+1,y+3,16,3,0,0,7);g.fill();
g.save();g.translate(x,y-lf);g.rotate(-.1);
ssh(()=>{g.moveTo(-14,-2);g.lineTo(12,-4.5);g.lineTo(12.5,-.5);g.lineTo(-13.5,2);g.closePath()},"#f2e6c8",1);
sln(()=>{g.moveTo(-12,-.6);g.lineTo(11.5,-3);g.moveTo(-12,.9);g.lineTo(11.5,-1.6)},"#c8b48a",.5);
ssh(()=>{g.moveTo(-14,-2);g.lineTo(12,-4.5);g.lineTo(15,-11.5);g.lineTo(-11,-9);g.closePath()},"#17121a",1.2);
g.fillStyle=BND;g.beginPath();const a0=L(.1),a1=Rr(.1),a2=Rr(.3),a3=L(.3);g.moveTo(...a0);g.lineTo(...a1);g.lineTo(...a2);g.lineTo(...a3);g.closePath();g.fill();
g.fillStyle="#fff";for(let k=0;k<6;k++){const u=(k+.5)/6,p0=L(.2),p1=Rr(.2);g.fillRect(p0[0]+(p1[0]-p0[0])*u-.4,p0[1]+(p1[1]-p0[1])*u-.4,.9,.9)}
ssh(()=>{g.moveTo(-14,-2);g.lineTo(-11,-9);g.lineTo(-13.4,-9.2);g.lineTo(-16.2,-2.2);g.closePath()},"#0c080e",1);
const ex=1.6,ey=-8.2,sg=g.createLinearGradient(0,ey-2.6,0,ey+2.6);sg.addColorStop(0,"#fff27a");sg.addColorStop(1,"#ff3d7f");g.fillStyle=sg;g.beginPath();g.ellipse(ex,ey,3.4,2.2,-.1,0,7);g.fill();g.strokeStyle="#e8b83a";g.lineWidth=.9;g.stroke();
g.strokeStyle="#12051c";g.lineWidth=.7;g.beginPath();g.moveTo(ex-1,ey+2);g.lineTo(ex-.6,ey-1.4);g.moveTo(ex-.6,ey-1.4);g.lineTo(ex-2.4,ey-.6);g.moveTo(ex-.6,ey-1.4);g.lineTo(ex+1.2,ey-.8);g.stroke();
g.fillStyle="#e8b83a";for(const u of[0,1]){const pL=L(u),pR=Rr(u);g.fillRect(pL[0]-.5,pL[1]-.5,1.6,1.2);g.fillRect(pR[0]-1,pR[1]-.5,1.6,1.2)}g.restore();
if(S=="lobby"&&!lb.bk&&(frame%150<24||hv)){const k=hv?1:Math.sin((frame%150)/24*Math.PI),sx=x+12,sy=y-16-lf,r=3.2*k;g.fillStyle="rgba(255,244,200,"+k+")";g.beginPath();g.moveTo(sx,sy-r);g.quadraticCurveTo(sx,sy,sx+r,sy);g.quadraticCurveTo(sx,sy,sx,sy+r);g.quadraticCurveTo(sx,sy,sx-r,sy);g.quadraticCurveTo(sx,sy,sx,sy-r);g.fill()}}
/* ---------------- input ---------------- */
function bookHot(x,y){if(lb.bkT<SRO||lb.bkc)return"";if(inR(x,y,SRX))return"bkx";for(let i=0;i<SRN.length;i++){const q=SRN[i];if(bkUnl(i)&&Math.hypot(x-q.x,y-q.y)<19)return"bk"+i}return""}
function bookOpen(){lb.bk=1;lb.bkT=0;lb.bkc=0;lb.look=-1;lb.rad=0;let b=0;for(let i=0;i<SRN.length;i++)if(bkUnl(i))b=i;lb.bsel=b;lb.bkh=""}
function bookClose(){if(!lb.bk||lb.bkc)return;lb.bkc=1}
function bookPlay(i){if(!bkUnl(i)||lb.bkT<SRO||lb.bkc||lb.go)return;lb.goLv=i;lb.ms=0;lb.go=1;bkS.pick()}
function bookKeys(){if(pr("Escape","Backspace","KeyQ","KeyB")){bookClose();return}if(lb.bkT<SRO||lb.bkc)return;
const n=SRN.length;if(pr("ArrowLeft","KeyA","ArrowDown","KeyS")){for(let k=1;k<=n;k++){const j=(lb.bsel-k+n)%n;if(bkUnl(j)){lb.bsel=j;break}}bkS.tick()}
if(pr("ArrowRight","KeyD","ArrowUp","KeyW")){for(let k=1;k<=n;k++){const j=(lb.bsel+k)%n;if(bkUnl(j)){lb.bsel=j;break}}bkS.tick()}
if(pr("Enter","Space","KeyE"))bookPlay(lb.bsel)}
