/*(I am not sure why the code thinks this is a javascript file)

webapp_phase3

    This app will return the best location to look for a rental spot based upon 
    a set criteria they provide. The user will first be prompted to enter an
    appropiate range of distances they want to live from the NY Stern
    building. I want to make it as though the user can either enter a value
    into a form or, better, select a point on the google maps system and 
    the code will automatically draw a square around that point and the 
    Stern building. I do not know if google api will allow me to do that. 
    
    I will then use sliders to ask the user how inportant safety and cost
    effectiveness is to them, set a number from 1 to 20. An algorithm, 
    running in javascript, will  utilize these values 
    and return the best possible area to look for a rental spot. 
    
    After returning a location, some large dots will appear around the 
    google maps api with different words, such as parks, schools, transportation, 
    etc ... of different colors and when clicked on, the bubble will disappear
    and the user will get the option to input the importance of that factor to 
    them, and the algorithm will reevaluate it choice of location. 
    
    THe map itself should be centered on the webpage, with a red marker 
    on the stern school of of business and yellow markers (or some other color)
    on in areas the algorithm returns. Below the map, the distance to 
    the location will be found and what method, using google maps api. 
    Additionally, graphs and visuallizations, created using D3, will display
    a "heat map" of sorts, with darker colors for more crime and more expense
    
    This map should be interactive, the user should be able to look for 
    themselves at the high crime areas and high expense areas and find the 
    appropiate one, instead of just relying on the algorithm. If they hover over
    a location, on one area towards the top left of the screen (enclosed via
    a svg tag) a variety of statistics involving that location should appear.
    This interactivity will be implemented through jQuery. 
    
    I want to see if I can impletment all of this directly onto the 
    google api using d3, but I don't know if that is possible. 
    
    I also hope to have interactive charts on the webpage that would
    use the air quality and climate data onto various locations. 
    
    THe datasets I plan on using are the zillow housing price data, the 
    school safety report, neighborhood tabulation areas (for finding
    reasonable places to live), and then NYC air quality and Climate
    Data online to determine weather and how nature inpacts quality of
    life. D3 will help me to implement these data sets into into the code.
    
    I plan on using the following libraries, bootstrap, jQuery, D3.js, 
    and possibly react.js for animation stuff. I do plan on having some 
    animation surrounding the maps, and hopefully the user would be 
    able to interact with that somewhat.*/
    
