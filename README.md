This is a weather app created using React

This was made using two API's

The first API (https://api-ninjas.com/api/city)
takes a city name and returns the latitude and longitutde

Ex:  "San Francisco" -> 
        {"latitude": 37.7562,
        "longitude": -122.443}

Then I took the latitude and longitude and put it into 
a weather API (https://open-meteo.com) which returned 
a list of temperatures and rain probabilities for 
the next 7 days.

I then took this data and displayed the 7 days and when you
click on a specific day, it shows you a chart (chartJS) of the 
temperature and chance of rain throughout the day
