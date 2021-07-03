const express = require('express');
const validUrl = require('valid-url');
const Url = require('../model/urlmodel');
const router = express.Router()
const id = require('unique-identity');


const baseUrl = 'http://localhost:5000';

router.post('/shorten', async(req,res) => {
    const longUrl  = req.body.longUrl

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid Base Url')
    }

    const urlCode = id.get(8)

    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({
                longUrl
            })

            // url exist and return the respose
            if (url) {
                res.json(url)
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    }

    else {
        res.status(401).json('Invalid longUrl')
    }
})


module.exports = router