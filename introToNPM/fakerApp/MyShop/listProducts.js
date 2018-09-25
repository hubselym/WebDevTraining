var fake = require('faker');


function faker(){
    console.log("====================");
    console.log("Welcome To My Shop!");
    console.log("====================");
    for (var i = 0; i < 10; i++) {
        console.log(fake.fake("{{commerce.productName}} - ${{commerce.price}}"));
    }
}

faker();