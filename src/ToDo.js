import displayProjects from "./index";
import projects from "./projects";
import displayTodos from "./index";

const mainContainer = document.querySelector(".mainContainer")
const todoDisp = document.querySelector(".displayTodos")
const priorityDisp = document.getElementById("mainTodos")
const priorityMain = document.querySelector(".displayPriority")
let todoString = localStorage.getItem("Todos")
let todoStore = JSON.parse(todoString);


class todo {
    constructor(title, content, priority, project) {
        this.title = title
        this.content = content
        this.priority = priority
        this.project = project
    }
    storeTodo() {
        todoStore.push(this)
    }
}

function newTodo(title, content, priority, project) {
    let todo1 = new todo(title, content, priority, project);
    todo1.storeTodo();
    let savedTodos = JSON.stringify(todoStore);
    localStorage.setItem("Todos", savedTodos);
}

function deleteTodos() {
    todoStore.length = 0
    let savedTodos = JSON.stringify(todoStore);
    localStorage.setItem("Todos", savedTodos);
}

function clearTodos() {
    let disp = document.querySelector(".todos");
    todoDisp.removeChild(disp);
    let dispP = document.querySelector(".displayPriorityTodos")
    if (dispP !== null) {
        priorityMain.removeChild(dispP);
    }
};


function openModalNTodo() {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modalTodo");
    modal.setAttribute("id", "todo")
    let close = document.createElement("span");
    close.setAttribute("class", "close");
    close.innerHTML = "&times;";
    close.addEventListener("click", () => {
        modal.style.display = "none";
        document.querySelector(".containerRight").style.filter = "none";
        document.querySelector(".containerLeft").style.filter = "none";
    })
    modal.appendChild(close);
    let form = document.createElement("form");
    form.setAttribute("class", "Form");
    form.setAttribute("id", "todoForm");
    modal.appendChild(form);
    let formT = document.createElement("h1");
    formT.innerText = "New Todo";
    formT.setAttribute("class", "formTitle");
    form.appendChild(formT);
    mainContainer.appendChild(modal);
    modal.style.display = "block";
    document.querySelector(".containerRight").style.filter = "blur(2px)";
    document.querySelector(".containerLeft").style.filter = "blur(2px)";
    let titleNTodo = document.createElement("div")
    titleNTodo.setAttribute("class", "titleNTodo")
    let name = document.createElement("label")
    name.innerText = "Title";
    name.setAttribute("class", "titleTitle");
    titleNTodo.appendChild(name);
    let inputTitleNTodo = document.createElement("input");
    inputTitleNTodo.setAttribute("class", "inputTitleNTodo");
    titleNTodo.appendChild(inputTitleNTodo);
    let contentNTodo = document.createElement("div")
    contentNTodo.setAttribute("class", "contentNTodo")
    let contentTitle = document.createElement("label")
    contentTitle.innerText = "Description";
    contentTitle.setAttribute("class", "contentTitle");
    contentNTodo.appendChild(contentTitle);
    let contentInput = document.createElement("textarea");
    contentInput.setAttribute("class", "contentInput");
    contentNTodo.appendChild(contentInput);
    let priority = document.createElement("label")
    priority.innerText = "Priority";
    priority.setAttribute("class", "priority");
    contentNTodo.appendChild(priority);
    let selectPriority = document.createElement("select")
    selectPriority.setAttribute("name", "priorityChoice");
    selectPriority.setAttribute("id", "priorityChoice");
    let normalP = document.createElement("option");
    normalP.innerText = "Normal";
    selectPriority.appendChild(normalP);
    let highP = document.createElement("option");
    highP.innerText = "High"
    selectPriority.appendChild(highP);
    contentNTodo.appendChild(selectPriority);
    let project = document.createElement("label")
    project.innerText = "Project";
    project.setAttribute("class", "projectTitle");
    contentNTodo.appendChild(project);
    let select = document.createElement("select")
    select.setAttribute("name", "projectChoice");
    select.setAttribute("id", "projectChoice");
    let defaultChoice = document.createElement("option");
    defaultChoice.innerText = "Add to a project?"
    select.appendChild(defaultChoice);
    projects.forEach(element => {
        let option = document.createElement("option");
        option.setAttribute("value", element.title);
        option.innerText = element.title;
        select.appendChild(option);
    });
    contentNTodo.appendChild(select);
    let button = document.createElement("button")
    button.setAttribute("type", "submit")
    button.setAttribute("class", "submitButton")
    button.innerText = "Add"
    form.appendChild(titleNTodo);
    form.appendChild(contentNTodo);
    form.appendChild(button);
    let formNTodo = document.querySelector("#todoForm");
    formNTodo.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.querySelector(".inputTitleNTodo");
        let content = document.querySelector(".contentInput");
        let priority = document.querySelector("#priorityChoice");
        let project = document.querySelector("#projectChoice");
        newTodo(title.value, content.value, priority.value, project.value);
        modal.style.display = "none";
        document.querySelector(".containerRight").style.filter = "none";
        document.querySelector(".containerLeft").style.filter = "none";
        location.reload();
    }, { once: true });
}

function deleteTodo() {
    let todoC = document.querySelectorAll(".todoCard");
    todoC.forEach(element => {
        element.style.background = "#a3000e";
        element.style.borderRadius = "20px";
        element.addEventListener("click", (e) => {
            let title = e.target.innerHTML;
            let number = todoStore.findIndex(i => i.title === title)
            todoStore.splice(number, 1);
            let savedTodos = JSON.stringify(todoStore);
            localStorage.setItem("Todos", savedTodos);
            element.style.background = "none";
            element.style.borderRadius = "none";
            location.reload();
        }, { once: true });
    });
}

let addP = document.querySelector("#addTodo");
addP.addEventListener("click", () => openModalNTodo());

let deleteTD = document.querySelector("#deleteTodo");
deleteTD.addEventListener("click", () => deleteTodo());

let checkTD = document.querySelector(".displayTodos");
checkTD.addEventListener("click", (e) => {
    let spanT = e.target.getAttribute("class");
    if (spanT === "material-symbols-outlined"){
    let normalTodos = [...todoStore.filter((p) => p.priority !== "High")];
    let priorityTodos = [...todoStore.filter((p) => p.priority === "High")];
    normalTodos.splice(spanT, 1);
    let remainingTodos = [...normalTodos,...priorityTodos]
    let savedTodos = JSON.stringify(remainingTodos);
    localStorage.setItem("Todos", savedTodos);
    location.reload();
    }
});

let checkTDP = document.querySelector(".displayPriority");
checkTDP.addEventListener("click", (e) => {
    let spanT = e.target.getAttribute("class");
    if (spanT === "material-symbols-outlined"){
    let normalTodos = [...todoStore.filter((p) => p.priority !== "High")];
    let priorityTodos = [...todoStore.filter((p) => p.priority === "High")];
    priorityTodos.splice(spanT, 1);
    let remainingTodos = [...normalTodos,...priorityTodos]
    let savedTodos = JSON.stringify(remainingTodos);
    localStorage.setItem("Todos", savedTodos);
    location.reload();
    }
});

export default todoStore;