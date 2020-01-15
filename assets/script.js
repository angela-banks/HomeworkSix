//Run when page loads

$(document).ready(function () {
    $("#submit").on("click", function () {
        event.preventDefault();
//Variable that will return value from searchbar
        let searchbar = $(".search").val();
        console.log(searchbar);
 //Return Search Results with API documentation
        if (searchbar != '') {
            
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchbar + "&units=imperial" + "&APPID=ca41c4eea8b5971b71a7ea04a63fd171";
           
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function(response){
                console.log(response);
            // //Populate & Append Search Results
                $("<city>").innerHTML = "response.name";
                console.log(response.name);
                $("temp").innerHTML = "response.main.temp";
                console.log(response.main.temp);
                $("<humid>").innerHTML = "response.main.humidity";
                $("wind").innerHTML = "response.wind.speed";
                $("<uv>").innerHTML = "response.main.uv";
                $("<icon>").innerHTML = "response.weather[0].icon";
            });

        }else {
            $("#noblank").html("Cannot Be Blank")
        }
    })


    //Variable that will return value from searchbar
    let searchbar = $(".searchbar").val();
    console.log(searchbar);

 //Return 5-Day Weather Search Results with API documentation
 if (searchbar != '') {
            
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchbar + "&units=imperial" + "&APPID=ca41c4eea8b5971b71a7ea04a63fd171";
   
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(displayResults){
        console.log(response);
    })

function displayResults ({

})

}

});



  
 