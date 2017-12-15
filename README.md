# The documentation for the Ironhacks Automatic Judging System

This repository contains the Ironhacks Automatic Judging System. There are several major components: the tech judging program(judge_machine.py), error detection result processor(bug_parser.py), juding sheet generator(judging_sheet_generator.py), final report generator(report_generator.py), email sender. This repostiry also contains some small tools, such as data similarity calculation(data_similarity.py), repository cloner(repository_cloner.py), git repository version controller(change_repo_version.py), git repository anti-initializer(ungit-a-folder.py).

## Overview

1. Structure
2. The tech judging program(judge_machine.py)
3. The error detection result processor(bug_parser.py)
4. pppp



## Structure

The program in this repository are created to do the judging task. In the whole judging process of Ironhacks, only UX judging part need to be done by human. The judging program are created to finish other judging part automatically. The tech judging program is used to check and create a score for the student project based on the tech criteria. Also, error detection program need to be used for judging. The result of error detection is in json format. The error detection result processor will be used to analyze the result of error detection. Both of the result will be used to calculate the result of tech judging. For UX judging, a grop of judging sheets will be created by juding sheet generator. Then the judging sheets will be sent to judgers for judging and final report generator will parse the result of judging sheet. The final report generator can also create a final report. The final report can be sent by emial sender. 

The data similarity calculation progrma is used to calculate the similarity of the dataset used by students. The repository cloner is used to download the repositories to your machine. Since the requirement for downloading is changed several times, many clone functions are created and all of them are works for their hacks. If you need to change the version of the Git repository, you can use the git repository version controller. For example, the deadline of submission is 11:59pm and you download the submission in the second day, you can use git repository version controller to roll back the repository and change the status of the repository back to 11:59pm. IF you want to upload all repositories to GitHub, please use the git repository anti-initializer to remove the .git folder in the repositories since you cannot push a repository who contains another repository. 


## The tech judging program(judge_machine.py)

The file judge_machine.py is the progrom for tech judging. There are several functions in that file. The task of this program is to do the tech judging. 

### Functions

#### clone_repo()

Clone_repo is the fucntion for repository downloading. As we mentioned above, we have more than one functions for cloning since the requirement for cloning is changed over the time. For example, the repository name pattern may changed when we start a new hack. In that case, we need change the method for repository mtching. Also, we may change the method to find a repository. For example, we can generator the repository name and download it, or we can get the repository list first and download what we need. Currently, we use the second method. 

All repositories will be put into a directory "repository". The variable of the directory is named "repository_folder_name". The "repository" directory will be created if there is not a "repository" directory. Normally, you need to issue the linux command to pull repositories and user name, password are required. The github api part is a little confusing, plase understand it before making any change. 

The github api is able manipulate the repository on github. But you need "git clone" to pull the repository. We have two variables for github api login: github_username and github_psw. And these variable CANNOT be used ro pull the repository. To pull the repository, you need to input the user name and the password. Please learn how to cache login information to make it easier. If you can find a method to download the repository by github api, plese change the method I used. 

Normally, you need to create the repository name by yourself. For example, I need use phase number to find the correct repository.

#### create_user2repo()

Function create_user2repo is used to create a map between username and the repository. The code there is bit difficult to understand since we got some trouble in last hack. Other member use both "-" and "_" together for the connector of the string. And some students also use "-" to connect their name which make the parsing difficult. The algorithm there try to identify the "-" in their name and the string connect "-". 


#### tech_judge()

This is the main function for tech judging. The idea of the judging is go through all projects to match the string we need. The variables are super easy to understand so we will not introduce them there. Under the currently requirement, we check:

1. What chart libraies they used?
2. If they uesd required API?(required api list is stored in a file "required_api_list.csv")
3. What kind of extra dataset thye used? (extra dataset API is stored in the file "extra_api_list.csv")
4. What kind of javascript library they used? (library list is defined in file "library.csv")
5. If they used Google Map API?
6. If they used the location we definded?
7. If they use javascript?
8. If their application is a mashup?
9. If they have readme file?
10. If they write readme file by themselves

All result will be writen into a file and the file name is definede by "output_file_name". Additionally, The tech judging result will calso contain: username, hackid, repository name, judging time, api list and library list. 


## The error detection result processor(bug_parser.py)
















































