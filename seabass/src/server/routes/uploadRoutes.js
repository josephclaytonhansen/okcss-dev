import db from '../mongo.js'
import axios from 'axios'
import multer from 'multer'
const upload = multer({dest: 'tmp/'})
import sharp from 'sharp'
import imageSize from 'image-size'
import User from '../models/userModel.min.js'

import fs from 'fs'

import express from 'express'
const router = express.Router()

router.post('/upload-image', upload.single('streamfile'), async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        if (req.fileValidationError) {
            return res.status(400).json({
                message: req.fileValidationError,
            })
        }
        // get the file from the request
        console.log(req.file)
        const file = req.file
        if (!file) {
            return res.status(400).json({
                message: 'Please upload a file',
            })
        }

        const imageFile = req.file.path

        let dimensions = imageSize(imageFile)
        let width = dimensions.width
        let height = dimensions.height

        let resizedImage = null

        if (width > 1080) {
            resizedImage = await sharp(imageFile).resize(1080).jpeg({
                quality: 95
            }).toBuffer()
            dimensions = imageSize(resizedImage)
            width = dimensions.width
            height = dimensions.height
        } else {
            resizedImage = await sharp(imageFile).jpeg({
                quality: 95
            }).toBuffer()
        }

        const thumb = await sharp(imageFile).resize(200, 200).jpeg({
            quality: 60
        }).toBuffer()

        const resizedBase64 = resizedImage.toString('base64')

        let image_string = "data:" + file.mimetype + ";base64," + resizedBase64
        let thumb_string = "data:" + file.mimetype + ";base64," + thumb.toString('base64')

        let thumb_id = null
        await db.collection('uploads').insertOne({
            image: thumb_string,
            width: 200,
            height: 200,
            filename: file.originalname,
            type: 'image/jpeg',
            slug: "thumbnail-" + file.originalname.replace(/\s+/g, '-').toLowerCase(),
            size: thumb_string.length,
            date: new Date().toDateString(),
            url: process.env.ORIGIN + "/uploaded-media/thumbnail-" + file.originalname.replace(/\s+/g, '-').toLowerCase(),
        }).then((result) => {
            thumb_id = result.insertedId
        })

        await db.collection('uploads').insertOne({
            image: image_string,
            width: width,
            height: height,
            filename: file.originalname,
            type: 'image/jpeg',
            size: image_string.length,
            slug: file.originalname.replace(/\s+/g, '-').toLowerCase(),
            thumbnail: new db.ObjectId(thumb_id),
            date: new Date().toDateString(),
            url: process.env.ORIGIN + "/uploads/" + file.originalname.replace(/\s+/g, '-').toLowerCase(),

        }).then((result) => {
            req.session.thumbnails = null
            res.redirect('/dashboard')
        })

    }
})

router.get('/uploaded-media', async (req, res) => {
    let files = await db.collection('uploads').find({
        thumbnail: {
            $exists: true
        }
    }).toArray()
    //return all _ids
    let file_ids = []
    let file_slugs = []
    files.forEach((file) => {
        file_ids.push(file._id)
        file_slugs.push(file.slug)
    })
    res.json({
        "ids": file_ids,
        "slugs": file_slugs
    })
})

router.get('/uploaded-media-thumbnails', async (req, res) => {
    let files = await db.collection('uploads').find({
        thumbnail: {
            $exists: false
        }
    }).toArray()
    //return all _ids
    let file_ids = []
    let file_slugs = []
    files.forEach((file) => {
        file_ids.push(file._id)
        file_slugs.push(file.slug)
    })
    res.json({
        "ids": file_ids,
        "slugs": file_slugs
    })
})

router.get('/uploaded-media/:slug', async (req, res) => {
    await db.collection('uploads').findOne({
        slug: req.params.slug
    }).then((file) => {
        //Display the chunks using the data URI format          
        let finalFile = 'data:' + file.type + ';base64,' +
            file.image

        res.json({
            "image": file.image,
            "filename": file.filename,
            "type": file.type,
            "size": file.size,
            "width": file.width,
            "height": file.height,
            "id": file._id,
            "url": file.url,
            "slug": file.slug,
            "date": file.date
        })
    })
})

router.get('/uploads/:slug', async (req, res) => {
    await db.collection('uploads').findOne({
        slug: req.params.slug
    }).then((img)=>{
        res.contentType(img.type)
        //img.image looks like this: "data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHB..."
        //send this as an image file 
        res.send(Buffer.from(img.image.split(',')[1], 'base64'))
    })
})

export default router