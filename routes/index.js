const express = require('express');
const router = express.Router();
const db = require('../models/index');
const adController = require('../controllers/adController');
const adminController = require('../controllers/adminController');

/**
 * The route for rendering the landing page is responsible for fetching approved ads from the database and rendering the
 * landing page with the retrieved ads. In case of an error while fetching ads, the landing page is rendered with an
 * empty ads array. Moreover, this route incorporates functionality to filter ads based on a search query within the title.
 */
router.get('/', function(req, res) {
    // Retrieve the search query from the request URL parameters
    const searchQuery = req.query.search;

    // ads from data
    db.Ad.findAll({ where: { approved: true } })
        .then(ads => {
            let showAllButton = false;
            // If there's a search query, filter ads based on the query
            if (searchQuery) {
                ads = ads.filter(ad => ad.title.toLowerCase().includes(searchQuery.toLowerCase()));
                showAllButton = true; // Show the button to display all ads
            }

            // render the landing page with fetched and/or filtered ads.
            res.render('landing', { title: 'Yad2', ads: ads, showAllButton: showAllButton });
        })
        .catch(err => {
            // Render the landing page with an empty ads array if there's an error
            console.error('Error fetching ads:', err);
            res.render('landing', { title: 'Yad2', ads: [], showAllButton: false });
        });
});

// login page
router.get('/login', function(req, res) {
    // Render the login page
    res.render('login', { title: 'Login',  errorMessage: '' });
});

// admin page
router.get('/admin', function(req, res) {
    res.render('admin', { title: 'Admin' });
});

// post new ad
router.get('/post-new-ad', function(req, res) {
    // Render the page to post a new ad with confirmation message
    res.render('post-new-ad', { title: 'Post new ad', confirmationMessage: req.cookies.lastAdPosted || '' });
});

// create ad
router.get('/create-ad',function (req, res) {
    res.render('create-ad', { confirmationMessage: '' });
});

router.post('/admin', adminController.login);

router.get('/ads', adminController.getAllAds);

router.post('/create-ad',adController.createAd);

router.delete('/ads/:id',adminController.deleteAd);

router.put('/ads/:id/approve',adminController.approveAd);

/**
 * Error handling middleware for rendering the error page in response to 404 Not Found errors. It renders the error page
 * with a message and status code indicating the resource could not be found.
 */
router.use(function(req, res) {
    res.status(404).render('error', {
        message: 'Not Found',
        error: { status: 404, stack: 'The resource could not be found on this server!' }
    });
});

module.exports = router;
