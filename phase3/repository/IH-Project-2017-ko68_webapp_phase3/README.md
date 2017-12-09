Gold Ironhack Phase 3 (11/11/2017) -
Name of Application: Hounder

Keywords: fast, detail-oriented, safety, work-in-progress, small details, information based

Datasets and Function Design:
The primary online climate data is to be used and can be found at: https://www.ncdc.noaa.gov/cdo-web/webservices/v2. However, I am having trouble accessing the data and using it to be displayed with D3 I have watched tons of Youtube videos and read through the tutorials but I am still having trouble. However, I do know that I want the weather data to be displayed alongside the google map api in the results page. I mostly focused on organizing my web app so that my data can be displayed in the next phase in an easily understandable fashion (and I would like to get more help on D3). I hope to use D3.js to display a meter of the current weather with the user having the ability to get information by clicking/hovering their mouse.

I also finished searching and connecting to datasets specifically to get New York data from https://data.cityofnewyork.us/  so that in the future I can filter through all of the relevant data and display information/use the data to find available and safe housing. From this source I was able to find available housing by area, available housing by district, and the leading causes of death in New York. In the next phase, now that I’ve found the datasets I want to use, I will use D3 to show leading causes of death/safety in the area and use the housing availability and cross reference it with the housing costs from Zillow to output optimal results for the user.

In addition, I plan to find a dataset from Zillow so that I can get housing prices. However, as of now I am unsure as how pricing works and have asked questions in the Forum.

In addition to those datasets explored the D3 library at http://d3js.org/ in order to start the code for my interactive diagrams which will help my user understand the weather data so that they can decide on what method of transportation they would like to take.


Brief Description:
In this phase I made this more like an organized web application that the user can interact with.  I searched through all of the other datasets that we can use and found three that would help my web application be more accurate. Once I found my desired datasets, I worked on connecting to the three new datasets so that in the next phase I can have information from the datasets display for my user. I also worked on making my housing questionnaire easier and quicker for the user to get to the results and added checks to my user inputs.  I have also started using D3.js but have not been able to have it successfully displaying my weather data and plan to go in for extra help. However, I did successfully implement a test with D3 shapes as seen in my results page.

Map View:
Currently there is a basic map with the specified location of NYU’s Business school (40.7291° N, 73.9965° W) was implemented with the help of the Google Maps API (link: https://developers.google.com/maps/documentation/javascript/adding-a-google-map). In the future I hope to implement buttons on the map that would show traffic, bike routes, bus stops, and train stations rather than one map with all of this information at once. 

Data Visualization:
My current data visualization is portrayed through my google maps API. I have been having problems with D3.js and making it display my weather data. However, I have the current code of my data visualization in the submission but I have commented it out and plan to troubleshoot next phase. As of now I have mostly focused on organization, usability, and how data should be displayed for the user to easily understand.

Interaction Form:
There is currently a textbox that a user needs to fill in for a desired rent price. There is also a question regarding a desired method of transportation with checkboxes.  All the questions have checks to make sure that the user is answering them appropriately. After the user clicks the submit button the application will take their input, check if it is in the correct format, and open up a results page. I hope to implement a cross reference with the dataset(s) that output the two most affordable/worth-it (ex. In terms of cost and distance & how the location is affected by the weather) and safest options in the next phase. 
[Y] Any information output: text area, checkboxes
[Y] Any operation option: submit → results page
[Y] Any information input: user preferences
[Y] Interaction with Map: marker, data overlays (ex. Traffic, bus stops, bike routes, etc)
[Y] Interaction with data visualization: can move the map (ex. Scroll and zoom), click buttons on map to get different transportation information that the user desires, look at traffic, and different transportation routes

Build Information:
As of now there is no external dependency used and this project currently uses HTML/CSS/JavaScript. In the future I may use an external dependency and if I do it will be recorded in the associated readme file.

Context:
~ README.txt --This file.
~ index.html --Web page for the App
~ style.css --CSS style file for formatting
~ js --A directory contains all the javascript functions
~Cart.html -- coming soon and will contain any housing options that the user may wish to rent from
~WishList.html -- coming soon and will contain any housing options that the user may want in the future.
~HousingProfile.html -- form of what the user is looking for in housing
~HousingResults.html -- takes housing profile data and shows results of best housing options

Test browser:
This was tested in Google Chrome.

Additional information:
Please note that I was sick (headache and fever) for this whole phase but I fortunately still managed to get some work done. I had a problem with making my data show up in a way that users would understand. In addition, I also went to the TA for help and emailed (but I didn’t get a response to my email). 
