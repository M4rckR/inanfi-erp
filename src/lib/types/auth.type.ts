import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

export interface Usuario {
  usuario: {
    usuNom: string;
  };

  persona: {
    perNom: string;
    perApePat: string;
    perApeMat: string;
    perSex: Sexo;
    perCorEle: string;
  };

  puesto: {
    pstNom: string;
  };

  empresa: {
    empNom: string;
  };

  modulos: Array<Modulo>;
}

export interface Modulo {
  modId: number;
  modNom: string;
  modPri: boolean;
}

export interface Credentials {
  username: string;
  password: string;
}

export enum Sexo {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO',
}

export interface NavModule {
  id: number;
  name: string;
  url: string;
  logo: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export interface NavUser {
  name: string;
  abbr: string;
  email: string;
  position: string;
  company: string;
}

export const usuarioToNavUser = (usuario: Usuario): NavUser => {
  return {
    name: usuario.usuario.usuNom,
    abbr: usuario.usuario.usuNom.slice(0, 2).toUpperCase(),
    email: usuario.persona.perCorEle,
    position: usuario.puesto.pstNom,
    company: usuario.empresa.empNom,
  };
};