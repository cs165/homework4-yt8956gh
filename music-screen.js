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
    this.onClick = this.onClick.bind(this);
    this.show = this.show.bind(this);
    let playButtonElement = document.getElementById("controlButton");

    this.audioPlayer = new AudioPlayer();
    this.playButton = new PlayButton(playButtonElement);
    this.gifDisplay = null;
    this.NowShowPause=false;

    this.hide();
    document.addEventListener("toMusic", this.musicScreenInit);

    playButtonElement.onclick = this.onClick;
    console.log(playButtonElement);
  }

  onClick(){
    if(this.NowShowPause)
    {
      this.NowShowPause = false;
      this.audioPlayer.pause();
      this.playButton.play();
    }
    else
    {
      this.NowShowPause = true;
      this.audioPlayer.play();
      this.playButton.pause();
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
    let imageUrl=[];

    this.audioPlayer.setSong(event.detail.songUrl);
    this.audioPlayer.setKickCallback(()=>{document.dispatchEvent(new Event("onKick"));});

    for(let key in json.data)
    {
      let url = json.data[key].images.downsized.url;
      console.log(url);
      imageUrl.push(url);
    }

    this.gifDisplay = new GifDisplay(imageUrl);
    this.show();
  }
}
