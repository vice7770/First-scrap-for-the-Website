import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselHomeItem({ trendItems }: { trendItems: any }) {
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
                <a href={`/shop/${item.slug}/`}>
                <div className="relative">
                  <img src={item.data.image} alt={item.data.title} className="w-full" />
                  <h4 className="absolute top-0 left-0 p-4 bg-transparent text-black flex items-center justify-center">
                    {item.data.title}
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