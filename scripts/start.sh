source /home/ec2-user/.bash_profile
#!/bin/bash
cd /home/ubuntu/luca/luca-server
authbind --deep pm2 start index.js
