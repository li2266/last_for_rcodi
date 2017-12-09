Developer: Santiago Orloff Orloff Rodríguez

1. Name of Application: NY Rents

2. Keywords: User-Friendly, Price, Entertainment, Security

3. Datasets and Function Design

-	[zillow_housing_price] [http://www.zillow.com/webservice/GetZestimate.htm?zws-id=<ZILLOW_ID>&zpid=<ZPID>&rentzestimate=true]
	[price] [Data Columns Used: 5] [Data Amount: 21 entries per page loading]
	Zillow is an API where different type of pricing data can be obtained for neighborhoods in different cities.
-   [NYPD Complaint Data Historic][https://catalog.data.gov/dataset/nypd-complaint-data-historic][safety][Data Columns Used: 3][Data Amount: >1000 entries]
- 	[NYPD Subway Entrances][https://catalog.data.gov/dataset/subway-entrances][commute][Data Columns Used: 3][Data Amount: >1000 entries]
-	[NYPD Bus Stop Shelters][https://catalog.data.gov/dataset/bus-stop-shelters][commute][Data Columns Used: 3][Data Amount: >1000 entries]
	
[Y] Do you use the primary dataset ”online climate data” from data.gov?
[N: Zillow recommend API isn't included in data.gov. NYPD Complaint, Open Space(Parks), Subway Entrances and Bus Stop Shelters are obtained from data.gov]
[Y] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

4. Description
	The purpose of this application is to provide new students accepted into NYU the possibility to find 
	affordable and save places to rent in the vicinity of the university, factoring different personal
	preferences	into account in order to ease the task of finding a place to stay.
	
	In it's current state, the application almost fulfills its purpose, since random housing options near NYU are displayed
	on the map with their rent pricing obtaind from Zillow Zestimate, and the cheapest option is shown as the best possible
	offering. The distance to NYU is also displayed as reference to the distance needed to travel daily.
	
	The functionality of choosing different types of crimes that are available in the dataset can be shown
	as markers in the map.
	
	The functionality of choosing different types of sports that are available in the  parks dataset can be shown
	as markers in the map. Also, bar graphs coresponding to the categories of parks and crimes can be seen whenever loading the markers.
	
	The functionality of choosing different types of transportation that are available in the Subway and Bus Stop datasets can be shown
	as markers in the map.
	
	In this update, the functionality of finding random housing optiones near NYU is available, but limited to 50 houses showing at the momentm
	given that Zillow's API only allows 1,000 request per day, and for each house a request is necessary. Thus, it has been limited to allow multiple
	visualizations of the website without reaching the request limit. The best option is displayed with a special icon in the map.

Map View:

[Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
[N] Markers for location of markets
[N] Labels for markets' names
[N] InfoWindow to show detail information of a market
[N] [] Any other cover on the map (for example, cloud cover to show the weather effect)

Data Visualization:

[Y] [Bar chart] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
[N] [] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

Interaction Form:

[Y] [Climate Information as text field] Any information output? list them. (text field, text area, label, plain HTML ...)
[Y] [Crimes: Robbery, Larceny, Forgery; Parks: Basketball, Tennis, Volleyball] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
[Y] [User filters through checkboxes] Any information input? List them. (comments, markers, user preference ...)
[Y] [Markers with information when clicked] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
[N] [] Interaction with data visualization? List them. (filter, sort, set variables ...)

5. No external dependencies where used for this application.

6. The project was tested in Google Chrome and Mozilla Firefox.

7. 	The datasets of NYPD Complaints has been implemented, now showing in a graph the amount of crimes reported in New York.
	
	A new dataset has been added, the Parks and Sports datasets, along with its implementation in a graph, similarly to the crimes dataset.
	
	New icons were made for the markers, which are now displayed in map.
	
	The addition of Zillow's API is a huge benefit, since it allows a step closer to provide the intended objective of the mash-up.
	Together with determining the distance to NYU and the cheapest opetion of the generated set, the objectibe of the mash-up is 
	almost completed, since filtering with price or proximity wasn't implemented.
	
	Given the limitations of the Ironhacks platform, the amount of houses choosable had to be reduced from 300 per ZIP to 50 per ZIP, since otherwise
	the platform would delete any information added.

Sources/Helps
Links:  https://getbootstrap.com/docs/3.3/components/#navbar
		https://www.w3schools.com/bootstrap/bootstrap_ref_js_affix.asp
		https://stackoverflow.com/questions/24377804/cross-domain-jsonp-xml-response
		https://stackoverflow.com/questions/26810946/hide-bootstrap-navbar-brand-and-only-display-centered-when-navbar-is-collapsed
		http://bl.ocks.org/Jverma/887877fc5c2c2d99be10
		http://api.jquery.com/jquery.getjson/
		http://myslu.stlawu.edu/~clee/dataset/zillow/
		http://www.zipmap.net/New_York.htm
		ftp://ftp.ncdc.noaa.gov/pub/data/cdo/documentation/PRECIP_HLY_documentation.pdf
		https://developers.google.com/maps/documentation/javascript/reference#spherical
		Icons from: https://icons8.com/