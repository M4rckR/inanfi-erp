import {
  Boxes,
  Building2,
  Cross,
  Fingerprint,
  IdCard,
  Landmark,
  LayoutDashboard,
  ScanHeart,
  SquareChartGantt
} from 'lucide-react';

export const navigation = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  modules: [
    {
      id: 1,
      name: 'Maestro',
      url: '/maestro',
      logo: Building2,
    },
    {
      id: 2,
      name: 'Logística',
      url: '/logistica',
      logo: Boxes,
    },
    {
      id: 3,
      name: 'Contabilidad',
      url: '/contabilidad',
      logo: Landmark,
    },
    {
      id: 4,
      name: 'Salud',
      url: '/salud',
      logo: Cross,
    },
  ],
  navMains: [
    {
      id: 1,
      name: 'Maestro',
      navMain: [
        {
          title: 'Dashboard',
          url: '/maestro/dashboard',
          icon: LayoutDashboard,
          isActive: false,
        },
        {
          title: 'Personal',
          url: '/maestro/personal',
          icon: IdCard,
          isActive: true,
          items: [
            {
              title: 'Usuarios',
              url: '/maestro/personal/usuarios',
            },
            {
              title: 'Puestos',
              url: '/maestro/personal/puestos',
            },
          ],
        },
        {
          title: 'Organización',
          url: '/maestro/organizacion',
          icon: Building2,
          isActive: true,
          items: [
            {
              title: 'Empresas',
              url: '/maestro/organizacion/empresas',
              isActive: false,
            },
            {
              title: 'Modulos',
              url: '/maestro/organizacion/modulos',
              isActive: false,
            },
          ],
        },
      ]
    },
    {
      id: 2,
      name: 'Logística',
      navMain: [
        {
          title: 'Dashboard',
          url: '/logistica/dashboard',
          icon: LayoutDashboard,
          isActive: false,
        },
        {
          title: 'Gestión',
          url: '/logistica/gestion',
          icon: IdCard,
          isActive: false,
          items: [
            {
              title: 'Proveedores',
              url: '/logistica/gestion/proveedores',
              isActive: false,
            },
            {
              title: 'Productos',
              url: '/logistica/gestion/productos',
              isActive: false,
            },
            {
              title: 'Marcas',
              url: '/logistica/gestion/marcas',
              isActive: false,
            },
            {
              title: 'Categorías',
              url: '/logistica/gestion/categorias',
              isActive: false,
            },
          ],
        },

      ]
    },
    {
      id: 3,
      name: 'Contabilidad',
      navMain: [
        {
          title: 'Dashboard',
          url: '/contabilidad/dashboard',
          icon: LayoutDashboard,
          isActive: false,
        },
        {
          title: 'Reportes',
          url: '/contabilidad/reportes',
          icon: SquareChartGantt,
          isActive: false,
        },
      ]
    },
    {
      id: 4,
      name: 'Salud',
      navMain: [
        {
          title: 'Dashboard',
          url: '/salud/dashboard',
          icon: LayoutDashboard,
          isActive: false,
        },
        {
          title: 'Clínica',
          url: '/clinica',
          icon: Fingerprint,
          isActive: true,
          items: [
            {
              title: 'Pacientes',
              url: '/salud/pacientes',
              isActive: false,
            },
          ],
        },
        {
          title: 'Atencion',
          url: '/atencion',
          icon: ScanHeart,
          isActive: true,
          items: [
            {
              title: 'Consultas',
              url: '/salud/consultas',
              isActive: false,
            }
          ],
        },
        {
          title: 'Analisis',
          url: '/analisis',
          icon: SquareChartGantt,
          isActive: false,
          items: [
            {
              title: 'Reportes',
              url: '/salud/reportes',
              isActive: false,
            },
          ],
        },
      ]
    }
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/salud/dashboard',
      icon: LayoutDashboard,
      isActive: false,
    },
    {
      title: 'Clínica',
      url: '/clinica',
      icon: Fingerprint,
      isActive: true,
      items: [
        {
          title: 'Pacientes',
          url: '/salud/pacientes',
          isActive: false,
        },
      ],
    },
    {
      title: 'Atencion',
      url: '/atencion',
      icon: ScanHeart,
      isActive: true,
      items: [
        {
          title: 'Consultas',
          url: '/salud/consultas',
          isActive: false,
        }
      ],
    },
    {
      title: 'Analisis',
      url: '/analisis',
      icon: SquareChartGantt,
      isActive: false,
      items: [
        {
          title: 'Reportes',
          url: '/salud/reportes',
          isActive: false,
        },
      ],
    },
  ],
}