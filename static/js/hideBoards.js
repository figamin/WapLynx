//A modified version of the show forms function used on thread.html and board.html
var bottomForms = {};

bottomForms.init = function() {

  var forms = document.getElementById('federatedBoards');
  forms.classList.toggle('hidden');

  var showFormsButton = document.createElement('div');
  showFormsButton.innerHTML = '<a>Show</a>';
  showFormsButton.id = 'showFederatedButton';

  forms.parentElement.insertBefore(showFormsButton, forms);

  showFormsButton.onclick = function() {
    forms.classList.toggle('hidden');

	if (showFormsButton.innerHTML === "<a>Show</a>") {
  	  showFormsButton.innerHTML = "<a>Hide</a>";
  	} else {
    	  showFormsButton.innerHTML = "<a>Show</a>";
  	}
  };
};

bottomForms.init();
