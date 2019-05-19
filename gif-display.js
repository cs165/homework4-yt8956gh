// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(imageUrl, playButtonElement) {
    this.imageUrl = imageUrl;
    this.changeGif = this.changeGif.bind(this);
    this.preload = this.preload.bind(this);
    this.loadFinish = this.loadFinish.bind(this);
    this.showFirstGif = this.showFirstGif.bind(this);
    this.playButtonElement = playButtonElement;

    this.imageIndex = 0;
    this.preloadImageIndex=0;
    this.order=0;
    this.frontGif = document.getElementById("frontGif");
    this.backGif = document.getElementById("backGif");
    this.loadSrceen = document.getElementById("load");
    this.loadSrceen.classList.remove("inactive");

    this.preload();
  }

  preload(){

    for(let i=0;i<this.imageUrl.length;i++)
    {
      let tmpImage = new Image();
      tmpImage.src=this.imageUrl[i];
      tmpImage.onload = this.loadFinish;
    }
  }

  loadFinish(){

    this.preloadImageIndex++;
    console.log("Preload-Index:" + this.preloadImageIndex);

    if(this.preloadImageIndex===this.imageUrl.length)
    {
      this.showFirstGif();
      document.addEventListener("onKick",this.changeGif);
      this.playButtonElement.dispatchEvent(new Event("autoPlayMusic"));
      this.loadSrceen.classList.add("inactive");
    }
  }

  showFirstGif(){
    this.frontGif.style.backgroundImage="url('"+this.imageUrl[this.imageIndex]+"')";
    this.nextIndex();
    this.backGif.style.backgroundImage="url('"+this.imageUrl[this.imageIndex]+"')";
  }

  changeGif(){

    this.nextIndex();

    if(this.order===0)
    {
      this.frontGif.classList.add("inactive");
      this.backGif.classList.remove("inactive");
      this.frontGif.style.backgroundImage="url('"+this.imageUrl[this.imageIndex]+"')";
      this.order=1;
    }
    else{
      this.backGif.classList.add("inactive");
      this.frontGif.classList.remove("inactive");
      this.backGif.style.backgroundImage="url('"+this.imageUrl[this.imageIndex]+"')";
      this.order=0;
    }

  }

  nextIndex()
  {
    this.imageIndex = (this.imageIndex+1)%this.imageUrl.length;
    console.log("Image-Index:"+this.imageIndex);
  }
}
