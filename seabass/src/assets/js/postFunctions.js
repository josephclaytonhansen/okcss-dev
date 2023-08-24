function savePost(content){
    let url = new URL(window.location.href)
    let post_index = url.href.indexOf('post/')
    let post_id = url.href.slice(post_index + 5)

    let title = $('#blog-title').val()
    let slug = $('#blog-slug').val()
    let metaTitle = $('#blog-meta-title').val()
    let metaDescription = $('#blog-meta-description').val()
    let metaKeywords = $('#blog-meta-keywords').val()
    let status = $('#blog-status').val()
    let categories = $('#blog-categories').val()
    let tags = $('#blog-tags').val()
    let author = $('#blog-author').val()
    //TODO: featured image
    let featuredImage = ''
    //TODO: scheduled date
    let scheduledDate = ''

    $.ajax({
        url: '/post/update/' + post_id,
        type: 'POST',
        data: {
            post_id: post_id,
            title: title,
            slug: slug,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            metaKeywords: metaKeywords,
            status: status,
            categories: categories,
            tags: tags,
            author: author,
            content: content,
            featuredImage: featuredImage,
            scheduledDate: scheduledDate
        },
        success: () => savePostCallback(post_id, content),
        error: function (err) {
            console.log(err)}
    })

}

function savePostCallback(post_id, content){
    let current_text = $('#history-count').text().split(' ')
    let current_count = parseInt(current_text[1]) + 1
    $('#history-count').text(current_text[0] +" "+ current_count+" "+current_text[2])
    $.ajax({
        method: 'GET',
        url: '/post/update_history/' + post_id,
        success: () => {
        },
        error: (err) => {
        }
    })
    window.location.reload()
}

export {savePostCallback, savePost}