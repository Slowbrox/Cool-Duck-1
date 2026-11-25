/* =====================================================================
   Input
   Keyboard, mouse/touch and on-screen button handling (K = held keys, PR = keys pressed this frame).
   ===================================================================== */
const pr=(...c)=>c.some(k=>PR[k]),dn=(...c)=>c.some(k=>K[k]);
addEventListener("keydown",e=>{if(e.code.startsWith("Arrow")||e.code=="Space")e.preventDefault();if(!K[e.code])PR[e.code]=1;K[e.code]=1;if(e.code=="KeyM")mute=!mute});
addEventListener("pointerdown",()=>PR.Click=1);
addEventListener("keyup",e=>K[e.code]=0);
document.querySelectorAll("#tc button").forEach(b=>{const k=b.dataset.k;b.onpointerdown=e=>{e.preventDefault();K[k]=1;PR[k]=1};b.onpointerup=b.onpointerleave=b.onpointercancel=()=>K[k]=0});
