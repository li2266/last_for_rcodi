PURDUE IRONHACKS 2017
	1.	Safe House
	2.	Keywords: price, leisure, population, families, commute, safety, tranportation
    3.	Description of the datasets and function design
        ⁃	zillow_housing_price | www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=ny | Median house rental prices for the neighborhoods in NYC
        ⁃   climate_data | www.ncdc.noaa.gov/cdo-web/webservices/v2 | Weekly Weather Forecast JSON
        ⁃   NY_air_quality | https://catalog.data.gov/dataset/air-quality-ef520 | data tbd
        ⁃   NY_fire_departments | catalog.data.gov/dataset/fire-department-directory-for-new-york-state | JSON of NYC Fire Department Locations
        ⁃   Google Maps API Bike Routes | google.maps.BicyclingLayer() | Data layer to display bike routes
        ⁃   Google Maps API Transit | google.maps.TransitLayer() | Data layer to display transit routes
        ⁃   NY_museums | catalog.data.gov/dataset/new-york-city-museums | data tbd
        ⁃   NY_farmers_markets | catalog.data.gov/dataset/new-york-city-farmers-markets-574c2 | Latitude and Longitude of the locations of NYC farmer's markets
        ⁃   NY_career_centers | catalog.data.gov/dataset/new-york-state-career-centers | Addresses of Career Centers in NYC
        ⁃   NY_school_safety | catalog.data.gov/dataset/school-safety-report-8067a | data tbd
        ⁃	[Y] Do you use the primary dataset ”online climate data” from data.gov? | data tbd
                API request made to get JSON of weekly NYC weather logged, but does not display data on UI. 
        ⁃	[Y] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
                All datasets are from the provided list.
	4.	Brief Description
        ⁃	Use a paragraph to introduce your project.
                To begin the project, I am creating the basic UI off of designs that I created in Sketch. I am transferring them into code now to address the 
                primary problems addressed in the task. Safe House is an online hub to inform incoming students in the NYC area about housing rentals near the 
                NYU Stern School of Business. We provide information on local musuems, subway routes, and more. We are commited to helping you get comfortable 
                navigating in the city.
        •	Map View:
        	i.	[Y] Basic Map with specific location
        	    The map is centered at the specified location that was required.
        	ii.	[Y] Markers for location of markets
        	    Unsure of what this means..., but data layers are able to be applied, and defult map functions display information. More coming soon.
        	iii.[Y/N] Labels for markets' names
        	    Unsure of what this means..., but data is not currently labeled.
        	iv.	[Y/N] InfoWindow to show detail information of a market
        	    Unsure of what this means..., but data is not currently labeled.
        	v.	[Y] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)
        	    There is a map layer that displays the 53 neighborhoods of Manhattan.
        •	Data Visualization:
        	i.	[Y] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
        	    Data is currently being expressed through marker pins, but will probably be changed to pin or heat maps to show various layers of data.
        	ii.	[Y] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
        	    The map currently uses an option dropdown to select multiple fiters to apply to the map layer. These can be toggled, and the chips will soon allow you
        	    to easily see what filters are active, and remove them easily.
        •	Interaction Form:
        	i.	[Y] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
        	    -Data is not currently being output to the user other than the data on the map. Will be added in the next commit using weather data.
        	ii.	[Y] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
        	    -Option dropdown has been added to show different editable map layers that can eventually be added. The chips indicate which layers are currently active, and they allow for easy removal.
        	iii.[Y] [List] Any information input? List them. (comments, markers, user preference ...)
        	    -Again, the option menu is the main interaction element. Anything else to pick multiple options would be taxing for the user and for the UX of a simple web app such as this.
        	iv.	[Y] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
        	    -Only default interactions are currently available.
        	v.	[Y] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)
        	    -The price range and the map filters will both be methods of actively interacting with the data. Will include clickable pins that will give more details on the pins.
	5.	Build Case: How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project.
	    I have no idea what this question is asking. I used other libraries such as Materialize, JQuery, Google Maps API, and D3.js are the only dependencies being used.
	6.	Test Case: Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?
	    The project has so far has been tested in Chrome, Safari, and Opera on a Mac and Safari on an iPad Pro.
	7.	Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.
	    I think this is all a little confusing. I don't feel like the databases provided give us the correct information to even fulfill the minimum problem statement task. 
	    I am starting to figure out how to display the data on the map. I will implement the rest of the filters for the next commit. I had a lot of trouble reloading the map
	    to display new layers, but I finally found a resource that documented how to go about doing this. More features coming soon!
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	