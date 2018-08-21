#!/bin/bash
cd /var/api
npm install
pm2 stop index
pm2 delete index
