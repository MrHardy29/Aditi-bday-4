/* =========================================================
   PERSONAL SETTINGS
========================================================= */

/*
   CHANGE THESE
*/

const HER_NAME = "HER NAME";


/*
   Birthday:

   August 19, 2026 at midnight
   using the visitor's local timezone.
*/

const BIRTHDAY =
    new Date(
        "August 19, 2026 00:00:00"
    ).getTime();


/*
   Text shown when memories are clicked.
*/

const MEMORY_TEXTS = [
    "The random conversations that somehow lasted much longer than they were supposed to.",
    "The laughs that appeared at exactly the wrong moments.",
    "The little things you probably never realized I noticed.",
    "The version of us that existed in that particular chapter."
];


/* =========================================================
   DOM
========================================================= */

const preloader =
    document.getElementById("preloader");

const loadingText =
    document.getElementById("loadingText");

const experience =
    document.getElementById("experience");

const beginButton =
    document.getElementById("beginButton");

const nameReveal =
    document.getElementById("nameReveal");

const nameSub =
    document.getElementById("nameSub");

const music =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

const progressBar =
    document.getElementById("progressBar");


/* =========================================================
   PRELOADER
========================================================= */

const loadingMessages = [
    "collecting memories...",
    "arranging the stars...",
    "opening the archive...",
    "almost there..."
];


let loadingIndex = 0;


const loadingInterval =
    setInterval(() => {

        loadingText.textContent =
            loadingMessages[
                loadingIndex %
                loadingMessages.length
            ];

        loadingIndex++;

    }, 650);


window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            clearInterval(
                loadingInterval
            );

            loadingText.textContent =
                "ready.";

            setTimeout(() => {

                preloader.classList.add(
                    "loaded"
                );

            }, 700);

        }, 1500);

    }
);


/* =========================================================
   SPACE PARTICLES
========================================================= */

const spaceCanvas =
    document.getElementById(
        "spaceCanvas"
    );

const spaceCtx =
    spaceCanvas.getContext("2d");


let spaceParticles = [];


function resizeSpace() {

    spaceCanvas.width =
        window.innerWidth;

    spaceCanvas.height =
        window.innerHeight;

}


function createSpaceParticles() {

    spaceParticles = [];

    const amount =
        Math.min(
            250,
            Math.floor(
                window.innerWidth *
                window.innerHeight /
                4500
            )
        );


    for(
        let i = 0;
        i < amount;
        i++
    ) {

        spaceParticles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            radius:
                Math.random() *
                1.5,

            speed:
                Math.random() *
                .35 +
                .05,

            alpha:
                Math.random(),

            phase:
                Math.random() *
                Math.PI *
                2

        });

    }

}


function animateSpace() {

    spaceCtx.clearRect(
        0,
        0,
        spaceCanvas.width,
        spaceCanvas.height
    );


    const time =
        Date.now() / 1000;


    spaceParticles.forEach(
        p => {

            p.y -= p.speed;

            if(p.y < -5) {

                p.y =
                    spaceCanvas.height +
                    5;

            }


            const opacity =
                .25 +
                Math.sin(
                    time +
                    p.phase
                ) *
                .25;


            spaceCtx.beginPath();

            spaceCtx.arc(
                p.x,
                p.y,
                p.radius,
                0,
                Math.PI * 2
            );


            spaceCtx.fillStyle =
                `rgba(
                    255,
                    220,
                    235,
                    ${Math.max(
                        .05,
                        opacity
                    )}
                )`;


            spaceCtx.fill();

        }
    );


    requestAnimationFrame(
        animateSpace
    );

}


resizeSpace();

createSpaceParticles();

animateSpace();


/* =========================================================
   MAIN PARTICLE FIELD
========================================================= */

const particleCanvas =
    document.getElementById(
        "particleCanvas"
    );

const particleCtx =
    particleCanvas.getContext("2d");


let particles = [];

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};


function resizeParticles() {

    particleCanvas.width =
        window.innerWidth;

    particleCanvas.height =
        window.innerHeight;

}


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 700
            ? 70
            : 130;


    for(
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            vx:
                (Math.random() - .5)
                * .25,

            vy:
                (Math.random() - .5)
                * .25,

            size:
                Math.random() *
                1.8 +
                .2,

            alpha:
                Math.random() *
                .6 +
                .1

        });

    }

}


