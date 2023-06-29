import { useState } from 'react'
import './App.css'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import testPdf from "./assets/test.pdf"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


function App() {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(100);

  const onDocumentLoadSuccess = ({ numPages }: {numPages: number}) => {
    setNumPages(numPages);
  }

  const increaseScale = () => {
    setScale(scale + 10);
  }

  const decreaseScale = () => {
    setScale(scale - 10);
  }
  
  return (
    <div className="App">
      <h1>PDF test</h1>
      <div className="controls">
        <button onClick={decreaseScale}>-</button>
        <span>{scale}%</span>
        <button onClick={increaseScale}>+</button>
      </div>
      <div className="pdf-container" >      
        <Document file={testPdf} onLoadSuccess={onDocumentLoadSuccess} >
          <TransformWrapper>
            <TransformComponent>
            {Array.from(new Array(numPages), (_, i) => 
              <Page 
              pageNumber={i+1}
              scale={scale/100} 
              renderAnnotationLayer={false}
              className='page' 
              />
              )}
            </TransformComponent>
          </TransformWrapper>
        </Document>
      </div>
    </div>
  )
}

export default App
