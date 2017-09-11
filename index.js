'use strict'

const micro = require('micro')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const HttpHash = require('http-hash')
const ext = require('file-extension')
const config = require('./config')

const s3 = new aws.S3({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey
})
const hash = HttpHash()
const { send } = micro

const storage = multerS3({
  s3: s3,
  bucket: config.aws.bucketName,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

const upload = multer({ storage: storage }).single('picture')

hash.set('POST /', async (req, res) => {
  let src
  upload(req, res, err => {
    if (err) {
      return send(res, 500, {error: `Error Uploading file: ${err.message} // ${req}`})
    }
    src = req.file.location
    send(res, 201, {url: src})
  })
})

module.exports = async function main (req, res) {
  let { method, url } = req
  let match = hash.get(`${method.toUpperCase()} ${url}`)

  if (match.handler) {
    try {
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    send(res, 404, { error: 'route not found' })
  }
}