function animateParticles() {

    particleCtx.clearRect(
        0,
        0,
        particleCanvas.width,
        particleCanvas.height
    );


    particles.forEach(
        p => {

            p.x += p.vx;
            p.y += p.vy;


            if(
                p.x < 0 ||
                p.x > window.innerWidth
            ) {

                p.vx *= -1;

            }


            if(
                p.y < 0 ||
                p.y > window.innerHeight
            ) {

                p.vy *= -1;

            }


            const dx =
                mouse.x -
                p.x;


            const dy =
                mouse.y -
                p.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if(distance < 150) {

                p.x -=
                    dx *
                    .0008;

                p.y -=
                    dy *
                    .0008;

            }


            particleCtx.beginPath();

            particleCtx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            particleCtx.fillStyle =
                `rgba(
                    255,
                    120,
                    165,
                    ${p.alpha}
                )`;


            particleCtx.fill();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


resizeParticles();

createParticles();

animateParticles();


window.addEventListener(
    "resize",
    () => {

        resizeSpace();

        createSpaceParticles();

        resizeParticles();

        createParticles();

    }
);


/* =========================================================
   POINTER PARALLAX
========================================================= */

document.addEventListener(
    "pointermove",
    event => {

        mouse.x =
            event.clientX;

        mouse.y =
            event.clientY;


        const x =
            (
                event.clientX /
                window.innerWidth -
                .5
            );


        const y =
            (
                event.clientY /
                window.innerHeight -
                .5
            );


        document
            .querySelectorAll(
                "[data-depth]"
            )
            .forEach(
                element => {

                    const depth =
                        Number(
                            element.dataset.depth
                        );


                    element.style.transform =
                        `translate(
                            ${x * depth * 80}px,
                            ${y * depth * 80}px
                        )`;

                }
            );

    }
);


/* =========================================================
   BEGIN EXPERIENCE
========================================================= */

beginButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("intro")
            .scrollIntoView({
                behavior: "smooth"
            });


        setTimeout(
            startNameReveal,
            600
        );


        startMusic();

    }
);


/* =========================================================
   NAME REVEAL
========================================================= */

function startNameReveal() {

    if(
        nameReveal.dataset.started
    ) return;


    nameReveal.dataset.started =
        "true";


    nameReveal.textContent =
        "";


    let index = 0;


    const interval =
        setInterval(() => {

            nameReveal.textContent +=
                HER_NAME[index];

            index++;


            if(
                index >=
                HER_NAME.length
            ) {

                clearInterval(
                    interval
                );


                setTimeout(
                    () => {

                        nameSub.classList.add(
                            "show"
                        );

                    },
                    500
                );

            }

        }, 150);

}


/* =========================================================
   COUNTDOWN
========================================================= */

const countdownElement =
    document.getElementById(
        "countdown"
    );

const birthdayLive =
    document.getElementById(
        "birthdayLive"
    );


function pad(number) {

    return String(number)
        .padStart(2, "0");

}


let midnightAlreadyShown =
    false;


function updateCountdown() {

    const now =
        Date.now();


    const difference =
        BIRTHDAY -
        now;


    if(
        difference <= 0
    ) {

        countdownElement.style.display =
            "none";

        birthdayLive.style.display =
            "flex";


        if(
            !midnightAlreadyShown
        ) {

            midnightAlreadyShown =
                true;

            triggerMidnight();

        }

        return;

    }


    const days =
        Math.floor(
            difference /
            86400000
        );


    const hours =
        Math.floor(
            difference %
            86400000 /
            3600000
        );


    const minutes =
        Math.floor(
            difference %
            3600000 /
            60000
        );


    const seconds =
        Math.floor(
            difference %
            60000 /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        pad(days);


    document.getElementById(
        "hours"
    ).textContent =
        pad(hours);


    document.getElementById(
        "minutes"
    ).textContent =
        pad(minutes);


    document.getElementById(
        "seconds"
    ).textContent =
        pad(seconds);

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   MEMORY UNIVERSE DRAG
========================================================= */

const universe =
    document.getElementById(
        "memoryUniverse"
    );


let universeX = 0;
let universeY = 0;

let startX = 0;
let startY = 0;

let dragging = false;


universe.addEventListener(
    "pointerdown",
    event => {

        dragging = true;

        startX =
            event.clientX;

        startY =
            event.clientY;

        universe.setPointerCapture(
            event.pointerId
        );

    }
);


universe.addEventListener(
    "pointermove",
    event => {

        if(!dragging)
            return;


        const dx =
            event.clientX -
            startX;


        const dy =
            event.clientY -
            startY;


        universeX +=
            dx *
            .25;


        universeY +=
            dy *
            .25;


        startX =
            event.clientX;

        startY =
            event.clientY;


        document
            .querySelectorAll(
                ".memory-card"
            )
            .forEach(
                (card, index) => {

                    const multiplier =
                        index % 2 === 0
                            ? 1
                            : -.7;


                    card.style.marginLeft =
                        `${universeX *
                        multiplier}px`;

                    card.style.marginTop =
                        `${universeY *
                        multiplier}px`;

                }
            );

    }
);


universe.addEventListener(
    "pointerup",
    () => {

        dragging = false;

    }
);


universe.addEventListener(
    "pointercancel",
    () => {

        dragging = false;

    }
);


/* =========================================================
   MEMORY CARD CLICK
========================================================= */

document
    .querySelectorAll(
        ".memory-card"
    )
    .forEach(
        card => {

            card.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    document
                        .querySelectorAll(
                            ".memory-card"
                        )
                        .forEach(
                            c => {

                                c.style.zIndex =
                                    "1";

                            }
                        );


                    card.style.zIndex =
                        "50";


                    card.animate(
                        [
                            {
                                transform:
                                    "scale(1)"
                            },

                            {
                                transform:
                                    "scale(1.12)"
                            },

                            {
                                transform:
                                    "scale(1.05)"
                            }

                        ],
                        {
                            duration: 700,
                            easing:
                                "cubic-bezier(.16,1,.3,1)"
                        }
                    );

                }
            );

        }
    );


/* =========================================================
   STORY CHAPTERS
========================================================= */

const chapters =
    document.querySelectorAll(
        ".chapter"
    );


const chapterCurrent =
    document.getElementById(
        "chapterCurrent"
    );


let currentChapter = 0;


function showChapter(index) {

    if(
        index < 0
    ) {

        index =
            chapters.length - 1;

    }


    if(
        index >= chapters.length
    ) {

        index = 0;

    }


    chapters.forEach(
        (chapter, i) => {

            chapter.classList.toggle(
                "chapter-active",
                i === index
            );

        }
    );


    currentChapter.textContent =
        String(index + 1)
            .padStart(2, "0");


    currentChapter =
        index;

}


document
    .getElementById(
        "nextChapter"
    )
    .addEventListener(
        "click",
        () => {

            showChapter(
                currentChapter + 1
            );

        }
    );


document
    .getElementById(
        "previousChapter"
    )
    .addEventListener(
        "click",
        () => {

            showChapter(
                currentChapter - 1
            );

        }
    );


/* =========================================================
   LETTER
========================================================= */

const envelope =
    document.getElementById(
        "envelope"
    );


const openEnvelope =
    document.getElementById(
        "openEnvelope"
    );


function toggleEnvelope() {

    const isOpen =
        envelope.classList.toggle(
            "open"
        );


    openEnvelope.textContent =
        isOpen
            ? "CLOSE LETTER"
            : "OPEN LETTER";


    if(isOpen) {

        createSparkBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            50
        );

    }

}


