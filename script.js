window.onload = function(){
};

// onclick event after pressing one of categories
function pressButton(category) {
    var appUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=' + category.value;

    var request = new XMLHttpRequest(); 
    request.open('GET', appUrl, true);
    request.responseType = 'json';
    request.onload = function () {

      if (request.status >= 200 && request.status < 400) {

        var data = this.response;
        console.log(data);

        var productCount = document.getElementById('productCount');

        // delete count
        if (productCount.hasChildNodes()) {
            productCount.removeChild(child_count);
        }

        var productName = document.getElementById('productList');

        // delete products list
        if (productName.hasChildNodes()) {
            var pElements = document.getElementsByClassName('child_product');
            while(pElements.length > 0){
                pElements[0].parentNode.removeChild(pElements[0]);
            }
            
            var imgElements = document.getElementsByClassName('child_image');
            while(imgElements.length > 0){
                imgElements[0].parentNode.removeChild(imgElements[0]);
            }
        }

        // add count by creating new p element
        var newElement = document.createElement("p");          
        var countNum = document.createTextNode(category.value + ' : ' + data.length + ' products found');
        newElement.setAttribute("id","child_count"); 
        newElement.appendChild(countNum);
        productCount.appendChild(newElement);

        // add brand name, product name, and image
        data.forEach((makeup) => {

            if (makeup.brand == null){
                makeup.brand = 'No brand name found on API';
            }

            // show image by creating new img element
            var image = document.createElement("img"); 
            image.setAttribute("class","child_image"); 
            image.setAttribute("src", 'http:' + makeup.api_featured_image)
            productName.appendChild(image);

            // show brand name and product name by creating new p element
            var newElement = document.createElement("p"); 
            var newContent = document.createTextNode(makeup.brand + '/' + makeup.name); 
            newElement.appendChild(newContent); 
            newElement.setAttribute("class","child_product"); 
            productName.appendChild(newElement);
        })
      } else {
        console.log('error')
    }
    };
    request.send();
}

