import { Divider, Grid } from 'semantic-ui-react'
import Sensor from './Sensor'

const Controlador = ({ id, controlador, culturas, controladores, sensores, leituras }) => {
    let sensoresControlador = sensores.filter(item => item.controlador_id === controlador.id)

    return <>
        <h2>{controlador.nome}</h2>
        <Divider />
        <Grid columns="3">
            {
                sensoresControlador.map(item => {
                    return <>
                        <Grid.Column>
                            <Sensor
                                sensor={item}
                                id={item.id}
                                culturas={culturas}
                                controladores={controladores}
                                sensores={sensores}
                                leituras={leituras} />
                        </Grid.Column>
                    </>
                })
            }
        </Grid>
    </>
}

export default Controlador