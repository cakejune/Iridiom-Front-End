const fs = require('fs');
const csvToObj = require('csv-to-js-parser').csvToObj;

const newJson = fs.readFileSync("\\wsl.localhost\\Ubuntu\\home\\cakejune\\Development\\code\\personal\\iridiom\\my-app\\public\\CategorizingIdioms.csv").toString();

const description =
    {
        id:{type: 'number'},
        elNum:{type: 'number'},
        abbr:{type: 'string'},
        phrase:{type: 'string'},
        meaning:{type: 'string'},
        tags:{type: 'array'},
        category: {type: 'string'}
    };
let obj = csvToObj(data, ';', description);