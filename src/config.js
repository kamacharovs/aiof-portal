const Config = {
    apiUrl: process.env.REACT_APP_API_ROOT,
    authUrl: process.env.REACT_APP_API_AUTH_ROOT,
    authVersion: process.env.REACT_APP_API_AUTH_VERSION,
    metadataUrl: process.env.REACT_APP_API_METADATA_ROOT,
    assetUrl: process.env.REACT_APP_API_ASSET_ROOT,
    assetVersion: process.env.REACT_APP_API_ASSET_VERSION,

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