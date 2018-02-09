import {fork} from 'redux-saga/effects';
import {watchRequestMessageList, watchCleanMessageSession} from './message/messageSaga';
import {watchRequestConsumerInfo} from './message/chatViewSaga';
import {watchReplyPrice} from './message/replyPriceSaga';
import {watchRequestResourceDetail} from './resource/resourceDetailSaga';
import {watchRequestLogin} from './login/loginSaga';
import {watchRequestAccountInfo} from './about/aboutSaga';
import {watchRequestSaveRegistrationId} from './tabs/tabSaga';
import {watchRequestResourceList, watchRequestSalesDiscontinuation} from './resource/resourceListSaga';
import {watchRequestProductFeatures, watchRequestResourceRelease} from './resource/resourceReleaseSaga';
export default function* rootSaga() {
    yield [
        fork(watchRequestMessageList),
        fork(watchCleanMessageSession),
        fork(watchRequestConsumerInfo),
        fork(watchRequestResourceDetail),
        fork(watchReplyPrice),
        fork(watchRequestLogin),
        fork(watchRequestAccountInfo),
        fork(watchRequestSaveRegistrationId),
        fork(watchRequestResourceList),
        fork(watchRequestSalesDiscontinuation),
        fork(watchRequestProductFeatures),
        fork(watchRequestResourceRelease)
    ];
}
