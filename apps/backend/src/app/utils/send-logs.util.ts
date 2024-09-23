import {HttpService} from '@nestjs/axios';

const LOG_URL = 'https://crm-connector.maxim-trsv.ru';

export function sendLogsUtil<T>(http: HttpService, type: string, data: T) {
    return http.post(`${LOG_URL}/api/data?crm=mnr&type=${type}`, data).subscribe();
}
