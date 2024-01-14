import { useRef } from 'react';
import { useIntersectionObserver } from '../lib/Hooks/useIntersectionObserver';

const georgiaPartnersImage = "/georgia-map-partners.png";
const mapPin = "map-pin.png";

const PartnersMap = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
  })
  const isVisible = !!entry?.isIntersecting
  return (
    <div className="relative">
        <div ref={ref} className="flex items-center justify-center bg-center bg-cover">
            {georgiaPartnersImage && <img draggable="false" src={georgiaPartnersImage} alt=""/>}  
        </div>
        {isVisible && (
            <>
              <div className="absolute inset-0 z-10 flex items-center justify-center animate-pin"> 
                {mapPin && <img draggable="false" src={mapPin} alt="" width="32" height="32"/>}  
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center ml-64 mt-16 animate-pin"> 
                {mapPin && <img draggable="false" src={mapPin} alt="" width="32" height="32"/>}  
              </div>
            </>
        )}
    </div>
  )
}

export default PartnersMap;