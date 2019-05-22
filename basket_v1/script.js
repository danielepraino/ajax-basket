//inizializzo l'array giocatori
var playersArr = [];

//creo le varie funzioni per clonare gli elementi utili a popolare la scheda giocatore
var tableTemplate = $("#table-template").html();
var overallTemplate = Handlebars.compile(tableTemplate);
$(".container").append(overallTemplate);

var optionTemplate = $("#option-template").html();
var selectTemplate = Handlebars.compile(optionTemplate);

var idTemplate = $("#id-template").html();
var playeridTemplate = Handlebars.compile(idTemplate);

var statTemplate = $("#stat-template").html();
var playerstatTemplate = Handlebars.compile(statTemplate);

//creo una funzione per richiamare l'API
//creo una variabile in cui è memorizzato il valore del num giocatori che l'utente vuole generare
//faccio un controllo, se l'utente non inserisce nessun valore o non inserisce un numero allora
//di default genero 5 giocatori
//genero la lista dei giocatori
//vado poi a popolare la scheda con i nomi delle proprietà dell'oggetto e con i suoi valori
//al cambio della tendina genera la scheda del giocatore selezionato
//NOTA: all'interno di $(.choosePlayer).change(function()){} ho provato con il $(this) ma selezionava
//un oggetto che non era l'option della tendina, non era il suo contesto, quindi mi sono dovuto
//ingegnare selezionando l'index utilizzando $(this).prop("selectedIndex")
function callAPI(){
  var playerNum = parseInt(prompt("Quanti giocatori vuoi generare?"));
  if (isNaN(playerNum)) {
    playerNum = 5;
  }
  $.ajax({
    url: "https://www.boolean.careers/api/array/basket",
    method: "GET",
    data: {
      n: playerNum
    },
    success: function(obj) {
      playersArr = obj.response;
      console.log(playersArr);
      playerStats(playerNum, playersArr);
      savedPlayerLength = Object.keys(playersArr[0]).length;
      tableGen(playersArr, savedPlayerLength, 0);

      $(".choosePlayer").change(function(){
        var optionVal = $(this).prop("selectedIndex");
        tableGen(playersArr, savedPlayerLength, optionVal);
      });
    },
    error: function() {
      alert("errore");
    }
  });
}

//creo una funzione che popola la selection con gli id dei vari giocatori
function playerStats(maxPlayers, arr) {
  for (var a = 0; a < maxPlayers; a++) {
    arr.idValue = arr[a].playerCode;
    $(".choosePlayer").append(selectTemplate(arr));
  }
}

//creo una funzione che popola la scheda giocatore utilizzando i nomi e i valori delle proprietà
//dell'oggetto passato
function tableGen(arr, num, option) {
  $(".statsTable").empty();
  for (var j = 0; j < num; j++) {
    if (j == 0) {
      arr.idKey = Object.keys(arr[option])[0];
      arr.idValue = Object.values(arr[option])[0];
      $(".statsTable").append(playeridTemplate(arr));
    } else {
      arr.keyStat = Object.keys(arr[option])[j];
      arr.stat = Object.values(arr[option])[j];
      $(".statsTable").append(playerstatTemplate(arr));
    }
  }
}

//richiamo la funzione API
callAPI();
