import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom'

function FeatureList() {
    const {projectId, id} = useParams();
    // console.log(projectId, id, "ids")
    const data = JSON.parse(localStorage.getItem('allproject'))
    const [ projectList, setProjectList] = useState(data)
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [todoId, setTodoId] = useState(null);
    const [addTodo, setAddTodo] = useState('')
    const [isDone, setIsDone] = useState(false)
    const [projectIndex, setProjectIndex] = useState(data[projectId])

    const handleTodoEdit = (index) => {
        setIsAdd(true)
        const data = projectIndex.features[id].todos[index].todo
        setAddTodo(data)
        setIsEdit(true)
        setTodoId(index)
    }

    const handleTodoDelete = (index) => {
        const updatedData = projectIndex.features[id].todos
        updatedData.splice(index, 1)
        const feature = projectIndex.features[id]
        const newdata = {...feature, todos: updatedData}
        const existingproject = [...projectList]
        existingproject[projectId].features[id] = newdata
        localStorage.setItem("allproject", JSON.stringify(existingproject))
        setProjectList(JSON.parse(localStorage.getItem('allproject')))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newtodo = {todo: addTodo, done: false}
        if (!isEdit) {
            const feature = projectIndex.features[id]
            const featurestodo = feature.todos || []
            const adddata = [newtodo, ...featurestodo]
            const newdata = {...feature, todos: adddata}
            const existingproject = [...projectList]
            existingproject[projectId].features[id] = newdata
            localStorage.setItem("allproject", JSON.stringify(existingproject))
        } else{
            const existingTodo = projectIndex.features[id].todos[todoId];
            existingTodo.todo = addTodo;
            const updatedData = [...projectList];
            localStorage.setItem("allproject", JSON.stringify(updatedData))
            setProjectList(updatedData);
        }
        const getdata = JSON.parse(localStorage.getItem('allproject'))
        setProjectList(getdata)
        setProjectIndex(getdata[projectId])
        setIsAdd(false)
        setAddTodo('')
    }

    const addCheck = (index) => {
        const updatedData = [...projectList];
        const existingTodo = updatedData[projectId].features[id].todos[index];
        existingTodo.done = !existingTodo.done;
        
        localStorage.setItem('allproject', JSON.stringify(updatedData));
        setProjectList(updatedData);
      };
    
    const style= {
        backgroundColor: "rgb(78 150 117)",
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
            <h1 style={{color:'blue', fontFamily:"Interstate Bold", fontStyle:"revert-layer", fontWeight:'bold'}}>{projectIndex?.features[id]?.name}</h1>
            <div>
            <h3> ToDo List </h3>
            <button className='btn btn-warning' onClick={()=>setIsAdd(true)}>add todo</button>
            <div style={{marginTop: '20px'}}>
            { isAdd && 
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label style={{fontWeight: 'bold'}}>todo Name</Form.Label>
                        <Form.Control type="text" name='addTodo' value={addTodo} placeholder='enter todo' onChange={(e)=>setAddTodo(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{fontWeight: 'bold'}}>
                        Submit
                    </Button>
                    <Button variant="danger" type="submit" style={{fontWeight: 'bold', marginLeft: '10px'}} onClick={()=>setIsAdd(false)}>
                        Cancle
                    </Button>
                </Form>
            }
            </div>
            <div style={{marginTop: '2rem'}}>
                <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>ProjectName</th>
                            </tr>
                        </thead>
                        <tbody>
                        { projectIndex.features[id].todos?.map((data, index) => {
                            return (
                                <React.Fragment key={data}>
                                <tr  key={index}> 
                                    <td>{index+1}</td>                   
                                    <td style={{ textDecoration: data.done ? 'line-through' : null }}>{data.todo}</td>
                                    <td><button className='btn btn-info' onClick={()=>handleTodoEdit(index)}>Edit</button></td>
                                    <td><button className='btn btn-danger' onClick={()=>handleTodoDelete(index)}>Remove</button></td>
                                    <td><input type='checkbox' style={{height: '20px', width: '20px'}} checked={projectIndex.features[id].todos[index].done} onChange={()=>addCheck(index)}/></td>
                                </tr>
                                </React.Fragment>
                            )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}

export default FeatureList;