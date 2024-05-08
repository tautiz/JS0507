"use strict";
// Užduotys:
// 3. Parašykite TypeScript kodą, kuris konvertuoja vieno
// tipo kintamąjį į kitą, naudodamas tipo teiginius ir tipo
// konvertavimo funkcijas, pvz., parseInt().
let sk1 = 5;
function konvertuoti(skaicius) {
    if (typeof skaicius === 'number') {
        return skaicius.toString();
    }
    else {
        return parseInt(skaicius);
    }
}
console.log(konvertuoti(5));
console.log(konvertuoti('5'));
let meniuElementai = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'Services', url: '/services' }
];
function addMeniuElement(element) {
    meniuElementai.push(element);
}
function removeMeniuElement() {
    meniuElementai.pop();
}
function showMeniuElements() {
    console.log(meniuElementai);
}
addMeniuElement({ name: 'New', url: '/new' });
showMeniuElements();
removeMeniuElement();
showMeniuElements();
