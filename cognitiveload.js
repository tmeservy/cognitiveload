var N_SIZE = 3,
  EMPTY = "&nbsp;",
  boxes = [],
  mark = "\u2022",
  initialGrid = "",
  numDots = N_SIZE+1,
  updateable=true,
  questionid, containerid="dotgrid";

function createGrid(containerid, questionid, size=3, numDots=4, updateable){
  this.N_SIZE = size;
  this.numDots = numDots;
  this.questionid = questionid;
  this.containerid = containerid;
  this.updateable = updateable;

  init();
}


function init() {
  var grid = document.createElement('table');
  grid.setAttribute("border", 1);
  grid.setAttribute("cellspacing", 0);
  grid.setAttribute('id', "innergrid_"+this.questionid);
  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    grid.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('id', identifier);
      cell.setAttribute('height', 80);
      cell.setAttribute('width', 80);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      cell.identifier = identifier;
      if (updateable){
	      cell.addEventListener("click", set);
      }
      row.appendChild(cell);
      boxes.push(cell);
      identifier +=1;
    }
  }

  document.getElementById(containerid).appendChild(grid);
  newGrid();


}



function getOutput(){
	alert(getGridString());
}


function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

function set() {
  toggleMark = mark;
  if (this.innerHTML !== EMPTY) {
  	toggleMark = EMPTY;
  }
  this.innerHTML = toggleMark;
  //updateGridOutput();
}


function getGridString() {
var str="";

 identifier=1;
 for (var i = 0; i < N_SIZE; i++) {
    for (var j = 0; j < N_SIZE; j++) {
      str += document.getElementById(identifier).innerHTML==="\u2022"? "1" : "0";
      identifier += 1;
 		}
 	}

  return str;
}

function randomGrid(){
	initialGrid = "1".repeat(numDots) + "0".repeat(N_SIZE*N_SIZE-numDots);
  return initialGrid.shuffle();
}

function blankGrid(){
	initialGrid = "0".repeat(N_SIZE*N_SIZE);
  return initialGrid;
}

function newGrid() {
  initialGrid=randomGrid();
  setGrid(initialGrid);
}


function setGrid(initialGrid) {
 //make sure that all boxes have an innerHTML of empty; not sure why below code isn't working
 boxes.forEach(function(square) {
     square.innerHTML = EMPTY;
 });


 identifier=1;
 for (var i = 0; i < N_SIZE; i++) {
    for (var j = 0; j < N_SIZE; j++) {
      if (initialGrid.substring(identifier-1,identifier)=="1"){
      	document.getElementById(identifier).innerHTML="\u2022";
      } else {
      	document.getElementById(identifier).innerHTML = EMPTY;
      }

			identifier += 1;
 		}
 	}
}

function saveGrid(questionid){
  //$('NextButton').onclick = function (event) {
     // Save the current question's response value
     Qualtrics.SurveyEngine.setEmbeddedData(questionid, getGridString())
     // and now run the event that the normal next button is supposed to do
  //   Qualtrics.SurveyEngine.navClick(event, 'NextButton')
  // }
}


String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
