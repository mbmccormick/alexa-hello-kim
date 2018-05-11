// Import the Alexa SDK. 
// You can find the documentation for the node.js SDK here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs.
const Alexa = require("ask-sdk-core");

// This is the LaunchRequest handler.
// The LaunchRequest is the the default request for all Alexa skills.
// This request is called whenever you say "Alexa, open Hello Kim" and do not specify an intent.
const LaunchRequestHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle(handlerInput) {
        // We want this handler to handle the LaunchRequest request type.
        // You can find the documentation for requests here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Request Handler for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing
        return handlerInput.requestEnvelope.request.type === "LaunchRequest";
    },
    // Here we actually handle the request.
    handle(handlerInput) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling LaunchRequest");

        // Build the response.
        // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
        return handlerInput.responseBuilder
            // Here we make Alexa speak a phrase.
            .speak("Hi Mom! Happy Mother's Day! We made this Hello Kim code sample to show you how to develop skills for Alexa using node.js. Here are some things this skill can do: play coffee shop sounds, display a picture, share some coffee facts, and send you the source code. Which one would you like?")
            // And here we tell Alexa two things: (1) we are expecting a response from the user and (2) if the user doesn't respond after a few seconds, speak the following phrase.
            .reprompt("Please choose coffee shop sounds, picture, coffee facts, or source code.")
            // And finally we generate the response that this handler will return for this Alexa request.
            .getResponse();
    },
};

// This is an IntentRequest handler.
// The IntentRequest is the the request is used for all other skill intents.
// This request is called whenever you say "Alexa, ask Hello Kim for coffee shop sounds" or any of the other sample phrases defined for the AUDIO intent in your interaction model.
// This request is also called whenver you say "Alexa, resume", "Alexa, next", or "Alexa, previous", all of which are considered built-in intents.
const AudioRequestHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle(handlerInput) {
        // We want this handler to handle the IntentRequest request type, but only for the AUDIO intent.
        // You can find the documentation for requests here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Request Handler for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            (handlerInput.requestEnvelope.request.intent.name === "AUDIO" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.ResumeIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.NextIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.PreviousIntent");
    },
    // Here we actually handle the request.
    handle(handlerInput) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling " + handlerInput.requestEnvelope.request.intent.name);

        // Build the response.
        // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
        return handlerInput.responseBuilder
            // Here we make Alexa speak a phrase.
            .speak("OK, now playing coffee shop sounds.")
            // And here we tell Alexa to play an audio file. 
            // You can find the documentation for the audio player here: https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html.
            .addAudioPlayerPlayDirective("REPLACE_ALL", "https://coffitivity.com/assets/sounds/full/mp3/morning-murmur.mp3", "Morning Murmur", 0)
            // And finally we generate the response that this handler will return for this Alexa request.
            .getResponse();
    },
};

// This is an IntentRequest handler.
// The IntentRequest is the the request is used for all other skill intents.
// This request is called whenever you say "Alexa, ask Hello Kim for a picture" or any of the other sample phrases defined for the PICTURE intent in your interaction model.
const PictureRequestHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle(handlerInput) {
        // We want this handler to handle the IntentRequest request type, but only for the PICTURE intent.
        // You can find the documentation for requests here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Request Handler for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "PICTURE";
    },
    // Here we actually handle the request.
    handle(handlerInput) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling " + handlerInput.requestEnvelope.request.intent.name);

        // This request will display an image, but we only want to do that if the user's Echo device supports displaying images.
        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display) {
            // Build the response.
            // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
            // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
            return handlerInput.responseBuilder
                // Here we tell Alexa to display an image. 
                // You can find the documentation for the template renderer here: https://developer.amazon.com/docs/custom-skills/display-interface-reference.html.
                .addRenderTemplateDirective({
                    type: "BodyTemplate7",
                    token: "Coffee Picture",
                    backButton: "VISIBLE",
                    title: "Coffee Picture",
                    backgroundImage: null,
                    image: {
                        contentDescription: "A small cup of coffee.",
                        sources: [
                            {
                                url: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
                            }
                        ]
                    }
                })
                // And here we make Alexa speak a phrase.
                .speak("OK, here's a coffee picture.")
                // And finally we generate the response that this handler will return for this Alexa request.
                .getResponse();
        }
        // If the user's Echo device doest not support displaying images, we offer a different response.
        else {
            // Build the response.
            // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
            // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
            return handlerInput.responseBuilder
                // Here we make Alexa speak a phrase.
                .speak("Sorry, it doesn't look like your device supports displaying images. Try asking me again from an Echo Show or Echo Spot device.")
                // And finally we generate the response that this handler will return for this Alexa request.
                .getResponse();
        }
    },
};

// This is an IntentRequest handler.
// The IntentRequest is the the request is used for all other skill intents.
// This request is called whenever you say "Alexa, ask Hello Kim for coffee facts" or any of the other sample phrases defined for the FACTS intent in your interaction model.
const FactsRequestHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle(handlerInput) {
        // We want this handler to handle the IntentRequest request type, but only for the FACTS intent.
        // You can find the documentation for requests here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Request Handler for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "FACTS";
    },
    // Here we actually handle the request.
    handle(handlerInput) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling " + handlerInput.requestEnvelope.request.intent.name);

        // Define our array of coffee facts.
        var data = [
            "Shepherds discovered coffee in Ethiopia circa 800 A.D.",
            "Coffee is the second most traded commodity on earth.",
            "In Italian espresso means \"when something is forced out.\"",
            "Coffee was the first food to be freeze-dried.",
            "There are two types of coffee beans: Arabica and Robusta."
        ];

        // Generate a random number based on the size of the array.
        var index = Math.floor(Math.random() * (data.length));

        // Select the random fact from the array.
        var fact = data[index];

        // Build the response.
        // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
        return handlerInput.responseBuilder
            // Here we make Alexa speak a phrase.
            .speak("OK, here's a coffee fact: " + fact)
            // And finally we generate the response that this handler will return for this Alexa request.
            .getResponse();
    },
};

