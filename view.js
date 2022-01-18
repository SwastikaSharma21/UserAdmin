function showHeaderAndPage(){
    createHeaderOfDisplayTable();
    console.log(GlobalData.FUNCTIONFLAG) ;
    if (GlobalData.FUNCTIONFLAG === "NORMAL"){
        console.log (`reached here`) ;
        displayPagingButtons(getUserCount(), GlobalData.PAGESIZE) ;
    }else{
        displayPagingButtons(GlobalData.SEARCHRESULTARRAY.length, GlobalData.PAGESIZE) ;
    }
}

function initUserDetails(){
    readJSONFile((error, data) => {
        if (error) {
            console.log(`Error: ${error}`) ;
        } else {
            GlobalData.USERDETAILSARRAY = data ;
            showHeaderAndPage() ;
            displayUserTable(GlobalData.USERDETAILSARRAY, GlobalData.LOWERLIMIT, GlobalData.HIGHERLIMIT);
            
        }
    })
}

initUserDetails() ;

function createHeaderOfDisplayTable(){
    let tableHandle = getHandleToTable() ;
    let newRow = createNewRow() ;
    let newColumnForChkBox = document.createElement("th") ;
    let newChkbox = createNewChkBox() ;
    setIdForChkBox(newChkbox, "selectAll") ;
    newColumnForChkBox.appendChild(newChkbox) ;
    let newColumnForNameAttr =  document.createElement("th") ;
    setHtmlContent(newColumnForNameAttr, "Name") ;
    let newColumnForEmailAttr = document.createElement("th") ;
    setHtmlContent(newColumnForEmailAttr, "Email") ;
    let newColumnForRoleAttr = document.createElement("th") ;
    setHtmlContent(newColumnForRoleAttr, "Role") ;
    let newColumnForActions = document.createElement("th") ;
    setHtmlContent(newColumnForActions, "Actions") ;
    newRow.appendChild(newColumnForChkBox) ;
    newRow.appendChild(newColumnForNameAttr) ;
    newRow.appendChild(newColumnForEmailAttr) ;
    newRow.appendChild(newColumnForRoleAttr) ;
    newRow.appendChild(newColumnForActions) ;
    tableHandle.appendChild(newRow) ;
}

function createEachRowForUser(id, name, email, role){
    let tableHandle = getHandleToTable() ;
    let newRow = createNewRow() ;
    let newColumnForChkBox = createNewColForChkBox() ;
    let newChkbox = createNewChkBox() ;
    setIdForChkBox(newChkbox, id) ;
    newColumnForChkBox.appendChild(newChkbox) ;
    
    let newColumnForNameAttr =  createNewColForNameAttr() ;
    setHtmlContent(newColumnForNameAttr, name) ;
    newColumnForNameAttr.setAttribute("id", id + "_name") ;
    let newColumnForEmailAttr = createNewColForEmailAttr() ;
    newColumnForEmailAttr.setAttribute("id", id + "_email") ;
    setHtmlContent(newColumnForEmailAttr, email) ;
    let newColumnForRoleAttr = createNewColForRoleAttr() ;
    newColumnForRoleAttr.setAttribute("id", id + "_role") ;
    setHtmlContent(newColumnForRoleAttr, role) ;
    let newColumnForActions = createNewColForAction(id) ;
    
    newRow.appendChild(newColumnForChkBox) ;
    newRow.appendChild(newColumnForNameAttr) ;
    newRow.appendChild(newColumnForEmailAttr) ;
    newRow.appendChild(newColumnForRoleAttr) ;
    newRow.appendChild(newColumnForActions) ;
    tableHandle.appendChild(newRow) ;
}

function setHtmlContent(elementHandle, text) {
    elementHandle.innerHTML = text ;
}

function displayUserTable(arry, lowerLimit, higherLimit){
    console.log(arry.length, lowerLimit, higherLimit) ;
    for (let i = lowerLimit; i < higherLimit; i++){
        createEachRowForUser(arry[i].id, arry[i].name, arry[i].email, arry[i].role)  
    }
}

function displayPagingButtons(length, pageSize){
    console.log(`I am in paging ${length}    ${pageSize}`) ;
    let numOfButtons ;
    if (length > pageSize){
        numOfButtons = Math.ceil(length/pageSize) ;
        createButton(numOfButtons) ; 
    }else if(length === 0){
        numOfButtons = 0;
        createButton(0) ;
    }else{
        numOfButtons = 1;
        createButton(1) ;
    }       
}