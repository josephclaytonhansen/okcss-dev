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