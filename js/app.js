/**
 * app.js
 * -------------------
 * - Sets up global properties, which contain the arrays of employees, either filtered or not
 * - Makes API call with Fetch
 * - Initializes the app
 */

 const app = {};

// Set up global properties, so they're accessible by modal, card and cardListing objs
app.masterList = []; //will hold our default, untouched employee list
app.dynamicList = []; //will hold list version currently in use, filtered or not

// Run fetch, grabbing 12 users from English speaking countries
fetch('https://randomuser.me/api/?results=12&nat=us,gb,ca,nz')
    .then((response) => response.json())
    // set up callback, where app gets rendered
    .then((data) => getData(data.results))
    // Catch errors
    .catch((error) => {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-msg';
        errorMsg.innerHTML = "Sorry an error has occurred. Please try again later";
        const gallery = document.getElementById('gallery');
        gallery.appendChild(errorMsg);
        console.log(Error());
    });
    
    // Callback for API call
    function getData(data) {
        // Keep a copy of the original list so we can reset it after searches, etc
        app.masterList = data;
        // Create the cardListing
        const cardListing = new CardListing(app.masterList);
    }