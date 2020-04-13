import axios from 'axios'
import store from './stores'
import router from './router'

const $axios = axios.create({
	baseURL: process.env.VUE_APP_API_SERVER+'/api/v1',
	headers: {
		'Content-Type' : 'application/json'
	}
})

$axios.interceptors.request.use (
	function ( config ) {
		config.headers.Authorization = 'Bearer '+store.state.token;
		return config;
	},
	function ( error ) {
		return Promise.reject( error )
	}
)

$axios.interceptors.response.use((response) => {
	return response
  }, (error) => {
	if (error.response.status == 401) {
	  new Promise((resolve, reject) => {
		  localStorage.removeItem('token')
		  resolve()
	  }).then(() => {
		  store.state.token = localStorage.getItem('token')
		  router.push({ name: 'login' })
	  })
	}
	return Promise.reject(error);
  })

export default $axios