// const axios = require("axios");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
});

export default async (req, res) => {
  let { path, name, type } = req.body;

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name, // File name you want to save as in S3
    ContentType: type,
    Expires: 30 * 60,
  };

    s3
    .getSignedUrl("putObject", params, (err, data) => {
      if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }

      const results = {
        signedRequest: data,
        url: `https://s3.amazonaws.com/${process.env.S3_BUCKET_NAME}/${name}`,
      };

      res.status(200).json(results);
    })

  // const returnData = await result.json()
  // return returnData

  // Uploading files to the bucket
  // return s3.upload(params, function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`File uploaded successfully. ${data.Location}`);

  //   return data;
  // });
};

// export default async (req, res) => {
//   let { query, variables } = await req.body;

//   query = JSON.parse(JSON.stringify(query));

//   const authURL = `https://api.are.na/graphql`;

//   try {
//     await axios
//       .post(
//         authURL,
//         {
//           ...req.body,
//         },
//         {
//           headers: {
//             authorization: `${req.headers["authorization"]}`,
//             "X-APP-TOKEN": process.env.GRAPHQL_TOKEN,
//           },
//         }
//       )
//       .then((response) => {
//         res.status(response.status).json(response.data);
//       });
//   } catch (error) {
//     console.log(error);
//     return error;
//     res.status(400).json({ message: error });
//   }
// };
