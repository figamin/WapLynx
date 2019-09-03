var bottomForms = {};

bottomForms.init = function() {

  var forms = document.getElementById('bottomForms');
  forms.classList.toggle('hidden');

  var showFormsButton = document.createElement('a');
  showFormsButton.innerHTML = 'Show Forms';
  showFormsButton.id = 'showFormsButton';

  forms.parentElement.insertBefore(showFormsButton, forms);

  showFormsButton.onclick = function() {
    forms.classList.toggle('hidden');
    //showFormsButton.remove();
  	
	if (showFormsButton.innerHTML === "Show Forms") {
  	  showFormsButton.innerHTML = "Hide Forms";
  	} else {
    	  showFormsButton.innerHTML = "Show Forms";
  	}	
  };
};

bottomForms.init();