import csv
import os
import xlrd
import xlwt
import time

students = {}
tech_judge_file_name = "tech_judge_result.csv"
error_rating_result_file = 'bug_detection_result.csv'
tech_score_index = [4, 7, 8 ,9, 10, 11, 12, 13, 14]
extra_api_index = 5
tech_score_dataset_index = 6
ux_score_path = "ux_score"
user_requirement_row_index = [7, 8, 9, 10, 11]
user_requirement_col_index = 4
usability_row_index = [13, 14, 15, 16, 17, 18]
usability_col_index = 4
novelty_row_index = 21
novelty_col_index = [4, 5, 6]
hack_id_index = 1
student_name = 0
all_info_output_file = "all_score.csv"


class student(object):

	def __init__(self, username, hack_id):
		self.error_rating_raw = 0
		self.error_rating = 0
		self.tech_point = 0
		self.tech_point_raw = 0
		self.user_requirement = 0
		self.infoVis = 0
		self.Novelty_num_datasets = 0
		self.Novelty_point_of_datasets = 0
		self.combined_infovis_raw = 0
		self.combined_infovis_norm = 0
		self.total_raw = 0
		self.total_norm = 0

		self.username = username
		self.hack_id = hack_id

		self.tech_point_per = ""
		self.user_requirement_per = ""
		self.infoVis_per = ""
		self.combine_infovis_per = ""
		self.Novelty_point_of_datasets_per = ""
		self.total_norm_per = ""

		# SCORE DETAIL
		self.detail_tech = ""
		self.detail_usability = ""
		self.detail_user = ""
		self.detail_nove = ""

