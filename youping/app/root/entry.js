/**
 * Created by jinlongxi on 17/8/22.
 */
import ServiceURl from '../common/service';
import Request  from '../common/request';
import DeviceStorage from '../common/deviceStorage';
const Entry = {
    //更新维度好友名单
    updateRoster: function () {
        let url = ServiceURl.platformManager + 'queryLocalRoster';
        Request.postRequest(url, '', function (response) {
            let {code:code, roster:roster}=response;
            if (code === '200') {
                DeviceStorage.update('roster', roster);
            }
        }, function (err) {
            console.log(JSON.stringify(err))
        });
    },
};

export default Entry