import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js";

// Set the bucket parameters.
const bucketParams = { Bucket: "testbucketfromnodejs" };

// Create the Amazon S3 bucket.
const run = async () => {
    try {
        const data = await s3Client.send(new CreateBucketCommand(bucketParams));
        console.log("Success", data.Location);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};
run();