// This is an IntentRequest handler.
// The IntentRequest is the the request is used for all other skill intents.
// This request is called whenever you say "Alexa, ask Hello Kim for the source code" or any of the other sample phrases defined for the SOURCECODE intent in your interaction model.
const SourceCodeRequestHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle(handlerInput) {
        // We want this handler to handle the IntentRequest request type, but only for the SOURCECODE intent.
        // You can find the documentation for requests here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Request Handler for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "SOURCECODE";
    },
    // Here we actually handle the request.
    handle(handlerInput) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling " + handlerInput.requestEnvelope.request.intent.name);

        // Build the response.
        // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
        return handlerInput.responseBuilder
            .withSimpleCard("Source Code", "https://github.com/mbmccormick/alexa-hello-kim")
            // Here we make Alexa speak a phrase.
            .speak("OK, I sent a card with a link to the source code to your Alexa app.")
            // And finally we generate the response that this handler will return for this Alexa request.
            .getResponse();
    },
};

// This is an IntentRequest handler.
// The IntentRequest is the the request is used for all other skill intents.
// This request is called whenever you say "Alexa, ask Hello Kim for help" and is considered a built-in intent.
const HelpRequestHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle(handlerInput) {
        // We want this handler to handle the IntentRequest request type, but only for the built-in AMAZON.HelpIntent intent.
        // You can find the documentation for requests here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Request Handler for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
    },
    // Here we actually handle the request.
    handle(handlerInput) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling " + handlerInput.requestEnvelope.request.intent.name);

        // Build the response.
        // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
        return handlerInput.responseBuilder
            // Here we make Alexa speak a phrase.
            .speak("Here are some things this skill can do: play coffee shop sounds, display a picture, share some coffee facts, and send you the source code. Which one would you like?")
            // And here we tell Alexa two things: (1) we are expecting a response from the user and (2) if the user doesn't respond after a few seconds, speak the following phrase.
            .reprompt("Please choose coffee shop sounds, picture, coffee facts, or source code.")
            // And finally we generate the response that this handler will return for this Alexa request.
            .getResponse();
    },
};

// This is an IntentRequest handler.
// The IntentRequest is the the request is used for all other skill intents.
// This request is called whenever you say "Alexa, cancel", "Alexa, stop", or "Alexa, pause", all of which are considered built-in intents.
const StopRequestHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle(handlerInput) {
        // We want this handler to handle the IntentRequest request type, but only for the built-in AMAZON.CancelIntent, AMAZON.StopIntent, and AMAZON.PauseIntent intents.
        // You can find the documentation for requests here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Request Handler for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing
        return handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent" ||
                handlerInput.requestEnvelope.request.intent.name === "AMAZON.PauseIntent");
    },
    // Here we actually handle the request.
    handle(handlerInput) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling " + handlerInput.requestEnvelope.request.intent.name);

        // Build the response.
        // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
        return handlerInput.responseBuilder
            // Here we tell Alexa to stop playing audio, if any is playing. 
            // You can find the documentation for the audio player here: https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html.
            .addAudioPlayerStopDirective()
            // And here we tell Alexa to clear the audio queue, if there is anything in it. 
            .addAudioPlayerClearQueueDirective("CLEAR_ALL")
            // And here we make Alexa speak a phrase.
            .speak("OK, goodbye!")
            // And finally we generate the response that this handler will return for this Alexa request.
            .getResponse();
    },
};

// This is the ErrorHandler handler.
// The ErrorHandler handles all other requests to your skill which do not otherwise have a handler.
// This request is also called if your skill encounters an unexpected error.
const ErrorHandler = {
    // Here we define the types of Alexa requests that this handler should handle.
    canHandle() {
        // We want this handler to handle all other request types, so return true.
        return true;
    },
    // Here we actually handle the request.
    handle(handlerInput, error) {
        // Log a message to the console.
        // These messages get logged to the Log Groups in CloudWatch on AWS.
        console.log("Handling error: " + error.message);

        // Build the response.
        // You can find the documentation for responses here: https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html.
        // And you can find specific documentation on the Response Builder for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building.
        return handlerInput.responseBuilder
            // Here we make Alexa speak a phrase.
            .speak("Sorry, an error occurred. If you need help, just ask for help.")
            // And finally we generate the response that this handler will return for this Alexa request.
            .getResponse();
    },
};

// Initialize the Custom Skill Builder.
// You can find the documentation for Custom Skills here: https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html.
// And you can find specific documentation on the Skill Builders for node.js here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Skill-Builders.
const skillBuilder = Alexa.SkillBuilders.custom();

// Build the Alexa skill.
exports.handler = skillBuilder
    // Here we add all of the request handlers that we defined above.
    .addRequestHandlers(
        LaunchRequestHandler,
        AudioRequestHandler,
        PictureRequestHandler,
        FactsRequestHandler,
        SourceCodeRequestHandler,
        HelpRequestHandler,
        StopRequestHandler
    )
    // And here we add the error handler that we defined above.
    .addErrorHandlers(
        ErrorHandler
    )
    // And finally we generate the Lambda function that AWS will use to handle requests from Alexa.
    .lambda();
