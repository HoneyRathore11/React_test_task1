import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    features: [],
    error: null
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const existingdata = JSON.parse(localStorage.getItem('allproject')) || [];
            const abc= [action.payload, ...existingdata]
            localStorage.setItem("allproject", JSON.stringify(abc))
            state.projects.push(action.payload)
        },          
        addFeature: (state, action) => {
            const existingdata = JSON.parse(localStorage.getItem('allproject')) || [];
            const projectIndex = action.payload.projectid;
            const project = existingdata[projectIndex]
            const projectfeature = project.features || []
            const features = [action.payload.name, ...projectfeature]
            const newdata = {...project, features:features} 
            const updatedData = [...existingdata];
            // eslint-disable-next-line no-unused-expressions
            updatedData[projectIndex]=newdata
            localStorage.setItem("allproject", JSON.stringify(updatedData))
            state.features.push(action.payload)
        },
    }
})

export const {addProject, addFeature} = projectSlice.actions
export default projectSlice.reducer;


