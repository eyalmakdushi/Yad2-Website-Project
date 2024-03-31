(function (){
/**
 *
 * Validates the form fields before submission to ensure data integrity and accuracy.
 * @param {Event} event - The submit event.
 */
document.getElementById('adForm').addEventListener('submit', function(event) {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();

    let valid = true;

    if (title.length === 0 || title.length > 20) { // title valid
        document.getElementById('titleError').textContent = 'Title must be between 1 and 20 characters';
        valid = false;
    } else {
        document.getElementById('titleError').textContent = '';
    }

    if (description.length === 0 || description.length > 200) { // desc valid
        document.getElementById('descriptionError').textContent = 'Description must be between 1 and 200 characters';
        valid = false;
    } else {
        document.getElementById('descriptionError').textContent = '';
    }

    if (isNaN(price) || price < 0) { // price valid
        document.getElementById('priceError').textContent = 'Price must be a non-negative number';
        valid = false;
    } else {
        document.getElementById('priceError').textContent = '';
    }

    if (!/^\d{2,3}-\d{7}$/.test(phoneNumber)) { // phone number valid
        document.getElementById('phoneNumberError').textContent = 'Please enter a valid phone number in the format: XXX-XXXXXXX' +
            ' or XX-XXXXXXX';
        valid = false;
    } else {
        document.getElementById('phoneNumberError').textContent = '';
    }

    if (!/\S+@\S+\.\S+/.test(email)) { // mail valid
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        valid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    if (!valid) {
        event.preventDefault();
    }
});
})();