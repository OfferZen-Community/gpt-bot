import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

//Conversation chain without memory
export const conversationChain = (prompt, llm) => {
    return new ConversationChain({
        prompt,
        llm
    });
}

//Conversation chain with memory
export const memoryConversationChain = (prompt, llm, memoryKey = 'history') => {
    return new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey}),
        prompt,
        llm
    });
}