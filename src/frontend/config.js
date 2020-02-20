/*  config.js
    jack skrable
    02-12-2020
    hold configuration info for the site
*/


function siteInfo() {

	var info = {
		    "title": "Jack Skrable's Personal Site",
		    "author": "Jack Skrable",
		    "email": "j.skrable@gmail.com",
		    "bio": "BIO BIO BIO bio bio bio BIO BIO BIO bio bio bio BIO BIO BIO bio bio bio BIO BIO BIO bio bio bio BIO BIO BIO bio bio bio BIO BIO BIO bio bio bio BIO BIO BIO bio bio bio",
		    "socials": {
		        "github": "https://github.com/jskrable",
		        "linkedin": "https://www.linkedin.com/in/jackskrable/"
		    },
		    "sections": [
		        "About",
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
		    		"site": "s3://jackskrable.com",
		    		"assets": "s3://jackskrable-site-assets"
		    	},
		    	"lambda": {
		    		"contact": "processContactForm"
		    	}
		    }
		};
	
	return info;
}