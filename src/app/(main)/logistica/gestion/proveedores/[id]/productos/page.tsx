
import React from 'react'
import ProductosProveedoresTable from '../../ui/producto-table';
import ProductoTitle from '../../ui/producto-title';


//type Paramns = Promise<{pvdId:string}>

export default async function ProductoProveedorPage( { params }: { params: Promise<{ id: number }> } ) {

  const { id } = await params;
  //console.log('Id del porveedor ',id);
  
  return (
    <div className="flex flex-col gap-4 md:gap-6 md:py-2">
      <ProductoTitle/>
      {/* Listado de Proveedores */}
      <ProductosProveedoresTable id={id} />
    </div>
  )
}
