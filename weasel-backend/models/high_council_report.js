const parse = (content) => {
    content = content.replace(/<script>/gi, '')
    content = content.replace(/<\/script>/gi, '')
    content = content.replace(/<\*script\*>/gi, '')
    content = content.replace(/<\/\*script\*>/gi, '')
    content = content.replace(/<\?php>/gi, '')
    content = content.replace(/<\?php/gi, '')
    content = content.replace(/<iframe>/gi, '')
    content = content.replace(/<\/iframe>/gi, '')
    content = content.replace(/<frame>/gi, '')
    content = content.replace(/<\/frame>/gi, '')
    content = content.replace(/<frameset>/gi, '')
    content = content.replace(/<\/frameset>/gi, '')
    content = content.replace(/<object>/gi, '')
    content = content.replace(/<\/object>/gi, '')
    content = content.replace(/<embed>/gi, '')
    content = content.replace(/<\/embed>/gi, '')
    content = content.replace(/<applet>/gi, '')
    content = content.replace(/<\/applet>/gi, '')

    content = content.replace(/style="[^"]*"/gi, '')
    content = content.replace(/on\w+="[^"]*"/gi, '')
    content = content.replace(/on\w+='[^']*'/gi, '')

    content = content.replace(/<a href="[^"]*" download>/gi, '')
    content = content.replace(/<a href='[^']*' download>/gi, '')

    let headStart = content.indexOf('<head>')
    let headEnd = content.indexOf('</head>')
    if (headStart !== -1 && headEnd !== -1) {
        let head = content.substring(headStart, headEnd + 7)
        content = content.replace(head, '')
    }

    return content
}

import mongoose from 'mongoose'

const highCouncilReportSchema = new mongoose.Schema({
    counselor: String,
    week: String,
    unit_attended: String,
    releases_issued: String,
    callings_extended: String,
    pulpit_business_releases: String,
    pulpit_business_sustainings: String,
    ordainings_and_settings_apart: String,
    meeting_information: String
})

highCouncilReportSchema.pre('save', function (next) {

    next()
})

const HighCouncilReport = mongoose.model('HighCouncilReport', highCouncilReportSchema)
export default HighCouncilReport