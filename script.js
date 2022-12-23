const bill = document.querySelector("#bill");
const tip_amounts = document.querySelector('.tip-amounts');
const people = document.querySelector("#people");
const tip_pp = document.querySelector("#tip-pp");
const total_pp = document.querySelector("#total-pp");
const reset = document.querySelector("#btn-reset");
const form = document.querySelector("form");
const custom_tip = document.querySelector("#custom-tip");

//this gets triggered by any form changes
function calculateTotal(){
    if (bill.value && people.value && document.querySelector('.tip-amounts .selected')){
        const tip_amount_selected = document.querySelector('.tip-amounts .selected').dataset.tip;
        if (tip_amount_selected !== "NaN"){
            let tip_amount_pp = (bill.value * tip_amount_selected) / people.value;
            tip_pp.innerText = "$" + tip_amount_pp.toFixed(2);
            let total_amount_pp = (bill.value / people.value) + tip_amount_pp;
            total_pp.innerText = "$" + total_amount_pp.toFixed(2);
            reset.classList.add("active");
        } else {
            reset.classList.remove("active");
            tip_pp.innerText = "$0.00";
            total_pp.innerText = "$0.00";
        }

    } else {
        console.log("Not all fields selected");
        reset.classList.remove("active");
        tip_pp.innerText = "$0.00";
        total_pp.innerText = "$0.00";
    }
}

tip_amounts.addEventListener('click', (e)=>{
    if (e.target.tagName === "BUTTON"){
        e.preventDefault();
        [...document.querySelectorAll('.tip-amount')].map((element)=>{
            element.classList.remove("selected");
        })
        custom_tip.value="";
        e.target.classList.add("selected")
        calculateTotal();
    }
})

custom_tip.addEventListener('keyup', (e)=>{
    [...document.querySelectorAll('.tip-amount')].map((element)=>{
        element.classList.remove("selected");
    })
    e.target.classList.add("selected")
    e.target.dataset.tip = parseInt(e.target.value)/100;
    if ( isNaN(e.target.value) ){
        e.target.value = e.target.value.substring(0, e.target.value.length-1);
    } else {
        calculateTotal();
    }
})

bill.addEventListener('keyup',(e)=>{
    if ( isNaN(e.target.value) ){
        e.target.value = e.target.value.substring(0, e.target.value.length-1);
    } else {
        calculateTotal();
    }
})

people.addEventListener('keyup',(e)=>{
    if ( isNaN(e.target.value) ){
        e.target.value = e.target.value.substring(0, e.target.value.length-1);
    } else {
        calculateTotal();
    }
})

form.addEventListener('reset',(e)=>{
    tip_pp.innerText = "$0.00";
    total_pp.innerText = "$0.00";
})