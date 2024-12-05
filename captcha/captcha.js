import { Application, Assets, Sprite } from "pixi.js";

(async () =>
{
    // Create a new application
    const app = new Application({
        width: 800,
        height: 600,
    });

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    // Append the application canvas to the document body
    document.body.querySelector("#captcha").appendChild(app.canvas);

    // Load the bunny texture
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    // Create a bunny Sprite
    const bunny = new Sprite(texture);
//bite
    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;


    app.stage.addChild(bunny);

    let dy = 1;
    let dx = 1;
    let rand=1;
    // Listen for animate update
    app.ticker.add((time) =>
    {
        // Just for fun, let's rotate mr rabbit a little.
        // * Delta is 1 if running at 100% performance *
        // * Creates frame-independent transformation *

        bunny.rotation += 0.1 * time.deltaTime;
        bunny.x += dx * time.deltaTime;
        bunny.y += dy * time.deltaTime;
        dy += 0.1*rand * time.deltaTime;

        if (bunny.y > app.screen.height)
        {
            dy = -dy;
            dx=-dx;
            rand=(Math.random()/2+0.3);

        }
        if (bunny.y < 0)
        {
            dy = -dy;


        }
        if(bunny.x >app.screen.height){
            dx=-dx;
        }
        if(bunny.x <0){
            dx=-dx;
        }
    });
})();