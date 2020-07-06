import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: '',
    },
    reducers: {
        getUser: (state, action) => {
            state.user = fetch("http://localhost:5000/aiof/user/username/" + action.payload)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            user: result
                        });
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                );
        },
    },
});

export const { getUser } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getUser = username => dispatch => {
    dispatch(getUser(username));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.user;

export default userSlice.reducer;
