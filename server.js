const express = require("express");
const upload = require("./helpers/imageUpload");
const { resizeImages } = require("./controllers/resizeController.js");

const app = express();

app.use(express.static("public"));

app.post("/upload", (req, res) => {
  upload.array("images", 10)(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const resizedImagesInfo = await resizeImages(req.files);
      res.json({
        message: "Images uploaded and resized successfully!",
        resizedImagesCount: resizedImagesInfo,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error processing images" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
