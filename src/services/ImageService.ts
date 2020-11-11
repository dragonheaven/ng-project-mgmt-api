import sharp from 'sharp';
import fs from 'fs';
import { IPhoto } from 'ProductsController.ts';
import { IImage } from '../controllers/CategoryController';

export async function handleUploadedImage(prefix: string, fileName: string): Promise<IImage> {
  try {
    const splitNames = fileName.split('.');
    splitNames.pop();
    const newFileName = splitNames.join('.');

    const sharpImage = await sharp(`./uploads/${fileName}`);
    const metaInfo = await sharpImage.metadata();

    await sharpImage.resize(250, 250).toFile(`./uploads/${prefix}-${newFileName}-normal.png`);

    await sharpImage.resize(1280, 1280).toFile(`./uploads/${prefix}-${newFileName}-original.png`);

    // await fs.unlinkSync(`./uploads/${fileName}`);

    return {
      image: `${prefix}-${newFileName}-original.png`,
      imageNormal: `${prefix}-${newFileName}-normal.png`,
      imageAspectRatio: metaInfo.width / metaInfo.height
    };
  } catch (err) {
    console.error(err);
  }
}

export async function handleUploadedPhoto(prefix: string, fileName: string): Promise<IPhoto> {
  try {
    const splitNames = fileName.split('.');
    splitNames.pop();
    const newFileName = splitNames.join('.');

    const sharpImage = await sharp(`./uploads/${fileName}`);

    await sharpImage.resize(600, 800).toFile(`./uploads/${prefix}-${newFileName}-normal.png`);

    await sharpImage.resize(300, 400).toFile(`./uploads/${prefix}-${newFileName}-thumb.png`);

    return {
      profilePhoto: fileName,
      profilePhotoNormal: `${prefix}-${newFileName}-normal.png`,
      profilePhotoThumb: `${prefix}-${newFileName}-thumb.png`
    };
  } catch (err) {
    console.error(err);
  }
}

export async function removeImage(fileName: string) {
  try {
    await fs.unlinkSync(`./uploads/${fileName}`);
  } catch (err) {
    console.error(err);
  }
}
