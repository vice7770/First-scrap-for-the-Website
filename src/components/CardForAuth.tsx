import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
 
export default function CardForAuth({ children, title } : { children: React.ReactNode, title: string }) {
    return (
        <Card className="bg-gray-100 w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}