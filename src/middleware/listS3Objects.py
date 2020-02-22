#!/usr/bin/env python3
# coding: utf-8
"""
title: listS3Objects.py
date: 02-22-2020
author: jskrable
description: lambda function to list all objects under an S3 path
"""

import json
import boto3

def lambda_handler(event, context):
    """
    handles request to the lambda function from frontend. parses json request
    and sends to update_table function.
    """
    bucket = event['bucket']
    path = event['path']
    response = list_all_objects(bucket, path)
    # ACTUALLY USE RESPONSE HERE TO RETURN AN ERROR IF OCCURS
    return {
        'statusCode': 200,
        'body': json.dumps(response)} 


def list_all_objects(bucket, path):
    """
    retrieves all objects under path as a list.
    """
    s3 = boto3.client('s3', region_name='us-east-1')
    kwargs = {'Bucket': bucket, 'Prefix': path}
    response = s3.list_objects_v2(**kwargs)
    return [x['Key'] for x in response['Contents']]
