const Config = {
    apiUrl: process.env.REACT_APP_API_ROOT,
    apiVersion: process.env.REACT_APP_API_VERSION,
    apiPage: process.env.REACT_APP_API_PAGE,
    authUrl: process.env.REACT_APP_API_AUTH_ROOT,
    authVersion: process.env.REACT_APP_API_AUTH_VERSION,
    authPage: process.env.REACT_APP_API_AUTH_PAGE,
    assetUrl: process.env.REACT_APP_API_ASSET_ROOT,
    assetVersion: process.env.REACT_APP_API_ASSET_VERSION,
    assetPage: process.env.REACT_APP_API_ASSET_PAGE,
    liabilityUrl: process.env.REACT_APP_API_LIABILITY_ROOT,
    liabilityVersion: process.env.REACT_APP_API_LIABILITY_VERSION,
    liabilityPage: process.env.REACT_APP_API_LIABILITY_PAGE,
    metadataUrl: process.env.REACT_APP_API_METADATA_ROOT,

    /*
    Home.Getting started
        Minimum assets
        Minimum liabilities
        Minimum goals
    */
    gettingStartedMinimumAssets: process.env.REACT_APP_GETTING_STARTED_MINIMUM_ASSETS || 2,
    gettingStartedMinimumLiabilities: process.env.REACT_APP_GETTING_STARTED_MINIMUM_LIABILITIES || 2,
    gettingStartedMinimumGoals: process.env.REACT_APP_GETTING_STARTED_MINIMUM_GOALS || 1,

    /*
    Admin
     Role name
    */
    adminRoles: [
        "Admin" 
    ],
}

export default Config;