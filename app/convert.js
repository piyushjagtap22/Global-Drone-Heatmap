
const csvToJson = require('convert-csv-to-json');
 
const input = 'global_home_positions.csv'; 
const output = './global_home_positions.json';
 
csvToJson.fieldDelimiter(',')
         .formatValueByType()
         .generateJsonFileFromCsv(input, output);