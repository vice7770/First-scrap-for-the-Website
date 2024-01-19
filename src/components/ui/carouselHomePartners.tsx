import { useState, useEffect } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import { partners, type Partner } from '@/consts';
import { $selectedPartner, setSelectedPartner } from "@/stores/partnerSelected";
import { useStore } from "@nanostores/react";

export function CarouselHomePartners() {
  const [api, setApi] = useState<CarouselApi>()
  const selectedPartner = useStore($selectedPartner)

  useEffect(() => {
    if (!api) {
      return
    }
    api.on("select", () => {
      setSelectedPartner(partners[api.selectedScrollSnap()])
    })


  }, [api])

  useEffect(() => {
    if (!api) {
      return
    }
    api.scrollTo(selectedPartner?.id || 0)
  }, [selectedPartner])

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }} 
      className="w-full max-w-xs"
      setApi={setApi}
    >
      <CarouselContent>
        {partners.map((partner, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{partner.name}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}