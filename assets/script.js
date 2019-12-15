//Weather Single Day API
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q={city name}, {country code}&AAPID=ca41c4eea8b5971b71a7ea04a63fd171";
  let searchedItem = document.querySelector("[data-searched");
  let response = searchedItem


  let q= ""
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $(".tempature").text(response.main.temp);
    //Convert Temp
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);
        console.log(tempF);

        $(".humid").text(response.main.humidity);
        $(".wind").text(response.wind.speed);
        //$(".uv").text(response.);

    $(".container").append(text);
    })
     
  
 