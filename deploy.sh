#!/bin/bash

set -e #quit on error

sshpass -p $PASS ssh $USERHOST
echo "Travis got tha power" >> hello.txt