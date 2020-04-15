# SVELTO your MKT URL Shortener
## http://svelto.tk

> API to create short urls using Node, Express and MongoDB

## Quick Start

```bash
# Install dependencies
npm install

# Edit the default.json file with your mongoURI and baseUrl
# Use production.json in production env
# This project is based on https://github.com/bradtraversy/url_shortener_service

# Run
npm start
```
## Endpoint to use short url

### GET baseUrl/:friendlyCode (BASIC STRUCTURE)
### examble
http://localhost:5000/Campanha12-hH1okjV6A

## Endpoint to create short url

### POST api/url/shorten (BASIC STRUCTURE)
```
{
  "longUrl": "https://github.com/sqlectron/sqlectron-gui/releases",
  "friendlyName": "NomeDaCampanha",
  "category": "lançamento",
  "startDate": "2020-04-14",
  "endDate": "2020-04-16",
  "limitVisits": 10, 
  "expByVisitNumber": false,
  "expByTimePeriod": true
}
```
### Simple way (POST api/url/shorten)
### Create a short link without limit of number of visits and time period
### Send in "longUrl" the url you want to get short (required)
### Send in "friendlyName" the specific friendly name related to the link (optional)
### Send in "category" the global catalog/project name related to the link (optional)
### In this case set "expByVisitNumber" and "expByTimePeriod" to false
### If 
```
{
  "longUrl": "https://github.com/sqlectron/sqlectron-gui/releases",
  "friendlyName": "Campanha65",
  "category": "lançamento",
  "startDate": "2020-04-14",
  "endDate": "2020-04-16",
  "limitVisits": 0, 
  "expByVisitNumber": false,
  "expByTimePeriod": false
}
```
### Limit by visit number (POST api/url/shorten)
### Create a short link with limit of number of visits
### Send in "longUrl" the url you want to get short (required)
### Send in "friendlyName" the specific friendly name related to the link (optional)
### Send in "category" the global catalog/project name related to the link (optional)
### In this case set "expByVisitNumber" to true and "expByTimePeriod" to false
### set "limitVisits" to desired max number of visits ex (10 visits):
```
{
  "longUrl": "https://github.com/sqlectron/sqlectron-gui/releases",
  "friendlyName": "Campanha65",
  "category": "lançamento",
  "startDate": "2020-04-14",
  "endDate": "2020-04-16",
  "limitVisits": 10, 
  "expByVisitNumber": true,
  "expByTimePeriod": false
}
```
### Limit by time period (POST api/url/shorten)
### Create a short link with limit of access between two dates
### Send in "longUrl" the url you want to get short (required)
### Send in "friendlyName" the specific friendly name related to the link (optional)
### Send in "category" the global catalog/project name related to the link (optional)
### In this case set "expByVisitNumber" to false and "expByTimePeriod" to true
### set "startDate" to the date of enable link and "stopDate" to disable link ex:
```
{
  "longUrl": "https://github.com/sqlectron/sqlectron-gui/releases",
  "friendlyName": "Campanha65",
  "category": "lançamento",
  "startDate": "2020-04-14",
  "endDate": "2020-04-16",
  "limitVisits": 0, 
  "expByVisitNumber": false,
  "expByTimePeriod": true
}
```
### Limit by time period and number of visits (POST api/url/shorten)
### Create a short link with limit of access between two dates and number of visits
### Send in "longUrl" the url you want to get short (required)
### Send in "friendlyName" the specific friendly name related to the link (optional)
### Send in "category" the global catalog/project name related to the link (optional)
### This configuration will disable the link when one of conditions have been satisfied
### In this case set "expByVisitNumber" to true and "expByTimePeriod" to true
### set "limitVisits" to max visits, "startDate" to the date of enable link and "stopDate" to disable link ex:
```
{
  "longUrl": "https://github.com/sqlectron/sqlectron-gui/releases",
  "friendlyName": "Campanha65",
  "category": "lançamento",
  "startDate": "2020-04-14",
  "endDate": "2020-04-16",
  "limitVisits": 1000, 
  "expByVisitNumber": true,
  "expByTimePeriod": true
}
```