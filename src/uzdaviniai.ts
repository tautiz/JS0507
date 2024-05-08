// Užduotys:
// 3. Parašykite TypeScript kodą, kuris konvertuoja vieno
// tipo kintamąjį į kitą, naudodamas tipo teiginius ir tipo
// konvertavimo funkcijas, pvz., parseInt().

let sk1: number = 5;

function konvertuoti(skaicius: number | string): number | string{
    if(typeof skaicius === 'number') {
        return skaicius.toString();
    } else {
        return parseInt(skaicius);
    }
}


console.log(konvertuoti(5));
console.log(konvertuoti('5'));

// 4. Parašykite TypeScript kodą, kuris deklaruoja
// konkretaus duomenų tipo masyvą. Parašykite įprastas
// masyvo operacijas, tokias kaip elementų pridėjimas ar
// pašalinimas iš masyvo, taip pat masyvo elementų
// pateikimas konsolėje.

type MeniuElementas = {
    name: string;
    url: string;
}


let meniuElementai: MeniuElementas[] = [
    { name: 'Home', url: '/'},
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'Services', url: '/services'}
];


function addMeniuElement(element: MeniuElementas) {
    meniuElementai.push(element);
}

function removeMeniuElement() {
    meniuElementai.pop();
}

function showMeniuElements() {
    console.log(meniuElementai);
}


addMeniuElement({name: 'New', url: '/new'});
showMeniuElements();
removeMeniuElement();
showMeniuElements();