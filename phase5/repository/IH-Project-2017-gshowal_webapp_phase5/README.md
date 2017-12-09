1.	Name of Application: webapp_phase5, House Quest
2.	Keywords: safety, community, affordability, neighborhoods
3.	Description of the datasets and function design
    	Climate Data Online (used)
        	"https://api.weather.gov/points/40.7291,-73.9965/forecast"
        	location climate data with forecast
        	I am using the forecast data for the current day. It gives a detailed forecast of the daily weather including temperature (high, low, current), wind, and rain. 
    	Safety Data
        	https://data.cityofnewyork.us/api/views/3h6b-pt5u/rows.json?accessType=DOWNLOAD
        	Crime Data for Large US Cities 
        	I have the data through an ajax request, and used it in my determination of safety. 
    	Price Data
        	"https://catalog.data.gov/harvest/object/1829af4a-6836-4309-a685-a41e8bfb9a6a"
    	Housing Affordability Data System (HADS)
        	I have this data through an ajax request and used it for my affordability information because having affordable options is one of my top goals.
    	I used this data to determine safety and pricing standards and visualized some of it using d3. 
	YES Do you use the primary dataset ”online climate data” from data.gov?
	YES Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
	URLs Used (so far): 
http://www.commonapp.org/files/school/image/NYU_CommonApp_HeaderImage2.jpg
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css    
https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
https://api.weather.gov/points/40.7291,-73.9965/forecast
https://catalog.data.gov/harvest/object/1829af4a-6836-4309-a685-a41e8bfb9a6a
https://data.cityofnewyork.us/api/views/3h6b-pt5u/rows.json?accessType=DOWNLOAD

4.	Brief Description
    	I am creating an easy to use website for students at the NYU Stern School of business to utilize in order to find housing in New York City. I will have multiple factors presented (safety, proximity to stores/gyms, price, etc.) to help users determine their ideal/favorite housing option. They can click on either the most affordable option or the safest option and be taken to Zillow for more information. I used a pie chart to visualize the most popular neighborhoods among NYU MBA students. There are maps that specifically present one characteristic (e.g. a map only showing prices), so users can reference it. All the choices and additional factors are presented on the New York City Map on the main page. Ultimately, my website is simple and helps students find the safest or most affordable option while also displaying additional factors that may influence their decision.
Fill in the structured description:
	Map View:
    	YES Basic Map with specific location (New York City)
    	YES Markers for location of housing options
    	YES Labels for apartment names/addresses
    	NO InfoWindow to show detail information of a market 
    	NO [describe] Any other cover on the map (for example, cloud cover to show the weather effect)
        	My map is simple and straightforward, so it does not have any additional covers.
	Data Visualization:
    	YES [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
        	I used D3 to create a pie chart to represent the most popular neighborhoods of NYU students. 
    	YES [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
        	Users can click on the icons and a window will pop up with the location’s name.
	Interaction Form:
    	YES [List] Any information output? list them. (text field, text area, label, plain HTML ...)
        	The forecast is updated, so it outputs the current information to the user.
    	NO [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
    	YES [List] Any information input? List them. (comments, markers, user preference ...)
        	The user can click on the icon that represents the factor which is most important to them when looking for housing (price, safety, community).
    	YES [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
        	The user can click on the icons on the map and get the name of the place (apartment, store, etc.)
    	NO [List] Interaction with data visualization? List them. (filter, sort, set variables ...)
5.	Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project.
    	I did not use any other dependencies. 
6.	Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?
    	I tested my project in Chrome. 
7.	Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.
    	This last phase was challenging, and I spent a lot of time trying to get my code to work. I found YouTube videos to be helpful when trying to learn how to do something, but I really needed more help with working out the kinks after I mostly got it to work. I struggled with trying to move my pie chart, assigning the labels to the middle of the slices, and trying to get strokes in between my slices. This project has taught me a lot and I definitely have a greater appreciation for web developers. 


