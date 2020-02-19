



aws s3 sync ./src/frontend/ s3://jackskrable.com/

zip package ./src/middleware/processContactForm.py

aws lambda update-function-code\
 --function-name processContactForm\
 --zip-file fileb://./src/package.zip\
 --region 'us-east-1'

rm ./src/package.zip -rf

