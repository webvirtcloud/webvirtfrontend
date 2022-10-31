import ky from 'ky';

import { API_HOST } from '@/constants';

const request = ky.create({ prefixUrl: API_HOST });

export default request;
