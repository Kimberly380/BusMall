var imgHolder1 = document.getElementById("imgHolder1");
var imgHolder2 = document.getElementById("imgHolder2");
var imgHolder3 = document.getElementById("imgHolder3");
var allImages  = document.getElementsByClassName("allImages");
var buttons    = document.getElementsByName("buttons");
var listItems  = document.getElementById("listItems");

//***********Define Object Constructor and put all objects in array with extra array for file names only****************
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

//++++++++++++++++++generate random image display+++++++++++++++++++++++++++++

var imagesShown
var imagesClicked=[];

//function to generate images being seen (random) and counts # times shown.
function showImage(){
    var randNum1 = randomSelector();
    var randNum2 = randomSelector();
    var randNum3 = randomSelector();
    imgHolder1.src = imgObjectsArray[randNum1].imgFile;
    imgHolder2.src = imgObjectsArray[randNum2].imgFile;
    imgHolder3.src = imgObjectsArray[randNum3].imgFile;
    imgObjectsArray[randNum1].showCount += 1;
    imgObjectsArray[randNum2].showCount += 1;
    imgObjectsArray[randNum3].showCount += 1;
}

/***************************************
  generate first set of images on load
****************************************/
showImage();

//**************************************

//On click (of image), run this function, but not more than 16 times.
var counter = 0;
function countClicks(){
  if(counter < 16){
      counter = counter + 1;

      var srcSelect = (this.src).split("/").pop();   //pull out file name from src path of clicked item
      var srcSelIndex = imgFileArray.indexOf("images/"+srcSelect);  //find file name selected in array of object file names
      imgObjectsArray[srcSelIndex].clickCount +=1;       //log click to object's counter

      showImage()
    }else {   //display buttons and disable clicking.
      buttons[0].style.display="inline";
      buttons[1].style.display="inline";
      imgHolder3.disabled=true;
    }
}

imgHolder1.addEventListener("click", countClicks, false);
imgHolder2.addEventListener("click", countClicks, false);
imgHolder3.addEventListener("click", countClicks, false);


//################## click on button shows results ######################################
var percentCalc //this is just a placeholder to avoid the divide by zero error...

function genResultsList (){
  for(ii=0; ii<imgObjectsArray.length; ii++){
    var imageResult = document.createElement("li");   //create list items

              if(imgObjectsArray[ii].showCount === 0){   //I know this looks messy, but it avoids the NaN of divide by zero. not sure how to format.
                percentCalc = 0;
              }else {percentCalc = imgObjectsArray[ii].clickCount/imgObjectsArray[ii].showCount}

    var imageResultText = document.createTextNode(imgObjectsArray[ii].imgName + " = " +imgObjectsArray[ii].showCount + " times shown and   "+imgObjectsArray[ii].clickCount + " times selected. That's " +Math.floor(percentCalc*100) +"%");  //create text for list items.
    imageResult.appendChild(imageResultText);  //append text to list item
    listItems.appendChild(imageResult);  //append list item to list
  }
  buttons[0].style.display="none";
  buttons[1].style.display="none"
  buttons[2].style.display="block";
}

buttons[0].addEventListener("click", genResultsList, false);


//################## reset button #########################################################################################
//NOTE: functionality here is still buggy.  To be fixed!

function reset(){
    listItems.parentNode.removeChild(listItems);
    imgHolder3.disabled=false;
    buttons[0].style.display="none";
    buttons[2].style.display="none";
    buttons[1].style.display="none"
}

buttons[2].addEventListener("click", reset ,false);
