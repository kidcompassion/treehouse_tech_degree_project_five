/**
 *  Card
 *  -----------------
 *  Renders the individual cards, and triggers creation of new modals on an as needed basis
 */

class Card{
    constructor(employee){
        this.modal = [];
        this.createCard(employee);
    }

    /**
     * create click event to employee card, so we can trigger modal
     * @param {Node} card 
     * @param {Object} employee 
     */
    setupModalEvent(card, employee){
        card.addEventListener('click', (event)=>{
            this.modal = new Modal(card, employee);
        });
    }

    /**
     * Create card template and add modal click event to card
     * @param {Object} employee 
     */
    createCard(employee){
        // Create and render card template
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `  <div class="card-img-container">
                                <img class="card-img" src="${employee.img.medium}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap"> ${employee.name}</h3>
                                <p class="card-text">${employee.email}</p>
                                <p class="card-text cap">${employee.city}, ${employee.state}</p>
                            </div>`;
        
        // Add card template to listing page
        const gallery = document.getElementById('gallery');
        gallery.appendChild(card);

        // Adds click event to the card, which triggers creation of modal
        this.setupModalEvent(card, employee);
    }
}


