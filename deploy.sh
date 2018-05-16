#!/bin/bash

sshpass -p ${PASS} ssh ${USER}@${HOST}
echo "Travis got tha power" >> hello.txt