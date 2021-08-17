import fs from "fs";
import readline from 'readline';
import { v4 as uuidv4 } from 'uuid';
import { Response, Request } from 'express' 

let posts = [{
    id: 1,
    heading: 'Test',
    content: 'Test'
}]

export const readFile = (req:Request, res:Response) => {
    const path = req.params['path']
    const reader = fs.createReadStream(path, 'utf-8');
    reader.on('data', chunk => {
        res.send(chunk)
    });
    reader.on('error', () => {
        res.send('An Error Occured, Try Again')
    });
}

export const writeFile = (req:Request, res:Response) => {
    const obj:any = {}
    const lineReader = readline.createInterface({
        input: fs.createReadStream(req.params['path'])
    });

    lineReader.on('line', line => {
        const splittedLine = line.split('=')
        obj[splittedLine[0]] = splittedLine[1]
    });
    lineReader.on('close', () => {
        const writer = fs.createWriteStream('test.json', 'utf-8')
        writer.write(JSON.stringify(obj))
        res.send('File Was Created');
    })
}

export const getPosts = (req:Request, res:Response) => {
    res.send(posts)
}

export const newPost = (req:Request, res:Response) => {
    const post = req.body;
    posts.push({...post, id: uuidv4()});
    res.send('User was successfully created')
}

export const getPostById = (req:Request, res:Response) => {
    const id = +req.params.id
    const foundPost = posts.find((post) => post.id === id)
    res.send(foundPost)
}

export const deletePost = (req:Request, res:Response) => {
    const id = +req.params.id
    posts = posts.filter((post) => {
        post.id !== id
    })
    res.send('Deleted Succesfully')
}

export const patchPost = (req:Request, res:Response) => {
    const { heading, content } = req.body
    const id = +req.params.id

    const post:any = posts.find((user) => user.id === id)

    if (heading) {
        post.heading = heading;
    }

    if (content) {
        post.content = content;
    }

    res.send('Successfully Updated')
}