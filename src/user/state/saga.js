import { all, call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { actions, Types } from './index';
import { callApi } from '../../common/util/api';
import { makeFetchSaga, deleteApiCache } from '../../common/util/fetch';

function* fetchUser({ name }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword: name },
  });

  if(isSuccess && data) {
    const user = data.find(item => item.name === name );
    if(user) {
      yield put(actions.setValue('user', user));
    }
  }
}

function* fetchUpdateUser({ user, key, value }) {
  const oldValue = user[key];
  yield put(actions.setValue('user', { ...user, [key]: value }))
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/update',
    method: 'post',
    data: { name: user.name, key, value, oldValue },
  });
  if(isSuccess && data) {
    deleteApiCache();
  } else {
    yield put(actions.setValue('user', user));
  }
}

export default function* userSaga() {
  yield all([
    // takeEvery(Types.FetchUser, fetchUser)
    takeEvery(
      Types.FetchUser, 
      makeFetchSaga({ fetchSaga: fetchUser,  canCache: true })
    ),
    takeLeading(
      Types.FetchUpdateUser,
      makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false })
    )
  ]);
}
