// SELECT
let tbody=document.querySelector(".tbody")
let modal=document.querySelector(".modal")
let openModal=document.querySelector(".openModal")
let closeModal=document.querySelector(".close")
let form=document.querySelector(".form")
let modal2=document.querySelector(".modal2")
let closeModal2=document.querySelector(".close2")
let form2=document.querySelector(".form2")




// MODAl
openModal.onclick=()=>{
    modal.style.display="block"
}
closeModal.onclick=()=>{
    modal.style.display="none"
}
window.onclick=(event)=>{
    if(event.target==modal){
        modal.style.display="none"
    }
}

// MODAL2
closeModal2.onclick=()=>{
    modal2.style.display="none"
}
window.onclick=(event)=>{
    if(event.target==modal2){
        modal2.style.display="none"
    }
}


// GETDATA

const getData=async function(){
    try {
        let{data}=await axios.get(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents`)
        get(data)
    } catch (error) {
        console.log(error)
    }
}

// ADDDATA

const addData=async function(user){
    try {
        let{data}=await axios.post(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents`,user)
        getData()
    } catch (error) {
        console.log(error)
    }
}

form.onsubmit=(event)=>{
    event.preventDefault()
    let obj={
        id:new Date().getTime(),
        correspondent:event.target["name1"].value,
        type_document:event.target["name2"].value,
        description:event.target["name3"].value,
        status:event.target["name4"].value
    }
    addData(obj)
    form.reset()
    modal.style.display="none"
}


// DELETEDATA

const deleteData=async function(id){
    try {
        let {data}=await axios.delete(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents/${id}`)
        getData()
    } catch (error) {
        console.log(error)
    }
}


// EDITDATA

const editData=async function(id,user){
    try {
        let {data}=await axios.put(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents/${id}`,user)
        getData()
    } catch (error) {
        console.log(error)
    }
}


function get(array){
    tbody.innerHTML=""
    array.forEach((elem)=>{
        // TR
        let tr=document.createElement("tr")

        // tdID
        let tdId=document.createElement("td")
        tdId.innerHTML=elem.id

        // tdCorrespondent
        let tdCorrespondent=document.createElement("td")
        tdCorrespondent.innerHTML=elem.correspondent

        // tdTypeDocument
        let tdTypeDocument=document.createElement("td")
        tdTypeDocument.innerHTML=elem.type_document

        // tdCorrespondent
        let tdDescription=document.createElement("td")
        tdDescription.innerHTML=elem.description

        // tdStatus
        let tdStatus=document.createElement("td")
        tdStatus.innerHTML=elem.status
        
        // BTNDELETE
        let btnDelete=document.createElement("button")
        btnDelete.innerHTML="DELETE"
        btnDelete.setAttribute("class","btnDelete")
        btnDelete.onclick=()=>{
            deleteData(elem.id)
        }

        // BTNEDIT
        let btnEdit=document.createElement("button")
        btnEdit.innerHTML="EDIT"
        btnEdit.setAttribute("class","btnEdit")
        btnEdit.onclick=()=>{
            modal2.style.display="block"
            form2["name1"].value=elem.correspondent
            form2["name2"].value=elem.type_document
            form2["name3"].value=elem.description
            form2["name4"].value=elem.status


            form2.onsubmit=(event)=>{
                event.preventDefault()
                let obj={
                correspondent:event.target["name1"].value,
                type_document:event.target["name2"].value,
                description:event.target["name3"].value,
                status:event.target["name4"].value
            
                }
                editData(elem.id,obj)
                form2.reset()
                modal2.style.display="none"
            }


        }
      
       

        
        // AppendChild
        tr.appendChild(tdId)
        tr.appendChild(tdCorrespondent)
        tr.appendChild(tdTypeDocument)
        tr.appendChild(tdDescription)
        tr.appendChild(tdStatus)
        tr.appendChild(btnEdit)
        tr.appendChild(btnDelete)
        tbody.appendChild(tr)

    })
}


getData()
