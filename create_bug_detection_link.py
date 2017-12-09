import csv

stu_list_name = "user_2017fall.csv"

hosting_file = "hosting.csv"

output = list()

with open(stu_list_name) as f:
	stu_list_reader = csv.reader(f)
	for row in stu_list_reader:
		output_row = list()
		link = "http://www.ironhacks.com/users/" + row[0] + "/projects/webapp_phase5/preview/index.html"
		#readme = "http://www.ironhacks.com/users/" + row[0] + "/projects/webapp_phase2/preview/README.md"
		readme = "https://github.com/li2266/9fc703c41916345769d5f4de213139ec/blob/master/IH-Project-2017-" + row[0] + "_webapp_phase5/README.md"
		bug_detect = "http://rawgit.com/li2266/9fc703c41916345769d5f4de213139ec/master/IH-Project-2017-" + row[0] + "_webapp_phase5/index.html"
		print(bug_detect)
		output_row.append(row[0])
		output_row.append(link)
		output_row.append(readme)
		output_row.append(bug_detect)
		output_row.append(row[1] + row[2])
		output.append(output_row)

with open(hosting_file, "w") as f:
		writer = csv.writer(f)
		writer.writerows(output)



'''
http://rawgit.com/li2266/9fc703c41916345769d5f4de213139ec/master/IH-Project-2017-Acreed21_webapp_phase1/index.html
'''