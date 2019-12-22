/**
 *  CardListing
 *  -----------------
 *  Generates the list of cards & card objects (Card.js), the search functionality and several helper 
 *  methods.
 */


class CardListing{
    constructor(payload){ 
        app.dynamicList = this.prepareCardData(payload); 
        this.populateCards(app.dynamicList);
        this.createSearchForm();   
    }

    /**
     * Structure the raw data from API for easier use inside the app
     * @param {Array} payload Array of employee objects, direct from API
     */

    prepareCardData(payload){
        // Set up array to return the newly structured data
        let cards = [];
        payload.map((employee, index)=>{
            cards[index] = {
                "index" : index,
                "img" :employee.picture,
                "name" : employee.name.first + ' ' + employee.name.last,
                "email" : employee.email,
                "city" : employee.location.city,
                "state" : employee.location.state,
                "phone" : employee.phone,
                "address" : employee.location,
                "dob" : this.setDateToString(employee.dob.date),
            }
        });
    
        return cards;
    }

    /**
     * Loops through formatted data and instantiates a new Card obj for each
     * @param {Array} formattedEmployeeList 
     */
    
     populateCards(formattedEmployeeList){
        formattedEmployeeList.map((employee)=> new Card(employee));
    }

    /**
     * Generate search form elem and setup associated functionality
     */

    createSearchForm(){
        // Create search form markup
        const searchForm = document.createElement('form');
        searchForm.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search..."> <button id="search-reset" class="search-reset">&#x2297;</button><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`;

        // Append search form to main DOM elem
        const searchFormContainer = document.querySelector('.search-container');
        searchFormContainer.appendChild(searchForm);
            
        // Add search functionality
        this.createSearchFormFunctionality();
    }
    
    /**
     * Business logic for creating search functionality
     */

    createSearchFormFunctionality(){
        const searchField = document.getElementById('search-input');
        const searchSubmit = document.getElementById('search-submit');
        const searchReset = document.getElementById('search-reset');

        // Add click event to search
        searchSubmit.addEventListener('click', (event)=>{
            this.removeError();

            // If the search is submitted empty, send an error
            if(searchField.value === ''){
                this.createError('Please enter a valid search');
            }
    
            // Grab submitted search term
            let searchTerm = searchField.value;
            event.preventDefault();
            let allEmployees = app.dynamicList;
            let searchedEmployees = [];
            allEmployees.find((employee, index)=>{
                if(employee.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    searchedEmployees.push(employee);
                }
            });

            // if there are no matches for current employees, run the error function
            if(searchedEmployees.length === 0 ){
                this.createError('Sorry, we have no record of this employee');
            }

            // Update the global dynamic list to match the search
            app.dynamicList = searchedEmployees;

            // Reindex cards on dynamicList so the modals work
            app.dynamicList = this.reindexCards(app.dynamicList);

            // Update which cards appear in the list
            this.updateCards(app.dynamicList);
        });
        this.clearSearch(searchReset);
    }

    /**
     * If the length of the list of employees changes, re-index it so the modal pagination still works
     * @param {Array} filteredList 
     */ 
    reindexCards(filteredList){
        filteredList.forEach((employee, index)=>{
            employee.index = index;
        });
        return filteredList;
    }

    /**
     * After a search is completed or cleared, update the cards
     * @param {Array} employeeList 
     */
    updateCards(employeeList){
        const body = document.querySelector('#gallery');
        body.innerHTML = '';
        this.populateCards(employeeList);
    }

    /**
     * Reformats the default ISO date to a string for easier reading
     * @param {Date} dob 
     */
    setDateToString(dob){
        let dateString = new Date(dob);
        dateString = dateString.toISOString().substring(0, 10);
        return dateString;
    }

    /**
     * Generate error for when no employees are returned
     */
    createError(msg){
        this.removeError();
        const searchContainer = document.querySelector('.search-container');
        // Create the error msg
        const errorMsg = document.createElement('span');
        errorMsg.innerHTML = msg;
        errorMsg.className = 'error-msg';
        searchContainer.appendChild(errorMsg);
    }

    /**
     *  Check to see if there's an error, and if there is, delete it so they don't stack up
     */
    removeError(){
        const searchContainer = document.querySelector('.search-container');
        const searchMsg = document.querySelector('.error-msg');
            
        // If the error msg is set, then remove it from the DOM
        if(searchMsg !== null){
            searchContainer.removeChild(searchMsg);
        }
    }

    /**
     * 
     * Upon clearing the search field, we reset the list of employees
     * @param {string} searchField 
     */

    clearSearch(searchReset){
        
        // Assign object's this to another property name, because it collides with 'this' inside event listener
        const updatedList = this;
    
        // On search click
        searchReset.addEventListener('click', function (event) {

            event.preventDefault();
            // Check for errors and remov them to make room for new ones
            updatedList.removeError();

            // If this isn't the full, unfiltered list..
            if(app.dynamicList.length != app.masterList.length){
                
                // Clear all card from the bosy
                const body = document.querySelector('#gallery');
                body.innerHTML = '';

                // ... reset value of app.dynamicList to unfiltered list
                app.dynamicList = updatedList.prepareCardData(app.masterList); 
                
                // Render the full list
                updatedList.populateCards(app.dynamicList);
            }
        });
    }
}