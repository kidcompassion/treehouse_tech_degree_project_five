/**
 * 
 */

class Modal{
    constructor(card, currentEmployee){
  
  this.createModal(card, currentEmployee);

    }



    createModal(card, employee){
        console.log(card);
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
                                    <p class="modal-text">${employee.address}</p>
                                    <p class="modal-text">Birthday: ${employee.dob}</p>
                                </div>
                            </div>
                            <div class="modal-btn-container">
                                <button type="button" id="modal-prev" data-user="${employee.index}" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" data-user="${employee.index}"class="modal-next btn">Next</button>
                            </div>`;

        const body = document.querySelector('body');
        body.appendChild(modal);

        const closeBtn = document.getElementById('modal-close-btn');
        closeBtn.addEventListener('click', (event)=>{
            this.closeModal(body, modal);
        });


        this.nextModal(card, employee);
        this.prevModal(card, employee);
     
    }
    nextModal(card, employee){
        //Add listener to modal's next button
        const nextBtn = document.getElementById('modal-next');
        nextBtn.addEventListener('click', event=>{
            
            console.log(employee);
            let nextUser = employee.index+1;
            this.createModal(card, app.staffList[nextUser]);
        });
    }

    prevModal(card, employee){
           //Add listener to modal's prev button
           const prevBtn = document.getElementById('modal-prev');
           prevBtn.addEventListener('click', event=>{
            console.log(employee);
               let prevUser = employee.index-1;

               this.createModal(card, app.staffList[prevUser]);
               //Add handler for cases where value is negative
               //Use the returned value to get the data for this user
             //  console.log(app.allEmployees[prevUser]);
   
           });
    }

    closeModal(body, modal){
        body.removeChild(modal);
    }

}


