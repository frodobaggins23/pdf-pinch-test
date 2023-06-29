import { useState } from 'react';
import { TransformWrapper, TransformComponent, useTransformEffect} from 'react-zoom-pan-pinch';
import { Page } from 'react-pdf';
import './App.css'

interface TransformPageProps {
    page: number;
    scale: number;
    disablePanning: (page: number, bool: boolean) => void;
  }
  
const TransformPage: React.FC<TransformPageProps> = ({page, scale, disablePanning}) => {
  
    useTransformEffect(({ state }) => {
      if(state.scale ===1) {
        disablePanning(page, true);
      } else {
        disablePanning(page, false);
      }
    });
  
    return (
      <TransformComponent>
        <Page 
          pageNumber={page}
          scale={scale} 
          renderAnnotationLayer={false}
        />
      </TransformComponent>)
  }

interface MobilePageProps {
    page: number;
    scale: number;
}

const MobilePage: React.FC<MobilePageProps> = ({page, scale}) => {
  const [disabledPanning, setDisabledPanning] = useState<number[]>([]);

  const handleDisablePanning = (page: number, bool:boolean) => {
    if(bool && !disabledPanning.includes(page)) {
      setDisabledPanning((prevState)=>([...prevState, page]));
    } else if(!bool && disabledPanning.includes(page)) {
      setDisabledPanning((prevState)=>([...prevState.filter(p => p !== page)]));
    }
  }

    return (
      <div className='page' >
        <TransformWrapper 
          centerOnInit 
          centerZoomedOut
          panning={{disabled: disabledPanning.includes(page)}}
          >
          <TransformPage 
            page={page}
            scale={scale}
            disablePanning={handleDisablePanning}
        />
        </TransformWrapper>
      </div>
    )}

export default MobilePage;
