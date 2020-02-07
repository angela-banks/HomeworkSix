//Run when page loads

//Array for city
let cities = []
if(localStorage.getItem("Cities")) {
    cities = JSON.parse(localStorage.getItem("Cities"))
};

function Listing() {
    for (let i=0; i < cities.length; i++){
        let li = $("<li>").text(cities[i]);
        $("#scrolling").append(li);
    }
}
//Clear Listing 
function clear() {
    $(".Days").text("");
    $("#scrolling").text("");
};

$("#clearCity").on("click", function(){
    $("#scrolling").empty("");
    localStorage.clear();
});

const API_KEY = "ca41c4eea8b5971b71a7ea04a63fd171"
$(document).ready(function () {
    $("#submit").on("click", function () {
        clear();
        event.preventDefault();
        //Variable that will return value from searchbar
        let searchbar = $(".search").val();
        searchbar = searchbar.charAt(0).toUpperCase() + searchbar.slice(1);

        if (cities.indexOf(searchbar) == -1) {
            console.log("test")
            cities.push(searchbar)
            let cityString = JSON.stringify(cities)
            localStorage.setItem("Cities", cityString)
        } 
        console.log(searchbar);
        //Return Search Results with API documentation
        if (searchbar != '') {

            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchbar + "&units=imperial" + "&APPID=" + API_KEY + "&units=imperial";

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
        //Local storage of cities
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
                        let h6 = $("<h5>")
                        let date = moment(FiveForecast[i].dt_txt).format("MM/DD/YYYY");
                        console.log(date);
                        //date.attr("class", "card-title")
                        let icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + FiveForecast[i].weather[0].icon + "@2x.png")
                        let temp = $("<div>").text("temp: " + (FiveForecast[i].main.temp))
                        let humidity = $("<div>").text("humidity: " + (FiveForecast[i].main.humidity))
                        h6.append(date);
                        cardbody.append(h6, icon, temp, humidity);
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
                  Listing();
                })

            });

        } else {
            $("#noblank").html("Cannot Be Blank")
        }
    })








});


