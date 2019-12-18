const app = {};


fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => getData(data.results))
    //.then(data => console.log(data.results))
    .catch(error => console.log('Sorry, this has failed', error));
    

    function getData(data) {
        const cardListing = new CardListing(data);
    }