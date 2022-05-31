import React,{useEffect} from 'react'
import {useParams,Link,useNavigate}from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {get_data}from '../reducer/fileTransfer'

const FileLink = () => {
    const navigate=useNavigate()
    const {uuid}=useParams()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(get_data(uuid))
    },[])
    const {get_data_file}=useSelector((state)=>state.fileTransfer)
    
  return (
    <div className="main-container">
        <div className="container">
<div className="center">
<p>UUID: <span> {get_data_file.uuid}</span></p>
<p>File Name: <span>{get_data_file.fileName}</span> </p>
<p>Size: <span>{parseInt( get_data_file.fileSize/1024)}</span> kB </p>
<a className='btn' href={get_data_file.downloadLink} target='_blank'>Download</a>
</div>
        </div>
    </div>
  )
}

export default FileLink