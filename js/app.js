var posterFrame1 = document.getElementById("posterFrame1");
var posterFrame2 = document.getElementById("posterFrame2");
var posterFrame3 = document.getElementById("posterFrame3");
var imgHolder1 = document.getElementById("imgHolder1");
var imgHolder2 = document.getElementById("imgHolder2");
var imgHolder3 = document.getElementById("imgHolder3");
var buttons    = document.getElementsByName("buttons");
var listItems  = document.getElementById("listItems");
var tempIndex1;  //to set indexes of each image placeholder for eventListners to return
var tempIndex2;
var tempIndex3;

var ctx = document.getElementById("resultsChart").getContext("2d"); //var for chart.js

//***********Define Object Constructor and put all objects in array with extra array for file names only****************
var imgObjectsArray = [];
var imgFileArray=[];  //for index location of clicked images
var imgNameArray=[];  //for graph labels

function imgObjects (imgName, imgFile){
  this.imgName = imgName;
  this.imgFile = imgFile;
  this.clickCount = 0;
  this.showCount = 0;

  imgObjectsArray.push(this);
  imgFileArray.push(this.imgFile);
  imgNameArray.push(this.imgName);
}

//*************image data ***********************************************************
function makeImages () {
var img1 = new imgObjects ("Avatar", "images/avatar.jpg");
var img2 = new imgObjects ("Barak Swan", "images/barackSwan.jpg");
var img3 = new imgObjects ("City of God", "images/cityOfGod.jpg");
var img4 = new imgObjects ("Groundhog Day", "images/groundhogDay.jpg");
var img5 = new imgObjects ("Jaws", "images/jaws.jpg");
var img6 = new imgObjects ("Matrx", "images/matrix.jpg");
var img7 = new imgObjects ("Pulp Fiction", "images/pulpFiction.jpg");
var img8 = new imgObjects ("The Shining", "images/shining.jpg");
var img9 = new imgObjects ("Shrek", "images/shrek.jpg");
var img10 = new imgObjects ("The Princess Bride", "images/princessbride.jpg");

}

//functions for data storage and retrieval//
function storeData(key, thingToStore){
  var tempStorage = JSON.stringify(thingToStore);
  localStorage[key] = tempStorage;
}

function getData(key){
  var tempStorage = localStorage[key];
  return JSON.parse(tempStorage);
}


//Has user been here before??  If so, grab stored data.  If not, push initial data through constructor.
if(localStorage['storedObjects'] !== undefined){
    imgObjectsArray = getData('storedObjects');
}else {
  makeImages();
}

//notes for me to remember how to call these functions:
// storeData('storedObjects', imgObjectsArray);
// getStoredData = getData('storedObjects');


//********Min Max function for random image selection **********

function randomSelector () {
    return Math.floor(Math.random() * imgObjectsArray.length);
}

//***************************************************************

//++++++++++++++++++generate random image display+++++++++++++++++++++++++++++

//function to generate images being seen (random) and counts # times shown.
function showImage(){
    var randNum1 = randomSelector();
    imgHolder1.src = imgObjectsArray[randNum1].imgFile;
    imgObjectsArray[randNum1].showCount += 1;
    tempIndex1=randNum1;

    do {var randNum2 = randomSelector();
    }  while(randNum2 === randNum1);
    imgHolder2.src = imgObjectsArray[randNum2].imgFile;
    imgObjectsArray[randNum2].showCount += 1;
    tempIndex2=randNum2;

    do {var randNum3 = randomSelector();
    }while(randNum3 === randNum2 || randNum3 ===randNum1);
    imgHolder3.src = imgObjectsArray[randNum3].imgFile;
    imgObjectsArray[randNum3].showCount += 1;
    tempIndex3=randNum3;
}

/***************************************
  generate first set of images on load
****************************************/
showImage();

//**************************************

//On click (of image), run this function, but not more than 16 times.
var maxClicks = 16;   //to set maximum number of clicks a user will be able to generate
var counter = 0;   //to count number of clicks
var extendPlay=false;

function countClicks(){
  if(counter <maxClicks ){
      counter = counter + 1;

      if(imgHolder1){
      imgObjectsArray[tempIndex1].clickCount +=1;       //log click to object's counter
      } else if(imgHolder2){
      imgObjectsArray[tempIndex2].clickCount +=1;
      } else if (imgHolder3){
      imgObjectsArray[tempIndex3].clickCount +=1;
      }

      var myStoredStuff = JSON.stringify(imgObjectsArray);
      localStorage.storedObjects=myStoredStuff;

      showImage()

  }else if (counter===maxClicks && !extendPlay){
    buttons[0].style.display="inline";
    buttons[1].style.display="inline";

  } else if (counter === maxClicks && extendPlay){
    buttons[0].style.display="inline";
  }
}

imgHolder1.addEventListener("click", countClicks , false);
imgHolder2.addEventListener("click", countClicks, false);
imgHolder3.addEventListener("click", countClicks, false);


//################## click on button shows results #############################################################################
var percentCalc; //this is just a placeholder to avoid the divide by zero error...(TODO: removed % of total temporarily.  Will put back in next pass).
var resultsBarChart;  //put here so I can delete it later (delete happens outside of function.)
function genResultsList (){

  buttons[0].style.display="none";
  buttons[1].style.display="none"
  buttons[2].style.display="block";


var imgClickArray = [];
for(var i = 0; i < imgObjectsArray.length; i++){
  imgClickArray.push(imgObjectsArray[i].clickCount);
}

    var data = {
        labels: imgNameArray,
        datasets: [
            {
                label: "Images You Clicked",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: imgClickArray
            }
        ]
    };
      resultsBarChart = new Chart(ctx).Bar(data);
}

buttons[0].addEventListener("click", genResultsList, false);

//######################## continue play button #################################

function playMore () {
      maxClicks=24;
      extendPlay=true;
      buttons[0].style.display="none";
      buttons[2].style.display="none";
      buttons[1].style.display="none";
  }

  buttons[1].addEventListener("click", playMore ,false);

//################## reset button #########################################################################################
//NOTE: functionality here is still buggy.  To be fixed!

function reset(){
    resultsBarChart.destroy();
    buttons[0].style.display="none";
    buttons[2].style.display="none";
    buttons[1].style.display="none";
    counter = 0;
    maxClicks=16;
    extendPlay=false;

    for(var ii; ii < imgObjectsArray.length; ii++){
        imgObjectsArray[ii].clickCount = 0;
        imgObjectsArray[ii].showCount = 0;
    }

    showImage();
}

buttons[2].addEventListener("click", reset ,false);
