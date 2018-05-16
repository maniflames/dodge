#!/bin/bash

set -e #quit on error

sshpass -p ${PASS} ssh ${USER}@${HOST}
echo "Travis got tha power" >> hello.txt