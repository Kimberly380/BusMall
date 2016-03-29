




imgObjectsArray = [];

function imgObjects (imgName, imgFile){
  this.imgName = imgName;
  this.imgFile = imgFile;
  this.clickCount = 0;
  this.showCount = 0;


  imgObjectsArray.push(this);
}
