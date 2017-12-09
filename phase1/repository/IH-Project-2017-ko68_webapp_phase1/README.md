Gold Ironhack Phase 1 (11/01/2017) -
Name of Application: Housing World

Keywords: simplistic, easy, detail oriented, affordable, safety first


Datasets and Function Design:
The primary online climate data is to be used and can be found at: https://www.ncdc.noaa.gov/cdo-web/webservices/v2. However, I am still exploring the different types of data sets that are available. I am currently working on connecting my application to one of the datasets in order to print out desired data to make sure that I have the correct code.  I hope to use this data to search by a New York zip code in order to find the average weather of each academic semester.  I will then use my findings to output the mean weather and what a prospective renter should expect along with transportation options to get to college.  

I also plan to use datasets from https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research/documentation/documentation to get average housing prices and appartment availability so that I can have my user input their desired rent and search through a data set from this source to find the best pricing options and then cross reference them with distance and safety factors in order to find the best housing option.  

In addition to those datasets I will need to explore the D3 library at http://d3js.org/ in order to create interactive graphs which will help my user to decide where they want to rent from and the graphs would allow my user to better understand the information found.

Brief Description:
In this phase the basics were coded so that in the other phases I would be able to slowly implement my desired design.  As of now it just one question a user answers and the application outputs two of the best housing options.  In the future phases, I hope to have the user answer questions to help narrow down housing options and then give them two options to pick between until they decide they like a particular rental.  My main goal is to be able to have the user input a “housing profile” of what they are looking for and the web app will find the two best choices and give information on each and then the user can either save the option that they like or rate it and have the web app replace the unwanted option with a new option that would better fit the user’s wants/needs.  I also want to have a marker for each saved housing option and when it is clicked the information will show up.
Note: This would hopefully be like the “Tinder” and “Amazon” of housing

Map View:
The basic map with the specified location of NYU’s Business school (40.7291° N, 73.9965° W) was implemented with the help of the Google Maps API (link: https://developers.google.com/maps/documentation/javascript/adding-a-google-map). In the future I hope to implement a cover on the map that would show cloud cover and possibly add markers for transportation (ex. Bus stops, train station) and markets. 

Data Visualization:
I do not currently have any data visualization and hope to implement this in phase 2 by adding in bar charts to show pricing and a way for my user to interactively rate the results in order to improve output accuracy. In addition I will add in distinct markers to the map of the location of each outputted result. I also hope to enable users to hover over the graph and have data values given to them.

Interaction Form:
There is currently a textbox that a user needs to fill in for a desired rent price. After the user clicks the submit button the application will take their input, check if it is in the correct format, and attempt to cross reference it with the dataset(s) that are implemented and output the two most affordable/worth-it (ex. In terms of cost and distance & how the location is affected by the weather) and safest options. In the future, I hope to implement an information feature where a user can click on a marker and receive information about the rental.
[Y] Any information output: text area
[N] Any operation option 
[Y] Any information input: user preferences
[Y] Interaction with Map: map markers
[N] Interaction with data visualization: can move the map (ex. Scroll and zoom)

Build Information:
As of now there is no external dependency used and this project currently uses HTML/CSS/JavaScript. In the future I may use an external dependency and if I do it will be recorded in the associated readme file.
Context:
~ README.txt --This file.
~ index.html --Web page for the App
~ style.css --CSS style file for formatting
~ js --A directory contains all the javascript functions

Test Browser:
This was tested in Google Chrome.

Additional information:
 I started with no experience with any of theses coding languages. Also, I spent over 5 hours trying to implement the datasets and was unable to do so.  Since I was unable to get this on my own I went to get help from the TA and asked questions in the ironhack site and asked lots of questions in our forum. 

