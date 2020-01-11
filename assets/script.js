//Run when page loads

$(document).ready(function () {
    $("#submit").onload("click", function () {
        event.preventDefault();
//Variable that will return value from searchbar
        let searchbar = $(".searchbar").value();

 //Return Search Results with API documentation
        if (searchbar != '') {
            
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchbar + "&units=imperial" + "&APPID=ca41c4eea8b5971b71a7ea04a63fd171";
            
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function(response){
                console.log(response);
        
            //Populate Search Results
                let row = $("<tr>");
                let city = $("<th>").text(response.name);
                let row1 = $("<tr>");
                let temp = $("<td>").text(response.main);
                let row2 = $("<tr>");
                let humid = $("<td>").text(response.main.humidity);
                let row3 = $("<tr>");
                let wind = $("<td>").text(response.wind.speed);
                //let row4 = $("<tr>");
                //let uv = $("<td>").text(response.main.uv);

        // Append the td elements to the new table row
                row.append(city);
                row1.append(temp);
                row2.append(humid);
                row3.append(wind);
                //row4.append(uv);

      // Append the table row to the tbody element
                $("tbody").append(row);
                $("tbody").append(row1);
                $("tbody").append(row2);
                $("tbody").append(row3);
                //$("tbody").append(row4);
            });

        }else {
            $("#noblank").html("Cannot Be Blank")
        }
    })
});

  
 