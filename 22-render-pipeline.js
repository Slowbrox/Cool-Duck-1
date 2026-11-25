/* =====================================================================
   Render pipeline
   draw() for every screen, ground tiles, clouds and the pixel-art colour grading (pixelGrade, sketch).
   ===================================================================== */
let UIM;function draw(){{const mn=S=="boot"||S=="cine"||S=="story"||S=="title"||S=="lobby"||S=="map";if(mn!==UIM){UIM=mn;const a=document.getElementById("tc"),b=document.querySelector("p");if(a)a.style.display=mn?"none":"";if(b)b.style.display=mn?"none":""}if(S!="lobby")CV.style.cursor="default"}document.getElementById("c").style.transform=shk>.3?"translate("+((Math.random()-.5)*shk*2)+"px,"+((Math.random()-.5)*shk*2)+"px)":"";if(S=="boot"||S=="cine"){cineDraw();padToast();return}if(S=="story"){storyDraw();trnDraw();padToast();return}g.setTransform(1,0,0,1,0,0);if(S=="tut"||S=="title"||S=="boot"||S=="intro")tutDraw();else if(S=="t1")t1Draw();else if(S=="shop")shopDraw();else if(S=="end")endDraw();else if(S=="lobby")lobbyDraw();else if(S=="map")wmDraw();else worldDraw();if(S=="shop")hud();if(dlg)dlgDraw();if(S=="title")titleDraw();if(S=="boot")bootDraw();sketch();if(S=="map")wmTop();if(S=="play"){carDraw();CAR.ph||mapDuck();t1Hud();waterDraw();if(!dlg)fgDraw()}if(S=="shop")shopDuck();if(S=="lobby")lobbyDuck();if(S=="t1"){t1Ink();golemDraw();t1Duck();t1Hud();waterDraw()}if(S=="title"||S=="boot")roomDuck();else if(S=="tut"||S=="intro")tutDuck();lcDraw();if(S=="play"){lvIntro();if(!GO&&!LC&&!CAR.ph)hudPro();hitDraw();goDraw()}if(S=="t1"||S=="play")pzDraw();trnDraw();if(S=="title")cineReveal();padToast()}
const IM=vg.createImageData(W,H),LL=new Float32Array(W*H),CC=new Float32Array(W*H),NZ=new Uint8Array(W*H+4096).map(()=>Math.random()*256),DX=new Float32Array(W),DY=new Float32Array(W),DR=new Float32Array(H);
const BY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],Q=v=>v<0?0:v>255?255:Math.round(v/30)*30;
function gt(x){const hz=hzf;R(x,224,T,64,"#241d38");R(x,224,T,8,"#6a4a30");R(x,229,T,3,"#4a3220");
for(let r=0;r<4;r++){const yy=232+r*14,o=(r&1)*8;for(let k=-1;k<3;k++){const bx=x+o+k*16,b0=Math.max(bx,x),b1=Math.min(bx+16,x+T),w=b1-b0;if(w<=0)continue;const gx=Math.floor(bx/16),h=hz(gx*7+r*13);
R(b0,yy,w,12,["#4a4262","#524a6c","#433b5a","#5a5278"][h*4|0]);R(b0,yy,w,2,"#6e6690");R(b0,yy+10,w,2,"#322a46");if(h>.72){R(b0+1,yy,Math.max(1,w-3),3,"#3f8a46");R(b0+3,yy+3,Math.min(4,w-3),2,"#2f7038")}}}
R(x,221,T,7,"#3f9a4a");R(x,221,T,2,"#9be07f");
for(let k=0;k<T;k+=2){const q=hz((x+k)*.37);R(x+k,228,2,2+(q*6|0),"#2f7d3e");if(q>.45)R(x+k,217+(q*4|0),1+(q>.8),5-(q*4|0)+4,q>.7?"#7fd86a":"#5fc15a")}
if(hz(x*.11)>.6)R(x+8+(hz(x)*14|0),219,2,2,"#ffc2d4")}
function cloudsDraw(c){for(let i=0;i<7;i++){const w=76+i%3*34,M=W+260,cx=(((i*197-c*.07-frame*(.07+i%3*.04))%M)+M)%M-130,cy=22+(i*41)%78;[[22,"#dfe8f4"],[8,"#dfe8f4"],[0,"#c3d1e6"],[0,"#c3d1e6"],[10,"#9fb1cf"],[24,"#8da1c2"]].forEach(([n,col],r)=>R(cx+n,cy+r*5,w-n*2,5,col))}}
function pixelGrade(){const s=og.getImageData(0,0,W,H),d=s.data,cm=cam|0,sw=Math.sin(frame*.012)*6;
for(let y=0;y<H;y++){const vy=y/H-.5;for(let x=0;x<W;x++){const k=(y*W+x)*4,vx=x/W-.5,vi=1-Math.min(.45,vx*vx*.5+vy*vy*.6),th=(BY[(y&3)*4+(x&3)]-7.5)*2.2,bu=x+y*.75-190-cm*.12+sw,bm=bu>0&&bu<110?Math.min(1,Math.min(bu,110-bu)/12)*(1-y/H*.5):0;
let r=d[k],g1=d[k+1],b=d[k+2];const sh=1-(r*.3+g1*.59+b*.11)/255;r+=(34-r)*.28*sh;g1+=(22-g1)*.28*sh;b+=(66-b)*.28*sh;
d[k]=Q(r*vi+bm*30+th);d[k+1]=Q(g1*vi+bm*26+th);d[k+2]=Q(b*vi+bm*44+th)}}
vg.putImageData(s,0,0);
for(let i=0;i<28;i++){const x=((i*83.7+Math.sin(frame*.011+i)*20-cm*.12)%W+W)%W,y=((i*47.3-frame*(.1+i%3*.05))%H+H)%H,bu=x+y*.75-190-cm*.12+sw;if(bu>0&&bu<110&&(frame+i*13)%90<62){vg.fillStyle=i%4?"#ffe9a0":"#fff6d0";vg.fillRect(x|0,y|0,2,2)}}}
function sketch(){pixelGrade();
for(const[s,a,b,c,f0,al] of TQ){const f=f0<12?12:f0;let fz=f;const fw=f>=26?"":"bold ";vg.font=fw+fz+"px "+(f>=26?FB:FM);vg.textAlign="left";let w=vg.measureText(s).width;if(w>W-14){fz=Math.max(9,fz*(W-14)/w);vg.font=fw+fz+"px "+(f>=26?FB:FM);w=vg.measureText(s).width}const cw=w/s.length,x0=al=="center"?a-w/2:al=="right"?a-w:a,v=parseInt(c.length==4?c[1]+c[1]+c[2]+c[2]+c[3]+c[3]:c.slice(1,7),16),lt=(v>>16)*.3+((v>>8)&255)*.59+(v&255)*.11;
vg.lineWidth=f>=26?5:4;vg.lineJoin="round";vg.strokeStyle=f>=26||lt>110?"#111":"#fff";vg.fillStyle=f>=26||lt>110?c:"#111";
vg.strokeText(s,x0,b);
vg.fillText(s,x0,b)}
TQ.length=0}
