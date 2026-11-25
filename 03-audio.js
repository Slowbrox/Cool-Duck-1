/* =====================================================================
   Audio / sound effects
   Oscillator + noise sound effects (sfx, noiz), sound table (snd), mixer bus and music/ambience loops.
   ===================================================================== */
function sfx(f,d=.09,t="square",v=.04,e=0,at=0){if(mute)return;try{AC=AC||new AudioContext();const n=AC.currentTime+at,o=AC.createOscillator(),a=AC.createGain();o.type=t;o.frequency.setValueAtTime(f,n);if(e)o.frequency.exponentialRampToValueAtTime(e,n+d);a.gain.setValueAtTime(.0001,n);a.gain.linearRampToValueAtTime(v,n+Math.min(.006,d*.2));a.gain.exponentialRampToValueAtTime(.001,n+d);let s=o;if(t=="square"||t=="sawtooth"){const lp=AC.createBiquadFilter();lp.type="lowpass";lp.frequency.value=Math.max(2200,Math.min(9000,Math.max(f,e||0)*6));o.connect(lp);s=lp}s.connect(a);a.connect(bus());o.start(n);o.stop(n+d+.02)}catch(_){}}
const chime=()=>{[587,740,880,1175].forEach((f,i)=>{sfx(f,.55,"sine",.055,0,i*.09);sfx(f*2.01,.4,"sine",.014,0,i*.09)});noiz(.5,"highpass",6500,9000,.02,.25)};
/* ---- sound upgrade: noise bursts, effects, loops ---- */
const MUSVOL=.16;let NZB,BUS;
function bus(){if(!BUS||BUS.ac!=AC){const cp=AC.createDynamicsCompressor();cp.threshold.value=-14;cp.knee.value=12;cp.ratio.value=4;cp.attack.value=.003;cp.release.value=.18;const inp=AC.createGain(),dry=AC.createGain(),cv=AC.createConvolver(),wet=AC.createGain(),sr=AC.sampleRate,len=Math.floor(sr*1.1),ir=AC.createBuffer(2,len,sr);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}cv.buffer=ir;wet.gain.value=.16;inp.connect(dry);dry.connect(cp);inp.connect(cv);cv.connect(wet);wet.connect(cp);cp.connect(AC.destination);BUS={ac:AC,in:inp}}return BUS.in}
function nzb(){if(!NZB){const sr=AC.sampleRate,b=AC.createBuffer(1,sr,sr),dd=b.getChannelData(0);for(let i=0;i<sr;i++)dd[i]=Math.random()*2-1;NZB=b}return NZB}
function noiz(d,type,f0,f1,v,at=0,q=1){if(mute)return;try{AC=AC||new AudioContext();const n=AC.currentTime+at,s=AC.createBufferSource(),f=AC.createBiquadFilter(),a=AC.createGain();s.buffer=nzb();s.loop=true;f.type=type;f.Q.value=q;f.frequency.setValueAtTime(f0,n);if(f1&&f1!=f0)f.frequency.exponentialRampToValueAtTime(f1,n+d);a.gain.setValueAtTime(.0001,n);a.gain.linearRampToValueAtTime(v,n+Math.min(.012,d*.3));a.gain.exponentialRampToValueAtTime(.0001,n+d);s.connect(f);f.connect(a);a.connect(bus());s.start(n,Math.random()*.5);s.stop(n+d+.03)}catch(_){}}
const snd={
coin(k){const b=988*Math.pow(2,[0,2,4,5,7,9,11,12][Math.min(7,k)]/12);sfx(b,.07,"square",.028);sfx(b*1.5,.26,"triangle",.05,0,.06);sfx(b*3,.2,"sine",.014,0,.06);noiz(.05,"highpass",7000,7000,.025,.05)},
clink(k){sfx(3000+Math.min(6,k)*140,.05,"sine",.026);sfx(4200,.04,"sine",.016,0,.012);noiz(.03,"bandpass",5200,5200,.018,0,6)},
full(){[784,988,1175,1568,1976].forEach((f,i)=>sfx(f,.16,"triangle",.045,0,i*.06));sfx(2637,.5,"sine",.025,0,.3);noiz(.4,"highpass",6000,9000,.03,.25)},
blow(ch){sfx(380-ch*120,.13,"sine",.08,900-ch*300);sfx(180,.1,"sine",.05,320,.05);noiz(.12,"bandpass",900,2200,.045,0,1.2)},
stick(){sfx(210,.14,"sine",.07,120);sfx(430,.09,"sine",.045,260,.03);noiz(.1,"lowpass",900,300,.05)},
pop(ch){const lo=1-ch*.45;noiz(.045,"highpass",3000,3000,.12);sfx(1100*lo,.11,"sine",.1,140*lo);sfx(2200*lo,.03,"square",.028,600);noiz(.3,"bandpass",2600,700,.05+ch*.04,.02,.8);for(let i=0;i<3;i++)sfx(500+Math.random()*500,.05,"sine",.028,400+Math.random()*900,.07+i*.05)},
chuteOpen(){noiz(.24,"bandpass",350,1600,.06,0,1.1);sfx(150,.15,"sine",.05,80);sfx(300,.09,"sine",.012,460,.08)},
chuteClose(){noiz(.13,"bandpass",1300,450,.03,0,1)},
/* duck movement: soft sine/triangle tones + filtered noise only (no buzzy square/saw) */
board(){sfx(170,.06,"triangle",.03,110);noiz(.05,"bandpass",1600,1200,.025,.03,1.6)},
clack(sp){noiz(.025,"bandpass",1400+Math.random()*250,1000,.028*(.4+sp),0,2);sfx(125+Math.random()*10,.035,"sine",.018*(.4+sp),85)},
ollie(){sfx(200,.07,"triangle",.035,115);noiz(.05,"bandpass",1800,1100,.03,0,1.6);sfx(420,.05,"sine",.012,700,.02)},
land(v,bd){if(bd){noiz(.07,"lowpass",900,280,.04,0,.9);sfx(130,.07,"triangle",.035,75)}else{sfx(85+v*2,.1,"sine",Math.min(.06,.018+v*.005),52);noiz(.06,"lowpass",450,160,Math.min(.035,.008+v*.003),0,.7)}}
};
Object.assign(snd,{
jump(){if(BD.k>.6){snd.ollie();return}sfx(240,.12,"sine",.045,470);sfx(480,.07,"sine",.01,880,.015);noiz(.07,"bandpass",800,1600,.012,0,.9)},
step(v){noiz(.035,"lowpass",650+Math.random()*200,260,.01+v*.012,0,.7);sfx(105+Math.random()*15,.04,"sine",.008+v*.01,70)},
scarf(){noiz(.13,"bandpass",800,2200,.03,0,1.2);sfx(380,.11,"sine",.022,700)},
hook(){sfx(990,.05,"triangle",.02,760);sfx(170,.12,"sine",.045,100);noiz(.04,"bandpass",2200,1700,.018,0,2.5)},
fling(){noiz(.22,"bandpass",450,1900,.035,0,1);sfx(290,.18,"sine",.03,600)},
bump(){sfx(140,.1,"sine",.06,75);noiz(.06,"lowpass",600,250,.03,0,.8)},
fall(){sfx(560,.45,"sine",.035,130);noiz(.35,"lowpass",1500,260,.025,0,.7)},
gstep(v){sfx(110,.12,"sine",.1*v,60);noiz(.06,"bandpass",2200,1200,.06*v);sfx(900+Math.random()*300,.05,"square",.02*v,1500,.02)},
gwind(v){sfx(650,.18,"square",.03*v,880,.05);noiz(.6,"bandpass",260,720,.07*v,0,3);sfx(95,.6,"sawtooth",.035*v,170);sfx(420,.55,"sine",.025*v,980,.05)},
gslam(v){sfx(58,.55,"sine",.22*v,26);noiz(.5,"lowpass",900,90,.2*v);noiz(.06,"highpass",1800,1800,.1*v);noiz(.45,"bandpass",500,1800,.05*v,.03,.9);for(let i=0;i<4;i++)sfx(900+Math.random()*900,.04,"square",.02*v,300,.08+i*.05)},
ghit(v,d){sfx(760,.12,"square",.04*v,420);sfx(150,.14,"triangle",.11*v,65);noiz(.09,"bandpass",1300,500,.09*v,0,2);sfx(210,.28,"sawtooth",.045*v,110,.02);if(d>1)sfx(95,.3,"sine",.1*v,45)},
gdown(v){sfx(900,.7,"sawtooth",.06*v,150);sfx(160,.9,"sawtooth",.05*v,45);sfx(80,.9,"sine",.1*v,32);noiz(.8,"lowpass",700,150,.07*v)},
gcrumble(v){for(let i=0;i<6;i++){noiz(.2+Math.random()*.2,"lowpass",900+Math.random()*500,150,.1*v,i*.045,1.2);sfx(70+Math.random()*50,.2,"sine",.1*v,38,i*.045)}noiz(.5,"highpass",2200,5000,.05*v,.05);[1568,1319,1047,784,659].forEach((f,i)=>sfx(f,.5,"sine",.035*v,0,.3+i*.1))},
gate(){noiz(1,"lowpass",420,160,.14,0,1.4);sfx(48,1,"sine",.14,34);noiz(.08,"bandpass",900,500,.1,1,3);sfx(90,.15,"sine",.12,45,1)}
});
const AU={bl:-99,cho:0,gnd:1,pvy:0,sw:0,bd:0,st:0,lp:{}};
function auLoop(k,type,f,q){let l=AU.lp[k];if(!l||l.ac!=AC){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g2=AC.createGain();s.buffer=nzb();s.loop=true;fl.type=type;fl.frequency.value=f;fl.Q.value=q;g2.gain.value=0;s.connect(fl);fl.connect(g2);g2.connect(bus());s.start();l=AU.lp[k]={f:fl,g:g2,ac:AC}}return l}
function audTick(){if(!AC)return;try{nzb();
const live=!mute&&(S=="play"||S=="t1")&&!dlg,now=AC.currentTime,onB=BD.k>.6,ok=live&&onB&&p.g&&!tAtt&&Math.abs(p.vx)>.4,sp=Math.min(1,Math.abs(p.vx)/4.4);
const r1=auLoop("sk","bandpass",900,.9),r2=auLoop("sl","lowpass",170,.7),wd=auLoop("wd","bandpass",650,.6);
r1.g.gain.setTargetAtTime(ok?.008+sp*.04:0,now,.06);r1.f.frequency.setTargetAtTime(450+sp*800,now,.06);r2.g.gain.setTargetAtTime(ok?.025+sp*.07:0,now,.07);
let wy=0;
if(live){
const sw=Math.floor(BD.w/9);if(ok&&sw!=AU.sw)snd.clack(sp);AU.sw=sw;
if(onB!=AU.bd){if(onB)snd.board();else noiz(.05,"bandpass",1800,1200,.04);AU.bd=onB}
const g0=!!p.g;if(g0!=AU.gnd){if(g0){if(AU.pvy>3.5)snd.land(AU.pvy,onB)}AU.gnd=g0}
if(!g0)AU.pvy=p.vy;const sk=Math.floor(p.an/4.4);if(g0&&!onB&&!tAtt&&Math.abs(p.vx)>.9&&sk!=AU.st)snd.step(Math.min(1,Math.abs(p.vx)/4));AU.st=sk;
if(!AU.cho&&PCH.k>.35){AU.cho=1;snd.chuteOpen()}else if(AU.cho&&PCH.k<.05){AU.cho=0;snd.chuteClose()}
if(AU.cho&&!p.g&&!tAtt)wy=.02+Math.min(1,Math.max(0,p.vy)/3)*.02+Math.sin(frame*.8)*.006;
if(tCh>0&&!(tFire>0)&&frame-AU.bl>Math.max(3,11-(tCh/7|0))){AU.bl=frame;const f=300+tCh*9+Math.random()*80;sfx(f,.05,"sine",.035,f*1.6)}}
wd.g.gain.setTargetAtTime(wy,now,.08)}catch(_){}}
