// 'use strict';

// class Tiled_Data {
//   constructor(level_data) {
//     level_data.layers.forEach(layer => {
//       layer.objects.forEach(object => {
//         const image_name = level_data.tilesets.find(tile => tile.firstgid === object.gid);

//         if(object.properties && object.properties.image_name) {
//           Object.assign(object, object.properties);
//         }
//         if(image_name) {
//           object.image_name = image_name.name;
//         }
//       });
//       this[layer.name] = layer.objects;
//     });
//   }
// }

// module.exports = {
//   Tiled_Data,
// };
