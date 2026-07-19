const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = async (file, options = {}) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: options.folder || "portfolio-cms",
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });

            }
        );

        streamifier
            .createReadStream(file.buffer)
            .pipe(stream);

    });
};

module.exports = uploadImage;