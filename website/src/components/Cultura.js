import React from 'react'
import { Divider } from 'semantic-ui-react';
import Controlador from './Controlador'

const Cultura = ({id, culturas, controladores, sensores, leituras}) => {
    const cultura = culturas.find(item => item.id === id);

    return <>
        <h1>{cultura.descricao}</h1>
        <Divider />
        {controladores
            .filter(item => item.cultura_id === id)
            .map(item => {
                return <Controlador 
                        controlador={item} 
                        culturas={culturas} 
                        controladores={controladores}
                        sensores={sensores}
                        leituras={leituras} />
            })
        }
    </>
}

export default Cultura