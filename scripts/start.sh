#!/bin/bash
cd /home/ubuntu/luca/luca-server

export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js
