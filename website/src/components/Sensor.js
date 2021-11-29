import moment from "moment"
import { Divider, Grid } from "semantic-ui-react"
import { colors } from '../assets/js/customStyles'

const Sensor = ({ sensor, leituras }) => {
    // let controlador = controladores.find(item => item.id === id)
    let leiturasSensor = leituras.filter(item => item.sensor_id == sensor.id)

    return <div style={styles.cardContainer}>
        <div>{sensor.descricao} - {sensor.id}</div>
        <Divider />
        <div style={styles.mainText}>
            {leiturasSensor[0]?.valor || '-'}
            {' ' + (sensor?.unidade || '')}
        </div>
        <h4 style={{ fontFamily: 'Roboto Thin' }}>{moment(leiturasSensor[0]?.created_at).format('DD/MM/YYYY HH:mm:ss')}</h4>
    </div>
}

const styles = {
    cardContainer: {
        padding: 20, 
        borderRadius: 20,
        backgroundColor: colors.green,
        color: '#fff'
    },
    mainText: {
        fontFamily: 'Roboto Thin',
        fontSize: '3em',
        color: '#fff',
        marginTop: 40,
        marginBottom: 40
    }
}

export default Sensor