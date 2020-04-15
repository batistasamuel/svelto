const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const phantom = require('phantom');
const sharp = require('sharp');

// Prepare Phantom variables
let instance = null
let page = null

//Function screenshot for thumbnails
const takeScreenshot = async(url) =>{
  instance = instance || await phantom.create()
  page = page || await instance.createPage()

  const status = await page.open(url)
  console.log(status)

  await page.render('./uploads/image.png')

}

const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { 
    longUrl, 
    friendlyName, 
    category, 
    startDate, 
    endDate, 
    limitVisits, 
    expByVisitNumber, 
    expByTimePeriod 
  } = req.body;
 
  const visitorCounter = 0;
 
  const baseUrl = config.get('baseUrl');

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + friendlyName + '-' + urlCode;
        const friendlyCode = friendlyName + '-' + urlCode;
        const isValid = true;

        // Thumbnails
        takeScreenshot(longUrl)

        const sleep = (milliseconds) => {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        
        //resize image to become a thumbnail
        const resizeit = async () => {
          await sleep(7000)
          sharp('./uploads/image.png').resize(200, 200).toFile('uploads/' + 'thumbnail', (err, resizeImage) => {
            if (err) {
              console.log(err);
              //console.log(sharp.format);
            }
            else {
              console.log(resizeImage);
            }
          });        
        }
        
        await resizeit()

        url = new Url({
          longUrl,
          shortUrl,
          friendlyName,
          visitorCounter,
          urlCode,
          friendlyCode,
          category,
          limitVisits, 
          expByVisitNumber,
          expByTimePeriod,
          startDate,
          endDate,
          isValid,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
