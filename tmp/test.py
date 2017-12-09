import csv

purdue_list = list()
result = list()

with open("user_2017fall.csv") as f:
	reader = csv.reader(f)
	for row in reader:
		purdue_list.append(row[0])

with open("line_phase2.csv") as f:
	reader = csv.reader(f)
	for row in reader:
		if row[0] not in purdue_list:
			result.append(row)

with open("line_report_phase2.csv", "w") as f:
		writer = csv.writer(f)
		writer.writerows(result)