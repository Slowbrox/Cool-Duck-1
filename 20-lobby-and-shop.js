/* =====================================================================
   Lobby + shop UI
   UI text/boxes, shop wardrobe, lobby clicks and lobby update.
   Uses the same ink-brush / slanted-type look as the level-clear screen.
   ===================================================================== */
function brk(x,y,w,h,col){const l=Math.min(10,w/3,h/3),r=Math.min(5,l*.6);vg.save();vg.lineCap="round";vg.lineJoin="round";for(const[lw,c]of[[5,"#111"],[2.4,col]]){vg.lineWidth=lw;vg.strokeStyle=c;vg.beginPath();
vg.moveTo(x,y+l);vg.arcTo(x,y,x+l,y,r);vg.lineTo(x+l,y);vg.moveTo(x+w-l,y);vg.arcTo(x+w,y,x+w,y+l,r);vg.lineTo(x+w,y+l);vg.moveTo(x+w,y+h-l);vg.arcTo(x+w,y+h,x+w-l,y+h,r);vg.lineTo(x+w-l,y+h);vg.moveTo(x+l,y+h);vg.arcTo(x,y+h,x,y+h-l,r);vg.lineTo(x,y+h-l);vg.stroke()}vg.restore()}
const vrr=(x,y,w,h,r)=>{vg.beginPath();if(vg.roundRect)vg.roundRect(x,y,w,h,r);else vg.rect(x,y,w,h)};
function utxt(s,x,y,f,c,al){vg.save();vg.font="bold "+f+"px "+FM;vg.textAlign=al||"left";vg.lineJoin="round";vg.lineWidth=4;vg.strokeStyle="#111";vg.fillStyle=c;vg.strokeText(s,x,y);vg.fillText(s,x,y);vg.restore()}
function tagTxt(s,x,y,w,h,bg,fg){vrr(x-1,y-1,w+2,h+2,(h+2)/2);vg.fillStyle="#0c0a12";vg.fill();vrr(x,y,w,h,h/2);vg.fillStyle=bg;vg.fill();vrr(x+3,y+1,w-6,h*.35,h*.2);vg.fillStyle="rgba(255,255,255,.12)";vg.fill();vg.save();vg.font="800 10px "+FM;vg.fillStyle=fg;if(s.includes("\u00a2")){const tx=s.replace("\u00a2",""),tw=vg.measureText(tx).width,x0=x+w/2-(tw+9)/2;coinIco(vg,x0+3.5,y+h/2,3.3);vg.fillStyle=fg;vg.textAlign="left";vg.fillText(tx,x0+9,y+h-3.5)}else if(s.includes("\u2605")){const tx=s.replace("\u2605",""),tw=vg.measureText(tx).width,x0=x+w/2-(tw+10)/2;starIcon(vg,x0+4,y+h/2,3.6,1);vg.fillStyle=fg;vg.textAlign="left";vg.fillText(tx,x0+10,y+h-3.5)}else{vg.textAlign="center";vg.fillText(s,x+w/2,y+h-3.5)}vg.restore()}

