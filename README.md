devise token auth 検証用リポジトリ

import axios from 'axios'
const instance = axios.create({
baseURL: "hogehoge"
})

export default instance;
