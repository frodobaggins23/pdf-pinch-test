import { useState } from 'react'
import './App.css'
import { Document, pdfjs } from 'react-pdf';
import { OnDocumentLoadSuccess } from 'react-pdf/dist/cjs/shared/types';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import testPdf from './assets/test.pdf'
import MobilePage from './MobilePage';
import { useWidth } from './hooks';
import DesktopPage from './DesktopPage';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const calculateOptimalScaleFromPdfWidth = (width: number, pdfWidth:number) => {
  const pdfAreaWidth = width - 64; // 32px padding on each side
  const optimalScale =  Math.floor(pdfAreaWidth / (pdfWidth/100)-1) 
  return optimalScale
}

function App() {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(100);
  const [breakpoint, width] = useWidth();
  const isDesktop = breakpoint === 'xl' || breakpoint === 'lg';

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = async (page) => {
    setNumPages(page.numPages)
    if(!isDesktop) {
      // https://github.com/wojtekmaj/react-pdf/discussions/1535#discussioncomment-6205021
      const pageObj = await page.getPage(1)
      // page 1 width
      const pdfWidth = pageObj.view[2]
      setScale(calculateOptimalScaleFromPdfWidth(width, pdfWidth))
    }
  }

  const increaseScale = () => {
    setScale(scale + 10);
  }

  const decreaseScale = () => {
    setScale(scale - 10);
  }
  
  return (
    <div className="app">
      <h1>PDF test</h1>
      {isDesktop && <div className="controls">
        <button onClick={decreaseScale}>-</button>
        <span>{scale}%</span>
        <button onClick={increaseScale}>+</button>
      </div>}
      <div className={isDesktop ? 'pdf-container desktop-container ' : 'pdf-container'} >      
        <Document file={testPdf} onLoadSuccess={onDocumentLoadSuccess} >
          {Array.from(new Array(numPages), (_, i) => 
            isDesktop ? 
              <DesktopPage page={i+1} scale={scale/100} key={i+1}/> :
              <MobilePage page={i+1} key={i+1} scale={scale/100}/>
          )}
        </Document>
      </div>
    </div>
  )
}

export default App
