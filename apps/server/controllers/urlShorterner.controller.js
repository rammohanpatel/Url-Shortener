import { nanoid } from 'nanoid';
import URL from '../models/urlShortener.model.js';


export const handleUrlShortener = async (req, res) => {
    const body = req.body;
    try {
        if (!body.url) return res.status(400).json({ message: 'Url is required' });
        const shortId = nanoid(7);
        if (!shortId) return res.status(500).json({ message: 'Failed to generate shortId' });
        await URL.create({
            shortId: shortId,
            redirectUrl: body.url,
            visits: []
        });
        return res.status(200).json({ shortUrl: `http://localhost:5000/${shortId}` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const handleGetUrlShortener = async (req, res) => {
    const shortId = req.params.shortId;
    try {
        // console.log(req.params)
        const query = await URL.findOneAndUpdate({ shortId }, { $push: { visits: { timeStamp: Date.now() } } });
        if (!query) return res.status(404).json({ message: 'Query not found', shortId: shortId })
        console.log(query.redirectUrl);
        res.redirect(query.redirectUrl);
    } catch (error) {
        console.log(error);
    }
}

export const handleAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    try {
        console.log(shortId);
        const shortUrl = `http://localhost:5000/${shortId}`;
        const query = await URL.findOne({ shortId });
        if (!query) return res.status(200).json({ message: 'No visits yet' });
        return res.status(200).json({ visits: query.visits.length, url: query.redirectUrl, shortUrl: shortUrl });
    } catch (error) {
        console.log(error);
    }
}