var imgHolder1 = document.getElementById("imgHolder1");
var imgHolder2 = document.getElementById("imgHolder2");
var imgHolder3 = document.getElementById("imgHolder3");
var allImages  = document.getElementsByClassName("allImages");
var buttons    = document.getElementsByName("buttons");
var listItems  = document.getElementById("listItems");

//***********Define Object Constructor and put all objects in array****************
imgObjectsArray = [];
imgFileArray=[];

function imgObjects (imgName, imgFile){
  this.imgName = imgName;
  this.imgFile = imgFile;
  this.clickCount = 0;
  this.showCount = 0;

  imgObjectsArray.push(this);
  imgFileArray.push(this.imgFile);
}

//*************image data ***********************************************************

var img1 = new imgObjects ("hotdog", "images/hotdog.jpg");
var img2 = new imgObjects ("donuts", "images/donuts.jpg");
var img3 = new imgObjects ("spaghetti", "images/spaghetti.jpg");
var img4 = new imgObjects ("burger", "images/burger.jpg");
var img5 = new imgObjects ("fruit", "images/fruit.jpg");
var img6 = new imgObjects ("iceCream", "images/iceCream.jpg");
var img7 = new imgObjects ("pancakes", "images/pancakes.jpeg");
var img8 = new imgObjects ("salad", "images/salad.jpg");
var img9 = new imgObjects ("tacos", "images/tacos.jpg");
var img10 = new imgObjects ("sushi", "images/sushi.jpg");


//********Min Max function for random image selection **********

function randomSelector () {
    return Math.floor(Math.random() * imgObjectsArray.length);
}

//***************************************************************

var imagesShown
var imagesClicked=[];

//function to generate images being seen (random) and counts # times shown.
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
    imgObjectsArray[randNum1].showCount += 1;
    imgObjectsArray[randNum2].showCount += 1;
    imgObjectsArray[randNum3].showCount += 1;
}

//On click (of image), run this function, but not more than 16 times.
var counter = 0;
function countClicks(){
  if(counter < 4){
      counter = counter + 1 ;
      console.log(counter);
    //  console.log(imgFileArray.indexOf(imgHolder1.getAttribute('src')));
    //  console.log(imgHolder1.getAttribute('src'));
      console.log(imgHolder1.)
      showImage()
    }else {
      buttons[0].style.display="block";
      buttons[1].style.display="block";
      imgHolder3.disabled=true;
    }
}

      console.log(imgObjectsArray.indexOf(imgHolder1.getAttribute('src')));
      console.log(imgHolder1.getAttribute('src'));


      // imgObjectsArray[randNum1].clickCount += 1;
      // imgObjectsArray[randNum2].clickCount += 1;
      // imgObjectsArray[randNum3].clickCount += 1;

  //  imgObjectsArray[].clickCount += 1;


showImage();


imgHolder1.addEventListener("click", countClicks, false);
imgHolder2.addEventListener("click", countClicks, false);
imgHolder3.addEventListener("click", countClicks, false);


//##################button to display results########################

function genResultsList (){
  for(ii=0; ii<imgObjectsArray.length; ii++){
    var imageResult = document.createElement("li");
    var imageResultText = document.createTextNode(imgObjectsArray[ii].imgName + " = " +imgObjectsArray[ii].clickCount);
    imageResult.appendChild(imageResultText);
    listItems.appendChild(imageResult);
  }
  buttons[0].style.display="none";
  buttons[2].style.display="block";
}

buttons[0].addEventListener("click", genResultsList, false);

//################## reset button#####################################

function reset(){
    listItems.parentNode.removeChild(listItems);
    buttons[0].style.display="block";
    buttons[2].style.display="none";
}


buttons[2].addEventListener("click", reset ,false);
