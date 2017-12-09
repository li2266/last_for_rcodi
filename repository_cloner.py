import github
from github import Github
import os
import subprocess

github_username = "RCODI"
github_psw = "GoBoilers2015!"
github_org = "goldironhack"
repos_list = list()
str_phase = "phase1"
repository_folder_name = "repository"

def clone_repo():
	if os.path.exists(repository_folder_name) == False:
		os.mkdir(repository_folder_name)
	os.chdir(repository_folder_name)

	gh = Github(github_username, github_psw)
	gh_org = gh.get_organization(github_org)

	for repo in gh_org.get_repos():
		if repo.name.find(str_phase) != -1:
			repos_list.append(repo.name)

	for repo in repos_list:
		try:
			user_repository = gh_org.get_repo(repo)
		except:
			print("ERROR: there is no repo named {0}".format(repo))
		if user_repository != None:
			subprocess.call(["git", "clone", user_repository.clone_url])
			print("cloned repo: {0}".format(repo))
		else:
			print("fail to cloned repo: {0}".format(repo))


if __name__ == '__main__':
	clone_repo()