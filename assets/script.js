//Run when page loads

const API_KEY = "ca41c4eea8b5971b71a7ea04a63fd171"
$(document).ready(function () {
    $("#submit").on("click", function () {
        event.preventDefault();
        //Variable that will return value from searchbar
        let searchbar = $(".search").val();
        console.log(searchbar);
        //Return Search Results with API documentation
        if (searchbar != '') {

            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchbar + "&units=imperial" + "&APPID=" + API_KEY + "&units=imperial";

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                // //Populate & Append Search Results
                $("#city").text("City: " + response.name);
                console.log(response.name);
                $("#temp").text(response.main.temp);
                console.log(response.main.temp);
                $("#humid").text(response.main.humidity);
                $("#wind").text(response.wind.speed);
                $("#uv").text(response.main.uv);
                $("#icon").text(response.weather[0].icon);
                //Display weather icon per weather conditions
                let image = $("<img>");
                image.attr("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
                $("#icon").append(image);

                //Variable that will return value from searchbar
                // let searchbar = $(".searchbar").val();
                console.log(searchbar);

                //Return 5-Day Weather Search Results with API documentation

                let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchbar + "&units=imperial" + "&APPID=" + API_KEY + "&units=imperial";

                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function (responseone) {
                    console.log(responseone);
                    let FiveForecast = [];
                    let list = responseone.list;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].dt_txt.indexOf("00:00:00") > -1) {
                            FiveForecast.push(list[i]);
                        }
                    }
                    console.log(FiveForecast);
                    for( let i=0; i < FiveForecast.length; i++){
                        let card = $("<div>").attr("class", "card col-lg-2 p-1 card text-black bg-primary")
                        let cardbody = $("<div>").attr("class", "card-body p-0 text-center")
                        let date = $("<h5>").text(FiveForecast[i].dt_txt);
                        date.attr("class", "card-title")
                        let icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + FiveForecast[i].weather[0].icon + "@2x.png")
                        let temp = $("<div>").text("temp: " + (FiveForecast[i].main.temp))
                        let humidity = $("<div>").text("humidity: " + (FiveForecast[i].main.humidity))
                        cardbody.append(date, icon, temp, humidity);
                        card.append(cardbody)
                        $(".Days").append(card);
                    }
                    //uv call
                    let uv = "http://api.openweathermap.org/data/2.5/uvi?";
                    let cor = "lat=" + response.coord.lat + "&lon=" + response.coord.lon;
                    let uvURL = uv + cor + "&APPID=" + API_KEY;
                    console.log(uvURL);
                    $.ajax({
                        url: uvURL,
                        method: "GET"
                    }).then(function (response){
                        console.log(response);
                        let index = $("<mark>").text(response.value)
                        index.attr("class", function(response){
                            if (response.value < 4 ){
                                return "text-success" 
                            } else if (response.value < 8 ){
                                return "text-warning"
                            } else {
                                return "text-danger"
                            }
                        })
                        let UV = $("<div>").text("UV Index: ")
                        UV.append(index)
                        $(".container").append(UV)
                        
                    })
                })

            });

        } else {
            $("#noblank").html("Cannot Be Blank")
        }
    })








});


