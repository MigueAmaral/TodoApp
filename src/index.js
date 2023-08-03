import "./style.css"
import projects from "./projects";
import todoStore from "./ToDo";

// create layout for todo app
// navigation bar with projects on the left
// main body of todos in the right (first div for priority todos)
// create object for todos and projects
// todos in main body includes title and due date
// edit screen with all the details of the todo opens on click of each todo

const mainContainer = document.querySelector(".mainContainer")
const projectsDisp = document.querySelector(".displayProjects")
const todoDisp = document.querySelector(".displayTodos")
const containerRight = document.querySelector(".containerRight")
const priorityDisp = document.getElementById("mainTodos")
const priorityMain = document.querySelector(".displayPriority")
let todoFilter = []

function displayProjects() {
    let projectsDIV = document.createElement("div");
    projectsDIV.setAttribute("class", "projects");
    projectsDIV.setAttribute("id", "projects");
    projectsDisp.appendChild(projectsDIV);
    let allProjects = document.createElement("div");
    allProjects.setAttribute("class", "allProjects");
    allProjects.setAttribute("id", "allProjects");
    let allP = document.createElement("h1");
    allP.innerText = "All";
    allProjects.appendChild(allP);
    projectsDIV.appendChild(allProjects);
    for (let i = 0; i < projects.length; i++) {
        let projectCard = document.createElement("div")
        projectCard.setAttribute("class", "projectCard");
        projectCard.setAttribute("id", "projectCard");
        projects[i].tag === "Personal" ? projectCard.style.setProperty("--before-color", "#FF8C00") : projectCard.style.setProperty("--before-color", "#2E8B57");
        projectsDIV.appendChild(projectCard);
        let projectTitle = document.createElement("h1")
        projectTitle.setAttribute("class", "projectTitle");
        projectTitle.innerHTML = projects[i].title;
        projectCard.appendChild(projectTitle);

    };
}


function displayTodos(library) {
    let priorityTodos = [...library.filter((p) => p.priority === "High")];
    if (priorityTodos.length > 0) {
        let displayPriorityTodos = document.createElement("div")
        displayPriorityTodos.setAttribute("class", "displayPriorityTodos")
        priorityMain.appendChild(displayPriorityTodos);
    };
    for (let i = 0; i < priorityTodos.length; i++) {
        let displayPriorityTodos = document.querySelector(".displayPriorityTodos");
        let pMain = document.createElement("div")
        pMain.setAttribute("class", "pMain");
        let span = document.createElement("span");
        span.setAttribute("class", "material-symbols-outlined");
        span.setAttribute("id", i);
        span.innerText = "check_small"
        pMain.appendChild(span);
        displayPriorityTodos.appendChild(pMain);
        let priorityCard = document.createElement("div")
        priorityCard.setAttribute("class", "todoCard");
        priorityCard.setAttribute("id", "priorityCard");
        pMain.appendChild(priorityCard);
        let priorityTitle = document.createElement("h1")
        priorityTitle.setAttribute("class", "todoTitle");
        priorityTitle.innerHTML = priorityTodos[i].title;
        priorityCard.appendChild(priorityTitle);
        let priorityDesc = document.createElement("p")
        priorityDesc.setAttribute("class", "todoDesc");
        priorityDesc.innerHTML = priorityTodos[i].content;
        priorityCard.appendChild(priorityDesc);
    };
    let todosDIV = document.createElement("div");
    todosDIV.setAttribute("class", "todos");
    todosDIV.setAttribute("id", "todos");
    todoDisp.appendChild(todosDIV);
    let normalTodos = [...library.filter((p) => p.priority !== "High")];
    for (let i = 0; i < normalTodos.length; i++) {
        let todoMain = document.createElement("div")
        todoMain.setAttribute("class", "todoMain");
        let span = document.createElement("span");
        span.setAttribute("class", "material-symbols-outlined");
        span.setAttribute("id", i);
        span.innerText = "check_small"
        todoMain.appendChild(span);
        todosDIV.appendChild(todoMain);
        let todoCard = document.createElement("div")
        todoCard.setAttribute("class", "todoCard");
        todoCard.setAttribute("id", "todoCard");
        todoMain.appendChild(todoCard);
        let todoTitle = document.createElement("h1")
        todoTitle.setAttribute("class", "todoTitle");
        todoTitle.innerHTML = normalTodos[i].title;
        todoCard.appendChild(todoTitle);
        let todoDesc = document.createElement("p")
        todoDesc.setAttribute("class", "todoDesc");
        todoDesc.innerHTML = normalTodos[i].content;
        todoCard.appendChild(todoDesc);
    };
}

function clearTodos() {
    let disp = document.querySelector(".todos");
    todoDisp.removeChild(disp);
    let dispP = document.querySelector(".displayPriorityTodos")
    if (dispP !== null) {
        priorityMain.removeChild(dispP);
    }
};

let projectF = document.querySelector(".displayProjects");
projectF.addEventListener("click", (e) => {
    let projectT = e.target.innerText;
    let projectC = e.target.getAttribute("class");
    console.log(projectC)
    if (projectT !== null && projectC === "projectTitle") {
        todoFilter = todoStore.filter((f) => f.project === projectT)
        clearTodos();
        displayTodos(todoFilter);
    } else if (projectT === "All") {
        console.log("check")
        clearTodos();
        displayTodos(todoStore);
    }
});

displayProjects();
displayTodos(todoStore);


export default (displayProjects, displayTodos);
