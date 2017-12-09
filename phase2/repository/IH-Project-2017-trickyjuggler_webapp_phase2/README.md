## webapp_phase1

HOME SEEKER


KEYWORDS: 
Entretenimiento, Seguridad, Cercania


DATASETS:
zillow_housing_price  	https://www.quandl.com/data/ZILLOW-Zillow-Real-Estate-Research?keyword=New%20York 	"Muestra el promedio del precio de rentas por zonas"
NY_museums 				https://catalog.data.gov/dataset/new-york-city-museums								"Muestra la ubicacion de museos de New York"
NY_art_galleries		https://catalog.data.gov/dataset/new-york-city-art-galleries						"Muestra la ubicacion de galerias de New York"
NY_fire_departments 	https://catalog.data.gov/dataset/fire-department-directory-for-new-york-state		"Muestra la ubicacion de departamentos anti-incendios"
NY_school_safety		https://catalog.data.gov/dataset/school-safety-report-8067a							"Muestra la seguridad de las escualas al igual que su ubicacion"

N 	online climate data 	Se planea implementar en una futura version.
Y 	Los datasets salen de data.gov y data.indy.gov


BRIEF DESCRIPTION
¿Nuevo en la ciudad? Con HOME SEEKER, se puede buscar las zonas donde se puede rentar un hogar, donde un estudiante quiera vivir cerca a la NYU Stern School of Business
y ademas pueda visitar puntos especificos de su interes.

Map View:
	[Y]		El Mapa esta centrado en NYU Stern School of Business, Manhattan.
	[Y] 	Esta version contiene los marcadores de las ubicaciones de interes, excepto casas para renta.
	[Y] 	Los marcadores tienen nombres en esta version.
	[N] 	Esta version no tiene funcionalidad para cubrir el mapa.

Data Visualization:
	[N] 	Se planea implementar una grafica mostrando el historial de las carateristicas de una zona.
	[N] 	Por ahora no tiene interacciones con las graficas

Interaction Form:
	[N] 	No tiene interaccion con informacion mostrada, por ahora.
	[N] 	No tiee filtros.
	[N] 	No tiene ningun tipo de input.
	[Y] 	Se puede escoger los puntos de interes.
	[N] 	No tiene interacion con la vizualizacion de los datos.


Se utilizaron las librerias de Boostrap V4.


El proyecto se testeo en Google Chrome V63 y Microsoft Edge.


El proyecto planea tener el mapa donde muestre todas las opciones de renta, el usuario podra fitrar ubicaciones tales como
cercania a puntos de entretenimiento tales como museos, librerias, etc. Ademas de mostrar que zonas son seguras alrededor del
punto de la renta. Tambien se planea tener una grafica debajo del mapa donde muestre el historial de precios, seguridad, etc.
El programa sufre problemas en algunos casos en presencia de la extencion Ublock para chrome.