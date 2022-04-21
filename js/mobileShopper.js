const searchPhone = () => {
    const searchResult = document.getElementById('search-result');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    //clear data
    searchResult.textContent = '';
    if (searchText == '') {
        //please write something to display
        const div = document.createElement('div');
        div.classList.add('h2');
        div.innerHTML = `
        <div class="h-100">
            <div class="text-center">
                <h2 class="">Please write something!!!!!</h2>
        </div>
        `;
        searchResult.appendChild(div);
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(phones => displaySearchResult(phones.data));
    }
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    //clear data
    searchResult.textContent = '';
    if (data.length == 0) {
        //no result found
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="h-100">
            <div class="text-center">
                <h2 class="">No Result Found!!!!!</h2>
        </div>
        `;
        searchResult.appendChild(div);

    }
    else if (data.length <= 20) {
        data.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto mt-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-outline-secondary" type="button"
                id="button-search">details</button>
                    </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
    else {
        data.length = 20;
        data.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto mt-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-outline-secondary" type="button"
                id="button-search">details</button>
                    </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}

// load phone detail 
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

// display phone detail 
const displayPhoneDetail = phone => {
    const searchResult = document.getElementById('search-result');
    //clear data
    searchResult.textContent = '';
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto mt-5" alt="...">
        <div class="card-body">
            <h4 class="card-title">Brand: ${phone.brand}</h4>
            <h4 class="card-name">Name: ${phone.name}</h4>
            <h4 class="card-date">Release Date: ${phone.releaseDate}</h4>
            <h4 class="card-features">Main Features:</h4>
            <ul>
                <li class="card-date">Chip Set: ${phone.mainFeatures.chipSet}</li>
                <li class="card-date">Display Size: ${phone.mainFeatures.displaySize}</li>
                <li class="card-date">Memory: ${phone.mainFeatures.memory}</li>
                <li class="card-features">Sensors:</li>
                <ol>
                    <li class="card-date">${phone.mainFeatures.sensors[0]}</li>
                    <li class="card-date">${phone.mainFeatures.sensors[1]}</li>
                    <li class="card-date">${phone.mainFeatures.sensors[2]}</li>
                    <li class="card-date">${phone.mainFeatures.sensors[3]}</li>
                    <li class="card-date">${phone.mainFeatures.sensors[4]}</li>
                    <li class="card-date">${phone.mainFeatures.sensors[5]}</li>
                </ol>
            </ul>
            <h4 class="card-features">Other Informations:</h4>
            <ul>
                <li class="card-date">Bluetooth: ${phone.others.Bluetooth}</li>
                <li class="card-date">GPS: ${phone.others.GPS}</li>
                <li class="card-date">NFC: ${phone.others.NFC}</li>
                <li class="card-date">Radio: ${phone.others.Radio}</li>
                <li class="card-date">USB: ${phone.others.USB}</li>
                <li class="card-date">WLAN: ${phone.others.WLAN}</li>
            </ul>
        </div>
    `;
    phoneDetails.appendChild(div);
}
