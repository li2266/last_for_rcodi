## webapp_phase5

HOME SEEKER


KEYWORDS: 
Entretenimiento, Seguridad, Cercania


DATASETS:
zillow_housing_price  	https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=New%20York 	"Muestra el promedio del precio de rentas por zonas"
NY_museums 				https://catalog.data.gov/dataset/new-york-city-museums								"Muestra la ubicacion de museos de New York"
NY_art_galleries		https://catalog.data.gov/dataset/new-york-city-art-galleries						"Muestra la ubicacion de galerias de New York"
NY_school_safety		https://catalog.data.gov/dataset/school-safety-report-8067a							"Muestra la seguridad de las escualas al igual que su ubicacion"
NY_street_directions	https://catalog.data.gov/dataset/nyc-street-centerline-cscl							"Muestra los nombres de las calles de NY"

Y 	online climate data 	Se muestra la precipitacion diaria durante los meses de octubre y noviembre.
Y 	Los datasets salen de data.gov y data.indy.gov


BRIEF DESCRIPTION
¿Nuevo en la ciudad? Con HOME SEEKER, se puede buscar las zonas donde se puede rentar un hogar, donde un estudiante quiera vivir cerca a la NYU Stern School of Business
y ademas pueda visitar puntos especificos de su interes.

Map View:
	[Y]		El Mapa esta centrado en NYU Stern School of Business, Manhattan.
	[Y] 	Esta version contiene los marcadores de las ubicaciones de interes incluyendo casas para renta.
	[Y] 	Los marcadores tienen nombres en esta version.
	[N] 	En esta version se puede interactuar con el mapa para conseguir la informacion de una casa.

Data Visualization:
	[Y] 	Se implemento una grafica que muestra la variacion de la precipitacion diaria.
	[N] 	Por ahora no tiene interacciones con las graficas

Interaction Form:
	[Y] 	Se puede seleccionar una casa de renta de la tabla o el marcador para visualizar la informacion de esa propiedad.
	[N] 	No tiene filtros.
	[Y] 	Se puede seleccionar el precio minimo a visualizar, asi el como organizar la informacion hallada.
	[Y] 	Se puede escoger los puntos de interes.
	[N] 	No tiene interacion con la vizualizacion de los datos.


Se utilizaron las librerias de Boostrap V4, las de google maps, D3 y Jquery.


El proyecto se testeo en Google Chrome V63, Firefox V57 y Microsoft Edge.


El proyecto planea mostrar las casas de renta de interes, el usuario podra filtrar ubicaciones tales como
cercania a puntos de entretenimiento tales como museos, librerias, etc. Ademas de mostrar que zonas son seguras alrededor del
punto de la renta. Tambien se planea tener una grafica debajo del mapa donde muestre el historial de precios, seguridad, etc.
El programa sufre problemas en algunos casos en presencia de la extencion Ublock para chrome.