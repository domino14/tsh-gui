# Create your views here.
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext
from base.parse import parseDivs
import json
def home(request):
    divisions = parseDivs()
    return render_to_response('base/index.html', {'divisions': json.dumps(divisions)},
                            context_instance=RequestContext(request))

def getTshConfig(request):
    divisions = parseDivs()
    # this is the ajax view that parses the file properly
    return HttpResponse(json.dumps(divisions), mimetype="text/javascript")