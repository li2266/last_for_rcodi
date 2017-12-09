###############################################################################
# Author: Priyank Jain (@priyankjain)
# Description: This script deletes all .get folders inside a directory
# Usage: python ungit-a-folder.py <path-to-directory>
###############################################################################

import os
import shutil
import sys

if __name__ == '__main__':
	directory = None
	if(len(sys.argv)>1):
		directory = sys.argv[1]
	else:
		print("Usage: python ungit-a-folder.py <path-to-directory-to-ungit>")
		print("Path to directory should be '.' without quotes\
			to ungit the current directory")
		sys.exit(-1)
	for dirpath, dirnames, filenames in os.walk(directory):
		for dirname in dirnames:
			if(dirname == '.git'):
				p = os.path.join(dirpath, dirname)
				print("Deleting git directory: {0}".format(p))
				shutil.rmtree(p)


