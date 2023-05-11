import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.chengzier.cn:8000/',
    timeout: 1000 * 10
})
