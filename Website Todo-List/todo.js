const input = document.getElementById('todo_input');
const add = document.getElementById('Add');
const group_list = document.querySelector('.group-list');

const erase = document.getElementById('Erase');
const clear = document.getElementById('Clear');

let todoList = JSON.parse(localStorage.getItem('User_Data')) || [];

let todo = document.createElement('ul');
todo.classList.add('todo');
group_list.appendChild(todo);

function renderData(text){
    let storage_todo = document.createElement('div');
    storage_todo.style.display = "flex";
    storage_todo.style.justifyContent = "space-between";

    let input_todo = document.createElement('li');
    input_todo.textContent = text;
    storage_todo.appendChild(input_todo);

    let delbtn = document.createElement('button');
    delbtn.textContent = "❌";
    delbtn.style.margin = "10px";
    delbtn.style.maxHeight = "35px";
    storage_todo.appendChild(delbtn);

    todo.appendChild(storage_todo);

    input_todo.addEventListener('click',()=>{
        storage_todo.style.backgroundColor = "rgb(51,51,51)";
        storage_todo.style.borderBottom = "2px solid black";
        let editBox = document.createElement('input');
        
        editBox.style.background = "rgb(51,51,51)";
        editBox.style.color = "rgb(255,193,143)";
        editBox.style.border = "none";
        editBox.style.padding = "10px";
        editBox.style.fontSize = "1.2em";
        editBox.style.lineHeight = "2em";
        editBox.style.textIndent = "5.5%";
        editBox.style.padding = "16px";
        editBox.style.flex = 1;

        editBox.type = "text";
        editBox.value = input_todo.textContent;
        input_todo.replaceWith(editBox);
        storage_todo.focus();

        function savingData(){;
            storage_todo.style.backgroundColor = "transparent";

            storage_todo.style.borderBottom = "none";
            input_todo.textContent = editBox.value.trim();
            editBox.replaceWith(input_todo);
            localStorage.setItem('User_Data',JSON.stringify(todoList.map(item => item === text ? editBox.value : item)));
        }

        editBox.addEventListener('keypress',(e)=>{
            if(e.key === "Enter"){
                savingData();
            }
        })

    })

    delbtn.addEventListener('click',()=>{
        todo.removeChild(storage_todo);
        todoList = todoList.filter(item => item !== text);
        localStorage.setItem('User_Data',JSON.stringify(todoList));
    });
}

function addData(){

    function InsertTodo(){  
        const todo_input = input.value.trim();
        if (todo_input != ""){

            renderData(todo_input);

            todoList.push(todo_input);
            localStorage.setItem('User_Data',JSON.stringify(todoList));
            input.value = "";


        } else {
            alert("anda tidak dapat memasukan nilai kosong!")
        }
    }
    function Todo_ShortcutInput(e){
        if(e.key === "Enter"){
            InsertTodo();
        }
    }

    add.addEventListener("click",InsertTodo);
    input.addEventListener('keypress',Todo_ShortcutInput);

}

function removeData(){

    todoList = []; 
}


function ClearData(){
    localStorage.removeItem('User_Data'); 
    todoList = [];
    todo.innerHTML = '';
}

document.addEventListener("DOMContentLoaded",()=>{
    // localStorage.clear();

    for (let data of todoList){
        renderData(data);
    }
    addData();
})