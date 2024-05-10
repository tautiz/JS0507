type Base = 'classic' | 'thick' | 'thin' | 'garlic';

interface HasFormatter {
    format() : string;
}

abstract class MenuItem implements HasFormatter{
    constructor(private title: string, private price: number) { }

    get details(): string {
        return `${this.title} - ${this.price} EUR`;
    }

    abstract format(): string;
}

class Pizza extends MenuItem {
    private base: Base = 'classic';
    private toppings: string[] = [];

    constructor(title: string, price: number) {
        super(title, price)
    }

    addTopping(topping: string): void {
        this.toppings.push(topping);
    }

    removeTopping(topping: string): void {
        this.toppings = this.toppings.filter((t) => t !== topping);
    }

    selectBase(b: Base): void {
        this.base = b;
    }
    
    format(): string {
        let formatted = this.details + '\n';
        
        //base
        formatted += `Pizza on a ${this.base} base `;

        //toppings
        if (this.toppings.length >= 1) {
            formatted += 'with ';
            formatted += this.toppings.join(', ');
        } else {
            formatted += 'with no toppings';
        }

        return formatted;
    }
}


function printMenuItem(item: MenuItem): void {
    console.log(item.details);
}

function printFormatedItem(item: HasFormatter): void {
    console.log(item.format());
}

const pizza = new Pizza("Domino special", 15);
const pizza2 = new Pizza("Dodo special", 14);

printMenuItem(pizza);

function addMushroomstoPizzas(pizzas: Pizza[]): void {
    for (const p of pizzas) {
        p.addTopping('mushrooms')
    }
}

pizza.addTopping("Mushrooms");
pizza.addTopping("Peperoni");
pizza.addTopping("Olives");
pizza.removeTopping("Mushrooms");
pizza.selectBase("thin");

addMushroomstoPizzas([pizza, pizza2])

console.log(pizza, pizza2);

printFormatedItem(pizza);
printFormatedItem(pizza2);