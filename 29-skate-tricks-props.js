/* =====================================================================
   Props
   Wooden crates and neon vending machines. (The skate-trick system that used to live here was removed.)
   ===================================================================== *//* ---- wooden crate: planks, X-brace, metal corners, stencil ---- */
function crateDraw(x,y,w,h){for(let yy=y;yy<y+h;yy+=T){const H2=Math.min(T,y+h-yy);
R(x,yy,w,H2,"#a8743f");for(let k=0;k<4;k++){R(x+3,yy+3+k*6.5,w-6,6,k%2?"#b9854d":"#c4925a");R(x+3,yy+8.5+k*6.5,w-6,1,"#7a4e26")}
g.save();g.beginPath();g.rect(x+3,yy+3,w-6,H2-6);g.clip();g.strokeStyle="#6a4220";g.lineWidth=5;g.beginPath();g.moveTo(x,yy);g.lineTo(x+w,yy+H2);g.stroke();g.strokeStyle="#c99a62";g.lineWidth=3;g.stroke();g.restore();
R(x,yy,w,3,"#7a4e26");R(x,yy+H2-3,w,3,"#6a4220");R(x,yy,3,H2,"#7a4e26");R(x+w-3,yy,3,H2,"#6a4220");R(x,yy,w,1,"#d9a56d");
for(const[cx,cy]of[[x,yy],[x+w-5,yy],[x,yy+H2-5],[x+w-5,yy+H2-5]]){R(cx,cy,5,5,"#5a5a66");R(cx+1,cy+1,1,1,"#b8b8c4")}
g.fillStyle="rgba(40,20,8,.55)";g.font="bold 6px "+FM;g.textAlign="center";g.fillText("DUCK CO.",x+w/2,yy+H2-6);g.fillStyle="rgba(200,40,40,.7)";g.beginPath();g.moveTo(x+w/2,yy+6);g.lineTo(x+w/2+3,yy+10);g.lineTo(x+w/2-3,yy+10);g.fill();g.fillRect(x+w/2-1,yy+10,2,3)}
g.fillStyle="rgba(20,10,40,.3)";g.fillRect(x+2,y+h,w-2,2)}
/* ---- neon vending machine ---- */
function vmDraw(x,y,c){const fl=Math.sin(frame*.9+x)>.96?.55:1,body=g.createLinearGradient(x,0,x+32,0);body.addColorStop(0,c);body.addColorStop(1,"#1a1426");
g.save();g.globalCompositeOperation="lighter";const gl=g.createRadialGradient(x+16,y+30,4,x+16,y+30,46);gl.addColorStop(0,"rgba(160,230,255,"+.22*fl+")");gl.addColorStop(1,"rgba(160,230,255,0)");g.fillStyle=gl;g.fillRect(x-30,y-16,92,96);
g.fillStyle="rgba(160,230,255,"+.12*fl+")";g.beginPath();g.ellipse(x+16,y+66,26,4,0,0,7);g.fill();g.restore();
g.fillStyle=body;g.beginPath();srr(x,y,32,64,[4,4,1,1]);g.fill();g.fillStyle="rgba(0,0,0,.35)";g.fillRect(x+29,y+2,3,62);
g.fillStyle="#120c1e";g.fillRect(x+2,y+2,28,8);g.fillStyle=fl<1?"#6a8aa0":"#bff4ff";g.font="bold 6px "+FM;g.textAlign="center";g.fillText("COOL",x+11,y+8.3);g.fillStyle=fl<1?"#a05070":"#ff7ac8";g.fillText("♥",x+22,y+8.3);
const wg=g.createLinearGradient(0,y+12,0,y+42);wg.addColorStop(0,"#dff8ff");wg.addColorStop(1,"#8fd4f0");g.fillStyle=wg;g.fillRect(x+3,y+12,20,30);
const CANS=["#e8453c","#3a9ad9","#ffd24a","#4fc46a","#ff7ac8","#f2ece0"];for(let r=0;r<3;r++){R(x+3,y+21+r*10,20,1,"#5a7a8a");for(let k=0;k<4;k++){const cc=CANS[(r*4+k+(x>>5))%CANS.length];R(x+4+k*5,y+14+r*10,4,7,cc);R(x+4+k*5,y+14+r*10,4,1,"#ffffffaa");R(x+5+k*5,y+22+r*10,2,1,(frame>>4)%7==(r*4+k)%7?"#ff4a5a":"#7cff6b")}}
g.fillStyle="rgba(255,255,255,.35)";g.beginPath();g.moveTo(x+6,y+12);g.lineTo(x+11,y+12);g.lineTo(x+4,y+42);g.lineTo(x+3,y+42);g.lineTo(x+3,y+20);g.fill();
R(x+24,y+12,5,8,"#120c1e");R(x+25,y+13,3,6,frame%60<30?"#7cff6b":"#3a8a3a");R(x+25,y+23,3,1.5,"#2a2238");R(x+26,y+22,1,3.5,"#888");
for(let k=0;k<3;k++){R(x+24,y+28+k*4,5,3,"#d8d8e0");R(x+25,y+29+k*4,3,1,k==1&&frame%40<20?"#ffd24a":"#fff")}
R(x+4,y+46,24,9,"#0a0610");R(x+5,y+47,22,3,"#2a2238");R(x+5,y+52,22,1,"#3a3150");R(x+2,y+58,28,4,"#120c1e");R(x,y+62,32,2,"#0006")}
