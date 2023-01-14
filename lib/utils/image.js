import { s3 } from "/lib/aws";
import fs from "fs";

export default async function uploadImage(file, userId, pictureType) {
    const blob = fs.readFileSync(file.path);

    var params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
        Body : blob,
        Key : `${userId}/${pictureType}-${file.originalFilename}`
    };
    
    const uploadedImage = await s3.upload(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        if (data) {
            console.log("Uploaded in:", data.Location);
        }
    }).promise();

    return uploadedImage.Location
}