# Hello Kim

Hello Kim is a Hello World code sample that shows you how to develop skills for the Alexa using node.js. This skill can play audio, display a picture, share a fact, and send a card to the Alexa app.

Icon by ProSymbols: [https://thenounproject.com/term/code/800007](https://thenounproject.com/term/code/800007)


## Getting Started

If you have not done so already, you need to install node.js. You can download it here: https://nodejs.org/en/download/

You'll also need an Amazon Developer account. You can sign up for one here: https://developer.amazon.com/alexa/console/ask

And finally, you'll need an Amazon Web Services (AWS) account. You sign up for one here: https://portal.aws.amazon.com/billing/signup


## Alexa SDK Resources

[Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit)

[Build Skills with the Alexa Skills Kit](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)

[Understand Custom Skills](https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html)

[Host a Custom Skill as an AWS Lambda Function](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html)

[Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)


## File Structure

[/assets](https://github.com/mbmccormick/alexa-hello-kim/tree/master/assets)

This folder contains a bunch of static files like the small and large Skill Icons displayed in the Amazon Store. It's not actually used by the Lambda function.

[/assets/icon108.png](https://github.com/mbmccormick/alexa-hello-kim/blob/master/assets/icon108.png)

This is the 108 x 108 pixel Skill Icon for the Amazon Store. This is uploaded to the Alexa Skills Kit Developer Console.

[/assets/icon512.png](https://github.com/mbmccormick/alexa-hello-kim/blob/master/assets/icon512.png)

This is the 512 x 512 pixel Skill Icon for the Amazon Store. This is uploaded to the Alexa Skills Kit Developer Console.

[/assets/noun_800007_cc.png](https://github.com/mbmccormick/alexa-hello-kim/blob/master/assets/noun_800007_cc.png)

This is the Noun Project icon designed by ProSymbols used for the Skill Icons.

[/lambda](https://github.com/mbmccormick/alexa-hello-kim/tree/master/lambda)

This folder contains all of the code for the Lambda function.

[/lambda/custom](https://github.com/mbmccormick/alexa-hello-kim/tree/master/lambda/custom)

This folder contains all of the code for the Lambda function for our Custom Skill. This whole folder, including the `node_modules` folder which is generated when you run `npm install` to install any NPM package dependencies, gets uploaded to the AWS Management Console in one compressed ZIP folder.

[/lambda/custom/index.js](https://github.com/mbmccormick/alexa-hello-kim/blob/master/lambda/custom/index.js)

This is the actual node.js code for the Alexa Skill. The Lambda function in AWS which actually operates the Skill uses this file to respond to requests.

[/lambda/custom/package.json](https://github.com/mbmccormick/alexa-hello-kim/blob/master/lambda/custom/package.json)

This is a standard `package.json` file which defines, among other things, the list of NPM package dependencies. Any NPM packages listed in the `dependencies` section will be installed when you run `npm install` in this directory. More information here: https://docs.npmjs.com/files/package.json

[/models](https://github.com/mbmccormick/alexa-hello-kim/tree/master/models)

This folder contains all of the localized Interaction Models for this skill.

[/models/en-US.json](https://github.com/mbmccormick/alexa-hello-kim/blob/master/models/en-US.json)

This is the Interaction Model for the en-US locale in json format. This file gets uploaded to the Alexa Skills Kit Developer Console and tells Alexa how users will interact with this skill. After defining the Interaction Model, it must be built on the Alexa Skills Kit Developer Console.

[/.gitattributes](https://github.com/mbmccormick/alexa-hello-kim/blob/master/.gitattributes)

This is the `.gitattributes` file. More information here: https://git-scm.com/docs/gitattributes

[/.gitignore](https://github.com/mbmccormick/alexa-hello-kim/blob/master/.gitignore)

This is the `.gitignore` file. More information here: https://git-scm.com/docs/gitignore

[/LICENSE.txt](https://github.com/mbmccormick/alexa-hello-kim/blob/master/LICENSE.txt)

This is the `LICENSE.txt` file for the GNU General Public License (GPL) v3. More information here: https://choosealicense.com

[/README.md](https://github.com/mbmccormick/alexa-hello-kim/blob/master/README.md)

This file!

[/skill.json](https://github.com/mbmccormick/alexa-hello-kim/blob/master/skill.json)

This file is a copy of the skill information as it appears on the Amazon Store. You'll enter this data on the Launch page for the skill on the Alexa Skills Kit Developer Console.


## Deployment

Deploying this Alexa Skill involves four main parts:

**Build the Lambda function locally.**
From the `/lambda/custom/` directory, run `npm install` to install all of the NPM package dependencies. This will create a new directory called `node_modules`. These don't get checked in to the Git repository because it is ignored by the `.gitignore` file. Create a new compressed ZIP file with everything from `/lambda/custom` inside.

**Create the IAM security role in AWS.**
From the [AWS Management Console](https://console.aws.amazon.com/console/home?region=us-east-1), select Security, Identity & Compliance > IAM. Select Roles on the left side, then select Create Role. Select AWS Service, Lambda, and then Next: Permissions. Attach the AWSLambdaBasicExecutionRole policy and then Next: Review. Give this role any name and then select Create Role.

**Create the Lambda function in AWS.**
From the [AWS Management Console](https://console.aws.amazon.com/console/home?region=us-east-1), select Compute > Lambda. Then select New Function. Follow the Author From Scratch guide. Give your function any Name, leave Runtime set to Node.js 6.10, and select the Role you created in the previous section for Role. Then select Create Function. On the next page under Configuration, then Designer, add the Alexa Skills Kit trigger from the left side. Then click on the Alexa Skills Kit block. Set Skill ID Verification to Disable, then select Add. Scroll back up to the Designer section and click on your Lambda function. Scroll down to the Function Code section, change Code Entry Type to Upload A .ZIP File, click on Upload to select the ZIP file you created in the very first section, and finally select Save in the top right. Note the ARN in the top right above the Save button, we'll need this for the next section.

**Create the Skill on the Alexa Skills Kit Developer Console.**
From the [Alexa Skills Kit Developer Console](https://developer.amazon.com/alexa/console/ask), select Create Skill. Give your skill a name, select Next. Then select Custom, and then Create Skill. Follow the Skill Builder Checklist on the right to complete the configuration.

There's also a really great guide which covers each of these steps in detail here: https://github.com/alexa/skill-sample-nodejs-hello-world/blob/master/instructions/1-voice-user-interface.md


## License

This software, and its dependencies, are distributed free of charge and licensed under the GNU General Public License v3. For more information about this license and the terms of use of this software, please review the LICENSE.txt file.


---

Built with ❤️ &nbsp;by Matt & Libby