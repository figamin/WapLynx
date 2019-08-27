announceType = document.getElementById("announceType").getAttribute("value");

var announceContent;
var announceBlock;
announceContent = document.createElement('div');

//announceBarA - For non board pages, used on index.html, faq.html, etc...
if (announceType == 'A')
{
announceContent.innerHTML = '<div id="announcementPlacement"><hr class="belowPostFieldset"><center><div id="announcementContent">Announcements will go here.</div></center><hr class="belowPostFieldset"></div>';
}

//announceBarB - For board pages, used on board.html, thread.html, catalog.html, etc...
else if (announceType == 'B')
{
announceContent.innerHTML = 
'<announce id="announce">All trademarks and copyrights on this page are owned by their respective parties. Images uploaded are the responsibility of the Poster. Comments are owned by the Poster.<br /><br /><div class = "announceBar"><a href="/.static/faq.html#faq1">About</a> • <a href="/meta/res/1.html#">Feedback</a> • <a href="/.static/contact.html#legal">Legal</a> • <a href="/.static/contact.html">Contact</a></div></announce>';
}

announceBlock = document.getElementById('announceBarType');
announceBlock.appendChild(announceContent);