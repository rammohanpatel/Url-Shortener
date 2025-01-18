import express from 'express';
import {  handleUrlShortener,handleGetUrlShortener,handleAnalytics } from '../controllers/urlShorterner.controller.js';


const router = express.Router();

router.post('/postUrl', handleUrlShortener);
router.get('/analytics/:shortId', handleAnalytics);
router.get('/:shortId', handleGetUrlShortener);

export default router;
