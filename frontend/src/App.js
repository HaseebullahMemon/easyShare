import './App.css';
import DragAndDrop from './component/dragAnddrop'
import {Routes,Route}from 'react-router-dom'
import FileLink from './component/FileLink';
import AboutSend from './component/AboutSend';
function App() {
  return (

    <Routes>
<Route path='/' exact element={<DragAndDrop/>}/>
<Route path='/file/:uuid' element={<FileLink/>}/>
<Route path='/about/:uuid' element={<AboutSend/>}/>
    </Routes>




    );
}

export default App;
