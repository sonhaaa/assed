import express from 'express';
const router = express.Router();

import controller from '../controller/fileUpload.controller.js';

let routes = (app) => {
  router.post("/upload-file", controller.uploadFile)

  router.get("/files", controller.getFilesList)

  router.get("/files/:name", controller.downloadFiles)

  router.get("/transcribe/:jobname", controller.getTranscribe)

  app.use(router);
};

export default routes;