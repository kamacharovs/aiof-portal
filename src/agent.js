import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import config from './config';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = config.apiUrl;
const API_AUTH_ROOT = config.authUrl;
const API_METADATA_ROOT = config.metadataUrl;

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
let refresh_token = null
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
  post: (url, body) =>
    superagent.post(`${API_AUTH_ROOT}${url}`, body).then(responseBody)
}
const requestsMetadata = {
  get: url =>
    superagent.get(`${API_METADATA_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_METADATA_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  login: (username, password) =>
    requestsAuth.post('/auth/token', { username, password }),
  register: (firstName, lastName, email, username, password) =>
    requestsAuth.post('/user', { firstName, lastName, email, username, password }),
  refresh: () =>
    requestsAuth.post('/auth/token', { refresh_token: refresh_token }),
};

const User = {
  get: () =>
    requests.get(`/user`),
  byUsername: username =>
    requests.get(`/user?username=${username}`),
  profile: () =>
    requests.get(`/user/profile`),
  profileUpsert: (payload) =>
    requests.put(`/user/profile`, payload)
}
const UserProfile = {
  get: username =>
    User.byUsername(username),
  upsert: (username, payload) =>
    requests.put(`/user/profile?username=${username}`, payload),
}

const Asset = {
  add: asset =>
    requests.post('/asset', asset),
  update: (publicKey, asset) =>
    requests.put(`/asset/${publicKey}`, asset),
  delete: publicKey =>
    requests.del(`/asset/${publicKey}`),
  types: () =>
    requests.get('/asset/types'),
  breakdown: payload =>
    requestsMetadata.post('/asset/breakdown', payload)
}

const Liability = {
  add: liability =>
    requests.post('/liability', liability),
  types: () =>
    requests.get('/liability/types'),
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
    requestsMetadata.post('fi/coast/savings', payload),
}



const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  User,
  UserProfile,
  Asset,
  Liability,
  Fi,
  Comments,
  Profile,
  setToken: _token => { token = _token; },
  setRefreshToken: _refreshToken => { refresh_token = _refreshToken },
};
