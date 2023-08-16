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
    html = html.join('')
    sessionStorage.setItem('current-blog-data', html)
}
