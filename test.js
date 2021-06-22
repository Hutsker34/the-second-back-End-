const fs = require('fs');
// чтение
const source = fs.readFileSync('in.json', 'utf8');

function modify(entry) {
    const {data} = JSON.parse(entry);
    console.log(data)
    data.age = 20;
    data.job = 'postman';
    return JSON.stringify({
        data
    }, null, 2);
}

// изменения
const result = modify(source);

// запись
fs.writeFile('out.json', result, 'utf8', () => {
    console.log('Мы записали данные, ура!')
});