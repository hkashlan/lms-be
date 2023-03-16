#!/bin/bash

cd ../manazel-alabrar-fe/ && ./build-dist.sh
cd ../lms-be && docker-compose -f docker-compose-prod.yml up -d
