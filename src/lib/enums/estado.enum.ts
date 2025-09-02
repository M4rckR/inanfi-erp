export enum Estado {
  INACTIVO = 0,
  ACTIVO = 1,
}

export const getEstadoLabel = (estado: Estado): string => {
  switch (estado) {
    case Estado.INACTIVO:
      return 'Inactivo';
    case Estado.ACTIVO:
      return 'Activo';
    default:
      throw new Error(`Estado ${estado} no reconocido`);
  }
};

export const listEstado = [
  { label: 'Todos', value: '' },
  { label: 'Activo', value: Estado.ACTIVO.toString() },
  { label: 'Inactivo', value: Estado.INACTIVO.toString() },
];