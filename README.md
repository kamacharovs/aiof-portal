# Overview

Aiof portal

[![Build Status](https://gkamacharov.visualstudio.com/gkama-cicd/_apis/build/status/kamacharovs.aiof-portal?branchName=master)](https://gkamacharov.visualstudio.com/gkama-cicd/_build/latest?definitionId=21&branchName=master)

## Documentation

All documentation

### Libraries

- [React-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
- [React icons](https://github.com/react-icons/react-icons)
- [React tabs](https://www.npmjs.com/package/react-tabs)
- [React select](https://www.npmjs.com/package/react-select)
- [styled-components](https://styled-components.com/)
- [JS cookie](https://www.npmjs.com/package/js-cookie)
- [React charts](https://www.npmjs.com/package/react-chartjs-2)
- [React helmet](https://github.com/nfl/react-helmet)

### React

- [Deployment](https://create-react-app.dev/docs/deployment/)
- [Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)

#### Additional details

- [React tabs - Support for vertical tabs?](https://github.com/reactjs/react-tabs/issues/274)
- [How to use chart.js to create charts in React](https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react)

### How to run it

Documentation on how to run the application locally via different tools

#### Npm

Run

```powershel
npm start
```

#### Docker

Build it

```powershell
docker build -t aiof-portal .
```

Run it

```powershell
docker run -it --rm -p 1337:80 aiof-portal
```

Go to

```text
http://localhost:1337/
```

Optional command to clean up `<none>` images

```powershell
docker rmi $(docker images -f “dangling=true” -q)
```
