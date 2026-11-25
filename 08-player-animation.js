/* =====================================================================
   Player animation, scarf and water effects
   Player pose (pa), scarf physics, water spit/beam particles, shotDraw, waterDraw.
   ===================================================================== */
/* ---- player animation, scarf physics, water fx ---- */
const SF={},MT=M=>[M[0],M[3],M[6],M[1],M[4],M[7],M[2],M[5],M[8]];
function scarf(o,Rr,bY,t,UU){const id=o.sid||"d",face=Math.sin(o.yaw||0)>0?1:-1,s=SF[id]||(SF[id]={f:0,P:[],Q:[],sp:0,wf:face}),N=8,Ls=.27,
av=mv3(Rr,[.18,.22+bY,-.78]),wx=(o.wx||0)/UU,wy=-(o.wy||0)/UU,ax=wx+av[0],ay=wy+av[1]+1.2,az=av[2],gr=o.gr!=null?o.gr:.007,P=s.P,Q=s.Q;
if(!P.length||Math.hypot(ax-P[0][0],ay-P[0][1])>4){P.length=Q.length=0;s.wf=face;s.sp=0;for(let i=0;i<N;i++){P.push([ax-face*i*.22,ay-i*.12,az]);Q.push([ax-face*i*.22,ay-i*.12,az])}s.f=frame-1}
let n=Math.max(0,Math.min(3,frame-s.f));s.f=frame;
while(n--){s.wf+=(face-s.wf)*.05;const wd=-s.wf*.011*Math.max(.2,1+.7*Math.sin(t*.012)+.45*Math.sin(t*.037+1.7));
s.sp+=(Math.hypot(ax-P[0][0],ay-P[0][1])-s.sp)*.25;P[0][0]=ax;P[0][1]=ay;P[0][2]=az;Q[0]=P[0].slice();const fl=1+s.sp*10;
for(let i=1;i<N;i++){const p=P[i],q=Q[i],v0=(p[0]-q[0])*.965,v1=(p[1]-q[1])*.965,v2=(p[2]-q[2])*.92;q[0]=p[0];q[1]=p[1];q[2]=p[2];
p[0]+=v0+wd*(.6+i*.08);p[1]+=v1-gr+Math.sin(t*.29+i*.9)*.0035*fl+Math.sin(t*.05)*.002;p[2]+=v2+(az-p[2])*.05+Math.sin(t*.23+i*1.1)*.005*fl}
for(let i=2;i<N;i++){const p=P[i],a=P[i-1],b=P[i-2];for(let k=0;k<3;k++)p[k]+=(2*a[k]-b[k]-p[k])*.05}
for(let it=0;it<4;it++)for(let i=1;i<N;i++){const p=P[i],a=P[i-1],dx=p[0]-a[0],dy=p[1]-a[1],dz=p[2]-a[2],L=Math.hypot(dx,dy,dz)||1,df=(L-Ls)/L,kk=i==1?1:.5;p[0]-=dx*df*kk;p[1]-=dy*df*kk;p[2]-=dz*df*kk;if(i>1){a[0]+=dx*df*kk;a[1]+=dy*df*kk;a[2]+=dz*df*kk}}}
const rel=P.map(p=>[p[0]-wx,p[1]-wy,p[2]]),RT=MT(Rr),inv=v=>{const q=mv3(RT,[v[0],v[1]-1.2,v[2]]);return[q[0],q[1]+1.2,q[2]]},R=[];
for(let i=0;i<N;i++){const a=rel[Math.max(0,i-1)],b=rel[Math.min(N-1,i+1)],tx=b[0]-a[0],ty=b[1]-a[1],tz=b[2]-a[2],tl=Math.hypot(tx,ty)||1,ph=Math.sin(t*.22-i*.8)*(.3+Math.min(.9,s.sp*5)),c=Math.cos(ph),sn=Math.sin(ph),u=[ty/tl*c,-tx/tl*c,sn],hw=.26-.016*i,r=rel[i];
let nn=[ty*u[2]-tz*u[1],tz*u[0]-tx*u[2],tx*u[1]-ty*u[0]];const nl=Math.hypot(...nn)||1;nn=nn.map(v=>v/nl);if(nn[2]<0)nn=nn.map(v=>-v);
R.push({l:[r[0]+u[0]*hw,r[1]+u[1]*hw,r[2]+u[2]*hw],r:[r[0]-u[0]*hw,r[1]-u[1]*hw,r[2]-u[2]*hw],n:mv3(RT,nn)})}
const te=(()=>{const a=rel[N-2],b=rel[N-1],d=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])||1;return[(b[0]-a[0])/d,(b[1]-a[1])/d,(b[2]-a[2])/d]})(),ad=(p,k)=>[p[0]+te[0]*k,p[1]+te[1]*k,p[2]+te[2]*k];
const mk=(a,b,col,tl)=>{const V=[],Nn=[],I=[];for(let i=a;i<=b;i++){V.push(R[i].l,R[i].r);Nn.push(R[i].n,R[i].n)}for(let i=0;i<b-a;i++){const j=i*2;I.push([j,j+1,j+2],[j+1,j+3,j+2])}
if(tl){const e=R[N-1],z=V.length;V.push(ad(e.l,.3),ad(e.r,.3),ad(rel[N-1],.06));Nn.push(e.n,e.n,e.n);I.push([z-2,z,z+2],[z-1,z+1,z+2],[z-2,z+2,z-1])}
return{V:V.map(inv),N:Nn,I,col}};
const Z_=curSc();if(Z_[2]){const P_=Z_[2],of=Z_[3]?(frame>>2):0,out=[];for(let i=0;i<N-1;i++)out.push(mk(i,i+1,P_[(i+of)%P_.length],i==N-2));return out}
return[mk(0,2,Z_[0]),mk(2,4,Z_[1]),mk(4,N-1,Z_[0],1)]}
const PA={f:-1,pg:1,pv:0,q:0,qv:0,lt:0,id:0,rq:0,sw:0,flip:0,fd:1,pf:0};
function pa(p){if(PA.f!=frame){PA.f=frame;PCH.k=Math.max(0,Math.min(1,PCH.k+(tGl?.14:-.2)));BD.w+=p.vx*.35;const g1=!!p.g,sp=Math.abs(p.vx);
if(g1&&!PA.pg&&PA.pv>2.5){const k=Math.min(1,PA.pv/9);PA.qv-=.05+k*.06;PA.lt=k;dust(p.x+9,p.y+p.h,3+(k*6|0),2.5)}
if(!g1&&PA.pg&&p.vy<-3){PA.qv+=.06;dust(p.x+9,p.y+p.h,3,1.5)}
PA.pg=g1;PA.pv=p.vy;PA.qv+=((g1?0:Math.min(.18,Math.abs(p.vy)*.014))-PA.q)*.25;PA.qv*=.68;PA.q+=PA.qv;
PA.lt*=.88;PA.rq+=((g1&&sp>.15?Math.min(1,sp/2.7):0)-PA.rq)*.2;PA.id=g1&&sp<.15?Math.min(1,PA.id+.02):Math.max(0,PA.id-.1);
if(g1&&PA.rq>.6&&BD.k<.3&&frame%9==0)dust(p.x+9-p.f*6,p.y+p.h,1,1.2);if(g1&&BD.k>.9&&sp>2&&frame%6==0)dust(p.x+9-p.f*13,p.y+p.h,1,1.4);
/* swing lean, fling flip + speed streaks */
const hk=typeof tAtt!="undefined"&&tAtt&&(tAtt.t||0)>=6;PA.sw+=((hk?-Math.atan2(tAtt.x-(p.x+9),(p.y+10)-tAtt.y)*.6:0)-PA.sw)*.2;
if(tFl>3&&!PA.pf&&!g1){PA.flip=.001;PA.fd=p.vx>=0?1:-1}PA.pf=tFl>3;if(PA.flip>0){PA.flip+=.24;if(PA.flip>=6.2832||g1)PA.flip=0}
if(tFl>3&&frame%2==0)fxAdd(S=="t1"?tFx:FX,{x:p.x+9+(rn()-.5)*16,y:p.y+12+(rn()-.5)*20,vx:p.vx*.5,vy:p.vy*.5,l:9,t:"s",g:0,dr:.85})}
const q=Math.max(-.3,Math.min(.3,PA.q+Math.cos(p.an*2.6)*.03*PA.rq)),sy=1+q;
const sb=BD.k>.6,ga=PCH.k>.1?0:bwa(BD.k);return{ga:ga,gs:-p.f,an:sb?0:p.an,sb:sb?1:0,pc:PCH.k,air:!p.g,vy:p.vy,v:Math.abs(p.vx),bk:spt,ev:1,rq:sb?0:PA.rq,id:PA.id,lt:PA.lt,sy,sx:1/sy,tilt:-p.vx*.03+PA.sw-(PA.flip>0?PA.fd*PA.flip:0),hp:-Math.min(spt,14)/14*.28,wd:PA.lt*.2,wx:p.x+9,wy:p.y+p.h,sid:"m",nst:SW.k>.05?1:0}}
const fxAdd=(L,o)=>{const f=Object.assign({l:20,g:.15,dr:1,s:2,t:"d"},o);f.m=f.l;L.push(f)};
function fxStep(L){for(let i=L.length;i--;){const f=L[i];f.x+=f.vx;f.y+=f.vy;f.vy+=f.g==null?.15:f.g;f.vx*=f.dr||1;if(f.gr){f.r+=f.gr;f.gr*=.9}if(--f.l<=0)L.splice(i,1)}}
const dust=(x,y,n,v)=>{const L=S=="t1"?tFx:FX;for(let i=0;i<n;i++)fxAdd(L,{x:x+(rn()-.5)*10,y:y-1,vx:(rn()-.5)*v,vy:-rn()*.7,l:16+(rn()*8|0),s:2+rn()*2,t:"u",g:-.01,dr:.93})};
function fxDraw(c,L){for(const f of L){const k=f.l/(f.m||f.l+1),t=f.t||"q",x=f.x,y=f.y,ci=(r)=>{c.beginPath();c.arc(x,y,r,0,7);c.fill()};c.globalAlpha=1;
if(t=="r"){c.globalAlpha=Math.min(1,k*1.4);c.lineWidth=3.2;c.strokeStyle="#1e78ff";c.beginPath();c.ellipse(x,y,f.r*.38,f.r,f.a0||0,0,7);c.stroke();c.lineWidth=1.3;c.strokeStyle="#e6f6ff";c.stroke()}
else if(t=="o"){c.globalAlpha=Math.min(1,k*1.8);c.fillStyle=f.c;ci(f.s*(.5+k*.5));c.globalAlpha*=.8;c.fillStyle="#fff";c.fillRect(x-f.s*.3,y-f.s*.4,1.5,1.5)}else if(t=="m"){c.globalAlpha=k*.55;c.fillStyle="#cfeaff";ci(f.s*(1.6-k*.6))}
else if(t=="u"){c.globalAlpha=k*.6;c.fillStyle="#d8d0e0";ci(f.s*(2-k))}
else if(t=="s"){c.globalAlpha=k;c.strokeStyle="#e6f6ff";c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x-f.vx*1.6,y-f.vy*1.6);c.stroke()}
else if(t=="c"){c.globalAlpha=k;c.fillStyle=f.c;c.fillRect(x-1.5,y-1.5,3,3)}
else if(t=="d"){const r=f.s*Math.min(1,k*2.5);c.fillStyle="#04257a";ci(r+1);c.fillStyle=f.l%6<3?"#e6f6ff":"#7fc4ff";ci(r*.75)}
else{c.fillStyle=f.l%4<2?"#e6f6ff":"#3d9bff";c.fillRect(x,y,4,4)}}c.globalAlpha=1}
function muz(L,x,y,f){const a0=f>0?0:Math.PI;for(let i=0;i<8;i++){const a=a0+(rn()-.5)*1.1,s=1.5+rn()*2.8;fxAdd(L,{x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-.3,l:12+(rn()*10|0),s:1+rn()*1.6,g:.1})}
for(let i=0;i<3;i++)fxAdd(L,{x:x+f*3,y,vx:f*(.6+rn()),vy:-.2,l:14,s:4,t:"m",g:0,dr:.92});fxAdd(L,{x:x+f*4,y,vx:0,vy:0,l:9,r:2,gr:1.4,t:"r",g:0,a0})}
function trail(w){(w.tr=w.tr||[]).push({x:w.x,y:w.y});if(w.tr.length>10)w.tr.shift();if(w.l%2==0)fxAdd(FX,{x:w.x,y:w.y,vx:-w.vx*.08+(rn()-.5)*.6,vy:(rn()-.3)*.5,l:13,s:.9+rn()*.9,g:.1})}
function splash(L,w){const k=w.k||0,a0=Math.atan2(-w.vy,-w.vx),x=w.x,y=w.y,sp=Math.hypot(w.vx,w.vy);
for(let i=0;i<(k?16:11);i++){const a=k==3?-1.57+(rn()-.5)*1.2:a0+(rn()-.5)*(k?3.4:2.2),v=1.3+rn()*(k?3.6:2.6);fxAdd(L,{x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.9,l:18+(rn()*14|0),s:1.1+rn()*2.1})}
for(let i=0;i<5;i++){const a=a0+(i-2)*.45;fxAdd(L,{x,y,vx:Math.cos(a)*3.8,vy:Math.sin(a)*3.8,l:7,t:"s",g:.08,dr:.9})}
for(let i=0;i<4;i++)fxAdd(L,{x,y,vx:(rn()-.5)*1.5,vy:-.2-rn()*.7,l:22,s:5+rn()*4,t:"m",g:-.01,dr:.95});
fxAdd(L,{x,y,vx:0,vy:0,l:16,r:2,gr:1.8+sp*.12,t:"r",g:0,a0});if(k)fxAdd(L,{x,y,vx:0,vy:0,l:22,r:1,gr:2.8,t:"r",g:0,a0})}
function beamFx(m0,my){const e=p.f,x1=m0+e*tBe,a0=e>0?Math.PI:0;if(tFire==25)muz(tFx,m0,my,e);
for(let i=0;i<2;i++){const a=a0+(rn()-.5)*2.2,v=1+rn()*2.6;fxAdd(tFx,{x:x1,y:my,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.3,l:16+(rn()*10|0),s:1+rn()*1.8})}
if(frame%4==0)fxAdd(tFx,{x:x1,y:my,vx:0,vy:0,l:12,r:3,gr:1.4,t:"r",g:0,a0});
if(frame%3==0)fxAdd(tFx,{x:m0+e*tBe*rn(),y:my+(rn()-.5)*5,vx:e*.4,vy:-.3-rn()*.5,l:14,s:1,g:.05});
if(frame%5==0)fxAdd(tFx,{x:x1,y:my,vx:-e*.5,vy:-.3,l:20,s:6,t:"m",g:-.01,dr:.95})}
function shotDraw(c){for(const w of WS){const T=w.tr||[],sp=Math.hypot(w.vx,w.vy);c.lineCap="round";
for(let ps=0;ps<2;ps++){c.strokeStyle=ps?"#e6f6ff":"#1e78ff";for(let i=1;i<T.length;i++){const k=i/T.length;c.globalAlpha=k*.9;c.lineWidth=(ps?1.3:4)*k;c.beginPath();c.moveTo(T[i-1].x,T[i-1].y);c.lineTo(T[i].x,T[i].y);c.stroke()}}
c.globalAlpha=1;c.save();c.translate(w.x,w.y);c.rotate(Math.atan2(w.vy,w.vx));c.scale(1+Math.min(.9,sp*.12),1);
c.fillStyle="#04257a";c.beginPath();c.ellipse(0,0,5.4,3.8,0,0,7);c.fill();c.fillStyle="#1e78ff";c.beginPath();c.ellipse(0,0,4.3,2.9,0,0,7);c.fill();c.fillStyle="#e6f6ff";c.beginPath();c.ellipse(-.6,-.9,2.4,1.1,0,0,7);c.fill();c.restore()}c.globalAlpha=1}
const SW={k:0,hx:0,hy:0};let tFl=0;
/* ---- scarf grapple: thrown in an arc, wraps around the ring, tail flutters, snaps back on release ---- */
const curSc=()=>SCC[(S=="lobby"?LP:CS).sc]||SCC[0],scRgb=(c,k)=>"rgb("+(k?c.map(v=>v*k|0):c)+")",scCol=i=>scRgb(curSc()[i||0]);
function scSeg(i){const z=curSc(),P=z[2];if(!P)return i%7==5?[246,239,226]:z[0];return P[((i>>1)+(z[3]?(frame>>2):0))%P.length]}
function ropeDraw(c,M,HW,TW){const n=M.length-1,L=[],Rr=[];
for(let i=0;i<=n;i++){const a=M[Math.max(0,i-1)],b=M[Math.min(n,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d,h=HW[i];L.push([M[i][0]+nx*h,M[i][1]+ny*h]);Rr.push([M[i][0]-nx*h,M[i][1]-ny*h])}
c.lineJoin="round";c.lineCap="round";const out=()=>{c.beginPath();L.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));for(let i=n;i>=0;i--)c.lineTo(Rr[i][0],Rr[i][1]);c.closePath()};
out();c.lineWidth=3.2;c.strokeStyle="#1a0a10";c.stroke();
for(let i=0;i<n;i++){const col=scSeg(i),f=TW[i]<0?.62:1;c.fillStyle=c.strokeStyle=scRgb(col,f);c.lineWidth=.7;c.beginPath();c.moveTo(L[i][0],L[i][1]);c.lineTo(L[i+1][0],L[i+1][1]);c.lineTo(Rr[i+1][0],Rr[i+1][1]);c.lineTo(Rr[i][0],Rr[i][1]);c.closePath();c.fill();c.stroke()}
c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1;c.beginPath();for(let i=0;i<n;i++)if(TW[i]>.3){c.moveTo(M[i][0],M[i][1]);c.lineTo(M[i+1][0],M[i+1][1])}c.stroke()}
function scTail(c,x,y,ang,len,fl){const M=[],HW=[],TW=[];let px=x,py=y;for(let j=0;j<=7;j++){const u=j/7;M.push([px,py]);HW.push(2.9-1.1*u);TW.push(Math.cos(frame*.3-u*5));const a=ang+Math.sin(frame*.33-u*4.5)*fl*u;px+=Math.cos(a)*len/7;py+=Math.sin(a)*len/7}
ropeDraw(c,M,HW,TW);const e=M[7],a=ang+Math.sin(frame*.33-4.5)*fl;c.strokeStyle=scCol(1);c.lineWidth=.9;c.beginPath();for(let k=-1;k<=1;k++){const ox=Math.cos(a+1.57)*k*1.3,oy=Math.sin(a+1.57)*k*1.3;c.moveTo(e[0]+ox,e[1]+oy);c.lineTo(e[0]+ox+Math.cos(a+k*.2)*3,e[1]+oy+Math.sin(a+k*.2)*3)}c.stroke()}
function scBands(c,hx,hy,r,th0,cnt,dir){const nb=Math.ceil(cnt);for(let i=nb-1;i>=0;i--){const a=Math.min(1,cnt-i),th=th0+dir*i*.66,ti=th+dir*.34,x1=hx+Math.cos(th)*(r-4.2),y1=hy+Math.sin(th)*(r-4.2),x2=hx+Math.cos(ti)*(r+4.2),y2=hy+Math.sin(ti)*(r+4.2);
c.globalAlpha=a;c.lineCap="round";c.strokeStyle="#1a0a10";c.lineWidth=6;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.strokeStyle=scRgb(scSeg(i*2));c.lineWidth=3.8;c.stroke();c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=1;c.beginPath();c.moveTo((x1*2+x2)/3,(y1*2+y2)/3);c.lineTo(x2,y2);c.stroke()}c.globalAlpha=1}
function swingScarf(){const k=SW.k;if(k<=0)return;const c=vg,t=tAtt?(tAtt.t||0):0,hold=!!tAtt&&t>=6,ax=p.x+9+p.f*2,ay=p.y+9,hx=SW.hx,hy=SW.hy,r=9,sp=Math.hypot(p.vx,p.vy),n=18,M=[],HW=[],TW=[];
c.save();const dx=hx-ax,dy=hy-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;let after=null;
if(tAtt&&!hold){const u=1-Math.pow(1-k,2),lift=Math.min(34,d*.3),tr=v=>[ax+dx*v,ay+dy*v-Math.sin(Math.PI*v)*lift];
for(let i=0;i<=n;i++){const s=i/n,q=tr(u*s),w=Math.sin(frame*.8-s*9)*3.2*s;M.push([q[0]+nx*w,q[1]+ny*w]);HW.push(3.1-1.3*s);TW.push(Math.cos(frame*.45-s*7))}
const e=M[n],e0=M[n-2];after=()=>scTail(c,e[0],e[1],Math.atan2(e[1]-e0[1],e[0]-e0[0]),9,.8)}
else if(hold){const dir=ax<hx?1:-1,ux=-dx/d,uy=-dy/d,cnx=-uy*dir,cny=ux*dir,cx=hx+cnx*r*.9,cy=hy+cny*r*.9,th0=Math.atan2(cny,cnx),wp=Math.min(1,(t-6)/10),cnt=.4+wp*2.6,
cdx=cx-ax,cdy=cy-ay,cd=Math.hypot(cdx,cdy)||1,mx=-cdy/cd,my=cdx/cd,sag=Math.min(26,Math.max(0,tAtt.L-d)*.8),amp=.5+Math.min(3,sp*.4),tw=t<22?Math.sin(t*1.4)*5*(1-(t-6)/16):0;
for(let i=0;i<=n;i++){const s=i/n,b=Math.sin(Math.PI*s),w=(Math.sin(frame*.45-s*8)*amp+tw)*b;M.push([ax+cdx*s+mx*w,ay+cdy*s+my*w+sag*4*s*(1-s)]);HW.push(2.5+.9*b);TW.push(Math.cos(frame*.22-s*5))}
after=()=>{const the=th0+dir*(Math.ceil(cnt)-1)*.66+dir*.34,tx=hx+Math.cos(the)*(r+3),ty=hy+Math.sin(the)*(r+3);scTail(c,tx,ty,1.57-Math.max(-1,Math.min(1,p.vx*.14))+Math.sin(frame*.18)*.15,15,.45+Math.min(.6,sp*.06));scBands(c,hx,hy,r,th0,cnt,dir);
c.fillStyle=scCol(1);c.strokeStyle="#1a0a10";c.lineWidth=1.6;c.beginPath();c.ellipse(cx,cy,3.2,2.4,th0,0,7);c.fill();c.stroke()}}
else{const bx=ax+dx*k,by=ay+dy*k,bd=Math.hypot(bx-ax,by-ay)||1,mx=-(by-ay)/bd,my=(bx-ax)/bd,amp=2+6*(1-k);
for(let i=0;i<=n;i++){const s=i/n,w=Math.sin(frame*.9-s*10)*amp*Math.sin(Math.PI*s*.95+.05);M.push([ax+(bx-ax)*s+mx*w,ay+(by-ay)*s+my*w]);HW.push(3-1.2*s);TW.push(Math.cos(frame*.6-s*8))}
after=()=>{c.strokeStyle="#1a0a10";c.lineWidth=4;c.beginPath();c.ellipse(bx,by,2+4*k,2.4,frame*.6,0,7);c.stroke();c.strokeStyle=scCol(0);c.lineWidth=2.2;c.stroke()}}
ropeDraw(c,M,HW,TW);if(after)after();
c.fillStyle=scCol(0);c.strokeStyle="#1a0a10";c.lineWidth=2;c.beginPath();c.arc(ax,ay,3,0,7);c.fill();c.stroke();c.restore()}
function waterDraw(){const c=vg;c.save();c.translate(-(cam|0),0);if(S=="play"){shotDraw(c);fxDraw(c,FX);fxDraw(c,tFx);eggDraw(c)}else if(S=="t1"){fxDraw(c,tFx);eggDraw(c)}c.restore();c.globalAlpha=1}
