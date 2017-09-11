

## Required ENV variables:
  ```
  AWS_ACCESS_KEY
  AWS_SECRET_KEY
  AWS_BUCKET_NAME
  ```
#### You can change de port with ENV Variable
```
PORT
```
### for upload file the input name should be 'file' and enctype should be 'multipart/form-data'
```html
<form enctype="multipart/form-data"  id="formUpload"  method="post">
    <div id="fileName" >
      <span>upload picture</span>
      <input name="file" id="file" type="file" />
    </div>
    <button type="submit" > upload</button>
    <script>

    </script>
  </form>
```

### return
```
{"url": "https://YOUR_BUCKET.s3.amazonaws.com/YOUR_FILE"}
```

### Example file upload json:
```  read: [Function],
  file:
   { fieldname: 'picture',
     originalname: 'fotodiony.jpg',
     encoding: '7bit',
     mimetype: 'image/jpeg',
     size: 5228,
     bucket: 'test-uploader-sago2k8',
     key: '1505096640009.jpg',
     acl: 'public-read',
     contentType: 'application/octet-stream',
     contentDisposition: null,
     storageClass: 'STANDARD',
     serverSideEncryption: null,
     metadata: { fieldName: 'picture' },
     location: 'https://test-uploader-sago2k8.s3.amazonaws.com/1505096640009.jpg',
     etag: '"47edcdd04d0c0c9202de7b22306358f2"' },
  __onFinished: null }```
