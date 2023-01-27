//assignment 4 stuff
var totalNum;

function buildCardUsingDOMAPI(container, data){
    let photoCount_Div = document.getElementById("photo-count");

    let cardDiv = document.createElement("div");
    cardDiv.addEventListener('click', function(ev){
        
        var fadeTarget = ev.currentTarget;
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                fadeTarget.remove();
            }
        }, 150);
        totalNum -= 1;
        photoCount_Div.innerHTML = totalNum;
    })
    cardDiv.setAttribute("class", "photo-card");
    let imgDiv = document.createElement("img");
    imgDiv.setAttribute("src", data.url);
    imgDiv.setAttribute("class", "photo-img");
    let idDiv = document.createElement("div");
    idDiv.setAttribute("class", "photo-id");
    let titleP = document.createElement("p");
    titleP.setAttribute("class", "photo-title");
    titleP.appendChild(document.createTextNode(data.title));
    idDiv.appendChild(titleP);
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(idDiv);
    container.appendChild(cardDiv)
}

function fetchItems(){
    fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
        .then(function(response){
            return response.json();
        })
        .then((data) => {
            totalNum = data.length;
            let products = data.albums;
            let containerDiv = document.getElementById('photo-list');
            let containerFragment = document.createDocumentFragment();

            let photo_count_Div = document.getElementById("photo-count");
            photo_count_Div.innerHTML = totalNum;

            data.forEach(function(product) {
                // console.log(product);
                buildCardUsingDOMAPI(containerFragment, product);
            });
            containerDiv.appendChild(containerFragment);
            // console.log(data[0].title)
    });
    console.log("It's working! - Anakin");
}
fetchItems();