openEnvelope.addEventListener(
    "click",
    toggleEnvelope
);


envelope.addEventListener(
    "click",
    toggleEnvelope
);


/* =========================================================
   MEMORY WORDS
========================================================= */

const memoryMessage =
    document.getElementById(
        "memoryMessage"
    );


const memoryMessageText =
    memoryMessage.querySelector("p");


document
    .querySelectorAll(
        ".memory-words button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".memory-words button"
                        )
                        .forEach(
                            b =>
                                b.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    memoryMessage.classList.remove(
                        "revealed"
                    );


                    void memoryMessage.offsetWidth;


                    memoryMessageText.textContent =
                        button.dataset.message;


                    memoryMessage.classList.add(
                        "revealed"
                    );

                }
            );

        }
    );


/* =========================================================
   GIFT
========================================================= */

const giftBox =
    document.getElementById(
        "giftBox"
    );


const giftHint =
    document.getElementById(
        "giftHint"
    );


const giftReveal =
    document.getElementById(
        "giftReveal"
    );


let giftOpened = false;


giftBox.addEventListener(
    "click",
    () => {

        if(giftOpened)
            return;


        giftOpened = true;


        giftBox.classList.add(
            "open"
        );


        giftHint.textContent =
            "✦";


        setTimeout(
            () => {

                giftReveal.classList.add(
                    "show"
                );

            },
            650
        );


        setTimeout(
            () => {

                createSparkBurst(
                    window.innerWidth / 2,
                    window
