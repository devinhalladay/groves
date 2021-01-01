// const axios = require("axios");
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET
});

export default async (req, res) => {
  let { name, type } = req.body;

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
    ContentType: type,
    Expires: 30 * 60
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }

    const results = {
      signedRequest: data,
      url: `https://s3.amazonaws.com/${process.env.S3_BUCKET_NAME}/${name}`
    };

    return res.status(200).json(results);
  });
};
