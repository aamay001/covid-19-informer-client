import * as mainAxios from 'axios';

const axios = {
  get: (url, options) =>
    mainAxios.get(url, {
      ...options,
      headers: {
        ...(options && options.headers ? options.headers : {}),
        'ngrok-skip-browser-warning': 'true',
      },
    }),
};

export default axios;
