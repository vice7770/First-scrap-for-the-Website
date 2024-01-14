import { useRef } from 'react';
import { useIntersectionObserver } from '../lib/Hooks/useIntersectionObserver';
import { useMeasure } from '../lib/Hooks/useMeasure';
import { partners, type Partner } from '@/consts';

// const georgiaPartnersImage = "/georgia-map-partners.png";
const mapPin = "map-pin.png";

type Props = {
  georgiaPartnersImage : string;
};

const PartnersMap = (props : Props) => {
  const { georgiaPartnersImage } = props;
  const ref = useRef<HTMLDivElement | null>(null)
  const [refImage, { height, offsetLeft, offsetTop, width }] = useMeasure();
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
  })
  const isVisible = !!entry?.isIntersecting

  return (
    <div className="relative">
        <div ref={ref} className="flex items-center justify-center bg-center bg-cover">
            {georgiaPartnersImage && <img ref={refImage} draggable="false" src={georgiaPartnersImage} alt=""/>}  
        </div>
        {isVisible && (
          partners.map((pin: Partner) => (
            <div
              key={pin.id}
              className="absolute z-10 animate-pin"
              style={{
                left: offsetLeft + ((pin.x / 100) * width),
                top: offsetTop + ((pin.y / 100) * height),
              }}
            >
              <img draggable="false" src={mapPin} alt="" width="32" height="32" />
            </div>
          ))
        )}
    </div>
  )
}

export default PartnersMap;