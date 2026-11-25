/* =====================================================================
   Game setup
   Fonts names, canvas + drawing contexts, world size constants and the main game state variables.
   ===================================================================== */
const FM='ui-rounded,"Segoe UI","Helvetica Neue",Arial,system-ui,sans-serif',FB='"TagBig","Tag",ui-monospace,Menlo,monospace';
const vg=document.getElementById("c").getContext("2d"),W=512,H=288,T=32,WW=212*T,oc=document.createElement("canvas");oc.width=512;oc.height=288;const g=oc.getContext("2d",{willReadFrequently:true}),og=g;let sqv=0,yt=0;
let K={},PR={},AC,mute=0,lvC=0,S="title",frame=0,p,cam,coins,hearts,stamps,secrets,soda,inv,cp,dlg,sh,bn,near,C,E;
