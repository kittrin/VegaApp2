const defaultState = {
    specialties: []
}
//action = {type: '', pay;oad: ''}
export const specialtyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "add_fav_spec":
            return {...state, specialties: [...state.specialties, action.payload]}
        case "remove_fav_spec":
            const newSpec = state.specialties.filter((el)=>el.id!==action.payload.id)
            return {...state, specialties: newSpec}
        default:
            return state
    }
}