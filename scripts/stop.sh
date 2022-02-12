#!/bin/bash
cd /home/ubuntu/luca/luca-server
pm2 stop index.js 2> /dev/null || true
<<<<<<< HEAD
pm2 delete index.js 2> /dev/null || true
=======
pm2 delete index.js 2> /dev/null || true
>>>>>>> 53496c735aa0e8a6b5e32e30d6b734ef246ade36
