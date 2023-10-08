// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
const axios = require('axios');

app.use(bodyParser.json());

const commentsByPostId = {};

// Get all comments for a given post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a post
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Find the comment array for the given postId
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment to the comments array
    comments.push({ id: commentId, content, status: 'pending' });

    // Update the comments array for the given postId
