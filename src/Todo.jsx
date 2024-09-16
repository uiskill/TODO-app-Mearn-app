import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import ListGroup from 'react-bootstrap/ListGroup';
import Applytime from './Applytime';
import { FaRegSave } from "react-icons/fa";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null);  // Track which todo is being edited
    const [editedTask, setEditedTask] = useState("");  // Track the new task text for editing

    // Fetch todos from the Express server
    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    // Function to add a new todo
    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    // Function to delete a todo
    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(error => console.error("There was an error deleting the todo:", error));
    };

    // Function to start editing a todo
    const startEditing = (todo) => {
        setEditingTodoId(todo._id);  // Set the ID of the todo being edited
        setEditedTask(todo.task);  // Pre-fill the input with the current task
    };

    // Function to handle task update
    const handleEditChange = (e) => {
        setEditedTask(e.target.value);
    };

    // Function to save the updated todo
    const saveEdit = (id) => {
        axios.put(`http://localhost:5000/todos/${id}`, { task: editedTask })
            .then(response => {
                // Update the todos in local state with the updated todo
                setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
                setEditingTodoId(null);  // Exit editing mode
            })
            .catch(error => console.error("There was an error updating the todo:", error));
    };

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center'>Todo App</h1>
                        <Applytime />
                    </Col>
                </Row>
                <Row>
                    <Col><TodoForm onAdd={addTodo} /></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <ListGroup>
                            {todos.map((todo) => (
                                <ListGroup.Item action variant="info" className='d-flex' key={todo._id}>
                                    <div style={{ width: "85%" }}>
                                        {editingTodoId === todo._id ? (
                                            <input
                                                type="text"
                                                value={editedTask}
                                                onChange={handleEditChange}
                                                style={{ width: "100%" }}
                                            />
                                        ) : (
                                            <span><strong>{todo.task}</strong></span>
                                        )}
                                    </div>
                                    <div style={{ width: "15%", fontSize: "18px", padding: "5px" }}>
                                        {editingTodoId === todo._id ? (
                                            <FaRegSave onClick={() => saveEdit(todo._id)}  style={{ marginRight: '10px', cursor: 'pointer',color: 'purple',  }}/> 
                                        ) : (
                                            <>
                                                <FaRegEdit
                                                    style={{ marginRight: '10px', cursor: 'pointer',color: 'green',  }}
                                                    onClick={() => startEditing(todo)}
                                                />
                                                <MdAutoDelete
                                                    style={{ cursor: 'pointer' ,color: 'red',  }}
                                                    onClick={() => deleteTodo(todo._id)}
                                                />
                                            </>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
};

export default Todo;
