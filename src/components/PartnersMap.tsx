import { useState } from 'react';
const georgiaPartnersImage = "/georgia-map-partners.png";
const mapPin = "map-pin.png";

const PartnersMap = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="relative">
        <div className="flex items-center justify-center bg-center bg-cover">
            {georgiaPartnersImage && <img draggable="false" src={georgiaPartnersImage} alt="" onLoad={() => setImageLoaded(true)}/>}  
        </div>
        {imageLoaded && (
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