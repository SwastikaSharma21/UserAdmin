/**This function will use API provided by GFG and return in the callback function */
function readJSONFile (callback){
    let request = new XMLHttpRequest() ;

    request.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText);
            callback(undefined, data);
        }else if (e.target.readyState === 4) {
            callback('An error has taken place', undefined) ;
        }
    });
    request.open('GET', getPathToJSONFile()) ;
    request.send() ;
}
/*In this function developer will display and modify lower and upper limit
accordin to the function in action */
function updateGlobalAndShowDetails(){
    setLowerLimit();
    setHigherLimit() ;
    console.log ("Reached here called display" + GlobalData.FUNCTIONFLAG) ;
    if (GlobalData.FUNCTIONFLAG === "NORMAL"){
        console.log(GlobalData.USERDETAILSARRAY,GlobalData.LOWERLIMIT,GlobalData.HIGHERLIMIT );
        displayUserTable(GlobalData.USERDETAILSARRAY, GlobalData.LOWERLIMIT, GlobalData.HIGHERLIMIT);
    }else if (GlobalData.FUNCTIONFLAG === "SEARCH"){
        console.log ("Reached here called display") ;
        displayUserTable(GlobalData.SEARCHRESULTARRAY, GlobalData.LOWERLIMIT, GlobalData.HIGHERLIMIT);
    }
}

function setIdForChkBox(newChkbox, id) {
    let strId = id + "_checkbox" ;
    newChkbox.setAttribute("id", strId) ;
}

function updateResultArray(searchStr){
    return GlobalData.USERDETAILSARRAY.filter(item => {
        return item.name.toLowerCase().includes(searchStr.toLowerCase())
        || item.email.toLowerCase().includes(searchStr.toLowerCase())
        || item.role.toLowerCase().includes(searchStr.toLowerCase())
    })
    
}
 

document.getElementById("search-user-by-NER").addEventListener("input", event =>{
    let searchStr = event.target.value ;
    console.log(searchStr) ;
    
    if (searchStr){   
        setFunctionFlag("SEARCH") ;
        GlobalData.SEARCHRESULTARRAY = updateResultArray(searchStr);
        console.log(GlobalData.SEARCHRESULTARRAY, searchStr) ;
        resetTheTable();
        showHeaderAndPage() ;
        updateGlobalAndShowDetails() ;
    }
    else{
        setFunctionFlag("NORMAL") ;
        GlobalData.SEARCHRESULTARRAY = "" ;
        resetTheTable();
        showHeaderAndPage() ;
        updateGlobalAndShowDetails() ;
    }
})

/**Paging statrts here */
document.getElementById("pagination").addEventListener("click", event =>{
    let activePage = event.target.id.split("_")[0] ;
    setActivePage(activePage) ;
    console.log ( `Will start paing ${activePage}`) ;
    resetTheTable();
    showHeaderAndPage() ;
    document.getElementById(event.target.id).style.backgroundColor = "#3498db" ;
    updateGlobalAndShowDetails() ;

}) ;

/**Paging Ends here */

/*****************Checkbox Fuunctionality Starts Here */

//Reset the checkbox array
function resetCheckBoxArray(){
    //empty the array as checkbox is unchecked
    GlobalData.CHKBOXARRY = [] ;
}

//Save all the ids in checkbox array
function saveIdInCheckBoxArray(){
    console.log(GlobalData.FUNCTIONFLAG ) ;
    if (GlobalData.FUNCTIONFLAG === "NORMAL"){
        for (let i = GlobalData.LOWERLIMIT ; i < GlobalData.HIGHERLIMIT; i++){
            let index ;
            index = GlobalData.CHKBOXARRY.findIndex(item =>{
                return item === GlobalData.USERDETAILSARRAY[i].id ;
            }) ;
            /**If id does not exist push it or else just leave */
            if (index === -1){
                GlobalData.CHKBOXARRY.push(GlobalData.USERDETAILSARRAY[i].id) ;
            }
            
        }
    }else if (GlobalData.FUNCTIONFLAG === "SEARCH"){
        if (GlobalData.SEARCHRESULTARRAY.length){
            let arry = GlobalData.SEARCHRESULTARRAY ;
            for (let i = 0; i < arry.length; i++){
                GlobalData.CHKBOXARRY.push(GlobalData.SEARCHRESULTARRAY[i].id) ;
                console.log (`pushed ${GlobalData.SEARCHRESULTARRAY[i].id}`) ;
            }
        }
    }
}

function changeAttributeOfCheckbox (selectflag){
    let checkboxid ;
    console.log(`${GlobalData.CHKBOXARRY} in changeAttributeOfCheckbox`) ;
    if (GlobalData.CHKBOXARRY.length){
        GlobalData.CHKBOXARRY.forEach(chkbox =>{
            checkboxid = chkbox +"_checkbox" ;
            //console.log (checkboxid) ;
            if (selectflag){
                //console.log(`setting to true`) ;
                document.getElementById(checkboxid).checked = true ;
            }
            else{
                //console.log(`setting to false`) ;
                document.getElementById(checkboxid).checked = false ; 
            }  
            
        })
    }
    
}

