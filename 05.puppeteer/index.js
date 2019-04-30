/*
  爬虫：
    1. 打开浏览器
    2. 新建一个标签页
    3. 输入一个网址
    4. 爬取网址中指定的数据，保存下来
    5. 关闭浏览器

  puppeteer: 无头浏览器  headless
    中文文档：https://zhaoqize.github.io/puppeteer-api-zh_CN/#/
 */

const puppeteer = require('puppeteer');

(async () => {
  // 1. 打开浏览器
  const browser = await puppeteer.launch({
    headless: false, // 是否是无头模式，是否显示浏览器界面
    defaultViewport: {
      width: 1300,
      height: 700
    }
  });
  // 2. 新建一个标签页
  const page = await browser.newPage();
  // 3. 输入一个网址
  await page.goto('https://movie.douban.com/cinema/nowplaying/shenzhen/', {
    waitUntil: 'load'  // 等页面的loaded事件触发了，才往下执行
  });
  // 4. 爬取网址中指定的数据，保存下来
  const result = await page.evaluate(() => {
    // 在里面执行的代码，执行完毕会自动销毁
    const result = [];
    // 真正爬取数据  会在当前打开页面中执行里面的代码
    const $imgs = $('#nowplaying .lists>li .poster img');
    // 遍历
    for (let i = 0; i < $imgs.length; i++) {
      // img是dom对象  $(img)是jquery对象
      const $img = $($imgs[i]);
      const src = $img.attr('src');
      result.push(src);
    }
    // 最后将保存的数据返回出去
    return result;
  });

  console.log(result);
  // 5. 关闭浏览器
  await browser.close();
})();