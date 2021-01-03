#!/bin/bash
# sync frontend and middleware to AWS

start=$PWD
backup='backup'
upload='upload'

echo Changing to photo directory...
cd ./src/middleware/photos
# mkdir backup
# cp *.jpg -rf ./backup
mkdir ./upload
mkdir ./upload/thumbs

# for file in *.jpg; magick identify $file; 

echo Converting to 2000x1333 for upload...
for file in *.jpg
	do convert -verbose $file -resize 2000 'upload/'$file
done
echo Creating thumbs for upload...
for file in *.jpg
	do convert -verbose $file -resize 300 'upload/thumbs/'$file
done

# echo Clearing asset bucket...
# aws s3 rm s3://jackskrable-site-assets/photos/ --include='*' --recursive
echo Syncing photo assets...
aws s3 sync ./upload s3://jackskrable-site-assets/photos/ --include='*'

echo Cleaning up...
cd $start
rm -rf ./src/middleware/photos/backup
rm -rf ./src/middleware/photos/upload

