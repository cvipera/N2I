import {Application, Assets, BitmapText, Sprite} from "pixi.js";

import anchovy from "./assets/Fish/Anchovy.png"
import glass_bottle from "./assets/Trash/GlassBottle.png"
import truc from "./captcharedirection.html"
import {FALSE} from "sass";

class Thingy {
    constructor(sprite, type) {
        this.sprite = sprite;
        this.dx = 0;
        this.dy = 0;
        this.type= type;
    }
}function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
 function displayCalculation(score) {
    document.querySelector('.js-calculation')
        .innerHTML = 'ton score est de '+score +' points';
}
function test_bot(score) {
    document.querySelector('.test_bot')
        .innerHTML = 'ton scorebot est de '+score +' points';
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function air(ax,bx,cx,ay,by,cy){
    return(((bx-ax)*(cy-ay)+(by-ay)*(cx-ax))/2)
}
(async () =>
{
// Create a new application
    const app = new Application();
    // Initialize the application
    let score=0;
    let scorebot=0;
    let botx=[];
    let boty=[];
    let indicetab=0;
    let prevscore=0;
    const nbelt=30;
    document.addEventListener('mousemove', (e) => {
        const cursor = document.getElementsByClassName('cursor')[0];
        if(indicetab>=nbelt*2 && calculateDistance(botx[indicetab%nbelt],e.x,boty[indicetab%nbelt],e.y)**2*0.001>air(botx[indicetab%nbelt],botx[indicetab%nbelt+nbelt],e.x,boty[indicetab%nbelt],boty[indicetab%nbelt+nbelt],e.y)){
            scorebot++;
        }
        botx[indicetab%(nbelt*2)]=e.x;
        boty[indicetab%(nbelt*2)]=e.y;
        indicetab++;
        if(indicetab===(nbelt*10)){
            indicetab=(nbelt*2);
        }
        test_bot(scorebot);

    });
displayCalculation(score);
    await app.init({backgroundAlpha: 0, resizeTo: document.body.querySelector("#captcha") });
    // Append the application canvas to the document body

    document.body.querySelector("#captcha").appendChild(app.canvas);

    const BOTTLE_COUNT = 5;
    let bottlesClicked = 0;
    let gameWon = false;

    const testList = [];
    for (let i = 0; i < BOTTLE_COUNT * 2;  i++) {
        let texture;
        let type;
        if (i % 2 === 0) {
            texture = await Assets.load(glass_bottle);
            type = "bottle";
        } else {
            texture = await Assets.load(anchovy);
            type = "fish";

        }
        const bottle = new Sprite(texture);
        bottle.anchor.set(0.5);
        bottle.setSize(60);
        bottle.x = app.screen.width *Math.random();
        bottle.y = app.screen.height *Math.random();
        bottle.eventMode = "static";
        bottle.rotation = Math.random() * Math.PI * 2;
        app.stage.addChild(bottle);
        bottle.on("pointerdown", () => {
            removeItemOnce(testList, thingy);
            if (thingy.type === "bottle") {
                score+=3;
                displayCalculation(score);
                bottlesClicked++;
                if (bottlesClicked === BOTTLE_COUNT) {
                    gameWon = true;
                }
            } else if (thingy.type === "fish") {
                score-=1;
                displayCalculation(score);
            }
            app.stage.removeChild(bottle);
            bottle.destroy();

        });

        const thingy = new Thingy(bottle, type);
        testList.push(thingy);
        thingy.dx = clamp((Math.random()-0.5) * 10,-3,3) ;
        thingy.dy = clamp((Math.random()-0.5) * 10,-3,3) ;
    }  // Create a bottle Sprite

    const text = new BitmapText();
     text.text = "Hello World";
     text.x = 0;
     text.y = 0;
     app.stage.addChild(text);
     let t = 0;

    // Listen for animate update
    app.ticker.add((time) =>
    {
        if (gameWon){
            gameWon=false;
            console.log(t);
            //window.location.href = truc;
            window.location.href = "/TrashCleaner.html";
        }
        // Just for fun, let's rotate mr rabbit a little.
        // * Delta is 1 if running at 100% performance *
        // * Creates frame-independent transformation *
        let rand=1;
        t+=time.deltaMS / 1000;
        text.text = Math.round(t * 100) / 100;
        for (let i = 0; i < testList.length; i++) {
            let bottle = testList[i];
            bottle.sprite.rotation += 0.1 * time.deltaTime;
            bottle.sprite.x += bottle.dx * time.deltaTime;
            bottle.sprite.y += bottle.dy * time.deltaTime;
            bottle.dy += 0.05*rand * time.deltaTime;

            if (bottle.sprite.y > app.screen.height) {
                bottle.dy = -bottle.dy;
                bottle.dx = clamp(bottle.dx*(Math.random()-0.5) * 5,-2,2);
                //rand = (Math.random() / 2 + 0.2);
                bottle.sprite.y=app.screen.height-1;

            }
            if (bottle.sprite.y < 0) {
                bottle.dy = -bottle.dy;
                bottle.sprite.y=1;
                bottle.dx = clamp(bottle.dx*(Math.random()-0.5) * 5,-2,2);



            }
            if (bottle.sprite.x > app.screen.width) {
                bottle.dx = -bottle.dx-1;
                bottle.sprite.x=app.screen.width-1;
                bottle.dy = clamp(bottle.dy*(Math.random()-0.5) * 5,-3,3);
            }
            if (bottle.sprite.x < 0) {
                bottle.dx = -bottle.dx+1;
                bottle.sprite.x=1;
                bottle.dy = clamp(bottle.dy*(Math.random()-0.5) * 5,-3,3);
            }
        }
    });
})();