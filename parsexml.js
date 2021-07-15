
import fsPromises from 'fs/promises';
import * as parser from 'fast-xml-parser';

let wrightquotes = [];
const quotes = await fsPromises.readFile('./quotes.xml', 'utf8');

const jsonObj = parser.parse(quotes)
const lis = jsonObj['div']['ol'];
for (let li of lis) {
    //
    for (let q of li['li']) {
        
        wrightquotes.push(q);
    }
}

//console.log(wrightquotes);

await fsPromises.writeFile('./writequotes.json', JSON.stringify(wrightquotes));
