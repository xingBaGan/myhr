import axios from 'axios'
//引入组件
import {Message} from 'element-ui'
//对axios进行配置
axios.interceptors.request.use(config=> {
    // Do something before request is sent
    return config;
  }, err=> {
    Message.error({message: '请求超时!'});
    return Promise.resolve(err);
  })

  axios.interceptors.response.use(data=> {
        //返回查询信息为错误
    if (data.status && data.status == 200 && data.data.status == 'error') {
      Message.error({message: data.data.msg});
      return;
    }
    return data;
  }, err=> {
      //如果错误，友情提示
    if (err.response.status == 504||err.response.status == 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (err.response.status == 403) {
      Message.error({message: '权限不足,请联系管理员!'});
    }else {
      Message.error({message: '未知错误!'});
    }
    return Promise.resolve(err);
  })

  let base='http://localhost:3000'
  //下列都是返回axios对象
export const getRequest = (url) => {
    return axios({
      method: 'get',
      url: `${base}${url}`
    });
  }


  export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}


  