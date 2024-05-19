import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const now = new Date().getTime();
    const [, extension] = file.mimetype.split("/");
    const filename = `${now}.${extension}`;
    cb(null, filename);
  },
});

export const storageMiddleware = multer({ storage });
