# iPaaS Integration Hub Web Tools

This repository holds the code for an [AWS S3 static site](http://buaws-ipaas-sandbox.s3-website-us-east-1.amazonaws.com/index.html) that allows for interaction with the iPaaS team's integrations. **The site is currently only accessible through the dbreport VPN.**

Deployment is automated through git hooks. When any push is made, GitHub sends a POST to a SnapLogic pipeline. Pushes to the dev branch move code from dev to the [sandbox S3 site](http://buaws-ipaas-sandbox.s3-website-us-east-1.amazonaws.com/index.html) and move SnapLogic helper pipelines to the BUDev protected area. Pushed to the test branch move code from test to the [test S3 site](http://buaws-ipaas-sandbox.s3-website-us-east-1.amazonaws.com/index.html) and move SnapLogic helper pipelines to BUtest. Same for pushes to master and BUProd.

**Code review is required before pushes to any of these branches.** Please do not commit directly to the dev, test, or master branch. Develop on your own branch and submit a pull request to **dev**. The team will review and merge to **dev**, which will kick off the deployment process. PRs for **test** and **master** will be handled more formally before releases.
