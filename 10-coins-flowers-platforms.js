/* =====================================================================
   Coins, flowers, stars, platforms, parachute
   Collectibles, health pickups, flowers, platforms, skateboard/parachute jacket drawing.
   ===================================================================== */
/* ---- coins, flowers, stars, platforms ---- */
const lc=(a,b,t)=>"rgb("+a.map((v,i)=>v+(b[i]-v)*t|0)+")",lvk=()=>S=="t1"?"t1":"st",SXY=()=>S=="t1"?[22,21]:[Math.max(86,Math.max(118,16+Math.max(3,hearts)*17)-26),38];
function starPath(c,x,y,r,ro){c.beginPath();for(let i=0;i<10;i++){const a=ro+i*Math.PI/5,d=i%2?r*.45:r;c[i?"lineTo":"moveTo"](x+Math.cos(a)*d,y+Math.sin(a)*d)}c.closePath()}
function starIcon(c,x,y,r,lit,rot=-Math.PI/2){starPath(c,x,y,r+1.6,rot);c.fillStyle="#2a1a00";c.fill();starPath(c,x,y,r,rot);c.fillStyle=lit?"#ffd24a":"#4a3c5a";c.fill();if(lit){starPath(c,x-.5,y-.5,r*.55,rot);c.fillStyle="#fff2a8";c.fill()}}
function coinDraw(x,y,spin,sc){const s=Math.cos(spin),w=Math.max(1.2,Math.abs(s)*7*sc),h=7.5*sc,fc=Math.abs(s)>.3,el=(rx,ry,col,dx=0,dy=0)=>{g.fillStyle=col;g.beginPath();g.ellipse(x+dx,y+dy,rx,ry,0,0,7);g.fill()};
el(w+1.6,h+1.6,"#3a2400");el(w,h,"#c9820c");el(w*.86,h*.9,"#ffd24a",-w*.08,-h*.06);
if(fc){el(w*.62,h*.64,"#e39a14");el(w*.54,h*.56,"#ffe680");g.strokeStyle="#c98a12";g.lineWidth=1.4*sc;g.beginPath();g.ellipse(x,y,w*.3,h*.38,0,.8,5.5);g.stroke();g.fillStyle="#c98a12";g.fillRect(x-.7*sc,y-h*.5,1.4*sc,h);
g.strokeStyle="#fffbe0";g.lineWidth=1.2;g.beginPath();g.ellipse(x,y,w*.8,h*.8,0,3.4,4.5);g.stroke()}
const gl=(frame+(spin*40|0))%150;if(gl<9){const k=gl<5?3:2;R(x+w-1,y-h-k,1,k*2,"#fff");R(x+w-1-k,y-h,k*2,1,"#fff")}}
const stkPos=n=>[HUDC[0],HUDC[1]+3],CPAL=[["#3a2400","#7a4e08","#e0a41a","#ffd24a","#ffee9a"],["#1c2230","#4a5468","#9aa6bc","#d8e0ee","#ffffff"],["#380a24","#7a1850","#e0449c","#ff7ac8","#ffc2e6"],["#06222e","#0e5878","#27a8d8","#6fd8ff","#c8f2ff"],["#0a2a0e","#17621f","#3cb84a","#8cf06a","#ccffb0"],["#1a0c38","#43228a","#8a52e0","#b88cff","#e4d2ff"]];
function coinGet(k){const sx=k.x-(cam|0);FC.push({x:sx,y:k.y,t:0,ph:k.x*.05});for(let i=0;i<8;i++){const a=i/8*6.28+rn()*.5;SPK.push({x:sx,y:k.y,vx:Math.cos(a)*(1+rn()*1.6),vy:Math.sin(a)*(1+rn()*1.6)-.8,l:14+(rn()*8|0)})}snd.coin(CN.pkT>0?++CN.pk:(CN.pk=0));CN.pkT=70}
function coinUpd(){for(let i=FC.length;i--;){const f=FC[i];if(++f.t>=24){const [tx,ty]=stkPos(Math.max(0,lvC-FC.length));FC.splice(i,1);CN.bump=8;CN.cT=45;CN.cch++;{const ld=lvC-FC.length;if(ld>0&&ld%40==0){snd.full();for(let j=0;j<18;j++)SPK.push({x:tx,y:ty,vx:(rn()-.5)*5,vy:-rn()*3.5,l:18+(rn()*10|0)})}else snd.clink(CN.cch)}for(let j=0;j<5;j++)SPK.push({x:tx,y:ty,vx:(rn()-.5)*2.4,vy:-rn()*2,l:12+(rn()*6|0)})}}
if(CN.bump>0)CN.bump--;if(CN.pkT>0)CN.pkT--;if(CN.cT>0&&--CN.cT==0)CN.cch=0;for(let i=SPK.length;i--;){const q=SPK[i];q.x+=q.vx;q.y+=q.vy;q.vy+=.12;if(--q.l<=0)SPK.splice(i,1)}}
function stackDraw(){const s=Math.max(0,lvC-FC.length),r=s/40|0,m=s%40,top=s>0?(m?m-1:39):-1,bp=CN.bump>0?-Math.sin(CN.bump/8*Math.PI)*4:0;R(171,57,56,2,"#ffffff30");
for(let col=0;col<4;col++){const x=178+col*14;for(let j=0;j<10;j++){const i=col*10+j;if(r<1&&i>=m)break;const Q2=CPAL[(i<m?r:r-1)%CPAL.length],y=56-j*3+(i==top?bp:0);g.fillStyle=Q2[1];g.beginPath();g.ellipse(x,y+1,6.2,2.7,0,0,7);g.fill();R(x-6,y-1,12,2,Q2[2]);g.fillStyle=Q2[0];g.beginPath();g.ellipse(x,y-1,6.4,2.8,0,0,7);g.fill();g.fillStyle=Q2[3];g.beginPath();g.ellipse(x,y-1,5.6,2.2,0,0,7);g.fill();g.fillStyle=Q2[4];g.beginPath();g.ellipse(x-1,y-1.4,3,1,0,0,7);g.fill()}}
if(r>0)TX("x"+(r+1),178,30,CPAL[r%CPAL.length][3],14)}
function starFly(c){for(const s of SFL)if(s.t>=55){const u=Math.min(1,(s.t-55)/34);starIcon(c,s.dx,s.dy,10-4*u,1,s.t*.25)}}
function hudFx(){stackDraw();const s0=Math.max(0,lvC-FC.length);FC.forEach((f,i)=>{const u=f.t/24,e=u*u*(3-2*u),[tx,ty]=stkPos(s0+i);coinDraw(f.x+(tx-f.x)*e,f.y+(ty-f.y)*e-Math.sin(Math.PI*u)*28,f.t*.55+f.ph,1.25-.45*e)});
for(const q of SPK)R(q.x,q.y,q.l>7?2:1,q.l>7?2:1,q.l%2?"#fff6a8":"#ffd24a");starFly(g)}
function heal(f){f.g=1;f.t=0;sfx(500,.3,"sine",.06,900);sfx(700,.25,"sine",.05,1200,.15);for(let i=0;i<10;i++)GP.push({x:f.x,y:f.y-14,vx:(rn()-.5)*3,vy:-rn()*2.5,l:24,c:"#7fc4ff"})}
function flUpd(){for(const f of S=="t1"?FT1:PL){if(f.g==1){f.t++;if(f.t<60&&f.t%2==0)for(let i=0;i<2;i++)GP.push({x:f.x+(rn()-.5)*18,y:f.y-8-rn()*22,vx:(rn()-.5)*.8,vy:-.4-rn()*.8,l:22+(rn()*14|0),c:i?"#7fc4ff":"#e6f6ff"});
if(f.t==62){f.g=2;SFL.push({x:f.x,y:f.y-40,t:0,k:f.k});for(let i=0;i<20;i++){const a=rn()*6.28;GP.push({x:f.x,y:f.y-26,vx:Math.cos(a)*(1+rn()*2),vy:Math.sin(a)*(1+rn()*2)-1,l:26+(rn()*16|0),c:i%2?"#ffd24a":"#fff"})}[523,659,784].forEach((q,i)=>sfx(q,.2,"triangle",.06,0,i*.09))}}
else if(f.g==2&&frame%50==0)GP.push({x:f.x+(rn()-.5)*16,y:f.y-30-rn()*8,vx:0,vy:-.3,l:20,c:"#ffe680"})}
for(let i=SFL.length;i--;){const q=SFL[i];q.t++;if(q.t<55)q.y-=.7*(1-q.t/55);else{if(q.t==55){q.sx=q.x-(cam|0);q.sy=q.y;sfx(988,.12,"sine",.06);sfx(1319,.2,"sine",.06,0,.1)}
const u=Math.min(1,(q.t-55)/34),e=u*u*(3-2*u),[tx,ty]=SXY();q.dx=q.sx+(tx-q.sx)*e;q.dy=q.sy+(ty-q.sy)*e-Math.sin(u*Math.PI)*30;
if(u>=1){STARS++;saveG();SFL.splice(i,1);CN.sb=14;ban("Secret bread! You now have "+HSN()+" loaves");[1047,1319,1568,2093].forEach((fq,j)=>sfx(fq,.18,"square",.05,0,j*.1))}}}
for(let i=GP.length;i--;){const q=GP[i];q.x+=q.vx;q.y+=q.vy;q.vy+=.03;if(--q.l<=0)GP.splice(i,1)}if(CN.sb>0)CN.sb--}
function flowerDraw(f){const k=f.g==2?1:f.g==1?Math.min(1,f.t/58):0,e=k*k*(3-2*k),x=f.x,y=f.y-1,sw=Math.sin(frame*.05+x)*e*1.6,hx=x+(1-e)*12+sw,hy=y-9-18*e,ink="#2a2238";
R(x-8,y-7,16,8,"#b9854d");R(x-9,y-8,18,3,"#d9a56d");R(x-8,y-1,16,2,"#8a5f33");
g.lineCap="round";g.strokeStyle=ink;g.lineWidth=4.6;g.beginPath();g.moveTo(x,y-8);g.quadraticCurveTo(x+(1-e)*2,y-8-15*(.35+.65*e),hx,hy);g.stroke();g.strokeStyle=lc([128,112,64],[56,168,70],e);g.lineWidth=2.6;g.stroke();
for(const d of[-1,1]){g.fillStyle=lc([112,102,60],[70,190,84],e);g.strokeStyle=ink;g.lineWidth=1;g.beginPath();g.ellipse(x+d*(5+3*e),y-12-3*e+(1-e)*5,3.5+3.5*e,1.8+1.2*e,d*(.5+(1-e)*.9),0,7);g.fill();g.stroke()}
const pr=3.2+3.2*e;for(let i=0;i<8;i++){const a=i*.785+frame*.004*e;g.fillStyle=lc([156,134,118],i%2?[255,92,150]:[255,130,180],e);g.strokeStyle=ink;g.lineWidth=1;g.beginPath();g.ellipse(hx+Math.cos(a)*pr,hy+Math.sin(a)*pr*(.5+.5*e)+(1-e)*2.5,2.6+2.2*e,2+1.6*e,a,0,7);g.fill();g.stroke()}
g.fillStyle=ink;g.beginPath();g.arc(hx,hy+(1-e),3.8,0,7);g.fill();g.fillStyle=lc([100,80,56],[255,205,60],e);g.beginPath();g.arc(hx,hy+(1-e),2.7,0,7);g.fill();
if(f.g==0){const b=Math.sin(frame*.1)*2,dy=y-40+b;g.fillStyle=ink;g.beginPath();g.arc(x,dy,10,0,7);g.moveTo(x-3,dy+8);g.lineTo(x,dy+14);g.lineTo(x+3,dy+8);g.fill();g.fillStyle="#fff";g.beginPath();g.arc(x,dy,8.6,0,7);g.fill();g.fillStyle="#1e78ff";g.beginPath();g.moveTo(x,dy-6);g.bezierCurveTo(x+6,dy,x+5,dy+5,x,dy+5);g.bezierCurveTo(x-5,dy+5,x-6,dy,x,dy-6);g.fill();g.fillStyle="#e6f6ff";g.fillRect(x-2.5,dy-1,1.5,3)}}
function gpDraw(){for(const q of GP){const a=q.l>8?2:1;R(q.x,q.y,a,a,q.c);if(q.c=="#ffd24a"&&q.l%4<2){R(q.x-1,q.y,4,1,q.c);R(q.x,q.y-1,1,4,q.c)}}
for(const q of SFL)if(q.t<55){const b=Math.sin(q.t*.2);g.globalAlpha=.3;g.fillStyle="#ffe680";g.beginPath();g.arc(q.x,q.y+b,16,0,7);g.fill();g.globalAlpha=1;starIcon(g,q.x,q.y+b,10,1,q.t*.06-Math.PI/2)}}
function platDraw(q){const{x,y,w}=q,k=q.k,h=hzf;g.fillStyle="rgba(20,10,40,.28)";g.fillRect(x+3,y+9,w-6,3);
if(k=="w"){const c=q.c||"#e8453c";for(let i=0;i<w;i+=8){const cc=(i>>3)&1?"#f6efe2":c;R(x+i,y-2,8,8,cc);g.fillStyle=cc;g.beginPath();g.arc(x+i+4,y+6,4,0,Math.PI);g.fill()}R(x,y-3,w,1,"#2a2238");R(x,y-2,w,2,"#ffffff55");R(x,y+4,w,1,"#00000025")}
else if(k=="r"){R(x,y,w,8,"#5a4b78");R(x,y+5,w,3,"#3c3057");R(x,y,w,2,"#8a79ac");for(let i=0;i<w;i+=10)R(x+i,y+2,1,4,"#4a3c66");R(x,y-3,w,3,"#3f9a52");R(x,y-3,w,1,"#9be07f");
for(let i=1;i<w-1;i+=3){const v=h(x*.3+i);if(v>.3)R(x+i,y-5-(v*3|0),1,3+(v*3|0),v>.65?"#7fd86a":"#4fae5a")}for(let i=4;i<w-3;i+=11){const v=h(x*.7+i);if(v>.45)R(x+i,y-7,2,2,v>.75?"#ffc2d4":"#fff0a0")}}
else{R(x,y,w,8,"#a8743f");R(x,y,w,2,"#d2a266");R(x,y+6,w,2,"#6a4524");for(let i=0;i<w;i+=16){R(x+i,y+2,1,6,"#6a4524");R(x+i+3,y+3,1,2,"#f0dcae");R(x+i+12,y+3,1,2,"#f0dcae")}
for(let i=0;i<w;i+=2)if(h(x*.2+i)>.5)R(x+i,y-2,2,2,"#4fae5a");g.fillStyle="#6a4524";for(const e of[0,1]){const bx=e?x+w-3:x+3,d=e?-1:1;g.beginPath();g.moveTo(bx,y+8);g.lineTo(bx,y+15);g.lineTo(bx+d*8,y+8);g.fill()}}}
const BD={k:0,w:0},PCH={k:0};
function bdUpd(on){BD.k=Math.max(0,Math.min(1,BD.k+(on?.045:-.06)))}
const bsm=x=>x*x*(3-2*x),BKF=[[0,6,-14,1.55,.3],[.12,8,-15,1.5,.4],[.3,11.5,-15,1.45,.5],[.5,14,-9,.95,.8],[.68,8,-4,.3,1],[.8,2,-4,.05,1],[1,0,-4,0,1]];
function bkf(t){let i=0;while(i<BKF.length-2&&t>BKF[i+1][0])i++;const a=BKF[i],b=BKF[i+1],u=bsm(Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0]))));return[1,2,3,4].map(j=>a[j]+(b[j]-a[j])*u)}
function bwa(t){if(t<=.02)return 0;if(t<.22)return bsm(t/.22);if(t<.4)return 1;if(t<.6)return 1-.45*bsm((t-.4)/.2);if(t<.78)return .55*(1-bsm((t-.6)/.18));return 0}
/* feet height on the board (measured): deck top = board origin (-4) - 3.1; the foot mesh reaches .52 below the draw line,
   so the feet line sits at -7.2 -> soles rest on the deck and only their ink outline overlaps it */
