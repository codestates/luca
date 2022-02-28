#!/bin/bash
cd /home/ubuntu/luca/luca-server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export SERVER_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_PORT --query Parameters[0].Value | sed 's/"//g')
export SERVER_DOMAIN==$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_DOMAIN --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_PASS==$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_PASS --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_USER==$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_USER --query Parameters[0].Value | sed 's/"//g')
export NAVER_CLIENT_ID==$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export NAVER_REDIRECT_URI==$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export NAVER_CLIENT_SECRET==$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_REST_API_KEY==$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_REST_API_KEY --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_REDIRECT_URI==$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET==$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REST_API_KEY==$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REST_API_KEY --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI==$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_SECRET==$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start server.js
