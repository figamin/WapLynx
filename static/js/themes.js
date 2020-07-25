var themes = {};

themes.init = function() {

  themes.themes = [ {
      label : 'Yotsuba B',
      id : 'yotsuba_b'
  }, {
      label : 'Yotsuba',
      id : 'yotsuba'
  }, {
      label : 'Warosu',
      id : 'warosu'
  }, {
      label : 'Tomorrow',
      id : 'tomorrow'
  }];
  localStorage.selectedTheme = localStorage.selectedTheme || themes.themes[0]

  var postingLink = document.getElementById('navPosting');

  if (postingLink) {

    var referenceNode = postingLink.nextSibling;

    postingLink.parentNode.insertBefore(document.createTextNode(' '),
        referenceNode);

    var divider = document.createElement('span');
    divider.innerHTML = '/';
    postingLink.parentNode.insertBefore(divider, referenceNode);

    postingLink.parentNode.insertBefore(document.createTextNode(' '),
        referenceNode);

    var themeSelector = document.createElement('select');
    themeSelector.id = 'themeSelector';

    for (var i = 0; i < themes.themes.length; i++) {

      var theme = themes.themes[i];

      var themeOption = document.createElement('option');
      themeOption.innerHTML = theme.label;

      if (theme.id === localStorage.selectedTheme) {
        themeOption.selected = true;
      }

      themeSelector.appendChild(themeOption);

    }

    themeSelector.onchange = function() {

      var selectedTheme = themes.themes[themeSelector.selectedIndex];

      if (selectedTheme.id === localStorage.selectedTheme) {
        return;
      }

      localStorage.selectedTheme = selectedTheme.id;

      themeLoader.load();

    };

    postingLink.parentNode.insertBefore(themeSelector, referenceNode);

  }
  themeLoader.load()
};

themes.init();