function bdY(){const t=BD.k;if(t<=.55)return 0;const u=(t-.55)/.45;return -7.2*bsm(u)-8*Math.sin(Math.PI*u)}
const wz=(o,s)=>o.ga&&o.gs==s?o.ga*.5:0,wm=(o,s,fl)=>o.ga&&o.gs==s?mm(rY(s*.75*o.ga),rZ(s*(fl*(1-o.ga)-1.4*o.ga))):rZ(s*fl);
function boardDraw(){const k=BD.k;if(k<=0||tAtt)return;const v=vg,f=p.f,air=!p.g,tl=air?-f*Math.max(-.35,Math.min(.35,p.vy*.03)):0,K=bkf(k);
v.save();v.translate(f*K[0],K[1]);v.rotate(-f*K[2]+tl*Math.max(0,(k-.6)/.4));v.scale(f*K[3],K[3]);v.lineCap="round";v.lineJoin="round";
boardPaint(v,BRD[CS.bd|0]||BRD[0],BD.w);


v.restore()}
function chuteDraw(){const k=PCH.k;if(k<=.02||tAtt)return;const v=vg,e=k<1?1-Math.pow(1-k,2.4):1,col=JKC[CS.jk],cs="rgb("+col+")",dk="rgb("+col.map(q=>q*.6|0)+")",ink="#2a2238",cr="#f6efe2",U=12.32,fl=1.5+k*1.2,hx=(1+.95*Math.sin(fl))*Math.abs(Math.cos(DK.yaw))*U,hy=-(1.35-.95*Math.cos(fl))*U,hw=12,hh=17,cy=-16-30*e,yT=cy-hh/2,yS=yT+3,yH=cy+hh/2,sx=e*(Math.sin(frame*.08)*1.6-p.vx*1.2),wv=i=>Math.sin(frame*.17+i*1.3)*1.3*e;
v.save();v.lineJoin=v.lineCap="round";
// sleeves run from the shoulders down to the hands that hold the cuffs
for(const d of[-1,1]){const x0=d*hw*.9+sx*.5,y0=yS+3,x1=d*hx,y1=hy-1;for(const[c2,w2]of[[ink,8],[cs,5.4]]){v.strokeStyle=c2;v.lineWidth=w2;v.beginPath();v.moveTo(x0,y0);v.quadraticCurveTo(d*(hx+3)+sx*.3,(y0+y1)/2,x1,y1);v.stroke()}v.fillStyle=cr;v.strokeStyle=ink;v.lineWidth=1.3;v.beginPath();v.ellipse(x1,y1,3.4,2.4,0,0,7);v.fill();v.stroke()}
// jacket body
const hem=()=>{v.quadraticCurveTo(hw*.5+sx*.2,yH+4+wv(2),sx*.2,yH+wv(3));v.quadraticCurveTo(-hw*.5+sx*.2,yH+4+wv(4),-hw+sx*.3,yH+wv(0))};
v.beginPath();v.moveTo(-hw+sx*.3,yH+wv(0));v.lineTo(-hw+sx*.5,yS+2);v.quadraticCurveTo(-hw*.9+sx*.6,yT+1,-5+sx*.8,yT);v.quadraticCurveTo(sx*.8,yT+4,5+sx*.8,yT);v.quadraticCurveTo(hw*.9+sx*.6,yT+1,hw+sx*.5,yS+2);v.lineTo(hw+sx*.3,yH+wv(1));hem();v.closePath();v.fillStyle=cs;v.fill();v.strokeStyle=ink;v.lineWidth=2;v.stroke();
v.save();v.clip();v.strokeStyle=dk;v.lineWidth=1.2;v.beginPath();v.moveTo(-hw*.55+sx*.4,yS+4);v.quadraticCurveTo(-hw*.6,cy,-hw*.45,yH);v.moveTo(hw*.55+sx*.4,yS+4);v.quadraticCurveTo(hw*.6,cy,hw*.45,yH);v.stroke();v.restore();
// zipper, collar, pockets, hem band
v.strokeStyle="#e6e6ee";v.lineWidth=1.5;v.setLineDash([2,1.6]);v.beginPath();v.moveTo(sx*.8,yT+4);v.lineTo(sx*.2,yH+1);v.stroke();v.setLineDash([]);
v.fillStyle=dk;v.strokeStyle=ink;v.lineWidth=1.2;v.beginPath();v.ellipse(sx*.8,yT+1.6,5.4,2.2,0,0,7);v.fill();v.stroke();
v.strokeStyle=ink;v.lineWidth=1.2;v.beginPath();for(const d of[-1,1]){v.moveTo(d*hw*.62+sx*.3,yH-5);v.lineTo(d*hw*.3+sx*.3,yH-4)}v.stroke();
v.beginPath();v.moveTo(hw+sx*.3,yH+wv(1));hem();v.strokeStyle=cr;v.lineWidth=2.2;v.stroke();v.restore()}