def parse_grade():
	# create student 
	with open(tech_judge_file_name) as tech_judge_result:
		tech_judge_result_reader = csv.reader(tech_judge_result)
		iter_tech_scores = iter(tech_judge_result_reader)
		next(iter_tech_scores)
		for row in iter_tech_scores:
			stu = student(row[student_name], row[hack_id_index])
			for index in tech_score_index:
				stu.tech_point_raw += int(row[index])
				stu.detail_tech += row[index] + ','
			if row[extra_api_index] != 0:
				stu.tech_point_raw += 1

			datasets = row[tech_score_dataset_index].split(",")
			stu.Novelty_num_datasets = len(datasets) - 1
			students[stu.username] = stu
	with open(error_rating_result_file) as error_file:
		error_reader = csv.reader(error_file)
		for row in error_reader:
			if row[0] not in students:
				print("{} not in the list".format(row[0]))
				continue
			students[row[0]].error_rating_raw = float(row[1])
			students[row[0]].error_rating = 100 * (1 - float(row[1]))
			students[row[0]].tech_point = (students[row[0]].tech_point_raw * 10 + students[row[0]].error_rating)
	

	# read score
	list_scores = os.walk(ux_score_path)
	for root, dirs, files in list_scores:
		for file in files:
			file = os.path.join(root, file)
			print(file)
			workbook = xlrd.open_workbook(file)
			for sheet_name in workbook.sheet_names():
				if sheet_name not in students:
					print("{} not in the list".format(sheet_name))
					continue
				sheet = workbook.sheet_by_name(sheet_name)
				username = sheet.cell(2, 2).value
				print(username)
				# user requirements
				for row_index in user_requirement_row_index:
					students[username].user_requirement += int(sheet.cell(row_index, user_requirement_col_index).value)
					students[username].detail_user += str(sheet.cell(row_index, user_requirement_col_index).value) + ','
				#students[username].user_requirement *= 20

				# usability
				for row_index in usability_row_index:
					students[username].infoVis += int(sheet.cell(row_index, usability_col_index).value)
					students[username].detail_usability += str(sheet.cell(row_index, usability_col_index).value) + ','
				#students[username].infoVis = students[username].infoVis / 18 * 100

				students[username].combined_infovis_raw = students[username].user_requirement + students[username].infoVis
				students[username].combined_infovis_norm = students[username].combined_infovis_raw / 23 * 100

				# novelty
				total_score_dataset = 0
				for row_index in range(novelty_row_index, novelty_row_index + students[username].Novelty_num_datasets):
					for col_index in novelty_col_index:
						students[username].Novelty_point_of_datasets += int(sheet.cell(row_index, col_index).value)
						students[username].detail_nove += str(sheet.cell(row_index, col_index).value) + ','
					students[username].detail_nove += ';'
				#students[username].Novelty_point_of_datasets = int(students[username].Novelty_point_of_datasets / total_score_dataset * 100)

				students[username].total_raw = students[username].tech_point_raw + students[username].user_requirement + students[username].infoVis + students[username].Novelty_point_of_datasets
				students[username].total_norm = students[username].tech_point + students[username].combined_infovis_norm * 2 + students[username].Novelty_point_of_datasets / 450 * 100

	# calculate percentile 
	# total_size = len(students)
	# calculate the size
	total_size = dict()
	for stu in students:
		if students[stu].hack_id in total_size:
			total_size[students[stu].hack_id] += 1
		else:
			total_size[students[stu].hack_id] = 1

	for username in students:
		tech_lower_than_me = 0
		user_lower_than_me = 0
		infovis_lower_than_me = 0
		data_lower_than_me = 0
		combine_infovis_lower_than_me = 0
		total_norm_lower_than_me = 0

		for tmp in students:
			if students[tmp].tech_point < students[username].tech_point and students[tmp].hack_id == students[username].hack_id:
				tech_lower_than_me += 1

			
			
			if students[tmp].user_requirement < students[username].user_requirement and students[tmp].hack_id == students[username].hack_id:
				user_lower_than_me += 1

			if students[tmp].infoVis < students[username].infoVis and students[tmp].hack_id == students[username].hack_id:
				infovis_lower_than_me += 1
			
			#### Combine above two
			if students[tmp].user_requirement + students[tmp].infoVis < students[username].user_requirement + students[username].infoVis and students[tmp].hack_id == students[username].hack_id:
				combine_infovis_lower_than_me += 1
	

			if students[tmp].Novelty_point_of_datasets < students[username].Novelty_point_of_datasets and students[tmp].hack_id == students[username].hack_id:
				data_lower_than_me += 1

			if students[tmp].total_norm < students[username].total_norm and students[tmp].hack_id == students[username].hack_id:
				total_norm_lower_than_me += 1


		students[username].tech_point_per = str(round(100 * tech_lower_than_me / total_size[students[username].hack_id], 2)) + '%'
		students[username].user_requirement_per = str(round(100 * user_lower_than_me / total_size[students[username].hack_id], 2)) + '%'
		students[username].infoVis_per = str(round(100 * infovis_lower_than_me / total_size[students[username].hack_id], 2)) + '%'
		students[username].Novelty_point_of_datasets_per = str(round(100 * data_lower_than_me / total_size[students[username].hack_id], 2)) + '%'
		students[username].combine_infovis_per = str(round(100 * combine_infovis_lower_than_me / total_size[students[username].hack_id], 2)) + '%'
		students[username].total_norm_per = str(round(100 * total_norm_lower_than_me / total_size[students[username].hack_id], 2)) + '%'

	# create all info table
	all_output = []
	index = 0
	with open(tech_judge_file_name) as tech_judge_result:
		tech_judge_result_reader = csv.reader(tech_judge_result)
		for row in tech_judge_result_reader:
			new_roll = []
			if index == 0:
				new_roll.extend(row)
				new_roll.append("error_raw")
				new_roll.append("error_normal")
				new_roll.append("tech_point_raw")
				new_roll.append("tech_point_normal")
				new_roll.append("tech_per")
				new_roll.append("tech_detail")
				new_roll.append("user_requirement")
				new_roll.append("user_requirement_normal")
				new_roll.append("user_requirement_per")
				new_roll.append("user_detail")
				new_roll.append("infovis")
				new_roll.append("infoVis_normal")
				new_roll.append("infoVis_per")
				new_roll.append("infovis_detail")
				new_roll.append("combined_infovis_raw")
				new_roll.append("combined_infovis_norm")
				new_roll.append("combined_infovis_per")
				new_roll.append("novelty")
				new_roll.append("novelty_normal")
				new_roll.append("novelty_per")
				new_roll.append("novelty_detail")

				new_roll.append("total_raw")
				new_roll.append("total_norm")
				new_roll.append("total_norm_per")
				all_output.append(new_roll)
			else:
				new_roll.extend(row)
				new_roll.append(students[row[0]].error_rating_raw)
				new_roll.append((1 - float(students[row[0]].error_rating_raw)) * 100)
				new_roll.append(students[row[0]].tech_point_raw)
				new_roll.append(students[row[0]].tech_point_raw * 10)
				new_roll.append(students[row[0]].tech_point_per)
				new_roll.append(students[row[0]].detail_tech)
				new_roll.append(students[row[0]].user_requirement)
				new_roll.append(students[row[0]].user_requirement * 20)
				new_roll.append(students[row[0]].user_requirement_per)
				new_roll.append(students[row[0]].detail_user)
				new_roll.append(students[row[0]].infoVis)
				new_roll.append(students[row[0]].infoVis /18 * 100)
				new_roll.append(students[row[0]].infoVis_per)
				new_roll.append(students[row[0]].detail_usability)
				new_roll.append(students[row[0]].combined_infovis_raw)
				new_roll.append(students[row[0]].combined_infovis_norm)
				new_roll.append(students[row[0]].combine_infovis_per)
				new_roll.append(students[row[0]].Novelty_point_of_datasets)
				new_roll.append(students[row[0]].Novelty_point_of_datasets / 450 * 100)
				new_roll.append(students[row[0]].Novelty_point_of_datasets_per)
				new_roll.append(students[row[0]].detail_nove)

				new_roll.append(students[row[0]].total_raw)
				new_roll.append(students[row[0]].total_norm)
				new_roll.append(students[row[0]].total_norm_per)
				all_output.append(new_roll)
			index += 1

	with open(all_info_output_file, "w") as f:
		writer = csv.writer(f)
		writer.writerows(all_output)



