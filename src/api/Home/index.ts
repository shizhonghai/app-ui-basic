import request from '@/utils/request';

export default {
    fetchData(obj?: Object) {
        return request({
            url: '/test-api/list',
            method: 'post',
            data: obj,
        });
    },
    deleteData(obj?: Object) {
        return request({
            url: '/test-api/del',
            method: 'get',
            params: obj,
        });
    },
};
