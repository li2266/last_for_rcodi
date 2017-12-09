Developer: Santiago Orloff Orloff Rodríguez

1. Name of Application: NY Rents

2. Keywords: User-Friendly, Price, Entertainment, Security

3. Datasets and Function Design

-	[zillow_housing_price] [https://www.quandl.com/api/v3/datasets/ZILLOW/N9_TURNAH.json?api_key=JVy_pYi3kZ_XgnasNvHF]
	[price] [No data used yet] [No data used yet]
	Zillow is an API where different type of pricing data can be obtained for neighborhoods in different cities.
-   [NYPD Complaint Data Historic][https://catalog.data.gov/dataset/nypd-complaint-data-historic][safety][Data Columns Used: 3][Data Amount: 1000 entries]
	
[N] Do you use the primary dataset ”online climate data” from data.gov?
[N: Zillow recommend API isn't included in data.gov. NYPD Complaint is obtained from data.gov]
	Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

4. Description
	The purpose of this application is to provide new students accepted into NYU the possibility to find 
	affordable and save places to rent in the vicinity of the university, factoring different personal
	preferences	into account in order to ease the task of finding a place to stay.
	
	In it's current state, the application doesn't fulfill this purpose, and only a skeleton of the possible end product
	is implemented, along with a map and an incomplete navigation bar.
	
	In this update the functionality of choosing different types of crimes that are available in the dataset can be shown
	as markers in the map.

Map View:

[Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
[N] Markers for location of markets
[N] Labels for markets' names
[N] InfoWindow to show detail information of a market
[N] [] Any other cover on the map (for example, cloud cover to show the weather effect)

Data Visualization:

[N] [Tried to implement it, without success.] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
[N] [] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

Interaction Form:

[N] [] Any information output? list them. (text field, text area, label, plain HTML ...)
[Y] [Crimes: Robbery, Larceny, Forgery] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
[N] [] Any information input? List them. (comments, markers, user preference ...)
[Y] [Markers with information when clicked] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
[N] [] Interaction with data visualization? List them. (filter, sort, set variables ...)

5. No external dependencies where used for this application.

6. The project was tested in Google Chrome and Mozilla Firefox.

7. In this oportunity, when trying to use the Zillow API, error 500 was returned every time, thus no progress could be made in this regard.
	
	The dataset of NYPD complaints was imeplemented, although I tried to complement it with a bar graph showing the amount of crimes by type each year,
	but failed to do it correctly, so for the moment the idea has been pushed back.
	
	After learning how to properly do request to datasets, future iterations should have much more information visualization and functionality in order
	to fulfill the purpose of the application.