const axios = require("axios");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  // accessKeyId: 'YOUR_ACCESS_KEY',
  // secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: process.env.AWS_S3_REGION,
});

async function uploadImageFromURL(bucketName, objectKey, imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: response.data,
    };

    const uploadResult = await s3.upload(params).promise();
    console.log("Image uploaded successfully:", uploadResult.Location);
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  uploadImageFromURL,
};
