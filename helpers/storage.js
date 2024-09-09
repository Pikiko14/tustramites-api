const fs = require('fs');
var AWS = require('aws-sdk');
const uuid = require("uuid").v4;
const path = require("path");
const { encode } = require('punycode');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY, 
    region: "us-east-1" 
})

const s3 = new AWS.S3();

module.exports = {
    get(url, access) {

        return new Promise((resolve, reject) => {
            try {
                const bucket = access == 1 ? 'tustramites-private' : 'tustramites-public';

                const filename = url.replace(/^.*\/\/[^\/]+/, '').replace('/', '');
            
                const params = {
                    Bucket: bucket,
                    Key: filename
                };

                s3.getObject(params, function(err, file) {
                    if (err) {
                        reject(err);
                    }
                    resolve(file && file.Body);
                });
            } catch (err) {
                reject(err);
            }
        })
        
    },
    getUrl(url, access) {

        return new Promise((resolve, reject) => {
            try {
                const bucket = access == 1 ? 'tustramites-private' : 'tustramites-public';

                const filename = url.replace(/^.*\/\/[^\/]+/, '').replace('/', '');

                const signedUrlExpireSeconds = 60 * 1

                const params = {
                    Bucket: bucket,
                    Key: filename,
                    Expires: signedUrlExpireSeconds
                };
            
                s3.getSignedUrlPromise('getObject', params).then((url) => {
                    resolve(url);
                });
            } catch (err) {
                reject(err);
            }
        })
        
    },
    save(file, access, context) {

        return new Promise((resolve, reject) => {
            try {
                const bucket = access == 1 ? 'tustramites-private' : 'tustramites-public';
    
                const folder = context;
                
                const fileContent  = Buffer.from(file.data, 'binary');
            
                const params = {
                    Bucket: bucket,
                    Key: folder + "/" + uuid() + path.extname(file.name),
                    Body: fileContent 
                };
            
                s3.upload(params, function(err, data) {
                    if (err) {
                        throw err;
                    }
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        })
       
    },
    delete(url, access) {

        return new Promise((resolve, reject) => {
            try {
                const bucket = access == 1 ? 'tustramites-private' : 'tustramites-public';

                const filename = url.replace(/^.*\/\/[^\/]+/, '').replace('/', '');

                const params = {
                    Bucket: bucket,
                    Key: filename,
                };
            
                s3.deleteObject(params, function(err, data) {
                    if (err) {
                        throw err;
                    }
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        })
        
    },
    download(listFiles, access) {

        return new Promise((resolve, reject) => {
        
            let result = [];

            for(var i=0; i < listFiles.length; i++) {
                const file = listFiles[i]; 
                result.push(this.get(file, 1));
            }

            Promise.all(result).then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
        })
        /*return new Promise((resolve, reject) => {
            try {
                const bucket = access == 1 ? 'tustramites-private' : 'tustramites-public';

                //const resultFile = [];

                for(var i=0; i < listFiles.length; i++) {

                    const file = listFiles[i]; 
                    const filename = file.replace(/^.*\/\/[^\/]+/, '').replace('/', '');
                    

                    const params = {
                        Bucket: bucket,
                        Key: filename
                    };
                    
                    s3.getObject(params, function(err, file) {
                        if (err) {
                            reject(err);
                        }
    
                        resolve(file);
                    })
                }
                
            } catch (err) {
                
                reject(err);
            }
        })*/
        
    }
}