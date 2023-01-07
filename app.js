// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, update, onValue, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2Hyd6ta76kpWBMCqDR9Vck2HerRpNoTg",
    authDomain: "to-do-app-806b6.firebaseapp.com",
    databaseURL: "https://to-do-app-806b6-default-rtdb.firebaseio.com",
    projectId: "to-do-app-806b6",
    storageBucket: "to-do-app-806b6.appspot.com",
    messagingSenderId: "746168461193",
    appId: "1:746168461193:web:8d12cff1f2901b0d86e358",
    measurementId: "G-S2GV33E381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase();

var main = document.getElementById('main')
var inp = document.getElementById('inp')

function getTodo() {
    const reference = ref(database, "ToDo/")
    onChildAdded(reference, function (data) {
        //create list item
        var li = document.createElement("LI")
        var liText = document.createTextNode(data.val().li)
        li.appendChild(liText)
        li.setAttribute("class", "styleLi")
        main.appendChild(li)
        //list item end
        //create edit button
        var editBtn = document.createElement("BUTTON")
        var editBtnText = document.createTextNode("Edit")
        editBtn.appendChild(editBtnText)
        editBtn.setAttribute("id", `${data.val().id}`)
        editBtn.setAttribute("onclick", "editToDo(this)")
        editBtn.setAttribute("class", "styleBtn")
        li.appendChild(editBtn)
        //edit button end
        //create delete button
        var delBtn = document.createElement("BUTTON")
        var deltBtnText = document.createTextNode("Delete")
        delBtn.appendChild(deltBtnText)
        delBtn.setAttribute("id", `${data.val().id}`)
        delBtn.setAttribute("onclick", "deleteToDo(this)")
        delBtn.setAttribute("class", "styleBtn")
        li.appendChild(delBtn)
        //delete button end
        console.log(data.val().li)
    })
}
getTodo()

window.add = function () {
    var toDoList = {
        li: inp.value,
        id: Math.random().toString().slice(2)
    }
    const reference = ref(database, `ToDo/${toDoList.id}/`)
    set(reference, toDoList)
        .then(function () {
            inp.value = ""
        })
        .catch(function (err) {
            alert(err.message)
        })
}

window.editToDo = function (element) {
    var newValue = prompt("Please enter your changes", element.parentNode.firstChild.nodeValue)
    var toDoList = {
        li: newValue,
        id: element.id
    }
    const reference = ref(database, `ToDo/${element.id}`)
    set(reference, toDoList)
    element.parentNode.firstChild.nodeValue = newValue
}

window.deleteToDo = function (element) {
    const reference = ref(database, `ToDo/${element.id}`)
    remove(reference, element.id)
    element.parentNode.remove()
}

window.DelAll = function () {
    const reference = ref(database, "ToDo")
    remove(reference, "ToDo")
    main.innerHTML = ""
}