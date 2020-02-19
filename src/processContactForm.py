#!/usr/bin/env python3
# coding: utf-8
"""
title: processContactForm.py
date: 02-18-2020
author: jskrable
description: lambda function to process contact form submissions
"""

import json
import boto3
import datetime


def lambda_handler(event, context):

    submission = event['submission']

    update_table(submission)

    response = "Successful submission"

    return {
        'statusCode': 200,
        'body': json.dumps(response)} 


# HANDLE ERRORS HERE
def update_table(submission):

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    history = dynamodb.Table('jackskrable.com-contact')

    # need to create SubmissionId
    item = {
        'SubmissionTime': str(datetime.datetime.now()),
        'SubmissionBody': submission
    }

    history.put_item(
        Item = item
    )