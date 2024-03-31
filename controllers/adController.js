const db = require('../models/index');
/**
    create a new advertisement.
 */
exports.createAd = (req, res) => {
    // Extracting required fields from request body
    const { title, description, price, phoneNumber, email } = req.body;

    //validation
    if (!title || !price || !email) {
        return res.status(400).send('Title, price, and email are required.');
    }
    if (title.length > 20) {
        return res.status(400).send('Title length must be less than or equal to 20 characters.');
    }
    if (description && description.length > 200) {
        return res.status(400).send('Description length must be less than or equal to 200 characters.');
    }
    if (isNaN(price) || price < 0) {
        return res.status(400).send('Price must be a non-negative number.');
    }
    if (!/^(\d{2,3}-)?\d{7}$/.test(phoneNumber)) {
        return res.status(400).send('Invalid phone number format.');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).send('Invalid email address.');
    }

    // create ad
    db.Ad.create({ title, description, price, phoneNumber, email })
        .then(ad => {
            // Set cookie to remember user
            res.cookie('lastAdPosted', `Welcome back ${ad.email}, your previous ad was posted on ${ad.createdAt}`);
            // Render the create-ad page with a confirmation message
            res.render('create-ad', { confirmationMessage: 'Your ad was successfully posted and is waiting for approval' });
        })
        .catch(err => {
            console.error('Error creating ad:', err);
            res.status(500).send('An error occurred while posting your ad');
        });
};