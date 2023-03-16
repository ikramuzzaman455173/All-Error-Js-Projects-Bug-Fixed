const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    const noPhone = document.getElementById('no-found-message');
    // phonesContainer.textContent = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10) {
        phones = phones.splice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
        noPhone.classList.add('d-none')
    }


    // display no phones found
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    // display all phones
    phonesContainer.innerHTML=''
    phones.forEach(phone =>{
        const phoneDiv  = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    toggleSpinner(false);
}

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    let modalTitle = document.getElementById("phoneDetailModalLabel");
    modalTitle.innerText = phone.name;
    let phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML =
        `<p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found !'}</p>
        <p>Storage: ${phone.mainFeatures?phone.mainFeatures.storage:'Phone Storage Not Found'}</p>
        <p>Others: ${ phone.others ? phone.others.Bluetooth : "No Bluetooth Information"}</p>
        <p>Sensor: ${phone.mainFeatures.sensors? phone.mainFeatures.sensors[0]: "no sensor"}</p>`;
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')

    }
    else{
        loaderSection.classList.add('d-none');
    }
}
let phoneName
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value||phoneName
    phoneName=searchText
    loadPhones(searchText, dataLimit);
    searchField.value=''
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch();
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});




// not the best way to load show All
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})



loadPhones('apple');
