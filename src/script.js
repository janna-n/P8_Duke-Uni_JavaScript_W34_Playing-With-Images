/* Photo Filters */

var image = null;
var fileinput=document.getElementById("finput");

function upload() { 
    var orgcan = document.getElementById("orgimg");
    var fileinput = document.getElementById("finput");
    image = new SimpleImage(fileinput);
  
    image.drawTo(orgcan); 
}

function makeGrey() {
  if (image == null || !image.complete()){
      alert("Upload an image first, silly.");
      return;
  }
  else {
    for (var pixel of image.values()) {
      var red = pixel.getRed();
      var green = pixel.getGreen();
      var blue = pixel.getBlue();
      var avg = (red + green + blue)/3;
      
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  
  var greycan = document.getElementById("orgimg");
  image.drawTo(greycan);
}
}

function makeSepia() {
    if (image == null || !image.complete()){
      alert("Upload an image first, silly.");
      return;
  }
  else {
      for (var pixel of image.values()) {
      var red = pixel.getRed();
      var green = pixel.getGreen();
      var blue = pixel.getBlue();
      var newR = (30 * red / 100) + red;
      var newG = green - (20 * green /100);
      var newB = blue - (20 * blue /100);
      
    pixel.setRed(newR);
    pixel.setGreen(newG);
    pixel.setBlue(newB);
  }
  
  var sepcan = document.getElementById("orgimg");
  image.drawTo(sepcan); 
  }
}

function makeRain() {
    if (image == null || !image.complete()){
      alert("Upload an image first, silly.");
      return;
  }
  else {
    for ( var pixel of image.values()) {
        avgColor = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        image.getWidth();
      
        if (pixel.getX() < image.getWidth()/7) {
            pixel.setRed(255);
        }
        if (pixel.getX() > image.getWidth()/7 && pixel.getX() < (image.getWidth()/7)*2) {
            if (avgColor < 128) {
                red = Math.round(2 * avgColor);
                green = Math.round(.8 * avgColor);
                blue = 0;
            }
            else {
                red = 255;
                green = Math.round(1.2 * avgColor - 51);
                blue =  Math.round(2 * avgColor - 255);
            }

       pixel.setRed(red);
       pixel.setGreen(green);
       pixel.setBlue(blue);
}
      
    if (pixel.getX() > (image.getWidth()/7)*2 && pixel.getX() < (image.getWidth()/7)*3) {
        pixel.setRed(255); pixel.setGreen(255);
    }
    if (pixel.getX() > (image.getWidth()/7)*3 && pixel.getX() < (image.getWidth()/7)*4) {
        pixel.setGreen(255);
    }
    if (pixel.getX() > (image.getWidth()/7)*4 && pixel.getX() < (image.getWidth()/7)*5) {
        pixel.setBlue(255);
    }
    if (pixel.getX() > (image.getWidth()/7)*5 && pixel.getX() < (image.getWidth()/7)*6) {
        if (avgColor < 128) {
            red = Math.round(.8 * avgColor);
            green = 0;
            blue = Math.round(2 * avgColor);
    }
    else {
          red = Math.round(1.2 * avgColor - 51);
          green = Math.round(2*avgColor - 255);
          blue = 255;
  }
      
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}
      
    if (pixel.getX() > (image.getWidth()/7)*6) {
        if (avgColor < 128) {
            red = Math.round(1.6 * avgColor);
            green = 0;
            blue = Math.round(1.6 * avgColor);
        }
        else {
              red = Math.round(0.4 * avgColor + 153 );
              green = Math.round(2 * avgColor - 255);
              blue = Math.round(0.4 * avgColor + 153 );
  }
      
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}
      
    else {}
    }
  
    var raincan = document.getElementById("orgimg");
    image.drawTo(raincan);
    image=new SimpleImage(fileinput);
  }
}

function makeBlur() {
    if (image == null || !image.complete()){
      alert("Upload an image first, silly.");
      return;
  }
  else {
    var blurredImage = new SimpleImage(image.getWidth(), image.getHeight());

    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var redSum = 0;
        var greenSum = 0;
        var blueSum = 0;
        var count = 0;

        // Iterate over a 3x3 neighborhood around the current pixel
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var newX = x + i;
                var newY = y + j;

                // Check if the new coordinates are within the image boundaries
                if (newX >= 0 && newX < image.getWidth() && newY >= 0 && newY < image.getHeight()) {
                    var neighborPixel = image.getPixel(newX, newY);
                    redSum += neighborPixel.getRed();
                    greenSum += neighborPixel.getGreen();
                    blueSum += neighborPixel.getBlue();
                    count++;
                }
            }
        }

        var avgRed = Math.round(redSum / count);
        var avgGreen = Math.round(greenSum / count);
        var avgBlue = Math.round(blueSum / count);

        var blurredPixel = blurredImage.getPixel(x, y);
        blurredPixel.setRed(avgRed);
        blurredPixel.setGreen(avgGreen);
        blurredPixel.setBlue(avgBlue);
    }

    var orgcan = document.getElementById("orgimg");
    blurredImage.drawTo(orgcan);
  }
}

