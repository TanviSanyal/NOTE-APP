
showNotes();
let addBtn = document.getElementById("addNote");
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addtext");
    let addTitle = document.getElementById("addtitle");
    let check = document.getElementById("check");
    let notes = localStorage.getItem("notes");
    if (notes == null) {

        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);          
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value,
        ischeck: check.checked
    };
    //console.log(myObj);
    if (addText.value != "" && addTitle.value != "") {
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addText.value = "";
        addTitle.value = "";
        check.checked = false;
        showNotes();
        //console.log(notesObj);
    }
    else {
        alert("please add title and note!!!");
    }
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.ischeck == true) {
            html += `<div class="notecard my-2 mx-2" style="width: 18rem; background-color:LawnGreen; border-left:solid 0.5px LightGrey; border-bottom:solid 0.5px LightGrey;">
        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
        }
        else {
            html += `<div class="notecard my-2 mx-2" style="width: 18rem; border-left:solid 1px LightGrey; border-bottom:solid 0.5px LightGrey;">
        <div class="card-body">
            <h5 id="notetitle" class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
        }
    });
    let noteselement = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteselement.innerHTML = html;
    }
    else {
        noteselement.innerHTML = `Nothing to show!!!Add a note in "Add a note" section.`;
    }
}
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
let search = document.getElementById("search");
search.addEventListener("input", function () {
    let inputVal1 = search.value.toLowerCase();
    let inputVal2 = search.value.toUpperCase();
    let noteCards = document.getElementsByClassName("notecard");
    Array.from(noteCards).forEach(function (element) {
        let cardtext1 = element.getElementsByTagName("p")[0].innerText;
        let cardtext2 = element.getElementsByTagName("h5")[0].innerText;
        if (cardtext1.includes(inputVal1) || cardtext1.includes(inputVal2) || cardtext2.includes(inputVal1) || cardtext2.includes(inputVal2)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});