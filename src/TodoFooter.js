import React, { Component } from 'react';
import './TodoItem.css'

var classNames = require('classnames')

export default class TodoFooter extends Component {

    render() {

        let _remain = this.remain() || 0

        if (this.props.todosSub.length) {
            return (
                <footer className="footer">
                    <span className="todo-count"><strong>{_remain}</strong> {this.props.todos.length > 1 ? 'items' : 'item'} left</span>
                    <ul className="filters">
                        <li>
                            <a className={this.props.hashName == 'all' ? 'selected' : ''} href="javascript:void(0);" onClick={this.showAll.bind(this)}>All</a>
                        </li>
                        <li>
                            <a className={this.props.hashName == 'active' ? 'selected' : ''} href="javascript:void(0);" onClick={this.showActive.bind(this)}>Active</a>
                        </li>
                        <li>
                            <a className={this.props.hashName == 'completed' ? 'selected' : ''} href="javascript:void(0);" onClick={this.showCompleted.bind(this)}>Completed</a>
                        </li >
                    </ul >
                    <button className="clear-completed" onClick={this.clear.bind(this)} > Clear completed</button >
                </footer >
            )
        } else {
            return (
                <footer className="footer" style={{ display: 'none' }}>
                    <span className="todo-count"><strong>{_remain}</strong> {this.props.todos.length > 1 ? 'items' : 'item'} left</span>
                    <ul className="filters">
                        <li>
                            <a className={this.props.hashName == 'all' ? 'selected' : ''} href="javascript:void(0);" onClick={this.showAll.bind(this)}>All</a>
                        </li>
                        <li>
                            <a className={this.props.hashName == 'active' ? 'selected' : ''} href="javascript:void(0);" onClick={this.showActive.bind(this)}>Active</a>
                        </li>
                        <li>
                            <a className={this.props.hashName == 'completed' ? 'selected' : ''} href="javascript:void(0);" onClick={this.showCompleted.bind(this)}>Completed</a>
                        </li >
                    </ul >
                    <button className="clear-completed" onClick={this.clear.bind(this)} > Clear completed</button >
                </footer >
            )
        }
    }
    remain() {
        return this.props.remain()
    }
    clear() {
        this.props.clear()
    }
    showAll() {
        this.props.showAll()
    }
    showActive() {
        this.props.showActive()
    }
    showCompleted() {
        this.props.showCompleted()
    }
}







