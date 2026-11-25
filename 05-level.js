/* =====================================================================
   World 1-1: HANA MEADOW (main level layout: P, C0, PG, L1AN, L1SEG)
   Core idea: the parachute - hold jump in the air to glide. Soap bubbles are the launch pads.
   Every gate below can ONLY be passed with its mechanic (checked with a test bot):
   1 INTRODUCE (0-32)   first slime to stomp; climb a little hill staircase, then a pit that only a glide
                        crosses (coins show the glide line).
   2 DEVELOP  (32-70)   a bubble leans on a tall tower: bounce up, then glide over an even wider pit.
                        Rest area.
   3 TWIST    (70-102)  a huge pit with bubbles floating over it: glide onto a bubble, bounce (hold jump)
                        back up and glide on. Without the bubbles it can't be crossed.
                        Hidden bread: bounce straight up from the first bubble.
   CHECKPOINT (106)     rest area with a stone lantern, halfway through the level (42-checkpoint.js).
   4 CLIMB   (118-182)  a bubble ladder at the foot of a high cliff: the low bubble bounces you onto the one
                        floating above it, that one up onto the cliff. Only from up there does a glide cross the
                        long valley. Then two quick glide hops over pits with a small island between them.
   5 FINALE  (182-212)  a bubble leans on the summit: bounce up, glide down to the goal car.
   sol(x,row,w,h,"h") = natural hill block, ow(x,row,w,"b") = soap bubble.
   ===================================================================== */
const P=[],sol=(a,b,w,h,k)=>P.push({x:a*T,y:b*T,w:w*T,h:h*T,k}),ow=(a,b,w,k="a",c)=>P.push({x:a*T,y:b*T,w:w*T,h:8,o:1,k,c}),
cave=(a,b,w,h)=>{sol(a,b,w,h,"h");P[P.length-1].cv=1};
const L1SEG=[[0,24],[32,48],[60,70],[102,131],[149,166],[172,176],[182,212]],L1AN=[];
L1SEG.forEach(([a,b])=>sol(a,7,b-a,2,"g"));
/* 1 introduce */sol(14,6,2,1,"h");sol(16,5,2,2,"h");sol(18,4,6,3,"h");
/* 2 develop  */ow(42,6,2,"b");sol(44,3,4,4,"h");
/* 3 twist (wide bubbles placed where a glide from the pit edge comes down) */ow(74,6,4,"b");ow(89,6,6,"b");
/* 4 climb (two bubbles stacked against the cliff -> cliff top; the valley 131-149 needs that height) */ow(124,6,2,"b");ow(124,4,2,"b");sol(126,2,5,5,"h");
/* 5 finale   */ow(192,6,2,"b");sol(194,3,4,4,"h");
const STY={sal:{b:"#2c3550",s:"#f2c9a0",h:"#222",t:"#d33",l:"#222"},gran:{b:"#8a5ca8",s:"#f2c9a0",h:"#ddd",l:"#8a5ca8",w:6},bou:{b:"#111",s:"#d9a97e",h:"#111",gl:1,l:"#111",w:9,t:"#fff"}};
const NP=[],SE=[];
const C0=[],co=(a,b,n=1,d=1)=>{for(let i=0;i<n;i++)C0.push({x:(a+i*d)*T+16,y:b*T+16})};
co(3,6,3);co(14,5);co(16,4);co(19,3,4);co(25,3);co(27,4);co(29,5);co(31,6);
co(36,6,2);co(42,4);co(43,3);co(44,2,3);co(50,3);co(53,4);co(56,5);co(59,6);co(63,6,3);
co(76,4);co(80,3);co(84,4);co(90,4);co(93,4);co(98,3);co(101,5);
co(111,6,3);co(124,5);co(125,2.5);co(127,1,3);co(133,1.5);co(137,2.5);co(141,3.5);co(145,4.5);
co(152,6,2);co(168,4);co(170,5);co(173,6,2);co(178,4);co(180,5);
co(186,6,2);co(192,4);co(193,3);co(194,2,3);co(199,4);co(201,5);co(204,6,3);
const PG=[[9,7,12],[37,34,40],[115,112,119],[158,155,163],[187,183,190],[202,199,205]];
