import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'


let classNames = require('classnames')

let filters = {
  all(todos) {
    return todos
  },

  active(todos) {
    return todos.filter((todo) => {
      return !todo.completed
    })
  },

  completed(todos) {
    return todos.filter((todo) => {
      return todo.completed
    })
  },
}

function hashChange() {
  let hashName = window.location.hash.replace(/\/?/, '')
  if (filters[hashName]) {
    App.setState({
      hashName: hashName
    })
  } else {
    window.location.hash = ''
    App.setState({
      hashName: 'all'
    })
  }
}

window.addEventListener('hashchange', hashChange)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoListSub: [],
      todoList: [
      ],
      editedTodo: null,
      hashName: 'all',
    }
  }
  render() {


    let todos = this.state.todoList.map((item, index) => {



      return (
        <TodoItem todo={item}
          editedTodo={this.state.editedTodo}
          key={index}
          index={index}
          onToggle={this.toggle.bind(this)}
          onDeleteTodo={this.deleteTodo.bind(this)}
          onEditTodo={this.editTodo.bind(this)}
          isActive={this.isActive.bind(this)}
          changeContent={this.changeContent.bind(this)}
          doneEdit={this.doneEdit.bind(this)}
          cancelEdit={this.cancelEdit.bind(this)}
          inputOnFocus={this.inputOnFocus.bind(this)}
        />

      )
    })
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todosmvc</h1>
          <TodoInput content={this.state.newTodo}
            onchange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}
          />
        </header>

        <section className="main">
          <input className="toggle-all" id = {'toggle-all'} type="checkbox" checked={this.remain() == 0}  onChange={this.setIsAll.bind(this)}/>
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos}
          </ul>
        </section>
        <TodoFooter todos={this.state.todoList}
          todosSub={this.state.todoListSub}
          hashName={this.state.hashName}
          remain={this.remain.bind(this)}
          showAll={this.showAll.bind(this)}
          showActive={this.showActive.bind(this)}
          showCompleted={this.showCompleted.bind(this)}
          clear={this.clear.bind(this)}
        />
      </section>
    )
  }

  setIsAll(){
    let val = this.remain() != 0
    this.state.todoListSub.forEach((item)=>{
      item.completed = val
    })
     this.setState({
         todoList: this.state.todoListSub,
          todoListSub: this.state.todoListSub
      })
  }

  getEditedTodo(todo) {
    return this.state.editedTodo == todo;
  }
  addTodo(event) {
    if (!event.target.value) {
      return;
    }
    this.state.todoListSub.push({
      id: idMaker(),
      content: event.target.value,
      completed: false
    })
    if(this.state.hashName != 'completed') {
      this.setState({
         todoList: this.state.todoListSub
      })
    }
    this.setState({
      newTodo: '',
     
      todoListSub: this.state.todoListSub
    })
  }



  deleteTodo(e, todo) {
    this.state.todoList.splice(this.state.todoList.indexOf(todo), 1)
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  editTodo(e, todo, index) {
    this.editCache = todo.content
    this.setState({
      editedTodo: todo
    })
  }

  inputOnFocus(e, todo) {
    return this.state.editedTodo == todo
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state);
  }

  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  isActive(e, todo) {
    this.state.todoList.forEach((element) => {
      if (element == todo) {
        element.completed = !element.completed;
      }
    });
    this.setState({
      todoList: this.state.todoList
    })
  }
  changeContent(e, todo) {
    this.state.todoList.forEach((element) => {
      if (element == todo) {
        element.content = e.target.value;
      }
    });
    this.setState({
      todoList: this.state.todoList
    })
  }
  doneEdit(e, todo, index) {
    this.setState({
      editedTodo: null

    })

    if (!todo.content) {
      this.removeTodo(index)
    }
  }
  cancelEdit(e, todo, index) {
    todo.content = this.editCache
    this.state.todoList[index] = todo
    this.setState({
      todoList: this.state.todoList,
      editedTodo: null
    })
  }
  removeTodo(index) {
    this.state.todoList.splice(index, 1)
  }
  remain() {
    return filters.active(this.state.todoListSub).length
  }
  clear() {
    let todoList = filters.active(this.state.todoListSub)
    this.setState({
      todoList: [],
      todoListSub: todoList,
      hashName: 'completed'
    })

  }
  showAll() {
    this.setState({
      todoList: filters.all(this.state.todoListSub),
      hashName: 'all'
    })
  }
  showActive() {
    this.setState({
      todoList: filters.active(this.state.todoListSub),
      hashName: 'active'

    })
  }
  showCompleted() {

    this.setState({
      todoList: filters.completed(this.state.todoListSub),
      hashName: 'completed'
    })
  }
}

export default App;

let id = 0

function idMaker() {
  id += 1
  return id
}