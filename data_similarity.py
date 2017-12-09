import csv
import math

input_file_name = "data_sim_input.csv"
config_file = "extra_api_list.csv"
output_file_name = "data_similarity_output.csv"

api_list = list()
record = dict()
res = list()
username = list()

def data_similarity():
	for name in username:
		tmp_list = list()
		tmp_list.append(name)
		for another in username:
			tmp_sum = 0
			for i in range(0, len(api_list)):
				tmp_sum += (record[name][i] - record[another][i]) * (record[name][i] - record[another][i])
			tmp_sum = math.sqrt(tmp_sum)
			tmp_list.append(tmp_sum)
		res.append(tmp_list)
	username.insert(0, "")
	res.insert(0, username)
	with open(output_file_name, "w") as f:
		writer = csv.writer(f)
		writer.writerows(res)


def config():
	with open(config_file) as f:
		reader = csv.reader(f)
		for row in reader:
			api_list.append(row[1])

	with open(input_file_name) as f:
		reader = csv.reader(f)
		for row in reader:
			username.append(row[0])
			record[row[0]] = list()
			tmp_list = row[6].split(",")
			for name in api_list:
				if name in tmp_list:
					record[row[0]].append(1)
				else:
					record[row[0]].append(0)
			print(record[row[0]])


config()
data_similarity()