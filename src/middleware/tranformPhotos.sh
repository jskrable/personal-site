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
for file in *.jpg; convert -verbose $file -resize 200 'upload/thumbs/'$file;


