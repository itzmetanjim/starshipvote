chrome.runtime.onMessage.addListener((message, sender, send)=>{
    (async (message, _sender, send) => {
        try{
            if (message.action === "redirect") {
                try {
                    const response=await fetch(message.url, { method: 'HEAD' })
                    send(response.url)
                } catch (error) {
                    send(message.url)
                }
            }
        }catch{}
    })(message, sender, send)
    return true
});
