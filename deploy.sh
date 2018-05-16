#!/bin/bash

set -e #quit on error

sshpass -p $PASS ssh -o StrictHostKeyChecking=no  $USERHOST
echo "Travis got tha power" >> hello.txt