const INITIAL_STATE = {
    culturas: [],
    controladores: [],
    sensores: [],
    leituras: [],
}

export default function app(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CULTURAS':
            return {
                ...state,
                culturas: action.culturas
            }

        case 'SET_CONTROLADORES':
            return {
                ...state,
                controladores: action.controladores
            }

        case 'SET_SENSORES':
            return {
                ...state,
                sensores: action.sensores
            }

        case 'SET_LEITURAS':
            return {
                ...state,
                leituras: action.leituras
            }
        default:
            return state;
    }

}