function makeWindow() {
  
  if (image == null || !image.complete()){
      alert("Upload an image first, silly.");
      return;
  }
  else {
        for (var pixel of image.values()) {
             var x = pixel.getX();
             var y = pixel.getY();
             var newW = image.getWidth() - 10;
             var newH = image.getHeight() - 10;
          
           if ( x <= 10 || x >= newW || y <= 10 || y >= newW || x >= (image.getWidth() / 3) - 5 && x <= (image.getWidth() / 3) + 5 || x >= ((image.getWidth() / 3)*2) - 5 && x <= ((image.getWidth() / 3)*2) + 5 || y >= (image.getHeight() / 3) - 5 && y <= (image.getHeight() / 3) + 5 || y >= ((image.getHeight() / 3)*2) - 5 && y <= ((image.getHeight() / 3)*2) + 5 ){
                pixel.setRed(255);
                pixel.setBlue(255);
                pixel.setGreen(255);
           }
        }
    var orgcan = document.getElementById("orgimg");
    image.drawTo(orgcan);
  }
}

function resetFilters() {
  if (image == null) {
    alert("Upload an image first, silly."); // Alert if no image is uploaded
    return;
  }
  else {
  upload();
  }
}

function clr() {
  var orgCanvas = document.getElementById("orgimg");
  var orgContext = orgCanvas.getContext("2d");
  orgContext.clearRect(0, 0, orgCanvas.width, orgCanvas.height);
  
  var fileInput = document.getElementById("finput");
  fileInput.value = "";
}

/* Green Screen Generator */

var fgImage = null;
var bgImage = null;
var fgfileinput = null;
var bgfileinput = null;

function showMessage(message) {
  var messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
}

function loadFgImage() { 
  var fgcanvas = document.getElementById("fgcan");
  var fgfileinput = document.getElementById("fgfile");
  fgImage = new SimpleImage(fgfileinput);
  
  fgImage.drawTo(fgcanvas); 
  document.getElementById("message").textContent = "";
  showMessage("Foreground image loaded");
}

function loadBgImage() { 
  var bgcanvas = document.getElementById("bgcan");
  var bgfileinput = document.getElementById("bgfile");
  bgImage = new SimpleImage(bgfileinput);
  
  bgImage.drawTo(bgcanvas); 
  document.getElementById("message").textContent = "";
  showMessage("Background image loaded");
}

function createcomp() {
  if (fgImage == null || !fgImage.complete()) {
    alert("Foreground image not loaded.");
    return;
  }
  if (bgImage == null || !bgImage.complete()) {
    alert("Background image not loaded.");
    return;
  }
  else {
  clrcomp();
    
  var fgIm = new SimpleImage(fgImage);
  var bgIm = new SimpleImage(bgImage);
  var opImage = new SimpleImage(fgIm.getWidth(), fgIm.getHeight());
  
  for (var pixel of fgIm.values()) {
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
      var x = pixel.getX();
      var y = pixel.getY();
      var bgPixel = bgIm.getPixel(x, y);
      
      opImage.setPixel(x, y, bgPixel);
    } else {
      opImage.setPixel(pixel.getX(), pixel.getY(), pixel);
    }
  }
  
    document.getElementById("message").textContent = "";
  showMessage("Mushed together!");
  var fgcanvas = document.getElementById("fgcan");
  opImage.drawTo(fgcanvas); 
  }
}

function clrcomp() {
  var canvas1 = document.getElementById("fgcan");
  var Context1 = canvas1.getContext("2d");
  Context1.clearRect(0, 0, canvas1.width, canvas1.height);

  var canvas2 = document.getElementById("bgcan");
  var Context2 = canvas2.getContext("2d");
  Context2.clearRect(0, 0, canvas2.width, canvas2.height);
  
  var fgfileinput = document.getElementById("fgfile");
  var bgfileinput = document.getElementById("bgfile");
  
  
  /* Clear the values of the file inputs */
  fgfileinput.value = "";
  bgfileinput.value = "";
  
  showMessage("Upload your images below");
}