import Express from "express";
import fs from "fs";
import readline from 'readline';

const app = Express();

app.get('/readFile/:path', (req, res) => {
    const path = req.params['path']
    const reader = fs.createReadStream(path, 'utf-8');
    reader.on('data', chunk => {
        res.send(chunk)
    });
    reader.on('error', (err) => {
        res.send(err)
    })
})

app.get('/writeFile/:path', (req, res) => {
    const obj = {}
    const lineReader = readline.createInterface({
        input: fs.createReadStream(req.params['path'])
    });

    lineReader.on('line', line => {
        const splittedLine = line.split('=')
        obj[splittedLine[0]] = splittedLine[1]
    });
    lineReader.on('close', () => {
        const writer = fs.createWriteStream('test.json', 'utf-8');
        writer.write(JSON.stringify(obj))
        res.send('File Was Created');
    })
    lineReader.on('error', () => {
        const writer = fs.createWriteStream('test.json', 'utf-8');
        writer.write(JSON.stringify(obj))
        res.send('File Was Created');
    })
})

app.listen(3000, () => console.log('Listening On Port 3000'))