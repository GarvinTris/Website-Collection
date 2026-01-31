const note = document.querySelector('.note');
const item = document.querySelector('.item');
const add_feature = document.querySelector('.add_feature');
const todo_activitiy = document.querySelector('.todo-activity');
const todo_checkbox = document.querySelector('.todo-checkbox');

let notes = JSON.parse(localStorage.getItem('noteContent')) || [];
// note.addEventListener('keydown', (e) => {
//     console.log(e.key);
//     if(e.key === 'Enter'){
//         e.preventDefault();
//         localStorage.setItem('noteContent', note.innerHTML);
//     }
//     if(e.key === 'Delete'){
        
//     }
// });
function deleteNote(){
    const delete_item = this.parentNode;
    const id = delete_item.dataset.id;

    notes = notes.filter(n => n.id !== parseInt(id));
    localStorage.setItem('noteContent', JSON.stringify(notes));
    delete_item.remove();

    console.log("deleted!!");
}
function createNote(){
    const create_item = document.createElement('div')
    create_item.setAttribute('class','item');

    const create_checkbox = document.createElement('input')
    create_checkbox.setAttribute('type','checkbox');

    create_checkbox.addEventListener('change', checkboxList);

    const create_note = document.createElement('div');
    create_note.classList.add('note');
    create_note.setAttribute('contenteditable','true');
    create_note.setAttribute('tabindex','0');
    create_note.dataset.placeholder = 'Add Note';

    create_note.addEventListener('focus', () => {
        create_note.style.borderBottom = '2px solid blue';
    });

    create_note.addEventListener('blur', () => {
        create_note.style.borderBottom = '2px solid #ccc';
    });

    create_note.addEventListener('input',()=>{
        const text = create_note.innerText.trim();

        const idx = notes.findIndex(n => n.id === parseInt(create_item.dataset.id));

        if(idx !== -1){
            notes[idx].content = text;
            localStorage.setItem('noteContent', JSON.stringify(notes));
        }
    })
    
    const button_del = document.createElement('button');
    button_del.innerText = 'Delete';

    button_del.addEventListener('click',deleteNote);

    const id = Date.now()
    create_item.dataset.id = id;


    notes.push({id: id, content: '',checked: false});
    localStorage.setItem('noteContent', JSON.stringify(notes));

    create_item.appendChild(create_checkbox);
    create_item.appendChild(create_note);
    create_item.appendChild(button_del);

    todo_activitiy.insertBefore(create_item,add_feature); 
    console.log("created!!");

}

function checkboxList(e){
    const item = this.parentNode;
    const id = item.dataset.id;

    const note = notes.find(n => n.id === parseInt(id));
    if(note){
        note.checked = e.target.checked;
        localStorage.setItem('noteContent', JSON.stringify(notes));
    }

    if(e.target.checked){
        todo_checkbox.appendChild(this.parentNode);
    } else {
        todo_activitiy.insertBefore(this.parentNode,add_feature);
    }
}
add_feature.addEventListener('click', createNote);
function loadNotes(){
    notes.forEach(n => {
        const create_item = document.createElement('div');
        create_item.className = 'item';
        create_item.dataset.id = n.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = n.checked;
        checkbox.addEventListener('change', checkboxList);

        const note = document.createElement('div');
        note.className = 'note';
        note.contentEditable = true;
        note.innerText = n.content;

        note.addEventListener('input', () => {
            n.content = note.innerText.trim();
            localStorage.setItem('noteContent', JSON.stringify(notes));
        });

        const del = document.createElement('button');
        del.innerText = 'Delete';
        del.addEventListener('click', deleteNote);

        create_item.append(checkbox, note, del);

        if(n.checked){
            todo_checkbox.appendChild(create_item);
        } else {
            todo_activitiy.insertBefore(create_item, add_feature);
        }
    });
}
loadNotes();