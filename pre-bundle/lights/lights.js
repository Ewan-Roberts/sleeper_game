
PIXI.lights = require('pixi-lights')



module.exports.add_lights = viewport =>{


    const light           = new PIXI.lights.DirectionalLight(0xffffff,20,viewport),
    personal_light  = new PIXI.lights.PointLight(0xffffff, 6),
    lamp_shade      = new PIXI.lights.PointLight(0xffffff, 20);


    return new Promise((resolve,reject)=>{

        // personal_light.position.set(100,1200);
        // personal_light.lightHeight = 0.5
        // lamp_shade.position.set(1100,1400);
        // lamp_shade.lightHeight = 1
        // light.lightHeight = 0.1
        // stage.addChild(new PIXI.lights.AmbientLight(0xFFFF0B, 0.2));

        // viewport.addChild(
        //     light,
        //     personal_light,
        //     lamp_shade
        // )
        // console.log('poo3')
        // resolve()
    })

}