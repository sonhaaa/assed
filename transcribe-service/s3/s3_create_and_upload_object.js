
// Import required AWS SDK clients and commands for Node.js
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates Amazon S3 service client module.

// Set the parameters.
const bucketParams = {
    Bucket: "testbucketfromnodejs",
    // Specify the name of the new object. For example, 'index.html'.
    // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
    Key: "sounds.mp3",
    // Content of the new object.
    Body: "BODY",
};

// Create and upload the object to the specified Amazon S3 bucket.
const run = async () => {
    try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        return data; // For unit tests.
        console.log(
            "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
    } catch (err) {
        console.log("Error", err);
    }
};
run();

