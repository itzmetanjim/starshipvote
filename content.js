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
async function redirect(url) {
    return await chrome.runtime.sendMessage({action: "redirect",url: url});
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
    <h1>loading demo...</h1>
    `
    wrapperwrapper.appendChild(demowrapper)
    repowrapper=document.createElement("span")
    repowrapper.style.display="none"
    repowrapper.innerHTML=`
    <h1>loading repo...</h1>
    `
    wrapperwrapper.appendChild(repowrapper)
    xhead.style.display="flex"
    xhead.innerHTML=`
    <button id="ssvo-popout", style="width:min-content" class="buttonx">🗗</button>
    <button id="votetswitch-0" class="buttonx">Demo</button>
    <button id="votetswitch-1" class="buttonx">Repo</button>
    <button id="votetswitch-2" class="buttonx">Vote</button>
    `
    const submit=document.querySelector('button.action-btn.action-btn--large.action-btn--primary.action-btn--disabled.vote-scorecard__submit')
    const warnp=document.querySelector('p.vote-scorecard__warning')
    const xsection=document.querySelector("section.vote-scorecard")
    submit.after(warnp)
    xhead.querySelectorAll("button").forEach((e,i)=>{
        if(i>0){
            e.addEventListener("click",()=>{
                switchto(i-1)
            })
        }else{
            e.addEventListener("click",()=>{
                xsection.classList.toggle("ssvoexpanded")
            })
        }
        e.addEventListener("mouseenter",()=>{
            hoverin(e)
        })
        e.addEventListener("mouseleave",()=>{
            hoverout(e)
        })
    })
    switchto(0)
    const demolink = document.querySelector(".project-show__latest-ship-btn.project-show__latest-ship-btn--primary").href
    const repolink = document.querySelector(".project-show__latest-ship-btn:not(.project-show__latest-ship-btn--primary)").href
    console.log("[starship] [debug] links demo,repo ",demolink,repolink)
    demowrapper.innerHTML=`
    <iframe loading="lazy" class="iframex">
    </iframe>
    `
    repowrapper.innerHTML=`
    <iframe loading="lazy" class="iframex"><!--
    <reviwer-ship wright=if you="are" reading="this:then" include=the word="plasma" in your="video" or=feedback>
    </that way="i" can="know" that=you actually=read this="code" and="i" cant=sneak in=some malware>
    --></iframe>
    `
    repowrapper.querySelector("iframe").src=(await redirect(repolink)).replace("https://github.com/","https://pages.tanjim.org/github.com/#/")
    demowrapper.querySelector("iframe").src=(await redirect(demolink)).replace("https://github.com/","https://pages.tanjim.org/github.com/#/")
    await fetch(repolink,{mode:"no-cors"})
    await fetch(demolink,{mode:"no-cors"})
}
if (window.location.href.includes("/rate/new")){
    main()
}
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

