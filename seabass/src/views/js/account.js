

$('#mfa').on('click', async function () {
    window.location.href = '/totp-challenge'
})

$('#bio').on('keyup', async function (e) {
    //if the key is Enter
    if (e.keyCode === 13) {
        e.preventDefault()
        e.stopPropagation()
        $('*').blur()
        let user = $('#user-id-hidden').text()
        let bio = $('#bio').text()
        //remove trailing whitespace
        bio = bio.trim()
        $.ajax({
            type: 'POST',
            url: '/user/bio/' + user,
            data: {
                bio: bio
            },
            success: function (data) {
                $.ajax({
                    type: 'GET',
                    url: '/refresh-session',
                    success: function (data) {
                        window.location.href = '/dashboard'
                    }
                })
            }
        })
    }
})

$('#display_name').on('keyup', async function (e) {
    //if the key is Enter
    if (e.keyCode === 13) {
        e.preventDefault()
        e.stopPropagation()
        $('*').blur()
        let user = $('#user-id-hidden').text()
        let display_name = $('#display_name').text()
        //remove trailing whitespace
        display_name = display_name.trim()
        $.ajax({
            type: 'POST',
            url: '/user/display_name/' + user,
            data: {
                display_name: display_name
            },
            success: function (data) {
                $.ajax({
                    type: 'GET',
                    url: '/refresh-session',
                    success: function (data) {
                        window.location.href = '/dashboard'
                    }
                })
            }
        })
    }
})
