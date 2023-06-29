import { useState, useEffect } from 'react'
import './App.css'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import testPdf from "./assets/test.pdf"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

type WidthType = 'sm' | 'md' | 'lg' | 'xl';

function useWidth(): WidthType {
  const [width, setWidth] = useState<WidthType>('xl');

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 576) {
        setWidth('sm');
      } else if (windowWidth < 768) {
        setWidth('md');
      } else if (windowWidth < 992) {
        setWidth('lg');
      } else {
        setWidth('xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}


function App() {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(100);
  const width = useWidth();
  const isDesktop = width === 'xl' || width === 'lg';
  console.log(width);

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
      {isDesktop && <div className="controls">
        <button onClick={decreaseScale}>-</button>
        <span>{scale}%</span>
        <button onClick={increaseScale}>+</button>
      </div>}
      <div className="pdf-container" >      
        <Document file={testPdf} onLoadSuccess={onDocumentLoadSuccess} >
          <TransformWrapper centerOnInit centerZoomedOut panning={{disabled:true}}>
            <TransformComponent>
            {Array.from(new Array(numPages), (_, i) => 
            <div className='page' >
              <Page 
              pageNumber={i+1}
              scale={isDesktop ? scale/100 : 0.5} 
              renderAnnotationLayer={false}
              />
              </div>
              )}
            </TransformComponent>
          </TransformWrapper>
        </Document>
      </div>
    </div>
  )
}

export default App
