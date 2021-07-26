import Home from './views/Home'
import Erro404 from './views/Erro404'
import Culturas from './views/culturas/Culturas'
import Controladores from './views/controladores/Controladores'
import Leituras from './views/leituras/Leituras'
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
        path: '/leituras',
        exact: true,
        component: Leituras,
        icon: 'line graph',
        title: 'Leituras'    
    },
    {
        path: '*',
        exact: true,
        component: Erro404
    },
]

export { routes }