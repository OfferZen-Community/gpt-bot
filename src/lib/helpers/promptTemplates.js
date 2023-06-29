import {
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
    MessagesPlaceholder
} from "langchain/prompts";

export const promptMemoryTemplate = (memoryKey, humanPromptKey, systemPrompt) => {
    return ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(systemPrompt),
        new MessagesPlaceholder(memoryKey),
        HumanMessagePromptTemplate.fromTemplate(`{${humanPromptKey}}`),
    ])
}

export const promptTemplate = (humanPromptKey, systemPrompt) => {
    return ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(systemPrompt),
        HumanMessagePromptTemplate.fromTemplate(`{${humanPromptKey}}`),
    ])
}