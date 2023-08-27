let images = []

function populateGallery(){
    let g = $('.gallery')
    //for now, use a static array of images

    images.push({"name":"wide.png", "src":'https://images.unsplash.com/photo-1533282960533-51328aa49826?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2142&q=80', metadata:{"createdAt":new Date(), "updatedAt":new Date(), "size":1024, "type":"image/png", "width":1364, "height":513, "alt": "alt text"}})

    images.push({"name":"square.png", "src":"https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80", metadata:{"createdAt":new Date(), "updatedAt":new Date(), "size":1024, "type":"image/png", "width":880, "height":880, "alt": "alt text"}})

    images = images.reverse()

    images.forEach((image)=>{
        let d = $('<div>')
        d.addClass('img-container')
        d.css('max-width', '7.3vw')
        d.css('min-width', '50px')
        let i = $('<img>')
        i.on('click', ()=>{
            lightboxModal(image)
        })
        i.addClass('square rounded gallery-img')
        i.attr('src', image['src'])
        d.append(i)
        g.append(d)
        console.log(g,d,i)
    })
}

populateGallery()

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
    let pretty_date = image['metadata']['createdAt'].toString().split(' ').slice(0,4).join(' ')
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
    sizeValue.text(image['metadata']['size']+ " bytes")
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
    srcValue.addClass('lightbox-modal-src')
    srcValue.text(image['src'])
    src.append(srcValue)
    table.append(src)

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