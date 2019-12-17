/**
 * 
 */

class Card{
    constructor(userIndex, id, img, name, email, city, state, phone, address, dob){
        this.userIndex = userIndex;
        this.id = id;
        this.img = img;
        this.name = name;
        this.email = email;
        this.city = city;
        this.state = state;
        this.phone = phone;
        this.address = address;
        this.dob = dob;

        
        
        this.createCard(this.userIndex, this.id.name + this.id.value, this.img, this.name, this.email, this.city, this.state);
        

        

    }

    setupModalEvent(card){
        card.addEventListener('click', (event)=>{
            this.createModal(this);
            console.log(this);
        });

    }

    createCard(index, id, img, name, email, city, state){
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', id);
        card.setAttribute('data-index', index);

        //Create blank card markup and insert it into wrapper
        card.innerHTML = `  <div class="card-img-container">
                                <img class="card-img" src="${this.img}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap"> ${this.name} </h3>
                                <p class="card-text">${this.email}</p>
                                <p class="card-text cap">${this.city}, ${this.state}</p>
                            </div>`;
        
        // Grab gallery div
        const gallery = document.getElementById('gallery');
        //Insert card
        gallery.appendChild(card);

        this.setupModalEvent(card);
    }

    createModal(card){

        const modal = document.createElement('div');
        modal.className = 'modal-container';

        modal.innerHTML = `<div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${this.img}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${this.name}</h3>
                                    <p class="modal-text">${this.email}</p>
                                    <p class="modal-text cap">${this.state}</p>
                                    <hr>
                                    <p class="modal-text">${this.phone}</p>
                                    <p class="modal-text">${this.address}</p>
                                    <p class="modal-text">Birthday: ${this.dob}</p>
                                </div>
                            </div>
                            <div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                            </div>`;

        const body = document.querySelector('body');
        body.appendChild(modal);

        const closeBtn = document.getElementById('modal-close-btn');
        closeBtn.addEventListener('click', (event)=>{
            this.closeModal(body, modal);
        });

        const nextBtn = document.getElementById('modal-next');
        nextBtn.addEventListener('click', event=>{
          //  console.log(this.next());
        });
        const prevBtn = document.getElementById('modal-prev');

        prevBtn.addEventListener('click', event=>{

        });
    }
    closeModal(body, modal){
        body.removeChild(modal);
    }

        
}


