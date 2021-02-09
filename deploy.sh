#!/bin/bash
# sync frontend and middleware to AWS

# set directory vars
echo Setting local variables
dir=$(pwd)
front="$dir/src/frontend/"
middle="$dir/src/middleware/"

libfront="$dir/lib/frontend/"


echo Creating $libfront for publication
echo Compressing javascript
mkdir lib
mkdir lib/frontend
mkdir lib/frontend/js

cp -rf $front/ ./lib/
rm -rf ./lib/frontend/js/*


# minify js before syncing
echo Minifying and compressing javascript
for file in $front'js/'*.js;
	do fn=`basename $file`;
	terser $file --compress --mangle -o $libfront'js/'$fn;
done;

cp $front'js/aws-sdk.min.js' $libfront'js/aws-sdk.min.js'


# need to work on this. 
# change Content-Type: text/javascript
# change Content-Encoding: gzip
# https://medium.com/@graysonhicks/how-to-serve-gzipped-js-and-css-from-aws-s3-211b1e86d1cd
# meta='{"Content-Type":"text/javascript","Content-Encoding":"gzip"}'
# for file in $libfront'js/'*.js;
# 	do gzip -9 $file;
# 	aws s3 cp $file'.gz' s3://jackskrable.com/js/ --metadata $meta
# done;

# sync frontend with s3 bucket
echo Deploying site code to S3 bucket
# aws s3 sync $libfront s3://jackskrable.com/ --exclude='.js' --include='*'
aws s3 sync $libfront s3://jackskrable.com/

# Check for photo changes?
echo Transforming and syncing photos with $middle'transformPhotos.sh'
bash $middle'transformPhotos.sh'

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
# remove src*
echo Cleaning up
rm -r package.zip
rm -r ./lib/

echo Resetting cloudfront cache
aws cloudfront create-invalidation --distribution-id E2JNU6169MIV0T --paths "/*"



