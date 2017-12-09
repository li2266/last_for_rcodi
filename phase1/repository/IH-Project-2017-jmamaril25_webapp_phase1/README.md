PURDUE IRONHACKS 2017
	1.	Safe House
	2.	Keywords: price, leisure, population, families, commute, safety.
    3.	Description of the datasets and function design
        ⁃	zillow_housing_price | www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=ny | data tbd
        ⁃   climate_data | www.ncdc.noaa.gov/cdo-web/webservices/v2 | data tbd
        ⁃   NY_fire_departments | catalog.data.gov/dataset/fire-department-directory-for-new-york-state | data tbd
        ⁃   NY_air_quality | catalog.data.gov/dataset/air-quality-ef520 | data tbd
        ⁃	[Y] Do you use the primary dataset ”online climate data” from data.gov?
                (referenced in the code, but not used)
        ⁃	[Y] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
                (all datasets are from the provided list)
	4.	Brief Description
        ⁃	Use a paragraph to introduce your project.
                To begin the project, I am creating the basic UI off of designs that I created in Sketch. I am transferring them into code now to address the 
                primary problems addressed. Safe House is an online tool to help NYU students look for housing rentals near the main campus (near the Stern School of Business). 
                We will help you find the best deal in the best place. Once the minimum requirements are completed, I may try to add increased functionality with the limited datasets.
        •	Map View:
        	i.	[Y] Basic Map with specific location
        	    The map is centered at the specified location that was required.
        	ii.	[Y/N] Markers for location of markets
        	    Unsure of what this means..., but it is currently marking placeholder data.
        	iii.[Y/N] Labels for markets' names
        	    Unsure of what this means..., but data is not currently labeled.
        	iv.	[Y/N] InfoWindow to show detail information of a market
        	    Unsure of what this means..., but data is not currently labeled.
        	v.	[Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)
        •	Data Visualization:
        	i.	[Y] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
        	    Data is currently being expressed through marker pins, but will probably be changed to pin or heat maps to show various layers of data.
        	ii.	[Y] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
        	    The map currently uses default data provided from Google Maps, but it is still interactive.
        •	Interaction Form:
        	i.	[N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
        	    No, not yet. Will hopefully be added in the next commit.
        	ii.	[N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
        	    No, not yet. Will hopefully be added in the next commit.
        	iii.[N] [List] Any information input? List them. (comments, markers, user preference ...)
        	    No, not yet. Will be added in the next commit.
        	iv.	[Y] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
        	    Only default interactions are currently available.
        	v.	[Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)
        	    This is redundant, but no. The data is not currently able to be filtered, but will hopefully be added in the next commit.
	5.	Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project.
	    I have no idea what this question is asking. I used other libraries such as Materialize, JQuery, and the Google Maps API are the only dependencies being used.
	6.	Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?
	    The project has so far only been tested in Chrome on a Mac and an iPad Pro.
	7.	Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.
	    I think this is all a little confusing. I don't feel like the databases provided give us the correct information to even fulfill the minimum problem statement task. 
	    I had some issues with the Google Maps API, but I was able to debug those.
	    My next goal is to find a way to do the API requests and get the data onto the map.
	    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	