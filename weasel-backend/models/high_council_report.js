const parse = (content) => {
    try{
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
} catch (e) {
    return content

}
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
    const fieldsToParse = ['unit_attended', 'releases_issued', 'callings_extended', 'pulpit_business_releases', 'pulpit_business_sustainings', 'ordainings_and_settings_apart', 'meeting_information']
    
    fieldsToParse.forEach(field => {
        this[field] = parse(this[field])
    })

    next()
})

const HighCouncilReport = mongoose.model('HighCouncilReport', highCouncilReportSchema)
export default HighCouncilReport