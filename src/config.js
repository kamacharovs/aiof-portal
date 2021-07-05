const Config = {
    apiUrl: process.env.REACT_APP_API_ROOT,
    apiVersion: process.env.REACT_APP_API_VERSION,
    apiPage: process.env.REACT_APP_API_PAGE,
    authUrl: process.env.REACT_APP_API_AUTH_ROOT,
    authVersion: process.env.REACT_APP_API_AUTH_VERSION,
    authPage: process.env.REACT_APP_API_AUTH_PAGE,
    metadataUrl: process.env.REACT_APP_API_METADATA_ROOT,
    assetUrl: process.env.REACT_APP_API_ASSET_ROOT,
    assetVersion: process.env.REACT_APP_API_ASSET_VERSION,
    assetPage: process.env.REACT_APP_API_ASSET_PAGE,

    /*
    Home.Getting started
        Minimum assets
        Minimum liabilities
        Minimum goals
    */
   gettingStartedMinimumAssets: process.env.REACT_APP_GETTING_STARTED_MINIMUM_ASSETS || 2,
   gettingStartedMinimumLiabilities: process.env.REACT_APP_GETTING_STARTED_MINIMUM_LIABILITIES || 2,
   gettingStartedMinimumGoals: process.env.REACT_APP_GETTING_STARTED_MINIMUM_GOALS || 1,
}

export default Config;