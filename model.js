let GlobalData = {
    USERDETAILSARRAY : [],
    SEARCHRESULTARRAY : [],
    CHKBOXARRY: [],
    LOWERLIMIT: 0,
    HIGHERLIMIT: 10,
    LENGTH: 0,
    PAGESIZE:10,
    ACTIVEPAGE:1,
    FUNCTIONFLAG:"NORMAL",
    DELETEINBULK:"false",
}
function setFunctionFlag(flag){
    GlobalData.FUNCTIONFLAG = flag ;
}
 function getPageSize(){
     return GlobalData.PAGESIZE ;
 }


function setActivePage(activePage) {
    GlobalData.ACTIVEPAGE = activePage ;
}

function getActivePage(){
    return GlobalData.ACTIVEPAGE ;
}

function setLowerLimit(){
    let activePage = getActivePage() ;
    GlobalData.LOWERLIMIT = GlobalData.PAGESIZE  * (activePage - 1) ;
}

function getLowerLimit(){
    return GlobalData.LOWERLIMIT ;
}

function setHigherLimit (){
    let activePage = getActivePage() ;
    let tempHigherLimit = activePage * getPageSize() ;
    if (GlobalData.FUNCTIONFLAG === "NORMAL"){
        if (tempHigherLimit > getUserCount()){
            GlobalData.HIGHERLIMIT = getUserCount() ;
        }else{
            GlobalData.HIGHERLIMIT = tempHigherLimit ;
        }
    }else{
        let length = GlobalData.SEARCHRESULTARRAY.length ;
        if (length < tempHigherLimit){
            GlobalData.HIGHERLIMIT = length ;
        }else if (tempHigherLimit < length){
            GlobalData.HIGHERLIMIT = tempHigherLimit ;
        }
    }

}

function getUserCount (){
    return GlobalData.USERDETAILSARRAY.length ;
}


function getPathToJSONFile(){
    let urlToJSON = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json" ;
    return urlToJSON ;
}

function getHandleToTable(){
   let handleOfTable ;
   handleOfTable = document.getElementById("tb-user-details") ;
   return handleOfTable ;
}
function createNewRow(){
    let newRow =  document.createElement("tr");
    return newRow ;
}

function createNewColForChkBox(){
    let newColumnForChkBox = document.createElement("td") ;
    return newColumnForChkBox ;
}
      
function createNewChkBox() {
    let newChkbox = document.createElement("input");
    newChkbox.setAttribute("type", "checkbox") ;
    return newChkbox ;
}
function createNewColForNameAttr() {
    let newColumnForNameAttr =  document.createElement("td") ;
    return newColumnForNameAttr ;
}
function createNewColForEmailAttr(){
    let newColumnForEmailAttr = document.createElement("td") ;
    return newColumnForEmailAttr ;
}

function createNewColForRoleAttr() {
    let newColumnForRoleAttr = document.createElement("td") ;
    return newColumnForRoleAttr ;
}

function createNewColForAction(id){
    let newColumnForActAttr = document.createElement("td") ;
    let imgDelete = document.createElement("img") ;
    imgDelete.alt = "Delete" ;
    imgDelete.src= "./public/image/icons8-delete.png" ;
    imgDelete.setAttribute("id", id + "_imgDelete") ;
    let imgEdit = document.createElement("img") ;
    
    imgEdit.alt = "Edit" ;
    imgEdit.src= "./public/image/icons8-write.png" ;
    imgEdit.setAttribute("id", id + "_imgEdit") ;
    newColumnForActAttr.appendChild(imgDelete) ;
    newColumnForActAttr.appendChild(imgEdit) ;
    return newColumnForActAttr ; 
}
    
function check(id) {
    document.getElementById(id).checked = true;
}

function uncheck(id) {
    document.getElementById(id).checked = false;
}

function getHandleToPagingDiv(){
    return document.getElementById("pagination") ;
}

function createButton(num) {
    console.log(num) ;
    let handleToPagingDiv = getHandleToPagingDiv() ;
    for (let i = 0; i < num; i++){
        let buttonHandle = document.createElement("button") ;
        let pageNum = i + 1 ;
        buttonHandle.innerText = pageNum ;
        buttonHandle.setAttribute("id", pageNum + "_button") ;
        if (pageNum === GlobalData.ACTIVEPAGE){
            buttonHandle.style.backgroundColor = "#3498db";
        }
        handleToPagingDiv.appendChild(buttonHandle) ;
    }
}

function resetTheTable(){
    resetCheckBoxArray() ;
    let handleToTable = getHandleToTable() ;
    let handleToPagingDiv = getHandleToPagingDiv() ;
    handleToTable.innerHTML = "";
    handleToPagingDiv.innerHTML = "";
}