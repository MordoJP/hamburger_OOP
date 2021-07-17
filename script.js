"use strict";

const stuff = [
    {
        title: 'Верхняя булочка',
        kcal: 40,
        price: 15,
        numb: 9,
        style: 'bunBottom'
    },
    {
        title: 'Майонез',
        kcal: 62,
        price: 20,
        numb: 8,
        style: 'mayo'
    },
    {
        title: 'Огурец',
        kcal: 9,
        price: 10,
        numb: 7,
        style: 'cucumber'
    },
    {
        title: 'Лук',
        kcal: 12,
        price: 10,
        numb: 6,
        style: 'onion'
    },
    {
        title: 'Помидор',
        kcal: 16,
        price: 15,
        numb: 5,
        style: 'tomato'
    },
    {
        title: 'Сыр',
        kcal: 30,
        price: 20,
        numb: 4,
        style: 'cheese'
    },
    {
        title: 'Котлета',
        kcal: 152,
        price: 100,
        numb: 3,
        style: 'patty'
    },
    {
        title: 'Салат айсберг',
        kcal: 12,
        price: 15,
        numb: 2,
        style: 'salad'
    },
    {
        title: 'Кетчуп',
        kcal: 53,
        price: 20,
        numb: 1,
        style: 'ketchup'
    },
    {
        title: 'Нижняя булочка',
        kcal: 40,
        price: 15,
        numb: 0,
        style: 'bunTop'
    }
];

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.on = 'onButton';
        this.off = 'offButton';
        this.bigSize = 'big';
        this.smallSize = 'small';
    }
    getKcal(stufferKcal){
        let priceAll = 0;
        let arr = [];
        let mult = 1;
        this.stufferKcal = stufferKcal;
        const allAdd = document.querySelectorAll('.visible');
        for (let i = 0; i < allAdd.length; i++){
            arr.push(allAdd[i].classList[0]);
        }
        if (document.querySelector('#hamburger').classList[1] === this.bigSize){
            mult = 1.5;
        } else if (document.querySelector('#hamburger').classList[1] === this.smallSize){
            mult = 1;
        }
        arr.forEach(pr => {
            priceAll += this.stufferKcal.find(prc => prc.style === pr).kcal * mult;
        })
        document.querySelector('#kcal-box').innerText = `${priceAll} Ккал.`;
    }
    getPrice(stuffer){
        let priceAll = 0;
        let arr = [];
        let mult = 1;
        this.stuffer = stuffer;
        const allAdd = document.querySelectorAll('.visible');
        for (let i = 0; i < allAdd.length; i++){
            arr.push(allAdd[i].classList[0]);
        }
        if (document.querySelector('#hamburger').classList[1] === this.bigSize){
            mult = 1.5;
        } else if (document.querySelector('#hamburger').classList[1] === this.smallSize){
            mult = 1;
        }
        arr.forEach(pr => {
            priceAll += this.stuffer.find(prc => prc.style === pr).price * mult;
        })
        document.querySelector('#price-box').innerText = `${priceAll} руб.`;
    }
    checkingStuffing (e, off = this.off, on = this.on) {
        if (e.target.classList.contains(off)) {
                e.target.classList.remove(off);
                e.target.classList.add(on);
                document.querySelector(`.${e.target.id}`).classList.add('visible');
                document.querySelector(`.${e.target.id}`).style.display = "";
            } else {
                e.target.classList.remove(on);
                e.target.classList.add(off);
                document.querySelector(`.${e.target.id}`).classList.remove('visible');
                document.querySelector(`.${e.target.id}`).style.display = "none";
            }
        this.getPrice(this.stuffing);
        this.getKcal(this.stuffing);
    }
    addButtons () {
        //создающие переменные
        let buttCreate = '';
        let topCreate = '';
        const topingItem = new SuperBurger();

        //создает кнопки и пустые части бургеров
        this.stuffing.forEach(toping => {
            const topingItem = new Toping(toping.title, toping.kcal, toping.price, toping.numb, toping.style, this.off);
            buttCreate += topingItem.addButton();
            topCreate += topingItem.render();
        })
        document.querySelector('.button__stuff-box').innerHTML = buttCreate;
        document.querySelector('#hamburger').innerHTML = topCreate;
        this.stuffing.forEach(button => {
            const button1 = document.querySelector(`#${button.style}`);
            button1.addEventListener('click', e => this.checkingStuffing(e));
        })

        //создание кнопок переключения размера бургера
        topingItem.createSizeButtons(buttCreate, topCreate, this.smallSize, this.stuffing);
        topingItem.createSizeButtons(buttCreate, topCreate, this.bigSize, this.stuffing);
    }
    start () {
        document.querySelector('#small').checked = true;
        const arrStartTopings = ['bunBottom', 'patty', 'cheese', 'bunTop'];
        const invisToppings = ['mayo', 'cucumber', 'onion', 'tomato', 'salad', 'ketchup']
        arrStartTopings.forEach(startClass => {
            document.querySelector(`.${startClass}`).classList.add('visible');
            document.querySelector(`#${startClass}`).classList.remove(this.off);
            document.querySelector(`#${startClass}`).classList.add(this.on);
        })
        invisToppings.forEach(toping => {
            document.querySelector(`.${toping}`).style.display = "none";
        })
        this.getKcal(this.stuffing);
        this.getPrice(this.stuffing);
    }
}

//хз как это работает, но работает. Копирнул с кода Влада метод
class SuperBurger extends Hamburger {
    constructor(size, stuffing) {
        super()
    }
    createSizeButtons(button, span, size, stuffSizer){
        this.button = button;
        this.size = size;
        this.span = span;
        this.stuffSizer = stuffSizer;

        this.button = document.createElement('input');
        this.button.type = 'radio';
        this.button.name = 'size';
        this.button.value = this.size;
        this.button.checked = false;
        this.button.classList = 'size-change';
        this.button.id = this.size;
        this.button.addEventListener('click', (e) => this.changeSize(e));
        document.querySelector('.button__size-box').append(this.button);

        this.span = document.createElement('span');
        this.span.innerHTML = this.size;
        this.span.classList = 'check-text';
        document.querySelector('.button__size-box').append(this.span);
    }
    changeSize (e, big = this.bigSize, small = this.smallSize) {
        if (e.target.id === big) {
            document.querySelector('#hamburger').classList.remove(small);
            document.querySelector('#hamburger').classList.add(big);
        } else if (e.target.id === small) {
            document.querySelector('#hamburger').classList.remove(big);
            document.querySelector('#hamburger').classList.add(small);
        }
        this.getPrice(this.stuffSizer);
        this.getKcal(this.stuffSizer);
    }
}

class Toping {
    constructor(title, kcal, price, numb, style, off) {
        this.title = title;
        this.kcal = kcal;
        this.price = price;
        this.numb = numb;
        this.style = style;
        this.off = off;
    }
    addButton(){
        return `<button class="${this.off} add-toping" id="${this.style}">${this.title}</button>`
    }
    render(){
        return `<div class="${this.style}"></div>`
    }
}
const hamb = new Hamburger(0, stuff);
hamb.addButtons();
hamb.start();

