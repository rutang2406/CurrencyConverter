const url="https://api.currencyapi.com/v3/latest?apikey=cur_live_d4ORAUDDyZwOhmwiZCemxg4lUWnpH3QHWhAJfre9"
const fromdropdown=document.querySelectorAll("select");
const btn=document.querySelector("button");
const fromcurr=document.querySelector(".dropdown2 select");
const Tocurr=document.querySelector(".dropdown1 select");
const msg=document.querySelector("#rates");
for(let select of fromdropdown){
    for(let codes in countryList){
        let newoption =document.createElement("option");
        newoption.innerText=codes;
        newoption.value=codes
        select.append(newoption);
        if(select.name==="from" && codes==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && codes==="INR"){
            newoption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>updateflag(evt.target))
}

const updateflag=(event)=>{
    let code=event.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img =event.parentElement.querySelector("img");
    img.src=newsrc;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchange();
})
const updateExchange=async()=>{
    let amount=document.querySelector("input");
    let val=amount.value;
    if(val=="" || val<1){
        val=1;
        amount.value="1";
    }
    let fromcurramt=fromcurr.value;
    let tocurramt=Tocurr.value;
    let res=await fetch(url);
    let realdata=await res.json();
    let tar1=realdata.data[fromcurramt].value;
    let tar2=realdata.data[tocurramt].value;
    let resulttobeshown=((tar2/tar1)*val).toFixed(3);
    msg.textContent=`${val} ${fromcurramt}=${resulttobeshown} ${tocurramt}`;
}