#!/bin/bash
# sync frontend and middleware to AWS

# set directory vars
dir=$(pwd)
front="$dir/src/frontend/"
middle="$dir/src/middleware/"

# sync frontend with s3 bucket
aws s3 sync $front s3://jackskrable.com/

# zip up middleware function
cd ./src/middleware
zip "$dir/package" processContactForm.py
cd $dir

# update lambda
aws lambda update-function-code\
 --function-name processContactForm\
 --zip-file "fileb://$dir/package.zip"\
 --region 'us-east-1'

# remove zipped middleware
rm package.zip -rf
