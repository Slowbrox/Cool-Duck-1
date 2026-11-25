/* =====================================================================
   Pro UI: crisp in-game HUD, scene transitions, pause menu
   - hudPro(): hearts, coins (coins fly into the counter), star wallet, level name + bread pip, prompts.
   - trans(fn): iris wipe that closes on the duck, runs fn while the screen is covered, opens again.
   - Pause menu (Esc / P) in the tutorial and the levels.
   ===================================================================== */
const HUDC=[24,35];
function heartIco(v,x,y,s,fill,glow){v.save();v.translate(x,y);v.scale(s,s);const hp=()=>{v.beginPath();v.moveTo(0,4);v.bezierCurveTo(-1.5,2.6,-6.5,-.4,-6.5,-3.3);v.bezierCurveTo(-6.5,-6.6,-2.2,-7.4,0,-4.4);v.bezierCurveTo(2.2,-7.4,6.5,-6.6,6.5,-3.3);v.bezierCurveTo(6.5,-.4,1.5,2.6,0,4);v.closePath()};
hp();v.lineJoin="round";v.lineWidth=3/s+1.2;v.strokeStyle="#1a1226";v.stroke();v.fillStyle=fill;v.fill();if(glow){v.fillStyle="rgba(255,255,255,.55)";v.beginPath();v.ellipse(-3.2,-4,1.6,1.1,-.5,0,7);v.fill();v.fillStyle="rgba(120,0,30,.25)";v.beginPath();v.ellipse(1.5,0,3.6,2.2,.4,0,7);v.fill()}v.restore()}
function hudPro(){const v=vg,c=cam|0;v.save();v.lineCap="round";v.lineJoin="round";
/* left panel: hearts + coins + stars */
const nh=Math.max(3,hearts+(HIT.t>0?1:0)),pw=Math.max(118,16+nh*17);v.fillStyle=INK;luInk(6,5,6+pw,50,3,2);
const hx=HIT.t>0?Math.sin(HIT.t*1.9)*2.2*HIT.t/26:0;
for(let i=0;i<nh;i++){const x=19+i*17+hx,y=18,lost=i==hearts&&HIT.t>0;
if(lost){const u=1-HIT.t/26;v.globalAlpha=1-u;heartIco(v,x+u*6,y-u*14,.9+u*.6,HIT.t%4<2?"#fff":"#ff5a6e",1);v.globalAlpha=1}
else if(i<hearts){const pul=hearts==1?1+Math.max(0,Math.sin(frame*.2))*.12:1;heartIco(v,x,y,pul,"#ff4d6a",1)}else heartIco(v,x,y,.9,"#3a2e4e",0)}
const bump=CN.bump>0?1+Math.sin(CN.bump/8*Math.PI)*.25:1;v.save();v.translate(HUDC[0],HUDC[1]+3);v.scale(bump,bump);coinIco(v,0,0,6.5);v.restore();
luIt(""+Math.max(0,coins-FC.length),35,44,13,CN.bump>0?"#ffe680":"#fff","left",900);
const sx=Math.max(86,pw-26);starIcon(v,sx,38,6.5+(CN.sb>0?CN.sb*.25:0),1);luIt(""+HSN(),sx+11,44,13,"#ffe680","left",900);
/* flying coins + sparkles + flying stars */
for(const f of FC){const u=f.t/24,e=u*u*(3-2*u),x=f.x+(HUDC[0]-f.x)*e,y=f.y+(HUDC[1]+3-f.y)*e-Math.sin(Math.PI*u)*30;coinIco(v,x,y,5.5-1.5*e)}
for(const q of SPK){v.fillStyle=q.l%2?"#fff6a8":"#ffd24a";const s=q.l>7?2:1;v.fillRect(q.x,q.y,s,s)}starFly(v);
/* top right: small tag with the level name + hidden-bread pip (no progress bar) */
{const hs=HST.find(s=>s.l=="p"+LV),nm=(LVN[LV]||"").split("").join(String.fromCharCode(8202));v.font="800 7px "+FM;
const pw2=Math.round(v.measureText(nm).width)+(hs?36:20),ph2=18,px0=W-8-pw2,py0=7;
v.fillStyle="rgba(12,8,20,.5)";v.beginPath();srrV(v,px0,py0,pw2,ph2,9);v.fill();v.strokeStyle="rgba(255,255,255,.08)";v.lineWidth=1;v.stroke();
v.textAlign="left";v.fillStyle="rgba(232,230,240,.82)";v.fillText(nm,px0+10,py0+12);
if(hs){const sx=px0+pw2-13,sy=py0+ph2/2;if(hs.got)starIcon(v,sx,sy,4.6,1);else{starPath(v,sx,sy,4.6,-Math.PI/2);v.strokeStyle="rgba(255,255,255,.4)";v.lineWidth=1;v.stroke()}}}
/* (no combo banner: knocking out enemies shows no text, only the coins flying into the counter) */
/* interaction prompt */
if(near&&near.l&&!dlg){const x=near.x-c,y=150+Math.sin(frame*.1)*2,lb2=near.t=="club"?"ENTER THE CLUB":near.l.replace("E · ","");const w=luW(lb2,10,900)+40;v.fillStyle=INK;luInk(x-w/2,y-12,x+w/2,y+8,9,1.8);luKey("E",x-w/2+8,y+3);luIt(lb2,x-w/2+28,y+2,10,near.t=="lock"?"#ff8a8a":HL,"left",900)}v.restore()}
/* ---------------- transitions ---------------- */
const TRN={on:0,t:0,fn:null,cx:W/2,cy:H/2},TRND=22;
const trnPt=()=>typeof p=="object"&&p&&(S=="play"||S=="t1")?[Math.max(24,Math.min(W-24,p.x+9-(cam|0))),Math.max(24,Math.min(H-24,p.y+12))]:[W/2,H/2];
function trans(fn){if(TRN.on)return;TRN.on=1;TRN.t=0;TRN.fn=fn;[TRN.cx,TRN.cy]=trnPt();sfx(240,.22,"triangle",.05,110);noiz(.25,"bandpass",400,1600,.04,0,1.2)}
function trnUpd(){if(!TRN.on)return;TRN.t++;if(TRN.t==TRND){const f=TRN.fn;TRN.fn=null;if(f)f()}if(TRN.t>=TRND*2+8)TRN.on=0}
function trnDraw(){if(!TRN.on)return;const t=TRN.t,v=vg;let k=t<TRND?1-t/TRND:t<TRND+8?0:(t-TRND-8)/TRND;k=Math.max(0,Math.min(1,k));k=k*k*(3-2*k);const[cx,cy]=t<TRND?[TRN.cx,TRN.cy]:trnPt(),R2=Math.hypot(W,H)*k;
v.save();v.setTransform(1,0,0,1,0,0);v.globalAlpha=1;v.beginPath();v.rect(0,0,W,H);if(R2>.5){v.moveTo(cx+R2,cy);v.arc(cx,cy,R2,0,7,true)}v.fillStyle="#0c0a12";v.fill("evenodd");
if(R2>.5){v.strokeStyle=HL;v.lineWidth=3;v.beginPath();v.arc(cx,cy,R2,0,7);v.stroke()}
if(k<.05){coinIco(v,W/2,H/2-4,10);luIt("LOADING",W/2,H/2+20,8,MUT,"center",900)}v.restore()}
/* ---------------- pause menu ---------------- */
const PZ={on:0,sel:0,t:0,hov:-1},PZO=["RESUME","RESTART LEVEL","WORLD MAP","SOUND"];
const pzR=i=>[W/2-150,104+i*26,170,22];
const pzHit=(x,y)=>{for(let i=0;i<PZO.length;i++)if(inR(x,y,pzR(i)))return i;return-1};
function pzDo(i){MBp=1;sfx(700,.05,"triangle",.05,1000);if(i==0)PZ.on=0;else if(i==1){PZ.on=0;const st=S;trans(()=>st=="t1"?t1Start():start())}else if(i==2){PZ.on=0;const at=S=="t1"?12:LV;trans(()=>wmOpen({at}))}else mute=!mute}
function pzUpd(){if(TRN.on)return true;if(GO||CAR.ph||LC||dlg){PZ.on=0;return false}
if(pr("Escape","KeyP")){PZ.on^=1;PZ.sel=0;PZ.t=0;sfx(PZ.on?520:380,.06,"triangle",.05,PZ.on?780:260);return true}
if(!PZ.on)return false;PZ.t++;if(pr("ArrowUp","KeyW")){PZ.sel=(PZ.sel+PZO.length-1)%PZO.length;sfx(600,.03)}if(pr("ArrowDown","KeyS")){PZ.sel=(PZ.sel+1)%PZO.length;sfx(600,.03)}
if(pr("Enter","Space","KeyE"))pzDo(PZ.sel);const h=pzHit(MX,MY);if(h>=0&&h!=PZ.hov){PZ.sel=h;sfx(600,.03)}PZ.hov=h;return true}
CV.addEventListener("pointerdown",()=>{if(PZ.on&&!TRN.on&&(S=="t1"||S=="play")){const h=pzHit(MX,MY);if(h>=0)pzDo(h)}});
function pzDraw(){if(!PZ.on)return;const v=vg,k=Math.min(1,PZ.t/10),e=1-Math.pow(1-k,3);v.save();v.fillStyle="rgba(10,6,20,"+.62*k+")";v.fillRect(0,0,W,H);
v.translate(0,(1-e)*-30);v.globalAlpha=k;v.fillStyle=INK;luInk(W/2-176,52,W/2+36,226,23,3);luTi("PAUSED",W/2-150,88,30,HL,"left",-.04);v.strokeStyle="#ff8a1f";v.lineWidth=2.5;v.beginPath();v.moveTo(W/2-150,94);v.lineTo(W/2-30,91);v.stroke();
PZO.forEach((s,i)=>{const r=pzR(i),on=i==PZ.sel,lb2=i==3?"SOUND: "+(mute?"OFF":"ON"):s;if(on){v.fillStyle=HL;luInk(r[0],r[1],r[0]+r[2],r[1]+r[3],i*5+3,2,frame>>3)}luIt(lb2,r[0]+12,r[1]+16,13,on?DKT:"#e8e6f0","left",900)});
v.fillStyle="rgba(10,6,18,.9)";luInk(W/2+52,52,W/2+236,226,41,3);luIt("CONTROLS",W/2+66,74,10,MUT,"left",900);
(GPL?[["STICK","move"],["A","jump / hold: glide"],["X","throw an egg"],["RB","skateboard"],["LB","scarf (near hooks)"],["START","pause"]]:[["← →","move"],["SPACE","jump / hold: glide"],["SHIFT","skateboard"],["F","throw an egg"],["Q","scarf (near hooks)"],["ESC","pause"]]).forEach(([kk,d],i)=>{const y=96+i*21;const w=luKey(kk,W/2+66,y);luIt(d,W/2+70+w,y-1,9,"#e8e6f0","left",800)});
v.globalAlpha=1;v.restore()}
