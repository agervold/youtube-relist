/*
var imgURL = chrome.extension.getURL('icon.png');
var html = `<div id='yt-relist'><img src='${imgURL}'><p>YouTube Relist</p></div>`;
$("#content").append(html);
*/

$.get("http://localhost:8888/x", function(json) {
    var videos = JSON.parse(json);
    var html = "";
    for (var i = 0; i < videos.length; i++) {
        var vid = videos[i];
        html += `<div><a target='_blank' href='https://www.youtube.com/watch?v=${vid.originalId}'><img src='${vid.imageURL}'><p class='title'>${vid.title}</p><p class='user'>${vid.user}</p></a></div>`
    }
    if (html == "") {
        html = "<p>Nothing was found.</p>";
    }
    $("#searchResult").html(html);
});