#!/bin/bash
# batch process photos for serving

sp="/-\|"
sc=0
spin() {
   printf "\b${sp:sc++:1}"
   ((sc==${#sp})) && sc=0
}
endspin() {
   printf "\r%s\n" "$@"
}


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
	do spin;
	convert $file -resize 2000 'upload/'$file;
done
endspin
echo Creating thumbs for upload...
for file in *.jpg
	do spin;
	convert $file -resize 300 'upload/thumbs/'$file;
done
endspin

# echo Clearing asset bucket...
# aws s3 rm s3://jackskrable-site-assets/photos/ --include='*' --recursive
echo Syncing photo assets...
aws s3 sync ./upload s3://jackskrable-site-assets/photos/ --include='*'

echo Cleaning up...
cd $start
# rm -rf ./src/middleware/photos/backup
rm -rf ./src/middleware/photos/upload

