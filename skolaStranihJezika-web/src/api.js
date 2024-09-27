import axios from 'axios';
import cn from './constants.json'

export default axios.create({
    baseURL: cn.path.api.baseURL
});