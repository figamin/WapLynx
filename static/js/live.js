var checkStatus = $.ajax({
    url: 'https://api.twitch.tv/helix/streams?user_id=116492030',
    beforeSend: function(xhr) {
	xhr.setRequestHeader("Client-ID", "28gsvga4igho3vigzluzsg7wdis0ji")},
    success: function(data){
	console.log(data);
	//process the JSON data etc

	if (checkStatus.responseJSON.data.length === 0) {
	    document.getElementById("navLive").style.display = "none";
	}

	else if (checkStatus.responseJSON.data.length != 0) {
	    document.getElementById("navLive").style.display = "inline";
	}

    }
});
