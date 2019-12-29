# articles-summary
The plugin extracts important information from the text on the open page
and searches for relevant information on other pages of the site.

What information does the plugin get:
 - Summary
 - Keywords ()
 - See also
 
Summary - Summary of the text.
Keywords - Commonly mentioned entities (people, places, dates).
See also - Similar pages from the same resource.

## Information
What information does the plugin get:
### Summary
Summary of the text.

### Keywords
Keywords divided into groups:
 - Absolute or relative dates or periods.
 - Countries, cities, states.
 - Non-GPE locations, mountain ranges, bodies of water.
 - Companies, agencies, institutions, etc.
 - People, including fictional.
 - Times smaller than a day.
 - ...
 
### See also
Pages on the same resource with similar keywords.

## Frontend: 
Determines which text on the page is the main then 
sends it to the backend.
Highlights keywords on the page.
Find pages on the same resource with similar keywords.

## Backend:
1. Waiting for requests from the front
2. Upon receipt of the text, returns the token by which the front checks the results
3. Starts extracting entities / summary in parallel
4. When requested from the front, returns updates

## Used technologies
 - Node.js
 - Python (Machine learning)
 - Typescript
 - React

## Branches
Please use branch naming using the initials of a project name and an issue id. For example, if a project is `Articles Summary` and an issue id is `7` branch will be `AS-7`. 

Also please start all commit messages with issue id like `#7 initialize the package`.

## Launch
To use browser extension or start dev script please install node version >10, yarn, docker. Make `install` and `build:docker` script.

The Browser extension is compiled to `packages/browser-extensions/dist`.
##### install

`yarn`
##### dev
`yarn run start`
##### build
`yarn run build`

`yarn run build:docker`
##### check code style
`yarn run lint`

## Download to browser
![chrome](https://c.radikal.ru/c22/1909/b1/f2ac29fffad4.png)
Build folder: `packages/browser-extensions/dist`

## Google Cloud configuration
1. Install gcloud
2. Authenticate to your Google Account
`gcloud auth login`
3. Set project, it's necessary to deploy anything on App Engine
`gcloud config set project PROJECT_ID`

## Docker
To run NER processor locally
1. cd ./packages/ner 
2. docker build -t ner:v1.0 .
3. docker run -p 5001:5000 ner:v1.0 
