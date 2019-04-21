const express = require('express')
const app = express()
var ffmpeg = require('fluent-ffmpeg');
var random = require('random-name');
var cors = require('cors');
var exec = require("shelljs").exec;

setInterval(() => {
  exec('rm -rf ./public/*')
}, 1000 * 60 * 60 * 24)

app.use(cors());
app.use(express.static('public'))
app.get('/convert', (req, res) => {
    const fileName=`${random.first()}-${random.first()}-${random.first()}.mp4`

    ffmpeg(req.query.link)
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
      res.send('https://videoconverter.bermi.tv/' + fileName)
      console.log('Processing finished !');
    })
    .save(`./public/${fileName}`);
})

app.listen(3001, () => console.log('app listening on port 3001!'))