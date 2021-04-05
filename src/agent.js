import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import config from './config';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = config.apiUrl;
const API_AUTH_ROOT = config.authUrl;
const API_METADATA_ROOT = config.metadataUrl;
const API_ASSET_ROOT = config.assetUrl;

const responseBody = res => res.body;

let token = null;
let refresh_token = null;
let expires = null;

const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const requestsAuth = {
  get: url =>
    superagent.get(`${API_AUTH_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_AUTH_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_AUTH_ROOT}${url}`, body).then(responseBody),
}

const requestsAsset = {
  get: url =>
    superagent.get(`${API_ASSET_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ASSET_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ASSET_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ASSET_ROOT}${url}`).use(tokenPlugin).then(responseBody),
}

const requestsMetadata = {
  get: url =>
    superagent.get(`${API_METADATA_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_METADATA_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  login: (email, password) =>
    requestsAuth.post('/auth/token', { email, password }),
  register: (firstName, lastName, email, password) =>
    requestsAuth.post('/user', { firstName, lastName, email, password }),
  refresh: () =>
    requestsAuth.post('/auth/token', { refresh_token: refresh_token }),
  resetPassword: (oldPassword, newPassword) =>
    requestsAuth.put(`/user/password`, { oldPassword, newPassword } ),
  resetPasswordUnauthenticated: (email, oldPassword, newPassword) =>
    requestsAuth.put(`/user/unauthenticated/password`, { email, oldPassword, newPassword }),
  getUser: () =>
    requestsAuth.get(`/user`),
  getExpires: () =>
    expires
};

const User = {
  get: () =>
    requests.get(`/user`),
  byEmail: email =>
    requests.get(`/user?email=${email}`),
  profile: () =>
    requests.get(`/user/profile`),
  profileUpsert: (payload) =>
    requests.put(`/user/profile`, payload),
  dependents: () =>
    requests.get(`/user/dependents`),
  dependentRelationships: () =>
    requests.get(`/user/dependent/relationships`),
  dependentAdd: (payload) =>
    requests.post(`/user/dependent`, payload),
  dependentDelete: (id) =>
    requests.del(`/user/dependent/${id}`),
}
const UserProfile = {
  get: email =>
    User.byEmail(email),
  upsert: (email, payload) =>
    requests.put(`/user/profile?email=${email}`, payload),
  options: () =>
    requests.get(`/user/profile/options`),
}

const Asset = {
  get: (id) =>
    requestsAsset.get(`/assets/${id}`),
  all: () =>
    requestsAsset.get(`/assets`),
  types: () =>
    requestsAsset.get(`/assets/types`),
  add: asset =>
    requestsAsset.post(`/assets`, asset),
  addSnapshot: snapshot =>
    requestsAsset.post(`/assets/snapshot`, snapshot),
  update: (id, asset) =>
    requestsAsset.put(`/assets/${id}`, asset),
  del: (id) =>
    requestsAsset.del(`/assets/${id}`),
}

const Liability = {
  add: liability =>
    requests.post('/liability', liability),
  types: () =>
    requests.get('/liability/types'),
}

const Goal = {
  all: () =>
    requests.get('/goal/all'),
  types: () =>
    requests.get('/goal/types'),
  tripTypes: () =>
    requests.get('/goal/trip/types'),
  collegeTypes: () =>
    requests.get('/goal/college/types'),
  add: goal =>
    requests.post('/goal', goal),
  delete: (id) =>
    requests.del(`/goal/${id}`),
}

const Utility = {
  usefulDocumentationByPage: page =>
    requests.get(`/useful/documentation?page=${page}`),
  usefulDocumentationByCategory: category =>
    requests.get(`/useful/documentation?category=${category}`),
}

const Fi = {
  time: payload =>
    requestsMetadata.post('/fi/time', payload),
  compoundInterest: payload =>
    requestsMetadata.post('/fi/compound/interest', payload),
  addedTime: payload =>
    requestsMetadata.post('/fi/added/time', payload),
  bmiImperial: payload =>
    requestsMetadata.post('/fi/health/bmi/imperial', payload),
  bmiMetric: payload =>
    requestsMetadata.post('/fi/health/bmi/metric', payload),
  coastSavings: payload =>
    requestsMetadata.post('/fi/coast/savings', payload),
}
const Analytics = {
  analyze: payload =>
    requestsMetadata.post('/analytics/analyze', payload),
}

const Property = {
  mortgage: payload =>
    requestsMetadata.post('/property/mortgage', payload)
}

const Retirement = {
  commonInvestments: payload =>
    requestsMetadata.post('/retirement/common/investments', payload)
}


export default {
  Auth,
  User,
  UserProfile,
  Asset,
  Liability,
  Goal,
  Utility,
  Fi,
  Analytics,
  Property,
  Retirement,
  setToken: _token => { token = _token; },
  setRefreshToken: _refreshToken => { refresh_token = _refreshToken },
  setExpires: _expires => { expires = _expires },
};
