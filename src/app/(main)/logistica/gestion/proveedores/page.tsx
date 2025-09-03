import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ProveedoresTable from './ui/proveedor-table'
import { Handshake } from 'lucide-react'

export default function ProveedoresPages() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 md:py-2">
      <Card>
        <CardHeader >
          <CardTitle className="text-2xl flex"> Proveedores</CardTitle>
          <CardDescription>Proveedores de InSalud</CardDescription>
        </CardHeader>
      </Card>
      {/* Listado de Proveedores */}
      <ProveedoresTable />
    </div>
  )
}
