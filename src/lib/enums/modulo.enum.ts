export enum Modulo {
  MAESTRO = 1,
  LOGISTICA = 2,
  CONTABILIDAD = 3,
  SALUD = 4,
}

export const getModuloPath = (modulo: Modulo): string => {
  switch (modulo) {
    case Modulo.MAESTRO:
      return '/maestro';
    case Modulo.LOGISTICA:
      return '/logistica';
    case Modulo.CONTABILIDAD:
      return '/contabilidad';
    case Modulo.SALUD:
      return '/salud';
    default:
      throw new Error(`Modulo ${modulo} no reconocido`);
  }
};