def create_individual_report():
	os.chdir('html_report')
	for key in students:
		stu = students[key]
		# insert score
		tmp = table_template_without_per
		tmp = tmp.replace("ERROR_RATING_RAW", str(round((stu.error_rating_raw * 100), 2)) + '%', 1)
		print(str(round((stu.error_rating_raw * 100), 2)) + '%')
		tmp = tmp.replace("TECH_POINT", str(stu.tech_point_raw), 1)
		tmp = tmp.replace("USER_REQUIREMENT", str(stu.user_requirement), 1)
		tmp = tmp.replace("INFOVIS", str(stu.infoVis), 1)
		tmp = tmp.replace("NOVELTY_NUM_DATASETS", str(stu.Novelty_num_datasets), 1)
		tmp = tmp.replace("NOVELTY_POINT_OF_DATASETS", str(stu.Novelty_point_of_datasets), 1)
		tmp = tmp.replace("GITHUB_NAME", stu.username)
		tmp = tmp.replace("GITHUB_USERNAME", stu.username)
		tmp = tmp.replace("JUDGING_TIME", str(time.asctime(time.localtime(time.time()))))

		if stu.hack_id == 'unal2' or stu.hack_id == 'honors0':
			tmp = text_2 + tmp
			tmp += table_template_per_only
			tmp = tmp.replace("TECH_POINT_PER", stu.tech_point_per, 1)
			#tmp = tmp.replace("USER_REQUIREMENT_PER", stu.user_requirement_per, 1)
			tmp = tmp.replace("INFOVIS_PER", stu.combine_infovis_per, 1)
			tmp = tmp.replace("NOVELTY_POINT_OF_DATASETS_PER", stu.Novelty_point_of_datasets_per, 1)
		else:
			tmp = text_1 + tmp
		tmp += template_end
		
		with open(str(stu.username) + ".report", "w") as f:
			tmp = '<html>' + tmp + '</html>'
			f.write(tmp)
			print("Finished {0}".format(key))
	os.chdir('..')

text_1 = '''
<font face="helvetica">
Hi IronHacker, <br><br> Thanks for submitting your app! We really enjoyed evaluating your application. The feedback below should help you improve your application! It will not influence the score of your final solution, so don't worry! 
<br>
We judge your application on three dimensions: Technology, InfoVis and Novelty. We use objective techniques for doing that (e.g. code error detection techniques, establish evaluation methods for usability, etc.) and our judges are all experts and well trained. The table below reports the results of the evaluations of your app on all three dimensions. Use this to identify opportunities for strengths and weaknesses.  
</font>
<br>
'''


text_2 = '''
<font face="helvetica">
Hi IronHacker, <br><br> 
Thanks for submitting your app! We really enjoyed evaluating your application. The feedback below should help you improve your application! It will not influence the score of your final solution, so don't worry!  We evaluate your application in three dimensions: Technology, InfoVis and Novelty. We use objective techniques for doing that (e.g. code error detection techniques, establish evaluation methods for usability, etc.) and our judges are all experts and well trained.  
<br>
<br>
You will find <b>two tables</b> below. The first table (Table 1) reports the results of the evaluations of your app in all three dimensions. The second table (Table 2) reports a performance score for each dimension as a <b>corresponding percentile rank</b>. A percentile rank achieved by  you indicates the percentage of participants in your hacking contest who achieved a lower performance than you. 
</font>
<br>
'''



