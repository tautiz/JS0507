import { appendFileSync } from 'fs';

interface Mokejimas {
    id: number;
    suma: number;
    gavejas: string;
    paskirtis: string;
}

type MokejimuStulpeliai = ('id' | 'suma' | 'gavejas' | 'paskirtis')[];

class CSVWriter {
    private csv: string;

    constructor(private stulpeliai: MokejimuStulpeliai) {
        this.csv = this.stulpeliai.join(',') + '\n';
    }

    pridetiEilute( values: Mokejimas[]): void {
        let eiltes = values.map(v => this.formatuotiEilute(v));
        this.csv += eiltes.join('\n');
        console.log(this.csv);
    }

    formatuotiEilute(m: Mokejimas) : string {
        return this.stulpeliai.map(stul => m[stul]).join(',');
    }

    save (fileName: string): void {
        appendFileSync(fileName, this.csv);
        this.csv = '\n';

        console.log('File saved to ', fileName);
    }
}

const writer = new CSVWriter(['id','suma', 'gavejas', 'paskirtis']);

writer.pridetiEilute([
    {id: 1, suma: 30, gavejas: 'Bronius Broniauskas', paskirtis: 'dovana'},
    {id: 2, suma: 200, gavejas: 'Kosatas Kostauskas', paskirtis: 'programavimo konsultacija'},
])

writer.save('./data/mokejimai.csv');
