import smtplib
from email.mime.text import MIMEText
from email.header import Header
import os
import csv

email_sender = []
user_all_path = 'all_user.csv'
email_list = 'emailSenderList.csv'
report_dir = "html_report"
stu2email = {}
stu2hackid = {}
hack_id = "unal2"

def configure():
	with open(user_all_path) as user_all_file:
		user_all_reader = csv.reader(user_all_file)
		for row in user_all_reader:
			stu2email[row[1]] = row[2]
			stu2hackid[row[1]] = row[5] + row[6]
	with open(email_list) as email_list_file:
		email_list_reader = csv.reader(email_list_file)
		for row in email_list_reader:
			email_sender.append(row[0])
 
def send_email(email_content, user, sender, receivers):
	# sender = 'purdueironhacksrobot1@gmail.com'
	#receivers = ['li2266@purdue.edu']
	#receivers = 'aldiazve@unal.edu.co'
	pwd = 'chizhangmmd'
	 
	mail_msg = email_content
	message = MIMEText(mail_msg, 'html', 'utf-8')
	message['From'] = Header("ironhacks robot", 'utf-8')
	message['To'] =  Header(user, 'utf-8')
	 
	subject = '***CONFIDENTIAL: Your evaluations in phase 4 of Purdue IronHacks***'
	message['Subject'] = Header(subject, 'utf-8')
	 
	 
	try:
	    smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
	    smtpObj.ehlo()
	    smtpObj.starttls()
	    smtpObj.login(sender, pwd)
	    smtpObj.sendmail(sender, receivers, message.as_string())
	    print ("{} {} success".format(stu2hackid[user], user))
	except smtplib.SMTPException:
		print ("Error: {} ".format(user))



if __name__ == '__main__':
	configure()
	sender_size = len(email_sender)
	index = 0;
	lists_files = os.walk(report_dir)
	for root, dirs, files in lists_files:
		for file in files:
			username = file.split('.')[0]
			#if stu2hackid[username] != hack_id:
				#continue
			file = os.path.join(root, file)
			with open(file, 'rt') as f:
				email_content = f.read()
				sender = email_sender[index % sender_size]
				send_email(email_content, username, sender, stu2email[username])
				index += 1
	
