setInterval(function(){ 
    const posts = document.getElementsByClassName("uploadDetails");
    if(posts[0].textContent.slice(-3) !== "NAO")
    {
        for(let i = 0; i < posts.length; i++)
        {
            let sauceLink = document.createElement('a');
            sauceLink.innerHTML = " SauceNAO"
            sauceLink.href = "https://saucenao.com/search.php?url=" + posts[i].getElementsByClassName('originalNameLink')[0]
            sauceLink.target="_blank"
            posts[i].appendChild(sauceLink)
        }
    }    
}, 1000);