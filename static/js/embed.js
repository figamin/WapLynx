function buildEmbed(width, height, src, allowFullScreen)
{
	// assuming no ES6 support? aids concat
	var html = "<iframe ";
	html += " width=\"" + width + "\"";
	html += " height=\"" + height + "\"";
	html += " src=\"" + src + "\"";
	html += " frameborder=\"0\"";

	if (allowFullScreen)
		html += " allowfullscreen";

	html += "></iframe>";

	var wrapperElement = document.createElement("div");
	wrapperElement.style.display = "inline";

	var divElement = document.createElement("div");
	divElement.style.display = "none";

	var buttonElement = document.createElement("span");
	buttonElement.innerHTML = "[Embed]";
	buttonElement.className = "embedButton glowOnHover";

	buttonElement.onclick = function()
	{
		// I don't trust javascript to not check hidden three times in the ternany version
		// then again I have no experience with javascript
		if (divElement.style.display === "none")
		{
			divElement.style.display = "block";
			divElement.innerHTML = html;
			buttonElement.innerHTML = "[Remove]";
		}

		else
		{
			divElement.style.display = "none";
			divElement.innerHTML = null;
			buttonElement.innerHTML = "[Embed]";
		}
	};

	// note: append order
	wrapperElement.appendChild(buttonElement);
	wrapperElement.appendChild(divElement);

	return wrapperElement;
}

// shared with with youtube and drop-in replacements. lazy host concat
function getSrcYoutubeCommon(host, url)
{
	var videoId = url.split("watch?v=")[1];

	if (!videoId)
		return;

	var ampersandIndex = videoId.indexOf('&');

	if (ampersandIndex != -1)
		videoId = videoId.substring(0, ampersandIndex);

	var ret = "https://" + host + "/embed/" + videoId;

	var startTime = getYouTubeStartTime(url);

	if (startTime)
	    ret += "&start=" + startTime;

	return ret;
}

function getYouTubeStartTime(url)
{
	var startTime = url.split(/(\?|&)t=/)[1];

	if (!startTime)
		return;

	var ampersandIndex = startTime.indexOf('&');

	if (ampersandIndex != -1)
		startTime = videoId.substring(0, ampersandIndex);

        var totalSeconds = 0;
	var hours = url.match(/\d+(?=h)/);
	var minutes = url.match(/\d+(?=m)/);
	var seconds = url.match(/\d+(?=s)/);

	if (hours)
		totalSeconds += parseInt(hours) * 3600;

	if (minutes)
		totalSeconds += parseInt(minutes) * 60;

	if (seconds)
		totalSeconds += parseInt(seconds);

	return totalSeconds;
}

function getSrcYouTube(url)
{
	return getSrcYoutubeCommon("www.youtube.com", url);
}

// youtu.be shortened share urls
function getSrcYouTubeShortened(url)
{
	var videoId = url.split('/')[3];

	if (!videoId)
		return;

	var questionMarkIndex = videoId.indexOf('?');

	if (questionMarkIndex != -1)
		videoId = videoId.substring(0, questionMarkIndex);

	var ret = "https://www.youtube.com/embed/" + videoId;

	var startTime = getYouTubeStartTime(url);

	if (startTime)
		ret += "?start=" + startTime;

	return ret;
}

function getSrcInvidious(url)
{
	return getSrcYoutubeCommon("www.invidio.us", url);
}

function getSrcBitChute(url)
{
	if (!url.includes("/video/"))
		return;

	var videoId = url.split('/')[4];

	if (!videoId)
		return;

	return "https://www.bitchute.com/embed/" + videoId;
}

var patternFunctions = {};
patternFunctions["youtube.com"] = getSrcYouTube;
patternFunctions["youtu.be"] = getSrcYouTubeShortened;
patternFunctions["invidio.us"] = getSrcInvidious;
patternFunctions["bitchute.com"] = getSrcBitChute;

function getGetSrcFunction(url)
{
	var hostname = url.match(/\b(?!www.)\b([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/i);

	return patternFunctions[hostname[0]];
}

function initialize()
{
	var embedButtonElements = document.getElementsByClassName("embedButton");

	for (var i = embedButtonElements.length - 1; i >= 0; --i)
	{
		var embedButtonElement = embedButtonElements[i];
		embedButtonElement.parentElement.remove();
	}

	var messageElements = document.getElementsByClassName("divMessage");

	for (var i = 0; i < messageElements.length; ++i)
	{
		var linkElements = messageElements[i].getElementsByTagName("a");

		for (var j = 0; j < linkElements.length; ++j)
		{
			var linkElement = linkElements[j];
			var url = linkElement.href;

			// get function to use for getting the embed src url
			var getSrcFunction = getGetSrcFunction(url);

			// no host matches
			if (!getSrcFunction)
				continue;

			// get embed src url
			var embedSrc = getSrcFunction(url);

			// bad url. the getSrc functions don't perform validation though
			if (!embedSrc)
				continue;

			var embedElement = buildEmbed(650, 375, embedSrc, true);
			linkElement.parentNode.insertBefore(embedElement, linkElement.nextSibling);
		}
	}
}

window.onload = initialize;
