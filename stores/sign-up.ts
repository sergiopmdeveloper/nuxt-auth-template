type StateType = {
	sendingForm: boolean
	statusCode: number | undefined
}

const initialState: StateType = {
	sendingForm: false,
	statusCode: undefined,
}

export const useSignUp = defineStore('signUp', {
	state: () => initialState,
})
