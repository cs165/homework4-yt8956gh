// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor() {

    this.onStreamProcess = this.onStreamProcess.bind(this);
    this._onSubmit = this._onSubmit.bind(this);


    this.optionalItem = [];
    this.randomTheme();
    this.selectedIndex=0;
    this.audioPlayer = new AudioPlayer();
    this.selectContainer = document.querySelector('#song-selector');

    this.selectContainer.addEventListener('change', function() {
       this.selectedIndex = this.selectContainer.selectedIndex;
     }.bind(this));


    fetch("https://fullstackccu.github.io/homeworks/hw4/songs.json")
        .then(this.onResponse,this.onError)
        .then(this.onStreamProcess);


    const formElmt=document.querySelector("form");
    formElmt.addEventListener("submit", this._onSubmit);
  }

  onResponse(response){
    console.log(response.status);

    return response.json();
  }


  onStreamProcess(json){
    console.log(json);

    for(let i in json)
    {
      this.optionalItem.push(json[i]);
      let tmpItem = document.createElement("option");
      tmpItem.textContent = json[i]["artist"] +':'+ json[i]["title"];
      console.log(tmpItem.textContent);
      this.selectContainer.appendChild(tmpItem);
    }
  }

  onError(response){
    console.log(response.status);
  }

  randomTheme(){
    let item = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    let randomInt = Math.floor(Math.random()*item.length);

    const themeElem = document.querySelector('#query-input');
    themeElem.value = item[randomInt];
  }


  _onSubmit(event){
    event.preventDefault();
    const selector = document.querySelector('#song-selector')
    const queryInput = document.querySelector('#query-input');
    const text = queryInput.value;
    const formElement = document.querySelector('#menu-form');

    selector.disabled=true;
    formElement.disabled = true;
    queryInput.disabled=true;

    this.audioPlayer.setSong(this.optionalItem[this.selectedIndex]["songUrl"]);
    this.audioPlayer.setKickCallback(this._onKick);
    this.audioPlayer.play();
  }

  _onKick() {
    console.log('kick!');
  }
  
}
