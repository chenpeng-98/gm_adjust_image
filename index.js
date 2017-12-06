const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const gmUtil = require('./gm/util.js');

const app = new Koa();
const router = new Router();

router.get('/assets/:img', async (ctx, next) => {
  ctx.type = 'text/plain; chart-utf-8';
  const urlImg = ctx.params.img;
  const imgInfo = urlImg.match(/([^\.]+\.[^x]+)x(\d+)x(\d+)x(\d+)x(\d+)/);
  const imgName = (imgInfo && imgInfo[1]) || urlImg;
  const imgPath = path.resolve(__dirname, './assets/', imgName);
  const resizePath = path.resolve(__dirname, './assets/resize/', imgName);
  // 获取图片大小：
  const imgSize = await gmUtil.getSize(imgPath);
  console.log('imgSize: ', imgSize.width, imgSize.height);
  // 改变图片大小
  const isResizeSuccess = await gmUtil.resizeImg(imgPath, 500, 60, '!', resizePath);
  if (isResizeSuccess) {
    console.log('resize success');
  } else {
    console.log('resize fail');
  }
  // 截取图片
  if (imgInfo) {
    const cutPath = path.resolve(__dirname, './assets/cuts/', imgName);
    const isCutSuccess = await gmUtil.crop(imgPath, imgInfo[2], imgInfo[3], imgInfo[4], imgInfo[5], cutPath);
    isCutSuccess ? console.log('cut success') : console.log('cut error');
  }

  await (ctx.body = '截取图片中。。');
})


app.use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);