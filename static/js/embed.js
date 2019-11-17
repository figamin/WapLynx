// note: if specific width and height is desired for each embed, just refactor slightly
// instead of getSrcX, just have individualized buildEmbeds and then they can be appended
// from init

var embed = {};

embed.buildEmbed = function(width, height, src) {
    // assuming no ES6 support? aids concat
    var html = "<iframe";
    html += " width=\"" + width + "\"";
    html += " height=\"" + height + "\"";
    html += " src=\"" + src + "\"";
    html += " frameborder=\"0\"";
    html += " allowfullscreen";
    html += "></iframe>";

    var wrapperElement = document.createElement("div");
    wrapperElement.style.display = "inline";

    var divElement = document.createElement("div");
    divElement.style.display = "none";

    var buttonElement = document.createElement("span");
    buttonElement.innerHTML = "[Embed]";
    buttonElement.className = "embedButton glowOnHover";

    buttonElement.onclick = function() {
	if (divElement.style.display === "none") {
	    divElement.style.display = "block";
	    divElement.innerHTML = html;
	    buttonElement.innerHTML = "[Remove]";
	}

	else {
	    divElement.style.display = "none";
	    divElement.innerHTML = null;
	    buttonElement.innerHTML = "[Embed]";
	}
    };

    // note: append order
    wrapperElement.appendChild(buttonElement);
    wrapperElement.appendChild(divElement);

    return wrapperElement;
};

embed.trimExtra = function(input, by) {
    var byIndex = input.indexOf(by);

    if (byIndex != -1)
	input = input.substring(0, byIndex);

    return input;
};

embed.getDomain = function(url) {
    return url.match(/\b(?!www.)\b([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/i)[0];
};

embed.getYouTubeStartTime = function(url) {
    // note: youtube also has another start time called continue or continue from which i think
    // is handled in plain seconds? its not used in sharing though. it can be implemented
    // here if need be
    var startTime = url.split("t=")[1];

    if (!startTime)
	return;

    startTime = embed.trimExtra(startTime, "&");

    var totalSeconds = 0;
    // youtube handles ?t= start time in units of hours, minutes and seconds
    // like ?t=2h1m22s
    // youtube ignores it if the units aren't in proper order or are repeated
    // we don't detect that as an error, it's just treated as undefined behavior
    var units = startTime.match(/\d+(?=h|m|s)/g);

    for (var i = 0; i < units.length; ++i) {
	var value = parseInt(units[i]);

	switch (units.length - i) {
	    // hours
	case 3:
	    totalSeconds += value * 3600;
	    break;
	    // minutes
	case 2:
	    totalSeconds += value * 60;
	    break;
	    // seconds
	case 1:
	    totalSeconds += value;
	    break;
	}
    }

    return totalSeconds;
};

// youtube.com domain and drop-in replacements
embed.getSrcYouTubeCommon = function(domain, url) {
    var videoId = url.split("v=")[1];

    if (!videoId)
	return;

    videoId = embed.trimExtra(videoId, "&");

    var embedSrc = "https://" + domain + "/embed/" + videoId;

    var startTime = embed.getYouTubeStartTime(url);

    if (startTime)
	embedSrc += "?start=" + startTime;

    return embedSrc;
};

embed.getSrcYouTube = function(url) {
    return embed.getSrcYouTubeCommon("www.youtube.com", url);
};

embed.getSrcInvidious = function(url) {
    return embed.getSrcYouTubeCommon("www.invidio.us", url);
};

embed.getSrcYouTubeShortened = function(url) {
    var videoId = url.split("/")[3];

    if (!videoId)
	return;

    videoId = embed.trimExtra(videoId, "?");

    var embedSrc = "https://www.youtube.com/embed/" + videoId;	

    var startTime = embed.getYouTubeStartTime(url);

    if (startTime)
	embedSrc += "?start=" + startTime;

    return embedSrc;
};

embed.getSrcBitChute = function(url) {
    if (!url.includes("/video/"))
	return;

    var videoId = url.split("/")[4];

    if (!videoId)
	return;

    return "https://www.bitchute.com/embed/" + videoId;
};

embed.getSrcLiveLeak = function(url) {
    var videoId = url.split("t=")[1];

    if (!videoId)
	return;

    videoId = embed.trimExtra(videoId, "&");

    return "https://www.liveleak.com/e/" + videoId;
};

embed.domainFunctionMap = {};

embed.domainFunctionMap["youtube.com"] = embed.getSrcYouTube;
embed.domainFunctionMap["youtu.be"] = embed.getSrcYouTubeShortened;
embed.domainFunctionMap["invidio.us"] = embed.getSrcInvidious;
embed.domainFunctionMap["bitchute.com"] = embed.getSrcBitChute;
embed.domainFunctionMap["liveleak.com"] = embed.getSrcLiveLeak;

// on refactor consider scrapping the getFunction and just have key shit handled from init
embed.getDomainSrcFunction = function(url) {
    var domain = embed.getDomain(url).toLowerCase(); // all keys are lowercase

    return embed.domainFunctionMap[domain];
};

embed.processLinkElement = function(element) {
    var url = element.href;

    var domainSrcFunction = embed.getDomainSrcFunction(url);

    // no function found for domain
    if (!domainSrcFunction)
	return;

    var embedSrc = domainSrcFunction(url);

    // bad url
    if (!embedSrc)
	return;

    var embedElement = embed.buildEmbed(650, 350, embedSrc);
    element.parentNode.insertBefore(embedElement, element.nextSibling);
};

embed.init = function() {
    var messageElements = document.getElementsByClassName("divMessage");

    for (var i = 0; i < messageElements.length; ++i) {
	var linkElements = messageElements[i].getElementsByTagName("a");

	for (var j = 0; j < linkElements.length; ++j)
	    embed.processLinkElement(linkElements[j]);
    }
};

embed.init();
