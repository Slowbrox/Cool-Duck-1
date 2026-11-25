/* =====================================================================
   Characters drawing
   Humans, NPCs, pigeons and the older background (human, npc, pigeon, bgOld).
   ===================================================================== */
/* ---- drawing ---- */
function human(cx,gy,o,f=1,an=0){g.save();g.translate(Math.round(cx),Math.round(gy));g.scale(f*(1-sqv),1+sqv);const l=Math.round(Math.sin(an)*3),w=o.w||7,lc=o.l||"#2f4b7c";
R(-5+l,-8,4,8,lc);R(1-l,-8,4,8,lc);R(-5+l,-2,5,2,"#fff");R(1-l,-2,5,2,"#fff");
if(o.p)R(-w-4,-19,5,10,o.p);
R(-w,-20,w*2,12,o.b);R(-w-2,-19,3,9,o.b);R(w-1,-19,3,9,o.b);R(-w-2,-10,3,2,o.s);R(w-1,-10,3,2,o.s);
if(o.t)R(-1,-20,3,8,o.t);
R(-6,-30,12,10,o.s);R(-7,-31,14,5,o.h);R(-7,-27,3,6,o.h);R(2,-26,2,2,"#222");R(1,-22,4,1,"#a55");
if(o.hat){R(-8,-32,16,3,o.hat);R(-5,-35,10,4,o.hat)}if(o.gl)R(0,-27,7,3,"#111");g.restore()}
function vm(x,y,c){R(x+1,y,30,64,c);R(x+4,y+5,18,34,"#bfe9ff");for(let i=0;i<3;i++){const k=["#f55","#5c5","#fd4"][i];R(x+6,y+8+i*10,6,7,k);R(x+14,y+8+i*10,6,7,k)}R(x+24,y+6,5,26,"#333");R(x+6,y+46,20,6,"#222");R(x+1,y+62,30,2,"#0006")}
function npc(n){const x=n.x,b=0;
if(n.k=="cat"){R(x-12,202,24,22,"#f3e9d8");R(x-13,188,26,16,"#f3e9d8");R(x-13,184,6,6,"#f3e9d8");R(x+7,184,6,6,"#f3e9d8");R(x-7,194,3,3,"#222");R(x+4,194,3,3,"#222");R(x-12,204,24,3,"#e33");R(x-2,207,4,4,"#ffd24a");R(x+12,196+(Math.sin(frame/30)*2|0),5,10,"#f3e9d8")}
else if(n.k=="mas"){g.fillStyle="#fff";g.beginPath();g.moveTo(x,186+b);g.lineTo(x+15,222);g.lineTo(x-15,222);g.fill();R(x-9,210,18,12,"#222");R(x-5,200+b,2,3,"#222");R(x+3,200+b,2,3,"#222");R(x-7,222,5,2,"#fff");R(x+2,222,5,2,"#fff")}
else if(n.k=="vend"){vm(x-16,160,"#3a9ad9");R(x-8,172+b,3,3,"#222");R(x+1,172+b,3,3,"#222");R(x-6,180,8,2,"#222")}
else{human(x,224,STY[n.k],1,0);if(n.k=="sal"&&!n.q)TX("z",x+8,176-(frame/40%8|0),"#fff",12)}}
function pigeon(e){const d=e.d,x=e.x,y=e.y,s=Math.sin(frame/14)*1|0;R(x+2,y+4,18,10,"#8d94a6");R(x+(d>0?14:0),y+s,8,8,"#6f7688");R(x+(d>0?20:-2),y+3+s,3,2,"#f90");R(x+(d>0?17:3),y+2+s,2,2,"#111");R(x+(d>0?3:10),y+6,9,6,"#6a7184");R(x+6,y+14,2,4,"#e96");R(x+13,y+14,2,4,"#e96")}
function bgOld(c){g.fillStyle=sky;g.fillRect(0,0,W,H);g.fillStyle="#e9ecf6";g.globalAlpha=.5;g.beginPath();g.arc(380-c*.04,150,44,0,7);g.fill();g.globalAlpha=1;cloudsDraw(c);
for(const b of B1){const bx=b.x-c*.2;if(bx>-80&&bx<W)R(bx,224-b.h,b.w,b.h,"#7f86ad")}
for(const b of B2){const bx=b.x-c*.5;if(bx<-140||bx>W)continue;R(bx,224-b.h,b.w,b.h,"#473f70");b.wn.forEach((l,i)=>{if(l)R(bx+8+(i%b.cl)*16,224-b.h+10+((i/b.cl)|0)*18,8,10,"#ffd77a")})}
for(const b of B2){const bx=b.x-c*.5;if(bx<-140||bx>W||(b.x/7|0)%3)continue;g.strokeStyle="#2a2238";g.lineWidth=3;g.lineCap="round";g.beginPath();g.moveTo(bx+12,196);g.bezierCurveTo(bx+22,170,bx+30,214,bx+40,184);g.bezierCurveTo(bx+48,168,bx+56,206,bx+68,180);g.moveTo(bx+10,206);g.lineTo(bx+b.w*.7,202);g.stroke();g.lineCap="butt"}
R(0,224,W,64,"#1c1530")}
