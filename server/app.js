const express =  require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const ffmpeg = require('fluent-ffmpeg');


const { port } = require("./config/config");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(fileUpload({
    safeFileNames: true,
    limits: { fileSize: 50 * 1024 * 1024 }
}));

ffmpeg.setFfmpegPath("C:/Program Files/ffmpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath("C:/Program Files/ffmpeg/bin/ffprobe.exe");


const convertFileRoutes = require("./routes/convertFileRoutes");

app.use("/api/convert", convertFileRoutes);

const server = http.createServer(app, (req, res)=> {
    // res.writeHead(200, {'Content-Type': 'application/json'})
});

const startServer = async () => {
    try {
        server.listen(port, ()=>{
            console.log(`server started at port http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();