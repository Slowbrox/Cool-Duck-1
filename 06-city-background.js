/* =====================================================================
   City background
   Skyline buildings, sky gradient, floating particles and confetti.
   ===================================================================== */
/* ---- background ---- */
const B1=[],B2=[];
for(let a=0,w;a<WW*.2+W;a+=w){w=34+(rn()*40|0);B1.push({x:a,w:w-2,h:50+(rn()*80|0)})}
for(let a=0,w;a<WW*.5+W;a+=w){w=80+(rn()*50|0);const h=100+(rn()*70|0),cl=(w-16)/16|0,rw=(h-20)/18|0;B2.push({x:a,w:w-4,h,cl,wn:Array.from({length:cl*rw},()=>rn()<.45)})}
const sky=g.createLinearGradient(0,0,0,224);sky.addColorStop(0,"#5f7aa8");sky.addColorStop(.55,"#9db2d3");sky.addColorStop(1,"#d6c3dc");
const PT=Array.from({length:24},()=>({x:rn()*W,y:rn()*H,v:.3+rn()*.5,s:2+(rn()*2|0)}));
const CF=Array.from({length:70},()=>({x:rn()*W,y:rn()*H,v:1+rn()*2,c:["#e8302a","#ffc928","#f2ece0","#2e7fd1"][rn()*4|0]}));
