import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {useNavigate}from 'react-router-dom'
import svg_drag_drop from '../svg/drag_drop.svg'
import {SendFile}from '../reducer/fileTransfer' 
import {useSelector,useDispatch}from 'react-redux'

function MyDropzone() {
  const [file,Setfile]=useState(null)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { uuid,error,loading}=useSelector((state)=>state.fileTransfer)
  const submitData=()=>{
    console.log(file)
    if(file){
      dispatch(SendFile(file))
      Setfile(null)
      navigate(`/about/${uuid.uuid}`)
    }
  }
  const onDrop = useCallback(acceptedFiles => {
 const file=acceptedFiles[0]
 if(!file)return alert('image is not Exist ')
    Setfile(file)
    console.log(file)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
<>{file?(<div className='main-container'>

<div className="container">

  <div className="center">
  <p>File Name: <span>{file.name}</span> </p>
  <p>Size: <span>{file.size/1024} KB </span></p>
  <p>Type:<span>{file.type}</span></p>
<button className='btn' onClick={submitData}> Upload </button>
  </div>


</div>


</div>):(   <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className='main-container'>
            <div className='container active text-center'>

<img src={svg_drag_drop}   alt="" />
    <h1>Drag & Drog or <span className='span-browser' >Browser</span> </h1>
      </div>
          </div>:
          <div className='main-container'>
            <div className='container text-center'>

<img src={svg_drag_drop} style={{height:'150px'}}  alt="" />
    <h1>Drag & Drog or <span>Browse</span> </h1>
      </div>
          </div>
      }
    </div>)}





 
    </>
  )
}
export default MyDropzone