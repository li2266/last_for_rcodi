Gold Ironhack Phase 2 (11/06/2017) -
Name of Application: Hounder

Keywords: Organized, easy, aesthetically pleasing, straight-to-the-point, accurate

Datasets and Function Design:
The primary online climate data is to be used and can be found at: https://www.ncdc.noaa.gov/cdo-web/webservices/v2. However, I am still exploring the different types of data sets that are available. I am currently working on searching through the dataset to display relevant data to my user. I mostly focused on organizing my web app so that my data can be displayed in the next phase in an easily understandable fashion. I hope to use D3.js to display a bar graph of the weather throughout the year with a drop down of more information such as the current weather.

I also started connecting to dataset from “Zillow” (https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research/documentation/documentation) so that in the future I know how to connect to other datasets from this source. I plan to use the same code but change the URL to connect to datasets regarding open housing and prices. As of now I have focused on asking the user for what they are looking for and saving their responses so that I can use those answers to search through this dataset.

In addition to those datasets I plan to explore the D3 library at http://d3js.org/ in order to create interactive graphs which will help my user understand the weather data so that they can decide on what method of transportation they would like to take and how far away they would like to live from NYU. 

Brief Description:
In this phase I made this more like an organized web application that the user can interact with.  I worked on connecting to another dataset. I also worked on adding features to the google map such as bike routes, bus stops, and traffic.  As of now there is a set of general questions for the user with checks to find out what the user is looking for in a house/apartment. In the next phase, I will use these responses in finding top housing choices for my user.  

Map View:
Currently there is a basic map with the specified location of NYU’s Business school (40.7291° N, 73.9965° W) was implemented with the help of the Google Maps API (link: https://developers.google.com/maps/documentation/javascript/adding-a-google-map). In the future I hope to implement buttons on the map that would show traffic, bike routes, bus stops, and train stations rather than one map with all of this information at once. In one of the future phases I hope to even get cloud cover or a heat map and possibly add markers for saved housing that the user may wish to go back to. 

Data Visualization:
I do not currently have any data visualization and hope to implement this in phase 3 by adding in bar charts to show pricing and a way for my user to interactively rate the results in order to improve output accuracy. In addition I will add in distinct markers to the map of the location of each outputted result. I also hope to enable users to hover over the graph and have data values given to them.

Interaction Form:
There is currently a textbox that a user needs to fill in for a desired rent price, username, and password. There is also a question regarding a desired method of transportation with checkboxes and a question about affordability and safety with radio buttons.  All the questions have checks to make sure that the user is answering them appropriately. After the user clicks the submit button the application will take their input, check if it is in the correct format, and open up a results page. I hope to implement a cross reference with the dataset(s) that output the two most affordable/worth-it (ex. In terms of cost and distance & how the location is affected by the weather) and safest options in the next phase. I also hope to implement an information feature where a user can click on a marker and receive information about the rental.
[Y] Any information output: text area, checkboxes, radio buttons
[Y] Any operation option: submit → results page
[Y] Any information input: user preferences
[Y] Interaction with Map: marker, data overlays (ex. Traffic, bus stops, bike routes, etc)
[Y] Interaction with data visualization: can move the map (ex. Scroll and zoom), click buttons on map to get different transportation information that the user desires

Build Information:
As of now there is no external dependency used and this project currently uses HTML/CSS/JavaScript. In the future I may use an external dependency and if I do it will be recorded in the associated readme file.

Context:
~ README.txt --This file.
~ index.html --Web page for the App
~ style.css --CSS style file for formatting
~ js --A directory contains all the javascript functions
~Cart.html -- coming soon and will contain any housing options that the user may wish to rent from
~WishList.html -- coming soon and will contain any housing options that the user may want in the futer
~HousingProfile.html -- form of what the user is looking for in housing
~HousingResults.html -- takes housing profile data and shows results of best housing options
Test browser:
This was tested in Google Chrome.
Additional information:
The current problem that I have is that my web app requires a user to create a new housing profile every time the “Housing Search” tab is clicked. However, instead of the creation of a new profile each time this tab is clicked, I want it to show a different page only if the user has already created a housing profile. I also have a problem of not knowing how to add a button to the google map that can show and hide information such as traffic so I posted a question in the forum. I hope to ask the TA for advice on solving this issue.
