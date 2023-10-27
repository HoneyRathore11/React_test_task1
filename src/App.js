import 'bootstrap/dist/css/bootstrap.min.css';
import AddProject from './pages/projects/AddProject.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './pages/projects/ProjectList.js';
import Features from './pages/features/Features.js';
import FeatureList from './pages/features/FeatureList.js';

function App() {
  return (
    <div className="App" >
      <h1 style={{display:'flex', justifyContent: 'center'}}> Test Task</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddProject/>}/>
          <Route path='/projectlist' element={<ProjectList/>} />
          <Route path='/project/:id' element={<Features />} />
          <Route path='/project/:projectId/feature/:id' element={<FeatureList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
