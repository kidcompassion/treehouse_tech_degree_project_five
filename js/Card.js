/**
 * 
 */

class Card{
    constructor(employee){
        this.modal = [];

        this.createCard(employee);
        
      //  console.log(this);
        

    }

    setupModalEvent(card, employee){
        card.addEventListener('click', (event)=>{
            this.modal = new Modal(card, employee);
        });

    }

    createCard(employee){
      //  console.log(employee);
        const card = document.createElement('div');
        card.className = 'card';
        //card.setAttribute('data-id', id);
       // card.setAttribute('data-index', index);

        //Create blank card markup and insert it into wrapper
        card.innerHTML = `  <div class="card-img-container">
                                <img class="card-img" src="${employee.img.medium}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap"> ${employee.name}</h3>
                                <p class="card-text">${employee.email}</p>
                                <p class="card-text cap">${employee.city}, ${employee.state}</p>
                            </div>`;
        
        // Grab gallery div
        const gallery = document.getElementById('gallery');
        //Insert card
        gallery.appendChild(card);

        this.setupModalEvent(card, employee);

    }

        
}


