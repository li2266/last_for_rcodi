## webapp_phase2

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
	link: https://catalog.data.gov/dataset/new-york-state-career-centers
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
	
	Do you use the primary dataset "Online climate data" from data.gov? --> N
4. Description
	This application will show the nearest rent home for students of the NYU Stern School 
	of Business, New York. 
	Features:
		Basic Map with especific location (NYU) 
		Markets for location
		Show the nearest house in rent in a range of 200 m.
		Filter the others datasets to a maximum range of 10km.
		First approach to DistanceMatrixService
	In next iteration:
		Increment the houses range		
		InfoWindow to show detail information of houses
		D3
	Interaction Form:
		In the moment, there isn't interaction form.
		In the map, you can choose if you want to show the datasets.

5. There aren't dependencies. The aplication has been build in Linux and Firefox browser.

6. Change phase2 in respect of phase1
	Only index.js file
	Add Addres point dataset.
	Add Zillow API
	Add DistanceMatrixService but I didn't use it.
	Show one house in rent without information.
	Add icons to markers.
