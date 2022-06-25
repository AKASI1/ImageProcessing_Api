import path from 'path';
import imageHelper from '../../functions/ImageResizing';

const fullImagePath = path.resolve(__dirname, '../../../Images/full/fjord.jpg');

describe('The imageResizer function', (): void => {
    it('returns a buffer after sucessfully resizing an image', async () => {
        const imageBuffer: Buffer = await imageHelper.resizeImage({
            height: 100,
            width: 150,
            fullImagePath,
            filename: 'fjord',
        });
        expect(imageBuffer).toBeInstanceOf(Buffer);
    });

    it('rejects promise if something went wrong', async (): Promise<void> => {
        await expectAsync(
            imageHelper.resizeImage({
                height: 100,
                width: 150,
                fullImagePath: '',
                filename: 'fjord',
            }),
        ).toBeRejected();
    });
});
