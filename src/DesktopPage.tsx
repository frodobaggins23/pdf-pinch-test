import { Page } from 'react-pdf';

interface DesktopPageProps {
    page: number;
    scale: number;
}

const DesktopPage: React.FC<DesktopPageProps> = ({page, scale}) => (
  <div className='page' >
    <Page 
      pageNumber={page}
      scale={scale} 
      renderAnnotationLayer={false}
   />
  </div>
)

export default DesktopPage;