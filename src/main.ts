type MeniuItem = {
    name: string;
    url: string;
}

interface MeniuState {
    state: boolean;
}


interface Meniu extends MeniuState {
    items: MeniuItem[];
    position: string;
    addMeniuElement (element: MeniuItem): void;
    removeMeniuElement(): void;
}

const meniu: Meniu = {
    items: [],
    position: 'top',
    state: true,

    addMeniuElement(element: MeniuElementas) {
        this.items.push(element);
    },

    removeMeniuElement() {
        this.items.pop();
    }
};

function generateMeniuItem(item: MeniuItem) {
    let link = document.createElement('a');
    link.classList.add('meniu-item');
    link.href = item.url;
    link.innerText = item.name;

    return link;
}

function generateMeniu(meniu: Meniu) {
    let meniuList = document.createElement('div');
    const content = document.getElementById('content');

    for (let item of meniu.items) {
        meniuList.appendChild(generateMeniuItem(item));
    }

    if(content !== null) {
        content.appendChild(meniuList);
    }
}

meniu.addMeniuElement({ name: 'Home', url: '/'});
meniu.addMeniuElement({ name: 'About', url: '/about' });
meniu.addMeniuElement({ name: 'Contact', url: '/contact' });
meniu.addMeniuElement({ name: 'Services', url: '/services'});

generateMeniu(meniu);
