/*  config.js
    jack skrable
    02-12-2020
    hold configuration info for the site
*/


function siteInfo() {

    var info = {
        "domain": "jackskrable.com",
        "title": "Jack Skrable's Personal Site",
        "author": "Jack Skrable",
        "email": "j.skrable@gmail.com",
        "bio": [
            "A data engineer and integration developer with 6 years of professional experience building and using ETL processes and RESTful APIs. Recently completed a Master's degree in Computer Science taking classes part-time, with a focus on machine learning, big data processing, and cryptography.",
            "Likes to take photos, cook, hike, tinker around on the computer (currently experimenting with Manjaro), play basketball, and go to concerts (please go away COVID).",
            "This site was built to experiment with creating a reusable template for a personal portfolio website. All the details are stored in a simple, configurable JSON document.",
            "Take a look around!"
        ],
        "socials": {
            "github": "https://github.com/jskrable",
            "linkedin": "https://www.linkedin.com/in/jackskrable/"
        },
        "sections": [
            "Projects",
            "Photos",
            "Contact"
        ],
        "images": {
            "home": "css/images/tower.jpg",
            "headshot": "css/images/headshot.jpg",
            "portfolio": "photos/"
        },
        "aws": {
            "region": "us-east-1",
            "cognito": {
                "poolID": "us-east-1:67de684f-034b-4fa9-a22a-ad307422b6b0"
            },
            "s3": {
                "site": "jackskrable.com",
                "assets": "jackskrable-site-assets"
            },
            "lambda": {
                "contact": "processContactForm",
                "listAssets": "listS3Objects"
            }
        },
        "projects": [{
            "title": "the-sea",
            "description": "An interactive application that mimics fish schooling behavior built in Java using the Processing library. Uses a genetic algorithm to train the fish to school better and avoid a predator object that roams searching for a meal."
        }, {
            "title": "music-rec",
            "description": "A music recommendation model, built with Keras, TensorFlow, and Flask. Uses a deep-learning neural network to categorize songs and pick a recommendation based on user input listening history."
        }, {
            "title": "cryptography",
            "description": "Custom cryptographic library in base Python 3.7. Includes classes for El Gamal and RSA, each with functions for encrypting, decrypting, and breaking. Breaking methods used are Pollard's Rho and baby step giant step."
        }, {
            "title": "tsp",
            "description": "A solution to the travleing salesman problem using simulated annealing, built in base Python 3.7."
        }, {
            "title": "sarcasm-detection",
            "description": "A binary classifier built in PySpark that categorizes news headlines into two categories, satire or genuine. Uses multiple machine learning algorithms and evaluates the performance of each. Algorithms include random forest, naive Bayes, and support vector machine."
        }, {
            "title": "custom-shell",
            "description": "A custom shell for Unix systems written in C."
        }, {
            "title": "personal-site",
            "description": "This website. It was built to experiment with creating a personal portfolio site template configurable (mostly) by a simple JSON document. Created with basic JS and Bootstrap 4.0."
        }, {
            "title": "biden-stance",
            "description": "A twitter bot that scrapes the long congressional voting history of Joe Biden and posts a random stance. Uses AWS Lambda and Python 3.6."
        }]
    };

    return info;
}