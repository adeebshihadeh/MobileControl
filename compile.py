html = ""

from os import listdir
from os.path import isfile, join
import os.path


print "Searching for files...\n"
path = "./pages"
all_files = [
    f for f in listdir(path)  if isfile(join(path, f))
 ]
 
files = []

files_content = []

print "Found page files:"
for file in all_files:
    if os.path.splitext(file)[1]:
        print "\t" + file
        files.append(file)

for file in files:
    with open(path+"/"+file, "r") as file:
        files_content.append(file.read().replace('\n', ''))

with open("base.html", "r") as file:
    base_html = file.read()

with open("base.html", "r") as file:
    for line in file.readlines():
        html += line
        if "<body>" in line:
            # add markup
            for file in files:
                html += "\n"
                html+="<div id='"+file.split(".")[0]+"' class='page'>"
                with open(path+"/"+file, "r") as file:
                    for line in file.readlines():
                        if "<script>" not in line:
                            html+=line
                        else:
                            break
                html+="</div>"
                
            # add js
            for file in files:
                scripting = False
                html += "\n"
                with open(path+"/"+file, "r") as file:
                    for line in file.readlines():
                        if scripting:
                            html+=line
                        elif "<script>" in line:
                            scripting = True
                            html+=line

# finished html
dump = open("index.html", "w")
dump.write(str(html))
dump.close()