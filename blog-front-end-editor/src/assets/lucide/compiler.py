import os, re

icons = []

path = os.path.join(os.getcwd(), "blog-front-end-editor", "src", "assets", "lucide", "icons")
for file in os.listdir(path):
    if file.endswith(".svg"):
        icons.append(file)

icons = sorted(icons)
used_icons = []

paths = [os.path.join(os.getcwd(), "blog-front-end-editor", "src", "views"), os.path.join(os.getcwd(), "blog-front-end-editor", "src", "includes")]
for path in paths:
        for file in os.listdir(path):
            try:
                with open(os.path.join(path, file), "r") as f:
                    data = f.read()
                    used_icons += re.findall(r'lu\.i\("(.+?)"\)', data)
                    used_icons += re.findall(r'lu\.i\("(.+?)"', data)
            except IsADirectoryError:
                pass

used_icons = sorted(list(set(used_icons)))

path = os.path.join(os.getcwd(), "blog-front-end-editor/src", "assets", "lucide", "used")
for file in os.listdir(path):
    if not file.startswith("x"):
        os.remove(os.path.join(path, file))

for i in icons: 
    for u in used_icons: 
        u += ".svg"
        if u == i:
            with open(os.path.join(os.getcwd(), "blog-front-end-editor", "src", "assets", "lucide", "icons", i), "r") as f:
                data = f.read()
                if not os.path.exists(os.path.join(path, i)):
                    copy = open(os.path.join(path, i), "w")
                    with copy as c:
                        c.write(data)
                    copy.close()

exit()
        