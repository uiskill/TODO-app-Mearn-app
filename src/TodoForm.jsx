import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineAddTask } from "react-icons/md";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/todos', { task });
      onAdd(response.data);
      setTask('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <Col className='text-center'>

            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />

            <Button variant="primary" size="md" onClick={addTodo}>Add Todo <MdOutlineAddTask />
             </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default TodoForm;