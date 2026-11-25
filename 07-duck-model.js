/* =====================================================================
   3D duck model
   The 3D-rendered duck: model parts (eb, tri), duck(), scribble outline and duckDraw().
   ===================================================================== */
/* ---- 3D duck + water ---- */
const MAXW=6,PL=[],FT1=[],SK={t1:0,st:0},FC=[],SPK=[],SFL=[],GP=[],CN={bump:0,cch:0,cT:0,sb:0};
let water=0,WS=[],FX=[],cd=0,spt=0,dr=0;
const DN=128,DK={yaw:1.15,mv:0},dc=document.createElement("canvas"),ic=document.createElement("canvas");dc.width=dc.height=ic.width=ic.height=DN;
const dx=dc.getContext("2d",{willReadFrequently:true}),ix=ic.getContext("2d"),DI=dx.createImageData(DN,DN),ZB=new Float32Array(DN*DN),IB=new Uint8Array(DN*DN),LB=new Float32Array(DN*DN);
const rX=a=>{const c=Math.cos(a),s=Math.sin(a);return[1,0,0,0,c,-s,0,s,c]},rY=a=>{const c=Math.cos(a),s=Math.sin(a);return[c,0,s,0,1,0,-s,0,c]},rZ=a=>{const c=Math.cos(a),s=Math.sin(a);return[c,-s,0,s,c,0,0,0,1]};
const mm=(A,B)=>{const o=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)o.push(A[r*3]*B[c]+A[r*3+1]*B[3+c]+A[r*3+2]*B[6+c]);return o};
const mv3=(M,v)=>[M[0]*v[0]+M[1]*v[1]+M[2]*v[2],M[3]*v[0]+M[4]*v[1]+M[5]*v[2],M[6]*v[0]+M[7]*v[1]+M[8]*v[2]];
function eb(rx,ry,rz,col,s=9,r=7){const V=[],N=[],I=[];for(let j=0;j<=r;j++){const a=Math.PI*j/r;for(let i=0;i<=s;i++){const b=6.2832*i/s,x=Math.sin(a)*Math.cos(b),y=Math.cos(a),z=Math.sin(a)*Math.sin(b),n=Math.hypot(x/rx,y/ry,z/rz)||1;V.push([x*rx,y*ry,z*rz]);N.push([x/rx/n,y/ry/n,z/rz/n])}}
for(let j=0;j<r;j++)for(let i=0;i<s;i++){const a=j*(s+1)+i,b=a+s+1;I.push([a,b,a+1],[a+1,b,b+1])}return{V,N,I,col}}
const Y=[255,214,40],Yd=[236,186,30],O=[255,140,24],Od=[226,104,12],BK=[24,24,30],RD=[178,24,44];
const DM={bd:eb(1,.92,1.1,Y),tl:eb(.26,.3,.5,Y,7,5),hd:eb(.78,.72,.78,Y),bt:eb(.4,.12,.5,O,8,5),bb:eb(.34,.08,.4,Od,8,5),lz:eb(.3,.2,.1,BK,8,6),br:eb(.12,.04,.06,BK,6,4),tm:eb(.04,.04,.42,BK,6,4),cr:eb(.12,.34,.12,Yd,6,5),wg:eb(.16,.55,.42,Yd,8,6),ft:eb(.34,.1,.5,O,8,5),sc:eb(.86,.24,.86,RD,10,6),st:eb(.22,.12,.32,RD,6,5),bo:eb(.2,.5,.2,[190,225,250],8,6)};
function tri(a,b,c,na,nb,nc,col,id){const x0=Math.max(0,Math.floor(Math.min(a[0],b[0],c[0]))),x1=Math.min(DN-1,Math.ceil(Math.max(a[0],b[0],c[0]))),y0=Math.max(0,Math.floor(Math.min(a[1],b[1],c[1]))),y1=Math.min(DN-1,Math.ceil(Math.max(a[1],b[1],c[1]))),d=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(!d)return;const D=DI.data;
for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const px=x+.5-c[0],py=y+.5-c[1],u=((b[1]-c[1])*px+(c[0]-b[0])*py)/d,v=((c[1]-a[1])*px+(a[0]-c[0])*py)/d,w=1-u-v;if(u<-1e-4||v<-1e-4||w<-1e-4)continue;const z=u*a[2]+v*b[2]+w*c[2],i=y*DN+x;if(z<=ZB[i])continue;ZB[i]=z;
const nx=u*na[0]+v*nb[0]+w*nc[0],ny=u*na[1]+v*nb[1]+w*nc[1],nz=u*na[2]+v*nb[2]+w*nc[2],k=i*4;D[k]=col[0];D[k+1]=col[1];D[k+2]=col[2];D[k+3]=255;IB[i]=id;LB[i]=(-.4*nx+.65*ny+.65*nz)/(Math.hypot(nx,ny,nz)||1)}}
function duck(o){const t=frame,w=Math.sin((o.an||0)*1.3),a=o.air,dd=o.dr||0,rq=o.rq||0,bY=(1-Math.abs(w))*.12*rq-(o.lt||0)*.18+(o.id||0)*Math.sin(t*.07)*.02,UU=o.u||12.32,Rr=mm(rZ(o.tilt||0),mm(rX(.1),rY(o.yaw))),fl=o.fl!=null?o.fl:o.slow?.5+Math.sin(t*.1)*.3:a?((o.vy||0)<0?.95+Math.sin(t*.8)*.4:1.15+Math.sin(t*.22)*.15):.14+w*(.14+rq*.38)+(o.id||0)*Math.pow(Math.max(0,Math.sin(t*.045)),6)*.5+(o.lt||0)*.6,sv=o.v||0,bk=o.mo!=null?o.mo*.4:o.bk?.14:0,SC=22,
GR={b:[mm(rZ(w*.09+Math.sin(t*.04)*.015*(o.id||0)),rX(a?-(o.vy||0)*.025:rq*.14)),[0,.4,0]],h:[mm(rX(-dd*.95-(o.ev?.1:0)+Math.sin(t/22)*.04+(o.hp||0)+(o.id||0)*Math.sin(t*.09)*.04+rq*Math.abs(w)*.08),rZ(-w*.08+(o.hz||0))),[0,1.7,.2]],l:o.lwm?[o.lwm,[-1,1.35,0],o.lwo]:[wm(o,-1,fl),[-1,1.35,wz(o,-1)]],r:o.rwm?[o.rwm,[1,1.35,0],o.rwo]:[wm(o,1,fl),[1,1.35,wz(o,1)]]},
fz=o.sit?[.95,.95]:o.sb?[-.5,.6]:a?((o.vy||0)<0?[-.2,-.2]:[.3,.1]):[.4+w*(.35+rq*.3),.4-w*(.35+rq*.3)],fy=o.sit?[-.36,-.36]:o.sb?[.1,.1]:a?((o.vy||0)<0?[.4,.3]:[.05,.15]):[.1+Math.max(0,w)*(.2+rq*.25),.1+Math.max(0,-w)*(.2+rq*.25)],
QP=[[DM.bd,0,1,0,"b"],[DM.tl,0,1.35,-1.05,"b"],[o.pf>.02?eb(.78+.17*o.pf,.72+.04*o.pf,.78,Y):DM.hd,0,1.9,.3,"h",o.hc||0],[DM.bt,0,1.78,1,"h"],[DM.bb,0,1.62-bk,.94,"h"],[DM.wg,-1,.95,wz(o,-1),"l",o.ev?WGC:0],[DM.wg,1,.95,wz(o,1),"r",o.ev?WGC:0],[DM.ft,-.45-(o.wd||0),fy[0],fz[0]],[DM.ft,.45+(o.wd||0),fy[1],fz[1]]];
if(o.ev){const sm=scarf(o,Rr,bY,t,UU);if(!o.nsc&&!o.nst)for(const m of sm)QP.push([m,0,0,0])}
if(dd>0)QP.push([DM.bo,0,2.05,1.25,"h"]);
if(o.ev)QP.push(...(o.eyes?EYQ(o):[]),[DM.lz,-.32,2.05-(o.gz||0)*.3,.98+(o.gz||0)*.1,"h"],[DM.lz,.32,2.05-(o.gz||0)*.3,.98+(o.gz||0)*.1,"h"],[DM.br,0,2.1-(o.gz||0)*.3,1.02+(o.gz||0)*.1,"h"],[DM.tm,-.76,2.06-(o.gz||0)*.3,.62+(o.gz||0)*.04,"h"],[DM.tm,.76,2.06-(o.gz||0)*.3,.62+(o.gz||0)*.04,"h"],...HATQ(),...(o.pc>.15?[]:[[DM.jk,0,1.15,0,"b"],[DM.hm,0,.58,0,"b"],[DM.zp,0,1.1,1.17,"b"]]),...(o.nsc?[]:[[DM.sc2,0,1.62,.12,"b"]]),[DM.jn,-.4-(o.wd||0),.28+fy[0],fz[0]*.8],[DM.jn,.4+(o.wd||0),.28+fy[1],fz[1]*.8]);else QP.push([DM.cr,0,2.65,.2,"h"]);
if(o.ev&&!(o.pc>.15)){for(let i=0;i<7;i++){const t=(i-3)/3,cx=t*.5,cy=1.52-.28*(1-t*t);QP.push([DM.gc,cx,cy,1.18*Math.sqrt(Math.max(0,1-(cx/1.08)**2-((cy-1.15)/.72)**2))+.04,"b"])}QP.push([DM.gp,0,1.16,1.17,"b"])}if(o.ev)QP.push([DM.sh,-.2,2.08,1.07,"h"],[DM.sh,.2,2.08,1.07,"h"]);
DI.data.fill(0);ZB.fill(-1e9);IB.fill(0);
let pid=0;for(const[m,x,y,z,gk,cl]of QP){pid++;const G2=GR[gk],Rg=G2&&G2[0],pv=G2&&G2[1],
vs=m.V.map(v=>{let q=[v[0]+x,v[1]+y+(gk?bY:0),v[2]+z];if(Rg){q=mv3(Rg,[q[0]-pv[0],q[1]-pv[1],q[2]-pv[2]]);q=[q[0]+pv[0]+(G2[2]?G2[2][0]:0),q[1]+pv[1]+(G2[2]?G2[2][1]:0),q[2]+pv[2]+(G2[2]?G2[2][2]:0)]}q=mv3(Rr,[q[0],q[1]-1.2,q[2]]);return[DN/2+q[0]*SC,DN*.86-(q[1]+1.2)*SC,q[2]]}),
ns=m.N.map(n=>mv3(Rr,Rg?mv3(Rg,n):n));for(const[i,j,k]of m.I)tri(vs[i],vs[j],vs[k],ns[i],ns[j],ns[k],cl||m.col,pid)}
scribble();dx.putImageData(DI,0,0)}
function scribble(){const D=DI.data,f=frame>>2,gl=DK.gl||0,at=(x,y)=>x<0||y<0||x>=DN||y>=DN?0:IB[y*DN+x],h=(x,y)=>((x*7919+y*104729+f*31)%97)/97;
for(let y=0;y<DN;y++)for(let x=0;x<DN;x++){const i=y*DN+x,k=i*4,id=IB[i],sx=x+Math.round(Math.sin(y*.37+f*1.9)*1.1+Math.sin(y*.11+f*.7)*.8),sy=y+Math.round(Math.sin(x*.29+f*2.3)*1.1),r=1+(h(x,y)>.55?1:0),n=[at(sx+r,sy),at(sx-r,sy),at(sx,sy+r),at(sx,sy-r)];
let ln=id?n.some(v=>v<id):n.some(v=>v);if(ln&&h(x*3,y*5)<.07)ln=0;
if(ln){const c=gl>.6?255:0;D[k]=c||34;D[k+1]=c||26;D[k+2]=c||44;D[k+3]=255;continue}
if(!id){D[k+3]=0;continue}
const l=LB[i],q=((l<.3&&(x+y+(f&1)*2)%4<1.2)?.66:1)*((l<-.15&&(x-y+DN)%4<1.2)?.7:1),gr=(h(x*2,y)-.5)*14;
for(let c=0;c<3;c++){const v=D[k+c]*q+gr;D[k+c]=Math.min(255,v+(255-v)*gl)}}}
let DT=g;
function duckDraw(cx,gy,sc,o){o.u=12.32*sc;duck(o);const k=DN*.56*sc,sy=o.sy||1,w=k*(o.sx||1),h=k*sy,x=cx-w/2,y=gy-.86*h,j=Math.sin((frame>>2)*12.9898)*.7;DT.drawImage(dc,x+j,y-j*.6,w,h)}
