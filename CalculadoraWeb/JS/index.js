function setresultado(value){
    document.getElementById('screen1').innerHTML=value;
}
function getresultado(){
    return(document.getElementById('screen1').innerHTML);
}
function añadir(key){
    let result=getresultado();
    if (result!='0' || isNaN(key)) {
        setresultado(result + key);
    }
    else {
        setresultado(key);
    }
}
function calc(){
    let result=eval(getresultado());
    setresultado(result)
}
function del(){
    setresultado(0)
}