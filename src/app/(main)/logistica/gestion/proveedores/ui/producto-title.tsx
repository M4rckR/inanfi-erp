'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useProductoProveedor } from "../stores/producto.store"

export default function ProductoTitle() {

    const { proveedor } = useProductoProveedor()


  return (
    <Card>
        <CardHeader >
          <CardTitle className="text-2xl">Producto del Provedor {proveedor?.pvdNom}</CardTitle>
          <CardDescription>Raz.: {proveedor?.pvdRazSoc} | Documento: {proveedor?.pvdNumDoc} </CardDescription>
        </CardHeader>
      </Card>
  )
}
