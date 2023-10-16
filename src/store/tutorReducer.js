const defaultState = {
    tutors: [],
}
//action = {type: '', pay;oad: ''}
export const tutorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "add_fav_tutor":
            return {...state,  tutors: [...state.tutors, action.payload]}
        case "remove_fav_tutor":
            const newSpec = state.tutors.filter((el)=>el.id!==action.payload.id)
            return {...state, tutors: newSpec}
        default:
            return state
    }
}