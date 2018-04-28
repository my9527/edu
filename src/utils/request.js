import fetch from 'dva/fetch';

const BASE_URL = 'http://119.29.23.154:9527';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

const pull = (url, options) => {
  const { isFormData = false, headers, ...res } = options;

  const params =  Object.keys(res.data).reduce((result, cur)=>{
    return result += `${cur}=${res.data[cur]}&`
  }, '?').slice(0, -1);

  return request(BASE_URL+url+params, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    }
  })
};

const post = (url, options) => {
  const { isFormData = false, headers, ...res } = options;
  if( isFormData ){
    const data = new FormData();
    Object.keys(res.data).forEach((key)=>{
      data.append(key, res.data[key]);
    });

    return request(BASE_URL+url, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: data
    })
  }
  return request(BASE_URL+url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(res.data)
  })
};

const patch = (url, options) => {
  const { isFormData = false, headers, ...res } = options;

  const params =  Object.keys(res.data).reduce((result, cur)=>{
    return result += `${cur}=${res.data[cur]}&`
  }, '?').slice(0, -1);

  return request(BASE_URL+url+params, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    }
  })
};

export {
  pull,
  post,
  patch,
  BASE_URL
}