/* ---- UI kit ---- */
const LU={cd:-1,pop:0},INK="#0c0a12",DKT="#1a1226",HL="#ffb612",MUT="#bdb8d0";
const luC=x=>Math.max(0,Math.min(1,x));
const luJ=(a,f,m)=>(Math.sin(a*12.9898+f*78.233)*43758.5453%1)*m;
function luInk(x0,y0,x1,y1,s,rg,f){const v=vg;f=f||0;v.beginPath();const n=Math.max(1,(x1-x0)/9|0),m=Math.max(1,(y1-y0)/9|0);
for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,y=y0+luJ(i+s,f,rg)+(i%2?-rg*.6:0);i?v.lineTo(x,y):v.moveTo(x,y)}
for(let i=1;i<=m;i++)v.lineTo(x1+luJ(i+s+50,f,rg),y0+(y1-y0)*i/m);
for(let i=n;i>=0;i--)v.lineTo(x0+(x1-x0)*i/n,y1+luJ(i+s+90,f,rg)+(i%2?rg*.6:0));
for(let i=m;i>=1;i--)v.lineTo(x0+luJ(i+s+130,f,rg),y0+(y1-y0)*i/m);v.closePath();v.fill()}
function luIt(s,x,y,z,col,al,w,r){const v=vg;v.save();v.translate(x,y);v.rotate(r||0);v.transform(1,0,-.2,1,0,0);v.font=(w||800)+" "+z+"px "+FM;v.textAlign=al||"left";v.fillStyle=col;v.fillText(s,0,0);v.restore()}
function luTi(s,x,y,z,col,al,r){const v=vg;v.save();v.translate(x,y);v.rotate(r||0);v.transform(1,0,-.18,1,0,0);v.font=z+"px "+FB;v.textAlign=al||"left";v.lineJoin="round";v.lineWidth=z/6;v.strokeStyle=DKT;v.fillStyle=DKT;v.strokeText(s,2,3);v.fillText(s,2,3);v.strokeText(s,0,0);v.fillStyle=col;v.fillText(s,0,0);v.restore()}
function luW(s,z,w){vg.save();vg.font=(w||800)+" "+z+"px "+FM;const q=vg.measureText(s).width;vg.restore();return q}
function luCoin(x,y,r){coinIco(vg,x,y,r)}
function luKey(s,x,y){const v=vg;v.save();v.font="800 8px "+FM;const w=Math.max(13,v.measureText(s).width+8);vrr(x,y-10,w,14,3);v.fillStyle=INK;v.fill();vrr(x+1,y-10,w-2,12,2.5);v.fillStyle="#e8e6f0";v.fill();v.fillStyle=DKT;v.textAlign="center";v.fillText(s,x+w/2,y-1.5);v.restore();return w}
function luCoins(a){if(LU.cd<0)LU.cd=coins;if(LU.cd!=coins){const d=coins-LU.cd;LU.cd+=Math.sign(d)*Math.max(1,Math.abs(d)*.12|0);LU.pop=1}else LU.pop*=.86;
const v=vg,s=""+LU.cd,w=luW(s,15,900),x1=W-8,x0=x1-w-32,k=1+LU.pop*.18;v.globalAlpha=a;v.fillStyle=INK;luInk(x0,6,x1,28,21,2.2);luCoin(x0+13,17,5.5);
v.save();v.translate(x1-7,23);v.scale(k,k);luIt(s,0,0,15,LU.pop>.1?"#ffc933":"#fff","right",900);v.restore();luStars(x0);v.globalAlpha=1}

/* ---- room: bottom menu + object tags ---- */
const LTAG={cab:["WARDROBE",402,112]},DNL=300;
const SBACK=[W-74,264,70,22],SPGL=[86,262,26,22],SPGR=[182,262,26,22];
function setPg(d){lb.pg=(lb.pg+d+NPG)%NPG;lb.pgT=10;lb.pgD=d;lb.touched=1;sfx(520,.05,"triangle",.05,780);noiz(.08,"bandpass",900,2200,.04,0,1.5)}
function luTag(k,on,a){const[s,x,y0]=LTAG[k],v=vg,y=y0+Math.sin(lb.t*.1)*1.5,w=luW(s,11,900)+16;v.globalAlpha=a;v.fillStyle=on?HL:INK;luInk(x-w/2,y-13,x+w/2,y+3,k.length*7,1.6,on?frame>>3:0);
v.beginPath();v.moveTo(x-4,y+2);v.lineTo(x+4,y+2);v.lineTo(x,y+7);v.closePath();v.fill();luIt(s,x+1,y-1,11,on?DKT:"#fff","center",900);v.globalAlpha=1}
function roomUI(){const v=vg,a=luC(lb.t/24)*(1-luC(lb.mc/10))*(lb.go>0?1-luC(lb.go/10):1);if(a<=0)return;
luTag("cab",lb.ms==1||lb.hov=="cab",a);
v.globalAlpha=a;let x=10;if(GPL){for(const[kk,d]of[["A","go"],["X","book"],["Y","radio"]]){x+=luKey(kk,x,281)+4;luIt(d,x,280,10,"#e8e6f0","left",800);x+=luW(d,10)+10}}
else{x+=luKey("←",x,281)+2;x+=luKey("→",x,281)+5;luIt("choose",x,280,10,"#e8e6f0","left",800);x+=luW("choose",10)+12;x+=luKey("ENTER",x,281)+5;luIt("go",x,280,10,"#e8e6f0","left",800)}
v.globalAlpha=1;if(lb.rad)radUI(a);if(lb.bk)bookUI(a);luCoins(a)}

