/* =====================================================================
   Hits, game over, hidden stars, level-1 dressing
   Clear damage feedback (flash, vignette, hit-stop), game-over sequence that restarts level 1,
   3 hidden stars across the game, and extra scenery for the first level (sakura, lanterns, petals).
   ===================================================================== */
let GO=null;const HIT={t:0};
/* ---- hidden bread, one per level (l = "p"+LV): 1-1 high above the first bubble over the big pit (bounce straight up),
   1-2 above the plateau (super-bounce off the bubble up there), 1-3 on the low ledge deep in the valley ---- */
const HST=[{l:"p1",x:74.5*T,y:52,id:1},{l:"p2",x:74.5*T,y:-18,id:2},{l:"p3",x:78*T,y:168,id:3}];
const hsK=()=>S=="play"?"p"+LV:S,HSN=()=>STARS;
try{const d=JSON.parse(localStorage.getItem("cool_duck_1")||"{}");if(d.hs)d.hs.forEach((v,i)=>SK[i]=v?1:0)}catch(_){}
function hsSave(){try{const d=JSON.parse(localStorage.getItem("cool_duck_1")||"{}");d.hs=[SK[0]|0,SK[1]|0,SK[2]|0];localStorage.setItem("cool_duck_1",JSON.stringify(d))}catch(_){}}
function hsUpd(){for(const s of HST){if(s.l!=hsK()||s.got)continue;if(Math.hypot(p.x+9-s.x,p.y+14-s.y)<24){s.got=1;SFL.push({x:s.x,y:Math.max(16,s.y),t:24,k:s.id});
for(let i=0;i<20;i++){const a=rn()*6.28;GP.push({x:s.x,y:Math.max(16,s.y),vx:Math.cos(a)*(1+rn()*2.4),vy:Math.sin(a)*(1+rn()*2.4)-1,l:26+(rn()*16|0),c:i%2?"#ffd24a":"#fff"})}
[784,988,1175,1568].forEach((f,i)=>sfx(f,.16,"triangle",.06,0,i*.08));if(S=="play")POP.push({x:s.x,y:Math.max(30,s.y+20),s:"SECRET BREAD!",c:"#ffd24a",f:14,l:90})}}}
function hsDraw(){for(const s of HST){if(s.l!=hsK()||s.got)continue;const b=Math.sin(frame*.07+s.id)*2.5,y=s.y+b;
g.globalAlpha=.28+.12*Math.sin(frame*.1);g.fillStyle="#fff2a0";g.beginPath();g.arc(s.x,y,15,0,7);g.fill();g.globalAlpha=1;starIcon(g,s.x,y,9,1,-Math.PI/2+Math.sin(frame*.04)*.25);
if(frame%40<6){const k=frame%40<3?4:2,sx=s.x+((frame/40|0)%3-1)*10,sy=Math.max(4,y-10);R(sx-1,sy-k,2,k*2,"#fff");R(sx-k,sy-1,k*2,2,"#fff")}
if(s.y<0&&frame%24<12)for(let i=0;i<3;i++)R(s.x-8+i*8,2+((frame>>2)+i)%4,2,2,"#ffe680")}}
/* ---- hit feedback ---- */
function hitDraw(){if(HIT.t<=0)return;const v=vg,k=HIT.t/26;HIT.t--;
if(HIT.t>20){v.fillStyle="rgba(255,255,255,"+(.35*(HIT.t-20)/6)+")";v.fillRect(0,0,W,H)}
const gr=v.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.62);gr.addColorStop(0,"rgba(255,30,60,0)");gr.addColorStop(1,"rgba(255,30,60,"+(.55*k)+")");v.fillStyle=gr;v.fillRect(0,0,W,H)}
/* ---- game over ---- */
function goStart(){GO={t:0,x:p.x+9,y:Math.min(p.y+p.h,H+20),vy:-9,r:0,yaw:DK.yaw,lost:lvC-(CKP.on&&CKP.s?CKP.s.lv:0),ck:CKP.on};tAtt=null;BD.k=PCH.k=0;hs=0;shk=9;tCh=tFire=0;
sfx(120,.5,"sawtooth",.06,40);[523,466,392,311].forEach((f,i)=>sfx(f,.3,"triangle",.07,0,.4+i*.24));sfx(196,.8,"triangle",.06,98,1.4)}
function goUpd(){const G=GO;G.t++;if(G.t>12){G.vy+=.38;G.y+=G.vy;G.r+=.15}if(shk>0)shk=Math.max(0,shk-.35);fxStep(FX);
if(G.t>110&&!TRN.on&&(Object.keys(PR).length||G.t>600)){coins=Math.max(0,coins-G.lost);saveG();trans(()=>{GO=null;G.ck?ckRestart():start()})}}
function goDraw(){const G=GO;if(!G)return;const v=vg,c=cam|0,k=Math.min(1,G.t/36);
v.fillStyle="rgba(16,6,22,"+(.66*k)+")";v.fillRect(0,0,W,H);
if(G.y<H+90){DT=vg;v.save();v.translate(G.x-c,G.y);duckDraw(0,0,1.2,{yaw:G.yaw+G.t*.1,ev:1,air:1,vy:3,fl:2.3,tilt:G.r,hp:.35,id:0,sid:"go",eyes:1,brw:1});v.restore();DT=g}
if(G.t>26){const u=Math.min(1,(G.t-26)/16),e=1-Math.pow(1-u,3),s=(.3+.7*e)*(1+(u>=1?Math.sin(G.t*.08)*.015:0));v.save();v.translate(W/2,104);v.rotate(-.05);v.scale(s,s);v.globalAlpha=u;v.fillStyle=INK;luInk(-176,-40,176,22,61,4);
v.strokeStyle="#ff8a1f";v.lineWidth=3;v.beginPath();v.moveTo(-150,14);v.lineTo(150,8);v.stroke();luTi("GAME OVER",0,4,46,"#e8302a","center");v.restore();v.globalAlpha=1}
if(G.t>64){v.globalAlpha=Math.min(1,(G.t-64)/14);v.fillStyle="rgba(10,6,18,.82)";luInk(W/2-150,136,W/2+150,182,7,3);
luIt(G.ck?"All hearts lost. Back to the checkpoint.":"All hearts lost. Back to the start of the level.",W/2,154,11,"#e8e6f0","center",800);
for(let i=0;i<3;i++){const x=W/2-22+i*22,y=171;v.save();v.translate(x,y);v.rotate((i-1)*.2);luIt("♥",0,0,15,"#4a3c5a","center",900);v.strokeStyle="#1a1226";v.lineWidth=1.5;v.beginPath();v.moveTo(-1,-11);v.lineTo(2,-6);v.lineTo(-2,-3);v.stroke();v.restore()}
if(G.lost>0){luCoin(W/2+66,167,4.5);luIt("-"+G.lost,W/2+74,171,11,"#ff6b7d","left",900)}v.globalAlpha=1}
if(G.t>110&&frame%50<34){v.fillStyle=INK;luInk(W/2-92,206,W/2+92,230,19,2.5);luIt("PRESS ANY KEY TO RETRY",W/2,223,12,HL,"center",900)}}
/* ---- level 1 dressing: sakura trees, paper lanterns on the wires, light shafts, haze, petals ---- */
function sakura(c){const o=c*.6,sp=250,j0=Math.floor(o/sp)-1;for(let j=j0;j<j0+W/sp+3;j++){if(hzf(j+300)<.35)continue;const x=j*sp+hzf(j+310)*120-o,h=70+hzf(j+320)*30,ty=224-h,lean=(hzf(j+330)-.5)*16;
g.strokeStyle="#4a2c36";g.lineCap="round";g.lineWidth=7;g.beginPath();g.moveTo(x,226);g.quadraticCurveTo(x+lean*.3,224-h*.5,x+lean,ty+14);g.stroke();g.lineWidth=3.5;g.beginPath();g.moveTo(x+lean*.5,224-h*.55);g.quadraticCurveTo(x-18,ty+20,x-26,ty+8);g.moveTo(x+lean*.7,224-h*.7);g.quadraticCurveTo(x+22,ty+16,x+30,ty+6);g.stroke();g.lineCap="butt";
const cl=[[0,0,24],[-24,6,18],[24,4,19],[-12,-12,17],[14,-14,16],[-30,-4,12],[32,-6,12],[0,12,16]];
for(const pass of[0,1,2])for(const[dx,dy,r]of cl){const cx=x+lean+dx,cy=ty+dy;g.fillStyle=["#c9608c","#f2a2c2","#ffd3e2"][pass];g.beginPath();g.arc(cx+(pass==2?-r*.25:0),cy+(pass==0?3:pass==2?-r*.3:0),r*(pass==2?.45:pass==1?.88:1),0,7);g.fill()}}}
function lanterns(c){const vis=(x,w)=>x+w>c-10&&x<c+W+10;for(let x=0;x<WW;x+=384){if(!vis(x,384))continue;[.2,.4,.6,.8].forEach((t,i)=>{const px=x+384*t,py=78+68*t*(1-t),sw=Math.sin(frame*.03+px*.01)*.12,red=(i+(x/384|0))%2==0;
g.save();g.translate(px,py);g.rotate(sw);g.strokeStyle="#1a1426";g.lineWidth=1;g.beginPath();g.moveTo(0,0);g.lineTo(0,6);g.stroke();
const gl=g.createRadialGradient(0,13,1,0,13,16);gl.addColorStop(0,red?"rgba(255,140,90,.45)":"rgba(255,236,170,.45)");gl.addColorStop(1,"rgba(255,180,120,0)");g.fillStyle=gl;g.fillRect(-16,-3,32,32);
g.fillStyle="#2a1a20";g.fillRect(-3.5,5,7,2.5);g.fillRect(-3,19,6,2.5);g.fillStyle=red?"#e8453c":"#fff2d0";g.beginPath();g.ellipse(0,13,6,7,0,0,7);g.fill();
g.strokeStyle=red?"#a82a2a":"#d8c49a";g.lineWidth=.7;for(const yy of[9,13,17]){g.beginPath();g.ellipse(0,yy,5.6,1.2,0,0,Math.PI);g.stroke()}g.fillStyle="rgba(255,255,255,.35)";g.fillRect(-3.5,9,1.5,7);g.restore()})}}
function sunShafts(c){const sx=400-c*.03;g.save();g.globalCompositeOperation="lighter";for(let i=0;i<5;i++){const a=1.75+i*.16+Math.sin(frame*.004+i)*.03,l=260;g.fillStyle="rgba(255,244,210,"+(.045+.015*Math.sin(frame*.01+i*2))+")";g.beginPath();g.moveTo(sx,62);g.lineTo(sx+Math.cos(a-.04)*l,62+Math.sin(a-.04)*l);g.lineTo(sx+Math.cos(a+.04)*l,62+Math.sin(a+.04)*l);g.fill()}g.restore()}
function midHaze(){const q=g.createLinearGradient(0,140,0,224);q.addColorStop(0,"rgba(214,238,248,0)");q.addColorStop(1,"rgba(214,238,248,.38)");g.fillStyle=q;g.fillRect(0,140,W,84)}
const PET=Array.from({length:18},(_,i)=>({x:hzf(i+500)*W,y:hzf(i+510)*H,v:.4+hzf(i+520)*.5,ph:hzf(i+530)*6,z:1.1+hzf(i+540)*.6}));
function petalsFront(){const c=cam|0,v=vg;for(const q of PET){const x=((q.x-c*q.z*.4+Math.sin(frame*.02+q.ph)*24-frame*.5*q.z)%W+W)%W,y=(q.y+frame*q.v)%H,r=frame*.05+q.ph;v.save();v.translate(x,y);v.rotate(r);v.scale(1,Math.abs(Math.cos(r*1.3))*.8+.2);v.fillStyle="#ffb7d0";v.beginPath();v.ellipse(0,0,3.2*q.z,2*q.z,0,0,7);v.fill();v.fillStyle="#ffe1ec";v.beginPath();v.ellipse(-.8,-.5,1.3*q.z,.8*q.z,0,0,7);v.fill();v.restore()}}
