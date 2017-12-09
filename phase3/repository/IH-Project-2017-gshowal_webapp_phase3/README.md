1.	Name of Application: webapp_phase3, House Quest
2.	Keywords: preferences, safety, community, affordability 
3.	Description of the datasets and function design
        Climate Data Online (used)
            https://www.ncdc.noaa.gov/cdo-web/webservices/v2    
            location climate data
            Honestly, I am not exactly sure which data columns I used or how much data. I requested the data using the link with the /locations endpoint. I would like to present this data on the main New York City Map, but may also put it into a graph. 
        Safety Data
            Data.gov
            USFA NFIRS 2009 Basic Fire Incident Data, Campus Safety and Security Survey 2013
            I have not used this data yet, but would like to incorporate it in the safety map.  
        Price Data
            Data.gov
            Housing Affordability Data System (HADS)
            I have not used this data yet, but would like to incorporate it in the affordability map.
        Community/Accessibility
            Data.gov
            Food Environment Atlas, American FactFinder II, Open Spaces (Parks)
            I have not used these data sets yet, but would like to incorporate them in the community map.
        I would like to present these data sets in a map view, so students could understand how close housing options are to various things, such as parks or grocery stores. 
    YES Do you use the primary dataset ”online climate data” from data.gov?
    YES Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
    URLs Used (so far): 
        http://www.commonapp.org/files/school/image/NYU_CommonApp_HeaderImage2.jpg
        https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css    
        https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
        https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
        https://www.ncdc.noaa.gov/cdo-web/api/v2/locations 
4.	Brief Description
        I am creating an easy to use website for students at the NYU Stern School of business to utilize in order to find housing in New York City. I will have multiple factors presented (safety, proximity to stores/gyms, price, etc.) for users to rank based on preference. After submitting their preferences, housing options will appear on the map that match their ideals. They can then click on an option and receive a detailed description of the safety, price, etc. of that option. To present those statistics, I plan on using pie charts and graphics. There will also be maps that specifically present one characteristic (e.g. a map only showing prices), so users can reference it. I would also like to create a place for students to redefine their preferences at any point during the search, and make it so that they can save or mark their favorites. Ultimately, I want to create a website that is streamlined yet informative. 
    Fill in the structured description:
        Map View:
            YES Basic Map with specific location (New York City)
            YES Markers for location of markets (not created yet)
            YES Labels for markets' names (not created yet)
            YES InfoWindow to show detail information of a market (not created yet)
            YES [describe] Any other cover on the map (for example, cloud cover to show the weather effect)
                I would like to create distinct icons on the map to show different factors. For instance, after they have searched some and found places they liked, I want those places to show up with a heart icon so they are easily identified as a favorite. 
        Data Visualization:
            YES [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
                I would like to display specific statistics for each property once it is selected. To present this information, I will most likely use pie charts. 
            YES [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
                I think it would be interesting if when looking at the overall map of choices, students could hover over options and mark whether they want to look at it again or would not consider it. After that preliminary selection, if some of the options were removed, it would free up space on the map and make it more readable. 
        Interaction Form:
            NO [List] Any information output? list them. (text field, text area, label, plain HTML ...)
                I do not know what information output is, so I do not believe I have any information output in my code. 
            YES [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
                I plan to create a way for them to filter the options based on their preferences. 
            YES [List] Any information input? List them. (comments, markers, user preference ...)
                I add in comments in html when I want to write something but will go back later and put it in.
            YES [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
                Yes, I want to make it so that the options on the map will be filtered based on their preferences. 
            NO [List] Interaction with data visualization? List them. (filter, sort, set variables ...)
                I would like to filter the data based on the user’s preferences. I am still working on creating a way to filter it, and the criteria I will use to filter it. 
5.	Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project.
        I did not use any other dependencies. 
6.	Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?
        I tested my project in Chrome. I would like to make it easy to use on a mobile device as well.
7.	Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.
        I went to help hours this week to learn more about how to input data into our website. I found the help there and the video posted on the website helpful. For the next phase I really want to work on visualizations for this data with D3. I went through the D3 tutorials, but was still confused so I found a series of basic D3 tutorials and am watching them. Ultimately, I struggled with time in this phase; I was not able to add the new things I wanted to add. 

