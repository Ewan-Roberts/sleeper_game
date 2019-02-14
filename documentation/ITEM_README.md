ITEM README

To be an item model you must have:

```
name:           'rusty_knife',// for searching
animation_name: 'knife',      // when a character switches it needs a general aniamtion state
id:             1001,
rank:           0,
cost:           50,
category:       'primary',    // for inventory management (you cant put a primary weapon in a head slot)
range:          20,
damage:         10,           // used for the damage engines
speed:          400,          // used for speed of actions
condition:      100,

visual_name: 'rusty knife',   // for rending in the DOM
description: 'The rusty knife someone sharpened on what looks like a rock',
image_name:  'rusty_knife',   // for pulling from the spritesheet
```