/* ---- radio: pick a song (empty slots wait for future tracks) ---- */
const radN=()=>Math.max(RADIO_SLOTS,TRACKS.length),radR=i=>[32,122+i*16,166,14],radP=()=>[22,92,186,36+radN()*16],RADX=[186,97,16,15];
const radHi=()=>{const h=lb.hov;return h&&h[0]=="r"&&h!="rx"&&h!="rs"?+h.slice(1):-1},RADS=[114,100,64,16];
function radShuf(){mShuffle(!SHUF);sfx(SHUF?880:520,.06,"sine",.035,SHUF?1320:390);if(SHUF)sfx(1320,.05,"sine",.015,0,.05)}
function radUI(a){const v=vg,k=luC(lb.radT/8),e=1-Math.pow(1-k,3),P=radP(),hr=radHi();v.save();v.globalAlpha=a*k;v.translate(0,(1-e)*8);
v.fillStyle="rgba(10,6,18,.9)";luInk(P[0],P[1],P[0]+P[2],P[1]+P[3],61,2.4);
luTi("RADIO",34,114,18,HL,"left",-.03);v.strokeStyle="#ff8a1f";v.lineWidth=2;v.lineCap="round";v.beginPath();v.moveTo(34,119);v.lineTo(102,117);v.stroke();
{const r=RADS,on=SHUF,hv=lb.hov=="rs",ic=on?DKT:hv?"#fff":MUT,ix=r[0]+10,iy=r[1]+8;v.fillStyle=on?HL:hv?"#3a3350":"rgba(255,255,255,.08)";v.beginPath();srrV(v,r[0],r[1],r[2],r[3],8);v.fill();
v.strokeStyle=ic;v.lineWidth=1.3;v.lineCap="round";v.lineJoin="round";v.beginPath();v.moveTo(ix-5,iy-3);v.bezierCurveTo(ix-1,iy-3,ix+1,iy+3,ix+4.5,iy+3);v.moveTo(ix-5,iy+3);v.bezierCurveTo(ix-1,iy+3,ix+1,iy-3,ix+4.5,iy-3);v.stroke();
v.beginPath();v.moveTo(ix+2.6,iy-5);v.lineTo(ix+5,iy-3);v.lineTo(ix+2.6,iy-1);v.moveTo(ix+2.6,iy+1);v.lineTo(ix+5,iy+3);v.lineTo(ix+2.6,iy+5);v.stroke();luIt("SHUFFLE",r[0]+19,r[1]+11,8,ic,"left",900)}
{const cx=RADX[0]+8,cy=RADX[1]+7;v.strokeStyle=lb.hov=="rx"?HL:"#e8e6f0";v.lineWidth=2;v.beginPath();v.moveTo(cx-4,cy-4);v.lineTo(cx+4,cy+4);v.moveTo(cx+4,cy-4);v.lineTo(cx-4,cy+4);v.stroke()}
for(let i=0;i<radN();i++){const r=radR(i),y=r[1];
if(i<TRACKS.length){const on=hr==i||(hr<0&&lb.rsel==i),cur=i==MTR,fc=on?DKT:cur?"#ffc933":"#fff";
if(on){v.fillStyle=HL;luInk(r[0],y,r[0]+r[2],y+r[3],i*9+5,1.6,frame>>3)}
if(cur){v.fillStyle=fc;for(let b=0;b<3;b++){const hh=2+Math.abs(Math.sin(mBeat()*Math.PI+b*1.3))*7;v.fillRect(r[0]+5+b*3.4,y+12-hh,2.2,hh)}}
else{v.fillStyle=on?DKT:MUT;v.beginPath();v.arc(r[0]+9,y+7,1.8,0,7);v.fill()}
luIt(TRACKS[i].n,r[0]+20,y+11,11,fc,"left",900)}
else{v.globalAlpha=a*k*.5;v.strokeStyle=MUT;v.lineWidth=1;v.setLineDash([2,3]);v.beginPath();v.moveTo(r[0]+4,y+7);v.lineTo(r[0]+14,y+7);v.stroke();v.setLineDash([]);luIt("COMING SOON",r[0]+20,y+11,10,MUT,"left",800);v.globalAlpha=a*k}}
v.restore()}
function radOpen(){lb.rad=1;lb.radT=0;lb.rsel=MTR;lb.look=-1;sfx(880,.05,"square",.04,1320);noiz(.12,"bandpass",1200,3000,.05,0,1.5)}
function radClose(){lb.rad=0;sfx(300,.05,"square",.03,150)}
function radPick(i){if(i<0||i>=TRACKS.length)return;const ch=i!=MTR;mPlay(i);lb.rsel=i;lb.dn=lb.dn>0?12:1;lb.look=-1;
sfx(ch?990:660,.06,"square",.04,1320);if(ch)noiz(.3,"bandpass",400,3200,.06,0,1.2)}

