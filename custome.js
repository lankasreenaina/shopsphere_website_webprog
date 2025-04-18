
let canvas = new fabric.Canvas('tshirt-canvas');

function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(300);
        img.scaleToWidth(300); 
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });
}

// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-color").addEventListener("change", function(){
    document.getElementById("tshirt-div").style.backgroundColor = this.value;
}, false);

// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-design").addEventListener("change", function(){

    // Call the updateTshirtImage method providing as first argument the URL
    // of the image provided by the select
    updateTshirtImage(this.value);
}, false);

// When the user clicks on upload a custom picture
document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
    var reader = new FileReader();
    
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;

        // When the picture loads, create the image in Fabric.js
        imgObj.onload = function () {
            var img = new fabric.Image(imgObj);

            img.scaleToHeight(300);
            img.scaleToWidth(300); 
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
        };
    };

    // If the user selected a picture, load it
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
}, false);

//TEXT
document.getElementById('add-text').onclick = function() {
    var text = document.querySelector('#tshirt-text').value;
    var textSample = new fabric.Text(text, {
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#000000',
        scaleX: 0.5,
        scaleY: 0.5,
        width: 150,
        fontWeight: '',
        hasRotatingPoint:true
    });
    canvas.add(textSample);
    canvas.renderAll();
};


//DROPDOWN BUTTON
let dropdownBtn = document.querySelector('.dropdown-menu');
let menuContent = document.querySelector('.dropdown-content');
dropdownBtn.addEventListener('click',()=>{
   if(menuContent.style.display===""){
      menuContent.style.display="block";
   } else {
      menuContent.style.display="";
   }
});

let dropdownBtn1 = document.querySelector('.dropdown-menu-1');
let menuContent1 = document.querySelector('.dropdown-content-1');
dropdownBtn1.addEventListener('click',()=>{
   if(menuContent1.style.display===""){
      menuContent1.style.display="block";
   } else {
      menuContent1.style.display="";
   }
});

let dropdownBtn2 = document.querySelector('.dropdown-menu-2');
let menuContent2 = document.querySelector('.dropdown-content-2');
dropdownBtn2.addEventListener('click',()=>{
   if(menuContent2.style.display===""){
      menuContent2.style.display="block";
   } else {
      menuContent2.style.display="";
   }
});

let dropdownBtn3 = document.querySelector('.dropdown-menu-3');
let menuContent3 = document.querySelector('.dropdown-content-3');
dropdownBtn3.addEventListener('click',()=>{
   if(menuContent3.style.display===""){
      menuContent3.style.display="block";
   } else {
      menuContent3.style.display="";
   }
});

//RANDOM-COLOR
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("random");
// const color = document.querySelector(".tshirt-color");

btn.addEventListener('click', function(){
	let hexColor = "#";
	for(let i = 0; i < 6; i++) {
		hexColor += hex[getRandomNumber()];
	}
	document.getElementById("tshirt-backgroundpicture").style.backgroundColor = hexColor;
	// color.textContent = hexColor;
});
function getRandomNumber() {
	return Math.floor(Math.random() * hex.length);
}

//REVERSE
//T-SHIRT

function reverse1Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("crew_front.png")) {
        imageId.src = "./assets/images/crew_back.png";
    }
}

function reverse2Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("crew_back.png")) {
        imageId.src = "./assets/images/crew_front.png";
    }
}



//HOODIES
function reverse3Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("mens_hoodie_front.png")){
        imageId.src = "./assets/images/mens_hoodie_back.png";
    }
}
function reverse4Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("mens_hoodie_back.png")){
        imageId.src = "./assets/images/mens_hoodie_front.png";
    } 
}

//SWEATSHIRT
function reverse5Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("mens_longsleeve_front.png")){
        imageId.src = "./assets/images/mens_longsleeve_back.png";
    }
}
function reverse6Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("mens_longsleeve_back.png")){
        imageId.src = "./assets/images/mens_longsleeve_front.png";
    }
}

//WOMEN
function reverse9Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("womens_crew_front.png")){
        imageId.src = "./assets/images/womens_crew_back.png";
    }
}
function reverse0Image() {
    var imageId = document.getElementById('tshirt-backgroundpicture');
    if(imageId.src.includes("womens_crew_back.png")){
        imageId.src = "./assets/images/womens_crew_front.png";
    }
}


// When the user selects a picture that has been added and press the DEL key
// The object will be removed !
document.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode;

    if(keyCode == 46){
        console.log("Removing selected element on Fabric.js on DELETE key !");
        canvas.remove(canvas.getActiveObject());
    }
}, false);

// EXPORTING
var myCanvas = document.getElementById('tshirt-div');
const btnDisplayFront = document.getElementById('btnDisplayFront');
const btnDisplayBack = document.getElementById('btnDisplayBack');

// btnDisplay.addEventListener("click", function () {
//     const dataURI = myCanvas[0].toDataURL();
//     console.log(dataURI);
//     // var img = new Image();
//     // img.src = dataURI;
//     // document.body.appendChild(img);
// })


btnDisplayFront.addEventListener('click', function() {
  domtoimage.toPng(myCanvas).then(function(dataUrl) {
      var imgGenerated = new Image();
      imgGenerated.src = dataUrl;
      document.getElementById("append-img-front").append(imgGenerated);
    });
    quantityChanged();
    removeCartItem();
    updateCartTotal();
});

btnDisplayBack.addEventListener('click', function() {
    domtoimage.toPng(myCanvas).then(function(dataUrl) {
        var imgGenerated = new Image();
        imgGenerated.src = dataUrl;
        document.getElementById("append-img-back").append(imgGenerated);
      });
      quantityChanged();
      removeCartItem();
      updateCartTotal();
});

var removeCartItemButtons = document.getElementsByClassName('cart-remover');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
};

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
};

var quantityInputs = document.getElementsByClassName('cart-quantity');
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
};

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    };
    updateCartTotal();
};

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-content')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-box')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
};