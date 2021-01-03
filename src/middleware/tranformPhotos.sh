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
for file in *.jpg; convert -verbose $file -resize 2000 'upload/'$file;
echo Creating thumbs for upload...
for file in *.jpg; convert -verbose $file -resize 300 'upload/thumbs/'$file;

echo Clearing asset bucket...
aws s3 rm s3://jackskrable-site-assets/photos/ --include='*' --dryrun --recursive
echo Syncing photo assets...
aws s3 sync ./upload s3://jackskrable-site-assets/photos/ --include='*' --dryrun

echo Cleaning up...
cd $start
rm -rf ./src/middleware/photos/backup
rm -rf ./src/middleware/photos/backup

