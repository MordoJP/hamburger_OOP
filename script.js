"use strict";

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
    }
    addToping(toping) {
        console.log(1);
    }
    removeToping(toping) {

    }
    getKcal(){

    }
    getPrice(){

    }
    addSize(){
    }
    stuffs(){
        this.stuff = [
            {
                title: 'Нижняя булочка',
                kcal: 40,
                price: 15,
                numb: 0,
                style: 'bunTop'
            },
            {
                title: 'Кетчуп',
                kcal: 53,
                price: 20,
                numb: 1,
                style: 'ketchup'
            },
            {
                title: 'Салат айсберг',
                kcal: 12,
                price: 15,
                numb: 2,
                style: 'salad'
            },
            {
                title: 'Котлета',
                kcal: 152,
                price: 100,
                numb: 3,
                style: 'patty'
            },
            {
                title: 'Сыр',
                kcal: 30,
                price: 20,
                numb: 4,
                style: 'cheese'
            },
            {
                title: 'Помидор',
                kcal: 16,
                price: 15,
                numb: 5,
                style: 'tomato'
            },
            {
                title: 'Лук',
                kcal: 12,
                price: 10,
                numb: 6,
                style: 'onion'
            },
            {
                title: 'Огурец',
                kcal: 9,
                price: 10,
                numb: 7,
                style: 'cucumber'
            },
            {
                title: 'Майонез',
                kcal: 62,
                price: 20,
                numb: 8,
                style: 'mayo'
            },
            {
                title: 'Верхняя булочка',
                kcal: 40,
                price: 15,
                numb: 9,
                style: 'bunBottom'
            }
        ]
    }
    addButtons(){
        let buttonsList = '';
        let toppingList = '';
        this.stuff.forEach(toping => {
            const topingItem = new Toping(toping.title, toping.kcal, toping.price, toping.numb, toping.style);
            buttonsList += topingItem.addButton();
            toppingList += topingItem.render();
        })
        document.querySelector('.button-box').innerHTML = buttonsList;
        document.querySelector('.hamb-box').innerHTML = toppingList;
    }
}

class Toping {
    constructor(title, kcal, price, numb, style) {
        this.title = title;
        this.kcal = kcal;
        this.price = price;
        this.numb = numb;
        this.style = style;
    }
    addButton(){
        return `<button class="add-toping" id="${this.style}">${this.title}</button>`
    }
    render(){
        return `<div class="small ${this.style}"></div>`
    }
}

const hamb = new Hamburger(0, 0);
hamb.stuffs();
hamb.addButtons();