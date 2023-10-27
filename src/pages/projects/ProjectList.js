import React, {useState } from 'react'
// import { useSelector } from 'react-redux';
import '../../Table.css'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ProjectList() {
    const navigate = useNavigate()
    // const projects = useSelector(state => state.projects.projects)
    const proj = JSON.parse(localStorage.getItem("allproject"))
    const [projectList, setProjectList] = useState(proj)
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState('')
    const [updateDataId, setUpdateDataId] = useState(null)

    const handleView=(id)=> {
        navigate(`/project/${id}`)
    }

    const handleDelete=(index)=> {
        const list = [...projectList]
        list.splice(index, 1)
        localStorage.setItem('allproject', JSON.stringify(list))
        setProjectList(JSON.parse(localStorage.getItem('allproject')))
    }

    const handleEdit=(index)=> {
        setIsEdit(true)
        setUpdateDataId(index)
        setName(projectList[index].name)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== '') {
            const updatedList = [...projectList];
            updatedList[updateDataId] = { name };
            
            localStorage.setItem("allproject", JSON.stringify(updatedList));
            setIsEdit(false);
            setName('');
        } else {
            window.alert("name can't be blank")
        }
        setProjectList(JSON.parse(localStorage.getItem("allproject")))
    }
    

    const style= {
        backgroundColor: "rgb(201 185 70)",
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
    <div style={style} className="table-container">
      <h1>ProjectList</h1>
      <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>ProjectName</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            { proj?.map((data, index) => {
                return (
                    <React.Fragment key={data}>
                    <tr  key={index}> 
                        <td>{index+1}</td>                   
                        <td>{data.name}</td>
                        <td><button className='btn btn-success' onClick={()=>handleView(index)}>View</button></td>
                        <td><button className='btn btn-dark' onClick={()=>handleEdit(index)}>Edit</button></td>
                        <td><button className='btn btn-danger' onClick={()=>handleDelete(index)}>Remove</button></td>
                    </tr>
                    </React.Fragment>
                )
                })
            }
        </tbody>
      </table>
      { isEdit &&
        <div style={{marginTop:'20px'}}>
            <Form onSubmit={handleSubmit}>
            <h1>Edit Project</h1>
            <Form.Group className="mb-3" >
                <Form.Label style={{fontWeight: 'bold'}}>Project NAme</Form.Label>
                <Form.Control type="text" name='name' value={name} placeholder="Add Project" onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{fontWeight: 'bold'}}>
                Submit
            </Button>
            <Button variant="primary" type="submit" style={{fontWeight: 'bold', marginLeft: '10px'}} onClick={()=>setIsEdit(false)}>
                Cancle
            </Button>
            </Form>
        </div>
      }
    </div>
  )
}

export default ProjectList;