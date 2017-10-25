var // Dependencies
express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
mongoose = require('mongoose'),
request = require('request'),
videoSchema = require('./models/videoSchema');

const apiKey = "AIzaSyBRc0PKkpL42tUMmRbjTdfe9t7VwMTKDN8";

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app
.use(express.static(__dirname + '/public'))
.use(bodyParser.urlencoded({ extended: false }))
//.use(cookieParser());

// Gemmer Altid channelId fra videoer
// /user/x/videos X er for det meste et brugernavn, men kan også være et channelId
// Når man går ind på en kanal, hvis det er channelId, så kører man bare derfra
// Hvis det er et brugernavn, søger man på brugernavnet på YT API og får channelId

app.get('/', function(req, res) {    
    //videoSchema.find(function(err, videos) {
        res.render('index', {videos: videos.length});
    //});
});


app.get('/videos/:type/:user', function(req, res) {
    
    //var user = "sodapoppin33";
    //user = "UCtu2BCnJoFGRBOuIh570QWw";
    var user = req.params.user;
    if (req.params.type === "channel") {
        videoSchema.find({user: user}, function(err2, videos) {
            res.end(JSON.stringify(videos));
        });
    } else {
        var options = {
            url: `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${user}&key=${apiKey}`,
            headers: { 'Referer': 'http://fwra.me/' }
        };
        request(options, function(err, res2, id) {
            videoSchema.find({user: JSON.parse(id).items[0].id}, function(err2, videos) {
                res.end(JSON.stringify(videos));
            });
        });
    }
});


app.get('/vids', function(req, res) {
    var q = req.query.q;

    videoSchema.find({$or:[ {user: q}, {title: q} ]}, function(err, videos) {
        res.end(JSON.stringify(videos));
    });
});


app.get('/counter', function(req, res) {
    videoSchema.find(function(err, videos) {
        res.end(videos.length+"");
    });
});


app.post('/', function(req, res) {
    
    videoSchema.findOne({originalId: req.body.originalId}, function(err, video) {
        if (video == null) {
            var newVideo = videoSchema({
                originalId: req.body.originalId,
                title: req.body.title,
                user: req.body.user,
                imageURL: req.body.imageURL
            });
            
            newVideo.save(function(err){
                if (err) throw err;
                console.log(`Video '${req.body.title}' has been added.`);
                res.end("The video has been added to YoutubeRelist.");
            });
        } else {
            res.end("The video has already been added to YoutubeRelist.");
        }
    });

});

// mongoose
mongoose.connect('mongodb://localhost/youtuberelist');

console.log('Listening on 8888');

app.listen(8888);
