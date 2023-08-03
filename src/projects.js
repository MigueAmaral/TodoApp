import displayProjects from ".";

const mainContainer = document.querySelector(".mainContainer")
const projectsDisp = document.querySelector(".displayProjects")
let retString = localStorage.getItem("Projects")
let projects = JSON.parse(retString);

class project {
    constructor(title, tag) {
        this.title = title
        this.tag = tag //personal or work
    }
    storeProject() {
        projects.push(this)
    }
}

function newProject(title, tag) {
    let project1 = new project(title, tag);
    project1.storeProject();
    let savedProjects = JSON.stringify(projects);
    localStorage.setItem("Projects", savedProjects);
}

function deleteProjects() {
    projects.length = 0
    let savedProjects = JSON.stringify(projects);
    localStorage.setItem("Projects", savedProjects);
}

function openModalNP(title) {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", title)
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
    form.setAttribute("id", title + "Form");
    modal.appendChild(form);
    let formT = document.createElement("h1");
    formT.innerText = "New " + title;
    formT.setAttribute("class", "formTitle");
    form.appendChild(formT);
    mainContainer.appendChild(modal);
    modal.style.display = "block";
    document.querySelector(".containerRight").style.filter = "blur(2px)";
    document.querySelector(".containerLeft").style.filter = "blur(2px)";
    let titleNP = document.createElement("div")
    titleNP.setAttribute("class", "titleNP")
    let name = document.createElement("label")
    name.innerText = "Title";
    name.setAttribute("class", "titleTitle");
    titleNP.appendChild(name);
    let inputTitleNP = document.createElement("input");
    inputTitleNP.setAttribute("class", "inputTitleNP");
    titleNP.appendChild(inputTitleNP);
    let tagNP = document.createElement("div")
    tagNP.setAttribute("class", "tagNP")
    let tagTitle = document.createElement("label")
    tagTitle.innerText = "Tag";
    tagTitle.setAttribute("class", "tagTitle");
    tagNP.appendChild(tagTitle);
    let tagInput = document.createElement("select");
    tagInput.setAttribute("class", "tagInput");
    let tagChoice1 = document.createElement("option");
    tagChoice1.setAttribute("value", "Personal");
    tagChoice1.innerText="Personal"
    let tagChoice2 = document.createElement("option");
    tagChoice2.innerText="Work"
    tagChoice2.setAttribute("value", "Work");
    tagInput.appendChild(tagChoice1);
    tagInput.appendChild(tagChoice2);
    tagNP.appendChild(tagInput);
    let button = document.createElement("button")
    button.setAttribute("type", "submit")
    button.setAttribute("class", "submitButton")
    button.innerText = "Add"
    form.appendChild(titleNP);
    form.appendChild(tagNP);
    form.appendChild(button);
    let formNP = document.querySelector("#projectForm");
    formNP.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.querySelector(".inputTitleNP");
        let tag = document.querySelector(".tagInput");
        newProject(title.value, tag.value);
        modal.style.display = "none";
        document.querySelector(".containerRight").style.filter = "none";
        document.querySelector(".containerLeft").style.filter = "none";
        location.reload();
    }, { once: true });
}

function clearProjects() {
    let disp = document.querySelector(".projects")
    projectsDisp.removeChild(disp);
};

function deleteP() {
    let projectC = document.querySelectorAll(".projectCard");
    projectC.forEach(element => {
        element.style.background = "#a3000e";
        element.style.borderRadius = "20px";
        element.addEventListener("click", (e) => {
            let title = e.target.innerHTML;
            let number = projects.findIndex(i => i.title === title)
            projects.splice(number, 1);
            let savedProjects = JSON.stringify(projects);
            localStorage.setItem("Projects", savedProjects);
            element.style.background = "none";
            element.style.borderRadius = "none";
            location.reload();
        }, { once: true });
    });
}

let addP = document.querySelector("#addProject");
addP.addEventListener("click", () => openModalNP("project"));

let deletP = document.querySelector("#deleteProject");
deletP.addEventListener("click", () => deleteP())

console.log(projects);

export default projects