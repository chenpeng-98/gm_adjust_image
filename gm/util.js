const gm = require('gm');

// get the size of an image
function getSize(imgPath) {
  return new Promise((resolve, reject) => {
    gm(imgPath)
    .size((err, size) => {
      if (!err) {
        resolve(size);
      }
      reject(null);
    });
  });
}

// output all available image properties
function getAllInfo(imgPath) {
  return new Promise((resolve, reject) => {
    gm(imgPath)
    .identify((err, data) => {
      if (!err) {
        resolve(data);
      }
      reject(null);
    });
  });
}

// resize image
function resizeImg(imgPath, width, height, forceChange, destination) {
  return new Promise((resolve, reject) => {
    gm(imgPath)
    .resize(width, height, forceChange)
    .write(destination, (err) => {
      if (err) {
        reject(null);
      } else {
        resolve(true);
      }
    })
  });
}


// pull out the first frame of an animated gif and save as png
function getFistFrame(imgPath, destination) {
  return new Promise((resolve, reject) => {
    gm(imgPath)
    .write(destination, function (err) {
      if (!err) {
        reject(null);
      }
      resolve(true);
    });
  });
}

// crazytown
// gm(imgPath)
// .flip()
// .magnify()
// .rotate('green', 45)
// .blur(7, 3)
// // .crop(150, 150, 300, 300)
// .edge(3)
// .write(path.resolve(__dirname, './assets/crazytown/', imgName), function (err) {
//   if (!err) {
//     console.log('crazytown success');
//   } else {
//     console.log('crazytown error::', err);
//   }
// })

// annotate an image
// gm(imgPath)
// .stroke("#ffffff")
// .drawLine(100, 100, 150, 150)
// .drawCircle(100, 100, 150, 150)
// .font('./Fonts/CabinSketch-Bold.ttf', 36)
// .drawText(600, 30, "I love gm!")
// .write("./drawing.png", function (err) {
//   if (!err) console.log('done');
//   else console.log(err)
// });

  // crop an image
  function crop(imgPath, width, height, x, y, destination) {
    return new Promise((resolve, reject) => {
      gm(imgPath)
      .crop(width, height, x, y)
      .write(destination, function (err) {
        if (!err) {
          resolve(true);
        }
        reject(null);
      });
    });
  }

  module.exports = {
    getSize,
    getAllInfo,
    resizeImg,
    getFistFrame,
    crop
  }