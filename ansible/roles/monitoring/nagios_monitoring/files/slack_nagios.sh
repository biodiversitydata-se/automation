#!/bin/bash

# This script is used by Nagios to post alerts into a Slack channel
# using the Incoming WebHooks integration. Create the channel, botname
# and integration first and then add this notification script in your
# Nagios configuration.
#
# All variables that start with NAGIOS_ are provided by Nagios as 
# environment variables when an notification is generated.
# A list of the env variables is available here: 
#   http://nagios.sourceforge.net/docs/3_0/macrolist.html
#
# More info on Slack
# Website: https://slack.com/
# Twitter: @slackhq, @slackapi
#
# My info
# Website: http://matthewcmcmillan.blogspot.com/
# Twitter: @matthewmcmillan

#Modify these variables for your environment
MY_NAGIOS_HOSTNAME="th.hq.altrusoft.se"
SLACK_HOSTNAME="altrusoft.slack.com"
SLACK_TOKEN="rrhm1XKrkoNLYil0z7xzTaW0"
SLACK_CHANNEL="#nagios"
SLACK_BOTNAME="Nagios"


#Set the message icon based on Nagios service state
if [ "$NAGIOS_SERVICESTATE" = "CRITICAL" ]
then
    ICON=":exclamation:"
elif [ "$NAGIOS_SERVICESTATE" = "WARNING" ]
then
    ICON=":warning:"
elif [ "$NAGIOS_SERVICESTATE" = "OK" ]
then
    ICON=":white_check_mark:"
elif [ "$NAGIOS_SERVICESTATE" = "UNKNOWN" ]
then
    ICON=":question:"
else
    ICON=":white_medium_square:"
fi

#Send message to Slack
curl -X POST --data "payload={\"channel\": \"${SLACK_CHANNEL}\", \"username\": \"${SLACK_USERNAME}\", \"text\": \"${ICON} HOST: ${NAGIOS_HOSTNAME}   SERVICE: ${NAGIOS_SERVICEDISPLAYNAME}     MESSAGE: ${NAGIOS_SERVICEOUTPUT} <https://${MY_NAGIOS_HOSTNAME}/cgi-bin/nagios3/status.cgi?host=${NAGIOS_HOSTNAME}|See Nagios>\"}" https://${SLACK_HOSTNAME}/services/hooks/incoming-webhook?token=${SLACK_TOKEN}

