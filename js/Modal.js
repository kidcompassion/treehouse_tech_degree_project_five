/**
 *  Modal
 *  -----------------
 *  Renders the modal window and creates associated functionality for modal "pagination"
 */

class Modal{
    constructor(card, currentEmployee){
        this.totalEmployees = app.masterList.length - 1;
        this.filteredEmployees = app.filteredList;
        this.createModal(card, currentEmployee);
    }


    /**
     * Generates the modal template, including close btn and pagination
     * @param {Node} card 
     * @param {Object} employee 
     */

    createModal(card, employee){
        const existingModal = document.querySelector('.modal-container');

        // Delete the previous modal just to avoid them piling up
        if(existingModal!== null){
            existingModal.parentNode.removeChild(existingModal);
        }

        // Create template for modal
        const modal = document.createElement('div');
        modal.className = 'modal-container';

        modal.innerHTML = `<div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${employee.img.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${employee.name}</h3>
                                    <p class="modal-text">${employee.email}</p>
                                    <p class="modal-text cap">${employee.state}</p>
                                    <hr>
                                    <p class="modal-text">${employee.phone}</p>
                                    <p class="modal-text">${employee.address.street.number} ${employee.address.street.name}</p>
                                    <p class="modal-text">Birthday: ${employee.dob}</p>
                                </div>
                            </div>;
                            <div class="modal-btn-container">
                                <button type="button" id="modal-prev" data-user="${employee.index}" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" data-user="${employee.index}"class="modal-next btn">Next</button>
                            </div>`;

        // Append modal to DOM body
        const body = document.querySelector('#gallery');
        body.appendChild(modal);

        // Create and add event listener to button, closing modal and removing it from DOM
        const closeBtn = document.getElementById('modal-close-btn');
        closeBtn.addEventListener('click', (event)=>{
            this.closeModal(body, modal);
        });

        // If there's only one user returned in the search, hide the pagination
        if(app.dynamicList.length === 1){
            document.querySelector('.modal-btn-container').style.display = 'none';
        } else {
            document.querySelector('.modal-btn-container').style.display = 'inline-block';
        }

        // Set up pagination functionality
        this.nextModal(card, employee);
        this.prevModal(card, employee);
        
     
    }

    /**
     * 
     * Creates functionality for the "next" button in the modal
     * @param {Node} card 
     * @param {Object} employee 
     */

    nextModal(card, employee){
        // Grab next button
        const nextBtn = document.getElementById('modal-next');
        
        let nextEmployee;
        
        // When next btn is clicked...
        nextBtn.addEventListener('click', event=>{

             // If current modal is NOT last in the list, increment it up by 1 to get next employee 
            if (employee.index !== app.dynamicList.length - 1 ){
                nextEmployee = employee.index+1;
            } else {
                // If current modal is last in the list, jump to the first item in the list
                nextEmployee = 0;
            }
            //Create a new modal for the next person on the list
            this.createModal(card, app.dynamicList[nextEmployee]); 
        });
    }

    prevModal(card, employee){
        
        // Grab prev btn
        const prevBtn = document.getElementById('modal-prev');

        let prevEmployee;
        
        // When prev btn is clicked...
        prevBtn.addEventListener('click', event=>{
            
            // If current modal is NOT first in the list, increment it down by 1 to get previous employee 
            if (employee.index > 0 ){
                prevEmployee = employee.index-1;
            } else {
            // If current modal is first in the list, jump to the last item in the list
                prevEmployee = app.dynamicList.length-1;
            }
           
            //Create new modal for prev employee
            this.createModal(card, app.dynamicList[prevEmployee]);
        });
    }

    // Remove modal from DOM
    closeModal(body, modal){
        body.removeChild(modal);
    }

}


