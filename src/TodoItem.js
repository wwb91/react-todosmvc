import React, { Component } from 'react';
import './TodoItem.css'

var classNames = require('classnames')

export default class TodoItem extends Component {
    render() {
        var className = classNames({
            'completed': this.props.todo.completed,
            'editing': this.props.editedTodo == this.props.todo
        });
        return (

            <li className={className} >
                <div className='view'>
                    <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.isActive.bind(this)} />
                    <label onDoubleClick={this.editTodo.bind(this)}>{this.props.todo.content}</label>
                    <button className="destroy" onClick={this.deleteTodo.bind(this)}></button>
                </div>
                <input className="edit"
                    ref = {this.props.index}
                    value={this.props.editedTodo ? this.props.editedTodo.content : ''}
                    onChange={this.changeContent.bind(this)}
                    onBlur={this.doneEdit.bind(this)}
                    onKeyUp={this.handleEdit.bind(this)} />
            </li>
        )
    }
    toggle(e) {
        this.props.onToggle(e, this.props.todo)
    }
    inputOnFocus(e) {
        return this.props.inputOnFocus(e, this.props.todo)
    }
    editTodo(e) {
        let _this = this;
        this.props.onEditTodo(e, this.props.todo,this.props.index)
        setTimeout(()=>{
            _this.refs[_this.props.index].focus();
        },200)
        
    }
    deleteTodo(e) {
        this.props.onDeleteTodo(e, this.props.todo)
    }
    isActive(e) {
        this.props.isActive(e, this.props.todo)
    }
    changeContent(e) {
        this.props.changeContent(e, this.props.todo)
    }
    doneEdit(e) {
        this.props.doneEdit(e, this.props.todo, this.props.index)
    }
    handleEdit(e) {
        if (e.key === 'Enter') {
            this.props.doneEdit(e, this.props.todo, this.props.index)
        } else if (e.key === 'Escape') {
            this.props.cancelEdit(e, this.props.todo, this.props.index)
        }
    }
}