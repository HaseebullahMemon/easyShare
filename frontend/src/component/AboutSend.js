import React, { useState } from 'react'
import {useSelector,useDispatch}from 'react-redux'
import {useParams} from 'react-router-dom'
import copy from 'copy-to-clipboard';
const AboutSend = () => {
    const {uuid}=useParams()
    const [data,SetData]=useState({emailTo:'',emailFrom:""})
    // const {uuid}=useSelector((state)=>state.fileTransfer)
    const input=(e)=>{
        SetData({...data,[e.target.name]:e.target.value})
    }
    const base_url=((window.location.href).split("/")[2])
    console.log(base_url)
 
const submitData=(e)=>{
    e.preventDefault()
    console.log({...data,uuid:uuid.uuid})
}
  return (
  <div className="main-container">
      <div className="container">
          <p>Download Link</p>
          <input type="text"  id='file_url' defaultValue={`http://${base_url}/file/${uuid}`} />
          <div className="center">
          <button className='btn' onClick={()=>{
              let file_url=document.getElementById('file_url')
              file_url.select()
    file_url.setSelectionRange(0, 99999);
           copy(file_url.value)
          }} >Copy Url</button>
          </div>
 <p>Send Email</p>

<form onSubmit={submitData}>
<label htmlFor="">Email To</label>
<input type="text" name='emailTo' onChange={input} value={data.emailTo} />
<label htmlFor="">Email From</label>
<input type="text" name='emailFrom' onChange={input} value={data.emailFrom} />
<div className="center">
<input className='btn' type="submit" value="Submit" />
</div>

</form>
      </div>
  </div>
  )
}

export default AboutSend