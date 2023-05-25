import sharp from 'sharp';

export default function imageResizeService() {
  const standardSize = (buffer) => sharp(buffer).resize({ height: 1920, width: 1000, fit: 'contain' }).toBuffer();
  return {
    standardSize,
  };
}
