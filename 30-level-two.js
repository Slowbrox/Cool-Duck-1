/* =====================================================================
   World 1-2: SAKURA HILLS + coin icon + level intro card
   Core idea: soap bubbles bounce you higher; second tool: eggs. Every gate needs its mechanic:
   1 INTRODUCE (0-30)  a wall too high to jump; the bubble leaning on it bounces you up (solid ground below).
   2 DEVELOP  (30-66)  a small pit (bubble optional), then a pit whose far side is HIGHER: only the
                       bubble gets you up there. Rest area + checkpoint.
   3 TWIST    (66-100) a bubble over the abyss is the only way up to the plateau; a bubble ON the
                       plateau super-bounces you to the hidden bread; bubbles lead back down.
                       Then a low tunnel with a spiky chestnut: stomping it hurts, you can't jump over it
                       under the low ceiling -> throw an egg (F).
   CHECKPOINT (111)    right after the tunnel, halfway through the level (42-checkpoint.js).
   4 LADDER  (126-152) a low bubble over the pit bounces you onto a bubble floating in mid-air; only that one
                       is high enough to reach the plateau on the far side.
   5 TUNNEL 2 (160-170) a longer low tunnel with two spiky chestnuts: two eggs.
   6 FINALE  (188-212) the bubble leaning on the summit wall again, then down to the goal car.
   Coins only mark the way (about 60), decoration is in 33-grassland-scenery.js (LVD).
   ===================================================================== */
let LV=1;
/* gold coin with an embossed duck head; works on any 2D context */
function coinIco(c,x,y,r){c.save();c.fillStyle="#2a1a00";c.beginPath();c.arc(x,y+.8,r+1.4,0,7);c.fill();
const gr=c.createLinearGradient(x-r,y-r,x+r,y+r);gr.addColorStop(0,"#fff3a0");gr.addColorStop(.45,"#ffc928");gr.addColorStop(1,"#c97a0c");c.fillStyle=gr;c.beginPath();c.arc(x,y,r,0,7);c.fill();
c.strokeStyle="#a8640a";c.lineWidth=Math.max(.7,r*.13);c.beginPath();c.arc(x,y,r*.76,0,7);c.stroke();
c.fillStyle="#b06c0a";c.beginPath();c.arc(x-r*.1,y-r*.02,r*.34,0,7);c.fill();c.beginPath();c.moveTo(x+r*.16,y-r*.14);c.lineTo(x+r*.54,y+r*.02);c.lineTo(x+r*.16,y+r*.14);c.fill();
c.fillStyle="#ffe680";c.beginPath();c.arc(x-r*.02,y-r*.1,r*.08,0,7);c.fill();c.fillStyle="#fff7c8";c.beginPath();c.arc(x-r*.45,y-r*.45,r*.15,0,7);c.fill();c.restore()}
/* ---- layout (tiles; ground top = row 7). sol(x,row,w,h,"h") = grass hill block, ow(x,row,w,"b") = soap bubble ---- */
const L2={P:[],C:[],PG:[],AN:[],seg:[[0,30],[33,42],[54,66],[88,128],[144,212]]};
(()=>{const keep=P.slice();P.length=0;
L2.seg.forEach(([a,b])=>sol(a,7,b-a,2,"g"));
/* 1 introduce (the bubble leans on the wall: walk, jump or glide - you always end up on it) */sol(9,6,2,1,"h");ow(20,6,2,"b");sol(22,4,4,3,"h");
/* 2 develop (bubble leans on the higher side, so a glide that hits the wall slides onto it) */ow(31,6,1,"b");ow(45,6,3,"b");sol(48,5,6,4,"h");
/* 3 twist    */ow(67,5,1,"b");sol(70,3,8,6,"h");ow(74,2,1,"b");ow(81,4,1,"b");ow(84,5,1,"b");
/*   tunnel   */cave(100,4,8,44/32);
/* 4 ladder (bubble level with the pit edge -> floating bubble -> plateau 144-151; the low bubble alone can't reach it) */ow(128,7,2,"b");ow(132,4,2,"b");sol(144,4,8,3,"h");
/* 5 tunnel 2 */cave(160,4,10,44/32);
/* 6 finale   */ow(190,6,2,"b");sol(192,3,3,4,"h");
L2.P=P.slice();P.length=0;keep.forEach(q=>P.push(q))})();
{const c2=(a,b,n=1)=>{for(let i=0;i<n;i++)L2.C.push({x:(a+i)*T+16,y:b*T+16})};
c2(3,6,3);c2(9,5,2);c2(20,4);c2(21,3);c2(22,3,4);
c2(31,4);c2(45,4,2);c2(49,4,3);c2(58,6,3);
c2(67,3);c2(71,2,2);c2(76,2,2);c2(81,3);c2(84,4);
c2(91,6,2);c2(102,6,3);
c2(114,6,3);c2(128,5);c2(130,4);c2(132,3,2);c2(134,1);c2(137,1);c2(140,2);c2(145,3,3);c2(154,6,2);c2(162,6,2);c2(166,6,2);c2(174,6,3);
c2(190,4);c2(191,3);c2(192,2,3);c2(199,6,3)}
/* [x, from, to, "s" = spiky chestnut] */
L2.PG=[[14,12,19],[37,34,40],[92,89,97],[104,101,106,"s"],[120,117,124],[156,153,158],[162,161,164,"s"],[167,166,168,"s"],[201,197,205]];
/* ---- level intro card ---- */
function lvIntro(){const t=frame-yt;if(t>170||GO||CAR.ph)return;const v=vg,a=Math.min(1,t/12)*Math.min(1,(170-t)/20),e=1-Math.pow(1-Math.min(1,t/16),3);v.save();v.globalAlpha=a;v.translate(W/2+(1-e)*-200,74);v.rotate(-.04);
v.fillStyle=INK;luInk(-120,-28,120,24,LV*17,3);luIt("WORLD 1-"+LV,-104,-10,10,MUT,"left",900);luTi(LVN[LV],0,14,24,["",HL,"#ff9ac8","#7fd86a"][LV],"center");v.restore();v.globalAlpha=1}
