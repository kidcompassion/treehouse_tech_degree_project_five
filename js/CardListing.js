class CardListing{
    constructor(currentStaff){
        this.currentStaff = currentStaff;
        const employeeList = this.prepareCardData(this.currentStaff);
        this.populateCards(employeeList);
        this.createSearchForm();
    }

    prepareCardData(data){
        let cards = [];
        data.map((employee, index)=>{
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
        app.staffList = cards;
        return cards;

    }

    setDateToString(dob){
        let dateString = new Date(dob);
        dateString = dateString.toISOString().substring(0, 10);
        return dateString;

    }

    populateCards(employeeList){
        employeeList.map((employee)=> new Card(employee));
    }

    

    createSearchForm(){
        const searchForm = document.createElement('form');
        searchForm.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
                                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`;

        const searchFormContainer = document.querySelector('.search-container');
        searchFormContainer.appendChild(searchForm);
        this.createSearchFormFunctionality();
        
    }

    createSearchFormFunctionality(){
        const searchField = document.getElementById('search-input');
        const searchSubmit = document.getElementById('search-submit');

        searchSubmit.addEventListener('click', (event)=>{
            //pass searchField.value into the current all employees list
            //console.log('search', this.prepareCardData(this.currentStaff));

            let searchTerm = searchField.value;
            let allEmployees = this.prepareCardData(this.currentStaff);
            let searchedEmployees = [];
            allEmployees.find((employee)=>{
                
            //console.log(employee.name);    
                
                if(employee.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    
                    searchedEmployees.push(employee);
                };
             //console.log(employee.name.toLowerCase(), searchTerm.toLowerCase());    
                
            });

            event.preventDefault();
            this.clearSearch(searchField);
            this.updateCards(searchedEmployees);
            
            
        });
        
    }

    updateCards(employeeList){
        console.log(employeeList);

        const body = document.querySelector('#gallery');
        body.innerHTML = '';
        this.populateCards(employeeList);
        
    }

    clearSearch(searchField){
        

        const updatedList = this;
        searchField.addEventListener('search', function () {
            const body = document.querySelector('#gallery');
        body.innerHTML = '';
            console.log('clear');
            updatedList.populateCards(app.staffList);
            
        });
    }

    

   
    prevModal(event, userId){
        console.log('prev listing', event, userId);
    }
    nextModal(){

    }






}