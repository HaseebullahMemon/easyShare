import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SendFile=createAsyncThunk('sendFile',async(file)=>{
    try {
        let formData=new FormData()
        formData.append('myfile',file)
        const res=await axios.post('/api/files',formData,{headers:{'content-type':"multipart/form-data"}})
        return await res.data
    } catch (error) {
        console.log(error)
    }
})
export const get_data=createAsyncThunk('get_data',async(uuid)=>{
    const res=await axios.get(`/files/${uuid}`)
    return res.data
})


const fileSlice=createSlice({
name:"file_slice",
initialState:{
    uuid:{},
    error:"",
    loading:false,
    get_data_file:{}
},
reducers:{

},
extraReducers:{
    [SendFile.fulfilled]:(state,action)=>{
       state.loading=true
        state.uuid=action.payload
    },
    [SendFile.pending]:(state,action)=>{
        state.loading=false
    },
    [get_data.fulfilled]:(state,action)=>{
        state.loading=false
        state.get_data_file=action.payload
    },
    [get_data.pending]:(state,action)=>{
        state.loading=true
    }
}
})
export default fileSlice.reducer