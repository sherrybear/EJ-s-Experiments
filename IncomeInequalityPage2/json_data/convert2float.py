import json

filename = 'quintile.json'
f = open(filename, 'r')
js = json.load(f)
for d in js:
    for key in d.keys():
        try:
            d[key] = int(d[key])
        except:
            pass

fo = open(filename + ".num", 'w')
json.dump(js, fo)

