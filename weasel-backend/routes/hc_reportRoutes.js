import express from 'express'
import nodemailer from 'nodemailer'
import db from '../mongo.js'

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM_USERNAME,
      pass: process.env.EMAIL_FROM_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

const sendHcMail = (email) => {
    try{
    transporter.sendMail({
        from: 'internal@josephhansen.dev',
      to: email, 
      subject: 'A new high council report is available for you to review',
      text: 'A new report has been added at https://highcouncil.okcsouthstake.org. You can view it there- as a reminder, the current access pin is 398504.\nDO NOT REPLY TO THIS EMAIL'
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })} catch (error) {
        console.log(error)
    }
}

const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()

import {
    getHighCouncilReports,
    getHighCouncilReportById,
    getHighCouncilReportsByCounselor,
    getHighCouncilReportsByWeek,
    createHighCouncilReport,
    deleteHighCouncilReport,
    updateHighCouncilReport
} from '../controllers/hc_reportController.js'


router.route('/').post(getHighCouncilReports)
router.route('/:id').get(getHighCouncilReportById).delete(deleteHighCouncilReport).put(updateHighCouncilReport)
router.route('/counselor/:counselor').get(getHighCouncilReportsByCounselor)
router.route('/week/:week').get(getHighCouncilReportsByWeek)
const hc_pin = process.env.HC_PIN
router.route('/pin/check').post((req, res) => {
    if (req.body.pin === hc_pin) {
        res.status(200).send({ message: 'Valid PIN' })
    } else {
        res.status(401).send({ message: 'Invalid PIN' })
    }
})

router.route('/create/new').post(
    () => {
        try {
        db.getHighCouncilEmails().then((emails) => {
            emails.forEach((email) => {
                sendHcMail(email)
            })
        })
        createHighCouncilReport} catch (error) {
            console.log(error)
        }
    }

)

export default router
