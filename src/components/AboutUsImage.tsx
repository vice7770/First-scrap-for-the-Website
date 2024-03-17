import React from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { cld } from "@/consts";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
const AboutUsImage = () => {  
    const myImage = cld.image('AboutUsImage').delivery(quality('auto:good')).delivery(format(auto()));
    return (
        <div className="flex justify-center pointer-events-none h-full">
            <AdvancedImage cldImg={myImage}/>
        </div>
    )
}

export default AboutUsImage;