import express from 'express';
import {readFile, writeFile, getPosts, newPost, getPostById, deletePost, patchPost} from '../controllers/controllers';

const router = express.Router();

router.get('/readFile/:path', readFile)

router.get('/writeFile/:path', writeFile)

router.get('/blog/posts', getPosts)

router.get('/blog/post/:id', getPostById)

router.post('/blog/post', newPost)

router.delete('/blog/posts/:id', deletePost)

router.patch('/blog/posts/:id', patchPost)

export default router;