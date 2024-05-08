"use strict";
const meniu = {
    items: [],
    position: 'top',
    state: true,
    addMeniuElement(element) {
        this.items.push(element);
    },
    removeMeniuElement() {
        this.items.pop();
    }
};
function generateMeniuItem(item) {
    let link = document.createElement('a');
    link.classList.add('meniu-item');
    link.href = item.url;
    link.innerText = item.name;
    return link;
}
function generateMeniu(meniu) {
    let meniuList = document.createElement('div');
    const content = document.getElementById('content');
    for (let item of meniu.items) {
        meniuList.appendChild(generateMeniuItem(item));
    }
    if (content !== null) {
        content.appendChild(meniuList);
    }
}
meniu.addMeniuElement({ name: 'Home', url: '/' });
meniu.addMeniuElement({ name: 'About', url: '/about' });
meniu.addMeniuElement({ name: 'Contact', url: '/contact' });
meniu.addMeniuElement({ name: 'Services', url: '/services' });
generateMeniu(meniu);
