//Using the command line, create a file "echo.js"

//Inside the file, write a function named echo that takes 2 arguments: a stringa nd a number
// It should print out the string, number number of times

function echo(str,num){
    for(var i = 0; i < num; i++){
        console.log(str);
    }
}


echo("Echo!!!", 10)
echo("Tater Tots", 3)
