import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

export const listImages = express.Router();

listImages.get(
    '/',
    async (req: Request, res: Response): Promise<void> => {
        const imagesFolder = `${path.resolve(__dirname, '../../../Images/full')}`;
        const files: string[] | null = await fs.readdir(imagesFolder).catch(() => {
            res.status(500).send('Error occured reading the images');
            return null;
        });

        if (!files) {
            return;
        }

        const htmlResponse = `
    <h1>Available images</h1>
    <p>Below you can find all images that are accessible via the route /api/images</p>
    <ul>
      ${files.map((file: string) => `<li>${file}</li>`)}
    </ul>
`;

        res.status(200).send(htmlResponse);
    },
);
