import mongoose from 'mongoose'

const highCouncilReportSchema = new mongoose.Schema({
    counselor: String,
    week: String,
    content_text: String,
    content_link: String
})

highCouncilReportSchema.pre('save', function (next) {
    this.content_text = this.content_text.replace(/<script>/gi, '')
    this.content_text = this.content_text.replace(/<\/script>/gi, '')
    this.content_text = this.content_text.replace(/<\*script\*>/gi, '')
    this.content_text = this.content_text.replace(/<\/\*script\*>/gi, '')
    this.content_text = this.content_text.replace(/<\?php>/gi, '')
    this.content_text = this.content_text.replace(/<\?php/gi, '')
    this.content_text = this.content_text.replace(/<iframe>/gi, '')
    this.content_text = this.content_text.replace(/<\/iframe>/gi, '')
    this.content_text = this.content_text.replace(/<frame>/gi, '')
    this.content_text = this.content_text.replace(/<\/frame>/gi, '')
    this.content_text = this.content_text.replace(/<frameset>/gi, '')
    this.content_text = this.content_text.replace(/<\/frameset>/gi, '')
    this.content_text = this.content_text.replace(/<object>/gi, '')
    this.content_text = this.content_text.replace(/<\/object>/gi, '')
    this.content_text = this.content_text.replace(/<embed>/gi, '')
    this.content_text = this.content_text.replace(/<\/embed>/gi, '')
    this.content_text = this.content_text.replace(/<applet>/gi, '')
    this.content_text = this.content_text.replace(/<\/applet>/gi, '')

    this.content_text = this.content_text.replace(/style="[^"]*"/gi, '')
    this.content_text = this.content_text.replace(/on\w+="[^"]*"/gi, '')
    this.content_text = this.content_text.replace(/on\w+='[^']*'/gi, '')

    this.content_text = this.content_text.replace(/<a href="[^"]*" download>/gi, '')
    this.content_text = this.content_text.replace(/<a href='[^']*' download>/gi, '')

    let headStart = this.content_text.indexOf('<head>')
    let headEnd = this.content_text.indexOf('</head>')
    if (headStart !== -1 && headEnd !== -1) {
        let head = this.content_text.substring(headStart, headEnd + 7)
        this.content_text = this.content_text.replace(head, '')
    }
    next()
})

const HighCouncilReport = mongoose.model('HighCouncilReport', highCouncilReportSchema)
export default HighCouncilReport