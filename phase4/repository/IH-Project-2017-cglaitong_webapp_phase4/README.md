Readme
-------------





This is a guide for how to set up your README.md file for your IronHack Application. The file should have following fields:

1. Name of your Application:

				My application is named  IronHacks 2017 cglaitong
				

2. Keywords
You should include at least 3 keywords for your project to identify the features of your project, such as: freshness, price, transportation convenience

				Googlemaps , Alternative fuels,Museums,Galleries,DCP offices,Career centers ,Vaccination,New York City, Markers

3. Description of the datasets and function design

* [name] [link] [data type] [data columns used] [data amount] Please provide a name+link+basicInfo to each dataset you have used.

				[New York City Museums ]  [ https://catalog.data.gov/dataset/new-york-city-museums] [all lat and log data] i used the JSON file
			
				[New York State Career Centers]  [ https://catalog.data.gov/dataset/new-york-state-career-centers] [all lat and log data]i used the JSON file
				
				[Alternative Fuel Stations in New York ]  [https://catalog.data.gov/dataset/alternative-fuel-stations-in-new-york] [all lat and log data]i used the JSON file
				
				[New York City Art Galleries]  [ https://catalog.data.gov/dataset/new-york-city-art-galleries] [all lat and log data]i used the JSON file
				
				[Directory Of DCP Offices]  [ https://catalog.data.gov/dataset/directory-of-dcp-offices-abab2] [all lat and log data]i used the JSON file

				[New York City Locations Providing Seasonal Flu Vaccinations ]  [ https://catalog.data.gov/dataset/new-york-city-locations-providing-seasonal-flu-vaccinations-5c001] [all lat and log data] i used the JSON file
				[NOAA Api V2]  [ https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=AWND&startdate=2017-10-01&enddate=2017-10-31&locationid=CITY:US360019&stationid=GHCND:USW00094728&limit=31&units=metric] this dataset provides information about average wind velocity in New York City  in the month of October. The data comes from the closest station to NYC (Central park station).

				[NOAA Api V2]  [ https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=PRCP&startdate=2017-10-01&enddate=2017-10-31&locationid=CITY:US360019&stationid=GHCND:USW00094728&limit=31&units=metric] this dataset provides information about precipitation in NYC  in the month of October. The data comes from the closest station to NYC (Central park station).

					[NYCHA Development Data Book]  [ https://data.cityofnewyork.us/resource/ffxx-dfvk.json] [all address data ]i used the JSON file


				
				
 * [Y/N] Do you use the primary dataset ”online climate data” from data.gov? 
 
			Yes
			 
 * [Y/N] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
 
			Yes 
4. Brief Description

 * Use a paragraph to introduce your project.
 
			 In this fourth commit I put markers for the houses available for rent in New York. If you click on these markers these show the rental price of the respective house

 Fill in the structued description:
 * Map View:
	1. [Y/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
		
				Yes
	2. [Y/N] Markers for location of markets
				
				No,  because in the dataset provided for the markets, the latitude and longitude they have are not exact
	3. [Y/N] Labels for markets' names

				No
	4. [Y/N] InfoWindow to show detail information of a market
				
				No
	5. [Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)

				No

 * Data Visualization:
	1. [Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)

				Yes , line char
	2. [Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
			
				Yes, buttons to show the graphs.
	
 * Interaction Form:
	1. [Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)

				No
	2. [Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
				

				No
	3. [Y/N] [List] Any information input? List them. (comments, markers, user preference ...)


				No
	4. [Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)

				Yes , if you click on house markers these show the rental price of the respective house

	5. [Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)


				Yes , Show and hide markers and rent price

5. Build Case
How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript?
List the dependencies you used, such as python, node.js, etc.


		Boostrap, Jquery ,d3.js
List the steps we should follow to build the project.
		     

		just open it in the browser, the project does not require anything additional
		
6. Test Case
Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?


		Chrome ,Edge and Firefox

7. Additional information You Want to Share with Us
E.g. any problems you faced/fixed, where you reached out to for help, etc.
