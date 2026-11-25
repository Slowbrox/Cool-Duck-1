/* =====================================================================
   World 1-3: MATSU CLIFFS (+ the level names LVN)
   Core idea: the scarf (Q) swings you on flower wreaths up the cliffs; the parachute (hold jump) carries you on.
   An "athletic" stage; both mechanics are REQUIRED (checked in tests):
   1 INTRODUCE (0-30)   a wreath above safe ground to try swinging, then a small pit (jump, skate or swing).
   2 DEVELOP  (30-64)   two wreaths between cliffs: the second cliff is higher, so you have to swing UP.
                        Rest area with a stone lantern.
   3 TWIST    (64-88)   from the high cliff: no wreath over the wide valley - only the parachute gets you over.
                        A ledge deep in the valley holds the hidden bread; the wreath above it gets you out again.
   CHECKPOINT (101)     on the meadow after the valley, halfway through the level (42-checkpoint.js).
   4 CHAIN  (104-126)   a wreath chain over a pit far too wide to glide: swing from wreath to wreath.
   5 CLIMB  (126-178)   a wreath in front of a high cliff swings you up; from the top a glide crosses the next
                        valley (too wide from the ground). A small hill on the far meadow stops long glides.
   6 FINALE (178-212)   one more swing (or jump + glide) onto a low cliff, a ledge, down into the goal meadow.
   Coins only mark the way (about 60), six slimes, decoration is in 33-grassland-scenery.js (LVD).
   ===================================================================== */
const LVN=["","HANA MEADOW","SAKURA HILLS","MATSU CLIFFS"];
/* hooks (drawn as flower wreaths on vines): no wreath over the valleys on purpose, so crossing them needs the glide */
const L3={P:[],C:[],PG:[],AN:[[13,2],[37.5,1],[40.5,1],[80.5,2],[108,2],[113,2],[118,2],[123,2],[140,1],[181,2]],
seg:[[0,16],[20,30],[50,64],[88,104],[126,146],[162,178],[196,212]]};
(()=>{const keep=P.slice();P.length=0;L3.seg.forEach(([a,b])=>sol(a,7,b-a,2,"g"));
/* 2 develop (cliff B is 2 rows higher than A: a jump + glide can't make it, the wreaths can) */sol(30,5,6,4,"h");sol(42,3,8,6,"h");sol(60,5,2,2,"h");
/* 3 twist    */sol(64,3,5,6,"h");ow(77,6,2,"r");
/* 5 climb (high cliff 142-145, then the valley 146-162; the hill at 172 is a brake) */sol(142,3,4,4,"h");sol(172,5,3,2,"h");
/* 6 finale (easy on purpose: jump + glide works, the hook is the fun way) */sol(183,6,6,3,"h");ow(193,6,3,"r");
L3.P=P.slice();P.length=0;keep.forEach(q=>P.push(q))})();
{const c3=(a,b,n=1)=>{for(let i=0;i<n;i++)L3.C.push({x:(a+i)*T+16,y:b*T+16})};
c3(3,6,3);c3(12,4,3);c3(17,5,2);
c3(31,4,3);c3(37,4);c3(40,4);c3(44,2,3);
c3(53,6,3);c3(60,4,2);c3(65,2,2);
c3(72,3);c3(76,3);c3(80,4);c3(84,5);c3(86,6);
c3(90,6,3);c3(97,6,2);
c3(108,5);c3(113,5);c3(118,5);c3(123,5);c3(128,6,3);c3(140,4);c3(142,2,3);c3(149,3);c3(153,4);c3(157,5);c3(161,6);c3(165,6,3);
c3(181,4);c3(185,5,3);c3(193,5,2);c3(200,6,3)}
L3.PG=[[24,21,28],[56,52,58],[93,89,96],[132,129,135],[167,164,170],[201,198,205]];
