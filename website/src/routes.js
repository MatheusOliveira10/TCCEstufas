import Home from './views/Home'
import Erro404 from './views/Erro404'
import Culturas from './views/culturas/Culturas'
import Controladores from './views/controladores/Controladores'
import Relatorios from './views/relatorios/Relatorios'
import Sensores from './views/sensores/Sensores'

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        icon: 'home',
        title: 'Home'    
    },
    {
        path: '/culturas',
        exact: true,
        component: Culturas,
        icon: 'tree',
        title: 'Culturas'    
    },
    {
        path: '/controladores',
        exact: true,
        component: Controladores,
        icon: 'microchip',
        title: 'Controladores'    
    },
    {
        path: '/sensores',
        exact: true,
        component: Sensores,
        icon: 'sitemap',
        title: 'Sensores'    
    },
    {
        path: '/relatorios',
        exact: true,
        component: Relatorios,
        icon: 'line graph',
        title: 'Relatórios'    
    },
    {
        path: '*',
        exact: true,
        component: Erro404
    },
]

export { routes }