/* =====================================================================
   Music + main loop
   Background music start (beat) and the 60 fps game loop that calls upd() and draw().
   ===================================================================== */
let MS=0,MG=0,MBF,MST=0,MCUR=-1;
/* ---- radio tracks: name, base64 data, tempo + first-beat offset (measured from each track).
   To add a song: put its base64 MP3 in js/data/<name>-data.js as `const MP3_X="..."`, load it in index.html,
   and add a line here. The radio shows empty "COMING SOON" slots until RADIO_SLOTS is filled.
   v = volume multiplier (levelled by ear-loudness against Sidewalk Swagger), le = loop end in seconds (skips trailing silence). ---- */
const TRACKS=[
{n:"Sidewalk Swagger",d:()=>typeof MP3!="undefined"?MP3:"",bpm:109.34,b0:.155,v:1,dance:"swag"},
{n:"Old Theme",d:()=>typeof MP3B!="undefined"?MP3B:"",bpm:93.04,b0:.13,v:.7,dance:"groove"},
{n:"Late Night",d:()=>typeof MP3C!="undefined"?MP3C:"",bpm:81,b0:.375,v:.5,le:177.7,dance:"chill"},
{n:"Clear Skies",d:()=>typeof MP3D!="undefined"?MP3D:"",bpm:90,b0:.135,v:.7,le:175.1,dance:"wave"}],RADIO_SLOTS=5;
let MTR=0;try{const q=+localStorage.getItem("cool_duck_1_track");if(q>=0&&q<TRACKS.length)MTR=q|0}catch(_){}
function mPlay(i){if(i<0||i>=TRACKS.length)return;MTR=i;try{localStorage.setItem("cool_duck_1_track",i)}catch(_){}}
function mDecode(T){if(T.buf!==undefined||!AC)return;T.buf=null;try{const q=atob(T.d()),u=new Uint8Array(q.length);for(let i=0;i<q.length;i++)u[i]=q.charCodeAt(i);AC.decodeAudioData(u.buffer,x=>T.buf=x,()=>{})}catch(_){}}
/* mBeat() = beats elapsed in the playing song; whole numbers land on the beat. Frame clock before music starts. */
function mBeat(){const T=TRACKS[MCUR<0?MTR:MCUR];if(MS&&MBF&&AC){const t=(AC.currentTime-MST-(AC.outputLatency||AC.baseLatency||0))%Math.min(MBF.duration,T.le||1e9);return(t-T.b0)*T.bpm/60}return frame*T.bpm/3600}
/* ---- shuffle: songs play to the end, then the next one comes from a shuffled bag (every song once before any repeats) ---- */
let SHUF=0,SHQ=[];try{SHUF=localStorage.getItem("cool_duck_1_shuffle")=="1"?1:0}catch(_){}
function mNext(){const n=TRACKS.length;if(n<2)return MTR;if(!SHQ.length){SHQ=[...Array(n).keys()].filter(i=>i!=MTR);for(let i=SHQ.length;i>1;i--){const j=Math.random()*i|0;[SHQ[i-1],SHQ[j]]=[SHQ[j],SHQ[i-1]]}}return SHQ.shift()}
function mShuffle(on){SHUF=on?1:0;SHQ=[];try{localStorage.setItem("cool_duck_1_shuffle",SHUF)}catch(_){}
if(MS&&MCUR>=0){try{const T=TRACKS[MCUR];MS.loop=!SHUF;if(T.le&&T.le<T.buf.duration){MS.loopStart=0;MS.loopEnd=T.le}}catch(_){}}}
function mEnded(src){if(src!==MS)return;if(SHUF){const n=mNext();MTR=n;try{localStorage.setItem("cool_duck_1_track",n)}catch(_){}}MCUR=-1}
function beat(){if(!AC)return;const T=TRACKS[MTR];mDecode(T);
if(T.buf&&MCUR!=MTR&&S!="boot"&&S!="cine"&&!(S=="title"&&tt<85)){
if(MS){const os=MS,og=MG;os.onended=null;try{og.gain.cancelScheduledValues(AC.currentTime);og.gain.setTargetAtTime(0,AC.currentTime,.06);os.stop(AC.currentTime+.4)}catch(_){}}
MG=AC.createGain();MS=AC.createBufferSource();MS.buffer=T.buf;MS.loop=!SHUF;if(T.le&&T.le<T.buf.duration){MS.loopStart=0;MS.loopEnd=T.le}MS.connect(MG);MG.connect(AC.destination);
{const src=MS;MS.onended=()=>mEnded(src)}if(SHUF)MS.start(0,0,Math.min(T.buf.duration,T.le||1e9));else MS.start();MST=AC.currentTime;MBF=T.buf;MCUR=MTR}
if(MG)MG.gain.value=mute?0:MUSVOL*(MCUR>=0?TRACKS[MCUR].v||1:1)}
/* guarded loop: an error in one frame is shown on screen instead of freezing the game */
let last=0,acc=0,ERRM=null,ERRT=0;const gErr=(w,e)=>{if(!ERRM||ERRT<=0)console.error(w,e);ERRM=w+": "+(e&&e.message||e);ERRT=600};
/* High refresh rate (120 Hz+): the game logic stays at a fixed 60 steps/s, but every screen refresh is drawn with the
   camera and the duck blended between the last two steps, so motion is smooth on 120/144 Hz screens.
   If drawing gets too slow on a weak machine, in-between frames are skipped automatically to keep 60 steady. */
let IPS=null,DMS=4;
function loop(t){requestAnimationFrame(loop);acc+=Math.min(100,t-last);last=t;try{if(typeof gpPoll=="function")gpPoll()}catch(e){gErr("controller",e)}let stepped=0;while(acc>=16.67){IPS=(S=="play"||S=="t1")&&p&&typeof cam=="number"?{S,p,c:cam,x:p.x,y:p.y}:null;try{upd()}catch(e){gErr("update",e)}PR={};acc-=16.67;stepped=1}
if(!stepped&&DMS>9){try{beat();audTick()}catch(e){gErr("audio",e)}return}
let sv=null;const al=Math.min(1,acc/16.67);if(IPS&&IPS.S==S&&IPS.p===p&&Math.abs(p.x-IPS.x)<48&&Math.abs(p.y-IPS.y)<48&&Math.abs(cam-IPS.c)<64){sv={c:cam,x:p.x,y:p.y};cam=IPS.c+(cam-IPS.c)*al;p.x=IPS.x+(p.x-IPS.x)*al;p.y=IPS.y+(p.y-IPS.y)*al}
const d0=performance.now();
try{draw()}catch(e){gErr("draw",e);try{vg.setTransform(1,0,0,1,0,0);vg.globalAlpha=1;g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;TQ.length=0}catch(_){}}if(sv){cam=sv.c;p.x=sv.x;p.y=sv.y}DMS+=(performance.now()-d0-DMS)*.05;try{beat();audTick()}catch(e){gErr("audio",e)}
if(ERRM&&ERRT>0){ERRT--;vg.save();vg.setTransform(1,0,0,1,0,0);vg.globalAlpha=1;vg.fillStyle="rgba(120,0,20,.85)";vg.fillRect(0,H-16,W,16);vg.fillStyle="#fff";vg.font="bold 9px "+FM;vg.textAlign="left";vg.fillText("Error → "+ERRM.slice(0,96),4,H-5);vg.restore()}}
requestAnimationFrame(loop);
