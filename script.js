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
        this.multiplayer = 1;
    }
    getKcal(){

    }
    getPrice(){
        let priceAll = 0;
        let arr = [];
        let mult = 1;
        const allAdd = document.querySelectorAll('.visible');
        console.log(allAdd);
        for (let i = 0; i < allAdd.length; i++){
            arr.push(allAdd[i].classList[0]);
        }
        if (document.querySelector('#hamburger').classList[1] === this.bigSize){
            mult = 1.5;
        } else {
            mult = 1;
        }
        arr.forEach(pr => {
            priceAll += this.stuffing.find(prc => prc.style === pr).price * mult;
        })
        console.log(priceAll);

    }
    checkingStuffing (e, off = this.off, on = this.on) {
        if (e.target.classList.contains(off)) {
                e.target.classList.remove(off);
                e.target.classList.add(on);
                document.querySelector(`.${e.target.id}`).classList.add('visible');
            } else {
                e.target.classList.remove(on);
                e.target.classList.add(off);
                document.querySelector(`.${e.target.id}`).classList.remove('visible');
            }
    }
    changeSize (e, big = this.bigSize, small = this.smallSize) {
        if (e.target.id === big) {
            document.querySelector('#hamburger').classList.remove(small);
            document.querySelector('#hamburger').classList.add(big);
            this.multiplayer = 1.5;
        } else if (e.target.id === small) {
            document.querySelector('#hamburger').classList.remove(big);
            document.querySelector('#hamburger').classList.add(small);
            this.multiplayer = 1;
        }
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
        topingItem.createSizeButtons(buttCreate, topCreate, this.smallSize, this.changeSize);
        topingItem.createSizeButtons(buttCreate, topCreate, this.bigSize, this.changeSize);
    }
    start () {
        document.querySelector('#small').checked = true;
    }
}

//хз как это работает, но работает. Копирнул с кода Влада метод
class SuperBurger extends Hamburger {
    constructor(size, stuffing) {
        super()
    }
    createSizeButtons(button, span, size, sizeFunc){
        this.button = button;
        this.size = size;
        this.sizeFunc = sizeFunc;
        this.span = span;

        this.button = document.createElement('input');
        this.button.type = 'radio';
        this.button.name = 'size';
        this.button.value = this.size;
        this.button.checked = false;
        this.button.classList = 'size-change';
        this.button.id = this.size;
        this.button.addEventListener('click', (e) => this.sizeFunc(e));
        document.querySelector('.button__size-box').append(this.button);

        this.span = document.createElement('span');
        this.span.innerHTML = this.size;
        this.span.classList = 'check-text';
        document.querySelector('.button__size-box').append(this.span);
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
        return `<div class="${this.style}">${this.title}</div>`
    }
}

const hamb = new Hamburger(0, stuff);
hamb.addButtons();
hamb.start();
