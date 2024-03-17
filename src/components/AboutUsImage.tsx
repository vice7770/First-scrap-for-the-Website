import React from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import { quality } from "@cloudinary/url-gen/actions/delivery";
 
const AboutUsImage = () => {
    const cld = new Cloudinary({
        cloud: {
          cloudName: "db4cnkv8l"
        }
    });
    
    const myImage = cld.image('AboutUsImage').delivery(quality('auto:good'));
    return (
        <div className="flex justify-center">
            <AdvancedImage cldImg={myImage}/>
        </div>
    )
}

export default AboutUsImage;