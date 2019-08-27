footerType = document.getElementById("footerBarType").getAttribute("value");

var footerContent;
var footerBlock;
footerContent = document.createElement('div');

//footerBarA - For non board pages, used on index.html, faq.html, etc...
if (footerType == 'A')
{
footerContent.innerHTML = '<footer><div class = "footerBar"><a href="/.static/faq.html#faq1">About</a> • <a href="/meta/res/1.html#">Feedback</a> • <a href="/.static/contact.html#legal">Legal</a> • <a href="/.static/contact.html">Contact</a></div><br />Copyright © 2019 16chan Development Team.</footer>';
}

//footerBarB - For board pages, used on board.html, thread.html, catalog.html, etc...
else if (footerType == 'B')
{
footerContent.innerHTML = 
'<footer id="footer">All trademarks and copyrights on this page are owned by their respective parties. Images uploaded are the responsibility of the Poster. Comments are owned by the Poster.<br /><br /><div class = "footerBar"><a href="/.static/faq.html#faq1">About</a> • <a href="/meta/res/1.html#">Feedback</a> • <a href="/.static/contact.html#legal">Legal</a> • <a href="/.static/contact.html">Contact</a></div></footer>';
}

footerBlock = document.getElementById('footerBarType');
footerBlock.appendChild(footerContent);