README

1. App name : "House for rent: NY"
2. Keywords: House for rent, NYU Stern School of Business, Mashup, 
3. Datasets:
	name: Fire Department Directory for New York State
	link: https://catalog.data.gov/dataset/fire-department-directory-for-new-york-state
	data type: JSON
	data columns used:latitude, longitude
	function: Application use this dateset for shows the location of fire departments in a range of 10 km.

	name: New York State Career Centers 
	link: https://data.ny.gov/Economic-Development/New-York-State-Career-Centers/g8h7-98zz
	data type: JSON
	data columns used:latitude, longitude
	function: Application use this datasets for show the location of career centers in a range of 10 km.

	name: New York City Address Points 
	link: https://data.cityofnewyork.us/City-Government/NYC-Address-Points/g6pj-hd8k
	data type: JSON
	data columns used: the_geom, h_no, st_name, post_type
	function: Application use this datasets for get the location of houses in New York. It chooses 20 houses for evaluate its rent price.

	name: Api zillow
	link: https://www.zillow.com/howto/api/APIOverview.htm
	data type: XML
	data columns used: RentZestimate/valueChange, message, 
	function: Application use this datasets for get the rent estimate price of each house.

	name: New York City Art Galleries
	link: https://data.cityofnewyork.us/Recreation/New-York-City-Art-Galleries/tgyc-r5jh
	data type: JSON
	data columns used: the_geom(latitude, longitude)
	function: Application use this datasets for show the location of Art Galleries in a range of 5 km.

	name: New York City Museums
	link: https://data.cityofnewyork.us/Recreation/New-York-City-Museums/ekax-ky3z
	data type: JSON
	data columns used: the_geom(latitude, longitude)
	function: Application use this datasets for show the location of Museums in a range of 5 km.

	name: Zillow Home Value Index (City): Median Rental Price - Studio - New York, NY
	link: https://www.quandl.com/data/ZILLOW/C1_MRPST-Zillow-Home-Value-Index-City-Median-Rental-Price-Studio-New-York-NY
	data type: JSON 
	function: Application use this datasets for show the average rental price in New York over the last year.


	name: Crime Map
	link: https://data.cityofnewyork.us/Public-Safety/Crime-Map-/5jvd-shfj/data
	data type: JSON
	data columns used: the_geom(latitude, longitude)
	function: Application use this datasets for get an indicator of safety around the house in rent. This indicator is the number of crimes reported within a range of 200 metres respect of each house in rent.

	name: Climate Data Online - Average, Maximum and Minimum temperature in New York over the last year
	link: https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=TAVG&stationid=GHCND:USC00300063&units=standard&startdate=2016-11-01&enddate=2017-11-01
	data type: JSON
	data columns used: date, value
	function: Application use this datasets for show the average, maximum and minimun temperature in New York over the last year.


	[Y] Do you use the primary dataset ”online climate data” from data.gov?
	[Y] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
	
	
4. Description
	This application shows the nearest rent home for students of the NYU Stern School 
	of Business, New York. Also, shows the cheapest and safest rent home. 

	[Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)

	[Y] Markers for location of markets

	[Y] Labels for markets' names (Color in the show pane)

	[N] InfoWindow to show detail information of a market

	[N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)

	[Y] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
	Dispersion Chart
	It shows the average rental price in New York over the last year and the average, maximum and minimun temperature in New York over the last year.

	[N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

	[N] [List] Any information output? list them. (text field, text area, label, plain HTML ...) 

	[Y] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
	Optimized fot the cheapest, closest and safest house in rent.

	[N] [List] Any information input? List them. (comments, markers, user preference ...)

	[N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)

	[N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)

5. There aren't dependencies. The aplication has been build in Linux and Firefox browser.

6. Credits
	Api Zillow : https://www.zillow.com/howto/api/APIOverview.htm
	Map icons : https://mapicons.mapsmarker.com/
	Graphs D3: https://bl.ocks.org/basilesimon/29efb0e0a43dde81985c20d9a862e34e
	Font Awesome: http://fontawesome.io/
	

		
	



		
	