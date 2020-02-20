#!/usr/bin/env python3
# coding: utf-8
"""
title: processContactForm.py
date: 02-18-2020
author: jskrable
description: lambda function to process contact form submissions
"""

import json
import uuid
import boto3
import datetime


def lambda_handler(event, context):
    """
    handles request to the lambda function from frontend. parses json request
    and sends to update_table function.
    """
    request = json.loads(event)
    submission = request['submission']
    update_table(submission)
    response = "Successful submission"
    return {
        'statusCode': 200,
        'body': json.dumps(response)} 


def update_table(submission):
    """
    adds new entry to dynamoDB table. creates a unique ID and adds timestamp
    of submission. SubmissionBody is a JSON object containing the form submission.
    """
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    history = dynamodb.Table('jackskrable.com-contact')
    item = {
        'SubmissionID': str(uuid.uuid4()),
        'SubmissionTimestamp': str(datetime.datetime.now()),
        'SubmissionBody': submission
    }
    history.put_item(
        Item = item
    )