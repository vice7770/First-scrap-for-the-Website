import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { ShopData } from "@/utils/schemas"

import { cld } from "@/consts";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/format";

export function CarouselHomeItem({ trendItems }: { trendItems: ShopData }) {
  const urlImages = trendItems?.map((item) => {
    const image = cld.image(item.public_id).delivery(quality('auto:eco')).delivery(format(auto()));
    image.resize(scale().width(650).height(650).aspectRatio("1.0"));
    return image.toURL();
});
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}

    >
      <CarouselContent>
        {trendItems?.map((item: any, index: React.Key | null | undefined) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 border-0">
            <div className="p-1">
              <Card className="rounded-none">
                <CardContent className="flex aspect-square items-center justify-center p-0 ">
                <a href={`/shop/${item.id}/`}>
                <div className="relative">
                  <img src={urlImages[index]} draggable='false' alt={item.name} className="w-full" />
                  <h4 className="absolute top-0 left-0 p-4 bg-transparent text-black flex items-center justify-center">
                    {item.name}
                  </h4>
                </div>
                </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2"/>
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2"/>
    </Carousel>
  )
}