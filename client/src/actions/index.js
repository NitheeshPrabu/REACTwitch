import streams from '../api/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, EDIT_STREAM, 
	DELETE_STREAM, FETCH_STREAM, FETCH_STREAMS } from './types';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = (userId) => {
	return {
		type: SIGN_OUT,
		payload: userId
	};
};

// redux-thunk allows us to return non-object values from action-creators
// it gets two args: dispatch and getState functions
export const createStream = (formValues) => async (dispatch, getState) => {
	const {userId} = getState().auth;
	const response = await streams.post('/streams', {...formValues, userId: userId});

	dispatch({ type: CREATE_STREAM, payload: response.data });
	history.push('/');	//sends user to the path here
}

export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams');

	dispatch({ type: FETCH_STREAMS, payload: response.data });
}

export const fetchStream = (id) => async dispatch => {
	const response = await streams.get(`/streams/${id}`);

	dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const deleteStream = (id) => async dispatch => {
	await streams.delete(`/streams/${id}`);

	dispatch({ type: DELETE_STREAM, payload: id });
	history.push('/');
}

export const editStream = (id, formValues) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({ type: EDIT_STREAM, payload: response.data });
	history.push('/');
}