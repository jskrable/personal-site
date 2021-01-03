#!/bin/bash
# sync frontend and middleware to AWS

# set directory vars
echo Setting local variables
dir=$(pwd)
front="$dir/src/frontend/"
middle="$dir/src/middleware/"

# sync frontend with s3 bucket
echo Deploying site code to S3 bucket
aws s3 sync $front s3://jackskrable.com/

# ADD PHOTOS FUNCTION HERE
echo Transforming and syncing photos with $middle'transformPhotos.sh'
'.'$middle'transformPhotos.sh'

# zip up middleware function
echo Zipping lamba functions
cd ./src/middleware
zip "$dir/package" processContactForm.py
cd $dir

# update lambda
echo Deploying lamba functions
aws lambda update-function-code\
 --function-name processContactForm\
 --zip-file "fileb://$dir/package.zip"\
 --region 'us-east-1'

# remove zipped middleware
echo Cleaning up
rm package.zip -rf

echo Resetting cloudfront cache
aws cloudfront create-invalidation --distribution-id E2JNU6169MIV0T --paths "/*"

