#!/usr/bin/python
import sys
import subprocess
import os
import json
import time

prev = 0
current = 0

path = "./media"
picPath = "./api/static/shot.jpg"
print "Running...path: " + path

while (1):
	## reload the status from disk
	print "Check grill status..."
	f = open("status.json")
	status = json.load(f)
	print "Status: " + str(status)

	## read status from JSON data
	grillLid = status['lid'] ### "open" or "closed"
	grillRotisserie = status['rotisserie'] ### "on" or "off"
	grillBurner = status['burner'] ### or "high", "med" or "low"
	
	### compose filename for correct video
	grillVideo = "grill_" + grillLid + "_" + grillRotisserie + "_" + grillBurner + ".m4v"
	grillVideoPath = os.path.join(path, grillVideo)
	print "Playing: " + grillVideoPath

	### a = subprocess.Popen( [ "omxplayer"	, "-o", "hdmi", grillVideoPath ] )
	current = subprocess.Popen( [ "omxplayer", "--win", "50 250 1000 750", grillVideoPath ], stdin=subprocess.PIPE,  stdout=subprocess.PIPE )
	print "Playback Procees: " + str(current.pid)

	### splitting the sleep allows the process to shutdown gracefully
	time.sleep(1) #all videos are about 5 seconds long so sleep and leave 1 second overlap

	#picProc = subprocess.Popen( [ "fswebcam", "-D", "1", picPath ], stdin=subprocess.PIPE,  stdout=subprocess.PIPE )
	time.sleep(3.1) #all videos are about 5 seconds long so sleep and leave 1 second overlap
