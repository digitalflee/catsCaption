let container = document.getElementById('container')
entriesUl = document.createElement('Ul')
entriesUl.className = "all-entries"

let catBtn = document.createElement('button')
catBtn.id = "catBtn-Id"
catBtn.innerText = "get your cat"
let bannerDiv = document.getElementById("bannerDiv")
let catDiv = document.getElementById("catDiv")


let entryForm = document.createElement('form')
entryForm.id = "form-id"
entryForm.innerHTML = `<div class="form-group">
<label for="name">Name</label>
<input type="name" class="form-control" id="name-input" placeholder="name here">
</div>
<div class="form-group">
<label for="entryTextArea">Entry</label>
<textarea class="form-control" id="TextArea-Id" rows="3"></textarea>
</div>
<input type="submit">`
container.append(entryForm)
bannerDiv.append(catBtn)

// let captionBtn = document.createElement('button')
// captionBtn.id = "capBtn"
// captionBtn.innerHTML = `<button id="capBtn"> edit caption </button>`
// let capDiv = document.getElementById('cap')
// capDiv += captionBtn.innerHTML


catBtn.addEventListener("click", () => {
    
    catDiv.innerHTML = " "
    
    fetch("https://api.thecatapi.com/v1/images/search")
    .then(r => r.json())
    .then(catObj => {
        
        catImg = document.createElement('img')
        catImg.src = catObj[0].url 
        catDiv.append(catImg)
        // debugger;
        //saveCat(catImg.src)
        
    })
})


fetch("http://localhost:3000/entries")
.then(r => r.json())
.then((entriesArr) => {
    entriesArr.forEach(entry => {

        let entryDiv = document.createElement('div')
        entryDiv.className = 'row'
        entryDiv.innerHTML =  `<div class="col-md-2">
        <div id="thumbnailId" class="thumbnail">
            <img id="${entry.id}" src=${entry.image_url} style="width:100%"> 
            <div id="cap" class="caption">
                <p id="entryBody-${entry.id}">${entry.content}</p>
                <button class='edit' id="btn-${entry.id}"> edit caption </button>
            </div>
        </div>
        </div>`
        entriesUl.append(entryDiv)
        entryDiv.addEventListener('click', (event) => {
            debugger
            if (event.target.className == 'edit') {
                entryDiv.append(editForm)

                editForm.addEventListener("submit", (event) => {
                    event.preventDefault()
                    
                    fetch(`http://localhost:3000/entries/${entry.id}`, {
                        method: "PATCH",
                        headers: {
                          "content-type": "application/json"
                            },
                        body: JSON.stringify({
                            content: event.target.editbody.value
                            })
                        })
                        .then(r => r.json())
                        .then(newEntry => {
                            debugger
                            editForm.remove()
                            let pBody = document.getElementById(`entryBody-${newEntry.id}`)
                            pBody.innerText = newEntry.content
                            
                    })
                })
            }
        })
        
        container.append(entriesUl)
    })
})

// editForm.addEventListener("submit", (event) => {
//             event.preventDefault()
//             debugger
//             fetch(`http://localhost:3000/entries/${id}`, {
//                 method: "PATCH",
//                 headers: {
//                   "content-type": "application/json"
//                     },
//                 body: JSON.stringify({
//                     content: event.target.editbody.value
//                     })
//                 })
//                 .then(r => r.json())
//                 .then(newEntry => {
//                     debugger
//                     editForm.remove()
//                     let pBody = document.getElementById(`entryBody-${newEntry.id}`)
//                     pBody.innerText = newEntry.content
                    
//             })
//         })

let editForm = document.createElement('form')
editForm.id = "editform-id"
editForm.innerHTML = `<div class="form-group">
<label for="editTextArea">Edit</label>
<textarea class="form-control" id="editbody" rows="3"></textarea>
</div>
<input type="submit">`




// entriesUl.addEventListener('click', (event) => {
//     if (event.target.className === 'edit') {
//         let id = parseIevent.target.id.slice(4)
//         event.target.parentElement.append(editForm)
//         editForm.addEventListener("submit", (event) => {
//             event.preventDefault()
//             debugger
//             fetch(`http://localhost:3000/entries/${id}`, {
//                 method: "PATCH",
//                 headers: {
//                   "content-type": "application/json"
//                     },
//                 body: JSON.stringify({
//                     content: event.target.editbody.value
//                     })
//                 })
//                 .then(r => r.json())
//                 .then(newEntry => {
//                     debugger
//                     editForm.remove()
//                     let pBody = document.getElementById(`entryBody-${newEntry.id}`)
//                     pBody.innerText = newEntry.content
                    
//             })
//         })
//     }
// })








entryForm.addEventListener("submit", () => {
    
    event.preventDefault()
    
    let inputName = event.target["name-input"].value
    let entryContent = event.target["TextArea-Id"].value
    let catImg = document.getElementById('catDiv').firstElementChild.src
    
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputName
            
        })
    })
    .then(r => r.json())
    .then(userObj => {
        
        fetch(`http://localhost:3000/entries`, {
            method:'POST',
            headers: { 
                'Content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: userObj.id,
                content: entryContent,
                image_url: catImg
            })
        })
        .then(r => r.json())
        .then(entry => {
            entriesUl.innerHTML += `<div class="row">
            <div class="col-md-2">
            <div id="thumbnailId" class="thumbnail">
            <img src=${entry.image_url} style="width:100%"> 
            <div id="cap" class="caption">
            <p>${entry.content}</p>
            <button id="btn-${entry.id}"> edit caption </button>
            </div>
            </div>
            </div>
            </div>`
        })
    })
    
    
    // let editBtn = document.getElementById(`btn-${entry.id}`)
   
    // editBtn.addEventListener("click", (event) => {
    //     console.log(event.target)
    //     debugger;
        
        // let catThumb = document.getElementById('imgId')
        // check to see if we clicked on an <img>
        //if(event.target.id == 'IMG'){
            //event.target.id
            //let entryId = event.target.id.slice(6)
            //event.target.append(entryForm)
            // fetch(`http://localhost:3000/entries/${entry.id}`, {
                //         method: "PATCH",
                //         headers: {
                    //                 "content-type": "application/json"
                    //             },
                    //             body: JSON.stringify({
                        //                     content: entryContent
                        //                 })
                        //             })
                        //             .then(r => r.json())
                        //             .then(() => {
                            //                 })
})








                    
    
//})




