"use strict";
let images = [];
let path = "images/tokisaki_kurumi_";
let files = [];

for (let i = 1; i < 9; i++) {
  files.push(i + '.jpg');
}

function applyImages() {
  let tmp = document.getElementsByTagName('img');

  for (let img of tmp) {
    if (!imagePresent(img)) {
      let oPath = img.src;
      images.push([img, oPath]);
      let index = Math.floor(Math.random() * files.length);
      img.src = browser.extension.getURL(path + files[index]);
    }
  }
};

applyImages();

let intRef = window.setInterval(myCallback, 1000);

function resetImages() {
  for (let image of images) image[0].src = image[1];
  images = [];
};

function myCallback() {
  applyImages();
};

browser.runtime.onMessage.addListener(request => {
  if (request.message === "Show Kurumi") {
    intRef = window.setInterval(myCallback, 1000);
    applyImages();
  } else {
    clearInterval(intRef);
    resetImages();
  }
});

function imagePresent(img) {
  for (let image of images) {
    if (image[0] == img) {
      return true;
    }
  }
  return false;
};