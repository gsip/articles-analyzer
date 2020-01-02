# Articles analyzer
This is a mono repository of browser extension which can analyze any web page and show summary, keywords and similar articles.
 
**Summary** - Summary of main text.

**Keywords** - Keywords of main text (people, places, dates...).

**See also** - Similar articles from same resource.

## Used technologies
 - Typescript
 - React
 - Node.js
 - Python
 - Heroku

## Launch
To use the application or start dev script please install node version >10, yarn, docker. Make `install` and `build` script.

The Browser extension is compiled to `packages/browser-extensions/dist`.
##### install dependencies
`yarn`
##### dev
`yarn run start`
##### build
`yarn run build`
##### check code style
`yarn run lint`

## Branches
Please use branch naming using the initials of a project name and an issue id. For example, if a project is `Articles Summary` and an issue id is `7` branch will be `AS-7`. 

Also please start all commit messages with issue id like `#7 initialize the package`.
