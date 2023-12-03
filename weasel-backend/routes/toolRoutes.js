import express from 'express'
const router = express.Router()

import {
    getTools,
    getToolById,
    getToolsByWard,
    createTool,
    updateTool,
    deleteTool
} from '../controllers/toolController.js'

import multer from 'multer'

const lessonScheduleStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/lesson-schedules')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

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

router.route('/upload/lesson-schedule').post((req, res) => {
    lessonScheduleUploadMiddleware(req, res, (err) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error uploading file')
        } else {
            res.status(200).send('File uploaded')
        }
    })
})

export default router
