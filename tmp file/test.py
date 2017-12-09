import csv

stu_list = list()

stu_file = "UNAL_ALL81_UNALMAILID+GITNAME.csv"

vip_file = "user_2017fall.csv"



with open(stu_file) as f:
	stu_file_reader = csv.reader(f)
	for row in stu_file_reader:
		stu_list.append(row[6])

with open(vip_file) as f:
	stu_file_reader = csv.reader(f)
	for row in stu_file_reader:
		if row[0] not in stu_list and row[1] != "honors":
			print("{} not in list".format(row[0]))