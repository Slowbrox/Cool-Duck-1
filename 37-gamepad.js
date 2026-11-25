/* =====================================================================
   Controller support (Gamepad API, standard layout: Xbox / PlayStation / Switch Pro)
   Buttons are translated into the keyboard codes the game already uses (K = held, PR = pressed this frame),
   so every screen works without special cases. The mapping depends on where you are:
     In levels:  stick / D-pad move · A jump (hold: glide) · X throw egg · B water spit · Y talk / enter
                 RB or RT skateboard · LB or LT scarf · START pause · SELECT mute · stick down = enter doors
     In menus:   stick / D-pad navigate · A confirm · B back · START back / pause
     Lobby room: X book · Y radio   |  Radio: X shuffle  |  Wardrobe: LB / RB change page
   ===================================================================== */
const GPH={};let GPL=0,GPT=0,GPN="",GPP=[];
addEventListener("gamepadconnected",e=>{GPT=200;GPN=(e.gamepad&&e.gamepad.id||"").replace(/\(.*?\)/g,"").trim().slice(0,28);GPL=1});
addEventListener("gamepaddisconnected",()=>{GPT=-150});
addEventListener("keydown",()=>{GPL=0});CV.addEventListener("pointermove",()=>{GPL=0});
function gpCtx(){const lvl=(S=="play"||S=="t1"||S=="tut"||S=="intro")&&!PZ.on&&!LC&&!dlg&&!GO,lob=S=="lobby",room=lob&&lb.mode=="room"&&!lb.go,shop=lob&&lb.mode=="shop";
return{
0:S=="end"?["KeyR"]:lvl?["Space"]:["Space","Enter"],
1:lvl?[]:["Escape"],
2:lvl?["KeyF"]:room&&lb.rad?["KeyT"]:room&&!lb.bk?["KeyB"]:[],
3:lvl?["KeyE"]:room&&!lb.bk&&!lb.rad?["KeyR"]:[],
4:shop?["PageUp"]:["KeyQ"],6:shop?["PageUp"]:["KeyQ"],
5:shop?["PageDown"]:["ShiftLeft"],7:shop?["PageDown"]:["ShiftLeft"],
9:S=="end"?["KeyR"]:["Escape"],
12:["ArrowUp"],13:["ArrowDown"],14:["ArrowLeft"],15:["ArrowRight"],lvl}}
function gpPoll(){let pads=[];try{pads=navigator.getGamepads?[...navigator.getGamepads()]:[]}catch(_){}
const gp=pads.find(q=>q&&q.connected);const want={};
if(gp){const M=gpCtx(),B=gp.buttons,ax=gp.axes||[],on=i=>!!(B[i]&&(B[i].pressed||B[i].value>.5)),any=B.some((b,i)=>on(i))||Math.abs(ax[0]||0)>.5||Math.abs(ax[1]||0)>.5;if(any)GPL=1;
for(const k in M){if(k=="lvl")continue;if(on(+k))for(const c of M[k])want[c]=1}
const x=ax[0]||0,y=ax[1]||0;if(x<-.4)want.ArrowLeft=1;if(x>.4)want.ArrowRight=1;
if(M.lvl){if(y>.75)want.ArrowDown=1}else{if(y<-.5)want.ArrowUp=1;if(y>.5)want.ArrowDown=1}
const sel=on(8);if(sel&&!GPP[8])mute=!mute;GPP[8]=sel}
for(const c in want)if(!GPH[c]){GPH[c]=1;if(!K[c])PR[c]=1;K[c]=1}
for(const c in GPH)if(!want[c]){delete GPH[c];K[c]=0}
if(GPT>0)GPT--;else if(GPT<0)GPT++}
/* short rumble on supported pads */
function gpRumble(ms,weak,strong){try{const gp=[...navigator.getGamepads()].find(q=>q&&q.connected),va=gp&&gp.vibrationActuator;if(va&&va.playEffect)va.playEffect("dual-rumble",{duration:ms,weakMagnitude:weak,strongMagnitude:strong})}catch(_){}}
/* "controller connected" toast */
function padToast(){if(!GPT)return;const v=vg,on=GPT>0,k=on?Math.min(1,GPT/20,(200-GPT)/12):Math.min(1,-GPT/20,(150+GPT)/12);if(k<=0)return;
v.save();v.globalAlpha=k;const s=on?"CONTROLLER CONNECTED":"CONTROLLER DISCONNECTED",w=luW(s,9,900)+40,x=W/2-w/2,y=H-34+(1-k)*10;
v.fillStyle="rgba(12,8,20,.82)";v.beginPath();srrV(v,x,y,w,22,11);v.fill();v.strokeStyle="rgba(255,255,255,.12)";v.lineWidth=1;v.stroke();
const cx=x+16,cy=y+11;v.fillStyle=on?HL:MUT;v.beginPath();srrV(v,cx-8,cy-4.5,16,9,4.5);v.fill();v.fillStyle="rgba(12,8,20,.9)";v.fillRect(cx-5.5,cy-.6,4,1.2);v.fillRect(cx-4.1,cy-2,1.2,4);v.beginPath();v.arc(cx+3.2,cy-1.2,1,0,7);v.arc(cx+5,cy+1,1,0,7);v.fill();
luIt(s,x+30,y+14.5,9,"#fff","left",900);v.restore()}
