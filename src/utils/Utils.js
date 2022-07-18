import React from "react";

function removeSpecials(text) { 
    const string = text.toString();

    return string.replace(/[ÀÁÂÃÄÅ]/,"A")
    .replace(/[àáâãäå]/,"a")
    .replace(/[ÈÉÊË]/,"E")
    .replace(/[Ç]/,"C")
    .replace(/[ç]/,"c")
    .replace(/[^a-z0-9]/gi,''); 
}


export default  {
    removeSpecials
}