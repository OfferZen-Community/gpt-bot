
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OPEN_AI_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { conversationChain } from '$lib/helpers/chains';
import { promptTemplate } from '$lib/helpers/promptTemplates'

const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: OPEN_AI_TOKEN,
    streaming: true,
    temperature: 0.7 }
);

export async function POST({ request }) {
    try {
        //Get the response from the POST request
        const human = await request.json()

        //Accept a human response keyword. Can be anything
        //Accepts an initial system response to give additional context to the LLM on how it should respond.
        const initialPrompt = promptTemplate('input', 'You are a software developer, tasks with helping other developer answering questions')
        const chain = conversationChain(initialPrompt, llm)

        let response = await chain.call(
            { input: human.prompt },
            [
                {
                async handleLLMNewToken(token) {
                    //Stream responses here
                    //Plugin a websocket service like Supabase
                },
                },
            ]
        );

        //Logs response from LLM
        console.log(response)
        return json({status: 200, message: response.response})
    } catch( error ) {
        console.log(error)
        return json({ status: 500, message: 'I am unable to process the request at this time. Please try again.' })
    }
}