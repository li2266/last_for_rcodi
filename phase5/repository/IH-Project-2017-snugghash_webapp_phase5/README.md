## webapp_phase5

# Find me a place!

Keywords: Configurable, Roommate matching, Transparent

## Executive summary / Description
Find a place which satisfies your criteria, or or build your own criteria!
A flexible application which shows you the best matches, by default. And every single one of those defaults is configurable.
Annotate and add attributes to properties. Read other users' public notes, ratings, reviews.
Shortlist properties, read (past/draft) leasing agreements, negotiate with landlords, one-click deposit payment to reserve/hold spots with integrations to Stripe, Amazon Pay, Shapeshift.io.
Prograssive web app which works offline, no central server with your data.
Also offers a REST/GraphQL API if you ever want to build your own UI.
Pricing for hosted solutions and API keys is cost + PWYW.

## Tech stack summary
React for front-end
Possible GraphQL API
Possible API server, containerized
D3/Vega(not in allowed libraries)/Zingchart/etc. for graphing, data visualization; whichever turns out to be best suited for this.
Snap.svg for any non-simple (not react hierarchy) graphics.
Materialize for styling
+ dependencies for all of the above.

### Alternatively,
HTML5 boilerpalte (Modernizr, polyfill, bootstrap)
Snap.svg for any non-simple (not react hierarchy) graphics.

### Will try not to use
jQuery, UI
Angular

## UX
1. User arrives at home page, motivated to find a rentable place that fits their requirements.
1. Places shown with selected default weighting, for users in a hurry. [Possible weights: In decreasing order: proximity to NYU Stern, price, safety, transportation, other people's public annotations and ratings, access to relaxation, entertainment, sport, social life]
1. Intuitively tells user that finding best in each category is easy, and shows them how (closest, safest, cheapest) [Perhaps not the best idea to include make one option binary - proximity - and THEN show the cheapest. That should be a parameter they should be able to fiddle with]
1. User finds an interesting property, finds links and references to other sites with more subjective information. [Eg: link to granitesl.com of the listing. Or an apartment review aggregation service.]
1. User makes notes, shortlists, might choose to share them. (with aforementioned review aggregators maybe. Or other app users. Users/app creator/entire distribution chain should get paid for this.)

## UI
1. Provides free form (plaintext, markdown) annotations for every listing.
1. Each listing is its own react object with displayed attributes.
1. Multiple listings/search results in a "search panel" - attributes here would be the criteria for the search; the various weights, binary options, sorts
1. Viewing multiple/single search space within a single page should be possible - that's how the home page starts off. <-> icon and other intuitive ways (hover explainations, ?-explanations) for everything

## Datasets summary
Climate data online
 - TODO use for displaying average whether data. Possible graphs with D3/Vega. 100-year floodplains. Low lying areas against Tsunami/storm surge. Rain patterns. Windward vs leeward commutes. 
 - In freezing NY weather, ppl probably feel warmer without wind hitting their faces during any walking section of their commute. TODO find best default weight for this parameter.
[Y] Do you use the primary dataset ”online climate data” from data.gov?

Aggregate data from all of the most accessible of datasets in each of 
Price zillow_housing_price - No pure rent, only Price-to-Rent-Ratio.
Leisure
Commute NY_diesel_retail_price, NY_sidewalks_curbs_ramps_on_statehighways, NY_gasoline_retail_price, NY_street_directions
Academic
Safety NY_fire_departments
Convenience 
TODO Ability to choose demographic neighbourhoods? Racism? Or segregation?
NY_open_data_APIs
NY_housing 
NY_housing_occupancy_tenure_by_borughs - no price data, includes traffic data.

## Data visualization summary
Anything and everything that can illustrate the point to users. 
Safety statistics for the area of each house. [TODO area radius choice.]

## Phase 1 checklist
[x] Readme, planning
[x] Draft UX
[x] UI layout, draft
[x] Datasets, draft

## Phase 2 checklist
[] Data vis., draft
[x] create-react-app deploy + basic structure for layout - Failing, pending deploy integration. Falling back to how web dev was done 10 years ago.
[] UI layout draft

## Phase 3 checklist
[x] Import a dataset
[] draft display UI

## Phase 4 checklist
[] Get Display selection options for user
[] Gmap places and weights for distance calculations

### Meta thoughts
'Coming soon' ideas: 
1. weightings when you select multiple places you want to be closest to
1. Commute preferences and weightings

"
Here is the requirement for phase 1 - Complete your readme file with details such as the layout that you plan to have, data visualizations that you plan to use (bar charts, pie charts etc. ), datasets you plan to use (the list of datasests can be found on the task tab)

Have some codes in your project. Simple html code will suffice for phase 1. We just want to see some quality codes.

After all these, please commit your app with a commit message, and remember to fill in the survey that is embedded in the commit message. Please also provide us the sources that you used will full URLs in the survey.
"
"
    Description of the datasets and function design

    [name] [link] [data type] [data columns used] [data amount] Please provide a name+link+basicInfo to each dataset you have used.

    [Y/N] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

Fill in the structued description:

    Map View:
        [Y/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
        [Y/N] Markers for location of markets
        [Y/N] Labels for markets' names
        [Y/N] InfoWindow to show detail information of a market
        [Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)

    Data Visualization:
        [Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
        [Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

    Interaction Form:
        [Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
        [Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
        [Y/N] [List] Any information input? List them. (comments, markers, user preference ...)
        [Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
        [Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)

    Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project.

    Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?

    Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.
"

# Authors and ack
Suhas Gundimeda, @snugghash
Thanks to the IronHacks team for making this happen!