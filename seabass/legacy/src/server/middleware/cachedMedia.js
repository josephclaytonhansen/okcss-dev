import axios from 'axios'

const cachedMedia = async (req, res) => {
    let cached_media = null
    if (!req.session.cached_media) {
        cached_media = {}
        let ids = await axios.get('https://localhost:5920/uploaded-media-ids')
        for (let i = 0; i < ids.data.ids.length; i++) {
            let id = ids.data.ids[i]
            let file = await axios.get('https://localhost:5920/uploaded-media/' + id)
            cached_media[id] = {
                image: file.data.image,
                filename: file.data.filename
            }
        }

        req.session.cached_media = cached_media
    } else {
        cached_media = req.session.cached_media

    }
    return cached_media
}

export default cachedMedia