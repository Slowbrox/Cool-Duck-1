/* =====================================================================
   Grassland look + natural level pieces for World 1 (S=="play")
   Lots of grass, a light Japanese touch, kept sparse: a far snow-capped peak, rolling hills, round leafy
   trees, a few cherry trees, a torii as a landmark, stone lanterns at the rest areas.
   - bgField(c)       sky + parallax background            - gtField(x) / gtEdges(q)  ground tiles + rounded pit edges
   - hillDraw(q)      natural hill block, kind "h" (rounded grassy top, rocky earth, stones, roots);
                      q.cv = 1 makes it a cave ceiling (dark tunnel below, roots hanging down)
   - isleDraw(q)      floating grass island (one-way platforms that are not bubbles)
   - wreathDraw(c,q)  the scarf anchor in the levels: a flower wreath hanging on a vine
   - kuriDraw(e)      spiky chestnut enemy (e.sp): stomping it hurts, only an egg beats it
   - fieldDeco(c)     the few props of the level (LVD)       - lvPost()  per-level setup after start()
   sakuraTree / matsuTree / toriiDraw / toroDraw / leafTree(x, ground y, scale) are also used by the world map.
   ===================================================================== */
const LVD={1:[["torii",3.5],["sakura",11],["leaf",34],["toro",64],["sakura",66.5],["leaf",103],["toro",109],["sakura",128.5,2],["sakura",156],["leaf",184],["sakura",203]],
2:[["torii",4.5],["sakura",14],["toro",56],["sakura",60],["leaf",92],["toro",114],["sakura",124],["sakura",148,4],["leaf",178],["sakura",197]],
3:[["matsu",5],["matsu",46,3],["toro",52],["leaf",91],["toro",98],["matsu",144,3],["leaf",166],["matsu",176],["torii",199]]};
const FINK="#2a2238";
function lvPost(){ECLR=0}
/* ---------------- trees + props ---------------- */
function sakuraTree(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.lineCap="round";
for(const[c,w]of[[FINK,9],["#5a3a2e",5.5]]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(0,0);g.bezierCurveTo(-3,-16,6,-26,1,-40);g.moveTo(2,-28);g.lineTo(-14,-40);g.moveTo(3,-34);g.lineTo(16,-44);g.stroke()}
const B=[[0,-52,21],[-19,-42,15],[19,-45,16],[-8,-64,13],[11,-62,13]];
for(const[bx,by,r]of B){g.fillStyle=FINK;g.beginPath();g.arc(bx,by,r+1.6,0,7);g.fill()}
for(const[bx,by,r]of B){g.fillStyle="#f08ab4";g.beginPath();g.arc(bx,by+2,r,0,7);g.fill()}
for(const[bx,by,r]of B){g.fillStyle="#ffb2d0";g.beginPath();g.arc(bx-1,by-1,r*.86,0,7);g.fill()}
for(const[bx,by,r]of B){g.fillStyle="#ffd6e8";g.beginPath();g.arc(bx-r*.35,by-r*.4,r*.32,0,7);g.fill()}g.restore()}
/* round leafy tree (no conifers anywhere) */
function leafTree(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.lineCap="round";
for(const[c,w]of[[FINK,9],["#6a4a32",5.5]]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(2,-18,-1,-34);g.stroke()}
const B=[[0,-50,20],[-17,-40,14],[17,-41,15],[-6,-62,13],[9,-60,12]];
for(const[bx,by,r]of B){g.fillStyle=FINK;g.beginPath();g.arc(bx,by,r+1.6,0,7);g.fill()}
for(const[bx,by,r]of B){g.fillStyle="#2f7d3e";g.beginPath();g.arc(bx,by+2,r,0,7);g.fill()}
for(const[bx,by,r]of B){g.fillStyle="#4caa48";g.beginPath();g.arc(bx-1,by-1,r*.86,0,7);g.fill()}
for(const[bx,by,r]of B){g.fillStyle="#8ad86e";g.beginPath();g.arc(bx-r*.35,by-r*.4,r*.3,0,7);g.fill()}g.restore()}
/* Japanese black pine: crooked trunk, flat cloud-like needle pads */
function matsuTree(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.lineCap="round";
for(const[c,w]of[[FINK,10],["#6a4a3a",6.5]]){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(0,0);g.bezierCurveTo(-8,-18,12,-30,2,-50);g.stroke();g.lineWidth=w*.6;g.beginPath();g.moveTo(1,-28);g.quadraticCurveTo(-10,-30,-20,-38);g.moveTo(4,-40);g.quadraticCurveTo(12,-44,22,-46);g.stroke()}
const PD=[[-21,-40,15,5.5],[22,-48,14,5.5],[2,-58,17,6.5],[-6,-30,10,4.5]];
for(const[px,py,rx,ry]of PD){g.fillStyle=FINK;g.beginPath();g.ellipse(px,py,rx+1.6,ry+1.6,0,0,7);g.fill()}
for(const[px,py,rx,ry]of PD){g.fillStyle="#2f6a4a";g.beginPath();g.ellipse(px,py,rx,ry,0,0,7);g.fill();g.fillStyle="#4f9a5e";g.beginPath();g.ellipse(px-1,py-1.6,rx*.8,ry*.55,0,0,7);g.fill()}g.restore()}
function toriiDraw(x,y,s){g.save();g.translate(x,y);g.scale(s,s);
for(const px of[-22,16]){R(px-1,-56,8,56,FINK);R(px,-55,6,55,"#d8312a");R(px+4,-55,2,55,"#a8221c");R(px-2,-7,10,7,FINK)}
R(-30,-46,60,6,FINK);R(-29,-45,58,4,"#d8312a");R(-4,-56,8,11,FINK);R(-3,-55,6,9,"#f4ecd8");
g.fillStyle=FINK;g.beginPath();g.moveTo(-38,-62);g.quadraticCurveTo(0,-54,38,-62);g.lineTo(36,-53);g.quadraticCurveTo(0,-47,-36,-53);g.closePath();g.fill();
g.fillStyle="#d8312a";g.beginPath();g.moveTo(-34,-55.5);g.quadraticCurveTo(0,-49,34,-55.5);g.lineTo(33,-52.5);g.quadraticCurveTo(0,-47.5,-33,-52.5);g.closePath();g.fill();g.restore()}
/* stone lantern with a warm light */
function toroDraw(x,y,s){g.save();g.translate(x,y);g.scale(s,s);
g.save();g.globalCompositeOperation="lighter";const gl=g.createRadialGradient(0,-23,1,0,-23,18);gl.addColorStop(0,"rgba(255,214,140,.55)");gl.addColorStop(1,"rgba(255,214,140,0)");g.fillStyle=gl;g.fillRect(-18,-41,36,36);g.restore();
R(-9,-5,18,5,FINK);R(-8,-4,16,3,"#9a9a92");R(-4,-19,8,15,FINK);R(-3,-18,6,14,"#b4b4ac");R(-8,-30,16,12,FINK);R(-7,-29,14,10,"#a9a9a0");R(-4,-27,8,6,"#ffd86a");
g.fillStyle=FINK;g.beginPath();g.moveTo(-12,-29);g.lineTo(0,-38);g.lineTo(12,-29);g.closePath();g.fill();g.fillStyle="#8a8a82";g.beginPath();g.moveTo(-10,-30);g.lineTo(0,-36.5);g.lineTo(10,-30);g.closePath();g.fill();
g.fillStyle=FINK;g.beginPath();g.arc(0,-39,2.6,0,7);g.fill();g.restore()}
function fieldDeco(c){for(const[k,tx,row]of LVD[LV]||[]){const x=tx*T,y=row?row*T:224;if(x<c-80||x>c+W+80)continue;
k=="torii"?toriiDraw(x,y,1):k=="toro"?toroDraw(x,y,1):k=="sakura"?sakuraTree(x,y,1.05):k=="leaf"?leafTree(x,y,1.1):matsuTree(x,y,1.1)}}
/* ---------------- background ---------------- */
function fieldHills(c,f,base,amp,s,col,top){const o=c*f,hy=sx=>{const x=sx+o;return 224-base-Math.sin(x*.005+s)*amp-Math.sin(x*.013+s*2)*amp*.5};g.fillStyle=col;g.beginPath();g.moveTo(0,224);for(let sx=0;sx<=W+8;sx+=8)g.lineTo(sx,hy(sx));g.lineTo(W,224);g.closePath();g.fill();
if(top){g.strokeStyle=top;g.lineWidth=2;g.beginPath();for(let sx=0;sx<=W+8;sx+=8)sx?g.lineTo(sx,hy(sx)+1):g.moveTo(sx,hy(sx)+1);g.stroke()}}
function fieldPeak(c){const x=330-c*.02,t=62,b=196;g.fillStyle="#a7c2e2";g.beginPath();g.moveTo(x-230,b);g.quadraticCurveTo(x-70,b-40,x-26,t);g.lineTo(x+26,t);g.quadraticCurveTo(x+70,b-40,x+230,b);g.closePath();g.fill();
g.fillStyle="#93b2d8";g.beginPath();g.moveTo(x+26,t);g.quadraticCurveTo(x+70,b-40,x+230,b);g.lineTo(x+60,b);g.quadraticCurveTo(x+30,b-60,x+8,t);g.closePath();g.fill();
g.fillStyle="#f6f9ff";g.beginPath();g.moveTo(x-26,t);g.lineTo(x+26,t);g.lineTo(x+40,t+22);g.lineTo(x+28,t+18);g.lineTo(x+20,t+28);g.lineTo(x+8,t+20);g.lineTo(x-4,t+30);g.lineTo(x-14,t+19);g.lineTo(x-26,t+27);g.lineTo(x-40,t+22);g.closePath();g.fill()}
/* hazy round treetops in the distance (parallax) */
function fieldTrees(c,f,sp,sd,dk,lt){const o=c*f,j0=Math.floor(o/sp)-1;for(let j=j0;j<j0+W/sp+3;j++){if(hzf(j+sd)<.3)continue;const x=j*sp+hzf(j+sd+1)*sp*.6-o,r=10+hzf(j+sd+2)*10,y=226-r*.9;
R(x-1.5,y,3,226-y,dk);g.fillStyle=dk;g.beginPath();g.arc(x,y-r*.5,r,0,7);g.arc(x-r*.7,y-r*.1,r*.7,0,7);g.arc(x+r*.7,y-r*.15,r*.75,0,7);g.fill();g.fillStyle=lt;g.beginPath();g.arc(x-r*.3,y-r*.8,r*.45,0,7);g.fill()}}
function fieldPinesBg(c){const o=c*.6,sp=300,j0=Math.floor(o/sp)-1;g.save();g.globalAlpha=.75;for(let j=j0;j<j0+W/sp+3;j++){if(hzf(j+410)<.4)continue;matsuTree(j*sp+hzf(j+420)*140-o,226,.8+hzf(j+430)*.25)}g.restore()}
function bgField(c){g.fillStyle=sky2;g.fillRect(0,0,W,224);
const sx=400-c*.03,gr=g.createRadialGradient(sx,62,2,sx,62,70);gr.addColorStop(0,"rgba(255,250,220,1)");gr.addColorStop(.2,"rgba(255,242,190,.9)");gr.addColorStop(1,"rgba(255,242,190,0)");g.fillStyle=gr;g.fillRect(sx-70,0,140,132);
sunShafts(c);cloudsNew(c);fieldPeak(c);g.fillStyle=HAZE;g.fillRect(0,110,W,114);
fieldHills(c,.12,40,14,1.3+LV,"#9ccfa6");fieldTrees(c,.22,46,LV*31,"#7fb592","#94c6a4");
fieldHills(c,.3,22,10,3.9+LV,"#79c27a","#9be08f");midHaze();
if(LV==3)fieldPinesBg(c);else sakura(c);bushes(c);R(0,224,W,64,"#1c1530")}
/* ---------------- ground ---------------- */
function gtField(x){const n=x/T|0,hz=hzf;R(x,224,T,64,"#7a4e2c");for(let r=0;r<3;r++)R(x,236+r*17,T,3,r%2?"#6a4224":"#86583a");
for(let k=0;k<2;k++){const h=hz(n*7.3+k*3.1);if(h>.45)R(x+3+(hz(n*3+k)*22|0),241+k*20+(h*6|0),5,3,"#9a7a5e")}R(x,282,T,6,"#5a3820");
R(x,219,T,10,"#4caa48");R(x,219,T,2,"#9be07f");R(x,227,T,2,"#2f7d3e");
for(let k=0;k<T;k+=3){const q=hz((x+k)*.37);if(q>.4)R(x+k,214+(q*4|0),1+(q>.8),7-(q*3|0),q>.7?"#7fd86a":"#5fc15a")}
if(hz(n*1.9)>.8)R(x+8+(hz(n)*14|0),216,2,2,hz(n*2.2)>.5?"#fff":"#ffc2d4")}
/* rounded grass + rocky edge where a ground stretch meets a pit */
function gtEdges(q){for(const[ex,d]of[[q.x,-1],[q.x+q.w,1]]){if(ex<=0||ex>=WW)continue;g.fillStyle=FINK;g.beginPath();g.moveTo(ex,226);g.quadraticCurveTo(ex+d*5,240,ex+d*1,260);g.lineTo(ex+d*4,290);g.lineTo(ex-d*6,290);g.lineTo(ex-d*6,226);g.fill();
g.fillStyle="#5a3820";g.beginPath();g.moveTo(ex-d*1,228);g.quadraticCurveTo(ex+d*3,240,ex-d*1,262);g.lineTo(ex+d*2,290);g.lineTo(ex-d*6,290);g.lineTo(ex-d*6,228);g.fill();
g.fillStyle=FINK;g.beginPath();g.ellipse(ex-d*2,223,7,6.5,0,0,7);g.fill();g.fillStyle="#4caa48";g.beginPath();g.ellipse(ex-d*2.5,222,5.6,5,0,0,7);g.fill();g.fillStyle="#9be07f";g.fillRect(ex-d*2.5-3,218,5,2)}}
/* ---------------- natural hill block ---------------- */
function hillPath(q,o){const{x,y,w}=q,h=Math.min(q.h,300-y),bot=y+h,r=Math.min(12,w/3),wob=(s,yy)=>s*Math.sin(yy*.09+x*.3)*1.6;
g.beginPath();g.moveTo(x-o,y+r);g.quadraticCurveTo(x-o,y-o,x+r,y-o);g.lineTo(x+w-r,y-o);g.quadraticCurveTo(x+w+o,y-o,x+w+o,y+r);
for(let yy=y+r;yy<bot;yy+=8)g.lineTo(x+w+o+wob(1,yy),yy);
if(q.cv){g.quadraticCurveTo(x+w+o,bot+5+o,x+w-r,bot+5+o);for(let xx=x+w-r;xx>x+r;xx-=8)g.lineTo(xx,bot+4+o+Math.sin(xx*.21)*2);g.quadraticCurveTo(x-o,bot+5+o,x-o,bot-4)}
else{g.lineTo(x+w+o,bot+24);g.lineTo(x-o,bot+24)}
for(let yy=Math.min(bot,y+h)-4;yy>y+r;yy-=8)g.lineTo(x-o+wob(-1,yy),yy);g.closePath()}
function hillDraw(q){const{x,y,w}=q,h=Math.min(q.h,300-y),bot=y+h,hz=hzf;
if(q.cv){const cg=g.createLinearGradient(0,bot,0,224);cg.addColorStop(0,"#140c0a");cg.addColorStop(1,"#3a2618");g.fillStyle=cg;g.fillRect(x+3,bot,w-6,224-bot)}
hillPath(q,1.6);g.fillStyle=FINK;g.fill();hillPath(q,0);const eg=g.createLinearGradient(0,y,0,Math.min(bot,y+150));eg.addColorStop(0,"#9a663c");eg.addColorStop(1,"#5e3a1e");g.fillStyle=eg;g.fill();
g.save();hillPath(q,0);g.clip();
g.strokeStyle="rgba(60,34,16,.35)";g.lineWidth=2;for(let yy=y+18;yy<bot;yy+=17){g.beginPath();for(let xx=x;xx<=x+w;xx+=8)xx==x?g.moveTo(xx,yy+Math.sin(xx*.08+yy)*2):g.lineTo(xx,yy+Math.sin(xx*.08+yy)*2);g.stroke()}
for(let k=0;k<w/T*2;k++){const hh=hz(x*.1+k*3.3+y);if(hh<.35)continue;const sx=x+7+hz(x+k*7)*(w-18),sy=y+18+hh*Math.max(4,Math.min(h,110)-28);g.fillStyle=FINK;g.beginPath();g.ellipse(sx,sy,4.8,3.6,0,0,7);g.fill();g.fillStyle="#b49a80";g.beginPath();g.ellipse(sx,sy,3.7,2.5,0,0,7);g.fill();g.fillStyle="#d4bfa6";g.fillRect(sx-2,sy-1.6,2,1)}
g.fillStyle="rgba(30,15,5,.28)";g.fillRect(x+w-7,y,9,h+30);g.fillStyle="rgba(255,225,190,.08)";g.fillRect(x-2,y,6,h+30);
g.strokeStyle="#4a2e18";g.lineWidth=1;for(let k=0;k<w/12;k++){const rx=x+6+k*12+hz(x+k)*5;g.beginPath();g.moveTo(rx,y+5);g.quadraticCurveTo(rx+3,y+11,rx-1,y+15+hz(k+x)*7);g.stroke()}g.restore();
if(q.cv){g.strokeStyle="#4a2e18";g.lineWidth=1.2;for(let k=0;k<w/9;k++){const rx=x+8+k*9+hz(x*.3+k)*4,l=4+hz(k*5+x)*9;g.beginPath();g.moveTo(rx,bot+3);g.quadraticCurveTo(rx+2,bot+3+l*.5,rx-1,bot+3+l);g.stroke()}}
/* grass cap: overhangs the edges a little, rounded ends, a few drips + tufts */
const gp=o=>{g.beginPath();g.moveTo(x-3-o,y+5);g.quadraticCurveTo(x-3-o,y-5-o,x+6,y-5-o);g.lineTo(x+w-6,y-5-o);g.quadraticCurveTo(x+w+3+o,y-5-o,x+w+3+o,y+5);
for(let xx=x+w+3;xx>x-3;xx-=6)g.lineTo(xx,y+6+o+(hz(xx*.7+y)>.7?4:0)+Math.sin(xx*.5)*1);g.closePath()};
gp(1.4);g.fillStyle=FINK;g.fill();gp(0);g.fillStyle="#4caa48";g.fill();R(x+3,y-4,w-6,2,"#9be07f");R(x-1,y+3,w+2,2,"#2f7d3e");
for(let k=2;k<w-2;k+=3){const qq=hz((x+k)*.41+y);if(qq>.5)R(x+k,y-8+(qq*4|0),1+(qq>.85),6-(qq*3|0),qq>.72?"#7fd86a":"#5fc15a")}
for(let k=0;k<w/T;k++){if(hz(x*.13+k+y)>.7)R(x+8+k*T+(hz(k+y)*14|0),y-7,2,2,hz(k*3+x)>.5?"#fff":"#ffc2d4")}}
/* floating grass island (non-bubble one-way platform) */
function isleDraw(q){const{x,y,w}=q,hz=hzf,body=o=>{g.beginPath();g.moveTo(x-1-o,y+2);g.quadraticCurveTo(x+w*.12,y+15+o,x+w*.42,y+22+o);g.quadraticCurveTo(x+w*.6,y+26+o,x+w*.78,y+18+o);g.quadraticCurveTo(x+w*.95,y+11,x+w+1+o,y+2);g.closePath()};
g.fillStyle="rgba(20,40,20,.18)";g.beginPath();g.ellipse(x+w/2,y+34,w*.35,3,0,0,7);g.fill();
body(1.5);g.fillStyle=FINK;g.fill();body(0);g.fillStyle="#7a4e2c";g.fill();g.save();body(0);g.clip();g.fillStyle="#5e3a1e";g.fillRect(x,y+13,w,20);g.fillStyle="#b49a80";for(let k=0;k<w/T;k++)if(hz(x+k)>.4){g.beginPath();g.ellipse(x+10+k*T+hz(k)*10,y+9,3,2,0,0,7);g.fill()}g.restore();
g.strokeStyle="#4a2e18";g.lineWidth=1;for(let k=0;k<3;k++){const rx=x+w*(.3+k*.18);g.beginPath();g.moveTo(rx,y+16+k*2);g.quadraticCurveTo(rx+3,y+24+k*2,rx,y+30+hz(x+k)*6);g.stroke()}
g.fillStyle=FINK;g.beginPath();g.moveTo(x-3,y+4);g.quadraticCurveTo(x-3,y-5,x+5,y-5);g.lineTo(x+w-5,y-5);g.quadraticCurveTo(x+w+3,y-5,x+w+3,y+4);g.closePath();g.fill();
g.fillStyle="#4caa48";g.beginPath();g.moveTo(x-1.6,y+3);g.quadraticCurveTo(x-1.6,y-3.8,x+5,y-3.8);g.lineTo(x+w-5,y-3.8);g.quadraticCurveTo(x+w+1.6,y-3.8,x+w+1.6,y+3);g.closePath();g.fill();R(x+2,y-3,w-4,2,"#9be07f");
for(let k=2;k<w-2;k+=4){const qq=hz((x+k)*.37+y);if(qq>.55)R(x+k,y-8+(qq*3|0),1,5-(qq*2|0),"#5fc15a")}}
/* ---------------- scarf anchor: a flower wreath hanging on a vine ---------------- */
function wreathDraw(c,q){const y=q.y+(q.dy||0),x=q.x+(q.sw||0)*4+Math.sin(frame*.03+q.x)*1.2,fl=LV==3?["#ffffff","#ffe066"]:["#ffb2d0","#ffffff"];c.save();c.lineCap=c.lineJoin="round";
const vx=yy=>q.x+(x-q.x)*Math.min(1,yy/(y-9))+Math.sin(yy*.22+frame*.04)*1.4*(1-yy/(y+1));
for(const[col,lw]of[[FINK,3.4],["#3f8a3c",1.8]]){c.strokeStyle=col;c.lineWidth=lw;c.beginPath();for(let yy=0;yy<=y-8;yy+=4)yy?c.lineTo(vx(yy),yy):c.moveTo(vx(0),0);c.stroke()}
for(let yy=12,s=1;yy<y-14;yy+=12,s=-s){const lx=vx(yy);c.save();c.translate(lx,yy);c.rotate(s*.9);c.fillStyle=FINK;c.beginPath();c.ellipse(s*4,0,4.6,2.4,0,0,7);c.fill();c.fillStyle="#5fb052";c.beginPath();c.ellipse(s*4,0,3.6,1.6,0,0,7);c.fill();c.restore()}
c.lineWidth=5;c.strokeStyle=FINK;c.beginPath();c.arc(x,y,8,0,7);c.stroke();c.lineWidth=3.2;c.strokeStyle="#4f9a4c";c.stroke();c.lineWidth=1;c.strokeStyle="#8ad86e";c.beginPath();c.arc(x,y,8,-2.6,-1.3);c.stroke();
c.strokeStyle="#2f6a3a";c.lineWidth=.8;c.beginPath();for(let a=0;a<6.3;a+=.7){c.moveTo(x+Math.cos(a)*6.6,y+Math.sin(a)*6.6);c.lineTo(x+Math.cos(a+.35)*9.4,y+Math.sin(a+.35)*9.4)}c.stroke();
for(let i=0;i<6;i++){const a=i/6*6.283+.3,bx=x+Math.cos(a)*8.4,by=y+Math.sin(a)*8.4;c.fillStyle=FINK;c.beginPath();c.arc(bx,by,3.1,0,7);c.fill();c.fillStyle=fl[i%2];for(let k=0;k<5;k++){const b=k*1.257+a;c.beginPath();c.arc(bx+Math.cos(b)*1.3,by+Math.sin(b)*1.3,1.35,0,7);c.fill()}c.fillStyle="#ffc928";c.beginPath();c.arc(bx,by,.9,0,7);c.fill()}c.restore()}
/* ---------------- spiky chestnut enemy ---------------- */
function kuriDraw(e){const xc=e.x+11,yb=e.y+18,sq=e.y<206?0:Math.sin(frame/8+e.x*.1)*.05,rx=12*(1+sq),ry=10*(1-sq),cy=yb-ry,sp=[];
for(let i=0;i<16;i++){const a=i/16*6.283,b=a+.2;sp.push([xc+Math.cos(a)*rx*.8,cy+Math.sin(a)*ry*.8,xc+Math.cos(b)*(rx+6),cy+Math.sin(b)*(ry+6),xc+Math.cos(a+.39)*rx*.8,cy+Math.sin(a+.39)*ry*.8])}
for(const[c,o]of[[FINK,1.2],["#e8c88a",0]])for(const[a1,a2,b1,b2,c1,c2]of sp){g.fillStyle=c;g.beginPath();g.moveTo(a1,a2);g.lineTo(b1+(b1-xc)*o*.05,b2+(b2-cy)*o*.05);g.lineTo(c1,c2);g.closePath();g.fill()}
g.fillStyle=FINK;g.beginPath();g.ellipse(xc,cy,rx+1.5,ry+1.5,0,0,7);g.fill();g.fillStyle="#7a4a22";g.beginPath();g.ellipse(xc,cy,rx,ry,0,0,7);g.fill();g.fillStyle="#a8703a";g.beginPath();g.ellipse(xc-1,cy-2.5,rx*.8,ry*.6,0,0,7);g.fill();g.fillStyle="#d8a466";g.beginPath();g.ellipse(xc-4,cy-5,3,1.6,-.4,0,7);g.fill();
const ex=e.d>0?2:-2;R(xc-6+ex,cy-3,4,5,"#fff");R(xc+2+ex,cy-3,4,5,"#fff");R(xc-5+ex+(e.d>0?1:0),cy-1,2,3,FINK);R(xc+3+ex+(e.d>0?1:0),cy-1,2,3,FINK);
g.strokeStyle=FINK;g.lineWidth=1.4;g.beginPath();g.moveTo(xc-7+ex,cy-6);g.lineTo(xc-2+ex,cy-4);g.moveTo(xc+7+ex,cy-6);g.lineTo(xc+2+ex,cy-4);g.stroke()}
