// Extracted from NCDC because fetching this list is
// very slow and can problems due to limits with the API.
var locations = "\
Abu Dhabi, AE:CITY:AE000001\n\
Ajman, AE:CITY:AE000002\n\
Dubai, AE:CITY:AE000003\n\
Sharjah, AE:CITY:AE000006\n\
Kabul, AF:CITY:AF000007\n\
Kandahar, AF:CITY:AF000008\n\
Algiers, AG:CITY:AG000001\n\
Annaba, AG:CITY:AG000002\n\
Batna, AG:CITY:AG000003\n\
Bechar, AG:CITY:AG000004\n\
Bejaia, AG:CITY:AG000005\n\
Constantine, AG:CITY:AG000006\n\
Guelma, AG:CITY:AG000007\n\
Laghouat, AG:CITY:AG000008\n\
Medea, AG:CITY:AG000009\n\
Mostaganem, AG:CITY:AG000010\n\
Oran, AG:CITY:AG000011\n\
Oum el Bouaghi, AG:CITY:AG000012\n\
Saida, AG:CITY:AG000013\n\
Sidi-Bel-Abbes, AG:CITY:AG000014\n\
Skikda, AG:CITY:AG000015\n\
Tamanrasset, AG:CITY:AG000016\n\
Tlemcen, AG:CITY:AG000017\n\
Baku, AJ:CITY:AJ000001\n\
Naxcivian, AJ:CITY:AJ000002\n\
Durres, AL:CITY:AL000001\n\
Shkoder, AL:CITY:AL000004\n\
Tirana, AL:CITY:AL000005\n\
Yerevan, AM:CITY:AM000001\n\
Luanda, AO:CITY:AO000005\n\
Lubango, AO:CITY:AO000006\n\
Namibe, AO:CITY:AO000008\n\
Bahia Blanca, AR:CITY:AR000001\n\
Buenos Aires, AR:CITY:AR000002\n\
Catamarca, AR:CITY:AR000003\n\
Comodoro Rivadavia, AR:CITY:AR000004\n\
Cordoba, AR:CITY:AR000005\n\
Corrientes, AR:CITY:AR000006\n\
Formosa, AR:CITY:AR000007\n\
La Plata, AR:CITY:AR000008\n\
La Rioja, AR:CITY:AR000009\n\
Mendoza, AR:CITY:AR000010\n\
Neuquen, AR:CITY:AR000011\n\
Parana, AR:CITY:AR000012\n\
Posadas, AR:CITY:AR000013\n\
Resistencia, AR:CITY:AR000014\n\
Rio Gallegos, AR:CITY:AR000015\n\
Rosario, AR:CITY:AR000016\n\
Salta, AR:CITY:AR000017\n\
San Juan, AR:CITY:AR000018\n\
San Luis, AR:CITY:AR000019\n\
San Miguel De Tucuman, AR:CITY:AR000020\n\
Santa Rosa, AR:CITY:AR000023\n\
Santiago Del Estero, AR:CITY:AR000024\n\
Ushuaia, AR:CITY:AR000025\n\
Adelaide, AS:CITY:AS000001\n\
Brisbane, AS:CITY:AS000002\n\
Cairns, AS:CITY:AS000003\n\
Canberra, AS:CITY:AS000004\n\
Darwin, AS:CITY:AS000005\n\
Melbourne, AS:CITY:AS000006\n\
Newcastle, AS:CITY:AS000007\n\
Perth, AS:CITY:AS000008\n\
Rockhampton, AS:CITY:AS000009\n\
Sydney, AS:CITY:AS000010\n\
Townsville, AS:CITY:AS000011\n\
Graz, AU:CITY:AU000001\n\
Innsbruck, AU:CITY:AU000002\n\
Klagenfurt, AU:CITY:AU000003\n\
Salzburg, AU:CITY:AU000005\n\
Vienna, AU:CITY:AU000006\n\
Al-Muharraq, BA:CITY:BA000001\n\
Manama, BA:CITY:BA000002\n\
Bridgetown, BB:CITY:BB000001\n\
Francistown, BC:CITY:BC000001\n\
Gaborone, BC:CITY:BC000002\n\
Molepolole, BC:CITY:BC000003\n\
Brussels, BE:CITY:BE000002\n\
Gent, BE:CITY:BE000003\n\
Hasselt, BE:CITY:BE000004\n\
Liege, BE:CITY:BE000005\n\
Nassau, BF:CITY:BF000001\n\
Barisal, BG:CITY:BG000001\n\
Chittagong, BG:CITY:BG000002\n\
Dhaka, BG:CITY:BG000003\n\
Rajshahi, BG:CITY:BG000005\n\
Belize, BH:CITY:BH000001\n\
Sarajevo, BK:CITY:BK000001\n\
Cochabamba, BL:CITY:BL000001\n\
La Paz, BL:CITY:BL000002\n\
Oruro, BL:CITY:BL000003\n\
Potosi, BL:CITY:BL000004\n\
Santa Cruz de La Sierra, BL:CITY:BL000005\n\
Sucre, BL:CITY:BL000006\n\
Tarija, BL:CITY:BL000007\n\
Trinidad, BL:CITY:BL000008\n\
Mandalay, BM:CITY:BM000003\n\
Myitkyina, BM:CITY:BM000005\n\
Rangoon, BM:CITY:BM000007\n\
Sagaing, BM:CITY:BM000008\n\
Sittwe, BM:CITY:BM000009\n\
Abomey, BN:CITY:BN000001\n\
Cotonou, BN:CITY:BN000002\n\
Lokossa, BN:CITY:BN000003\n\
Natitingou, BN:CITY:BN000004\n\
Parakou, BN:CITY:BN000005\n\
Brest, BO:CITY:BO000001\n\
Homyel', BO:CITY:BO000002\n\
Hrodna, BO:CITY:BO000003\n\
Mahilyow, BO:CITY:BO000004\n\
Minsk, BO:CITY:BO000005\n\
Vitsyebsk, BO:CITY:BO000006\n\
Honiara, BP:CITY:BP000001\n\
Aracaju, BR:CITY:BR000001\n\
Belem, BR:CITY:BR000002\n\
Belo Horizonte, BR:CITY:BR000003\n\
Boa Vista, BR:CITY:BR000004\n\
Brasilia, BR:CITY:BR000005\n\
Campo Grande, BR:CITY:BR000006\n\
Cuiaba, BR:CITY:BR000007\n\
Curitiba, BR:CITY:BR000008\n\
Florianopolis, BR:CITY:BR000009\n\
Fortaleza, BR:CITY:BR000010\n\
Goiania, BR:CITY:BR000011\n\
Joao Pessoa, BR:CITY:BR000012\n\
Macapa, BR:CITY:BR000013\n\
Maceio, BR:CITY:BR000014\n\
Manaus, BR:CITY:BR000015\n\
Natal, BR:CITY:BR000016\n\
Niteroi, BR:CITY:BR000017\n\
Palmas, BR:CITY:BR000018\n\
Porto Alegre, BR:CITY:BR000019\n\
orto Velho, BR:CITY:BR000020\n\
Recife, BR:CITY:BR000021\n\
Rio Branco, BR:CITY:BR000022\n\
Rio de Janeiro, BR:CITY:BR000023\n\
Salvador, BR:CITY:BR000024\n\
Santarem, BR:CITY:BR000025\n\
Santos, BR:CITY:BR000026\n\
Sao Luis, BR:CITY:BR000027\n\
Sao Paulo, BR:CITY:BR000028\n\
Teresina, BR:CITY:BR000029\n\
Vitoria, BR:CITY:BR000030\n\
Sofia, BU:CITY:BU000002\n\
Varna, BU:CITY:BU000003\n\
Bandar Seri Begawan, BX:CITY:BX000001\n\
Bujumbura, BY:CITY:BY000001\n\
Muyinga, BY:CITY:BY000002\n\
algary, CA:CITY:CA000001\n\
Edmonton, CA:CITY:CA000002\n\
Fredericton, CA:CITY:CA000003\n\
Halifax, CA:CITY:CA000004\n\
Montreal, CA:CITY:CA000005\n\
Ottawa, CA:CITY:CA000006\n\
Quebec, CA:CITY:CA000007\n\
Regina, CA:CITY:CA000008\n\
Saint John, CA:CITY:CA000009\n\
Saskatoon, CA:CITY:CA000010\n\
oronto, CA:CITY:CA000011\n\
Vancouver, CA:CITY:CA000012\n\
Victoria, CA:CITY:CA000013\n\
Winnipeg, CA:CITY:CA000014\n\
Phnom Penh, CB:CITY:CB000004\n\
Abeche, CD:CITY:CD000001\n\
Moundou, CD:CITY:CD000002\n\
Ndjamena, CD:CITY:CD000003\n\
Sarh, CD:CITY:CD000004\n\
Colombo, CE:CITY:CE000002\n\
Trincomalee, CE:CITY:CE000005\n\
Brazzaville, CF:CITY:CF000001\n\
oubomo, CF:CITY:CF000002\n\
Pointe Noire, CF:CITY:CF000003\n\
Bandundu, CG:CITY:CG000001\n\
Kananga, CG:CITY:CG000002\n\
Kinshasa, CG:CITY:CG000003\n\
Lumumbashi, CG:CITY:CG000005\n\
Matadi, CG:CITY:CG000006\n\
Mbandaka, CG:CITY:CG000007\n\
Mbuji-Mayi, CG:CITY:CG000008\n\
Beijing, CH:CITY:CH000003\n\
Changchun, CH:CITY:CH000004\n\
Changsha, CH:CITY:CH000005\n\
Chengdu, CH:CITY:CH000006\n\
Chongqing, CH:CITY:CH000007\n\
Dalian, CH:CITY:CH000008\n\
Fushun, CH:CITY:CH000009\n\
Fuzhou, CH:CITY:CH000010\n\
Guangzhou, CH:CITY:CH000011\n\
Guiyang, CH:CITY:CH000012\n\
Hangzhou, CH:CITY:CH000013\n\
Harbin, CH:CITY:CH000014\n\
efei, CH:CITY:CH000015\n\
Hong Kong, CH:CITY:CH000016\n\
Huhot, CH:CITY:CH000017\n\
Jinan, CH:CITY:CH000019\n\
Kashi, CH:CITY:CH000020\n\
Kunming, CH:CITY:CH000021\n\
Lanzhou, CH:CITY:CH000022\n\
hasa, CH:CITY:CH000023\n\
Macau, CH:CITY:CH000025\n\
Nanchang, CH:CITY:CH000026\n\
Nanjing, CH:CITY:CH000027\n\
Nanning, CH:CITY:CH000028\n\
Qingdao, CH:CITY:CH000029\n\
Qiqihar, CH:CITY:CH000030\n\
Shanghai, CH:CITY:CH000031\n\
Shenyang, CH:CITY:CH000032\n\
Shijiazhuang, CH:CITY:CH000033\n\
Taiyuan, CH:CITY:CH000037\n\
Tianjin, CH:CITY:CH000039\n\
rumqi, CH:CITY:CH000040\n\
Wuhan, CH:CITY:CH000041\n\
Xi'an, CH:CITY:CH000042\n\
Xining, CH:CITY:CH000043\n\
Yinchuan, CH:CITY:CH000044\n\
Zhengzhou, CH:CITY:CH000045\n\
Antofagasta, CI:CITY:CI000001\n\
Concepcion, CI:CITY:CI000002\n\
Copiapo, CI:CITY:CI000003\n\
Coquimbo, CI:CITY:CI000004\n\
La Serena, CI:CITY:CI000006\n\
Puerto Montt, CI:CITY:CI000007\n\
Punta Arenas, CI:CITY:CI000008\n\
Santiago, CI:CITY:CI000009\n\
Temuco, CI:CITY:CI000011\n\
Bertoua, CM:CITY:CM000003\n\
Douala, CM:CITY:CM000004\n\
Garoua, CM:CITY:CM000006\n\
Maroua, CM:CITY:CM000007\n\
Ngaoundere, CM:CITY:CM000008\n\
Arauca, CO:CITY:CO000001\n\
Armenia, CO:CITY:CO000002\n\
Barranquilla, CO:CITY:CO000003\n\
Bogota, CO:CITY:CO000004\n\
Bucaramanga, CO:CITY:CO000005\n\
Cali, CO:CITY:CO000006\n\
Cartagena, CO:CITY:CO000007\n\
Cucuta, CO:CITY:CO000008\n\
Ibague, CO:CITY:CO000010\n\
Medellin, CO:CITY:CO000012\n\
Monteria, CO:CITY:CO000013\n\
Neiva, CO:CITY:CO000014\n\
Pasto, CO:CITY:CO000015\n\
Pereira, CO:CITY:CO000016\n\
Quibdo, CO:CITY:CO000017\n\
Riohacha, CO:CITY:CO000018\n\
San Andres, CO:CITY:CO000019\n\
Santa Marta, CO:CITY:CO000020\n\
Valledupar, CO:CITY:CO000023\n\
Villavicencio, CO:CITY:CO000024\n\
Puerto Limon, CS:CITY:CS000001\n\
San Jose, CS:CITY:CS000002\n\
Bangui, CT:CITY:CT000001\n\
Berberati, CT:CITY:CT000002\n\
Camaguey, CU:CITY:CU000001\n\
Havana, CU:CITY:CU000005\n\
Matanzas, CU:CITY:CU000008\n\
Praia, CV:CITY:CV000001\n\
Lemesos, CY:CITY:CY000001\n\
Nicosia, CY:CITY:CY000002\n\
Alborg, DA:CITY:DA000001\n\
Copenhagen, DA:CITY:DA000003\n\
Santiago, DR:CITY:DR000008\n\
Santo Domingo, DR:CITY:DR000009\n\
Babahoyo, EC:CITY:EC000002\n\
Loja, EC:CITY:EC000006\n\
Portoviejo, EC:CITY:EC000008\n\
Quito, EC:CITY:EC000009\n\
Al Ghurdaqah, EG:CITY:EG000001\n\
Alexandria, EG:CITY:EG000002\n\
Aswan, EG:CITY:EG000003\n\
Cairo, EG:CITY:EG000005\n\
Giza, EG:CITY:EG000007\n\
Ismailia, EG:CITY:EG000008\n\
Marsa Matruh, EG:CITY:EG000009\n\
Qena, EG:CITY:EG000010\n\
Suez, EG:CITY:EG000012\n\
Cork, EI:CITY:EI000001\n\
Dublin, EI:CITY:EI000002\n\
Galway, EI:CITY:EI000003\n\
Bata, EK:CITY:EK000001\n\
Malabo, EK:CITY:EK000002\n\
Tallinn, EN:CITY:EN000001\n\
Asmara, ER:CITY:ER000001\n\
Nueva San Salvador, ES:CITY:ES000001\n\
San Salvador, ES:CITY:ES000002\n\
Sonsonate, ES:CITY:ES000004\n\
Addis Ababa, ET:CITY:ET000001\n\
Arba Minch, ET:CITY:ET000002\n\
Awasa, ET:CITY:ET000003\n\
Debre Markos, ET:CITY:ET000004\n\
Dese, ET:CITY:ET000005\n\
Gonder, ET:CITY:ET000006\n\
Jima, ET:CITY:ET000007\n\
Brno, EZ:CITY:EZ000001\n\
Ostrava, EZ:CITY:EZ000004\n\
Prague, EZ:CITY:EZ000006\n\
Usti Nad Labem, EZ:CITY:EZ000007\n\
Cayenne, FG:CITY:FG000001\n\
Helsinki, FI:CITY:FI000001\n\
Joensuu, FI:CITY:FI000002\n\
Jyvaskyla, FI:CITY:FI000003\n\
Kuopio, FI:CITY:FI000004\n\
Oulu, FI:CITY:FI000005\n\
Turku, FI:CITY:FI000006\n\
Suva, FJ:CITY:FJ000001\n\
Ajaccio, FR:CITY:FR000001\n\
Amiens, FR:CITY:FR000002\n\
Besancon, FR:CITY:FR000003\n\
Brest, FR:CITY:FR000005\n\
Caen, FR:CITY:FR000006\n\
Clermont-Ferrand, FR:CITY:FR000007\n\
Dijon, FR:CITY:FR000008\n\
Le Havre, FR:CITY:FR000009\n\
Lille, FR:CITY:FR000010\n\
Limoges, FR:CITY:FR000011\n\
Lyon, FR:CITY:FR000012\n\
Marseille, FR:CITY:FR000013\n\
Montpellier, FR:CITY:FR000014\n\
Nancy, FR:CITY:FR000015\n\
Nantes, FR:CITY:FR000016\n\
Orleans, FR:CITY:FR000017\n\
Paris, FR:CITY:FR000018\n\
Poitiers, FR:CITY:FR000019\n\
Reims, FR:CITY:FR000020\n\
Rennes, FR:CITY:FR000021\n\
Rouen, FR:CITY:FR000022\n\
Strasbourg, FR:CITY:FR000023\n\
Toulouse, FR:CITY:FR000024\n\
Brikama, GA:CITY:GA000001\n\
Libreville, GB:CITY:GB000001\n\
Port Gentil, GB:CITY:GB000002\n\
Bat'umi, GG:CITY:GG000001\n\
Sokhumi, GG:CITY:GG000002\n\
T'Bilisi, GG:CITY:GG000003\n\
Accra, GH:CITY:GH000001\n\
Ho, GH:CITY:GH000004\n\
Koforidua, GH:CITY:GH000005\n\
Kumasi, GH:CITY:GH000006\n\
Sekondi, GH:CITY:GH000007\n\
Sunyani, GH:CITY:GH000008\n\
Tamale, GH:CITY:GH000009\n\
Wa, GH:CITY:GH000010\n\
Berlin, GM:CITY:GM000001\n\
Bonn, GM:CITY:GM000002\n\
Bremen, GM:CITY:GM000003\n\
Bremerhaven, GM:CITY:GM000004\n\
Cologne, GM:CITY:GM000005\n\
Dortmund, GM:CITY:GM000006\n\
Dresden, GM:CITY:GM000007\n\
Duisburg, GM:CITY:GM000008\n\
Dusseldorf, GM:CITY:GM000009\n\
Erfurt, GM:CITY:GM000010\n\
Essen, GM:CITY:GM000011\n\
Frankfurt, GM:CITY:GM000012\n\
Hamburg, GM:CITY:GM000013\n\
Hannover, GM:CITY:GM000014\n\
Kiel, GM:CITY:GM000015\n\
Leipzig, GM:CITY:GM000016\n\
Magdeburg, GM:CITY:GM000017\n\
Mainz, GM:CITY:GM000018\n\
Munich, GM:CITY:GM000019\n\
Potsdam, GM:CITY:GM000020\n\
Saarbrucken, GM:CITY:GM000021\n\
Schwerin, GM:CITY:GM000022\n\
Stuttgart, GM:CITY:GM000023\n\
Wiesbaden, GM:CITY:GM000024\n\
Athens, GR:CITY:GR000001\n\
Iraklion, GR:CITY:GR000003\n\
Larisa, GR:CITY:GR000004\n\
Piraeus, GR:CITY:GR000006\n\
Thessaloniki, GR:CITY:GR000007\n\
Guatemala, GT:CITY:GT000004\n\
Conakry, GV:CITY:GV000001\n\
Kankan, GV:CITY:GV000002\n\
Kindia, GV:CITY:GV000003\n\
Nzerekore, GV:CITY:GV000004\n\
Georgetown, GY:CITY:GY000001\n\
La Ceiba, HO:CITY:HO000002\n\
San Pedro Sula, HO:CITY:HO000003\n\
Tegucigalpa, HO:CITY:HO000004\n\
Rijeka, HR:CITY:HR000001\n\
Zagreb, HR:CITY:HR000002\n\
Budapest, HU:CITY:HU000002\n\
Debrecen, HU:CITY:HU000003\n\
Miskolc, HU:CITY:HU000008\n\
Pecs, HU:CITY:HU000010\n\
Szeged, HU:CITY:HU000011\n\
Reykjavik, IC:CITY:IC000001\n\
Ambon, ID:CITY:ID000001\n\
Balikpapan, ID:CITY:ID000002\n\
Banda Aceh, ID:CITY:ID000003\n\
Bandjermasin, ID:CITY:ID000004\n\
Bengkulu, ID:CITY:ID000006\n\
Denpasar, ID:CITY:ID000007\n\
Jakarta, ID:CITY:ID000008\n\
Jambi, ID:CITY:ID000009\n\
Jayapura, ID:CITY:ID000010\n\
Kupang, ID:CITY:ID000011\n\
Makassar, ID:CITY:ID000012\n\
Manado, ID:CITY:ID000013\n\
Mataram, ID:CITY:ID000014\n\
Medan, ID:CITY:ID000015\n\
Padang, ID:CITY:ID000016\n\
Palembang, ID:CITY:ID000017\n\
Palu, ID:CITY:ID000018\n\
Pontianak, ID:CITY:ID000019\n\
Samarinda, ID:CITY:ID000020\n\
Semarang, ID:CITY:ID000021\n\
Surabaja, ID:CITY:ID000022\n\
Tanjungkarang-Telukbetung, ID:CITY:ID000023\n\
Agartala, IN:CITY:IN000001\n\
Ahmadabad, IN:CITY:IN000002\n\
Aizawl, IN:CITY:IN000003\n\
Amritsar, IN:CITY:IN000004\n\
Bangalore, IN:CITY:IN000005\n\
Bhopal, IN:CITY:IN000006\n\
Bhubaneshwar, IN:CITY:IN000007\n\
Chandigarh, IN:CITY:IN000008\n\
Chennai, IN:CITY:IN000009\n\
Cochin, IN:CITY:IN000010\n\
Delhi, IN:CITY:IN000011\n\
Hyderabad, IN:CITY:IN000012\n\
Imphal, IN:CITY:IN000013\n\
Jaipur, IN:CITY:IN000014\n\
Kanpur, IN:CITY:IN000015\n\
Kohima, IN:CITY:IN000016\n\
Kolkata, IN:CITY:IN000017\n\
Lucknow, IN:CITY:IN000018\n\
Madurai, IN:CITY:IN000019\n\
Mangalore, IN:CITY:IN000020\n\
Mumbai, IN:CITY:IN000021\n\
Nagpur, IN:CITY:IN000022\n\
New Delhi, IN:CITY:IN000023\n\
Panaji, IN:CITY:IN000024\n\
Patna, IN:CITY:IN000025\n\
Pondicherry, IN:CITY:IN000026\n\
Port Blair, IN:CITY:IN000027\n\
Pune, IN:CITY:IN000028\n\
Shillong, IN:CITY:IN000029\n\
Simla, IN:CITY:IN000030\n\
Trivandrum, IN:CITY:IN000031\n\
Varanasi, IN:CITY:IN000032\n\
Vishakhapatnam, IN:CITY:IN000033\n\
Ahvaz, IR:CITY:IR000001\n\
Arak, IR:CITY:IR000002\n\
Esfahan, IR:CITY:IR000003\n\
Hamadan, IR:CITY:IR000004\n\
Ilam, IR:CITY:IR000005\n\
Kerman, IR:CITY:IR000006\n\
Kermanshah, IR:CITY:IR000007\n\
Khorramabad, IR:CITY:IR000008\n\
Mashhad, IR:CITY:IR000009\n\
Rasht, IR:CITY:IR000010\n\
Sanandaj, IR:CITY:IR000011\n\
Semnan, IR:CITY:IR000013\n\
Shahr-E Kord, IR:CITY:IR000014\n\
Shiraz, IR:CITY:IR000015\n\
Tabriz, IR:CITY:IR000016\n\
Tehran, IR:CITY:IR000017\n\
Yazd, IR:CITY:IR000018\n\
Zahedan, IR:CITY:IR000019\n\
Zanjan, IR:CITY:IR000020\n\
Beersheba, IS:CITY:IS000001\n\
Jerusalem, IS:CITY:IS000003\n\
Ramla, IS:CITY:IS000005\n\
Tel Aviv-Yafo, IS:CITY:IS000006\n\
Bologna, IT:CITY:IT000004\n\
Cagliari, IT:CITY:IT000005\n\
Campobasso, IT:CITY:IT000006\n\
Genoa, IT:CITY:IT000009\n\
Milan, IT:CITY:IT000010\n\
Naples, IT:CITY:IT000011\n\
Palermo, IT:CITY:IT000012\n\
Rome, IT:CITY:IT000015\n\
Trento, IT:CITY:IT000016\n\
Trieste, IT:CITY:IT000017\n\
Turin, IT:CITY:IT000018\n\
Abidjan, IV:CITY:IV000002\n\
Bondoukou, IV:CITY:IV000005\n\
Bouake, IV:CITY:IV000007\n\
Daloa, IV:CITY:IV000008\n\
Dimbokro, IV:CITY:IV000010\n\
Ferkessedougou, IV:CITY:IV000012\n\
Gagnoa, IV:CITY:IV000013\n\
Korhogo, IV:CITY:IV000015\n\
Man, IV:CITY:IV000016\n\
Yamoussoukro, IV:CITY:IV000021\n\
Al Basrah, IZ:CITY:IZ000003\n\
Aomori, JA:CITY:JA000001\n\
Fukuoka, JA:CITY:JA000002\n\
Gifu, JA:CITY:JA000003\n\
Hiroshima, JA:CITY:JA000004\n\
Kawasaki, JA:CITY:JA000005\n\
Kita Kyushu, JA:CITY:JA000006\n\
Kobe, JA:CITY:JA000007\n\
Kyoto, JA:CITY:JA000008\n\
Nagasaki, JA:CITY:JA000009\n\
Nagoya, JA:CITY:JA000010\n\
Naha, JA:CITY:JA000011\n\
Osaka, JA:CITY:JA000012\n\
Sapporo, JA:CITY:JA000013\n\
Sendai, JA:CITY:JA000014\n\
Shimonoseki, JA:CITY:JA000015\n\
Tokyo, JA:CITY:JA000016\n\
Yokohama, JA:CITY:JA000017\n\
Kingston, JM:CITY:JM000001\n\
Montego Bay, JM:CITY:JM000002\n\
Spanish Town, JM:CITY:JM000003\n\
Al Mafraq, JO:CITY:JO000001\n\
Az Zarqa', JO:CITY:JO000004\n\
Irbid, JO:CITY:JO000005\n\
Mombasa, KE:CITY:KE000003\n\
Nairobi, KE:CITY:KE000004\n\
Bishkek, KG:CITY:KG000001\n\
Karakol, KG:CITY:KG000002\n\
Osh, KG:CITY:KG000003\n\
Haeju, KN:CITY:KN000002\n\
Hyesan, KN:CITY:KN000004\n\
Kaesong, KN:CITY:KN000005\n\
P'yongyang, KN:CITY:KN000007\n\
Sariwon, KN:CITY:KN000008\n\
Sinuiju, KN:CITY:KN000009\n\
Wonsan, KN:CITY:KN000010\n\
Ch'unch'on, KS:CITY:KS000001\n\
Ch'ungju, KS:CITY:KS000002\n\
Cheju, KS:CITY:KS000003\n\
Chonju, KS:CITY:KS000004\n\
Inch`on, KS:CITY:KS000005\n\
Kwangju, KS:CITY:KS000006\n\
Pusan, KS:CITY:KS000007\n\
Seoul, KS:CITY:KS000008\n\
Taegu, KS:CITY:KS000009\n\
Taejon, KS:CITY:KS000010\n\
Kuwait, KU:CITY:KU000001\n\
Aktyubinsk, KZ:CITY:KZ000001\n\
Almaty, KZ:CITY:KZ000002\n\
Astana, KZ:CITY:KZ000003\n\
Atyrau, KZ:CITY:KZ000004\n\
Dzhambul, KZ:CITY:KZ000005\n\
Karaganda, KZ:CITY:KZ000006\n\
Kokshetau, KZ:CITY:KZ000007\n\
Kostanay, KZ:CITY:KZ000008\n\
Kyzylorda, KZ:CITY:KZ000009\n\
Pavlodar, KZ:CITY:KZ000010\n\
Petropavlovsk, KZ:CITY:KZ000011\n\
Semipalatinsk, KZ:CITY:KZ000012\n\
Shymkent, KZ:CITY:KZ000013\n\
Taldykorgan, KZ:CITY:KZ000014\n\
Ural'sk, KZ:CITY:KZ000015\n\
Ust'-Kamenogorsk, KZ:CITY:KZ000016\n\
Zhezkazgan, KZ:CITY:KZ000017\n\
Savannakhet, LA:CITY:LA000001\n\
Vientiane, LA:CITY:LA000002\n\
Beirut, LE:CITY:LE000001\n\
Tripoli, LE:CITY:LE000003\n\
Zahle, LE:CITY:LE000004\n\
Riga, LG:CITY:LG000001\n\
Vilnius, LH:CITY:LH000001\n\
Monrovia, LI:CITY:LI000001\n\
Banska Bystrica, LO:CITY:LO000001\n\
Kosice, LO:CITY:LO000003\n\
Mafeteng, LT:CITY:LT000001\n\
Maseru, LT:CITY:LT000002\n\
Luxembourg, LU:CITY:LU000001\n\
Ajdabiya, LY:CITY:LY000001\n\
Al Khums, LY:CITY:LY000002\n\
Benghazi, LY:CITY:LY000003\n\
Darnah, LY:CITY:LY000004\n\
Misratah, LY:CITY:LY000005\n\
Tripoli, LY:CITY:LY000006\n\
Antananarivo, MA:CITY:MA000001\n\
Antsiranana, MA:CITY:MA000002\n\
Fianarantsoa, MA:CITY:MA000003\n\
Mahajanga, MA:CITY:MA000004\n\
Toamasina, MA:CITY:MA000005\n\
Toliara, MA:CITY:MA000006\n\
Fort-De-France, MB:CITY:MB000001\n\
Chisinau, MD:CITY:MD000001\n\
Mamoutzou, MF:CITY:MF000001\n\
Ulaanbaatar, MG:CITY:MG000002\n\
Blantyre, MI:CITY:MI000001\n\
Lilongwe, MI:CITY:MI000002\n\
Podgorica, MJ:CITY:MJ000001\n\
Skopje, MK:CITY:MK000001\n\
Bamako, ML:CITY:ML000001\n\
Gao, ML:CITY:ML000002\n\
Kayes, ML:CITY:ML000003\n\
Mopti, ML:CITY:ML000004\n\
Segou, ML:CITY:ML000005\n\
Sikasso, ML:CITY:ML000006\n\
Casablanca, MO:CITY:MO000002\n\
Marrakech, MO:CITY:MO000004\n\
Meknes, MO:CITY:MO000005\n\
Oujda, MO:CITY:MO000006\n\
Rabat, MO:CITY:MO000007\n\
Port Louis, MP:CITY:MP000001\n\
Nouadhibou, MR:CITY:MR000001\n\
Nouakchott, MR:CITY:MR000002\n\
Muscat, MU:CITY:MU000001\n\
Acapulco, MX:CITY:MX000001\n\
Aguascalientes, MX:CITY:MX000002\n\
Campeche, MX:CITY:MX000003\n\
Chetumal, MX:CITY:MX000004\n\
Chihuahua, MX:CITY:MX000005\n\
Chilpancingo De Los Bravo, MX:CITY:MX000006\n\
Ciudad Victoria, MX:CITY:MX000007\n\
Colima, MX:CITY:MX000008\n\
Cuernavaca, MX:CITY:MX000009\n\
Culiacan, MX:CITY:MX000010\n\
Durango, MX:CITY:MX000011\n\
Guadalajara, MX:CITY:MX000012\n\
Guanajuato, MX:CITY:MX000013\n\
Hermosillo, MX:CITY:MX000014\n\
Jalapa, MX:CITY:MX000015\n\
La Paz, MX:CITY:MX000016\n\
Mazatlan, MX:CITY:MX000017\n\
Merida, MX:CITY:MX000018\n\
Mexicali, MX:CITY:MX000019\n\
Mexico City, MX:CITY:MX000020\n\
Monterrey, MX:CITY:MX000021\n\
Morelia, MX:CITY:MX000022\n\
Oaxaca, MX:CITY:MX000023\n\
Pachuca, MX:CITY:MX000024\n\
Puebla, MX:CITY:MX000025\n\
Queretaro, MX:CITY:MX000026\n\
Saltillo, MX:CITY:MX000027\n\
San Luis Potosi, MX:CITY:MX000028\n\
Tampico, MX:CITY:MX000029\n\
Tepic, MX:CITY:MX000030\n\
Tlaxcala, MX:CITY:MX000031\n\
Toluca, MX:CITY:MX000032\n\
Tuxtla Gutierrez, MX:CITY:MX000033\n\
Veracruz, MX:CITY:MX000034\n\
Villahermosa, MX:CITY:MX000035\n\
Zacatecas, MX:CITY:MX000036\n\
Johor Baharu, MY:CITY:MY000003\n\
Kota Baharu, MY:CITY:MY000005\n\
Kota Kinabalu, MY:CITY:MY000006\n\
Kuala Lumpur, MY:CITY:MY000007\n\
Kuantan New Port, MY:CITY:MY000009\n\
Kuching, MY:CITY:MY000010\n\
Melaka, MY:CITY:MY000011\n\
Pinang, MY:CITY:MY000012\n\
Shah Alam, MY:CITY:MY000014\n\
Beira, MZ:CITY:MZ000001\n\
Chimoio, MZ:CITY:MZ000002\n\
Inhambane, MZ:CITY:MZ000003\n\
Lichinga, MZ:CITY:MZ000004\n\
Maputo, MZ:CITY:MZ000005\n\
Nampula, MZ:CITY:MZ000006\n\
Pemba, MZ:CITY:MZ000007\n\
Quelimane, MZ:CITY:MZ000008\n\
Tete, MZ:CITY:MZ000009\n\
Xai-Xai, MZ:CITY:MZ000010\n\
Maradi, NG:CITY:NG000001\n\
Niamey, NG:CITY:NG000002\n\
Tahoua, NG:CITY:NG000003\n\
Zinder, NG:CITY:NG000004\n\
Enugu, NI:CITY:NI000011\n\
Ilorin, NI:CITY:NI000013\n\
Jos, NI:CITY:NI000015\n\
Kano, NI:CITY:NI000017\n\
Lagos, NI:CITY:NI000019\n\
Maiduguri, NI:CITY:NI000021\n\
Makurdi, NI:CITY:NI000022\n\
Minna, NI:CITY:NI000023\n\
Port Harcourt, NI:CITY:NI000025\n\
Yola, NI:CITY:NI000028\n\
's-Hertogenbosch, NL:CITY:NL000001\n\
Amsterdam, NL:CITY:NL000002\n\
Arnhem, NL:CITY:NL000003\n\
Assen, NL:CITY:NL000004\n\
Groningen, NL:CITY:NL000005\n\
Haarlem, NL:CITY:NL000006\n\
Leeuwarden, NL:CITY:NL000007\n\
Maastricht, NL:CITY:NL000008\n\
Rotterdam, NL:CITY:NL000009\n\
The Hague, NL:CITY:NL000010\n\
Utrecht, NL:CITY:NL000011\n\
Zwolle, NL:CITY:NL000012\n\
Bergen, NO:CITY:NO000001\n\
Drammen, NO:CITY:NO000002\n\
Kristiansand, NO:CITY:NO000003\n\
Oslo, NO:CITY:NO000004\n\
Stavanger, NO:CITY:NO000005\n\
Tromso, NO:CITY:NO000006\n\
Trondheim, NO:CITY:NO000007\n\
Bhairawa, NP:CITY:NP000001\n\
Biratnagar, NP:CITY:NP000002\n\
Kathmandu, NP:CITY:NP000004\n\
Willemstad, NT:CITY:NT000001\n\
Chinandega, NU:CITY:NU000001\n\
Esteli, NU:CITY:NU000002\n\
Jinotega, NU:CITY:NU000004\n\
Juigalpa, NU:CITY:NU000005\n\
Managua, NU:CITY:NU000007\n\
Masaya, NU:CITY:NU000008\n\
Matagalpa, NU:CITY:NU000009\n\
Auckland, NZ:CITY:NZ000001\n\
Christchurch, NZ:CITY:NZ000002\n\
Wellington, NZ:CITY:NZ000007\n\
Asuncion, PA:CITY:PA000001\n\
Coronel Oviedo, PA:CITY:PA000002\n\
Encarnacion, PA:CITY:PA000003\n\
Arequipa, PE:CITY:PE000002\n\
Ayacucho, PE:CITY:PE000003\n\
Cajamarca, PE:CITY:PE000004\n\
Callao, PE:CITY:PE000005\n\
Chiclayo, PE:CITY:PE000007\n\
Cuzco, PE:CITY:PE000009\n\
Huanuco, PE:CITY:PE000011\n\
Huaraz, PE:CITY:PE000012\n\
Iquitos, PE:CITY:PE000014\n\
Lima, PE:CITY:PE000015\n\
Piura, PE:CITY:PE000017\n\
Pucallpa, PE:CITY:PE000018\n\
Tacna, PE:CITY:PE000020\n\
Trujillo, PE:CITY:PE000021\n\
Tumbes, PE:CITY:PE000022\n\
Hyderabad, PK:CITY:PK000002\n\
Islamabad, PK:CITY:PK000003\n\
Karachi, PK:CITY:PK000004\n\
Lahore, PK:CITY:PK000005\n\
Peshawar, PK:CITY:PK000006\n\
Quetta, PK:CITY:PK000007\n\
Rawalpindi, PK:CITY:PK000008\n\
Bialystok, PL:CITY:PL000002\n\
Elblag, PL:CITY:PL000007\n\
Krakow, PL:CITY:PL000017\n\
Poznan, PL:CITY:PL000030\n\
Siedlce, PL:CITY:PL000034\n\
Szczecin, PL:CITY:PL000037\n\
Warsaw, PL:CITY:PL000042\n\
Wroclaw, PL:CITY:PL000044\n\
Colon, PM:CITY:PM000001\n\
Panama, PM:CITY:PM000003\n\
Aveiro, PO:CITY:PO000001\n\
Braga, PO:CITY:PO000002\n\
Coimbra, PO:CITY:PO000003\n\
Evora, PO:CITY:PO000004\n\
Funchal, PO:CITY:PO000005\n\
Lisbon, PO:CITY:PO000006\n\
Porto, PO:CITY:PO000007\n\
Port Moresby, PP:CITY:PP000002\n\
Bissau, PU:CITY:PU000001\n\
Doha, QA:CITY:QA000001\n\
Belgrade, RB:CITY:RB000001\n\
Saint-Denis, RE:CITY:RE000001\n\
Arad, RO:CITY:RO000002\n\
Bacau, RO:CITY:RO000003\n\
Baia Mare, RO:CITY:RO000004\n\
Bistrita, RO:CITY:RO000005\n\
Botosani, RO:CITY:RO000006\n\
Braila, RO:CITY:RO000007\n\
Bucharest, RO:CITY:RO000009\n\
Buzau, RO:CITY:RO000010\n\
Calarasi, RO:CITY:RO000011\n\
Cluj-Napoca, RO:CITY:RO000012\n\
Constanta, RO:CITY:RO000013\n\
Craiova, RO:CITY:RO000014\n\
Deva, RO:CITY:RO000015\n\
Drobeta- Turmu Sererin, RO:CITY:RO000016\n\
Galati, RO:CITY:RO000018\n\
Iasi, RO:CITY:RO000020\n\
Rimnicu Vilcea, RO:CITY:RO000026\n\
Sibiu, RO:CITY:RO000029\n\
Suceava, RO:CITY:RO000032\n\
Targu Jiu, RO:CITY:RO000034\n\
Timisoara, RO:CITY:RO000036\n\
Tulcea, RO:CITY:RO000037\n\
Manila, RP:CITY:RP000002\n\
Mayaguez, RQ:CITY:RQ000001\n\
Ponce, RQ:CITY:RQ000002\n\
San Juan, RQ:CITY:RQ000003\n\
Abakan, RS:CITY:RS000001\n\
Arkangel'sk, RS:CITY:RS000002\n\
Astrakhan, RS:CITY:RS000003\n\
Barnaul, RS:CITY:RS000004\n\
Belgorod, RS:CITY:RS000005\n\
Birobidzhan, RS:CITY:RS000006\n\
Blagoveshchensk, RS:CITY:RS000007\n\
Ceboksary, RS:CITY:RS000008\n\
Chelyabinsk, RS:CITY:RS000009\n\
Chita, RS:CITY:RS000011\n\
Elista, RS:CITY:RS000012\n\
Gor'kiy, RS:CITY:RS000013\n\
Gorno-Altaysk, RS:CITY:RS000014\n\
Groznyy, RS:CITY:RS000015\n\
Irkutsk, RS:CITY:RS000016\n\
Ivanovo, RS:CITY:RS000017\n\
Izevsk, RS:CITY:RS000018\n\
Kaliningrad, RS:CITY:RS000019\n\
Kaluga, RS:CITY:RS000020\n\
Kazan', RS:CITY:RS000021\n\
Kemerovo, RS:CITY:RS000022\n\
Khabarovsk, RS:CITY:RS000023\n\
Khanty-Mansiysk, RS:CITY:RS000024\n\
Klintsy, RS:CITY:RS000025\n\
Kostroma, RS:CITY:RS000026\n\
Kotlas, RS:CITY:RS000027\n\
Krasnodar, RS:CITY:RS000028\n\
Krasnoyarsk, RS:CITY:RS000029\n\
Kurgan, RS:CITY:RS000030\n\
Kursk, RS:CITY:RS000031\n\
Kuybyskev, RS:CITY:RS000032\n\
Kyzyl, RS:CITY:RS000033\n\
Lipetsk, RS:CITY:RS000034\n\
Machackala, RS:CITY:RS000035\n\
Magadan, RS:CITY:RS000036\n\
Majkop, RS:CITY:RS000037\n\
Moscow, RS:CITY:RS000038\n\
Murmansk, RS:CITY:RS000039\n\
Nazran, RS:CITY:RS000041\n\
Novgorod, RS:CITY:RS000043\n\
Novokuznetsk, RS:CITY:RS000044\n\
Novosibirsk, RS:CITY:RS000045\n\
Omsk, RS:CITY:RS000046\n\
Orel, RS:CITY:RS000047\n\
Orenburg, RS:CITY:RS000048\n\
Penza, RS:CITY:RS000049\n\
Perm', RS:CITY:RS000050\n\
Petropavloski-Kamchatskiy, RS:CITY:RS000051\n\
Petrozavodsk, RS:CITY:RS000052\n\
Pskov, RS:CITY:RS000053\n\
Rostov-on-Don, RS:CITY:RS000054\n\
Ryazan, RS:CITY:RS000055\n\
Saint Petersburg, RS:CITY:RS000056\n\
Saransk, RS:CITY:RS000057\n\
Saratov, RS:CITY:RS000058\n\
Smolensk, RS:CITY:RS000059\n\
Stavropol, RS:CITY:RS000060\n\
Sverdlovsk, RS:CITY:RS000061\n\
Syktyvkar, RS:CITY:RS000062\n\
Tambov, RS:CITY:RS000063\n\
Tomsk, RS:CITY:RS000064\n\
Tula, RS:CITY:RS000065\n\
Tver, RS:CITY:RS000066\n\
Tyumen, RS:CITY:RS000067\n\
Ufa, RS:CITY:RS000068\n\
Ul'yanovsk, RS:CITY:RS000069\n\
Ulan Ude, RS:CITY:RS000070\n\
Vladikavkaz, RS:CITY:RS000071\n\
Vladimir, RS:CITY:RS000072\n\
Vladivostok, RS:CITY:RS000073\n\
Volgograd, RS:CITY:RS000074\n\
Vologda, RS:CITY:RS000075\n\
Vorkuta, RS:CITY:RS000076\n\
Voronezh, RS:CITY:RS000077\n\
Vyatka, RS:CITY:RS000078\n\
Yakutsk, RS:CITY:RS000079\n\
Yaroslavl, RS:CITY:RS000080\n\
Yuzhno-Sakhalinsk, RS:CITY:RS000081\n\
Kigali, RW:CITY:RW000006\n\
Abha, SA:CITY:SA000001\n\
Jeddah, SA:CITY:SA000003\n\
Mecca, SA:CITY:SA000004\n\
Medina, SA:CITY:SA000005\n\
Riyadh, SA:CITY:SA000007\n\
Sakakah, SA:CITY:SA000008\n\
Tabuk, SA:CITY:SA000009\n\
Bisho, SF:CITY:SF000001\n\
Bloemfontein, SF:CITY:SF000002\n\
Cape Town, SF:CITY:SF000003\n\
Durban, SF:CITY:SF000004\n\
Johannesburg, SF:CITY:SF000005\n\
Kimberley, SF:CITY:SF000006\n\
MMabatho (Mafikeng), SF:CITY:SF000007\n\
Nelspruit, SF:CITY:SF000008\n\
Pietermaritzburg (Ulundi), SF:CITY:SF000009\n\
Pietersburg (Polokwane), SF:CITY:SF000010\n\
Port Elizabeth, SF:CITY:SF000011\n\
Pretoria, SF:CITY:SF000012\n\
Richards Bay, SF:CITY:SF000013\n\
Dakar, SG:CITY:SG000001\n\
Kolda, SG:CITY:SG000002\n\
Thies, SG:CITY:SG000003\n\
Ziguinchor, SG:CITY:SG000004\n\
Ljubljana, SI:CITY:SI000001\n\
Freetown, SL:CITY:SL000002\n\
Singapore, SN:CITY:SN000001\n\
Barcelona, SP:CITY:SP000001\n\
Bilbao, SP:CITY:SP000002\n\
Ceuta, SP:CITY:SP000003\n\
Logrono, SP:CITY:SP000005\n\
Madrid, SP:CITY:SP000006\n\
Melilla, SP:CITY:SP000007\n\
Murcia, SP:CITY:SP000009\n\
Oviedo, SP:CITY:SP000010\n\
Palma De Mallorca, SP:CITY:SP000011\n\
Pamplona, SP:CITY:SP000012\n\
Santa Cruz de Tenerife, SP:CITY:SP000013\n\
Santander, SP:CITY:SP000014\n\
Santiago De Compostela, SP:CITY:SP000015\n\
Seville, SP:CITY:SP000016\n\
Toledo, SP:CITY:SP000017\n\
Valencia, SP:CITY:SP000018\n\
Valladolid, SP:CITY:SP000019\n\
Vitoria, SP:CITY:SP000020\n\
Zaragoza, SP:CITY:SP000021\n\
El Fasher, SU:CITY:SU000001\n\
El Obeid, SU:CITY:SU000002\n\
Khartoum, SU:CITY:SU000003\n\
Malakal, SU:CITY:SU000004\n\
Omdurman, SU:CITY:SU000005\n\
Port Sudan, SU:CITY:SU000006\n\
Wau, SU:CITY:SU000007\n\
Gavle, SW:CITY:SW000001\n\
Goteborg, SW:CITY:SW000002\n\
Halmstad, SW:CITY:SW000003\n\
Jonkoping, SW:CITY:SW000004\n\
Karlstad, SW:CITY:SW000005\n\
Linkoping, SW:CITY:SW000006\n\
Malmo, SW:CITY:SW000007\n\
Orebro, SW:CITY:SW000008\n\
Stockholm, SW:CITY:SW000009\n\
Umea, SW:CITY:SW000010\n\
Uppsala, SW:CITY:SW000011\n\
Vasteras, SW:CITY:SW000012\n\
Vaxjo, SW:CITY:SW000013\n\
Aleppo, SY:CITY:SY000001\n\
Damascus, SY:CITY:SY000004\n\
Dayr az Zawr, SY:CITY:SY000005\n\
Hamah, SY:CITY:SY000006\n\
Homs, SY:CITY:SY000007\n\
Tartus, SY:CITY:SY000009\n\
Basel, SZ:CITY:SZ000001\n\
Geneva, SZ:CITY:SZ000003\n\
Saint Gallen, SZ:CITY:SZ000006\n\
Zurich, SZ:CITY:SZ000007\n\
Bangkok, TH:CITY:TH000001\n\
Chang Rai, TH:CITY:TH000003\n\
Chanthaburi, TH:CITY:TH000004\n\
Chiang Mai, TH:CITY:TH000005\n\
Chon Buri, TH:CITY:TH000006\n\
Chumphon, TH:CITY:TH000007\n\
Kanchanaburi, TH:CITY:TH000010\n\
Khon Kaen, TH:CITY:TH000011\n\
Lampang, TH:CITY:TH000012\n\
Nakhon Ratchasima, TH:CITY:TH000015\n\
Nakhon Si Thammarat, TH:CITY:TH000016\n\
Nong Khai, TH:CITY:TH000017\n\
Phetchabun, TH:CITY:TH000018\n\
Phitsanulok, TH:CITY:TH000019\n\
Phuket, TH:CITY:TH000021\n\
Sakon Nakhon, TH:CITY:TH000023\n\
Samut Prakan, TH:CITY:TH000024\n\
Supham Buri, TH:CITY:TH000026\n\
Surat Thani, TH:CITY:TH000027\n\
Trang, TH:CITY:TH000028\n\
Ubon Ratchathani, TH:CITY:TH000029\n\
Udon Thani, TH:CITY:TH000030\n\
Uttaradit, TH:CITY:TH000031\n\
Dushanbe, TI:CITY:TI000001\n\
Kulob, TI:CITY:TI000002\n\
Leninobod, TI:CITY:TI000003\n\
Qurghonteppa, TI:CITY:TI000004\n\
Lome, TO:CITY:TO000003\n\
Bizerte, TS:CITY:TS000002\n\
Gabes, TS:CITY:TS000003\n\
Gafsa, TS:CITY:TS000004\n\
Jendouba, TS:CITY:TS000005\n\
Kairouan, TS:CITY:TS000006\n\
Sfax, TS:CITY:TS000009\n\
Tunis, TS:CITY:TS000012\n\
Adiyaman, TU:CITY:TU000001\n\
Agri, TU:CITY:TU000002\n\
Aintab, TU:CITY:TU000003\n\
Ankara, TU:CITY:TU000005\n\
Antalya, TU:CITY:TU000006\n\
Aydin, TU:CITY:TU000008\n\
Balikesir, TU:CITY:TU000009\n\
Bingol, TU:CITY:TU000010\n\
Bolu, TU:CITY:TU000011\n\
Burdur, TU:CITY:TU000012\n\
Bursa, TU:CITY:TU000013\n\
Canakkale, TU:CITY:TU000014\n\
Cankiri, TU:CITY:TU000015\n\
Corum, TU:CITY:TU000016\n\
Denizli, TU:CITY:TU000017\n\
Diyarbakir, TU:CITY:TU000018\n\
Edirne, TU:CITY:TU000019\n\
Elazig, TU:CITY:TU000020\n\
Erzincan, TU:CITY:TU000021\n\
Erzurum, TU:CITY:TU000022\n\
Giresun, TU:CITY:TU000024\n\
Hakkari, TU:CITY:TU000025\n\
Isparta, TU:CITY:TU000026\n\
Istanbul, TU:CITY:TU000027\n\
Izmir, TU:CITY:TU000028\n\
Kahramanmaras, TU:CITY:TU000029\n\
Kars, TU:CITY:TU000030\n\
Kastamonu, TU:CITY:TU000031\n\
Kirsehir, TU:CITY:TU000034\n\
Konya, TU:CITY:TU000036\n\
Kutahya, TU:CITY:TU000037\n\
Malatya, TU:CITY:TU000038\n\
Mersin, TU:CITY:TU000041\n\
Mus, TU:CITY:TU000042\n\
Nevsehir, TU:CITY:TU000043\n\
Nigde, TU:CITY:TU000044\n\
Rize, TU:CITY:TU000046\n\
Sakarya, TU:CITY:TU000047\n\
Samsun, TU:CITY:TU000048\n\
Siirt, TU:CITY:TU000049\n\
Sivas, TU:CITY:TU000050\n\
Tekirdag, TU:CITY:TU000051\n\
Tokat, TU:CITY:TU000052\n\
Usak, TU:CITY:TU000054\n\
Van, TU:CITY:TU000055\n\
Yozgat, TU:CITY:TU000056\n\
Zonguldak, TU:CITY:TU000057\n\
Ashgabat, TX:CITY:TX000001\n\
Mary, TX:CITY:TX000002\n\
Turkmenbashi, TX:CITY:TX000003\n\
Arusha, TZ:CITY:TZ000001\n\
Bukoba, TZ:CITY:TZ000002\n\
Dar es Salaam, TZ:CITY:TZ000003\n\
Dodoma, TZ:CITY:TZ000004\n\
Iringa, TZ:CITY:TZ000005\n\
Moshi, TZ:CITY:TZ000009\n\
Mtwara, TZ:CITY:TZ000010\n\
Musoma, TZ:CITY:TZ000011\n\
Mwanza, TZ:CITY:TZ000012\n\
Songea, TZ:CITY:TZ000015\n\
Tabora, TZ:CITY:TZ000017\n\
Zanzibar, TZ:CITY:TZ000019\n\
Arua, UG:CITY:UG000001\n\
Gulu, UG:CITY:UG000002\n\
Jinja, UG:CITY:UG000003\n\
Belfast, UK:CITY:UK000001\n\
Birmingham, UK:CITY:UK000002\n\
Dundee, UK:CITY:UK000004\n\
Liverpool, UK:CITY:UK000008\n\
London, UK:CITY:UK000009\n\
Manchester, UK:CITY:UK000010\n\
Cherkasy, UP:CITY:UP000001\n\
Chernihiv, UP:CITY:UP000002\n\
Chernivtsi, UP:CITY:UP000003\n\
Dnipropetrovs'k, UP:CITY:UP000004\n\
Donets'k, UP:CITY:UP000005\n\
Ivano-frankivs'k, UP:CITY:UP000006\n\
Kharkiv, UP:CITY:UP000007\n\
Kherson, UP:CITY:UP000008\n\
Khmel'nyts'kyz, UP:CITY:UP000009\n\
Kirovohrad, UP:CITY:UP000010\n\
Kovel', UP:CITY:UP000011\n\
Kyiv, UP:CITY:UP000012\n\
L'viv, UP:CITY:UP000013\n\
Luhans'k, UP:CITY:UP000014\n\
Mykolayiv, UP:CITY:UP000015\n\
Odesa, UP:CITY:UP000016\n\
Poltava, UP:CITY:UP000017\n\
Rivne, UP:CITY:UP000018\n\
Simferopol', UP:CITY:UP000019\n\
Sumy, UP:CITY:UP000020\n\
Ternopil', UP:CITY:UP000021\n\
Uzhhorod, UP:CITY:UP000022\n\
Vinnytsya, UP:CITY:UP000023\n\
Zaporiyhzhya, UP:CITY:UP000024\n\
Zhytomyra, UP:CITY:UP000025\n\
Washington D.C., US:CITY:US000001\n\
Alexander City, AL US:CITY:US010001\n\
Anniston, AL US:CITY:US010002\n\
Auburn, AL US:CITY:US010003\n\
Birmingham, AL US:CITY:US010004\n\
Cullman, AL US:CITY:US010005\n\
Dothan, AL US:CITY:US010006\n\
Enterprise, AL US:CITY:US010007\n\
Eufaula, AL US:CITY:US010008\n\
Florence, AL US:CITY:US010009\n\
Fort Payne, AL US:CITY:US010010\n\
Gadsden, AL US:CITY:US010011\n\
Huntsville, AL US:CITY:US010012\n\
Jasper, AL US:CITY:US010013\n\
Mobile, AL US:CITY:US010014\n\
Montgomery, AL US:CITY:US010015\n\
Selma, AL US:CITY:US010016\n\
Talladega, AL US:CITY:US010017\n\
Troy, AL US:CITY:US010018\n\
Tuscaloosa, AL US:CITY:US010019\n\
Anchorage, AK US:CITY:US020001\n\
Fairbanks, AK US:CITY:US020002\n\
Juneau, AK US:CITY:US020003\n\
Nome, AK US:CITY:US020004\n\
Seward, AK US:CITY:US020005\n\
Bullhead City, AZ US:CITY:US040001\n\
Casa Grande, AZ US:CITY:US040002\n\
Douglas, AZ US:CITY:US040003\n\
Flagstaff, AZ US:CITY:US040004\n\
Green Valley, AZ US:CITY:US040005\n\
Kingman, AZ US:CITY:US040006\n\
Lake Havasu City, AZ US:CITY:US040007\n\
Mesa, AZ US:CITY:US040008\n\
Nogales, AZ US:CITY:US040009\n\
Payson, AZ US:CITY:US040010\n\
Phoenix, AZ US:CITY:US040011\n\
Prescott, AZ US:CITY:US040012\n\
Sierra Vista, AZ US:CITY:US040013\n\
Tucson, AZ US:CITY:US040014\n\
Yuma, AZ US:CITY:US040015\n\
Arkadelphia, AR US:CITY:US050001\n\
Blytheville, AR US:CITY:US050002\n\
Camden, AR US:CITY:US050003\n\
Conway, AR US:CITY:US050004\n\
El Dorado, AR US:CITY:US050005\n\
Fayetteville, AR US:CITY:US050006\n\
Forrest City, AR US:CITY:US050007\n\
Fort Smith, AR US:CITY:US050008\n\
Harrison, AR US:CITY:US050009\n\
Hope, AR US:CITY:US050010\n\
Hot Springs, AR US:CITY:US050011\n\
Jonesboro, AR US:CITY:US050012\n\
Little Rock, AR US:CITY:US050013\n\
Magnolia, AR US:CITY:US050014\n\
Mountain Home, AR US:CITY:US050015\n\
Paragould, AR US:CITY:US050016\n\
Pine Bluff, AR US:CITY:US050017\n\
Russellville, AR US:CITY:US050018\n\
Searcy, AR US:CITY:US050019\n\
Siloam Springs, AR US:CITY:US050020\n\
Anaheim, CA US:CITY:US060001\n\
Bakersfield, CA US:CITY:US060002\n\
Barstow, CA US:CITY:US060003\n\
Blythe, CA US:CITY:US060004\n\
Chico, CA US:CITY:US060005\n\
Clearlake, CA US:CITY:US060006\n\
Coalinga, CA US:CITY:US060007\n\
El Centro, CA US:CITY:US060008\n\
Eureka, CA US:CITY:US060009\n\
Fresno, CA US:CITY:US060010\n\
Grass Valley, CA US:CITY:US060011\n\
Long Beach, CA US:CITY:US060012\n\
Los Angeles, CA US:CITY:US060013\n\
Merced, CA US:CITY:US060014\n\
Modesto, CA US:CITY:US060015\n\
Monterey, CA US:CITY:US060016\n\
Napa, CA US:CITY:US060017\n\
Oakland, CA US:CITY:US060018\n\
Oceanside, CA US:CITY:US060019\n\
Oxnard, CA US:CITY:US060020\n\
Palm Springs, CA US:CITY:US060021\n\
Red Bluff, CA US:CITY:US060022\n\
Redding, CA US:CITY:US060023\n\
Ridgecrest, CA US:CITY:US060024\n\
Riverside, CA US:CITY:US060025\n\
Rosamond, CA US:CITY:US060026\n\
Sacramento, CA US:CITY:US060027\n\
Salinas, CA US:CITY:US060028\n\
San Bernardino, CA US:CITY:US060029\n\
San Diego, CA US:CITY:US060030\n\
San Francisco, CA US:CITY:US060031\n\
San Jose, CA US:CITY:US060032\n\
San Luis Obispo, CA US:CITY:US060033\n\
Santa Ana, CA US:CITY:US060034\n\
Santa Barbara, CA US:CITY:US060035\n\
Santa Clarita, CA US:CITY:US060036\n\
Santa Cruz, CA US:CITY:US060037\n\
Santa Maria, CA US:CITY:US060038\n\
Santa Rosa, CA US:CITY:US060039\n\
Simi Valley, CA US:CITY:US060040\n\
Soledad, CA US:CITY:US060041\n\
Stockton, CA US:CITY:US060042\n\
Susanville, CA US:CITY:US060043\n\
Ukiah, CA US:CITY:US060044\n\
Vallejo, CA US:CITY:US060045\n\
Visalia, CA US:CITY:US060046\n\
Yuba City, CA US:CITY:US060047\n\
Yucca Valley, CA US:CITY:US060048\n\
Boulder, CO US:CITY:US080001\n\
Canon City, CO US:CITY:US080002\n\
Colorado Springs, CO US:CITY:US080003\n\
Denver, CO US:CITY:US080004\n\
Durango, CO US:CITY:US080005\n\
Fort Collins, CO US:CITY:US080006\n\
Fort Morgan, CO US:CITY:US080007\n\
Grand Junction, CO US:CITY:US080008\n\
Montrose, CO US:CITY:US080009\n\
Pueblo, CO US:CITY:US080010\n\
Sterling, CO US:CITY:US080011\n\
Bridgeport, CT US:CITY:US090001\n\
Danbury, CT US:CITY:US090002\n\
Hartford, CT US:CITY:US090003\n\
New Haven, CT US:CITY:US090004\n\
New London, CT US:CITY:US090005\n\
Norwalk, CT US:CITY:US090006\n\
Norwich, CT US:CITY:US090007\n\
Stamford, CT US:CITY:US090008\n\
Torrington, CT US:CITY:US090009\n\
Waterbury, CT US:CITY:US090010\n\
Willimantic, CT US:CITY:US090011\n\
Dover, DE US:CITY:US100001\n\
Newark, DE US:CITY:US100002\n\
Belle Glade, FL US:CITY:US120001\n\
Boca Raton, FL US:CITY:US120002\n\
Boynton Beach, FL US:CITY:US120003\n\
Bradenton, FL US:CITY:US120004\n\
Cape Coral, FL US:CITY:US120005\n\
Cocoa, FL US:CITY:US120006\n\
Coral Springs, FL US:CITY:US120007\n\
Crestview, FL US:CITY:US120008\n\
Daytona Beach, FL US:CITY:US120009\n\
Deltona, FL US:CITY:US120010\n\
Destin, FL US:CITY:US120011\n\
Fort Lauderdale, FL US:CITY:US120012\n\
Fort Myers, FL US:CITY:US120013\n\
Fort Walton Beach, FL US:CITY:US120014\n\
Gainesville, FL US:CITY:US120015\n\
Homosassa Springs, FL US:CITY:US120016\n\
Immokalee, FL US:CITY:US120017\n\
Jacksonville, FL US:CITY:US120018\n\
Jupiter, FL US:CITY:US120019\n\
Key Largo, FL US:CITY:US120020\n\
Key West, FL US:CITY:US120021\n\
Kissimmee, FL US:CITY:US120022\n\
Marathon, FL US:CITY:US120023\n\
Melbourne, FL US:CITY:US120024\n\
Miami, FL US:CITY:US120025\n\
Naples, FL US:CITY:US120026\n\
Ocala, FL US:CITY:US120027\n\
Orlando, FL US:CITY:US120028\n\
Palatka, FL US:CITY:US120029\n\
Palm Coast, FL US:CITY:US120030\n\
Panama City, FL US:CITY:US120031\n\
Pensacola, FL US:CITY:US120032\n\
Pompano Beach, FL US:CITY:US120033\n\
Port Charlotte, FL US:CITY:US120034\n\
Port St. Lucie, FL US:CITY:US120035\n\
Sarasota, FL US:CITY:US120036\n\
Spring Hill, FL US:CITY:US120037\n\
St. Augustine, FL US:CITY:US120038\n\
St. Petersburg, FL US:CITY:US120039\n\
Tallahassee, FL US:CITY:US120040\n\
Tampa, FL US:CITY:US120041\n\
Titusville, FL US:CITY:US120042\n\
West Palm Beach, FL US:CITY:US120043\n\
Albany, GA US:CITY:US130001\n\
Americus, GA US:CITY:US130002\n\
Athens, GA US:CITY:US130003\n\
Atlanta, GA US:CITY:US130004\n\
Augusta, GA US:CITY:US130005\n\
Bainbridge, GA US:CITY:US130006\n\
Brunswick, GA US:CITY:US130007\n\
Carrollton, GA US:CITY:US130008\n\
Columbus, GA US:CITY:US130009\n\
Dalton, GA US:CITY:US130010\n\
Douglas, GA US:CITY:US130011\n\
Dublin, GA US:CITY:US130012\n\
Fort Benning South, GA US:CITY:US130013\n\
Gainesville, GA US:CITY:US130014\n\
Griffin, GA US:CITY:US130015\n\
Hinesville, GA US:CITY:US130016\n\
LaGrange, GA US:CITY:US130017\n\
Macon, GA US:CITY:US130018\n\
Milledgeville, GA US:CITY:US130019\n\
Peachtree City, GA US:CITY:US130020\n\
Rome, GA US:CITY:US130021\n\
Savannah, GA US:CITY:US130022\n\
St. Marys, GA US:CITY:US130023\n\
Statesboro, GA US:CITY:US130024\n\
Thomasville, GA US:CITY:US130025\n\
Tifton, GA US:CITY:US130026\n\
Valdosta, GA US:CITY:US130027\n\
Vidalia, GA US:CITY:US130028\n\
Waycross, GA US:CITY:US130029\n\
Hilo, HI US:CITY:US150001\n\
Honolulu, HI US:CITY:US150002\n\
Kahului, HI US:CITY:US150003\n\
Boise, ID US:CITY:US160001\n\
Coeur d'Alene, ID US:CITY:US160002\n\
Idaho Falls, ID US:CITY:US160003\n\
Lewiston, ID US:CITY:US160004\n\
Moscow, ID US:CITY:US160005\n\
Mountain Home, ID US:CITY:US160006\n\
Nampa, ID US:CITY:US160007\n\
Pocatello, ID US:CITY:US160008\n\
Twin Falls, ID US:CITY:US160009\n\
Aurora, IL US:CITY:US170001\n\
Bloomington, IL US:CITY:US170002\n\
Carbondale, IL US:CITY:US170003\n\
Champaign, IL US:CITY:US170004\n\
Charleston, IL US:CITY:US170005\n\
Chicago, IL US:CITY:US170006\n\
Crystal Lake, IL US:CITY:US170007\n\
Danville, IL US:CITY:US170008\n\
DeKalb, IL US:CITY:US170009\n\
Decatur, IL US:CITY:US170010\n\
Dixon, IL US:CITY:US170011\n\
Effingham, IL US:CITY:US170012\n\
Elgin, IL US:CITY:US170013\n\
Freeport, IL US:CITY:US170014\n\
Galesburg, IL US:CITY:US170015\n\
Joliet, IL US:CITY:US170016\n\
Kankakee, IL US:CITY:US170017\n\
Kewanee, IL US:CITY:US170018\n\
Lincoln, IL US:CITY:US170019\n\
Macomb, IL US:CITY:US170020\n\
Mount Vernon, IL US:CITY:US170021\n\
Naperville, IL US:CITY:US170022\n\
Ottawa, IL US:CITY:US170023\n\
Peoria, IL US:CITY:US170024\n\
Pontiac, IL US:CITY:US170025\n\
Quincy, IL US:CITY:US170026\n\
Rockford, IL US:CITY:US170027\n\
Springfield, IL US:CITY:US170028\n\
Streator, IL US:CITY:US170029\n\
Waukegan, IL US:CITY:US170030\n\
Bloomington, IN US:CITY:US180001\n\
Evansville, IN US:CITY:US180002\n\
Fort Wayne, IN US:CITY:US180003\n\
Indianapolis, IN US:CITY:US180004\n\
Kokomo, IN US:CITY:US180005\n\
Lafayette, IN US:CITY:US180006\n\
Madison, IN US:CITY:US180007\n\
Michigan City, IN US:CITY:US180008\n\
Muncie, IN US:CITY:US180009\n\
Richmond, IN US:CITY:US180010\n\
Shelbyville, IN US:CITY:US180011\n\
South Bend, IN US:CITY:US180012\n\
Terre Haute, IN US:CITY:US180013\n\
Vincennes, IN US:CITY:US180014\n\
Ames, IA US:CITY:US190001\n\
Burlington, IA US:CITY:US190002\n\
Carroll, IA US:CITY:US190003\n\
Cedar Falls, IA US:CITY:US190004\n\
Cedar Rapids, IA US:CITY:US190005\n\
Clinton, IA US:CITY:US190006\n\
Davenport, IA US:CITY:US190007\n\
Des Moines, IA US:CITY:US190008\n\
Dubuque, IA US:CITY:US190009\n\
Fort Dodge, IA US:CITY:US190010\n\
Iowa City, IA US:CITY:US190011\n\
Keokuk, IA US:CITY:US190012\n\
Marshalltown, IA US:CITY:US190013\n\
Mason City, IA US:CITY:US190014\n\
Oskaloosa, IA US:CITY:US190015\n\
Ottumwa, IA US:CITY:US190016\n\
Sioux City, IA US:CITY:US190017\n\
Spencer, IA US:CITY:US190018\n\
Storm Lake, IA US:CITY:US190019\n\
Waterloo, IA US:CITY:US190020\n\
Coffeyville, KS US:CITY:US200001\n\
Dodge City, KS US:CITY:US200002\n\
Emporia, KS US:CITY:US200003\n\
Garden City, KS US:CITY:US200004\n\
Great Bend, KS US:CITY:US200005\n\
Hays, KS US:CITY:US200006\n\
Hutchinson, KS US:CITY:US200007\n\
Lawrence, KS US:CITY:US200008\n\
Leavenworth, KS US:CITY:US200009\n\
Liberal, KS US:CITY:US200010\n\
Manhattan, KS US:CITY:US200011\n\
Pittsburg, KS US:CITY:US200012\n\
Salina, KS US:CITY:US200013\n\
Topeka, KS US:CITY:US200014\n\
Wichita, KS US:CITY:US200015\n\
Winfield, KS US:CITY:US200016\n\
Bowling Green, KY US:CITY:US210001\n\
Campbellsville, KY US:CITY:US210002\n\
Danville, KY US:CITY:US210003\n\
Elizabethtown, KY US:CITY:US210004\n\
Fort Knox, KY US:CITY:US210005\n\
Frankfort, KY US:CITY:US210006\n\
Hopkinsville, KY US:CITY:US210007\n\
Lexington, KY US:CITY:US210008\n\
Louisville, KY US:CITY:US210009\n\
Madisonville, KY US:CITY:US210010\n\
Middlesborough, KY US:CITY:US210011\n\
Murray, KY US:CITY:US210012\n\
Owensboro, KY US:CITY:US210013\n\
Paducah, KY US:CITY:US210014\n\
Somerset, KY US:CITY:US210015\n\
Alexandria, LA US:CITY:US220001\n\
Bastrop, LA US:CITY:US220002\n\
Baton Rouge, LA US:CITY:US220003\n\
Bogalusa, LA US:CITY:US220004\n\
Fort Polk South, LA US:CITY:US220005\n\
Hammond, LA US:CITY:US220006\n\
Houma, LA US:CITY:US220007\n\
Jennings, LA US:CITY:US220008\n\
Lafayette, LA US:CITY:US220009\n\
Lake Charles, LA US:CITY:US220010\n\
Minden, LA US:CITY:US220011\n\
Monroe, LA US:CITY:US220012\n\
Morgan City, LA US:CITY:US220013\n\
Natchitoches, LA US:CITY:US220014\n\
New Iberia, LA US:CITY:US220015\n\
New Orleans, LA US:CITY:US220016\n\
Opelousas, LA US:CITY:US220017\n\
Ruston, LA US:CITY:US220018\n\
Shreveport, LA US:CITY:US220019\n\
Thibodaux, LA US:CITY:US220020\n\
Augusta, ME US:CITY:US230001\n\
Bangor, ME US:CITY:US230002\n\
Lewiston, ME US:CITY:US230003\n\
Portland, ME US:CITY:US230004\n\
Waterville, ME US:CITY:US230005\n\
Annapolis, MD US:CITY:US240001\n\
Baltimore, MD US:CITY:US240002\n\
Cambridge, MD US:CITY:US240003\n\
Cumberland, MD US:CITY:US240004\n\
Easton, MD US:CITY:US240005\n\
Frederick, MD US:CITY:US240006\n\
Hagerstown, MD US:CITY:US240007\n\
Ocean Pines, MD US:CITY:US240008\n\
Salisbury, MD US:CITY:US240009\n\
Westminster, MD US:CITY:US240010\n\
Barnstable Town, MA US:CITY:US250001\n\
Boston, MA US:CITY:US250002\n\
Brockton, MA US:CITY:US250003\n\
Fall River, MA US:CITY:US250004\n\
Gloucester, MA US:CITY:US250005\n\
Greenfield, MA US:CITY:US250006\n\
Leominster, MA US:CITY:US250007\n\
Lowell, MA US:CITY:US250008\n\
New Bedford, MA US:CITY:US250009\n\
North Adams, MA US:CITY:US250010\n\
Northampton, MA US:CITY:US250011\n\
Pittsfield, MA US:CITY:US250012\n\
Springfield, MA US:CITY:US250013\n\
Worcester, MA US:CITY:US250014\n\
Alpena, MI US:CITY:US260001\n\
Ann Arbor, MI US:CITY:US260002\n\
Benton Harbor, MI US:CITY:US260003\n\
Big Rapids, MI US:CITY:US260004\n\
Cadillac, MI US:CITY:US260005\n\
Detroit, MI US:CITY:US260006\n\
Escanaba, MI US:CITY:US260007\n\
Flint, MI US:CITY:US260008\n\
Grand Rapids, MI US:CITY:US260009\n\
Holland, MI US:CITY:US260010\n\
Jackson, MI US:CITY:US260011\n\
Kalamazoo, MI US:CITY:US260012\n\
Lansing, MI US:CITY:US260013\n\
Marquette, MI US:CITY:US260014\n\
Midland, MI US:CITY:US260015\n\
Mount Pleasant, MI US:CITY:US260016\n\
Muskegon, MI US:CITY:US260017\n\
Owosso, MI US:CITY:US260018\n\
Pontiac, MI US:CITY:US260019\n\
Port Huron, MI US:CITY:US260020\n\
Saginaw, MI US:CITY:US260021\n\
Sault Ste. Marie, MI US:CITY:US260022\n\
Sturgis, MI US:CITY:US260023\n\
Traverse City, MI US:CITY:US260024\n\
Austin, MN US:CITY:US270001\n\
Bemidji, MN US:CITY:US270002\n\
Brainerd, MN US:CITY:US270003\n\
Buffalo, MN US:CITY:US270004\n\
Duluth, MN US:CITY:US270005\n\
Fairmont, MN US:CITY:US270006\n\
Faribault, MN US:CITY:US270007\n\
Fergus Falls, MN US:CITY:US270008\n\
Hibbing, MN US:CITY:US270009\n\
Hutchinson, MN US:CITY:US270010\n\
Mankato, MN US:CITY:US270011\n\
Marshall, MN US:CITY:US270012\n\
Minneapolis, MN US:CITY:US270013\n\
New Ulm, MN US:CITY:US270014\n\
Owatonna, MN US:CITY:US270015\n\
Rochester, MN US:CITY:US270016\n\
Saint Paul, MN US:CITY:US270017\n\
St. Cloud, MN US:CITY:US270018\n\
Willmar, MN US:CITY:US270019\n\
Worthington, MN US:CITY:US270020\n\
Biloxi, MS US:CITY:US280001\n\
Clarksdale, MS US:CITY:US280002\n\
Cleveland, MS US:CITY:US280003\n\
Columbus, MS US:CITY:US280004\n\
Corinth, MS US:CITY:US280005\n\
Greenville, MS US:CITY:US280006\n\
Greenwood, MS US:CITY:US280007\n\
Grenada, MS US:CITY:US280008\n\
Gulfport, MS US:CITY:US280009\n\
Hattiesburg, MS US:CITY:US280010\n\
Jackson, MS US:CITY:US280011\n\
Laurel, MS US:CITY:US280012\n\
McComb, MS US:CITY:US280013\n\
Meridian, MS US:CITY:US280014\n\
Natchez, MS US:CITY:US280015\n\
Oxford, MS US:CITY:US280016\n\
Picayune, MS US:CITY:US280017\n\
Tupelo, MS US:CITY:US280018\n\
Vicksburg, MS US:CITY:US280019\n\
Yazoo City, MS US:CITY:US280020\n\
Cape Girardeau, MO US:CITY:US290001\n\
Columbia, MO US:CITY:US290002\n\
Excelsior Springs, MO US:CITY:US290003\n\
Farmington, MO US:CITY:US290004\n\
Fort Leonard Wood, MO US:CITY:US290005\n\
Jefferson City, MO US:CITY:US290006\n\
Joplin, MO US:CITY:US290007\n\
Kansas City, MO US:CITY:US290008\n\
Kennett, MO US:CITY:US290009\n\
Kirksville, MO US:CITY:US290010\n\
Lebanon, MO US:CITY:US290011\n\
Marshall, MO US:CITY:US290012\n\
Maryville, MO US:CITY:US290013\n\
Moberly, MO US:CITY:US290014\n\
Poplar Bluff, MO US:CITY:US290015\n\
Rolla, MO US:CITY:US290016\n\
Sedalia, MO US:CITY:US290017\n\
Sikeston, MO US:CITY:US290018\n\
Springfield, MO US:CITY:US290019\n\
St. Joseph, MO US:CITY:US290020\n\
St. Louis, MO US:CITY:US290021\n\
Warrensburg, MO US:CITY:US290022\n\
Washington, MO US:CITY:US290023\n\
West Plains, MO US:CITY:US290024\n\
Billings, MT US:CITY:US300001\n\
Bozeman, MT US:CITY:US300002\n\
Butte, MT US:CITY:US300003\n\
Great Falls, MT US:CITY:US300004\n\
Helena, MT US:CITY:US300005\n\
Kalispell, MT US:CITY:US300006\n\
Missoula, MT US:CITY:US300007\n\
Beatrice, NE US:CITY:US310001\n\
Columbus, NE US:CITY:US310002\n\
Fremont, NE US:CITY:US310003\n\
Grand Island, NE US:CITY:US310004\n\
Hastings, NE US:CITY:US310005\n\
Kearney, NE US:CITY:US310006\n\
Lexington, NE US:CITY:US310007\n\
Lincoln, NE US:CITY:US310008\n\
Norfolk, NE US:CITY:US310009\n\
North Platte, NE US:CITY:US310010\n\
Omaha, NE US:CITY:US310011\n\
Scottsbluff, NE US:CITY:US310012\n\
Boulder City, NV US:CITY:US320001\n\
Carson City, NV US:CITY:US320002\n\
Elko, NV US:CITY:US320003\n\
Las Vegas, NV US:CITY:US320004\n\
Pahrump, NV US:CITY:US320005\n\
Reno, NV US:CITY:US320006\n\
Berlin, NH US:CITY:US330001\n\
Claremont, NH US:CITY:US330002\n\
Concord, NH US:CITY:US330003\n\
Keene, NH US:CITY:US330004\n\
Laconia, NH US:CITY:US330005\n\
Manchester, NH US:CITY:US330006\n\
Nashua, NH US:CITY:US330007\n\
Portsmouth, NH US:CITY:US330008\n\
Rochester, NH US:CITY:US330009\n\
Jersey City, NJ US:CITY:US340001\n\
Lakewood, NJ US:CITY:US340002\n\
Newark, NJ US:CITY:US340003\n\
Pleasantville, NJ US:CITY:US340004\n\
Toms River, NJ US:CITY:US340005\n\
Trenton, NJ US:CITY:US340006\n\
Vineland, NJ US:CITY:US340007\n\
Alamogordo, NM US:CITY:US350001\n\
Albuquerque, NM US:CITY:US350002\n\
Carlsbad, NM US:CITY:US350003\n\
Clovis, NM US:CITY:US350004\n\
Deming, NM US:CITY:US350005\n\
Farmington, NM US:CITY:US350006\n\
Gallup, NM US:CITY:US350007\n\
Las Cruces, NM US:CITY:US350008\n\
Roswell, NM US:CITY:US350009\n\
Santa Fe, NM US:CITY:US350010\n\
Silver City, NM US:CITY:US350011\n\
Albany, NY US:CITY:US360001\n\
Amsterdam, NY US:CITY:US360002\n\
Binghamton, NY US:CITY:US360003\n\
Brentwood, NY US:CITY:US360004\n\
Brooklyn, NY US:CITY:US360005\n\
Buffalo, NY US:CITY:US360006\n\
Commack, NY US:CITY:US360007\n\
Coram, NY US:CITY:US360008\n\
Elmira, NY US:CITY:US360009\n\
Hempstead, NY US:CITY:US360010\n\
Huntington Station, NY US:CITY:US360011\n\
Ithaca, NY US:CITY:US360012\n\
Jamestown, NY US:CITY:US360013\n\
Kingston, NY US:CITY:US360014\n\
Levittown, NY US:CITY:US360015\n\
Massena, NY US:CITY:US360016\n\
Middletown, NY US:CITY:US360017\n\
New City, NY US:CITY:US360018\n\
New York, NY US:CITY:US360019\n\
Niagara Falls, NY US:CITY:US360020\n\
Ogdensburg, NY US:CITY:US360021\n\
Oneonta, NY US:CITY:US360022\n\
Oswego, NY US:CITY:US360023\n\
Plattsburgh, NY US:CITY:US360024\n\
Poughkeepsie, NY US:CITY:US360025\n\
Rochester, NY US:CITY:US360026\n\
Saratoga Springs, NY US:CITY:US360027\n\
Syracuse, NY US:CITY:US360028\n\
Utica, NY US:CITY:US360029\n\
Watertown, NY US:CITY:US360030\n\
Yonkers, NY US:CITY:US360031\n\
Asheboro, NC US:CITY:US370001\n\
Asheville, NC US:CITY:US370002\n\
Boone, NC US:CITY:US370003\n\
Burlington, NC US:CITY:US370004\n\
Charlotte, NC US:CITY:US370005\n\
Durham, NC US:CITY:US370006\n\
Elizabeth City, NC US:CITY:US370007\n\
Fayetteville, NC US:CITY:US370008\n\
Fort Bragg, NC US:CITY:US370009\n\
Gastonia, NC US:CITY:US370010\n\
Greensboro, NC US:CITY:US370011\n\
Greenville, NC US:CITY:US370012\n\
Hendersonville, NC US:CITY:US370013\n\
Hickory, NC US:CITY:US370014\n\
Jacksonville, NC US:CITY:US370015\n\
New Bern, NC US:CITY:US370016\n\
Raleigh, NC US:CITY:US370017\n\
Roanoke Rapids, NC US:CITY:US370018\n\
Rocky Mount, NC US:CITY:US370019\n\
Salisbury, NC US:CITY:US370020\n\
Statesville, NC US:CITY:US370021\n\
Wilmington, NC US:CITY:US370022\n\
Winston-Salem, NC US:CITY:US370023\n\
Bismarck, ND US:CITY:US380001\n\
Dickinson, ND US:CITY:US380002\n\
Fargo, ND US:CITY:US380003\n\
Grand Forks, ND US:CITY:US380004\n\
Jamestown, ND US:CITY:US380005\n\
Minot, ND US:CITY:US380006\n\
Williston, ND US:CITY:US380007\n\
Akron, OH US:CITY:US390001\n\
Ashland, OH US:CITY:US390002\n\
Ashtabula, OH US:CITY:US390003\n\
Athens, OH US:CITY:US390004\n\
Bowling Green, OH US:CITY:US390005\n\
Cambridge, OH US:CITY:US390006\n\
Canton, OH US:CITY:US390007\n\
Chillicothe, OH US:CITY:US390008\n\
Cincinnati, OH US:CITY:US390009\n\
Cleveland, OH US:CITY:US390010\n\
Columbus, OH US:CITY:US390011\n\
Dayton, OH US:CITY:US390012\n\
Defiance, OH US:CITY:US390013\n\
Delaware, OH US:CITY:US390014\n\
Lima, OH US:CITY:US390015\n\
Mansfield, OH US:CITY:US390016\n\
Marion, OH US:CITY:US390017\n\
Mentor, OH US:CITY:US390018\n\
New Philadelphia, OH US:CITY:US390019\n\
Newark, OH US:CITY:US390020\n\
Portsmouth, OH US:CITY:US390021\n\
Salem, OH US:CITY:US390022\n\
Sandusky, OH US:CITY:US390023\n\
Steubenville, OH US:CITY:US390024\n\
Toledo, OH US:CITY:US390025\n\
Urbana, OH US:CITY:US390026\n\
Wooster, OH US:CITY:US390027\n\
Youngstown, OH US:CITY:US390028\n\
Zanesville, OH US:CITY:US390029\n\
Ada, OK US:CITY:US400001\n\
Altus, OK US:CITY:US400002\n\
Ardmore, OK US:CITY:US400003\n\
Bartlesville, OK US:CITY:US400004\n\
Chickasha, OK US:CITY:US400005\n\
Durant, OK US:CITY:US400006\n\
Elk City, OK US:CITY:US400007\n\
Enid, OK US:CITY:US400008\n\
Guymon, OK US:CITY:US400009\n\
Lawton, OK US:CITY:US400010\n\
McAlester, OK US:CITY:US400011\n\
Muskogee, OK US:CITY:US400012\n\
Oklahoma City, OK US:CITY:US400013\n\
Okmulgee, OK US:CITY:US400014\n\
Ponca City, OK US:CITY:US400015\n\
Shawnee, OK US:CITY:US400016\n\
Stillwater, OK US:CITY:US400017\n\
Tahlequah, OK US:CITY:US400018\n\
Tulsa, OK US:CITY:US400019\n\
Woodward, OK US:CITY:US400020\n\
Bend, OR US:CITY:US410001\n\
City of The Dalles, OR US:CITY:US410002\n\
Coos Bay, OR US:CITY:US410003\n\
Corvallis, OR US:CITY:US410004\n\
Eugene, OR US:CITY:US410005\n\
Grants Pass, OR US:CITY:US410006\n\
Hermiston, OR US:CITY:US410007\n\
Hillsboro, OR US:CITY:US410008\n\
Klamath Falls, OR US:CITY:US410009\n\
La Grande, OR US:CITY:US410010\n\
Medford, OR US:CITY:US410011\n\
Ontario, OR US:CITY:US410012\n\
Pendleton, OR US:CITY:US410013\n\
Portland, OR US:CITY:US410014\n\
Roseburg, OR US:CITY:US410015\n\
Salem, OR US:CITY:US410016\n\
St. Helens, OR US:CITY:US410017\n\
Allentown, PA US:CITY:US420001\n\
Altoona, PA US:CITY:US420002\n\
Bethlehem, PA US:CITY:US420003\n\
Bloomsburg, PA US:CITY:US420004\n\
Chambersburg, PA US:CITY:US420005\n\
Chester, PA US:CITY:US420006\n\
Erie, PA US:CITY:US420007\n\
Hanover, PA US:CITY:US420008\n\
Harrisburg, PA US:CITY:US420009\n\
Hazleton, PA US:CITY:US420010\n\
Johnstown, PA US:CITY:US420011\n\
Lancaster, PA US:CITY:US420012\n\
Lebanon, PA US:CITY:US420013\n\
Meadville, PA US:CITY:US420014\n\
Philadelphia, PA US:CITY:US420015\n\
Pittsburgh, PA US:CITY:US420016\n\
Reading, PA US:CITY:US420017\n\
Scranton, PA US:CITY:US420018\n\
St. Marys, PA US:CITY:US420019\n\
State College, PA US:CITY:US420020\n\
Uniontown, PA US:CITY:US420021\n\
Wilkes-Barre, PA US:CITY:US420022\n\
Williamsport, PA US:CITY:US420023\n\
York, PA US:CITY:US420024\n\
Newport, RI US:CITY:US440001\n\
Providence, RI US:CITY:US440002\n\
Westerly, RI US:CITY:US440003\n\
Charleston, SC US:CITY:US450001\n\
Clemson, SC US:CITY:US450002\n\
Columbia, SC US:CITY:US450003\n\
Florence, SC US:CITY:US450004\n\
Greenville, SC US:CITY:US450005\n\
Greenwood, SC US:CITY:US450006\n\
Hilton Head Island, SC US:CITY:US450007\n\
Myrtle Beach, SC US:CITY:US450008\n\
Orangeburg, SC US:CITY:US450009\n\
Rock Hill, SC US:CITY:US450010\n\
Spartanburg, SC US:CITY:US450011\n\
Sumter, SC US:CITY:US450012\n\
Aberdeen, SD US:CITY:US460001\n\
Brookings, SD US:CITY:US460002\n\
Huron, SD US:CITY:US460003\n\
Mitchell, SD US:CITY:US460004\n\
Pierre, SD US:CITY:US460005\n\
Rapid City, SD US:CITY:US460006\n\
Sioux Falls, SD US:CITY:US460007\n\
Watertown, SD US:CITY:US460008\n\
Yankton, SD US:CITY:US460009\n\
Bristol, TN US:CITY:US470001\n\
Chattanooga, TN US:CITY:US470002\n\
Clarksville, TN US:CITY:US470003\n\
Columbia, TN US:CITY:US470004\n\
Cookeville, TN US:CITY:US470005\n\
Dyersburg, TN US:CITY:US470006\n\
Jackson, TN US:CITY:US470007\n\
Johnson City, TN US:CITY:US470008\n\
Kingsport, TN US:CITY:US470009\n\
Knoxville, TN US:CITY:US470010\n\
Lebanon, TN US:CITY:US470011\n\
McMinnville, TN US:CITY:US470012\n\
Memphis, TN US:CITY:US470013\n\
Morristown, TN US:CITY:US470014\n\
Murfreesboro, TN US:CITY:US470015\n\
Nashville, TN US:CITY:US470016\n\
Union City, TN US:CITY:US470017\n\
Abilene, TX US:CITY:US480001\n\
Amarillo, TX US:CITY:US480002\n\
Arlington, TX US:CITY:US480003\n\
Athens, TX US:CITY:US480004\n\
Austin, TX US:CITY:US480005\n\
Bay City, TX US:CITY:US480006\n\
Beaumont, TX US:CITY:US480007\n\
Beeville, TX US:CITY:US480008\n\
Brenham, TX US:CITY:US480009\n\
Brownsville, TX US:CITY:US480010\n\
Bryan, TX US:CITY:US480011\n\
College Station, TX US:CITY:US480012\n\
Conroe, TX US:CITY:US480013\n\
Corpus Christi, TX US:CITY:US480014\n\
Corsicana, TX US:CITY:US480015\n\
Dallas, TX US:CITY:US480016\n\
Del Rio, TX US:CITY:US480017\n\
Denton, TX US:CITY:US480018\n\
Eagle Pass, TX US:CITY:US480019\n\
El Campo, TX US:CITY:US480020\n\
El Paso, TX US:CITY:US480021\n\
Fort Hood, TX US:CITY:US480022\n\
Fort Worth, TX US:CITY:US480023\n\
Freeport, TX US:CITY:US480024\n\
Gainesville, TX US:CITY:US480025\n\
Galveston, TX US:CITY:US480026\n\
Gatesville, TX US:CITY:US480027\n\
Greenville, TX US:CITY:US480028\n\
Harlingen, TX US:CITY:US480029\n\
Henderson, TX US:CITY:US480030\n\
Houston, TX US:CITY:US480031\n\
Huntsville, TX US:CITY:US480032\n\
Irving, TX US:CITY:US480033\n\
Jacksonville, TX US:CITY:US480034\n\
Katy, TX US:CITY:US480035\n\
Kerrville, TX US:CITY:US480036\n\
Killeen, TX US:CITY:US480037\n\
Kingsville, TX US:CITY:US480038\n\
Lake Jackson, TX US:CITY:US480039\n\
Laredo, TX US:CITY:US480040\n\
Longview, TX US:CITY:US480041\n\
Lubbock, TX US:CITY:US480042\n\
Lufkin, TX US:CITY:US480043\n\
McAllen, TX US:CITY:US480044\n\
Midland, TX US:CITY:US480045\n\
Mineral Wells, TX US:CITY:US480046\n\
Mount Pleasant, TX US:CITY:US480047\n\
Nacogdoches, TX US:CITY:US480048\n\
New Braunfels, TX US:CITY:US480049\n\
Odessa, TX US:CITY:US480050\n\
Palestine, TX US:CITY:US480051\n\
Paris, TX US:CITY:US480052\n\
Plano, TX US:CITY:US480053\n\
Port Arthur, TX US:CITY:US480054\n\
Rio Grande City, TX US:CITY:US480055\n\
Round Rock, TX US:CITY:US480056\n\
San Antonio, TX US:CITY:US480057\n\
San Marcos, TX US:CITY:US480058\n\
Sherman, TX US:CITY:US480059\n\
Stephenville, TX US:CITY:US480060\n\
Sulphur Springs, TX US:CITY:US480061\n\
Texarkana, TX US:CITY:US480062\n\
The Woodlands, TX US:CITY:US480063\n\
Tyler, TX US:CITY:US480064\n\
Uvalde, TX US:CITY:US480065\n\
Vernon, TX US:CITY:US480066\n\
Victoria, TX US:CITY:US480067\n\
Waco, TX US:CITY:US480068\n\
Waxahachie, TX US:CITY:US480069\n\
Wichita Falls, TX US:CITY:US480070\n\
Brigham City, UT US:CITY:US490001\n\
Cedar City, UT US:CITY:US490002\n\
Logan, UT US:CITY:US490003\n\
Ogden, UT US:CITY:US490004\n\
Provo, UT US:CITY:US490005\n\
Salt Lake City, UT US:CITY:US490006\n\
St. George, UT US:CITY:US490007\n\
Burlington, VT US:CITY:US500001\n\
Montpelier, VT US:CITY:US500002\n\
Rutland, VT US:CITY:US500003\n\
Alexandria, VA US:CITY:US510001\n\
Arlington, VA US:CITY:US510002\n\
Blacksburg, VA US:CITY:US510003\n\
Centreville, VA US:CITY:US510004\n\
Charlottesville, VA US:CITY:US510005\n\
Chesapeake, VA US:CITY:US510006\n\
Danville, VA US:CITY:US510007\n\
Fredericksburg, VA US:CITY:US510008\n\
Hampton, VA US:CITY:US510009\n\
Harrisonburg, VA US:CITY:US510010\n\
Leesburg, VA US:CITY:US510011\n\
Lynchburg, VA US:CITY:US510012\n\
Newport News, VA US:CITY:US510013\n\
Norfolk, VA US:CITY:US510014\n\
Richmond, VA US:CITY:US510015\n\
Roanoke, VA US:CITY:US510016\n\
Virginia Beach, VA US:CITY:US510017\n\
Winchester, VA US:CITY:US510018\n\
Aberdeen, WA US:CITY:US530001\n\
Anacortes, WA US:CITY:US530002\n\
Bellevue, WA US:CITY:US530003\n\
Bellingham, WA US:CITY:US530004\n\
Bremerton, WA US:CITY:US530005\n\
Centralia, WA US:CITY:US530006\n\
Ellensburg, WA US:CITY:US530007\n\
Everett, WA US:CITY:US530008\n\
Federal Way, WA US:CITY:US530009\n\
Kennewick, WA US:CITY:US530010\n\
Moses Lake, WA US:CITY:US530011\n\
Mount Vernon, WA US:CITY:US530012\n\
Oak Harbor, WA US:CITY:US530013\n\
Olympia, WA US:CITY:US530014\n\
Port Angeles, WA US:CITY:US530015\n\
Pullman, WA US:CITY:US530016\n\
Redmond, WA US:CITY:US530017\n\
Seattle, WA US:CITY:US530018\n\
Spokane, WA US:CITY:US530019\n\
Sunnyside, WA US:CITY:US530020\n\
Tacoma, WA US:CITY:US530021\n\
Vancouver, WA US:CITY:US530022\n\
Walla Walla, WA US:CITY:US530023\n\
Wenatchee, WA US:CITY:US530024\n\
Yakima, WA US:CITY:US530025\n\
Beckley, WV US:CITY:US540001\n\
Bluefield, WV US:CITY:US540002\n\
Charleston, WV US:CITY:US540003\n\
Fairmont, WV US:CITY:US540004\n\
Huntington, WV US:CITY:US540005\n\
Martinsburg, WV US:CITY:US540006\n\
Morgantown, WV US:CITY:US540007\n\
Parkersburg, WV US:CITY:US540008\n\
Wheeling, WV US:CITY:US540009\n\
Eau Claire, WI US:CITY:US550001\n\
Green Bay, WI US:CITY:US550002\n\
Janesville, WI US:CITY:US550003\n\
Kenosha, WI US:CITY:US550004\n\
La Crosse, WI US:CITY:US550005\n\
Madison, WI US:CITY:US550006\n\
Manitowoc, WI US:CITY:US550007\n\
Marinette, WI US:CITY:US550008\n\
Milwaukee, WI US:CITY:US550009\n\
Oshkosh, WI US:CITY:US550010\n\
Racine, WI US:CITY:US550011\n\
River Falls, WI US:CITY:US550012\n\
Sheboygan, WI US:CITY:US550013\n\
Wausau, WI US:CITY:US550014\n\
Casper, WY US:CITY:US560001\n\
Cheyenne, WY US:CITY:US560002\n\
Evanston, WY US:CITY:US560003\n\
Gillette, WY US:CITY:US560004\n\
Laramie, WY US:CITY:US560005\n\
Rock Springs, WY US:CITY:US560006\n\
Sheridan, WY US:CITY:US560007\n\
Bobo Dioulasso, UV:CITY:UV000002\n\
Ouagadougou, UV:CITY:UV000004\n\
Ouahigouya, UV:CITY:UV000005\n\
Melo, UY:CITY:UY000002\n\
Montevideo, UY:CITY:UY000003\n\
Paysandu, UY:CITY:UY000004\n\
Rivera, UY:CITY:UY000005\n\
Salto, UY:CITY:UY000006\n\
Tacuarembo, UY:CITY:UY000007\n\
Andizhan, UZ:CITY:UZ000001\n\
Bukhara, UZ:CITY:UZ000002\n\
Dzhizak, UZ:CITY:UZ000003\n\
Fergana, UZ:CITY:UZ000004\n\
Gulistan, UZ:CITY:UZ000005\n\
Karshi, UZ:CITY:UZ000006\n\
Namangan, UZ:CITY:UZ000007\n\
Navoi, UZ:CITY:UZ000008\n\
Nukus, UZ:CITY:UZ000009\n\
Samarkand, UZ:CITY:UZ000010\n\
Tashkent, UZ:CITY:UZ000011\n\
Termez, UZ:CITY:UZ000012\n\
Urgench, UZ:CITY:UZ000013\n\
Barcelona, VE:CITY:VE000001\n\
Barquisimeto, VE:CITY:VE000002\n\
Caracas, VE:CITY:VE000003\n\
Ciudad Bolivar, VE:CITY:VE000004\n\
Coro, VE:CITY:VE000005\n\
Cumana, VE:CITY:VE000006\n\
Guanare, VE:CITY:VE000007\n\
Maracaibo, VE:CITY:VE000008\n\
Maturin, VE:CITY:VE000009\n\
Merida, VE:CITY:VE000010\n\
Puerto Ayacucho, VE:CITY:VE000011\n\
Puerto La Cruz, VE:CITY:VE000012\n\
San Carlos, VE:CITY:VE000013\n\
San Cristobal, VE:CITY:VE000014\n\
San Felipe, VE:CITY:VE000015\n\
San Juan De Los Morros, VE:CITY:VE000017\n\
Valencia, VE:CITY:VE000019\n\
Bien Hoa, VM:CITY:VM000002\n\
Buon Me Thuot, VM:CITY:VM000003\n\
Can Tho, VM:CITY:VM000004\n\
Da Lat, VM:CITY:VM000005\n\
Da Nang, VM:CITY:VM000006\n\
Haiphong, VM:CITY:VM000008\n\
Hanoi, VM:CITY:VM000009\n\
Ho Chi Minh City, VM:CITY:VM000010\n\
Hue, VM:CITY:VM000013\n\
My Tho, VM:CITY:VM000015\n\
Nha Trang, VM:CITY:VM000016\n\
Phan Thiet, VM:CITY:VM000017\n\
Play Cu, VM:CITY:VM000019\n\
Qui Nhon, VM:CITY:VM000020\n\
Soc Trang, VM:CITY:VM000022\n\
Tan An, VM:CITY:VM000023\n\
Thanh Hoa, VM:CITY:VM000026\n\
Truc Giang, VM:CITY:VM000028\n\
Tuy Hoa, VM:CITY:VM000029\n\
Vinh Long, VM:CITY:VM000031\n\
Walvis Bay, WA:CITY:WA000001\n\
Windhoek, WA:CITY:WA000002\n\
Manzini, WZ:CITY:WZ000001\n\
Mbabane, WZ:CITY:WZ000002\n\
Chipata, ZA:CITY:ZA000001\n\
Kabwe, ZA:CITY:ZA000002\n\
Kasama, ZA:CITY:ZA000003\n\
Livingstone, ZA:CITY:ZA000004\n\
Lusaka, ZA:CITY:ZA000005\n\
Mongu, ZA:CITY:ZA000006\n\
Ndola, ZA:CITY:ZA000007\n\
Bulawayo, ZI:CITY:ZI000001\n\
Gweru, ZI:CITY:ZI000002\n\
Harare, ZI:CITY:ZI000003\n\
Masvingo, ZI:CITY:ZI000004\n"