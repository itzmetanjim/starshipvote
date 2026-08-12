chrome.runtime.onMessage.addListener((message, _sender, send) => {
    (async()=>{
        try{
            if(message.action==="redirect"){
                try{
                    const response=await fetch(message.url,{ method:'HEAD'})
                    send(response.url)
                }catch(error){
                    send(message.url)
                }
            }else{
                send({status:"ignored_action"});
            }
        }catch(err){
            send({error:"how did we get here"});
        }
    })();
    return true;
});
