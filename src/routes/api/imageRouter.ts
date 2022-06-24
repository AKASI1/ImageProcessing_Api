import express, { Request, Response } from 'express';
import fs from 'fs';
import { Stats } from 'fs';
import path from 'path';
import sharp from 'sharp';

export const resizeImage = express.Router();

resizeImage.get(
    '/',
    async (req: Request, res: Response): Promise<void> => {
        const cashesPath = path.resolve(__dirname, '../../../Images/cashes');

        if (!fs.existsSync(cashesPath)) {
            fs.mkdirSync(cashesPath);
        }

        const filename = req.query['filename'];

        const height = req.query['height'] ? parseInt(req.query['height'] as string) : null;
        const width = req.query['width'] ? parseInt(req.query['width'] as string) : null;

        if (!filename || !height || !width) {
            res.status(400).send('Please enter a valid URL containg the filename, height and the width parameters :)');
            return;
        }

        const fullImagePath = `${path.resolve(__dirname, `../../../Images/full/${filename}.jpeg`)}`;

        const cashImagePath = `${path.resolve(__dirname, `../../../Images/cashes/${filename}.jpeg`)}`;

        const fullImage: Stats | null = await fs.promises.stat(fullImagePath).catch(() => {
            res.status(404).send('Image not found');
            return null;
        });

        if (!fullImage) {
            return;
        }

        const cashImage: Stats | null = await fs.promises.stat(cashImagePath).catch(() => {
            return null;
        });

        if (cashImage) {
            fs.promises.readFile(cashImagePath).then(data => {
                res.status(200)
                    .contentType('jpeg')
                    .send(data);
            });
        } else {
            const data: Buffer | null = await fs.promises.readFile(fullImagePath).catch(() => null);

            if (!data) {
                return;
            }
            const resizedImage = await sharp(data)
                .resize(width, height)
                .toBuffer()
                .catch(() => null);
            if (!resizedImage) {
                res.status(500).send("Can't resize the image, please try again :)");
                return;
            }
            fs.promises
                .writeFile(
                    `${path.resolve(__dirname, `../../../Images/cashes/${filename}${width}_${height}.jpeg`)}`,
                    resizedImage,
                )
                .then(() => {
                    res.status(200)
                        .contentType('jpeg')
                        .send(resizedImage);
                })
                .catch(() => {
                    res.status(500).send("Can't Process the image :(");
                });
        }
    },
);
