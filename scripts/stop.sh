source /home/ec2-user/.bash_profile
#!/bin/bash
cd /home/ubuntu/luca/luca-server
pm2 stop index.js 2> /dev/null || true
pm2 delete index.js 2> /dev/null || true
