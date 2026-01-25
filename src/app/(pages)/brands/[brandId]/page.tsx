import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BrandI } from "@/interfaces"
import Image from "next/image"
import { notFound } from "next/navigation"


export default async function BrandDetails({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    notFound()
  }

  const { data: brand }: { data: BrandI } = await response.json()

  return (
    <Card className="mt-10 w-3/4 mx-auto grid md:grid-cols-2 items-center p-6">
      <div className="relative w-full aspect-square">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-contain"
        />
      </div>

      <div>
        <CardHeader>
          <CardTitle className="text-3xl">{brand.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p><b>Slug:</b> {brand.slug}</p>
          <p>
            <b>Created At:</b>{" "}
            {new Date(brand.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </div>
    </Card>
  )
}