/* ---- hanging paper price tag tied to its item with twine; swings a little ---- */
const tagPath=(v,w,h,o)=>{v.beginPath();v.moveTo(-w/2+4+o,o);v.lineTo(w/2-4+o,o);v.lineTo(w/2+o,4+o);v.lineTo(w/2+o,h+o);v.lineTo(-w/2+o,h+o);v.lineTo(-w/2+o,4+o);v.closePath()};
function hangTag(L,ax,ay,tx,ty,sd){const v=vg,a=Math.sin(frame*.035+sd*2.1)*.05+((sd*.618)%1-.5)*.16,h=14;
v.save();v.font="800 7.5px "+FM;const tw=L.t?v.measureText(L.t).width:0,iw=L.ico?(L.t?8:9):0,w=Math.max(20,tw+iw+10),hx=tx-Math.sin(a)*3.2,hy=ty+Math.cos(a)*3.2;
v.lineCap="round";v.strokeStyle="#c9a46a";v.lineWidth=.9;v.beginPath();v.moveTo(ax,ay);v.quadraticCurveTo((ax+hx)/2+1.5,(ay+hy)/2+1,hx,hy);v.stroke();
v.translate(tx,ty);v.rotate(a);v.fillStyle="rgba(10,4,10,.35)";tagPath(v,w,h,1.3);v.fill();
tagPath(v,w,h,0);v.fillStyle=L.bg;v.fill();v.strokeStyle=L.bd||"#2a2238";v.lineWidth=.9;v.stroke();
v.fillStyle="rgba(255,255,255,.18)";v.fillRect(-w/2+1.5,h-3,w-3,1);
v.strokeStyle=L.ring||"rgba(40,20,30,.35)";v.lineWidth=.8;v.beginPath();v.arc(0,3.2,2.2,0,7);v.stroke();v.fillStyle="#2a1420";v.beginPath();v.arc(0,3.2,1.2,0,7);v.fill();
let x=-(tw+iw)/2;
if(L.ico=="coin"){coinIco(v,x+3,9.6,2.8);x+=iw}else if(L.ico=="star"){starIcon(v,x+3.4,9.4,3.3,1);x+=iw}
else if(L.ico=="chk"){v.strokeStyle=L.fg;v.lineWidth=1.6;v.lineJoin="round";v.beginPath();v.moveTo(x+1,9.2);v.lineTo(x+3.4,11.6);v.lineTo(x+8,6.8);v.stroke();x+=iw}
if(L.t){v.fillStyle=L.fg;v.textAlign="left";v.fillText(L.t,x,12.2)}v.restore()}
/* ---- wardrobe: header, item card, price tags ---- */
function shopUI(C){const v=vg,a=luC((lb.zp-.9)*10);v.globalAlpha=a;
luTi("WARDROBE",296,30,22,HL,"left",-.03);v.strokeStyle="#ff8a1f";v.lineWidth=2.5;v.lineCap="round";v.beginPath();v.moveTo(296,36);v.lineTo(410,33);v.stroke();
v.fillStyle="rgba(10,6,18,.86)";luInk(292,42,506,92,17,2);
const sl=lb.sel;
if(sl){const r=sl.r,c=sl.c,k=K3[r],ow=OWN[k].includes(c),eq=CS[k]==c,p_=CAT[r][2][c];
luIt(CAT[r][0],303,56,9,MUT,"left",800);luIt((c+1)+" / "+CAT[r][1].length,496,56,9,MUT,"right",800);luIt(CAT[r][1][c],303,73,16,"#fff","left",900);
if(lb.mt>0)luIt(lb.m,303,86,10,"#ffd66b","left",800);
else if(eq)luIt("EQUIPPED",303,86,10,"#7cff6b","left",900);
else if(ow)luIt("OWNED · click to wear",303,86,10,MUT,"left",800);
else{const wl=wal(r);if(r==4)starIcon(vg,308,82.5,4.5,1);else luCoin(308,82.5,4);const ok=wl>=p_;luIt(ok?p_+"  ·  click again to buy":"need "+(p_-wl)+" more",316,86,10,ok?"#ffc933":"#ff6b7d","left",800)}}
else{luIt("PICK AN ITEM",303,56,9,MUT,"left",800);luIt("Try something on",303,73,16,"#fff","left",900);luIt(lb.pg<2?"Hats, jackets and scarves":"Duck colours (coins) + boards (bread)",303,86,10,MUT,"left",800)}
for(let r=0;r<3;r++)for(let c0=0;c0<5;c0++){const s_=slot(lb.pg,r,c0),R_=s_.r,c=s_.c,q=cellR(r,c0),sx=C.X(q[0]),sy=C.Y(q[1]),w=q[2]*C.z,h=q[3]*C.z,ow=OWN[K3[R_]].includes(c),eq=CS[K3[R_]]==c,pr_=CAT[R_][2][c],wl=wal(R_),cu=R_==4?"\u2605":"\u00a2",isel=lb.sel&&lb.sel.r==R_&&lb.sel.c==c;
const ico=R_==4?"star":"coin",ok=wl>=pr_,exc=R_==4||pr_>=50,L=eq?{t:"WORN",bg:"#ffc933",fg:DKT,bd:"#7a5410"}:ow?{t:"",ico:"chk",bg:"#e6dfcc",fg:"#3a8a3a"}:isel&&ok?{t:"BUY "+pr_,ico,bg:HL,fg:DKT,bd:"#7a5410"}:
exc?{t:""+pr_,ico,bg:"#15111c",fg:ok?"#ffcf5a":"#ff6b7d",bd:"#d9a441",ring:"#d9a441"}:{t:""+pr_,ico,bg:"#f4ecd8",fg:ok?"#2a2238":"#c0392b"};
const cx_=q[0]+q[2]/2,ay=R_==0?q[1]+q[3]-10:R_==1?q[1]+28.5:R_==2?q[1]+20.5:R_==3?q[1]+q[3]/2+6:q[1]+q[3]/2+2.4,sd=R_*10+c;
hangTag(L,C.X(cx_),C.Y(ay),C.X(cx_+((sd*.37)%1-.5)*2.4),C.Y([155.5,201,240][r]),sd);
const kcur=lb.kc&&lb.kc.on&&lb.kc.r==r&&lb.kc.c==c0;
if(isel)brk(sx+2,sy+2,w-4,h-4,HL);else if(lb.hov=="c"+R_+"_"+c||kcur)brk(sx+2,sy+2,w-4,h-4,"#fff");if(kcur&&isel){v.fillStyle="#fff";v.beginPath();v.moveTo(sx+w/2-4,sy-1);v.lineTo(sx+w/2+4,sy-1);v.lineTo(sx+w/2,sy+4);v.fill()}}
{const x0=SPGL[0],x1=SPGR[0]+SPGR[2],y0=SPGL[1],y1=y0+SPGL[3];v.fillStyle=INK;luInk(x0,y0,x1,y1,53,2);
for(const[k,R_,s]of[["pgl",SPGL,"‹"],["pgr",SPGR,"›"]]){const on=lb.hov==k;if(on){v.fillStyle=HL;luInk(R_[0]+2,R_[1]+2,R_[0]+R_[2]-2,R_[1]+R_[3]-2,7,1.5,frame>>3)}luIt(s,R_[0]+R_[2]/2,R_[1]+16,17,on?DKT:"#fff","center",900)}
luIt("PAGE "+(lb.pg+1)+" / "+NPG,(x0+x1)/2,y0+15,10,"#e8e6f0","center",900)}
const bh=lb.hov=="back",bw=luW("BACK",11,900);v.fillStyle=bh?HL:INK;luInk(SBACK[0],SBACK[1],SBACK[0]+SBACK[2],SBACK[1]+SBACK[3],41,2,bh?frame>>3:0);
luKey("ESC",SBACK[0]+7,SBACK[1]+17);luIt("BACK",SBACK[0]+SBACK[2]-8,SBACK[1]+16,11,bh?DKT:"#fff","right",900);
v.globalAlpha=1;luCoins(a)}
function uiDraw(C){
if(lb.mode!="shop"&&lb.zp<.9)roomUI();
if(lb.zp>.9)shopUI(C);
if(lb.go>0){vg.fillStyle="rgba(0,0,0,"+Math.min(1,lb.go/26)+")";vg.fillRect(0,0,W,H)}}

