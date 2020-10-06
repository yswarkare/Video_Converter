const express = require("express");
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');


router.post("/upload-video", async (req, res)=> {
    try {
        console.log(req.files.file);
        let uploadedFile = req.files.file;
        let uuid = uuidv4();
        let filename_01 = uploadedFile.name;
        let filename = filename_01.slice(0, (filename_01.length - 4));
        console.log("filename ", filename);
        let newFilename = `${filename}_${uuid}.mp4`;
        uploadedFile.mv(`./uploaded/${newFilename}`, (err)=>{
            if (err) {
                throw err;
            }
            console.log("file uploaded");
        });
        return res.status(200).json({status: true, message: "successfully uploaded video", uploadedFile, newFilename});
    } catch (err) {
        console.log(err)
        return res.status(401).json({status: false, message: `failed to upload video \n ${err}`, error: {err}});
    }
});

router.post("/resize-video", async (req, res)=> {
    try {
        console.log(req.body);
        let convertedfilename = `${req.body.filename.slice(0, (req.body.filename.length -5))}_${req.body.size}p.mp4`;
        let convertedFilePath = path.resolve(__dirname, `../uploaded/${convertedfilename}`);
        await ffmpeg(path.resolve(__dirname, `../uploaded/${req.body.filename}`))
        .size(`?x${req.body.size}`).aspect('16:9').autopad()
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('progress', function(progress) {
            console.log(`Processing: ${Math.floor(progress.percent)} % done`);
        })
        .on('end', function() {
            console.log('Processing finished !');
            res.json({status: true, message: "successfully resized video", convertedFilePath, convertedfilename});
        })
        .save(convertedFilePath);
    } catch (err) {
        console.log(err)
        return res.status(401).json({status: false, message: `failed to resize video \n ${err}`, error: {err}});
    }
});

router.patch("/download-video", async (req, res)=>{
    try {
        let file = path.resolve(__dirname, `../uploaded/${req.body.convertedfilename}_${req.body.size}p.mp4`);
        res.setHeader("Content-Type", "video/mp4");
        res.download(file, (err)=>{
            if (err){
                throw err;
            }
            console.log("file downloaded");
        })
    } catch (err) {
        console.log(err)
        return res.status(401).json({status: false, message: `failed to download video \n ${err}`, error: {err}});
    }
});


module.exports = router;