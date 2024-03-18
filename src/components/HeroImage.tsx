import React from "react";
import {AdvancedImage} from '@cloudinary/react';
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { cld } from "@/consts";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
 
const HeroImage = () => { 
    const heroImage = cld.image('HeroImage').delivery(quality('auto:eco')).delivery(format(auto()));
    return (
        <div className="flex justify-center pointer-events-none w-full h-full">
            <AdvancedImage cldImg={heroImage} className="w-full h-full"/>
        </div>
    )
}

export default HeroImage;