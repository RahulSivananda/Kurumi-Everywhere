(function() {
  "use strict";

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  window.images = [];
  let path = "images/tokisaki_kurumi_";
  let files = [];

  for (let i = 1; i < 8; i++) {
    files.push(i + '.jpg');
  }

  let intRef = window.setInterval(myCallback, 1000);

  function myCallback() {
    kawaiify();
  }

  //Recieve toggle request from popup
  browser.runtime.onMessage.addListener(request => {
    //this is because I am lazy, feel free to change
    let imgSrc = window.images.length > 0 ? window.images[0][0].src : "";
    //if kurumi chan is not present in the images show the world how cute kurumi chan is
    if (imgSrc.indexOf("tokisaki_kurumi_") == -1) {
      if (intRef) clearInterval(intRef);
      intRef = window.setInterval(myCallback, 1000);
      kawaiify();
    } else {
      clearInterval(intRef);
      resetImages();
    }
  });


  function kawaiify() {
    let tmp = document.getElementsByTagName('img');

    for (let img of tmp) {
      if (!imagePresent(img)) {
        let oPath = img.src;
        if(oPath.toLowerCase().indexOf("kurumi") > -1 || oPath.toLowerCase().indexOf("tokisaki") > -1) continue;
        window.images.push([img, oPath]);
        let index = Math.floor(Math.random() * files.length);
        img.src = browser.extension.getURL(path + files[index]);
      }
    }
  }

  function resetImages() {
    for (let image of window.images) image[0].src = image[1];
    window.images = [];
  };

  //looking up value in 2d array
  function imagePresent(img) {
    for (let image of window.images) {
      if (image[0] === img) {
        return true;
      }
    }
    return false;
  }

  //on startup
  kawaiify();

})();
x
