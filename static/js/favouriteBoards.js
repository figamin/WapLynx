var favouriteBoards = {};

favouriteBoards.init = function() {

  favouriteBoards.setFavouriteBoards();
  favouriteBoards.setTopBoards();

  var boardLabel = document.getElementById('labelName')
      || document.getElementById('labelBoard');

  if (boardLabel) {

    var savedFavouriteBoards = JSON.parse(localStorage.savedFavouriteBoards
        || '[]');

    var favouriteButton = document.createElement('span');
    favouriteButton.id = 'favouriteButton';
    boardLabel.parentNode.appendChild(favouriteButton);

    if (savedFavouriteBoards.indexOf(api.boardUri) > -1) {
      favouriteButton.className = 'checkedFavouriteButton';
    }

    favouriteButton.onclick = function() {
      savedFavouriteBoards = JSON.parse(localStorage.savedFavouriteBoards
          || '[]');

      var index = savedFavouriteBoards.indexOf(api.boardUri);

      if (index > -1) {
        savedFavouriteBoards.splice(index, 1);
        favouriteButton.removeAttribute('class');
      } else {
        savedFavouriteBoards.push(api.boardUri);
        savedFavouriteBoards.sort();
        favouriteButton.className = 'checkedFavouriteButton';
      }

      localStorage.setItem('savedFavouriteBoards', JSON
          .stringify(savedFavouriteBoards));

      favouriteBoards.setFavouriteBoards();

    };

  }

};

favouriteBoards.setFavouriteBoards = function() {

  var savedFavouriteBoards = JSON.parse(localStorage.savedFavouriteBoards
      || '[]');

  var boardsSpan = document.getElementById('navBoardsSpan');

  while (boardsSpan.hasChildNodes()) {
    boardsSpan.removeChild(boardsSpan.lastChild);
  }

  if (savedFavouriteBoards.length) {

    var firstBracket = document.createElement('span');
    firstBracket.innerHTML = '[';
    boardsSpan.appendChild(firstBracket);

    boardsSpan.appendChild(document.createTextNode(' '));

    for (var i = 0; i < savedFavouriteBoards.length; i++) {

      var link = document.createElement('a');
      link.href = '/' + savedFavouriteBoards[i];
      link.innerHTML = savedFavouriteBoards[i];
      boardsSpan.appendChild(link);

      boardsSpan.appendChild(document.createTextNode(' '));

      if (i < savedFavouriteBoards.length - 1) {

        var divider = document.createElement('span');
        divider.innerHTML = '/';
        boardsSpan.appendChild(divider);

        boardsSpan.appendChild(document.createTextNode(' '));
      }

    }

    var secondBracket = document.createElement('span');
    secondBracket.innerHTML = ']';
    boardsSpan.appendChild(secondBracket);
  }

};

favouriteBoards.setTopBoards = function() {
  var topBoardsGetter = new XMLHttpRequest();
  topBoardsGetter.open("GET", "/index.json");
  topBoardsGetter.onload = function(e) {
    var topBoards = JSON.parse(e.target.responseText || '{"topBoards": []}').topBoards

    var boardsSpan = document.getElementById('navTopBoardsSpan');

    while (boardsSpan.hasChildNodes()) {
      boardsSpan.removeChild(boardsSpan.lastChild);
    }

    if (topBoards.length) {

      var firstBracket = document.createElement('span');
      firstBracket.innerHTML = '[';
      boardsSpan.appendChild(firstBracket);

      boardsSpan.appendChild(document.createTextNode(' '));

      for (var i = 0; i < topBoards.length; i++) {

        var link = document.createElement('a');
        link.href = '/' + topBoards[i].boardUri;
        link.innerHTML = topBoards[i].boardUri;
        boardsSpan.appendChild(link);

        boardsSpan.appendChild(document.createTextNode(' '));

        if (i < topBoards.length - 1) {

          var divider = document.createElement('span');
          divider.innerHTML = '/';
          boardsSpan.appendChild(divider);

          boardsSpan.appendChild(document.createTextNode(' '));
        }

      }

    var secondBracket = document.createElement('span');
    secondBracket.innerHTML = ']';
    boardsSpan.appendChild(secondBracket);
    }
  }
  topBoardsGetter.send()
};

favouriteBoards.init();
