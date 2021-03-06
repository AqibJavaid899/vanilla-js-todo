// JS Selectors
const todoInputTag = document.querySelector('.input__tag') 
const todoButtonTag = document.querySelector('.button__tag')
const todoList = document.querySelector('.todo__list')


// JS Functions

// * Adding the Todo
const addingTodo = (e) => {
    e.preventDefault()

    // Creating the Main Div here
    const divTag = document.createElement('div')
    divTag.classList.add('todo__item')

    // Creating the Div 1 here
    const divTag1 = document.createElement('div')
    divTag1.classList.add('todo__firstLiner')

    // Creating the Div 2 here
    const divTag2 = document.createElement('div')
    divTag2.classList.add('todo__secondLiner')
    
    // Creating the Todo <li> inside the <div>
    const todoLi = document.createElement('li')
    todoLi.innerText = todoInputTag.value
    todoLi.classList.add('todo__li')
    divTag1.appendChild(todoLi)

    // Adding the Todo to Local Storage
    saveTodoToLocalStrorage(todoInputTag.value)

    // Creating the Date <li> inside the <div>
    const dateLi = document.createElement('li')
    //Capturing Date and Time
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()
    dateLi.innerText = `${date} @ ${time}`
    dateLi.classList.add('date__li')
    divTag1.appendChild(dateLi)

    // Main div tag appending divtag1
    divTag.append(divTag1)

    // Creating the Complete Btn inside the <div>
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add('complete__btn')
    divTag2.appendChild(completedBtn)
    
    // Creating the Delete Btn inside the <div>
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add('delete__btn')
    divTag2.appendChild(deleteBtn)

    // Main div tag appending divtag2
    divTag.append(divTag2)

    // Appending the above <div> to the ".todo__list" tag
    todoList.append(divTag)

    // Clearing the todo input tag
    todoInputTag.value = ""
}


// * Deleting the Todo
const deletingTodo = (e) => {
    const pressedBtn = e.target;

    // Deleting the Todo when Delete button clicked
    if(pressedBtn.classList[0] === 'delete__btn') {
        // Capturing the inner div sorrounding the Buttons
        const innerDiv = pressedBtn.parentElement;
        // Capturing the outer div sorrounding the entire todo
        const deletedTodo = innerDiv.parentElement;

        // Deleting the Todo from Local Storage
        deleteTodoFromLocalStorage(deletedTodo)

        // Deleting the Todo from UI
        deletedTodo.remove()
    }

    // Disabling the Todo when Cpmpleted button clicked
    if(pressedBtn.classList[0] === 'complete__btn') {
        // Capturing the inner div sorrounding the Buttons
        const innerDiv = pressedBtn.parentElement;
        // Capturing the outer div sorrounding the entire todo
        const completedTodo = innerDiv.parentElement;
        completedTodo.classList.toggle('completed__todo')
    }
}

// * Saving the Todo to Local Storage
const saveTodoToLocalStrorage = (newTodo) => {
    let currentTodos = []

    if(localStorage.getItem('TodoList') !== null) {
        // Fetching the already available Todos from Local Stroage
        currentTodos = JSON.parse(localStorage.getItem('TodoList'))
    }
    currentTodos.push(newTodo)
    // Saving the new Todos List to Local Storage
    localStorage.setItem('TodoList', JSON.stringify(currentTodos))
}



// * Getting all Todos from Local Storage
const gettingTodosFromLocalStorage = () => {
    let currentTodos = []

    if(localStorage.getItem('TodoList') !== null) {
        // Fetching the already available Todos from Local Stroage
        currentTodos = JSON.parse(localStorage.getItem('TodoList'))
    }

    // Looping through the Todos and insert it into the UI
    currentTodos.forEach((todo) => {
        // Creating the Main Div here
        const divTag = document.createElement('div')
        divTag.classList.add('todo__item')

        // Creating the Div 1 here
        const divTag1 = document.createElement('div')
        divTag1.classList.add('todo__firstLiner')

        // Creating the Div 2 here
        const divTag2 = document.createElement('div')
        divTag2.classList.add('todo__secondLiner')
        
        // Creating the Todo <li> inside the <div>
        const todoLi = document.createElement('li')
        todoLi.innerText = todo
        todoLi.classList.add('todo__li')
        divTag1.appendChild(todoLi)


        // Creating the Date <li> inside the <div>
        const dateLi = document.createElement('li')
        //Capturing Date and Time
        let date = new Date().toLocaleDateString()
        let time = new Date().toLocaleTimeString()
        dateLi.innerText = `${date} @ ${time}`
        dateLi.classList.add('date__li')
        divTag1.appendChild(dateLi)

        // Main div tag appending divtag1
        divTag.append(divTag1)

        // Creating the Complete Btn inside the <div>
        const completedBtn = document.createElement('button')
        completedBtn.innerHTML = '<i class="fas fa-check"></i>'
        completedBtn.classList.add('complete__btn')
        divTag2.appendChild(completedBtn)
        
        // Creating the Delete Btn inside the <div>
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        deleteBtn.classList.add('delete__btn')
        divTag2.appendChild(deleteBtn)

        // Main div tag appending divtag2
        divTag.append(divTag2)

        // Appending the above <div> to the ".todo__list" tag
        todoList.append(divTag)
    })
}


// * Deleting Todo from the Local Storage
const deleteTodoFromLocalStorage = (todo) => {
    let currentTodos = []

    if(localStorage.getItem('TodoList') !== null) {
        // Fetching the already available Todos from Local Stroage
        currentTodos = JSON.parse(localStorage.getItem('TodoList'))
    }
    const dltTodoText = todo.children[0].children[0].innerText
    // Getting the index of 'todo' and deleteing it from local array
    currentTodos.splice(currentTodos.indexOf(dltTodoText), 1)
    // Setting the Local Storage with the new trimmed array value
    localStorage.setItem('TodoList', JSON.stringify(currentTodos))

}


// JS Events
document.addEventListener('DOMContentLoaded', gettingTodosFromLocalStorage)
todoButtonTag.addEventListener('click', addingTodo)
todoList.addEventListener('click', deletingTodo)

