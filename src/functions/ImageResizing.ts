import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

interface ResizeImageProps {
    width: number;
    height: number;
    fullImagePath: string;
    filename: string;
}

const resizeImage = async ({ width, height, fullImagePath, filename }: ResizeImageProps): Promise<Buffer> => {
    const data: Buffer | null = await fs.readFile(fullImagePath).catch(() => null);

    if (!data) {
        return Promise.reject();
    }

    const imageBuffer: Buffer | null = await sharp(data)
        .resize(width, height)
        .toBuffer()
        .catch(() => null);

    if (!imageBuffer) {
        return Promise.reject();
    }

    return fs
        .writeFile(
            `${path.resolve(__dirname, `../../Images/cashes/${filename}_${width}_${height}.jpeg`)}`,
            imageBuffer,
        )
        .then(() => {
            return imageBuffer;
        })
        .catch(() => {
            return Promise.reject();
        });
};

export default { resizeImage };
