import express from 'express'
const router = express.Router()
import db from '../mongo.js'
import { MongoClient } from 'mongodb'

import {
    getTools,
    getToolById,
    getToolsByWard,
    createTool,
    updateTool,
    deleteTool
} from '../controllers/toolController.js'

import multer from 'multer'

const lessonScheduleStorage = multer.memoryStorage()

const lessonScheduleUpload = multer({
    storage: lessonScheduleStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

const lessonScheduleUploadMiddleware = lessonScheduleUpload.single('lessonSchedule')

router.route('/').get(getTools).post(createTool)
router.route('/ward/:ward').get(getToolsByWard)
router.route('/:id').get(getToolById).put(updateTool).delete(deleteTool)

router.post('/upload/lesson-schedule', lessonScheduleUploadMiddleware, (req, res) => {
    console.log('Uploading file...');
    try {
        const file = req.file;
        const bucket = new mongodb.GridFSBucket(db, { bucketName: 'lesson-schedules' });
    
        const uploadStream = bucket.openUploadStream(file.originalname);
        const buffer = file.buffer;
    
        uploadStream.write(buffer);
        uploadStream.end();
    
        res.send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file', error);
        res.status(500).send('Error uploading file');
    }
})

export default router
