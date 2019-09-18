navType = document.getElementById("navBarType").getAttribute("value");

var navContent;
var navBlock;
navContent = document.createElement('div');

//navBarA -- Generic nav bar for something like index.html and various pages that aren't board.html or thread.html
if (navType == 'A')
{
navContent.innerHTML = 
  '<nav>' +
    '<span id="navLinkSpan"> <span>' +
        '[</span> <a ' +
        'href="/" ' +
        'class="coloredIcon" ' +
        'id="navLinkHome"></a> <span>' +
        '/' +
        '</span> <a ' +
        'href="/boards.js" ' +
        'class="coloredIcon" ' +
        'id="navBoardList"></a> <span>' +
        '/' +
        '</span> <a ' +
        'href="/.static/pages/donate.html" ' +
        'class="coloredIcon" ' +
        'id="navPosting"></a> <span id="boardListLinks">]&nbsp;&nbsp;&nbsp;' +
        '[&nbsp;<a href="/a">a&nbsp;</a>' +
        '/' +
        '<a href="/b">&nbsp;b&nbsp;</a>' +
        '/' +
        '<a href="/g">&nbsp;g&nbsp;</a>' +
        '/' +
	'<a href="/k">&nbsp;k&nbsp;</a>' +
        '/' +
        '<a href="/meta">&nbsp;meta&nbsp;</a>' +
	'/' +
        '<a href="/pol">&nbsp;pol&nbsp;</a>' +
        '/' +
        '<a href="/r9k">&nbsp;r9k&nbsp;</a>' +
        '/' +
        '<a href="/tv">&nbsp;tv&nbsp;</a>' +
        '/' +
        '<a href="/v">&nbsp;v&nbsp;</a>' +
        ']' +
    '</span>' +
    '</span>' +
    '</span> <span id="navBoardsSpan"> </span> <span id="navOptionsSpan"> <span> </span>' +
  '</nav>';
}

//navBarB -- Specific nav bar for board.html
else if (navType == 'B')
{
navContent.innerHTML = 
  '<nav>' +
    '<span id="navLinkSpan"> <span>' +
        '[</span> <a ' +
        'href="/" ' +
        'class="coloredIcon" ' +
        'id="navLinkHome"></a> <span>' +
        '/' +
        '</span> <a ' +
        'href="/boards.js" ' +
        'class="coloredIcon" ' +
        'id="navBoardList"></a> <span>' +
        '/' +
        '</span> <a ' +
        'href="/.static/pages/donate.html" ' +
        'class="coloredIcon" ' +
        'id="navPosting"></a> <span id="boardListLinks">]&nbsp;&nbsp;&nbsp;' +
        '[&nbsp;<a href="/a">a&nbsp;</a>' +
        '/' +
        '<a href="/b">&nbsp;b&nbsp;</a>' +
	'/' +
        '<a href="/g">&nbsp;g&nbsp;</a>' +
        '/' +
	'<a href="/k">&nbsp;k&nbsp;</a>' +
        '/' +
        '<a href="/meta">&nbsp;meta&nbsp;</a>' +
        '/' +
        '<a href="/pol">&nbsp;pol&nbsp;</a>' +
        '/' +
        '<a href="/r9k">&nbsp;r9k&nbsp;</a>' +
        '/' +
        '<a href="/tv">&nbsp;tv&nbsp;</a>' +
        '/' +
        '<a href="/v">&nbsp;v&nbsp;</a>' +
        ']' +
    '</span>' +
    '</span>' +
    '</span> <span id="navBoardsSpan"> </span> <span id="navOptionsSpan"> <span>[&nbsp;</span>' +
      '<a ' +
        'href="#" ' +
        'class="coloredIcon" ' +
        'id="linkTop"></a> <span>/</span> <a ' +
        'href="#footer" ' +
        'class="coloredIcon" ' +
        'id="linkBottom"></a> <span>/</span> <a ' +
        'href="catalog.html" ' +
        'class="coloredIcon" ' +
        'id="navCatalog"></a> <span>/</span> <a ' +
        'href="index.rss" ' +
        'class="coloredIcon" ' +
        'id="linkRss"></a> <span>]</span>' +
    '</span>' +
  '</nav>';
}
//navBarC -- Specific nav bar for thread.html
else if (navType == 'C')
{
navContent.innerHTML = 
  '<nav>' +
    '<span id="navLinkSpan"> <span>' +
        '[</span> <a ' +
        'href="/" ' +
        'class="coloredIcon" ' +
        'id="navLinkHome"></a> <span>' +
        '/' +
        '</span> <a ' +
        'href="/boards.js" ' +
        'class="coloredIcon" ' +
        'id="navBoardList"></a> <span>' +
        '/' +
        '</span> <a ' +
        'href="/.static/pages/donate.html" ' +
        'class="coloredIcon" ' +
        'id="navPosting"></a> <span id="boardListLinks">]&nbsp;&nbsp;&nbsp;' +
        '[&nbsp;<a href="/a">a&nbsp;</a>' +
        '/' +
        '<a href="/b">&nbsp;b&nbsp;</a>' +
        '/' +
        '<a href="/g">&nbsp;g&nbsp;</a>' +
        '/' +
        '<a href="/k">&nbsp;k&nbsp;</a>' +
        '/' +
        '<a href="/meta">&nbsp;meta&nbsp;</a>' +
        '/' +	
        '<a href="/pol">&nbsp;pol&nbsp;</a>' +
        '/' +
        '<a href="/r9k">&nbsp;r9k&nbsp;</a>' +
        '/' +
        '<a href="/tv">&nbsp;tv&nbsp;</a>' +
        '/' +
	'<a href="/v">&nbsp;v&nbsp;</a>' +
        ']' +
    '</span>' +
    '</span>' +
    '</span> <span id="navBoardsSpan"> </span> <span id="navOptionsSpan"> <span>[&nbsp;</span>' +
      '<a ' +
        'href=".." ' +
        'id="linkBack" ' +
        'class="coloredIcon"></a> <span>/</span> <a ' +
        'href="#bannerImage" ' +
        'id="linkTop" ' +
        'class="coloredIcon"></a> <span>/</span> <a ' +
        'href="#footer" ' +
        'id="linkBottom" ' +
        'class="coloredIcon"></a> <span>/</span> <a ' +
        'href="../catalog.html" ' +
        'id="navCatalog" ' +
        'class="coloredIcon"></a> <span>]</span>' +
    '</span>' +
  '</nav>';
}

navBlock = document.getElementById('navBarType');
navBlock.appendChild(navContent);