function handleSelectAllItemOfPage(selectflag){
    //Push those ids which needs to be checked or empty the checkbox array
    if (selectflag){
        saveIdInCheckBoxArray() ;  
        changeAttributeOfCheckbox (selectflag) ;                    
    }else{
        changeAttributeOfCheckbox (selectflag) ;
        resetCheckBoxArray() ;
    }   
    //console.log (GlobalData.CHKBOXARRY, GlobalData.CHKBOXARRY.length) ;
}
/*Checkbox array will get updated on click  */
function updateCheckBoxArray(id, status){
    let index ;
    index = GlobalData.CHKBOXARRY.findIndex(item =>{ 
             return parseInt(item) === parseInt(id) ;
    });
    if (status && index === -1){
        GlobalData.CHKBOXARRY.push(id) ;
    }else if(!status && index !== -1) {   
        console.log (index, id, status) ;
        GlobalData.CHKBOXARRY.splice(index, 1) ;
    }
    
}

/*****************Checkbox Fuunctionality Ends Here */



/**We will implement Delete functionality now which includes handling the checkbox */
function deleteSelectedUser() {
    console.log (`${GlobalData.CHKBOXARRY} ${GlobalData.DELETEINBULK} at deleteSelectedUser`) ;
    //Check if select all was clicked before delete image was clicked
    if (GlobalData.CHKBOXARRY.length === 1 && GlobalData.DELETEINBULK === "false"){
        let index = GlobalData.USERDETAILSARRAY.findIndex (obj =>{
            return parseInt(obj.id) === parseInt(GlobalData.CHKBOXARRY[0]) ;
        }) 
        GlobalData.USERDETAILSARRAY.splice(index, 1) ;
        resetCheckBoxArray();
        resetTheTable() ;
        showHeaderAndPage();
        updateGlobalAndShowDetails() ; 
    }else if (GlobalData.DELETEINBULK === "true"){
        console.log("Reached inside delete" + GlobalData.CHKBOXARRY) ;
        GlobalData.CHKBOXARRY.forEach(value =>{
            let index = GlobalData.USERDETAILSARRAY.findIndex (obj =>{
                return parseInt(obj.id) === parseInt(value) ;
            });
            console.log("removed " + index + GlobalData.USERDETAILSARRAY[index] ) ;
            GlobalData.USERDETAILSARRAY.splice(index, 1) ;
        });
        resetCheckBoxArray();
        resetTheTable() ;
        showHeaderAndPage();
        updateGlobalAndShowDetails() ; 
        
    }
      
}

function handleDeleteFunctionlity(id){ 
    if (id){
        updateCheckBoxArray(id, true) ;
    }
    console.log(id,GlobalData.CHKBOXARRY.length ) ;
    if (GlobalData.CHKBOXARRY.length){
        deleteSelectedUser();
    }
    console.log ("I need to hanle Delete") ;
}

function validateNameInput(name){
    if (name.length){
        return true ;
    }else{
        alert("Name cant be Empty") ;
        return false ;
    }
}

function validateEmailInput(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

function validateRoleInput(role){
    if (role.toLowerCase() === "admin" || role.toLowerCase() === "member"){
        return true ;
    }else{
        alert("Possible Role is only admin or member" ) ;
        return false ;
    }
}
function handleEditFunctionality(id){
    console.log ("I need to hanle Edit") ;
    let nameid = id + "_name" ;
    let emailid = id + "_email" ;
    let roleid = id + "_role" ;
    let name = document.getElementById(nameid) ;
    let email = document.getElementById(emailid) ;
    let role = document.getElementById(roleid) ;
    name.contentEditable = true ;
    email.contentEditable = true;
    role.contentEditable = true ;
    name.style.backgroundColor = "#3498db";
    email.style.backgroundColor = "#3498db";
    role.style.backgroundColor = "#3498db";

    if (validateNameInput(name.innerText)){ 
        GlobalData.USERDETAILSARRAY[id].name = name.innerText ;
    }if (validateEmailInput(email.innerText)){
        GlobalData.USERDETAILSARRAY[id].email = email.innerText;
    }if (validateRoleInput(role.innerText)){
        GlobalData.USERDETAILSARRAY[id].role = role.innerText;
    }   
}

document.getElementById("tb-user-details").addEventListener("click", event =>{
    //console.log (`I am checked ${event.target.id}`) ;
    let elementId = event.target.id ;
    let id = elementId.split("_")[0];
    if (elementId.toLowerCase() === "selectall_checkbox" ){
        //Set status of other users checkbox to checked
        //console.log(`Set status of other users checkbox to checked`);
        let checkedFlag = document.getElementById(event.target.id).checked;
        handleSelectAllItemOfPage(checkedFlag ) ;
    }else if (event.target.id.includes("_checkbox")){
        //console.log (`checkbox is selected`);
        let flag = event.target.checked ;
        //console.log (`${flag} ${GlobalData.CHKBOXARRY}`) ;
        updateCheckBoxArray(id, flag) ;
        //console.log (`${flag} ${GlobalData.CHKBOXARRY}`) ;
    }else if (event.target.id.includes("_imgDelete")){
        GlobalData.DELETEINBULK = "false" ;
        handleDeleteFunctionlity(id) ;            
    }else if (event.target.id.includes("_imgEdit")){
        GlobalData.DELETEINBULK = "false" ;
        handleEditFunctionality(id) ;
    }

}) ;

/***Delete In Bulk Functionality Starts here */
document.getElementById("delete-selected").addEventListener("click", event =>{
    GlobalData.DELETEINBULK = "true" ;
    GlobalData.FUNCTIONFLAG = "NORMAL" ;
    handleDeleteFunctionlity(0) ;

    }) ;
