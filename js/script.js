var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var productImage = document.getElementById("productImage")
var displayImage = document.getElementById("displayImage")
var productList = [];
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var currentIndex;

if (localStorage.getItem("productList") != null) {
    productList = JSON.parse(localStorage.getItem("productList"))
    displaydata(productList)
}

function addProduct() {

    var reader = new FileReader();
    var imageFile = productImage.files[0];

    reader.onload = function (event) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDescription.value,
            image: event.target.result
        };

        productList.push(product);
        updatelocalstorage()
        updateInputValue();
        displaydata(productList);
        console.log(productList);
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

}

function displaydata(list) {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        cartona += `<div class="col-md-4 col-sm-6 mb-4">
                        <div class=" rounded-3 overflow-hidden shadow">
                            <img src="${list[i].image}" class="w-100"  alt="Product Image">
                            <div class="caption p-3">
                                <h5 class="mb-3">Name :<span> ${list[i].name}</span></h5>
                                <h5 class="mb-3">Price :<span> EGP ${list[i].price}</span></h5>
                                <h5 class="mb-3">Category :<span> ${list[i].category}</span></h5>
                                <h6 class="mb-3">Description :<span> ${list[i].desc}</span></h6>
                                <button onclick="getDataToUpdate(${i})" class="btn btn-outline-primary mb-2 w-100">Update</button>
                           <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100">Delete</button>
                            </div>
                        </div>
                    </div>`;
    }
    document.getElementById("displayData").innerHTML = cartona;
}

function updateInputValue(config) {
    productName.value = config ? config.name : null;
    productPrice.value = config ? config.price : null;
    productCategory.value = config ? config.category : null;
    productDescription.value = config ? config.desc : null;
    productImage.value = null;
}

function deleteProduct(index) {
    productList.splice(index, 1);
    updatelocalstorage()
    displaydata(productList);
}

function getDataToUpdate(index) {
    currentIndex = index
    updateInputValue(productList[index])
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    console.log(addBtn);
    console.log(updateBtn);

}
function updateProduct() {
    productList[currentIndex].name = productName.value
    productList[currentIndex].price = productPrice.value
    productList[currentIndex].category = productCategory.value
    productList[currentIndex].desc = productDescription.value
    displaydata(productList)
    updatelocalstorage()
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    updateInputValue()
}
function updatelocalstorage(){
    localStorage.setItem("productList", JSON.stringify(productList))
}


function search(searchValue) {
    console.log(searchValue)
    if(searchValue == ""){
        displaydata(productList)
        return
    }
    var searchItem=[];
 for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
        searchItem.push(productList[i])
    }
 }
displaydata(searchItem)
}