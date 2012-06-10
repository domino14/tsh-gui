import os
import json
from django.conf import settings
tourneydir = os.path.expanduser(settings.TOURNEY_DIRECTORY)

def parseDivs():
    divisions = {}
    # parse the config.tsh
    f = open(tourneydir + '/config.tsh')
    for line in f:
        if line.startswith("#"): continue
        if line.startswith('division '):
            div = line.split()
            divisions[div[1]] = {'file': div[2],
                                 'players': {}}

    f.close()

    # now parse each division

    # TODO IMPORTANT -- this does not handle two first names correctly (Maria, Julie Ellen) or Winter's singular name
    for div in divisions:
        f = open(tourneydir + '/' + divisions[div]['file'])
        pn = 1
        for line in f:
            info = line.split(';')
            # extract name
            firstfield = info[0]
            ff = firstfield.split(',')
            # this will be split into 2, the first part will contain the last name,
            # the second part contains the first name, rating, and any pairings
            # e.g. line looks like del solar, cesar    1915 11 8 5; .....
            last = ff[0]
            sf = ff[1].split()
            first = sf[0]
            rating = sf[1]
            pairings = sf[2:]

            # now figure out if there are scores!
            if len(info) > 1:
                scores = info[1].split()

            # everything afterwards can be ignored and written back to the file verbatim
            if len(info) > 2:
                extradata = ';'.join(info[2:])
            else:
                extradata = None
            divisions[div]['players'][pn] = {'name': ', '.join([last, first]),
                                             'rating': rating,
                                             'pairings': pairings,
                                             'scores': scores,
                                             'extradata': extradata}
            pn += 1
        f.close()

    return divisions


