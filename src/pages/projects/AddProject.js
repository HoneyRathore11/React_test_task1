import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {addProject} from '../../Redux/projectSlice'

function AddProject() {
    const [name, setName] = useState('')
    const [projects, setProjects] = useState({})
    const [isAdd, setIsAdd] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit=(e)=> {
        e.preventDefault()
        if (name !== '') {
          const allprojects = {name: name}
          setProjects(allprojects)
          dispatch(addProject(allprojects))
          setName('')
          navigate('/projectlist')
        } else {
          window.alert("project name can't be null")
        }
    }

    const style= {
        backgroundColor: "#ae4a4a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0 auto",
        padding: "20px",
        borderRadius: '5px',
      }
  return (
    <div style={style}>
      <h1>WELCOME</h1>
      <div> 
        <button className='btn btn-secondary' onClick={()=>setIsAdd(true)}>Add Project</button>
        <button style={{marginLeft: '10px'}} className='btn btn-primary' onClick={()=>navigate('/projectlist')}>Project List</button>
      </div>
      {isAdd &&
        <div style={{marginTop: '4rem'}}>
          <Form onSubmit={handleSubmit}>
          <h2>AddProject</h2>
            <Form.Group className="mb-3">
              <Form.Label style={{fontWeight: 'bold'}}>Project Name</Form.Label>
              <Form.Control type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Add Project"/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{fontWeight: 'bold'}}>
              Submit
            </Button>
            <Button variant="primary" style={{fontWeight: 'bold', marginLeft: '10px'}} onClick={()=>setIsAdd(false)}>
              Cancle
            </Button>
          </Form>
        </div>
      }
    </div>
  )
}

export default AddProject