var imgHolder1 = document.getElementById("imgHolder1");
var imgHolder2 = document.getElementById("imgHolder2");
var imgHolder3 = document.getElementById("imgHolder3");
var allImages  = document.getElementsByClassName("allImages");
var buttons    = document.getElementsByName("buttons");


//***********Define Object Constructor and put all objects in array****************
imgObjectsArray = [];

function imgObjects (imgName, imgFile){
  this.imgName = imgName;
  this.imgFile = imgFile;
  this.clickCount = 0;
  this.showCount = 0;

  imgObjectsArray.push(this);
}

//*************image data ***********************************************************

var img1 = new imgObjects ("hotdog", "images/hotdog.jpg");
var img2 = new imgObjects ("donuts", "images/donuts.jpg");
var img3 = new imgObjects ("spaghetti", "images/spaghetti.jpg");

//********Min Max function for random image selection **********

function randomSelector () {
    return Math.floor(Math.random() * imgObjectsArray.length);
}

//***************************************************************

var imagesShown
var imagesClicked=[];


function showImage(){
    var randNum1 = randomSelector();
    var randNum2 = randomSelector();
    var randNum3 = randomSelector();
    var imageSelect1 = imgObjectsArray[randNum1].imgFile;
    var imageSelect2 = imgObjectsArray[randNum2].imgFile;
    var imageSelect3 = imgObjectsArray[randNum3].imgFile;
    imgHolder1.src = imageSelect1;
    imgHolder2.src = imageSelect2;
    imgHolder3.src = imageSelect3;
    imgObjectsArray[randNum1].clickCounter=+1
    imgObjectsArray[randNum2].clickCounter=+1
    imgObjectsArray[randNum3].clickCounter=+1
}

// function imagesShown(){
//   if()
//   imageShown = imgObjectArray[randNum1]++
//
// }


function countClicks(){
  for(i=0; i<16; i++){
    showImage();
  }
    buttons[0].style.display="block";   //show these after run 16 times.
  buttons[1].style.display="block";
}

showImage();
countClicks();




imgHolder1.addEventListener("click", countClicks, false);
imgHolder2.addEventListener("click", countClicks, false);
imgHolder3.addEventListener("click", countClicks, false);
