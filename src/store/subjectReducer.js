const defaultState = {
    subjects: [],
}
//action = {type: '', pay;oad: ''}
export const subjectReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "add_fav_subject":
            return {...state,  subjects: [...state.subjects, action.payload]}
        case "remove_fav_subject":
            const newSpec = state.subjects.filter((el)=>el.id!==action.payload.id)
            return {...state, subjects: newSpec}
        default:
            return state
    }
}