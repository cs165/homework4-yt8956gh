// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {

    this.containerElement = containerElement;
    this._onSubmit = this._onSubmit.bind(this);
    this.onProcessImageUrl = this.onProcessImageUrl.bind(this);

    this.optionalItem = [];
    this.selectedIndex=0;
    this.selectContainer = document.querySelector('#song-selector');

    this.selectContainer.addEventListener('change', function() {
       this.selectedIndex = this.selectContainer.selectedIndex;
     }.bind(this));


    fetch("https://fullstackccu.github.io/homeworks/hw4/songs.json")
        .then(
            response => {return response.json();},
            response => {console.log(response.status);})
        .then(function (json) {

          //console.log(json);
          for(let i in json)
          {
            this.optionalItem.push(json[i]);
            let tmpItem = document.createElement("option");
            tmpItem.textContent = json[i]["artist"] +':'+ json[i]["title"];
            this.selectContainer.appendChild(tmpItem);
          }

        }.bind(this));


    const formElmt=document.querySelector("form");
    formElmt.addEventListener("submit", this._onSubmit);

    this.randomTheme();
  }

  randomTheme(){
    let item = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    let randomInt = Math.floor(Math.random()*item.length);

    const themeElem = document.querySelector('#query-input');
    themeElem.value = item[randomInt];
  }

  _onSubmit(event){
    event.preventDefault();
    const selector = document.querySelector('#song-selector');
    const queryInput = document.querySelector('#query-input');
    const text = queryInput.value;

    selector.disabled=true;
    queryInput.disabled=true;

    let tmp={};
    tmp["songValue"] = this.optionalItem[this.selectedIndex]["title"];
    tmp["gifValue"] = text;

    console.log(tmp);

    fetch("http://api.giphy.com/v1/gifs/search?q="+encodeURIComponent(text)+"&limit=25&rating=g&api_key=FjJaTP04iY5rAwcEASKET51wyx9VZ2V8")
        .then( response => {return response.json();}, response=>{console.log(response);})
        .then(this.onProcessImageUrl);
  }

  onProcessImageUrl(json){

    console.log(json);

    const data={"songUrl":this.optionalItem[this.selectedIndex]["songUrl"], "json":json}
    this.hide();
    document.dispatchEvent(new CustomEvent("toMusic", {detail:data}));
  }

  hide(){
    this.containerElement.classList.add("inactive");
  }
}
  

