var themes = {};

themes.init = function() {

    themes.themes = [
    {
        label : 'wapfriends',
        id : 'wapfriends'
    },
	{
	    label : 'march',
	    id : 'march'
	},
	{
	    label : 'miku',
	    id : 'miku'
	},
	{
	    label : 'tomorrow',
	    id : 'tomorrow'
	},
	{
	    label : 'warosu',
	    id : 'warosu'
	},
	{
	    label : 'yotsuba',
	    id : 'yotsuba'
	},
	{
	    label : 'yotsuba b',
	    id : 'yotsuba_b'
	},
	{
	    label : 'terminal',
	    id : 'terminal'
	},
	{
	    label : 'terminal (amber)',
	    id : 'terminal_amber'
	},
    {
	    label : 'W64',
	    id : 'w64'
	},
    {
	    label : 'lovely',
	    id : 'lovely'
	}
    ];

  var postingLink = document.getElementById('themeIndex');

  if (!postingLink) {
    return;
  }

  var referenceNode = postingLink.nextSibling;

  postingLink.parentNode.insertBefore(document.createTextNode(' '),
      referenceNode);

  var divider = document.createElement('span');
  divider.innerHTML = '';
  postingLink.parentNode.insertBefore(divider, referenceNode);

  postingLink.parentNode.insertBefore(document.createTextNode(' '),
      referenceNode);

  var themeSelector = document.createElement('select');
  themeSelector.id = 'themeSelector';
  themeSelector.style = 'font-family: arial; font-size: 8pt;'

  var vanillaOption = document.createElement('option');
  vanillaOption.innerHTML = 'board-specific css';
  themeSelector.appendChild(vanillaOption);

  for (var i = 0; i < themes.themes.length; i++) {

    var theme = themes.themes[i];

    var themeOption = document.createElement('option');
    themeOption.innerHTML = theme.label;

    if (theme.id === localStorage.selectedTheme
        || (!localStorage.selectedTheme
            && theme.id === localStorage.defaultTheme && !localStorage.manualDefault)) {
      themeOption.selected = true;
    }

    themeSelector.appendChild(themeOption);

  }

  themeSelector.onchange = function() {

    if (!themeSelector.selectedIndex) {

      localStorage.manualDefault = true;

      if (localStorage.selectedTheme) {
        delete localStorage.selectedTheme;
        themeLoader.load();
      }

      return;
    }

    var selectedTheme = themes.themes[themeSelector.selectedIndex - 1];

    if (selectedTheme.id === localStorage.selectedTheme) {
      return;
    }

    delete localStorage.manualDefault;
    localStorage.selectedTheme = selectedTheme.id;

    themeLoader.load();

  };

  postingLink.parentNode.insertBefore(themeSelector, referenceNode);

};

//Functionality for the board selector
function boardUrlHandler(value) {                               
    window.location.assign(`${value}`);
}

themes.init();
