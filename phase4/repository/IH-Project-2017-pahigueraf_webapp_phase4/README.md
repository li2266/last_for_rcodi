README

1. App name : "House for rent: NY"
2. Keywords: 
3. Datasets:
	name: Fire Department Directory for New York State
	link: https://catalog.data.gov/dataset/fire-department-directory-for-new-york-state
	data type: JSON
	data columns used:latitude, longitude
	data amount:

	name: New York State Career Centers 
	link: https://data.ny.gov/Economic-Development/New-York-State-Career-Centers/g8h7-98zz
	data type: JSON
	data columns used:latitude, longitude
	data amount:

	name: New York City Address Points ----> This dataset isn't in the list, but I think that it's important
	link: https://data.cityofnewyork.us/City-Government/NYC-Address-Points/g6pj-hd8k
	data type: JSON
	data columns used: the_geom, h_no, st_name, post_type
	data amount:

	name: Api zillow
	link: https://www.zillow.com/howto/api/APIOverview.htm
	data type: XML
	data columns used: RentZestimate/valueChange, message, 
	data amount:

	name: New York City Art Galleries
	link: https://data.cityofnewyork.us/Recreation/New-York-City-Art-Galleries/tgyc-r5jh
	data type: JSON
	data columns used: the_geom(latitude, longitude)
	data amount:

	name: New York City Museums
	link: https://data.cityofnewyork.us/Recreation/New-York-City-Museums/ekax-ky3z
	data type: JSON
	data columns used: the_geom(latitude, longitude)
	data amount:

	name: Zillow Home Value Index (City): Median Rental Price - Studio - New York, NY
	link: https://www.quandl.com/data/ZILLOW/C1_MRPST-Zillow-Home-Value-Index-City-Median-Rental-Price-Studio-New-York-NY
	data type: JSON
	data columns used: None
	data amount:

	
	Do you use the primary dataset "Online climate data" from data.gov? --> N
4. Description
	This application will show the nearest rent home for students of the NYU Stern School 
	of Business, New York. 
	Features:
		Basic Map with especific location (NYU) 
		Markets for location
		Show a maximum of 10 houses in rent in a range of 10km.
		Filter the others datasets to a maximum range of 10km.
		InfoWindow to show detail information of houses in rent.

	In next iteration:
		More Filters.
		Charts.

	Interaction Form:
		In the map, you can choose if you want to show the datasets.
		The user can choose between Cheapest option or Closest Option or None.


5. There aren't dependencies. The aplication has been build in Linux and Firefox browser.

6. Change phase4 in respect of phase3
	Add cheapest option and closest option.