table_template_without_per = '''
<font face="helvetica">
<br>
<b>Table 1: Your results</b> <br><br>
		<table border="0" cellspacing="1" align="left" frame="hsides" rules="all" width="100%" style="margin-bottom:20px">
			<tr>
				<th width="10%"><font color="orange">Results for</font></th>
				<td width="50%" colspan="1">GITHUB_NAME</td>
				<th width="30%" colspan="1"><font color="orange">Time</font></th>
				<td width="10%" colspan="1">JUDGING_TIME</td>
			</tr>
			<tr>
				<th>Performance Dimension</th>
				<th>Description</th>
				<th>Measure type</th>
				<th>Your Result</th>
			</tr>
			<tr>
				<th rowspan="2"><font color="orange">Technology</font></th>
				<td>(1) Error rating: We evaluate the quality of your code by counting the errors and diving it by the total number of lines of code. The lower the value the better your code. </td>
				<td>Error rating</td>
				<td>ERROR_RATING_RAW</td>
			</tr>
			<tr>
				<td>(2) Tech requirements: You are expected to meet all 10 technological requirements specified in the challenge <a href="http://www.ironhacks.com/task">description</a>. All requirements are equally weighted. The more more requirements you meet the better </td>
				<td>Number of technology requirements met  </td>
				<td>TECH_POINT</td>
			</tr>
			<tr>
				<th rowspan="2"><font color="orange">InfoVis</font></th>
				<td>(1)User requirements:  We evaluate the fulfillment of user requirements specified in the challenge <a href="http://www.ironhacks.com/task">description</a>. All 5 requirements are equally weighted.</td>
				<td>Number of user requirements met</td>
				<td>USER_REQUIREMENT</td>
			</tr>
			<tr>
				
				<td>(2)Usability: We evaluate 
				<br>(1.1) System affordance: Does the application offer recognizable elements and interactions that can be understood by the user?
				<br> (2.2) Cognitive workload: Is the number of alternatives from which the user can choose appropriate?
				<br> (2.3) Functionality: Would a potential user have to memorize a lot of information and make many steps in the app to carry the task?<br> You can achieve a score from 0 to 18 for usability. All three dimensions are equally weighted. </td>
				<td>Usability points achieved</td>
				<td>INFOVIS</td>
			</tr>
			<tr>
				<th rowspan="2"><font color="orange">Novelty</font></th>
				<td rowspan="2">Adding new data sets definitely makes your app stand out from the rest.<br>  We evaluate three aspects: (1) Are you using new datasets? (2) How relevant is the new data for the user? (3) How novel is the visualization that you are using? We evaluate each dataset individually and average across all datasets used. For each data set you can achieve up to 9 points. The more points the better.   </td>
				<td>Number of new datasets</td>
				<td>NOVELTY_NUM_DATASETS</td>
			</tr>
			<tr>
				<td>Total points for novelty </td>
				<td>NOVELTY_POINT_OF_DATASETS</td>
			</tr>
		</table>
</font>
<br>

'''

table_template_per_only = '''
<br>
<br>
<font face="helvetica">
<br>
<b>Table 2: Summary: Your Percentile Scores</b> <br><br>

Remember, that a percentile rank for a score indicates the percentage of participants who participated in the hack and received a lower score. The percentile ranks for all these three scores are based on the scores of all participants within your hacking group.  
Please visit <a href="http://www.ironhacks.com/scores">www.ironhacks.com/scores</a> to compare your results with those of others, and see how others with a similar percentile score do in all three dimensions.
<br><br>
		<table border="0" cellspacing="1" align="left" width="100%" frame="hsides" rules="rows" style="margin-bottom:20px">
			<tr>
				<td><font color="orange"><b>Dimension</b></font></td>
				<td><b><font color="orange">Technology</font></b></td>
				
				<td><b><font color="orange">InfoVis</font></b></td>
				<td><b><font color="orange">Novelty</font></b></td>
			</tr>
			<tr>
				<td><b>Percentile Score</b></td>
				<td>TECH_POINT_PER</td>
				
				<td>INFOVIS_PER</td>
				<td>NOVELTY_POINT_OF_DATASETS_PER</td>
			</tr>
		</table>
</font>
'''

template_end = '''

<I>CONFIDENTIALITY NOTE</I>: This information is confidential and should not be shared with other participants in your hack! Follow the rules of IronHacks and do not share this information. <br><br>

Keep in mind: This evaluation does not affect your standing in the final phase! Keep moving, improving, and be creative! Great prizes are waiting for you. And even if you do not make it to the top, we have prizes for winning spirit and also community spirit. So it's worth working hard! <br><br>

If you have any further questions, please let us know: opendigital@purdue.edu <br><br>


Happy Hacking, <br>
The IronHacks Team
'''


if __name__ == '__main__':
	parse_grade()
	create_individual_report()