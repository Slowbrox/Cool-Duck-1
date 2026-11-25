/* =====================================================================
   Opening "space" tutorial
   Intro/tutorial scene (tutInit/tutUpd/tutDraw), tub + map/shop duck drawing.
   ===================================================================== */
/* ---- space tutorial ---- */
const CW=[250,232,185],NV=[16,54,36],GD=[255,200,60],JN=[250,236,190],BL=[255,208,64];
Object.assign(DM,{sp:eb(.1,.34,.1,BL,6,5),jk:eb(1.08,.72,1.18,NV,10,7),hm:eb(.76,.11,.84,CW,10,4),cp:eb(.07,.07,.07,CW,5,4),sh:eb(.05,.15,.03,[120,120,130],5,4),zp:eb(.03,.6,.08,CW,5,4),pt:eb(.26,.28,.08,GD,8,5),sc2:eb(1,.26,1.06,RD,10,6),jn:eb(.46,.34,.46,JN,8,6),cap:eb(.8,.38,.8,[200,38,40],10,6),vis:eb(.36,.045,.55,[150,24,30],8,4),gc:eb(.07,.07,.07,GD,5,4),gp:eb(.2,.2,.09,GD,7,5)});
let tu;
const mkTrash=x=>({x,y:20+rn()*(H-40),vx:-(.5+rn()*1.1),r:rn()*6,vr:(rn()-.5)*.05,k:rn()*6|0,s:.8+rn()*.7});
const burst=(x,y,n)=>{for(let i=0;i<n;i++){const a=rn()*6.28,s=.5+rn()*2.2;tu.tp.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:22+rn()*14})}};
function tutInit(){tu={x:110,y:150,vx:0,vy:0,f:1,yaw:1.15,step:0,t:0,mvT:0,kills:0,tr:Array.from({length:22},()=>mkTrash(rn()*W*1.3+170)),sh:[],tp:[],gl:0,gs:null,ev:0,evt:-1,sx:0,wt:0,bub:[]};water=MAXW;spt=cd=0}
function tutUpd(){const d=tu,idle=S!="tut";d.t++;d.sx+=1+Math.max(0,d.vx)*.6;
if(!idle&&pr("KeyR")){tutInit();return}
const lock=d.evt>=0&&d.evt<150,L=dn("ArrowLeft","KeyA"),Rt=dn("ArrowRight","KeyD"),U=dn("ArrowUp","KeyW"),Dn=dn("ArrowDown","KeyS");
if(!idle&&!lock){d.vx+=(Rt-L)*.13;d.vy+=(Dn-U)*.13;if(L!=Rt)d.f=Rt?1:-1;if(L||Rt||U||Dn)d.mvT++}
d.vy+=Math.sin(d.t*.04)*.008;const fr=lock?.95:.985;d.vx*=fr;d.vy*=fr;const sp=Math.hypot(d.vx,d.vy);if(sp>2.6){d.vx*=2.6/sp;d.vy*=2.6/sp}
if(!idle){d.x+=d.vx;d.y+=d.vy;if(d.x<36||d.x>W-36){d.x=Math.max(36,Math.min(W-36,d.x));d.vx*=-.4}if(d.y<34||d.y>H-30){d.y=Math.max(34,Math.min(H-30,d.y));d.vy*=-.4}}
if(S=="intro"){d.x=140+Math.min(d.t,300)*.28+Math.sin(d.t*.03)*6;d.y=140+Math.sin(d.t*.04)*14;d.vx=.28;d.vy=Math.cos(d.t*.04)*.56;d.f=1;if(d.t<260&&d.t%6==0)d.bub.push({x:d.x+(rn()-.5)*60,y:d.y+(rn()-.5)*50,r:3+rn()*5,l:90})}
d.bub.forEach(b=>{b.y-=.3;b.x+=Math.sin(b.l*.1)*.3;b.l--});d.bub=d.bub.filter(b=>b.l>0);
d.yaw+=(d.f*1.15-d.yaw)*.15;if(spt>0)spt--;if(cd>0)cd--;if(++d.wt%55==0&&water<MAXW)water++;
if(!idle&&!lock&&pr("KeyF","KeyX")&&water>0&&!cd){water--;cd=14;spt=12;d.sh.push({x:d.x+d.f*30,y:d.y-2,vx:d.f*5+d.vx*.5,vy:(Dn-U)*1.8+d.vy*.5,l:0});sfx(1000,.15,"triangle",.05,450);sfx(380,.08,"sawtooth",.03,520);noiz(.13,"bandpass",2500,1200,.05,0,1.5)}
d.tr.forEach(t=>{t.x+=t.vx;t.r+=t.vr;if(t.bc)t.bc--;if(!idle&&!t.bc&&Math.hypot(t.x-d.x,t.y-d.y)<13*t.s+17){const a=Math.atan2(d.y-t.y,d.x-t.x);d.vx+=Math.cos(a)*1.5;d.vy+=Math.sin(a)*1.5;t.vr+=(rn()-.5)*.15;t.bc=25;sfx(200,.1,"square",.05,120)}});
d.sh=d.sh.filter(s=>{s.x+=s.vx;s.y+=s.vy;s.vx*=.994;let hit=++s.l>80||s.x<-20||s.x>W+20||s.y<-20||s.y>H+20;
for(const t of d.tr)if(!t.dead&&Math.hypot(s.x-t.x,s.y-t.y)<13*t.s+5){t.dead=1;hit=1;d.kills++;burst(t.x,t.y,10);sfx(260,.15,"square",.05,90)}
if(hit)burst(s.x,s.y,3);return!hit});
d.tr=d.tr.filter(t=>!t.dead&&t.x>-50);while(d.tr.length<22)d.tr.push(mkTrash(W+30+rn()*160));
d.tp=d.tp.filter(q=>{q.x+=q.vx;q.y+=q.vy;return--q.l>0});
if(S=="title"||S=="boot")return;
if(d.step==0&&d.mvT>150)d.step=1;
else if(d.step==1&&d.kills>=4){d.step=2;d.gs={x:W+40,y:d.y,vx:-1.6,vy:0,t:0}}
if(S=="intro"&&d.t==140)d.gs={x:W+40,y:90,vx:-1.2,vy:0,t:0};
const q=d.gs;
if(q&&d.evt<0){q.t++;const a=Math.atan2(d.y-q.y,d.x-q.x),s=Math.min(2.1,1.3+q.t/200);q.vx+=(Math.cos(a)*s-q.vx)*.04;q.vy+=(Math.sin(a)*s-q.vy)*.04;q.x+=q.vx;q.y+=q.vy+Math.sin(q.t*.1)*.6;if(q.t%4==0)d.tp.push({x:q.x,y:q.y,vx:1+rn()-.5,vy:rn()-.5,l:18});
if(Math.hypot(q.x-d.x,q.y-d.y)<28){d.evt=0;d.step=3}}
if(d.evt>=0){const t=++d.evt;d.gl=t<60?t/60:t<85?1:Math.max(0,1-(t-85)/70);
if(t==1)for(let i=0;i<8;i++)sfx(400+i*120,.25,"sine",.05,0,i*.12);
if(q&&!d.ev){q.x+=(d.x+d.f*8-q.x)*.12;q.y+=(d.y-6-q.y)*.12}
if(t==75){d.ev=1;d.gs=null;burst(d.x,d.y,40);chime()}
if(t==160)d.step=4;if(t==210&&S=="intro")introEnd()}}
function shades(c,x,y,r,s,w){c.save();c.translate(x,y);c.rotate(r);c.scale(s,s);c.fillStyle=w?"#fff":"#111";
for(const k of[-1,1]){c.beginPath();c.moveTo(k*3,-6);c.lineTo(k*17,-6);c.quadraticCurveTo(k*17,7,k*10,7);c.quadraticCurveTo(k*3,7,k*3,-6);c.fill()}
c.fillRect(-4,-5,8,2);c.fillRect(-19,-6,3,2);c.fillRect(16,-6,3,2);if(!w){c.fillStyle="#fff";c.fillRect(6,-3,4,2);c.fillRect(-12,-3,4,2)}c.restore()}
function trashDraw(t){g.save();g.translate(t.x,t.y);g.rotate(t.r);g.scale(t.s,t.s);const k=t.k;
if(k==0){R(-7,-10,14,20,"#cfd8dc");R(-7,-10,14,3,"#789");R(-7,7,14,3,"#789");R(-3,-3,6,6,"#e44")}
else if(k==1){R(-5,-4,10,16,"#6ab");R(-2,-12,4,9,"#6ab");R(-3,-14,6,3,"#333");R(-5,2,10,4,"#fff")}
else if(k==2){g.fillStyle="#9a90b8";g.beginPath();g.moveTo(-10,-4);g.lineTo(-3,-11);g.lineTo(6,-8);g.lineTo(11,0);g.lineTo(7,9);g.lineTo(-4,11);g.lineTo(-11,5);g.fill();R(-2,-14,4,4,"#9a90b8")}
else if(k==3){g.strokeStyle="#222";g.lineWidth=6;g.beginPath();g.arc(0,0,10,0,7);g.stroke()}
else if(k==4){R(-11,-8,22,16,"#e8c98a");R(-11,-8,22,4,"#c9a36b");R(-6,-1,12,2,"#a55")}
else{g.fillStyle="#fff";g.beginPath();g.moveTo(0,-11);g.lineTo(10,9);g.lineTo(-10,9);g.fill();R(-6,4,12,5,"#222")}
g.restore()}
function tutDraw(){const d=tu,sx=d.sx,wr=(v,m)=>((v%m)+m)%m;if(S=="title"||S=="boot"){wallDraw();return}
const sg=g.createLinearGradient(0,0,0,H);sg.addColorStop(0,"#0a0818");sg.addColorStop(1,"#2e2552");g.fillStyle=sg;g.fillRect(0,0,W,H);
g.globalAlpha=.45;[[140,90,110,"#3b2f6e"],[400,200,140,"#4a2d5a"],[300,40,80,"#2a4a6e"]].forEach(([x,y,r,c])=>{g.fillStyle=c;g.beginPath();g.arc(wr(x-sx*.06+130,W+260)-130,y,r,0,7);g.fill()});g.globalAlpha=1;
{const x=wr(380-sx*.1+100,W+200)-100;g.fillStyle="#c9a6c4";g.beginPath();g.arc(x,88,42,0,7);g.fill();g.strokeStyle="#e8d9a8";g.lineWidth=4;g.beginPath();g.ellipse(x,88,72,16,-.4,0,7);g.stroke()}
for(let i=0;i<70;i++){const l=1+i%3;R(wr(i*97.3-sx*l*.35,W),(i*53.7)%H,l,l,"#fff")}
for(const t of d.tr)trashDraw(t);
if(d.gs&&d.evt<0)shades(g,d.gs.x,d.gs.y,Math.sin(d.gs.t*.1)*.4,1.3,false);
for(const s of d.sh){g.fillStyle="#000";g.beginPath();g.arc(s.x,s.y,5,0,7);g.fill();g.fillStyle="#fff";g.beginPath();g.arc(s.x,s.y,3,0,7);g.fill()}
for(const q of d.tp)R(q.x,q.y,3,3,"#fff");
for(const b of d.bub){g.strokeStyle="#fff";g.lineWidth=1.5;g.beginPath();g.arc(b.x,b.y,b.r,0,7);g.stroke();R(b.x-b.r/2,b.y-b.r/2,2,2,"#fff")}
if(S=="intro"&&d.t>20)TX("any key: skip",W-8,H-8,"#fff",10,"right");
if(S=="tut"){for(let i=0;i<MAXW;i++){const x=10+i*11;g.fillStyle=i<water?"#e6f6ff":"#2a2440";g.beginPath();g.arc(x+4,20,3.6,0,7);g.moveTo(x+.8,19);g.lineTo(x+4,12);g.lineTo(x+7.2,19);g.fill()}TX("[F]",80,24,"#cfe",11);
const T2=[["FLOAT","Arrow keys / WASD to drift through space"],["SPIT WATER","Press F to blast the trash! (hold ↑ ↓ to aim)  "+Math.min(4,d.kills)+"/4"],["…","Something shiny is flying toward you!"],null,["YOU EVOLVED!","Tutorial complete. The street is closed for now.  R = replay"]][d.step];
if(T2){R(40,H-54,W-80,42,"#1b1426");g.strokeStyle="#ffd66b";g.lineWidth=2;g.strokeRect(41,H-53,W-82,40);TX(T2[0],W/2,H-36,"#ffd66b",12,"center");TX(T2[1],W/2,H-20,"#fff",11,"center")}}}
const glw=(x,y,r,a)=>{const q=vg.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,"rgba(255,255,255,"+a+")");q.addColorStop(1,"rgba(255,255,255,0)");vg.fillStyle=q;vg.fillRect(x-r,y-r,r*2,r*2)};
function tutDuck(){const d=tu,t=S=="title"||S=="boot",x=t?300:d.x,y=t?262:d.y,e=d.evt,ev=t?1:d.ev,sc=t?2.5:1.5*(ev?1.14:1)*(e>=60&&e<110?1+.12*Math.sin((e-60)/50*Math.PI):1),gl=t?0:d.gl;DK.gl=gl;
if(gl>0){glw(x,y,40+gl*60+Math.sin(d.t*.3)*6,gl*.9);vg.save();vg.translate(x,y);vg.rotate(d.t*.03);vg.strokeStyle="rgba(255,255,255,"+gl*.8+")";vg.lineWidth=3;for(let i=0;i<10;i++){vg.rotate(.628);vg.beginPath();vg.moveTo(0,28);vg.lineTo(0,28+gl*(30+(i%3)*14));vg.stroke()}vg.restore()}
DT=vg;if(t){vg.save();vg.beginPath();vg.rect(372,62,104,196);vg.clip();vg.globalAlpha=.9;duckDraw(424,262,sc,{yaw:-.7,ev:1,an:0,hp:-.22,fl:.5,wd:.3,sid:"tp"});vg.strokeStyle="rgba(255,255,255,.4)";vg.lineWidth=7;vg.beginPath();vg.moveTo(392,258);vg.lineTo(452,62);vg.moveTo(420,258);vg.lineTo(470,110);vg.stroke();vg.restore()}duckDraw(x,t?y:y+13*sc,sc,t?{yaw:.7,ev:1,an:0,hp:-.22,fl:.5,wd:.3,sid:"ti"}:{yaw:d.yaw,air:1,slow:1,tilt:-d.vy*.08*d.f,vy:0,v:Math.abs(d.vx)+Math.abs(d.vy),bk:spt,ev,an:0,wx:x,wy:y,sid:"t",gr:.0015});DT=g;DK.gl=0;
if(d.gs&&e>=0&&!ev){shades(vg,d.gs.x,d.gs.y,Math.sin(d.t*.2)*.3,1.4,true);glw(d.gs.x,d.gs.y,26+gl*20,gl)}
if(e>=55&&e<=95){vg.fillStyle="rgba(255,255,255,"+Math.max(0,1-Math.abs(e-75)/20)+")";vg.fillRect(0,0,W,H)}
if(S=="intro"&&d.t<60){vg.fillStyle="rgba(0,0,0,"+(1-d.t/60)+")";vg.fillRect(0,0,W,H)}
if(S=="title"&&tt<10){vg.fillStyle="rgba(255,255,255,"+(1-tt/10)+")";vg.fillRect(0,0,W,H)}}
let tt=0;
function introEnd(){S="title";tt=0;try{AC=AC||new AudioContext();AC.resume&&AC.resume()}catch(_){}}
function scratch(){if(mute)return;try{AC=AC||new AudioContext();AC.resume&&AC.resume();const n=AC.currentTime,sr=AC.sampleRate,len=Math.floor(sr*1.4),buf=AC.createBuffer(1,len,sr),dd=buf.getChannelData(0);for(let i=0;i<len;i++)dd[i]=Math.random()*2-1;
const src=AC.createBufferSource(),bp=AC.createBiquadFilter(),gn=AC.createGain(),seg=[[0,.12,1],[.14,.1,-1],[.26,.12,1],[.4,.08,-1],[.5,.16,1],[.7,.1,-1],[.82,.35,1]];src.buffer=buf;bp.type="bandpass";bp.Q.value=2.5;gn.gain.setValueAtTime(.0001,n);
seg.forEach(([t0,d,dir])=>{bp.frequency.setValueAtTime(dir>0?600:3200,n+t0);bp.frequency.exponentialRampToValueAtTime(dir>0?3200:500,n+t0+d);gn.gain.setValueAtTime(.0001,n+t0);gn.gain.linearRampToValueAtTime(.35,n+t0+d*.2);gn.gain.linearRampToValueAtTime(.0001,n+t0+d);sfx(dir>0?180:520,d,"sawtooth",.05,dir>0?520:150,t0)});
src.connect(bp);bp.connect(gn);gn.connect(AC.destination);src.start(n);src.stop(n+1.3);sfx(90,.4,"square",.1,40,1.05)}catch(_){}}
function tubDraw(x,y){g.save();g.translate(x,y);g.rotate(-.08);R(-52,-12,104,6,"#cfd8dc");g.fillStyle="#fff";g.beginPath();g.moveTo(-50,-6);g.lineTo(50,-6);g.quadraticCurveTo(46,24,0,24);g.quadraticCurveTo(-46,24,-50,-6);g.fill();R(-38,22,8,10,"#cfd8dc");R(30,22,8,10,"#cfd8dc");R(46,-34,6,24,"#9ab");R(36,-36,16,5,"#9ab");R(-30,-3,60,3,"#8cf");g.restore()}
function mapDuck(){if(GO)return;const A=pa(p);if(inv>0&&inv<80&&frame%6<3)return;const c=cam|0;DT=vg;DK.yaw+=((PCH.k>.1?p.f*.4:p.g&&frame-DK.mv>100?p.f*.45:p.f*1.15)-DK.yaw)*.2;A.yaw=DK.yaw;if(PCH.k>0){A.fl=1.5+PCH.k*1.2;A.tilt=Math.sin(frame*.07)*.07*PCH.k-p.vx*.015}if(tAtt){const hd=(tAtt.t||0)>=6;A.nsc=1;A.fl=hd?1.35+Math.sin(frame*.25)*.07:1.7;A.tilt=hd?-Math.atan2(tAtt.x-p.x-9,p.y+10-tAtt.y)*.6-p.vx*.02:-p.vx*.04;if(!hd)A.hp=-.3}else if(SW.k>0)A.nsc=1;if(!tAtt&&PCH.k<=0){spitApply(A);eggApply(A)}if(inv>80){A.hc=[255,96,110];A.tilt=(A.tilt||0)+Math.sin(inv*1.3)*.12}vg.save();if(dlg){vg.beginPath();vg.rect(0,0,W,H-94);vg.clip()}vg.translate(p.x+9-c,p.y+p.h);chuteDraw();boardDraw();duckDraw(A.jx||0,bdY(),1,A);tearDraw(A);vg.restore();DT=g}
function shopDuck(){DT=vg;vg.save();if(dlg){vg.beginPath();vg.rect(0,0,W,H-94);vg.clip()}duckDraw(380,272,1.45,{yaw:.5+Math.sin(frame/45)*.4,dr:dr>0?Math.sin(Math.min(1,dr/70)*Math.PI):0,an:0,ev:1,wx:380,wy:272,sid:"s",id:1});vg.restore();DT=g}
