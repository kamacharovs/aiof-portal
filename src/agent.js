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
  login: (email, password) =>
    requestsAuth.post('/auth/token', { email, password }),
  register: (firstName, lastName, email, password) =>
    requestsAuth.post('/user', { firstName, lastName, email, password }),
  refresh: () =>
    requestsAuth.post('/auth/token', { refresh_token: refresh_token }),
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
    requests.put(`/user/profile`, payload)
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

const Goal = {
  add: goal =>
    requests.post('/goal', goal),
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

export default {
  Articles,
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
  Comments,
  setToken: _token => { token = _token; },
  setRefreshToken: _refreshToken => { refresh_token = _refreshToken },
  setExpires: _expires => { expires = _expires },
};
