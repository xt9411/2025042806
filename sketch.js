let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO, (stream) => {
    console.log('攝影機已啟動');
  });
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 確保隱藏 DOM 元素

  // 初始化 graphics
  graphics = createGraphics(windowWidth, windowHeight);
  graphics.background(0); // 設定背景為黑色
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      graphics.fill(255); // 設定圓形顏色為白色
      graphics.noStroke();
      graphics.ellipse(x + 10, y + 10, 15); // 繪製直徑為15的圓
    }
  }
}

function draw() {
  background('#0077b6'); // 修改背景顏色

  // 繪製攝影機影像到主畫布
  push(); // 儲存當前畫布狀態
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);
  pop(); // 恢復畫布狀態

  // 更新 graphics 方框和圓的顏色
  graphics.background(0); // 設定背景為黑色
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      let captureX = floor((x / graphics.width) * capture.width);
      let captureY = floor((y / graphics.height) * capture.height);
      let col = capture.get(captureX, captureY); // 從攝影機影像取得顏色
      let green = col[1]; // 取得 G 值
      graphics.fill(0, green, 80); // 設定方框顏色 (R=0, G=green, B=80)
      graphics.noStroke();
      graphics.rect(x + 1, y + 1, 18, 18); // 繪製寬為18的方框

      graphics.fill(0); // 設定圓的顏色為黑色
      graphics.ellipse(x + 10, y + 10, 5); // 繪製直徑為5的圓
    }
  }

  // 確保 graphics 繪製在最上方
  image(graphics, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新調整 graphics 大小並繪製圖案
  graphics = createGraphics(windowWidth, windowHeight);
  graphics.background(0);
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      graphics.fill(255);
      graphics.noStroke();
      graphics.ellipse(x + 10, y + 10, 15);
    }
  }
}
