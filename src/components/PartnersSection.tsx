import { useEffect, useState, useRef} from "react";
import { useStore } from "@nanostores/react";

import { useIntersectionObserver } from '../lib/Hooks/useIntersectionObserver';
import { useMeasure } from '../lib/Hooks/useMeasure';
import { partners, type Partner } from '@/consts';
import { $selectedPartner, setSelectedPartner } from '../stores/partnerSelected';
import { CarouselHomePartners } from "./ui/carouselHomePartners";

import {AdvancedImage} from '@cloudinary/react';
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { cld } from "@/consts";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import type { CloudinaryImage } from "@cloudinary/url-gen/index";
import { fill } from "@cloudinary/url-gen/actions/resize";


type Props = {
    georgiaPartnersImage : CloudinaryImage;
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
  const pinImage = cld.image('Pin').delivery(quality('auto:good')).resize(fill().width(32)).delivery(format(auto()));
  
  return (
    <div className="relative">
        <div ref={ref} className="flex items-center justify-center bg-center bg-cover">
            <div ref={refImage} className="flex justify-center pointer-events-none h-full">
              <AdvancedImage cldImg={georgiaPartnersImage}/>
            </div>
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
              <AdvancedImage cldImg={pinImage} className={` ${pin.id === selectedPartner?.id ? 'pin-selected' : 'pin-image'} pointer-events-none`} onClick={() => handlePinClick(pin)}/>
            </div>
          ))
        )}
    </div>
  )
  }

const PartnersSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const myImage = cld.image('GeorgiaPartnersImage').delivery(quality('auto:good')).delivery(format(auto()));

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
                <div className="flex justify-center pointer-events-none h-full">
                  <AdvancedImage cldImg={myImage}/>
                </div>
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
      <PartnersMap georgiaPartnersImage={myImage}/>
      <div className="flex items-center justify-center p-4 mb-8">
        <CarouselHomePartners/>
      </div>
    </div>
  )
}

export default PartnersSection;