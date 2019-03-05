const express = require('express')
const app = express()
var ffmpeg = require('fluent-ffmpeg');
var random = require('random-name');
var cors = require('cors');

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
      res.send('http://18.222.144.126:3001/' + fileName)
      console.log('Processing finished !');
    })
    .save(`./public/${fileName}`);
})

app.listen(3001, () => console.log('app listening on port 3001!'))