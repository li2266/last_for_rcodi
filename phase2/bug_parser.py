# parser the result of bug detection

import csv
import os
import json


projects_path = 'repository'
library_list = list()
error_record = {}
line_record = {}
output_file_name = 'bug_detection_result.csv'


def config():
	with open("library.csv") as library_file:
		library_reader =csv.reader(library_file)
		for library in library_reader:
			library_list.append(library[0])

def parse_bug_detection_result():
	for parent, dirs, files in os.walk("bug_detection_result"):
		for file in files:
			path = os.path.join(parent, file)
			with open(path, 'rt') as file_content:
				#print(file)
				dic = json.load(file_content)
				error = 0;
				# for JS

				for errors in  dic['js']['errors']:
					for lib in library_list:
						if errors.lower().find(lib) != -1:
							error -= 1;
							break;
					error += 1
				for errors in dic['js']['resourceErrors']:
					for lib in library_list:
						if errors.lower().find(lib) != -1:
							error -= 1
							break;
					error += 1
				# for CSS
				if 'errors' in dic['css']:
					for errors in dic['css']['errors']:
						for lib in library_list:
							if errors['uri'].lower().find(lib) != -1:
								error -= 1
								break;
						error += 1

				# for HTML
				for errors in dic['html']:
					for lib in library_list:
						if errors.lower().find(lib) != -1:
							error -= 1
							break
					error += 1
				username = file.split('!')[5].split('_')[0].split('-')[3:]
				if type(username) == list:
					tmp = ""
					index = 0
					for i in username:
						tmp += i 
						if index < len(username) - 1:
							tmp += "-"
						index += 1
					username = tmp
				if username not in error_record:
					error_record[username] = 0
				error_record[username] += error
	print(error_record)

def count_line_of_project():
	cur_dir = os.getcwd()
	os.chdir(projects_path)
	target_dir = os.getcwd()
	proj_list = os.listdir('.')

	#for key in error_record:
	for key in proj_list:
		os.chdir(os.path.join(target_dir, key))
		# for individuals 
		print(key)

		username = key.split('_')[0].split('-')[3:]
		#print(username)
		if type(username) == list:
			tmp = ""
			index = 0
			for i in username:
				tmp += i 
				if index < len(username) - 1:
					tmp += "-"
				index += 1
			username = tmp
		print(username)
		line_record[username] = 0
		for parent, dirs, files in os.walk("."):
			for file in files:
				if file.split('.')[-1] != 'html' and file.split('.')[-1] != 'css' and file.split('.')[-1] != 'js':
					continue
				path = os.path.join(parent, file)
				flag_lib = 0
				for lib in library_list:
					if file.find(lib) != -1:
						flag_lib = 1
						break
				if flag_lib == 1:
					continue
				try:
					length = len(open(path).readlines())
					line_record[username] += length
					print("{} {}".format(path, length))
				except Exception as e:
					print(e)
					os.chdir(target_dir)
		os.chdir(target_dir)
	os.chdir(cur_dir)
	print(line_record)
	print(os.getcwd())

def fun():
	res = list()
	for key in line_record:
		row = list()
		row.append(key)
		if key not in error_record:
			continue
		if line_record[key] == 0:
			row.append(0)
		else:
			row.append(error_record[key] / line_record[key])
		row.append(line_record[key])
		res.append(row)
		print("{} {}".format(key, row[1]))
	with open(output_file_name, "w") as f:
		writer = csv.writer(f)
		writer.writerows(res)

if __name__ == '__main__':
	config()
	parse_bug_detection_result()
	count_line_of_project()
	fun()