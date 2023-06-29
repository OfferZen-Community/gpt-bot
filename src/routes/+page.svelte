<script>
    import '../assets/styles/styles.css';

    let prompt = ''
    let conversation = []

    let loading = false

    $ : prompt
    $ : conversation

    async function chat() {

        try {
            loading = true

            conversation = [...conversation, {
                type: 'user',
                text: prompt
            }]

            const response = await fetch('/api/chatbot', {
                method: 'POST',
                body: JSON.stringify({
                    prompt
                })
            })

            prompt = ''

            const d =  await response.json()
            if(d.message) {
                loading = false
                conversation = [...conversation, {
                    type: 'bot',
                    text: d.message
                }]
            }
        } catch (error) {
            conversation = [...conversation, {
                type: 'bot',
                text: 'Oops. It seems like something has gone wrong with processing your request'
            }]
        }
    }

    const scrollToBottom = node => {
        const scroll = () => node.scroll({
            top: node.scrollHeight,
            behavior: 'smooth',
        });
        scroll();

        return { update: scroll }
    };


</script>

<div class="botcontent">
    <div class="content">
        <h1>Ask our Zen AI.</h1>
        <p class="content__paragraph">Do note that our AI model is still experimental. All answers the AI provides should be considered experimental.</p>
    </div>
    <div class="conversation-container" use:scrollToBottom={conversation}>
        {#each conversation as message}
            <div
                class:bot={message.type === 'bot'}
                class:user={message.type === 'user'}
                class="conversation-container__response"
            >
                <span>{@html message.text}</span>
            </div>
        {/each}
        {#if loading}
            <div class="bot loading-container">
                <div class="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        {/if}
    </div>
    <form method="POST" on:submit|preventDefault={chat} class="form">
        <label for="question">Your question</label>
        <input type="text" name="question" id="question" placeholder="Send a message" bind:value={prompt}/>
        <button type="submit"><img src="https://cdn.offerzen.com/505422060/assets.website-files.com/5e8b2955eaa7857dbbd850ad/61016091f0f03358184b9135_Vector%202.svg"/></button>
    </form>
</div>
