import { s3Client } from '../s3/libs/s3Client.js'
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { StartTranscriptionJobCommand, GetTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { transcribeClient } from "../transcribe/transcribeClient.js";
import upload from '../middleware/fileUpload.js';
import path from "path";
import * as fs from 'fs';
import fetch from 'node-fetch';

const URL = "http://localhost:8888/get-cfiles/";

const createParamS3 = (bucket, key, body) => {
    return {
        Bucket: bucket,
        Key: key,
        Body: body,
    }
}

const createParamTranscribe = (jobName, langCode, mediaFormat, mediaUri) => {
    return {
        TranscriptionJobName: jobName,
        LanguageCode: langCode, 
        MediaFormat: 'webm',
        Media: {
            MediaFileUri: mediaUri,
        },
    }
}

const uploadToS3 = async param => {
    try {
        const dataReturn = await s3Client.send(new PutObjectCommand(param));
        return dataReturn;
    } catch (err) {
        return err;
    }
}

const uploadToTranscribe = async param => {
    try {
        const data = await transcribeClient.send(
            new StartTranscriptionJobCommand(param)
        );

        return data
    } catch (err) {
        return err
    }
};


const uploadFile = async (req, res) => {
    try {
        await upload(req, res);

        // console.log(req.file)

        if (req.file == undefined) {
            return res.status(400).send({ message: "Choose a file to upload" });
        }

        const file = "./public/uploads/" + req.file.originalname;
        console.log(file);
        const fileStream = fs.createReadStream(file);

        const paramS3 = createParamS3("assed-test", path.basename(file), fileStream)

        await uploadToS3(paramS3)
            .then((dataReturn) => {
                console.log(dataReturn)
                const uri = "https://assed-test.s3-ap-southeast-1.amazonaws.com/" + req.file.originalname

                let jobName = Math.floor(Math.random() * 700).toString() + req.file.originalname
                const paramTranscribe = createParamTranscribe(jobName, "en-US", uri.substr((uri.lastIndexOf('.') + 1)), uri)
                
                const upload = uploadToTranscribe(paramTranscribe)
                upload.then((response) => {
                    console.log(response)
                    res.status(200).send({
                        message: jobName
                    });
                })
                    .catch(err => {
                        res.status(500).send({
                            message: `Error occured: ${err}`,
                        });
                    })
            }
            ).catch((err) => {
                res.status(500).send({
                    message: `Error occured: ${err}`,
                });
            })
    } catch (err) {

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size should be less than 5MB",
            });
        }

        res.status(500).send({
            message: `Uploadfile occured: ${err}`,
        });
    }
};


const getFilesList = (req, res) => {
    const path = "./public/uploads/";

    fs.readdir(path, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Files not found.",
            });
        }

        let filesList = [];

        files.forEach((file) => {
            filesList.push({
                name: file,
                url: URL + file,
            });
        });

        res.status(200).send(files);
    });
};

const downloadFiles = (req, res) => {
    const fileName = req.params.name;
    const path = "./public/uploads/";

    res.download(path + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "File can not be downloaded: " + err,
            });
        }
    });
};

const getRes = async jobName => {
    try {
        const data = await transcribeClient.send(
            new GetTranscriptionJobCommand(
                {
                    TranscriptionJobName: jobName
                }
            )
        );

        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

async function summzrizeText(text) {
    var resp = await deepai.callStandardApi("summarization", {
        text: text,
    });
    console.log(resp);
    // return resp
}

const getTranscribe = (req, res) => {
    const jobName = req.params.jobname
    getRes(jobName)
        .then(data => data.TranscriptionJob.TranscriptionJobStatus === "IN_PROGRESS" ?
            res.status(200).send({
                message: "IN_PROGRESS",
            })
            : (
                fetch(data.TranscriptionJob.Transcript.TranscriptFileUri)
                    .then(res => res.json())
                    .then(result => {
                        res.status(200).send({
                            transcribe: result.results.transcripts[0].transcript,
                        })
                    }
                    )
            )
        )
}

export default { uploadFile, downloadFiles, getFilesList, getTranscribe };