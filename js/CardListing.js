class CardListing{
    constructor(currentStaff){
        this.currentStaff = currentStaff;
        const employeeList = this.prepareCardData(this.currentStaff);
        this.populateCards(employeeList);
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
                "dob" : employee.dob,
            }
        });
        app.staffList = cards;
        return cards;

    }


    populateCards(employeeList){
        console.log(employeeList);
        employeeList.map((employee)=> new Card(employee));
    }

    

    createSearchForm(){
        const searchForm = document.createElement('form');
        searchForm.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
                                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`;

        const searchFormContainer = document.querySelector('.search-container');
        searchFormContainer.appendChild(searchForm);
    }

    createSearchFormFunctionality(){

    }

    prevModal(event, userId){
        console.log('prev listing', event, userId);
    }
    nextModal(){

    }






}