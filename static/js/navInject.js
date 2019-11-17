navType = document.getElementById("navBarType").getAttribute("value");

var navContent;
var navBlock;
navContent = document.createElement('nav');

//navType A is for non-specialized pages
if (navType == 'A')
{
navContent.innerHTML =
    '<nav>' +
	'<span id="navLinkSpan">' +
	   '<span>[</span>' +
	    '<a href="/" class="coloredIcon" id="navLinkHome"></a>' +
	    '<span>/</span>' +
	    '<a href="/boards.js" class="coloredIcon" id="navBoardList"></a>' +
	    '<span>/</span>' +
	    '<a href="/overboard" class="coloredIcon" id="navOverboard"></a>' +
	    '<span>/</span>' +
	    '<a href="/.static/pages/posting.html" class="coloredIcon" id="navPosting"></a>' +
	    '<span>]</span>' +
	    '<span>[</span>' +
	    '<a href="/a" class="coloredIcon">a</a>' +
	    '<span>/</span>' +
	    '<a href="/b" class="coloredIcon">b</a>' +
	    '<span>/</span>' +
	    '<a href="/biz" class="coloredIcon">biz</a>' +
	    '<span>/</span>' +
	    '<a href="/fit" class="coloredIcon">fit</a>' +
	    '<span>/</span>' +
	    '<a href="/g" class="coloredIcon">g</a>' +
	    '<span>/</span>' +
	    '<a href="/hypno" class="coloredIcon">hypno</a>' +
	    '<span>/</span>' +
	    '<a href="/int" class="coloredIcon">int</a>' +
	    '<span>/</span>' +
	    '<a href="/k" class="coloredIcon">k</a>' +
	    '<span>/</span>' +
	    '<a href="/library" class="coloredIcon">library</a>' +
	    '<span>/</span>' +
	    '<a href="/meta" class="coloredIcon">meta</a>' +
	    '<span>/</span>' +
	    '<a href="/pol" class="coloredIcon">pol</a>' +
	    '<span>/</span>' +
	    '<a href="/r9k" class="coloredIcon">r9k</a>' +
	    '<span>/</span>' +
	    '<a href="/redpill" class="coloredIcon">redpill</a>' +
	    '<span>/</span>' +
	    '<a href="/tv" class="coloredIcon">tv</a>' +
	    '<span>/</span>' +
	    '<a href="/v" class="coloredIcon">v</a>' +
	    '<span>]</span>' +
	'</span>' +
	'<span id="navBoardsSpan"></span>' +
	'<span id="navOptionsSpan"></span>' +
    '</nav>';
}

//navType B is for board.html
else if (navType == 'B')
{
navContent.innerHTML =
	'<span id="navLinkSpan">' +
	    '<span>[</span>' +
	    '<a href="/" class="coloredIcon" id="navLinkHome"></a>' +
	    '<span>/</span>' +
	    '<a href="/boards.js" class="coloredIcon" id="navBoardList"></a>' +
	    '<span>/</span>' +
	    '<a href="/overboard" class="coloredIcon" id="navOverboard"></a>' +
	    '<span>/</span>' +
	    '<a href="/.static/pages/posting.html" class="coloredIcon" id="navPosting"></a>' +
	    '<span>]</span>' +
	    '<span>[</span>' +
	    '<a href="/a" class="coloredIcon">a</a>' +
	    '<span>/</span>' +
	    '<a href="/b" class="coloredIcon">b</a>' +
	    '<span>/</span>' +
	    '<a href="/biz" class="coloredIcon">biz</a>' +
	    '<span>/</span>' +
	    '<a href="/fit" class="coloredIcon">fit</a>' +
	    '<span>/</span>' +
	    '<a href="/g" class="coloredIcon">g</a>' +
	    '<span>/</span>' +
	    '<a href="/hypno" class="coloredIcon">hypno</a>' +
	    '<span>/</span>' +
	    '<a href="/int" class="coloredIcon">int</a>' +
	    '<span>/</span>' +
	    '<a href="/k" class="coloredIcon">k</a>' +
	    '<span>/</span>' +
	    '<a href="/library" class="coloredIcon">library</a>' +
	    '<span>/</span>' +
	    '<a href="/meta" class="coloredIcon">meta</a>' +
	    '<span>/</span>' +
	    '<a href="/pol" class="coloredIcon">pol</a>' +
	    '<span>/</span>' +
	    '<a href="/r9k" class="coloredIcon">r9k</a>' +
	    '<span>/</span>' +
	    '<a href="/redpill" class="coloredIcon">redpill</a>' +
	    '<span>/</span>' +
	    '<a href="/tv" class="coloredIcon">tv</a>' +
	    '<span>/</span>' +
	    '<a href="/v" class="coloredIcon">v</a>' +
	    '<span>]</span>' +
	'</span>' +
	'<span id="navBoardsSpan"></span>' +
	'<span id="navOptionsSpan">' +
	    '<span>[</span>' +
	    '<a class="coloredIcon" id="linkLogs"></a>' +
	    '<span>/</span>' +
	    '<a href="#" class="coloredIcon" id="linkTop"></a>' +
	    '<span>/</span>' +
	    '<a href="#footer" class="coloredIcon" id="linkBottom"></a>' +
	    '<span>/</span>' +
	    '<a href="catalog.html" class="coloredIcon" id="navCatalog"></a>' +
	    '<span>/</span>' +
	    '<a href="index.rss" class="coloredIcon" id="linkRss"></a>' +
	    '<span>]</span>' +
	'</span>';
}

navBlock = document.getElementById('navBarType');
navBlock.appendChild(navContent);
