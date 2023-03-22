# FASTBOOKER
FastBooker is a web app service to book hotel rooms.
>It is in a developing stage, at this moment just backend has been worked.

## Tech Stack
At this stage,
FastBooker makes use of Node.js and Express.js to settle the server up. 
It is used MongoDB as database and mongoose to communicate with this one.

### Technical aspects
Use of JWT, cookies, async functions, encryption functions (bcrypt), environment variables, JSdoc for documentation

## How to settle down
At this stage,
**FastBooker** needs a MongoDB database.
**FastBooker** needs a token to encrypt.
URL of MongoDB and token are saved as a environment variable in .env.
Example of how it must looks like:
```
DATABASE  = mongodb://172.17.0.2:27017/fastbooker
JWT  = e972iVOryddGerQTZVKDA8xLqQXmz4as7cmXDU1Kzl2/
```
then .env is located in /FastBooker/api/

Finally run the next command inside the api folder
```
npm run dev
```
