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
        var icons = ["clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night"];
        //array of background images
        var background = ["wi-day-sunny", "wi-night-clear", "wi-rain-mix", "wi-snow", "wi-sleet", "wi-cloudy-windy", "wi-fog", "wi-cloudy", "wi-day-cloudy-high", "wi-night-alt-partly-cloudy"];
        var summary = json.currently.summary;
        //icon = "clear-day"; /*test case*/
        var html = "";
        //match current icon with location in icons array to find correct background image (ex. icons[2] = background[2] etc.)
        for (var i = 0; i < icons.length; i++){
          if (icon === icons[i]){
            //console.log(background[i]);
            //change icon to match weather
            //<i class="wi wi-day-sunny"></i>
            html += "<i class=\"wi wi-fw " + background[i] + "\"></i>";
            //console.log(html);
            /*html += "<i class='wi '>\"";
            html += background[i] + ></i>
            html += ""*/
            $(".icon").html(html);
            console.log(background[i]);
            console.log(html);
          }
        }
        //get temp in F and C for later use
        var temp_in_fahrenheit = Math.round(temp) + " &#8457";
        var temp_in_celsius = Math.round(((temp - 32) * 5 / 9)) + " &#8451";
        console.log(icon);
        //console.log(temp_in_celsius);
        //page will load with temp in F already visible and discription of weather
        $(".here").html(temp_in_fahrenheit);
        $(".there").html(summary);
        //quick function to allow switch between F and C with a single click
        var x = 1;
        $(".here").on("click", function(){
          (x == 1) ? ($(".here").html(temp_in_celsius), x -= 1) : ($(".here").html(temp_in_fahrenheit), x += 1);
        })
    });
  })
  }
})
