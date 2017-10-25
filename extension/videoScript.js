setTimeout(function(){
    if($("span:contains('Unlisted')")[0] != undefined) {// If it is Unlisted
        var originalId = window.location.href.replace("https://www.youtube.com/watch?v=", "");
        $.ajax({
            method: 'post',
            url: "http://127.0.0.1:8888/",
            //url: "http://yr.fwra.me/",
            data: {
                originalId: originalId,
                title: $(".title")[0].innerText,
                user: $("#owner-name a")[0].href.replace("https://www.youtube.com/channel/", ""), //TODO: Figure out how this will work with 'id' & custom channel name
                imageURL: `https://img.youtube.com/vi/${originalId}/maxresdefault.jpg`
            }
        }).done(function(res){
            console.log(res);
        });
    }
}, 2000);