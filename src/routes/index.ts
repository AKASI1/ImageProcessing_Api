import express from "express";
import { resizeImage } from "./api/imageRouter";
import { listImages } from "./api/listImagesRouter";

export const Router = express.Router();

Router.use("/listimages", listImages);

Router.use("/image", resizeImage);
