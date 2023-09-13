const  OpenAIApi  = require('openai');
require("dotenv").config();
const { AbortController } = require('abort-controller'); 

const openai = new OpenAIApi({
    apiKey: process.env.API_KEY,
});

async function convertCode(code,language) {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;
 
    const response=await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[{"role":"user","content":`Translate the following code to ${language}:\n\n${code}`}],
        max_tokens:4000,
        signal
    });

    return response.choices[0].message;
}

async function debugCode(code) {

    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;
   
    const response=await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[{"role":"user","content":`Debug the following code:\n\n${code} \n \n if there is any issue with the code write what is the issue and correct it and show the correct code`}],
        max_tokens:4000,
        signal
    });

    return response.choices[0].message;
}

async function checkCodeQuality(code) {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;
   
    const response=await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[{"role":"user","content":`Check the quality of the following code:\n\n${code}\n give strong code if the code quality is poor`}],
        max_tokens:4000,
        signal
    });

    return response.choices[0].message;
}

module.exports = { convertCode, debugCode, checkCodeQuality };
