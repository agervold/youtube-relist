// Input/Label Animation
$("input").val("");
$("input").focusout(function() {
    if($(this).val() != "") {
        $(this).addClass("has-content");
        $("#search button").removeClass("disabled");
    } else {
        $(this).removeClass("has-content");
        $("#search button").addClass("disabled");
    }
});

// Search for videos based on username or video title.
$("#search button").on("click", function() {
    if (!$("#search button").hasClass("disabled")) {
        $.get("/vids?q="+$("#search input").val(), function(json) {
            var videos = JSON.parse(json);
            var html = "";
            for (var i = 0; i < videos.length; i++) {
                var vid = videos[i];
                html += `<div><a target='_blank' href='https://www.youtube.com/watch?v=${vid.originalId}'><img src='${vid.imageURL}'><p class='title'>${vid.title}</p><p class='user'>${vid.user}</p></a></div>`
            }
            for (var i = 0; i < videos.length; i++) {
                var vid = videos[i];
                html += `<div><a target='_blank' href='https://www.youtube.com/watch?v=${vid.originalId}'><img src='${vid.imageURL}'><p class='title'>${vid.title}</p><p class='user'>${vid.user}</p></a></div>`
            }
            if (html == "") {
                html = "<p>Nothing was found.</p>";
            }
            $("#searchResult").html(html);
        });
    }
});

// Check if Chrome Extension is installed, if it's not, prompt the user to download it.
setTimeout(function() {
    if ($("#isExtensionInstalled").length == 0 && !!window.chrome && !!window.chrome.webstore) {
        $("#shader, #download").show();
    }
}, 1000);

$("#shader, .close_container, #download button").on("click", function() {
    $("#shader, #download").hide();
});

/* Livecounter for unlisted videos.
var counter = 7;
var ones = $("#ones");
var tens = $("#tens");
var hundreds = $("#hundreds");
var thousands = $("#thousands");

function update(num) {
    var count = 0;
    counter += num;
    var updateInterval = setInterval(function() {
        var val1 = parseInt(ones.text());
        if (val1 < 9) {
            ones.text(++val1);
            count++;
        } else {
            ones.text(0);
            var val10 = parseInt(tens.text());
            if (val10 < 9) {
                tens.text(++val10);
                count++;
            } else {
                tens.text(0);
                var val100 = parseInt(hundreds.text());
                if (val100 < 9) {
                    hundreds.text(++val100);
                    count++;
                } else {
                    hundreds.text(0);
                    var val1000 = parseInt(thousands.text());
                    if (val1000 < 9) {
                        thousands.text(++val1000);
                        count++;
                    }
                }
            }
        }
        if (count == num) clearInterval(updateInterval);
    }, 100);
}

var automaticallyUpdate = setInterval(function() {
    $.get("/counter", function(num) {
        if (counter-num > 0)
        update(counter-num);
    });
}, 10000);
*/