## webapp_phase1

Developer: Santiago Orloff Orloff Rodríguez

1. Name of Application: NY Rents

2. Keywords: User-Friendly, Price, Entertainment, Security

3. Datasets and Function Design

-	[zillow_housing_price] [https://www.quandl.com/api/v3/datasets/ZILLOW/N9_TURNAH.json?api_key=JVy_pYi3kZ_XgnasNvHF]
	[price] [No data used yet] [No data used yet]
	Zillow is an API where different type of pricing data can be obtained for neighborhoods in different cities.
	
[N] Do you use the primary dataset ”online climate data” from data.gov?
[N: Zillow recommend API isn't included in data.gov] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

4. Description
	The purpose of this application is to provide new students accepted into NYU the possibility to find 
	affordable and save places to rent in the vicinity of the university, factoring different personal
	preferences	into account in order to ease the task of finding a place to stay.
	
	In it's current state, the application doesn't fulfill this purpose, and only a skeleton of the possible end product
	is implemented, along with a map and an incomplete navigation bar.

Map View:

[Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
[N] Markers for location of markets
[N] Labels for markets' names
[N] InfoWindow to show detail information of a market
[N] [] Any other cover on the map (for example, cloud cover to show the weather effect)

Data Visualization:

[N] [] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
[N] [] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

Interaction Form:

[N] [] Any information output? list them. (text field, text area, label, plain HTML ...)
[N] [] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
[N] [] Any information input? List them. (comments, markers, user preference ...)
[N] [] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
[N] [] Interaction with data visualization? List them. (filter, sort, set variables ...)

5. No external dependencies where used for this application.

6. The project was tested in Google Chrome and Mozilla Firefox.

7. After several attempts to import the Zillow dataset, it was very hard to access the information in order to display it, so I stopped focusing on that part.
	As a last moment thought, a navigation bar was tried to be included. Although it was implemented, I would have liked to keep it in the top of the page in
	order to improve the presentation of the page and facilitate it's navigation.
	
	It is planned to utilize other datasets in order to display much more useful information and give some kind of control to the user to tweak different
	settings in the search for an optimal renting place.
	
	It would be really useful if a confirmation was displayed after doing a commit for the project, since there is an uncertainty regarding if it was actually
	sent correctly or if there was some kind of error.