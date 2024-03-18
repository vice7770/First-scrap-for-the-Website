import React from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { cld } from "@/consts";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { fill } from "@cloudinary/url-gen/actions/resize";
const LogoImage = () => {  
    const myImage = cld.image('LogoGeorgiaFlag').delivery(quality('auto:good')).resize(fill().width(96)).delivery(format(auto()));
    return (
        <div className="flex justify-center pointer-events-none">
            <AdvancedImage cldImg={myImage}/>
        </div>
    )
}

export default LogoImage;