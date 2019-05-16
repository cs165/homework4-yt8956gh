// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.musicScreenInit = this.musicScreenInit.bind(this);
    this.onKick = this.onKick.bind(this);
    this.onClick = this.onClick.bind(this);

    this.imageUrl = [];
    this.audioPlayer = new AudioPlayer();
    this.imageIndex = 0;
    this.NowShowPause=true;
    this.controlButton = document.querySelector("#controlButton");

    this.hide();
    this.show = this.show.bind(this);
    document.addEventListener("toMusic",this.musicScreenInit);
    this.controlButton.addEventListener("click", this.onClick);
  }

  onClick(event){

    if(this.NowShowPause)
    {
      event.currentTarget.style.backgroundImage="url('images/play.png')";
      this.NowShowPause = false;
      this.audioPlayer.pause();
    }
    else
    {
      event.currentTarget.style.backgroundImage="url('images/pause.png')";
      this.NowShowPause = true;
      this.audioPlayer.play();
    }
  }

  hide(){
    this.containerElement.classList.add("inactive");
  }

  show(){
    this.containerElement.classList.remove("inactive");
  }

  musicScreenInit(event){

    let json=event.detail.json;
    let songUrl = event.detail.songUrl;

    this.audioPlayer.setSong(songUrl);
    this.audioPlayer.setKickCallback(this.onKick);
    this.audioPlayer.play();

    for(let key in json.data)
    {
      let url = json.data[key].images.downsized.url;
      console.log(url);
      this.imageUrl.push(url);
    }

    this.show();
  }

  onKick(){
    console.log('kick!');
    this.GifDisplay();
  }

  GifDisplay(){
    const imageDiv = document.querySelector("#gifPicture");
    imageDiv.style.backgroundImage="url('"+this.imageUrl[this.imageIndex]+"')";

    this.imageIndex = (this.imageIndex+1)%this.imageUrl.length;

    console.log("Image-Index:"+this.imageIndex);
  }
}
