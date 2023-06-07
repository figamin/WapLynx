$.getJSON('https://www.wapchan.org/meta/res/670.json', function(data) {
    let i = data.posts.length - 1;
    while (data.posts[i].signedRole !== "Admin")
    {
        i -= 1;
    }
    let d = Date(data.posts[i].creation)
    document.getElementById("annoHeader").innerText = data.posts[i].subject + " by "
    + data.posts[i].name + " on " + d.toLocaleString('en-US');
    document.getElementById("annoMessage").innerText = data.posts[i].message;
});