let cars = [
    {id: 1, title: 'Bugatti Veyron', price: 1700000, infoPrice: '1 700 000 $ или 112 200 000 ₽.', discription: 'Суперкар появился в 2005 году, производитель Bugatti (Бугатти), располагающийся в стране Франция. Двигатель Bugatti Veyron 16.4 объёмом 7993 см³ развивает мощность 1001 лошадиных сил, что позволяет автомобилю разгоняться до 100 километров в час за 2.5 секунды и развивать максимальную скорость 407 км/ч.', src: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/cars/87/5810-1000x830.jpg'},
    {id: 2, title: 'Koenigsegg Agera R', price: 1700000, infoPrice: '1 700 000 $ или 112 200 000 ₽', discription: 'Суперкар появился в 2013 году, производитель Koenigsegg (Кенигсегг), располагающийся в стране Швеция. Двигатель Koenigsegg Agera R объёмом 5032 см³ развивает мощность 1140 лошадиных сил, что позволяет автомобилю разгоняться до 100 километров в час за 2.8 секунды и развивать максимальную скорость 420 км/ч.', src: 'https://img3.akspic.ru/attachments/crops/4/0/8/0/2/120804/120804-gonochnyj_avtomobil-avtomobil-sportkar-sportivnyj_avtomobil-avtomobilnyj_eksterer-2560x1440.jpg'},
    {id: 3, title: 'McLaren P1', price: 1400000, infoPrice: '1 400 000 $ или же 92 400 000 ₽.', discription: 'Суперкар появился в 2013 году, производитель McLaren (Мсларен), располагающийся в стране Великобритания. Двигатель McLaren P1 объёмом 3799 см³ развивает мощность 916 лошадиных сил, что позволяет автомобилю разгоняться до 100 километров в час за 2.8 секунды и развивать максимальную скорость 350 км/ч.', src: 'https://img.besthqwallpapers.com/Uploads/4-1-2018/36152/mclaren-p1-4k-hypercars-2017-cars-black-p1.jpg'}
]

const toHTML = car => `
    <div class="row g-0 bg-light position-relative">
        <div class="col-md-5 mb-md-0 p-md-4">
            <img style="background-size: cover;" src="${car.src}" class="w-100" alt="Что-то не так">
        </div>
        <div class="col-md-7 p-4 ps-md-0">
            <h5 class="mt-0">${car.title}</h5>
            <p>${car.discription}</p>
            <a href="#" class="btn btn-primary btn-mg" data-btn="price" data-btnId="${car.id}">Узнать цену</a>
            <a href="#" class="btn btn-danger btn-mg" data-btn="remove" data-btnId="${car.id}">Удалить</a>
        </div>
    </div>
`

function render() {
    const html = cars.map(car => toHTML(car)).join('')
    document.querySelector('#cars').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Modal title',
    closable: true,
    content: `
        <h4>Modal header</h4>
        <p>Modal paragraph</p>
    `,
    width: '500px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.btnid  //Преобразовали к числу
    const car = cars.find(c => c.id === id)

    if (btnType === 'price') {
        
        priceModal.setHeader(`<h3>${car.title}</h3>`)
        priceModal.setContent(`<p>Цена составляет около ${car.infoPrice}</p>`)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены, что хотите удалить запись?',
            content: `Вы удаляете запись с ${car.title}`
        })
        .then(() => {
            cars = cars.filter(c => c.id !== id)
            render()
        })
        .catch(() => {
            console.log('Cancelled')
        })
    }
})