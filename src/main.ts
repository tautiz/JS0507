type MeniuItem = {
    name: string;
    url: string;
}

interface MeniuState {
    state: boolean;
}

interface MeniuInterface extends MeniuState {
    items: MeniuItem[];
    position: string;
    addMeniuElement(element: MeniuItem): void;
    removeMeniuElement(): void;
}

class Meniu {

    private items: MeniuItem[] = [];
    private position: string;
    private state: boolean;
    
    constructor(private possition: string, private state: boolean) {}

    addMeniuElement(element: MeniuElementas): void{
        this.items.push(element);
    }

    removeMeniuElement(): void {
        this.items.pop();
    }

    setPosition(p: string): void{
        this.position = p;
    }
};

const meniu = new Meniu('top', true);
// meniu.position = 'bottom'; // Error: Property 'position' is private and only accessible within class 'Meniu'.
meniu.setPosition('left');
console.log(meniu);

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

    if (content !== null) {
        content.appendChild(meniuList);
    }
}

meniu.addMeniuElement({ name: 'Home', url: '/' });
meniu.addMeniuElement({ name: 'About', url: '/about' });
meniu.addMeniuElement({ name: 'Contact', url: '/contact' });
meniu.addMeniuElement({ name: 'Services', url: '/services' });

generateMeniu(meniu);
