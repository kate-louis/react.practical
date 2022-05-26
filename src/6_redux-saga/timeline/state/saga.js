import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import { callApiLike } from '../../common/api';

export function* fetchData(action) {
  yield put(actions.setLoading(true));
  yield put(actions.addLike(action.timeline.id, 1));
  yield call(callApiLike);
  yield put(actions.setLoading(false));
}
export default function* () {
  yield all([takeLeading(types.REQUEST_LIKE, fetchData)]);
}
