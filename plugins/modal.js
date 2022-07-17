Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0)  
        return
    const wrap = document.createElement('div')
    wrap.classList.add('myModal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const defaultWidth = '500px'
    const modal = document.createElement('div')
    modal.classList.add('myModal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="myModal-overlay" data-close="true">
            <div class="myModal-window" style="width: ${options.width || defaultWidth};">
                <div class="myModal-header">
                    <span class="myModal-title">${options.title || 'Modal title'}</span>
                    ${options.closable ? `<span class="myModal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="myModal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}



$.modal = function(options) {              // Создаем функцию нашему глобальному объекту 
    const _animationSpeed = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if(destroyed) {
                return console.log('Modal has been destroyed')
            }
            !closing && $modal.classList.add('open')    // Если closing == false, то добавляем класс 'open'
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hiding')
            setTimeout(() => {
                $modal.classList.remove('hiding')
                closing = false
                if(options.onClose) {
                    options.onClose()
                }
            }, _animationSpeed)
        }
    }

    const listener = event => {
        if (event.target.dataset.close) {   // Аналогично if (event.target.getAttribute('data-close'))
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)
    
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
        ,
        setHeader(html) {
            $modal.querySelector('.myModal-title').innerHTML =  html 
        }
    })
    
}