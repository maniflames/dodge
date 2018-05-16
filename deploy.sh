#!/bin/bash

set -e #quit on error

#sshpass -p $PASS ssh -o StrictHostKeyChecking=no $USERHOST
#echo "Travis got tha power" >> hello.txt
#exit

#Found this gem: https://gist.github.com/nickbclifford/16c5be884c8a15dca02dca09f65f97bd
#I had some struggles tho, this stuff helped me as well
#https://www.ssh.com/ssh/copy-id
#https://docs.travis-ci.com/user/encrypting-files/
#Never run travis encrypt-file with sudo!!

ssh $USER@$HOST <<EOF
  echo "Travis got tha power" >> hello.txt
EOF
