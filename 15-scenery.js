/* =====================================================================
   Scenery (v2)
   Mountains, clouds, forest, hedges and foreground (bgDraw, fgDraw).
   ===================================================================== */
/* ---- v2 scenery: mountains, clouds, forest, hedges, foreground ---- */
const hzf=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
const sky2=g.createLinearGradient(0,0,0,224);sky2.addColorStop(0,"#3a7fc4");sky2.addColorStop(.55,"#84c1e8");sky2.addColorStop(1,"#d9f1f4");
const HAZE=g.createLinearGradient(0,110,0,224);HAZE.addColorStop(0,"rgba(214,238,248,0)");HAZE.addColorStop(1,"rgba(214,238,248,.7)");
const ridge=(x,s)=>Math.abs(Math.sin(x*.0105+s))*58+Math.abs(Math.sin(x*.026+s*2.1))*30+Math.abs(Math.sin(x*.07+s*3))*8;
function mtn(c,f,A,B,s,lit,shd,snow){const o=c*f,hf=x=>A+B*ridge(x,s)/96;for(let sx=0;sx<W;sx+=4){const x=sx+o,h=hf(x),sl=hf(x+6)-hf(x-6),top=Math.round(224-h),th=A+B*.62;R(sx,top,4,224-top,sl>0?lit:shd);if(snow&&h>th)R(sx,top,4,Math.round((h-th)*.9),sl>0?"#fff":"#dbe8f7")}}
function cloudsNew(c){for(let i=0;i<7;i++){const w=76+i%3*34,M=W+260,cx=(((i*197-c*.07-frame*(.07+i%3*.04))%M)+M)%M-130,cy=26+(i*41)%70;
for(let p=0;p<2;p++){g.fillStyle=p?"#fff":"#a9c9e8";for(let k=0;k<4;k++){const t=(k+.5)/4,r=w*.15+hzf(i*5+k)*w*.1;g.beginPath();g.arc(cx+w*t,cy+16-Math.sin(Math.PI*t)*10+(p?0:4),r,0,7);g.fill()}R(cx+6,cy+(p?14:18),w-12,4,p?"#fff":"#a9c9e8")}}}
function pines(c,f,sp,hMin,hVar,cl,cd,sd){const o=c*f,j0=Math.floor(o/sp)-1;for(let j=j0;j<j0+W/sp+3;j++){const x=Math.round(j*sp+hzf(j+sd)*sp*.8-o),h=Math.round(hMin+hzf(j*3+sd)*hVar),w=h*.42+6;
if(hzf(j*5+sd)<.25){g.fillStyle=cd;g.beginPath();g.arc(x,226-h*.4,h*.36,0,7);g.fill();g.fillStyle=cl;g.beginPath();g.arc(x-3,226-h*.46,h*.26,0,7);g.fill()}
else for(let y=0;y<h;y+=3){const hw=Math.round((y/h*.7+(y%15)/15*.3)*w/2)+1;R(x-hw,226-h+y,hw,3,cl);R(x,226-h+y,hw,3,cd)}}}
function bushes(c){const o=c*.7,sp=24,j0=Math.floor(o/sp)-1;for(let j=j0;j<j0+W/sp+3;j++){const x=j*sp+hzf(j+40)*10-o,r=9+hzf(j+50)*8,a=(cc,xx,yy,rr)=>{g.fillStyle=cc;g.beginPath();g.arc(xx,yy,rr,0,7);g.fill()};a("#2c7048",x,226-r*.4,r);a("#3f9558",x-r*.25,226-r*.65,r*.7);a("#6cc66a",x-r*.35,226-r*.9,r*.28);if(hzf(j+60)<.3)R(x+r*.3,226-r*1.1,2,2,"#ffc2d4")}}
function bgDraw(c){if(S=="play"){bgField(c);return}g.fillStyle=sky2;g.fillRect(0,0,W,224);
const sx=400-c*.03,gr=g.createRadialGradient(sx,62,2,sx,62,70);gr.addColorStop(0,"rgba(255,250,220,1)");gr.addColorStop(.2,"rgba(255,242,190,.9)");gr.addColorStop(1,"rgba(255,242,190,0)");g.fillStyle=gr;g.fillRect(sx-70,0,140,132);
sunShafts(c);cloudsNew(c);mtn(c,.04,52,96,1.3,"#a4c6e8","#8db2dc",1);mtn(c,.1,24,72,4.1,"#7ea8d4","#6a94c4",0);g.fillStyle=HAZE;g.fillRect(0,110,W,114);
pines(c,.25,26,36,48,"#3f8a5a","#2f6a52",3);
B2.forEach((b,i)=>{const bx=b.x-c*.5;if(i%3==2||bx<-140||bx>W)return;R(bx,224-b.h,b.w,b.h,"#5d6a9c");R(bx,224-b.h,b.w,3,"#7d8abc");R(bx,224-b.h,3,b.h,"#6d7aac");b.wn.forEach((l,k)=>{if(l)R(bx+8+(k%b.cl)*16,224-b.h+10+((k/b.cl)|0)*18,8,10,"#ffe29a")});
if(!((b.x/7|0)%3)){g.strokeStyle="#2a2238";g.lineWidth=3;g.lineCap="round";g.beginPath();g.moveTo(bx+12,196);g.bezierCurveTo(bx+22,170,bx+30,214,bx+40,184);g.bezierCurveTo(bx+48,168,bx+56,206,bx+68,180);g.moveTo(bx+10,206);g.lineTo(bx+b.w*.7,202);g.stroke();g.lineCap="butt"}});
midHaze();pines(c,.4,34,22,30,"#4fa860","#3a8a50",11);sakura(c);bushes(c);R(0,224,W,64,"#1c1530")}
function fgDraw(){const c=cam|0,o=c*1.25;vg.save();
PT.forEach(q=>{vg.fillStyle=q.s>2?"#ffc2d4":"#fff0f4";vg.fillRect(q.x|0,q.y|0,q.s,q.s-1)});
for(let k=Math.floor(o/190)-1;k<o/190+4;k++){const x=k*190+hzf(k+77)*90-o,a=(cc,xx,yy,rr)=>{vg.fillStyle=cc;vg.beginPath();vg.arc(xx,yy,rr,0,7);vg.fill()};a("#1c5a34",x,H+3,19);a("#2f8a46",x+13,H+5,15);a("#2f8a46",x-14,H+6,13);a("#6cc66a",x-4,H-12,5);if(hzf(k+88)>.4){vg.fillStyle="#ffc2d4";vg.fillRect(x+9,H-9,2,2);vg.fillRect(x-12,H-6,2,2)}}
for(let i=Math.floor(o/7)-1;i<o/7+W/7+2;i++){const x=i*7-o,h=8+hzf(i)*14,sw=Math.sin(frame*.05+i*.7)*1.6;vg.fillStyle=hzf(i+9)>.5?"#2f8a46":"#1f6a3a";vg.beginPath();vg.moveTo(x,H);vg.lineTo(x+4,H);vg.lineTo(x+2+sw,H-h);vg.fill();vg.fillStyle="#7fd86a";vg.fillRect(x+1+sw*.8,H-h,1,3)}
vg.restore();petalsFront()}
