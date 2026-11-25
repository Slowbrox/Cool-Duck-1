/* =====================================================================
   Slimes + juicy kills; HUD and dialogs
   Slime enemies, kill effects, world drawing, HUD, dialog box, shop and end screens.
   ===================================================================== */
/* ---- v3: slimes + juicy kills ---- */
let hs=0,shk=0,kills=0,combo=0,cmT=0,POP=[];
const SLP=[["#b8f58a","#5fd36a","#3a9a52","#1f5a32"],["#a8e4ff","#5cb4f0","#3a7fc4","#1f3f7a"],["#ffc2e8","#f58ad0","#c85aa8","#6a2a62"],["#e8c88a","#a8703a","#7a4a22","#3a2412"]];
function kill(e,st){e.dead=1;e.dt=28;kills++;combo=cmT>0?combo+1:1;cmT=120;coins+=2;lvC+=2;water=Math.min(MAXW,water+1);hs=st?5:3;shk=st?7:4;const x=e.x+11,y=e.y+10,P_=SLP[e.c|0];
for(let i=0;i<16;i++){const a=rn()*6.28,v=1+rn()*3.6;fxAdd(FX,{x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-2,l:22+(rn()*14|0),s:2+rn()*3,g:.2,t:"o",c:i%3?P_[1]:P_[0]})}
for(let i=0;i<8;i++){const a=i*.785;fxAdd(FX,{x,y,vx:Math.cos(a)*4,vy:Math.sin(a)*4,l:8,t:"s",g:0,dr:.9})}
/* no text on a KO: the two coins it drops just fly up into the coin counter */
for(let j=0;j<2;j++)FC.push({x:x-(cam|0)+(j?7:-7),y:y-6,t:0,ph:j*2});
sfx(380+Math.min(combo,8)*70,.1,"triangle",.07,900+combo*90);sfx(520,.14,"sine",.08,140,.04);sfx(200,.12,"square",.04,70,.02)}
function slime(e){if(e.sp){kuriDraw(e);return}const air=e.y<206,sy=air?1+Math.min(.25,Math.abs(e.vy)*.06):1+Math.sin(frame/8+e.x*.1)*.04-e.sq,w=Math.round(24*(2-sy)),h=Math.round(18*sy),xc=e.x+11,yb=Math.round(e.y+18),P_=SLP[e.c|0],wd=i=>Math.max(4,Math.round(w*Math.sqrt(1-(1-(i+2)/h)**2)));
for(let i=0;i<h;i+=2)R(xc-wd(i)/2-1,yb-h+i,wd(i)+2,2,P_[3]);R(xc-w/2,yb,w,1,P_[3]);
for(let i=0;i<h;i+=2)R(xc-wd(i)/2,yb-h+i,wd(i),2,i<h*.3?P_[0]:i>h*.7?P_[2]:P_[1]);
const ex=e.d>0?2:-2,ey=yb-h*.62;R(xc-6+ex,ey,4,5,"#fff");R(xc+2+ex,ey,4,5,"#fff");R(xc-5+ex+(e.d>0?1:0),ey+1,2,3,"#222");R(xc+3+ex+(e.d>0?1:0),ey+1,2,3,"#222");R(xc-1+ex,yb-h*.28,3,1,P_[3]);R(xc-w*.32,yb-h*.82,3,2,"#fff")}
function splat(e){const k=e.dt/28,w=Math.round(30*(2-k)),xc=e.x+11,P_=SLP[e.c|0];g.globalAlpha=k;R(xc-w/2-1,223-(3*k|0),w+2,(3*k|0)+2,P_[3]);R(xc-w/2,223-(3*k|0),w,(3*k|0)+1,P_[1]);g.globalAlpha=1}
function worldDraw(){const c=cam|0;bgDraw(c);g.save();g.translate(-c,0);
fieldDeco(c);ckDraw(c);
const vis=(x,w)=>x+w>c-10&&x<c+W+10;
for(const q of P)if(q.k=="g"&&vis(q.x-8,q.w+16)){for(let x=q.x;x<q.x+q.w;x+=T){if(!vis(x,T))continue;gtField(x)}gtEdges(q)}


for(const q of P){if(q.k=="g"||!vis(q.x,q.w))continue;const{x,y,w,h}=q;
if(q.k=="c")crateDraw(x,y,w,h);else if(q.k=="h")hillDraw(q);
else if(q.k=="m"){R(x,y,w,h,"#3a2f1c");for(let i=0;i<Math.ceil(h/10);i++)R(x+4+(i*7)%20,y+6+i*10,8+i%3*3,6,"#5a4a2a");R(x,y,w,2,"#5a4a2a")}else if(q.k=="v")vmDraw(x,y,["#e8453c","#3a9ad9","#7a5cc8"][(x/T)%3|0]);
else if(q.o)pfDraw(q);else platDraw(q)}
for(const q of PL)if(vis(q.x-60,120))flowerDraw(q);gpDraw();
for(const q of AN)hookDraw(g,q);hsDraw();
for(const s of SE)if(!s.g&&!s.e&&frame%100<40){const k=frame%100<20?5:3;R(s.x-1,s.y-k,2,k*2,"#fff");R(s.x-k,s.y-1,k*2,2,"#fff")}
for(const k of C)if(!k.g&&vis(k.x-10,20)){const ph=k.x*.05;coinDraw(k.x,k.y+Math.sin(frame*.06+ph)*2,frame*.09+ph,1)}
for(const e of E){if(!e.dead){slime(e);if(e.fl>0){g.globalAlpha=Math.min(.7,e.fl/14);g.fillStyle="#fff";g.beginPath();g.ellipse(e.x+11,e.y+11,12,9,0,0,7);g.fill();g.globalAlpha=1}}else if(e.dt>0)splat(e)}


sqv=Math.max(-.08,Math.min(.08,-p.vy*.008));
POP.forEach(q=>TX(q.s,q.x,q.y,q.c,q.f,"center"));sqv=0;g.restore();
}
function hud(){R(4,4,230,56,"#000b");const hx=HIT.t>0?Math.sin(HIT.t*1.9)*2.5*HIT.t/26:0;for(let i=0;i<5;i++){const lost=i==hearts&&HIT.t>0;TX("♥",10+i*14+hx,22-(lost?(26-HIT.t)*.5:0),lost?(HIT.t%4<2?"#fff":"#ff5a6e"):i<hearts?"#ff5a6e":"#4a3c5a",lost?16+(26-HIT.t)*.3:16)}coinIco(g,16,37,6.5);TX(""+Math.max(0,coins-FC.length),26,43,"#ffd24a",CN.bump>0?17:15);starIcon(g,118,37,6+(CN.sb>0?CN.sb*.3:0),HSN()>0);TX(""+HSN(),128,42,"#ffe680",13);

if(soda>0)TX("SODA "+(soda/60|0)+"s",W-8,20,"#7cff6b",12,"right");
if(bn&&bn.t>0){g.font="bold 13px "+FM;const bw=g.measureText(bn.s).width+28;R(W/2-bw/2,70,bw,24,"#000d");TX(bn.s,W/2,88,"#ffd66b",13,"center")}if(combo>1)TX("COMBO x"+combo,W-8,44,"#ffd66b",14+Math.min(6,combo),"right");hudFx()}
function wrap(s,mw){const o=[];let l="";for(const w of s.split(" ")){if(g.measureText(l+w).width>mw){o.push(l);l=""}l+=w+" "}o.push(l);return o}
function dlgDraw(){const d=dlg,s=d.L[d.i];let n=Math.min(s.length,d.c*1.2|0);R(12,H-82,W-24,70,"#1b1426");g.strokeStyle="#ffd66b";g.lineWidth=2;g.strokeRect(13,H-81,W-26,68);
g.font="bold 13px "+FM;R(20,H-96,g.measureText(d.n).width+18,18,"#ffd66b");TX(d.n,29,H-82,"#1b1426",13);
wrap(s,W-56).forEach((l,i)=>{const t=l.slice(0,Math.max(0,n));n-=l.length;TX(t,26,H-58+i*17,"#fff",13)});
if(d.c*1.2>=s.length&&frame%40<24)TX("▼",W-30,H-20,"#ffd66b",12)}
function shopDraw(){const s=sh.s;R(0,0,W,H,"#e9f5ee");R(0,0,W,40,s.c);TX(s.n,W/2,27,"#fff",18,"center");R(0,226,W,62,"#cfd8dc");for(let i=0;i<W;i+=32)R(i,226+((i/32)%2)*30,32,2,"#b0bec5");
const cl=["#e44","#4a4","#ec3","#48d","#c6c","#fa3"];for(let r=0;r<3;r++){R(20,76+r*44,300,5,"#8a6a4a");for(let i=0;i<14;i++)R(24+i*21,60+r*44,14,16,cl[(i*3+r*5)%6])}
R(330,170,170,58,"#b0875a");R(450,152,28,18,"#333");R(455,156,18,6,"#7cff6b");human(410,170,{b:s.c,s:"#f2c9a0",h:"#222",hat:s.c});
R(24,164,290,118,"#1b1426ee");const it=["Onigiri  5¢  (+1 ♥)","Melon Soda  8¢  (super jump)","Spring Water  3¢  (+3 gulps)","Leave the store"];
it.forEach((t,i)=>TX((sh.i==i?"▶ ":"  ")+t,36,204+i*22,sh.i==i?"#ffd66b":"#fff",13));TX("You have ¢"+coins+"   Water "+water+"/"+MAXW,36,182,"#9fd",11);if(sh.m){R(W/2-130,46,260,18,"#000c");TX(sh.m,W/2,59,"#ffd66b",11,"center")}}
function endDraw(){R(0,0,W,H,"#150d24");CF.forEach(c=>R(c.x,c.y,4,4,c.c));const k=Math.sin(frame/10)*6|0;g.shadowColor="#ff4fd8";g.shadowBlur=14;TX("WELCOME TO THE",W/2,90,"#ffc928",20,"center");TX("KONBINI CLUB!",W/2,126+k,"#e8302a",34,"center");g.shadowBlur=0;
TX("Coins "+coins+"  ·  KOs "+kills+"  ·  Bread "+HSN(),W/2,180,"#fff",14,"center");TX("Spend your bread on skateboards in the wardrobe!",W/2,206,"#ffd66b",12,"center");TX("Press R for the lobby: spend your coins!",W/2,248,"#cfe",12,"center")}
