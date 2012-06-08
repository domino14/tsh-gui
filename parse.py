import os

tourneydir = os.path.expanduser("~/tsh/mytest")
divisions = {}
f = open(tourneydir + '/config.tsh')
for line in f:
    if line.startswith("#"): continue
    if line.startswith('division '):
        div = line.split()
        divisions[div[1]] = div[2]

f.close()
print divisions
parseDiv('a')

def parseDiv(div):
    f = open(tourneydir + '/' + divisions[div])
    for line in f:
        info = line.split(';')
