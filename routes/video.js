
const express = require('express');
const router = express.Router();
const Video = require('../models/Video'); // Configure this to use cloud storage like AWS S3
const Comment = require('../models/Comment');
const User = require('../models/User');
const { NotFoundError } = require('../../errors');

//Middlewares

const Authentication = require('../middleware/authentication')

// Upload Video
router.post('/uploadVideo', Authentication ,async (req, res) => {
    const { title, videoUrl } = req.body;

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    const video = new Video({ title, user: userId, videoUrl });

    await video.save();
    res.status(201).json({status: 'success', video, message: 'Video uploaded successfully'});
});

// Like Video
router.post('/likeVideo/:id', Authentication ,async (req, res) => {

    const video = await Video.findById(req.params.id);

    if (!video) {
        throw new NotFoundError('Video not found');
    }

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    video.likes.push(user._id);


    await video.save();
    res.json({status: 'success', video});
});

// UnLike Video
router.post('/unLikeVideo/:id', Authentication ,async (req, res) => {

    const video = await Video.findById(req.params.id);

    if (!video) {
        throw new NotFoundError('Video not found');
    }

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    video.likes.pull(user._id);
    await video.save();
    res.json({status: 'success', video});

});


// Get Videos
router.get('/getVideos', Authentication , async (req, res) => {
    const videos = await Video.find().populate('user').populate('comments');
    res.json({status: 'success', videos});
});

// Comment on Video
router.post('/commentOnVideo/:videoId', Authentication ,async (req, res) => {
    const { text } = req.body;
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) {
        throw new NotFoundError('Video not found');
    }
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }    
    const comment = new Comment({ text, userId: userId, video: videoId });
    await comment.save();

    video.comments.push(comment._id);
    await video.save();
    res.json({status: 'success', video});
});

module.exports = router;
