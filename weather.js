$(document).ready(function(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      //get location of user
      var x = position.coords.latitude;
      var y = position.coords.longitude;
      //get weather details
      $.getJSON("https://api.darksky.net/forecast/f98074bba36ffb96aa44abc641285c53/" + x + "," + y + "?exclude=minutely,hourly,daily,alerts,flags&callback=?", function(json){
        var temp = json.currently.temperature;
        var icon = json.currently.icon;
        //array of possible icons from API
        var icons = ["clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night"];
        //array of weather_icons to print to page
        var weather_icon = ["wi-day-sunny", "wi-night-clear", "wi-rain-mix", "wi-snow", "wi-sleet", "wi-cloudy-windy", "wi-fog", "wi-cloudy", "wi-day-cloudy-high", "wi-night-alt-partly-cloudy"];
        //define the current weather
        var summary = json.currently.summary;
        //icon = "clear-day"; /*test case*/
        var html = "";
        //match current icon with location in icons array to find correct weather_icon (ex. icons[2] => weather_icon[2] etc.)
        for (var i = 0; i < icons.length; i++){
          if (icon === icons[i]){
            //change weather_icon to match weather
            //<i class="wi wi-day-sunny"></i>
            html += "<i class=\"wi " + weather_icon[i] + "\"></i>";
            //console.log(icon);
            //console.log(weather_icon[i]);
            //console.log(html);
            $(".weather_icon").html(html);
          }
        }
        //get temp in F and C for later use
        var temp_in_fahrenheit = Math.round(temp) + " &#8457";
        var temp_in_celsius = Math.round(((temp - 32) * 5 / 9)) + " &#8451";
        //console.log(temp_in_celsius);
        //page will load with temp in F already visible and discription of weather
        $(".temp").html(temp_in_fahrenheit);
        $(".sum").html(summary);
        //quick function to allow switch between F and C with a single click
        var x = 1;
        $(".temp").on("click", function(){
          (x == 1) ? ($(".temp").html(temp_in_celsius), x -= 1) : ($(".temp").html(temp_in_fahrenheit), x += 1);
        })
    });
  })
  }
})
