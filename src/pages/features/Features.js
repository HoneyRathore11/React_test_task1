import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Features() {
    const {id} = useParams();
    const projectId = parseInt(id)
    const [featureIndex, setFeatureIndex] = useState(null)
    const data = JSON.parse(localStorage.getItem('allproject'))
    const [projectList, setProjectList] = useState(data);
    const [isAdd, setIsAdd] = useState(false)
    const [ isEdit, setIsEdit] = useState(false)
    // const [ isShow, setIsShow] = useState(false)
    const [name, setName] = useState('')
    const [featureList, setFeatureList] = useState({})
    // const [featureIndexData, setFeatureIndexData] = useState('')
    const navigate = useNavigate();

    const handleFeatureEdit = (id) => {
        setIsAdd(true)
        const featurename = projectList[projectId].features[id].name
        setName(featurename)
        setIsEdit(true)
        setFeatureIndex(id)
    }

    const handleFeatureShow = (id) => {
        navigate(`/project/${projectId}/feature/${id}`)

        // const featuredata = projectIndex.features[id].name
        // setFeatureIndexData(featuredata)
        // setFeatureIndex(id)
        // setIsShow(true)
        // console.log(featureIndex, 'featureIndex')
    }

    const handleFeatureDelete = (id) =>{
        const existingFeature = projectList[projectId].features
        existingFeature.splice(id, 1)
        const newdata = {...projectList[projectId], features: existingFeature} 
        const updatedData = [...projectList];
        updatedData[projectId] = newdata
        localStorage.setItem("allproject", JSON.stringify(updatedData))
        setProjectList(updatedData)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const list = {name: name}  //{projectid: projectId, name: name} when dispatch data in reducer need projectId
        setFeatureList(list)
        if ( !isEdit ) {
            const project = projectList[projectId]
            const projectfeature = project.features || []
            const features = [list, ...projectfeature]
            const newdata = {...project, features: features} 
            const updatedData = [...projectList];
            updatedData[projectId] = newdata
            localStorage.setItem("allproject", JSON.stringify(updatedData))
            setProjectList(updatedData)
        } else {
            const existingFeature = projectList[projectId].features[featureIndex];
            existingFeature.name = name;
            projectList[projectId].features[featureIndex] = existingFeature;
            const updatedData = [...projectList];
            updatedData[projectId] = projectList[projectId];
            localStorage.setItem('allproject', JSON.stringify(updatedData));
            setProjectList(updatedData);
        }
        setName('')
        setIsEdit(false);
        setIsAdd(false)
        setFeatureIndex(null);
    }

    const style= {
        backgroundColor: "rgb(171 55 135)",
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
      <h2>Project Name</h2>
      <h1 style={{ color: 'white', fontStyle: 'italic'}}>{projectList[projectId]?.name}</h1>
      <button className='btn btn-warning' onClick={()=>setIsAdd(true)}> add feature</button>
      { isAdd && 
        <div style={{marginTop: '4rem'}}>
          <h1>Features</h1>
         <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label style={{fontWeight: 'bold'}}>feature Name</Form.Label>
                <Form.Control type="text" name='name' value={name} placeholder="Add Project" onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{fontWeight: 'bold'}}>
                Submit
            </Button>
            <Button variant="primary" type="submit" style={{fontWeight: 'bold', marginLeft: '10px'}} onClick={()=>setIsAdd(false)}>
                Cancle
            </Button>
         </Form>
        </div>
      }
      <div style={{marginTop: '2rem'}}>
      <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>ProjectName</th>
                </tr>
            </thead>
            <tbody>
            { projectList[projectId].features?.map((data, index) => {
                return (
                    <React.Fragment key={data}>
                    <tr  key={index}> 
                        <td>{index+1}</td>                   
                        <td>{data.name}</td>
                        <td><button className='btn btn-light' onClick={()=>handleFeatureShow(index)}>View</button></td>
                        <td><button className='btn btn-info' onClick={()=>handleFeatureEdit(index)}>Edit</button></td>
                        <td><button className='btn btn-danger' onClick={()=>handleFeatureDelete(index)}>Remove</button></td>
                    </tr>
                    </React.Fragment>
                )
                })
            }
        </tbody>
      </table>
      </div>
      {/* { isShow && 
        <div style={{ marginTop: "2rem",  border: '1px solid black', padding: '20px 20px'}}>
            <p style={{ color: 'white',fontSize:'40px', fontStyle: 'italic', justifyContent: 'center', display: 'flex'}}> {featureIndexData}</p>
            <div>
                <h2 style={{ color: 'yellow', fontStyle: 'italic', justifyContent: 'center', display: 'flex'}}> ToDo List </h2>
                <label> add todo: <input type='text' name='addTodo' placeholder='enter todo' onChange={(e)=>setAddTodo(e.target.value)} /></label> <br/>
                <div style={{justifyContent: 'center', display: 'flex', marginTop: '1rem'}}>
                    <button className='btn btn-success' type='submit' onClick={handleAddToDo} >add todo</button> 
                </div>
            </div>
            <div>
                {projectList[projectId]?.features[featureIndex]?.todos?.map((todo, index) => {
                    return (
                        <Todo  
                            todo={todo?.todo}
                            id={index}
                        />
                    )
                })}
            </div>
        </div>
      } */}
    </div>
  )
}

export default Features