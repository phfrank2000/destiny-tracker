# Destiny Grimoire Tracker

## Setup

Install all dependencies

`npm install`

Get an API Key from Bungie

-   Log in on [bungie.net](https://www.bungie.net/)
-   Go to [bungie.net/en/Application](https://www.bungie.net/en/Application)
-   Create new App
    -   Go to App-Name and enter a Name
    -   Go to BROWSER-BASED APPS and enter `http://localhost:3000` as Origin Header
-   create a `.env` file in the main directory and add your created api key

```
REACT_APP_API_KEY=<your-api-key>
```

## Start developing

Start node server

`npm run start`

Run linter

`npm run lint`

Run build

`npm run build`
