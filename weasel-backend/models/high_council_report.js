import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const parse = (content) => {
    try {
        let headStart = content.indexOf('<head>');
        let headEnd = content.indexOf('</head>');
        if (headStart !== -1 && headEnd !== -1) {
            let head = content.substring(headStart, headEnd + 7);
            content = content.replace(head, '');
        }
        content = DOMPurify.sanitize(content);
        return content;
    } catch (e) {
        return content;
    }
};

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