function leaveShop(){if(lb.mode!="shop")return;lb.mode="zoomout";lb.sel=null;lb.mt=0;sfx(300,.06,"square",.04,150)}
function pick(r,c){const k=K3[r],ca=CAT[r],isel=lb.sel&&lb.sel.r==r&&lb.sel.c==c;lb.touched=1;
if(OWN[k].includes(c)){lb.sel={r,c};CS[k]=c;saveG();sfx(700,.08,"triangle",.06,1000);lb.mt=0;return}
if(isel){if(wal(r)>=ca[2][c]){if(r==4)STARS-=ca[2][c];else coins-=ca[2][c];OWN[k].push(c);CS[k]=c;saveG();chime();lb.m="Bought "+ca[1][c]+"!";lb.mt=110}else{lb.m=r==4?"Not enough bread. Find the hidden loaves!":"Not enough coins.";lb.mt=110;sfx(150,.2,"sawtooth",.05,80)}}
else{lb.sel={r,c};lb.mt=0;sfx(600,.04)}}
function lobbyGo(i){if(lb.mode!="room"||lb.go>0)return;lb.touched=1;
if(i==0){lb.ms=0;lb.go=1;lb.goLv=LVR[0]?-1:0;/* door: world map (the tutorial first if it was never finished) */sfx(90,.4,"sawtooth",.1,60);noiz(.3,"bandpass",300,900,.08,0,1.2)}
else{lb.ms=1;lb.mode="zoomin";sfx(260,.1,"square",.05,120);noiz(.2,"bandpass",600,1400,.05,0,1.5)}}
function lobbyClick(x,y,btn){if(S!="lobby"||lb.go>0)return;lb.idle=0;lb.touched=1;
if(lb.mode=="room"){const h=hotAt(x,y);
if(lb.bk){if(btn==2||h=="bkx"||!inR(x,y,SRA))bookClose();else if(h)bookPlay(+h.slice(2));return}
if(lb.rad){if(btn==2||h=="rx"||!inR(x,y,radP()))radClose();else if(h=="rs")radShuf();else if(h)radPick(+h.slice(1));return}
if(h=="book")bookOpen();
else if(h=="box")radOpen();
else if(h=="duck"){if(lb.look<0&&!lb.dn){lb.look=0;sfx(180,.05,"square",.04,90)}}
else if(h=="cab")lobbyGo(1);
else if(h=="door")lobbyGo(0)}
else if(lb.mode=="shop"){if(btn==2){leaveShop();return}if(inR(x,y,SPGL)){setPg(-1);return}if(inR(x,y,SPGR)){setPg(1);return}const c=cellAt(x,y);if(c){pick(c.r,c.c);return}
if(inR(x,y,SDK)){if(lb.look<0){lb.look=0;sfx(180,.05,"square",.04,90)}return}
if(!cabShop(x,y))leaveShop()}}
function lobbyOpen(){S="lobby";lb={t:0,m:"",mt:0,mode:"room",zp:0,mc:0,go:0,look:-1,sel:null,idle:0,hov:"",touched:0,ms:0,pg:0,pgT:0,pgD:1,dn:0,rad:0,radT:0,rsel:0,bk:0,bkT:0,bsel:0,goLv:0};LP=Object.assign({},CS);LU.cd=coins;saveG()}
function lobbyUpd(){lb.t++;lb.idle++;if(lb.t==4){noiz(.45,"highpass",2600,4200,.05,0,.7);noiz(.22,"highpass",3000,5000,.04,.55,.7)}
if(lb.look>=0){lb.look++;if(lb.look==14)noiz(.12,"bandpass",900,2400,.05,0,1.5);if(lb.look==40||lb.look==124)sfx(1500,.03,"square",.03,700);if(lb.look>170)lb.look=-1}
if(lb.dn>0&&(++lb.dn>DNL||lb.mode!="room"))lb.dn=0;
if(lb.rad){if(lb.radT<8)lb.radT++;if(lb.mode!="room"||lb.go)lb.rad=0}
if(lb.bk){bookTick();if(lb.mode!="room")lb.bk=0}
if(lb.go>0){lb.go++;if(lb.go>=30){saveG();const gl=lb.goLv;if(gl>0)start(gl);else if(gl<0)wmOpen();else t1Start();return}}
if(lb.mode=="zoomin"){lb.mc++;if(lb.mc>=54)lb.mode="shop"}else if(lb.mode=="zoomout"){lb.mc--;if(lb.mc<=0){lb.mc=0;lb.mode="room"}}
lb.dp=ez(lb.mc/22);lb.zp=Math.max(0,Math.min(1,(lb.mc-10)/44));
if(lb.mode=="shop"&&pr("Escape","Backspace","KeyQ"))leaveShop();
/* wardrobe cursor for keyboard / controller: arrows move between items (wrapping onto the next page), A / Enter picks */
if(lb.mode=="shop"){const kc=lb.kc||(lb.kc={r:0,c:0,on:0}),tk=()=>{kc.on=1;sfx(600,.03,"sine",.02)};
if(pr("PageUp"))setPg(-1);else if(pr("PageDown"))setPg(1);
if(pr("ArrowLeft","KeyA")){if(!kc.on)tk();else{tk();if(kc.c>0)kc.c--;else{setPg(-1);kc.c=4}}}
else if(pr("ArrowRight","KeyD")){if(!kc.on)tk();else{tk();if(kc.c<4)kc.c++;else{setPg(1);kc.c=0}}}
if(pr("ArrowUp","KeyW")){tk();kc.r=(kc.r+2)%3}else if(pr("ArrowDown","KeyS")){tk();kc.r=(kc.r+1)%3}
if(kc.on&&pr("Enter","Space","KeyE")){const s_=slot(lb.pg,kc.r,kc.c);pick(s_.r,s_.c)}
if(MX!=lb.pmx||MY!=lb.pmy){if(lb.pmx!=null)kc.on=0;lb.pmx=MX;lb.pmy=MY}}if(lb.pgT>0)lb.pgT--;
if(lb.mode=="room"&&lb.go==0&&lb.bk)bookKeys();
else if(lb.mode=="room"&&lb.go==0&&lb.rad){const n=TRACKS.length;
if(pr("Escape","Backspace","KeyQ","KeyR"))radClose();else if(pr("KeyT"))radShuf();
else{if(pr("ArrowUp","KeyW")){lb.rsel=(lb.rsel+n-1)%n;sfx(600,.03)}if(pr("ArrowDown","KeyS")){lb.rsel=(lb.rsel+1)%n;sfx(600,.03)}if(pr("Enter","Space","KeyE"))radPick(lb.rsel)}}
else if(lb.mode=="room"&&lb.go==0){if(pr("KeyR"))radOpen();if(pr("KeyB"))bookOpen();
if(pr("ArrowLeft","ArrowRight","ArrowUp","ArrowDown","KeyA","KeyD","KeyW","KeyS")){lb.ms^=1;lb.idle=0;lb.touched=1;sfx(600,.03)}
if(pr("Enter","Space","KeyE"))lobbyGo(lb.ms);else if(pr("KeyP"))lobbyGo(0);else if(pr("KeyC"))lobbyGo(1)}
const ph=lb.hov;lb.hov=hotAt(MX,MY);CV.style.cursor=lb.hov=="wall"?"zoom-out":lb.hov?"pointer":"default";
if(lb.mode=="room"&&lb.hov!=ph){const m=lb.hov=="door"?0:lb.hov=="cab"?1:-1;if(m>=0&&m!=lb.ms){lb.ms=m;sfx(600,.03)}}
LP=Object.assign({},CS);if(lb.sel&&lb.mode=="shop")LP[K3[lb.sel.r]]=lb.sel.c;
if(lb.mt>0)lb.mt--}
function lobbyDuck(){roomDuck()}
