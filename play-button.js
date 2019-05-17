// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(controlButton) {
    this.controlButton = document.querySelector("#controlButton");
  }

  play(){
    this.controlButton.style.backgroundImage="url('images/play.png')";
  }

  pause(){
    this.controlButton.style.backgroundImage="url('images/pause.png')";
  }
}
