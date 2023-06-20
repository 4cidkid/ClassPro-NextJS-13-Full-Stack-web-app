require('dotenv').config();
import aws from 'aws-sdk'
import crypto, { randomBytes } from 'crypto'
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes)
const region = 'sa-east-1'
const bucketName = 'classprobucket'
const accessKey = process.env.S3_access_key
const secretAccess = process.env.S3_private


const s3 = new aws.S3({
    region,
    accessKey,
    secretAccess,
    signatureVersion: 'v4'
})


export default async function generateUploadUrl(){
    const imageName = ''
    const rawBytes = await randomBytes(16)
    const Key = rawBytes.toString('hex')
    const params = (
        {
            Bucket: bucketName,
            Key: imageName,
            expires:60
        }
    )

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    return uploadUrl
}