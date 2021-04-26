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
- [React spinners](https://www.npmjs.com/package/react-spinners)

### React

- [Deployment](https://create-react-app.dev/docs/deployment/)
- [Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)
- [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

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

Go to

```text
http://localhost:4100/
```

#### Docker

Build it

```ps
docker build -t aiof-portal .
```

Run it

```ps
docker run -it --rm -p 1337:80 aiof-portal
```

Go to

```text
http://localhost:1337/
```

(Optional) Clean up `<none>` images

```ps
docker rmi $(docker images -f “dangling=true” -q)
```

### Docker compose

From the project root directory

```ps
docker-compose up
```

Run the `npm` start script from above and follow the steps to go to `http://localhost:4100/`

### Testing

Automated tests are done via [Cypress](https://cypress.io)

```ps
.\node_modules\.bin\cypress open
```

or

```ps
npx cypress open
```

- [Commands](https://docs.cypress.io/api/commands/and)
- [Assertions](https://docs.cypress.io/guides/references/assertions)
