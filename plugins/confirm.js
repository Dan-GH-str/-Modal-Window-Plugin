$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            content: options.content,
            closable: true,
            onClose() {
                modal.destroy()     // Уничтоэаем модалку при закрытии, дабы не засорять DOM-дерево
            },
            width: '500px',
            footerButtons: [
                {text: 'Отменить', type: 'secondary', handler() {
                    modal.close()
                    reject()
                }},
                {text: 'Удалить', type: 'danger', handler() {
                    modal.close()
                    resolve()
                }}
            ]
        })
        
        setTimeout(()=> modal.open(), 100)  
    })
}