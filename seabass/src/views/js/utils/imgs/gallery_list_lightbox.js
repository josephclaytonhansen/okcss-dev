function lightboxModal(image){
    let modal = $('<div>')
    modal.addClass('lightbox-modal')

    let inner = $('<div>')
    inner.addClass('lightbox-modal-inner')
    modal.append(inner)

    let background = $('<div>')
    background.addClass('lightbox-modal-background')
    background.css('background-image', 'url('+image['src']+')')

    inner.append(background)

    let info = $('<div>')
    info.addClass('lightbox-modal-info')
    inner.append(info)

    let info_inner = $('<div>')
    info_inner.addClass('lightbox-modal-info-inner')
    info.append(info_inner)

    let name = $('<h2>')
    name.text(image['name'])
    info_inner.append(name)

    let table = $('<table>')
    table.addClass('lightbox-modal-table')
    info_inner.append(table)

    let createdAt = $('<tr>')
    let createdAtLabel = $('<td>')
    createdAtLabel.text('Created at')
    createdAt.append(createdAtLabel)
    let createdAtValue = $('<td>')
    let pretty_date = image['metadata']['createdAt']
    createdAtValue.text(pretty_date)
    createdAt.append(createdAtValue)
    table.append(createdAt)

    let dimensions = $('<tr>')
    let dimensionsLabel = $('<td>')
    dimensionsLabel.text('Dimensions')
    dimensions.append(dimensionsLabel)
    let dimensionsValue = $('<td>')
    dimensionsValue.text(image['metadata']['width']+'x'+image['metadata']['height'])
    dimensions.append(dimensionsValue)
    table.append(dimensions)

    let size = $('<tr>')
    let sizeLabel = $('<td>')
    sizeLabel.text('Size')
    size.append(sizeLabel)
    let sizeValue = $('<td>')
    let bytes = image['metadata']['size']
    let kb = (bytes/1024).toFixed(2)
    sizeValue.text(kb+ " KB")
    size.append(sizeValue)
    table.append(size)

    let type = $('<tr>')
    let typeLabel = $('<td>')
    typeLabel.text('Type')
    type.append(typeLabel)
    let typeValue = $('<td>')
    typeValue.text(image['metadata']['type'])
    type.append(typeValue)
    table.append(type)

    let src = $('<tr>')
    let srcLabel = $('<td>')
    srcLabel.text('Slug')
    src.append(srcLabel)
    let srcValue = $('<td>')
    srcValue.addClass('slug')
    srcValue.addClass('lightbox-modal-src')
    srcValue.text(image['metadata']['url'])
    src.append(srcValue)
    srcValue.css('transition', 'all 0.2s ease-in-out')
    table.append(src)

    srcValue.on('click', ()=>{
        navigator.clipboard.writeText(image['metadata']['url'])
        srcValue.text('Copied!')
        setTimeout(()=>{
            srcValue.text(image['metadata']['url'])
        }, 1000)
    })

    let alt = $('<tr>')
    let altLabel = $('<td>')
    altLabel.text('Alt')
    alt.append(altLabel)
    let altValue = $('<td>')
    altValue.text(image['metadata']['alt'])
    alt.append(altValue)
    table.append(alt)
    altValue.attr('contenteditable', 'true')

    let close = $('<div>')

    close.addClass('lightbox-modal-close clickable-icon')
    let close_icon = $('<span>')
    close_icon.addClass('lucide lucide-4 lucide-va-1 icon-x')
    close_icon.css('-webkit-mask-image', 'url(/icons/x)')
    close_icon.css('mask-image', 'url(/icons/x)')
    close_icon.css('mask-size', 'cover')
    close_icon.css('-webkit-mask-size', 'cover')

    close_icon.on('click', ()=>{
        modal.remove()
    })
    close.append(close_icon)
    modal.append(close)

    let del = $('<button>')

    del.addClass('lightbox-modal-delete danger')
    let delete_icon = $('<span>')
    delete_icon.addClass('lucide lucide-4 lucide-va-1 icon-trash-2')
    delete_icon.css('-webkit-mask-image', 'url(/icons/trash-2)')
    delete_icon.css('mask-image', 'url(/icons/trash-2)')
    delete_icon.css('mask-size', 'cover')
    delete_icon.css('-webkit-mask-size', 'cover')

    delete_icon.on('click', ()=>{
        modal.remove()
    })
    del.text = 'Delete'
    del.append(delete_icon)
    modal.append(del)


    $('body').append(modal)
}


let imgs = $('.gallery img')
let list_imgs = $('.list img')
let all_imgs = imgs.add(list_imgs)

all_imgs.each((i, img)=>
    $(img).on('click', ()=>{
        //get data-url attribute from img
        let url = $(img).attr('data-url')
        let large_image_url = url.replace('thumbnail-', '')
        $.ajax({
            url: large_image_url,
            type: 'GET',
            success:  (large_image) => {
                let large_image_size = large_image['size']? large_image['size']: 0
                let large_image_type = large_image['type']? large_image['type']: 'unknown'
                let large_image_width = large_image['width']? large_image['width']: 0
                let large_image_height = large_image['height']? large_image['height']: 0
                let large_image_filename = large_image['filename']? large_image['filename']: 'unknown'
                let large_image_alt = large_image['alt']? large_image['alt']: 'No alt text'
                let large_image_createdAt = large_image['date']? large_image['date']: 'unknown'
                let large_image_image = large_image['image']
                let large_image_url = large_image['url']
        
                let image = {
                    'src': large_image_image,
                    'name': large_image_filename,
                    'metadata': {
                        'size': large_image_size,
                        'type': large_image_type,
                        'width': large_image_width,
                        'height': large_image_height,
                        'alt': large_image_alt,
                        'createdAt': large_image_createdAt,
                        "url": large_image_url,
                    }
                }
                lightboxModal(image)
        }
        })
    })
)