"use strict"
var demowrapper=0
var repowrapper=0
var scwrapper=0
function switchto(x){
    [demowrapper,repowrapper,scwrapper].forEach((e,i)=>{
        if(i==x){e.style.display="block"
        document.getElementById(`votetswitch-${i}`).style.border="4px solid #fff8d5"
}
        else{e.style.display="none"
            document.getElementById(`votetswitch-${i}`).style.border="2px solid hsla(0,0%,100%,.5)"
}
    })
}
function waitForElement(selector) {
    return new Promise((resolve)=>{
        const element=document.querySelector(selector)
        if(element)return resolve(element)
        const observer=new MutationObserver(()=>{
            const el=document.querySelector(selector)
            if(el){
                observer.disconnect()
                resolve(el)
            }
        })
        observer.observe(document.body, { childList: true, subtree: true })
        const CL=()=>{
            const el=document.querySelector(selector)
            if (el) {
                observer.disconnect()
                resolve(el)
            } else {
                requestAnimationFrame(CL)
            }
        }
        requestAnimationFrame(CL)
    })
}
function hoverin(x){
    x.style.backgroundColor="#fff8d5"
    x.style.color="#08061e"
}
function hoverout(x){
    x.style.color="#fff8d5"
    x.style.backgroundColor="#08061e"
}
async function main(){
    console.log("[starship] launching...")
    scwrapper=document.createElement("span")
    console.log("[starship] waiting for sparkle")
    await waitForElement(".vote-scorecard__sparkle")
    console.log("[starship] done waiting for sparkle!")
    const scinside=document.querySelector("form.vote-scorecard__form")
    const wrapperwrapper=document.querySelector("section.vote-scorecard")
    scinside.replaceWith(scwrapper)
    scwrapper.appendChild(scinside)
    scwrapper.id="scorecard-wrapper"
    document.querySelectorAll(".vote-scorecard__sparkle, #vote-scorecard-title").forEach(e=>{e.remove()})
    const xhead=document.querySelector("header.vote-scorecard__header")
    demowrapper=document.createElement("span")
    demowrapper.style.display="none"
    demowrapper.innerHTML=`
    <h1>placeholder for demo</h1>
    `
    wrapperwrapper.appendChild(demowrapper)
    repowrapper=document.createElement("span")
    repowrapper.style.display="none"
    repowrapper.innerHTML=`
    <h1>placeholder for repo</h1>
    `
    wrapperwrapper.appendChild(repowrapper)
    xhead.style.display="flex"
    xhead.innerHTML=`
    <button id="votetswitch-0">Demo</button> 
    <button id="votetswitch-1">Repo</button>
    <button id="votetswitch-2">Scorecard</button> 
    `
    const submit=document.querySelector('button.action-btn.action-btn--large.action-btn--primary.action-btn--disabled.vote-scorecard__submit')
    const warnp=document.querySelector('p.vote-scorecard__warning')
    submit.after(warnp)
    xhead.querySelectorAll("button").forEach((e,i)=>{
        e.addEventListener("click",()=>{
            switchto(i)
        })
        e.style.backgroundColor="#08061e"
        e.style.color="#fff8d5"
        e.style.fontWeight="600"
        e.style.border="2px solid hsla(0,0%,100%,.5)"
        e.style.borderRadius="999px"
        e.style.padding="15px"
        e.style.fontSize="30px"
        e.style.transition="background 150ms ease,border-color 150ms ease,color 150ms ease"
        e.style.margin="auto"
        e.style.height="100%"
        e.style.width="auto"
        e.addEventListener("mouseenter",()=>{
            hoverin(e)
        })
        e.addEventListener("mouseleave",()=>{
            hoverout(e)
        })
    })
    switchto(0)

}
main()
let lasturl=window.location.href
new MutationObserver(()=>{
    const currenturl=window.location.href
    if(lasturl!=currenturl){
        lasturl=currenturl
        if (currenturl.includes("/rate/new")){
            console.log("[starship] calling main")
            main()
        }
    }
}).observe(document,{attributes: true,characterData:true,subtree:true,childList:true})

