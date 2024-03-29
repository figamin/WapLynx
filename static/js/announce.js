$.getJSON('https://wapchan.org/meta/res/713.json', function(data) {
    let i = data.posts.length - 1;
    while (data.posts[i].signedRole !== "Admin" && data.posts[i].subject === null)
    {
        i -= 1;
    }
    let d = new Date(data.posts[i].creation)
    /*let subj = data.posts[i].subject;
    if (subj == null)
    {
    document.getElementById("annoHeader").innerText = data.posts[i].name + " on "
    + d.toLocaleDateString() + " at " + d.toLocaleTimeString();
    }
    else*/
    document.getElementById("annoTitle").innerHTML = data.posts[i].subject + "<span style='float:right'>" + "by " + data.posts[i].name + " on " + d.toLocaleDateString() + " at " + d.toLocaleTimeString() + "</span>";
    //document.getElementById("annoSubtitle").innerText = ;
    if (data.posts[i].message.length > 100) {
        document.getElementById("annoMessage").innerText = data.posts[i].message.substring(0, 100) + "...";
    }
    else {
        document.getElementById("annoMessage").innerText = data.posts[i].message;
    }
    
    document.getElementById("annoImage").src = data.posts[i].files[0].path;
    document.getElementById("annoImage").title = data.posts[i].files[0].originalName;
    document.getElementById("annoLink").href = "https://wapchan.org/meta/res/713.html#" + data.posts[i].postId;
    document.getElementById("annoLink").innerText = "Discuss..."
});
