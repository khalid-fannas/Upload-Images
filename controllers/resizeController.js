const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const sizes = [1000, 600, 200, 60];

function ensureSizeFolders(baseDir) {
  for (const size of sizes) {
    const dir = path.join(baseDir, size.toString());
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

async function resizeImages(files) {
  const resizedBaseDir = "./public/resized";

  ensureSizeFolders(resizedBaseDir);

  for (const file of files) {
    const originalPath = file.path;
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.filename, ext);

    for (const size of sizes) {
      const outputDir = path.join(resizedBaseDir, size.toString());
      const outputFilename = `${baseName}${ext}`;
      const outputPath = path.join(outputDir, outputFilename);

      await sharp(originalPath).resize({ width: size }).toFile(outputPath);
    }
  }

  return files.length;
}

module.exports = { resizeImages };
