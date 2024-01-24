import { useEffect, useState, useRef} from "react";
import { useStore } from "@nanostores/react";

import { cart } from "@/stores/cart";

import { useIntersectionObserver } from '../lib/Hooks/useIntersectionObserver';
import { useMeasure } from '../lib/Hooks/useMeasure';
import { partners, type Partner } from '@/consts';
import { $selectedPartner, setSelectedPartner } from '@/stores/partnerSelected';
import { CarouselHomePartners } from "./ui/carouselHomePartners";


const georgiaPartnersImage = "/georgia-map-partners.png";
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
  const selectedPartner = useStore($selectedPartner)

  function handlePinClick( pin : Partner ) {
    setSelectedPartner(pin);
  }
  
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
              <img className={` ${pin.id === selectedPartner?.id ? 'pin-selected' : 'pin-image'}`} draggable="false" src={mapPin} alt="" width="32" height="32" onClick={() => handlePinClick(pin)}/>
            </div>
          ))
        )}
    </div>
  )
  }

const PartnersSection = () => {
  const $cart = useStore(cart);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
      return (
        <div>
          <h2 className="text-4xl font-semibold text-center text-gray-800 tracking-wide leading-relaxed">
            Meet our partners
          </h2>
          <div className="relative">
            <div className="flex items-center justify-center bg-center bg-cover">
                {georgiaPartnersImage && <img draggable="false" src={georgiaPartnersImage} alt=""/>}  
            </div>
          </div>
          <div className="flex items-center justify-center h-[350px] p-4 mb-8"/>
        </div>
      )
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold text-center text-gray-800 tracking-wide leading-relaxed">
        Meet our partners
      </h2>
      <PartnersMap georgiaPartnersImage={georgiaPartnersImage}/>
      <div className="flex items-center justify-center p-4 mb-8">
        <CarouselHomePartners/>
      </div>
    </div>
  )
}

export default PartnersSection;