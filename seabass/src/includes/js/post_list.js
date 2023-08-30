import {publishPost, unpublishPost} from '/post-functions.js'

$('.pl-status').on('change', function(e) {
    var optionSelected = $(this).find("option:selected")
    var valueSelected  = optionSelected.val()
    let post = $(this).attr('data-post')
    if (valueSelected == 'published') {
        publishPost(post)
    }
    else if (valueSelected == 'draft') {
        unpublishPost(post)
    }
    else{
        //select "draft" as the selected option in the dropdown
        $(this).val('draft')
        $(this).find('option[value="draft"]').attr('selected', 'selected')
    }
})

$('#filter-categories').on('click', (e) => {
    let th = $(e.target).parent().parent()
    let options = th.find('.filter-options')
    if (options.css('display') == 'none') {
        options.css('display', 'block')
    } else {
        options.css('display', 'none')
    }
    let checkboxes = options.find('input')
    checkboxes.each((index, checkbox) => {
        $(checkbox).on('change', (e) => {
            let checked = []
            checkboxes.each((index, checkbox) => {
                if ($(checkbox).prop('checked')) {
                    let label = $(checkbox).parent().find('label').text()
                    checked.push(label)
                }
            })
            let posts_container = $('#type-posts')
            let table = posts_container.find('table')
            let table_body = table.find('tbody')
            let rows = table_body.find('tr')
            for (let i = 0; i < rows.length; i++) {
                let post = rows[i]
                let row_id = post.id
                let td = $(post).find('.ct-cell')
                let spans = td.find('span')
                let categories = []
                spans.each((index, span) => {
                    categories.push($(span).text().trim())
                })

                let show_count = 0
                categories.forEach((category) => {
                    if (checked.includes(category)) {
                        show_count++
                    }
                })
                if (show_count > 0) {
                    $('#'+row_id).css('display', 'table-row')
                } else {
                    $('#'+row_id).css('display', 'none')
                }
            }

        })
    })
})

function filterStatus (e, b, c) {
    let th = $(e.target).parent().parent()
    let options = th.find('.filter-options')
    if (options.css('display') == 'none') {
        options.css('display', 'block')
    } else {
        options.css('display', 'none')
    }
    let checkboxes = options.find('input')
    checkboxes.each((index, checkbox) => {
        $(checkbox).on('change', (e) => {
            let checked = []
            checkboxes.each((index, checkbox) => {
                if ($(checkbox).prop('checked')) {
                    let label = $(checkbox).parent().find('label').text()
                    checked.push(label.toLowerCase())
                }
            })
            let posts_container = $(b)
            let table = posts_container.find('table')
            let table_body = table.find('tbody')
            let rows = table_body.find('tr')
            for (let i = 0; i < rows.length; i++) {
                let post = rows[i]
                let row_id = post.id
                let td = $(post).find(c)
                let status = td.val()

                if (checked.includes(status)) {
                    $('#'+row_id).css('display', 'table-row')
                } else {
                    $('#'+row_id).css('display', 'none')
                }
            }

        })
    })
}

$('#filter-status-pages').on('click', (e) => {
    filterStatus(e, '#type-pages', '.pl-status-pages')
})

$('#filter-status').on('click', (e) => {
    filterStatus(e, '#type-posts', '.pl-status')
})