// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor() {

    this.onStreamProcess = this.onStreamProcess.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    const selectElem = document.querySelector('#song-selector');
    this.selectContainer = selectElem;

    this.optionalItem = [];

    this.randomTheme();

    this.selectedIndex=0;

    this.audioPlayer = new AudioPlayer();


    selectElem.addEventListener('change', function() {
       this.selectedIndex = selectElem.selectedIndex;
       console.log(this.selectedIndex);
       console.log('index selected: ' + this.selectedIndex);
       console.log('option selected: ' + selectElem.options[this.selectedIndex].value);
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

    let index=0;

    for(let i in json)
    {
      this.optionalItem[index]["title"]=json[i]['title'];
      let tmpItem = document.createElement("option");
      tmpItem.textContent = json[i].artist +':'+ json[i].title;
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

    console.log("Random-Index-Of-Theme:"+randomInt);

    const themeElem = document.querySelector('#query-input');

    themeElem.placeholder = item[randomInt];
  }


  _onSubmit(event){
    event.preventDefault();

    const queryInput = document.querySelector('#query-input');
    const text = queryInput.value;
    const formElement = document.querySelector('#menu-form');
    formElement.disabled = true;

    console.log("queryInput:"+text);

    console.log("selectedIndex in queryInput:"+this.selectedIndex);

    console.log("this.optionalItem:"+this.optionalItem["鹹豆漿"]);

    this.audioPlayer.setSong(this.optionalItem[this.selectedIndex]);
    this.audioPlayer.setKickCallback(this._onKick);
    this.audioPlayer.play();
  }

  _onKick() {
    console.log('kick!');
  }
  
}
