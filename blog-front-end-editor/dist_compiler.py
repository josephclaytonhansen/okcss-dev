import os, re, zipfile
src_path = os.path.join(os.getcwd(), "blog-front-end-editor")
dist_path = os.path.join(os.getcwd(), "blog-front-end-editor", "dist")

# copy all files and folders from src to dist
def copy_all():
    global src_path, dist_path
    if not os.path.exists(dist_path):
        os.mkdir(os.path.join(os.getcwd(), "blog-front-end-editor", "dist"))
    os.system("cp -r " + src_path + "/* " + dist_path)
    #remove all .py files
    os.system("find " + dist_path + " -name '*.py' -type f -delete")
    #remove all .css files that aren't .min.css
    os.system("find " + dist_path + " -name '*.css' ! -name '*.min.css' -type f -delete")
    #remove all .js files that aren't .min.js
    os.system("find " + dist_path + " -name '*.js' ! -name '*.min.js' -type f -delete")
    # remove all .git and .github folders
    os.system("find " + dist_path + " -name '.git' -type d -exec rm -rf {} +")
    # remove all .gitignore files
    os.system("find " + dist_path + " -name '.gitignore' -type f -delete")
    # remove all .DS_Store files
    os.system("find " + dist_path + " -name '.DS_Store' -type f -delete")
    # remove /assets/lucice/icons
    os.system("rm -rf " + os.path.join(dist_path, "assets", "lucide", "icons"))
    # remove node_modules
    os.system("rm -rf " + os.path.join(dist_path, "node_modules"))
    #remove dist 
    os.system("rm -rf " + os.path.join(dist_path, "dist"))
    #remove dist.zip
    os.system("rm -rf " + os.path.join(dist_path, "dist.zip"))
    #remove src/assets/lucide/icons
    os.system("rm -rf " + os.path.join(dist_path, "src", "assets", "lucide", "icons"))
    #remove seeder.js
    os.system("rm -rf " + os.path.join(dist_path, "src", "server", "seeder.min.js"))
    
    # remove package-lock.json
    os.system("rm -rf " + os.path.join(dist_path, "package-lock.json"))
    # change package.json "start" script from "cd .. && python3 blog-front-end-editor/dist_compiler.py && python3 blog-front-end-editor/src/assets/lucide/compiler.py && cd blog-front-end-editor && nodemon app.min.js" to "npm i && node start app.min.js"
    with open(os.path.join(dist_path, "package.json"), "r") as f:
        file = f.read()
    with open(os.path.join(dist_path, "package.json"), "w") as f:
        f.write(re.sub(r'"start": "cd .. && python3 blog-front-end-editor/dist_compiler.py && python3 blog-front-end-editor/src/assets/lucide/compiler.py && cd blog-front-end-editor && nodemon app.min.js"', '"start": "npm i && node app.min.js"', file))

def zip_dist():
    global dist_path
    # zip dist folder recursively
    with zipfile.ZipFile(os.path.join(os.getcwd(), "blog-front-end-editor", "dist.zip"), "w", zipfile.ZIP_DEFLATED) as zip:
        for root, dirs, files in os.walk(dist_path):
            for file in files:
                zip.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), os.path.join(dist_path, '..')))
    # remove dist folder
    os.system("rm -rf " + dist_path)
    
def tree():
    global dist_path
    try:
        with open(os.path.join(dist_path, "tree.txt"), "w") as f:
            f.write("")
        os.system("tree " + dist_path + " > " + os.path.join(dist_path, "tree.txt"))
    except:
        with open(os.path.join(dist_path, "tree.txt"), "w") as f:
            for root, dirs, files in os.walk(dist_path):
                level = root.replace(dist_path, '').count(os.sep)
                indent = ' ' * 4 * (level)
                f.write('{}{}/\n'.format(indent, os.path.basename(root)))
                subindent = ' ' * 4 * (level + 1)
                for file in files:
                    print(file)
                    f.write('{}{}\n'.format(subindent, file ))

def fix_tree():
    global dist_path
    tree_path = os.path.join(dist_path, "tree.txt")
    lines = []
    with open(tree_path, "r") as f:
        lines = f.readlines()
    for i in range(len(lines)):
        if "dist" in lines[i]:
            lines[i] = "blog-front-end-editor/dist\n"
        if ".min" in lines[i]:
            lines[i] = lines[i].replace(".min", "")
    with open(tree_path, "w") as f:
        f.writelines(lines)

def copy_tree():
    global src_path, dist_path
    # copy tree.txt from dist_path to src_path
    try:
        os.system("cp " + os.path.join(dist_path, "tree.txt") + " " + os.path.join(src_path, "tree.txt"))
    except:
        lines = []
        with open(os.path.join(dist_path, "tree.txt"), "r") as f:
            lines = f.readlines()
        with open(os.path.join(src_path, "tree.txt"), "w") as f:
            f.writelines(lines)
            
try:
    copy_all()
    tree()
    fix_tree()
    copy_tree()
    zip_dist()
except Exception as e:
    print(e)
    
