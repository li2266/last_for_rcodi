Gold Ironhack Phase 5 (11/21/2017) -
Name of Application: Hounder

Keywords: cheap, safe, affordable, easy

Datasets and Function Design:
The primary online climate data is to be used and can be found at: https://www.ncdc.noaa.gov/cdo-web/webservices/v2. The detailed weather can be displayed by the click of a button if the user wishes to see it otherwise a general temperature is seen with my D3.js

Used https://data.cityofnewyork.us/ to find safe parts of New York. I also searched through the data and made it show the user the amount of assaults and alcohol deaths. In addition I was able to use one of the housing datasets to provide the user with accurate housing information like the coordinates. From this source I was able to find a

In addition to those datasets I explored the D3 library at http://d3js.org/ and created a diagram for my weather information to be presented.


Brief Description:
In this phase I added in more datasets. I also made relevant data show up on the web page and made a way for the user to print their favorite choices. I have also started using ajax and jQuery to display data. However at this point in time I have been unsuccessful and tried to find alternative ways to display data using javascript.

Map View:
Currently there is a basic map with the specified location of NYU’s Business school (40.7291° N, 73.9965° W) was implemented with the help of the Google Maps API (link: https://developers.google.com/maps/documentation/javascript/adding-a-google-map). I added a drop down menu with checkboxes to add transportation information layers.
Data Visualization:
My current data visualization is portrayed through my google maps API. I have also provided weather data and the choice to get more specific information on the current weather. In addition, I have coded of my data visualizations and put all rental data in an easy to understand table. I also worked to make this web app as simple as possible. However, I mostly focused on displaying data.

Interaction Form:
There is currently a textbox that a user needs to fill in for a budget price. All the questions have checks to make sure that the user is answering them appropriately. After the user clicks the submit button the application will take their input, check if it is in the correct format, and show the results in a table. 
[Y] Any information output: text area, table, menu options, map layer options, print
[Y] Any operation option: submit → results page, view weather, view map layers, get more housing results, print results
[Y] Any information input: user budge 
[Y] Interaction with Map: marker, data overlays (ex. Traffic, bus stops, bike routes, etc)
[Y] Interaction with data visualization: can move the map (ex. Scroll and zoom), click buttons on map to get different transportation information that the user desires, look at traffic, and different transportation routes, get more weather information, print button, get more results

Build Information:
As of now there is no external dependency used and this project currently uses HTML/CSS/JavaScript. In the future I may use an external dependency and if I do it will be recorded in the associated readme file.

Context:
~ README.txt --This file.
~ index.html --Web page for the App
~ style.css --CSS style file for formatting
~ js --A directory contains all the javascript functions
~HousingProfile.html -- form of what the user is looking for in housing
Test browser:
This was tested in Google Chrome.
Additional information:
I had numerous problems with making my data show up and didn’t know how to get ajax variables to display in html.

