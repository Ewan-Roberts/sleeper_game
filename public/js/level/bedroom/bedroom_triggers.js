

const PIXI = require("pixi.js"),
    rat = require("../../animals/rat.js"),
    level_utls = require("../level_utils.js"),
    debug_layout = require("../debug/debug_layout.js")



module.exports.createTriggerPad = (obj) =>{

    const pad = new PIXI.Graphics()
    .beginFill(0xFF3300)
    .lineStyle(2, 0xffd900, 1)
    .moveTo(0,0)
    .lineTo(250, 0)
    .lineTo(250, 250)
    .lineTo(0, 250)
    .lineTo(0, 0)
    .endFill()
    pad.position.set(500,1200)
    pad.interactive = true
    pad.buttonMode = true;
    pad.on('pointerdown', ()=> {
        
        console.log('rat click')
        rat.mouseMove({x:700,y:910},{x:90,y:920})

    }); 

    global.viewport.addChild(pad)


}

module.exports.createDebugTrigger = (obj) =>{

    const pad = new PIXI.Graphics()
    .beginFill(0xFF3300)
    .lineStyle(2, 0xffd900, 1)
    .moveTo(0,0)
    .lineTo(250, 0)
    .lineTo(250, 250)
    .lineTo(0, 250)
    .lineTo(0, 0)
    .endFill()
    pad.position.set(1000,1500)
    pad.interactive = true
    pad.buttonMode = true;
    pad.on('pointerdown', ()=> {
        
        level_utls.clearViewport()
        level_utls.clearCollision()
        debug_layout.add_floor()

    }); 

    global.viewport.addChild(pad)


}

