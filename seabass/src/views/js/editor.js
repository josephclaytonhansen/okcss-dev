let url = new URL(window.location.href)
let post_index = url.href.indexOf('post/')
let post_id = url.href.slice(post_index + 5)

$.ajax({
    method: 'GET',
    url: '/post/id/' + post_id,
    success: (data) => {
        sessionStorage.setItem('current-blog-data-raw', data.content)
    },
})

const editor = new EditorJS({
    holder: 'editorjs',
    data: {},
    readOnly: false,
    placeholder: '',
    onChange : () => {
        editor.save().then((outputData) => {
            parseToHTML(outputData)
        })
    },
    onReady: () => {
        new Undo({editor});
        new DragDrop(editor);
        let blocks = JSON.parse(sessionStorage.getItem('current-blog-data-raw'))['blocks']
        if (blocks){
        blocks.forEach(block => {
            editor.blocks.insert(block.type, block.data)
        })}

        
    },
    tools: {
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            
        },
        checklist: Checklist,
        list: {
            class: NestedList,
            shortcut: 'CMD+SHIFT+8',
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            },
        },
        hyperlink: {
            class: Hyperlink,
            shortcut: 'CMD+SHIFT+L',
            config: {
              validate: true,
            }
          },
        quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author',
            },
        },
        header: {
            class: Header,
            inlineToolbar: true,
            config: {
                placeholder: 'Enter a header',
                levels: [1, 2, 3, 4, 5],
                defaultLevel: 2,
                defaultAlignment: 'left'
            }
        },
        toggle: {
            class: ToggleBlock,
            shortcut: 'CMD+SHIFT+Y',
            inlineToolbar: true,
        },
        image: SimpleImage,
        table: {
            class: Table,
            inlineToolbar: true,
        },
        embed: Embed,
        AnyButton: {
            class: AnyButton,
            inlineToolbar: false,
            shortcut: 'CMD+J',
        },
    }
})

const edjsParser = edjsHTML()

function parseToHTML(data) {
    let html = edjsParser.parse(data)
    let json = JSON.stringify(data)
    html = html.join('')
    sessionStorage.setItem('current-blog-data', html)
    sessionStorage.setItem('current-blog-data-raw', json)
    // loop through json['blocks'] and get ['data']['text'] for each block
    let text = []
    for(let i = 0; i < data['blocks'].length; i++){
        text.push(data['blocks'][i]['data']['text'])
    }
    text = text.join(' ')
    $('#word-count').text(text.split(' ').length + " words")
}

let sidebar_open = true
const sidebar = $('.blog-editor-sidebar')
const sidebar_button_open = document.querySelector('#sidebar-open').querySelector('span')
const sidebar_button_close = document.querySelector('#sidebar-close').querySelector('span')
const sidebar_open_div = document.querySelector('#sidebar-open')
const sidebar_close_div = document.querySelector('#sidebar-close')

sidebar_button_open.addEventListener('click', () => {
    //sidebar.classList.remove('hidden')
    sidebar_open_div.classList.add('hidden')
    sidebar_close_div.classList.remove('hidden')
    sidebar_open = true
    $("#editor-grid").css("grid-template-columns", "80vw 20vw")
    $("#editor-left").css("margin-right", "2vw")
})

sidebar_button_close.addEventListener('click', () => {
    //sidebar.classList.add('hidden')
    sidebar_open_div.classList.remove('hidden')
    sidebar_close_div.classList.add('hidden')
    sidebar_open = false
    $("#editor-grid").css("grid-template-columns", "100vw 0vw")
    $("#editor-left").css("margin-right", "2rem")
})



