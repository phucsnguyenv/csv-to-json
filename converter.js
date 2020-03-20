const fs = require('fs');
const path = require('path');
const readline = require('readline');


let contents = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'customer-data.csv'))
})

let rawData = [];
contents.on('line', (row)=>{
    rawData.push(row.split(','));
})
contents.on('close', () =>{
    let temp = rawData.shift(); 
    let jsonData = '[';
    for(let i=0;i<rawData.length-1;i++){
        jsonData += '{';
        for(let j=0;j<temp.length-1;j++){
            jsonData+='"'+temp[j]+'"'+':'+'"'+rawData[i][j]+'"'+','
        }
        jsonData+='"'+temp[temp.length-1]+'"'+':'+'"'+rawData[i][temp.length-1]+'"'+"},"
    }
    jsonData += '{';
        for(let j=0;j<temp.length-1;j++){
            jsonData+='"'+temp[j]+'"'+':'+'"'+rawData[rawData.length-1][j]+'"'+','
        }
        jsonData+='"'+temp[temp.length-1]+'"'+':'+'"'+rawData[rawData.length-1][temp.length-1]+'"'+"}"
    jsonData+=']';

    fs.writeFileSync(path.join(__dirname, 'customer-data.json'), jsonData, (err) =>{
        if(err) return console.error(err.message);
    })
})