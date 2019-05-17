// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.changeGif = this.changeGif.bind(this);

    this.imageIndex = 0;
    this.order=0;
    this.frontGif = document.getElementById("frontGif");
    this.backGif = document.getElementById("backGif");

    document.addEventListener("onKick",this.changeGif);

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
