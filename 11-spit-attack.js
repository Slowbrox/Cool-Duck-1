/* =====================================================================
   Spit attack
   Spit stance, red face, tears and gag animation.
   ===================================================================== */
/* ---- spit: stance, red face, tears, gag ---- */
const REDC=[205,28,36],GRNC=[120,190,165],lerpC=(a,b,k)=>a.map((v,i)=>v+(b[i]-v)*k|0);
function chg(c){if(c<60)return c+1;if(++tOv>70)gag();return tGag>0?0:60}
function gag(){snd.pop(.6);tGag=70;tOv=0;tCh=0;fR=1;water=Math.max(0,water-2);sfx(190,.6,"sawtooth",.05,55);sfx(120,.5,"square",.03,70,.25)}
function spitState(){const ch=tCh>0&&!tFire?Math.min(1,tCh/60):0,ov=Math.min(1,tOv/70),u=tFire>0?(26-tFire)/26:0,bf=Math.min(1,tBl/258),gg=tGag>0?1-tGag/70:0,f=p.f,st={act:1,hp:0,mo:0,pf:0,tl:0,sq:1,wd:0,jx:0};
if(tGag>0){if(gg<.15){const k=gg/.15;st.hp=-.1-.3*k;st.mo=.1;st.pf=1.1*k;st.tl=f*.12;st.sq=.9;st.wd=.3;st.jx=Math.sin(frame*3)}
else if(gg<.75){st.hp=.45+Math.sin(gg*40)*.08;st.mo=Math.max(.3,.65+.35*Math.sin(gg*55));st.pf=.7+.3*Math.sin(gg*55);st.tl=-f*(.3+.05*Math.sin(gg*30));st.sq=.84;st.wd=.3;st.jx=Math.sin(frame*2.2)*.8}
else{const k=(gg-.75)/.25;st.hp=.45*(1-k);st.mo=.3*(1-k);st.pf=.2*(1-k);st.tl=-f*.3*(1-k);st.sq=.84+.16*k;st.wd=.3*(1-k)}}
else if(ch>0){const sh=ch>.7?(ch-.7)/.3:0;st.hp=-.1-.38*ch-ov*.1;st.mo=.12+.1*ch+ov*.1*Math.sin(frame*1.4);st.pf=ch+.12*ov*Math.sin(frame*1.1);st.tl=f*(.06+.1*ch)+sh*Math.sin(frame*1.9)*.025+ov*Math.sin(frame*2.7)*.07;st.sq=1-.1*ch;st.wd=.08+.3*ch;st.jx=sh*Math.sin(frame*2.3)*.5+ov*Math.sin(frame*3.1)}
else if(tFire>0){const k1=bsm(Math.min(1,u/.14));st.hp=u<.14?-.5*(1-k1)+.42*k1:.42*Math.pow(1-(u-.14)/.86,1.6);st.mo=u<.8?1:1-(u-.8)/.2;st.pf=bf*Math.max(0,1-u*3);st.tl=-f*.22*(1-u);st.sq=1-.1*bf*(1-u);st.wd=.08+.3*bf*(1-u)}
else if(spt>0){const q=Math.max(0,Math.min(1,(14-spt)/14));st.hp=q<.25?.35*bsm(q/.25):.35*(1-(q-.25)/.75);st.mo=q<.5?1:0;st.tl=-f*.08*(1-q);st.sq=1-.04*(1-q);st.wd=.1*(1-q)}
else st.act=0;
const gt=tGag>0?Math.min(1,gg*2.5)*(1-Math.max(0,(gg-.6)/.4)):0;let c=null;if(fR>.02)c=lerpC(Y,REDC,fR);if(gt>.01)c=lerpC(c||Y,GRNC,gt);st.hc=c;return st}
function spitApply(A){const st=spitState();if(st.act){A.hp=st.hp;A.mo=st.mo;A.pf=st.pf;A.tilt=(A.tilt||0)+st.tl;A.wd=(A.wd||0)+st.wd;A.sy=(A.sy||1)*st.sq;A.sx=(A.sx||1)/st.sq;A.jx=st.jx}if(st.hc)A.hc=st.hc}
function duckPt(x,y,z,a,st){const yw=DK.yaw;let Y1=y,Z1=z;if(a){const dy=y-1.7,dz=z-.2,c=Math.cos(a),s=Math.sin(a);Y1=1.7+c*dy-s*dz;Z1=.2+s*dy+c*dz}
const X=Math.cos(yw)*x+Math.sin(yw)*Z1,Z2=-Math.sin(yw)*x+Math.cos(yw)*Z1,Yr=Math.cos(.1)*(Y1-1.2)-Math.sin(.1)*Z2,tl=-p.vx*.03+(st.act?st.tl:0),ct=Math.cos(tl),sn=Math.sin(tl),X2=ct*X-sn*Yr,Y2=sn*X+ct*Yr,q=st.act?st.sq:1;return[X2*12.32/q,-(Y2+1.2)*12.32*q]}
function mouthXY(){const st=spitState(),[dx,dy]=duckPt(0,1.72-.14*st.mo,1.5,st.hp-.1,st);return[p.x+9+dx+(st.act?st.jx:0),p.y+p.h+bdY()+dy]}
function tearDraw(A){const r=tGag>0?1:Math.max(0,(fR-.45)/.55);if(r<=.02)return;const st=spitState(),a=st.hp-.1,n=1+(r*2|0);
for(const sd of[-.32,.32]){const[ex,ey]=duckPt(sd,2.05,1,a,st);for(let i=0;i<n;i++){const ph=((frame*(.5+.08*i)+i*4.7+(sd>0?3:0))%14)/14,x=ex+(A.jx||0)+(sd>0?.5:-.5)*ph*2,y=ey+bdY()+1+ph*10;vg.globalAlpha=Math.min(1,r*1.4)*(1-ph*.8);vg.fillStyle="#04257a";vg.beginPath();vg.ellipse(x,y,1.7,2.4,0,0,7);vg.fill();vg.fillStyle="#bfe6ff";vg.beginPath();vg.ellipse(x,y,1,1.6,0,0,7);vg.fill()}}vg.globalAlpha=1}
function spitUpd(){const hd=tCh>0&&!tFire;if(!tCh)tOv=0;const tg=hd?Math.min(1,tCh/60):0;fR=tg>fR?tg:fR*.965;if(fR<.01)fR=0;
if(hd&&tCh>5&&p.g&&!tAtt&&BD.k<.5)p.vx*=.78;if(tFire==25)p.vx-=p.f*Math.min(1.8,tBl/150);
if(tGag>0){tGag--;if(p.g)p.vx*=.8;const gg=1-tGag/70;if(gg>.12&&gg<.75){const[mx,my]=mouthXY();for(let i=0;i<2;i++)fxAdd(tFx,{x:mx,y:my+1,vx:p.f*(.5+rn()*1.8),vy:-.3+rn()*1.1,l:18+(rn()*12|0),s:1+rn()*2})}
if(tGag==42&&S=="play"){const h0=hearts;inv=0;hurt(0,0);if(hearts<h0&&hearts>0)p.vy=0}}}
