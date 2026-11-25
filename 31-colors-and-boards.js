/* =====================================================================
   Duck colours, skateboards, star wallet
   - Wardrobe page 3: duck colours (coins) + skateboards (stars).
   - Hidden stars respawn each run and go into a saved star wallet (STARS).
   ===================================================================== */
/* ---- duck colours: [name, body, dark, price, wings, legs] - wings + legs are each colour's secondary shades ---- */
const DCOL=[["Classic",[255,214,40],[236,186,30],0,[250,232,185],[250,236,190]],
["Snow",[246,246,240],[212,212,206],25,[176,208,240],[64,76,112]],
["Mint",[140,230,190],[100,196,160],25,[36,118,98],[250,240,212]],
["Bubblegum",[255,160,200],[230,120,170],30,[255,236,246],[150,92,204]],
["Sky",[120,176,255],[86,136,220],30,[255,214,80],[38,58,118]],
["Shadow",[78,74,92],[52,50,62],40,[204,40,62],[28,26,34]],
["Grape",[176,126,240],[136,94,204],40,[255,178,60],[62,32,94]],
["Cherry",[240,84,74],[200,54,52],40,[255,240,228],[58,122,62]],
["Lime",[160,255,96],[112,212,64],60,[44,44,54],[246,246,246]],
["Chrome",[214,220,232],[150,158,176],80,[90,200,255],[60,64,82]]];
const WGC=[...DCOL[0][4]],LGC=[...DCOL[0][5]];
/* ---- skateboards: deck colours, pattern, wheel colour, price in stars ---- */
const BRD=[{n:"Classic",d:["#ff5a3c"],w:"#f2ece0",p:0},{n:"Checker",d:["#f2ece0","#1a1230"],pat:"check",w:"#f2ece0",p:1},{n:"Inferno",d:["#ffd24a","#ff8a1f","#e8302a"],pat:"flame",w:"#ffd24a",p:1},{n:"Galaxy",d:["#2a1660","#6a3ad0","#2fd8c8"],pat:"stars",w:"#b88cff",p:2},{n:"Golden Duck",d:["#fff3a0","#ffc928","#c97a0c"],pat:"shine",w:"#fff3a0",p:3}];
CAT.push(["COLORS",DCOL.map(c=>c[0]),DCOL.map(c=>c[3])],["BOARDS",BRD.map(b=>b.n),BRD.map(b=>b.p)]);K3.push("col","bd");
if(CS.col==null)CS.col=0;if(CS.bd==null)CS.bd=0;if(!OWN.col)OWN.col=[0];if(!OWN.bd)OWN.bd=[0];
let STARS=0;try{const d=JSON.parse(localStorage.getItem("cool_duck_1")||"{}");STARS=d.st!=null?d.st|0:(d.hs?d.hs.reduce((a,b)=>a+(b?1:0),0):0)}catch(_){}
const NPG=3,slot=(pg,r,c)=>pg<2?{r,c:pg*5+c}:r<2?{r:3,c:r*5+c}:{r:4,c},wal=r=>r==4?STARS:coins;
/* recolour the duck: Y / Yd are shared by every duck mesh, so update them in place */
function applyCol(){const z=S=="lobby"?LP:CS,c=DCOL[z.col|0]||DCOL[0];for(let i=0;i<3;i++){Y[i]=c[1][i];Yd[i]=c[2][i];WGC[i]=c[4][i];LGC[i]=c[5][i]}DM.jn.col=LGC}
/* deck + wheels in board-local units (deck spans x -16..16, wheels at y 3.2) */
function boardPaint(v,B,rot){v.save();v.lineCap="round";v.lineJoin="round";
for(const wx of[-9,9]){v.fillStyle="#8c8c94";v.fillRect(wx-1.5,.4,3,2);v.fillStyle="#1a1230";v.beginPath();v.arc(wx,3.2,3.6,0,7);v.fill();v.fillStyle=B.w;v.beginPath();v.arc(wx,3.2,2.7,0,7);v.fill();v.strokeStyle="#1a1230";v.lineWidth=.9;v.beginPath();v.moveTo(wx,3.2);v.lineTo(wx+Math.cos(rot)*2.4,3.2+Math.sin(rot)*2.4);v.stroke()}
const dk=()=>{v.beginPath();v.moveTo(-16,-4);v.quadraticCurveTo(-14,-.3,-10,-.3);v.lineTo(10,-.3);v.quadraticCurveTo(14,-.3,16,-4)};
dk();v.strokeStyle="#1a1230";v.lineWidth=5.6;v.stroke();
if(B.d.length>1&&B.pat!="check"){const gr=v.createLinearGradient(-16,0,16,0);B.d.forEach((c,i)=>gr.addColorStop(i/(B.d.length-1),c));v.strokeStyle=gr}else v.strokeStyle=B.d[0];dk();v.lineWidth=3.6;v.stroke();
if(B.pat=="check"){v.setLineDash([2.2,2.2]);v.strokeStyle=B.d[1];dk();v.stroke();v.setLineDash([])}
else if(B.pat=="flame"){v.fillStyle="#fff6c0";for(const fx of[-8,-2,4]){v.beginPath();v.moveTo(fx,-.4);v.quadraticCurveTo(fx+2,-1.6,fx+4,-.6);v.quadraticCurveTo(fx+2,-1,fx,-.4);v.fill()}}
else if(B.pat=="stars"){v.fillStyle="#fff";for(const[sx,sy]of[[-11,-1.2],[-4,-.9],[3,-1.3],[9,-.9]])v.fillRect(sx,sy,.9,.9)}
else if(B.pat=="shine"){const gx=((frame*.6)%60)-30;v.strokeStyle="rgba(255,255,255,.85)";v.lineWidth=1.2;v.beginPath();v.moveTo(gx,-2);v.lineTo(gx+3,-.2);v.stroke()}
dk();v.strokeStyle="#2e2c3a";v.lineWidth=1.3;v.translate(0,-1.1);v.stroke();v.translate(0,1.1);
v.fillStyle=B.pat=="shine"?"#fff":"#ffc928";v.fillRect(-3,-.6,6,1.2);v.restore()}
/* wardrobe icons (drawn on g inside the cabinet) */
/* duck colour = a single brush scratch of paint: ragged dry-brush tail, bristle streaks, one drip */
function colI(i,cx,cy){const c=DCOL[i],rs=k=>{const q=Math.sin(i*91.3+k*47.7)*43758.5453;return q-Math.floor(q)},col=scs(c[1]);
g.save();g.translate(cx,cy);g.rotate(-.32+rs(1)*.22);
const P=()=>{g.moveTo(-10,-3.4);g.quadraticCurveTo(-3,-6.6,4,-4.6);g.quadraticCurveTo(8,-3.8,10.8,-5);g.lineTo(9.3,-2.6);g.lineTo(11.4,-1);g.lineTo(9.5,.9);g.lineTo(10.9,2.9);g.quadraticCurveTo(3,4.9,-4,3.7);g.quadraticCurveTo(-8,3.1,-10.6,4.3);g.quadraticCurveTo(-12.2,.4,-10,-3.4);g.closePath()};
const dx=-3+rs(2)*5;ssh(()=>{g.moveTo(dx-1.4,3);g.quadraticCurveTo(dx-1.5,6.8,dx-1.2,7.6);g.arc(dx,7.8,1.3,Math.PI,0,true);g.quadraticCurveTo(dx+1.4,6,dx+1.4,3);g.closePath()},col,.9);
ssh(P,col,1.1);
g.save();g.beginPath();P();g.clip();for(let k=0;k<5;k++){const y=-3.6+k*1.75;sln(()=>{g.moveTo(-10+rs(k+3)*4,y);g.quadraticCurveTo(0,y+(rs(k+8)-.5)*1.4,10-rs(k+13)*3,y+.3)},k%2?scs(c[2],.88):"rgba(255,255,255,.4)",.6)}g.restore();
g.fillStyle=col;g.strokeStyle=SOL;g.lineWidth=.6;for(const[fx,fy,fr]of[[13,-2.8,.85],[13.6,1.4,.6],[-13,-.8,.7]]){g.beginPath();g.arc(fx,fy,fr,0,7);g.fill();g.stroke()}
g.restore();
/* two small dabs below the scratch: wing colour + leg colour */
for(const[k,ox]of[[4,-3.2],[5,3.2]]){const dx=cx+ox,dy=cy+9.5;ssh(()=>{g.moveTo(dx-2.6,dy);g.quadraticCurveTo(dx-2.4,dy-2.4,dx,dy-2.3);g.quadraticCurveTo(dx+2.8,dy-2.1,dx+2.5,dy+.3);g.quadraticCurveTo(dx+2,dy+2.4,dx-.2,dy+2.1);g.quadraticCurveTo(dx-2.7,dy+1.9,dx-2.6,dy)},scs(c[k]),.8)}}
function boardI(i,cx,cy){g.save();g.translate(cx,cy);g.scale(.66,.66);boardPaint(g,BRD[i],frame*.05);g.restore()}
/* star wallet panel next to the coin counter (lobby + wardrobe) */
function luStars(xr){const v=vg,s=""+STARS,w=luW(s,13,900),x1=xr-6,x0=x1-w-28;v.fillStyle=INK;luInk(x0,7,x1,27,25,2);starIcon(v,x0+12,17,5.5,1);luIt(s,x1-7,22,13,"#ffe680","right",900)}
