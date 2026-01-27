import { Draft, produce } from 'immer';
import { SET, RESET, UPDATE, REMOVE, APPEND, PREPEND } from '../constants';
import initialState from '../initialState';
import set from './set';
import update from './update';
import append from './append';
import prepend from './prepend';
import remove from './remove';
interface Action {
    key: keyof typeof initialState;
    data?: any;
    type: string;
}

const appReducer = (state = initialState, action: Action) => {
    return produce(state, (draft: Draft<any>) => {
        const data = action?.data;
        const key = action?.key;
        const oldState: any = state;
        if (!!data?.loadingState) {             //non empty string is false so as 0 undefined null {} []
            if (!!draft[key]?.loadingState) {
                draft[key] = { ...oldState[key], loading: data?.loading };
            }
            return;
        }

        switch (action.type) {
            case SET:
                const state = set({
                    data,
                    loadingState: draft[key]?.loadingState,
                    oldData: oldState[key],
                });
                draft[key] = state;
                break;
            case RESET:
                draft[key] = initialState[key];
                break;
            case UPDATE:
                draft[key] = update({
                    data,
                    loadingState: draft[key]?.loadingState,
                    oldData: oldState[key],
                    draft: draft[key],
                });
                break;
            case APPEND:
                draft[key] = append({
                    data,
                    loadingState: draft[key]?.loadingState,
                    oldData: oldState[key],
                    draft: draft[key],
                });
                break;
            case PREPEND:
                draft[key] = prepend({
                    data,
                    loadingState: draft[key]?.loadingState,
                    oldData: oldState[key],
                    draft: draft[key],
                });
                break;
            case REMOVE:
                draft[key] = remove({
                    data,
                    oldData: oldState[key],
                    draft: draft[key],
                });
                break;
            default:
                break;
        }
    });
};

export default appReducer;
