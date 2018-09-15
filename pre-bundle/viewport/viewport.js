console.log("viewport loaded")

const app = new PIXI.Application({ 
    width: 3000,         // default: 800
    height: 1500,        // default: 600
    antialias: false,    // default: false
});

const viewport = new PIXI.extras.Viewport().drag().decelerate();
const stage = app.stage = new PIXI.display.Stage()

const load_viewport = () => {

	return new Promise((resolve,reject)=>{

		//width , height
		// var defaultIcon = "url('images/bunny.png'),auto";
		// app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
		app.renderer.autoResize = true;
		// app.renderer.backgroundColor = 0x061639;
		document.body.appendChild(app.view);

		// const   stage           = app.stage = viewport,
		

		stage.addChild(viewport)
		stage.addChild(new PIXI.display.Layer(PIXI.lights.diffuseGroup));
		stage.addChild(new PIXI.display.Layer(PIXI.lights.normalGroup));
		stage.addChild(new PIXI.display.Layer(PIXI.lights.lightGroup));

		resolve()
	})
}

load_viewport()
.then(() => add_floor())
.then(() => add_player())
.then(() => add_items())
.then(() => add_lights())
.then(() => add_Core())
.then(() => add_Test())

