const NAME = "Noobdi"; // change her name here
const gate=document.getElementById("gate"), exp=document.getElementById("experience");
const enter=document.getElementById("enterBtn"), music=document.getElementById("music"), musicBtn=document.getElementById("musicBtn");
const nameEl=document.getElementById("nameText");

function typeName(){
  nameEl.textContent="";
  [...NAME].forEach((c,i)=>setTimeout(()=>nameEl.textContent+=c,i*120));
}
enter.onclick=()=>{
  gate.classList.add("vanish");
  setTimeout(()=>{gate.remove();exp.hidden=false;typeName(); startStars();},700);
  music.play().catch(()=>{});
};
musicBtn.onclick=()=>{ if(music.paused){music.play();musicBtn.innerHTML="♫ <span>Playing</span>"}else{music.pause();musicBtn.innerHTML="♫ <span>Music</span>"}};

const letter=document.getElementById("letter");
letter.onclick=e=>{ if(!e.target.classList.contains("close-letter")) letter.classList.toggle("open") };
document.querySelector(".close-letter").onclick=e=>{e.stopPropagation();letter.classList.remove("open")};

const gift=document.getElementById("gift"), msg=document.getElementById("giftMessage");
gift.onclick=()=>{gift.classList.add("open");setTimeout(()=>msg.classList.add("show"),500);setTimeout(fireworks,850)};

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

const heartField=document.getElementById("heartField");
for(let i=0;i<22;i++){const h=document.createElement("span");h.className="heart";h.textContent=Math.random()>.5?"♥":"✦";h.style.left=Math.random()*100+"%";h.style.bottom=(-Math.random()*30)+"px";h.style.animationDelay=Math.random()*6+"s";h.style.animationDuration=(5+Math.random()*6)+"s";heartField.appendChild(h)}

function startStars(){
 const c=document.getElementById("stars"),ctx=c.getContext("2d"); let w,h,pts=[];
 function resize(){w=c.width=innerWidth*devicePixelRatio;h=c.height=innerHeight*devicePixelRatio;pts=Array.from({length:150},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.7*devicePixelRatio,a:Math.random(),s:.08+Math.random()*.35}))}
 addEventListener("resize",resize);resize();
 function draw(){ctx.clearRect(0,0,w,h);pts.forEach(p=>{p.y-=p.s*devicePixelRatio;if(p.y<0)p.y=h;p.a+=.01;ctx.globalAlpha=.25+.3*Math.sin(p.a);ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fill()});requestAnimationFrame(draw)}draw();
}

const fx=document.getElementById("fx"), fctx=fx.getContext("2d");let sparks=[];
function fireworks(){
 fx.width=innerWidth*devicePixelRatio;fx.height=innerHeight*devicePixelRatio;
 for(let n=0;n<9;n++){let x=(.15+Math.random()*.7)*fx.width,y=(.15+Math.random()*.45)*fx.height;
  for(let i=0;i<70;i++){let a=Math.random()*Math.PI*2,s=1+Math.random()*5;sparks.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1})}
 }
 requestAnimationFrame(drawFx);
}
function drawFx(){fctx.clearRect(0,0,fx.width,fx.height);sparks=sparks.filter(p=>p.life>0);sparks.forEach(p=>{p.x+=p.vx*devicePixelRatio;p.y+=p.vy*devicePixelRatio;p.vy+=.04;p.life-=.012;fctx.globalAlpha=p.life;fctx.fillStyle=Math.random()>.5?"#f4c878":"#e58aa9";fctx.beginPath();fctx.arc(p.x,p.y,2*devicePixelRatio,0,7);fctx.fill()});if(sparks.length)requestAnimationFrame(drawFx);else fctx.clearRect(0,0,fx.width,fx.height)}
document.getElementById("fireBtn").onclick=fireworks;

// Countdown to the next 19 August at midnight; once reached, it changes into celebration text.
function countdown(){
 const now=new Date(), target=new Date(now.getFullYear(),7,19,0,0,0);
 if(now>=target) target.setFullYear(now.getFullYear()+1);
 const d=target-now,s=Math.floor(d/1000),days=Math.floor(s/86400),hrs=Math.floor(s%86400/3600),mins=Math.floor(s%3600/60),secs=s%60;
 const el=document.getElementById("countdown");
 el.textContent=`NEXT MIDNIGHT · ${days}D ${String(hrs).padStart(2,"0")}H ${String(mins).padStart(2,"0")}M ${String(secs).padStart(2,"0")}S`;
}
setInterval(countdown,1000);countdown();


// Multiple cinematic memory cards
document.querySelectorAll(".memory-video").forEach(card => {
  const video = card.querySelector("video");
  const button = card.querySelector(".video-play");

  let hideTimer;

  function showButtonTemporarily() {
    card.classList.add("show-control");

    clearTimeout(hideTimer);

    if (!video.paused && !video.ended) {
      hideTimer = setTimeout(() => {
        card.classList.remove("show-control");
      }, 1200);
    }
  }

  button.addEventListener("click", (e) => {
    e.stopPropagation();

    if (video.ended) {
      video.currentTime = 0;
      video.play();
      return;
    }

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", () => {
    button.textContent = "Ⅱ";
    card.classList.add("playing");

    setTimeout(() => {
      card.classList.remove("show-control");
    }, 500);
  });

  video.addEventListener("pause", () => {
    button.textContent = "▶";
    card.classList.remove("playing");
    card.classList.add("show-control");
  });

  video.addEventListener("ended", () => {
    button.textContent = "↻";
    card.classList.remove("playing");
    card.classList.add("show-control");
  });

  video.addEventListener("click", () => {
    if (!video.paused) {
      showButtonTemporarily();
    }
  });
});
