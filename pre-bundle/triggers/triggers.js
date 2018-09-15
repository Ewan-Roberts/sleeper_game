const PIXI = require("pixi.js");

module.exports.createTriggerPad = (x, y, width, height) =>{

    return new Promise((resolve,reject) => {

        const pad = new PIXI.Graphics()
        .beginFill(0xFF3300)
        .lineStyle(2, 0xffd900, 1)
        .moveTo(0,0)
        .lineTo(width, 0)
        .lineTo(width, height)
        .lineTo(0, height)
        .lineTo(0, 0)
        .endFill()
        pad.position.set(x,y)
        pad.interactive = true
        pad.buttonMode = true;
    
        resolve(pad)
    

    })

}

