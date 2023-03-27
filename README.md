# FASTBOOKER
FastBooker is a web app service to book hotel rooms.
>It is in a developing stage, at this moment just backend is operative.

## Tech Stack
At this stage,
FastBooker makes use of Node.js and Express.js to settle the server up. 
It is used MongoDB as database and mongoose to communicate with this one.

### Technical aspects
Use of JWT, async functions, encryption functions (bcrypt), environment variables, custom error handler, JSdoc for documentation, etc

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
## Endpoints

###Auth routes
- http://localhost:3000/api/auth/register (POST) (Anyone can access)
- http://localhost:3000/api/auth/login (POST) (Anyone can access)

###Hotel routes
- http://localhost:3000/api/hotels/ (POST) (Only access if admin)
- http://localhost:3000/api/hotels/:id (GET) (Anyone can access)
- http://localhost:3000/api/hotels/:id (PUT) (Only access if admin)
- http://localhost:3000/api/hotels/:id (DELETE) (Only access if admin)
- http://localhost:3000/api/hotels/ (GET) (Anyone can access)

###Room routes
- http://localhost:3000/api/rooms/:hotelid (POST) (Only access if admin)
- http://localhost:3000/api/rooms/:id (GET) (Anyone can access)
- http://localhost:3000/api/rooms/:id (PUT) (Only access if admin)
- http://localhost:3000/api/rooms/:id (DELETE) (Only access if admin)
- http://localhost:3000/api/rooms/ (GET) (Anyone can access)

###User routes
- http://localhost:3000/api/users/:id (GET) (Only access if admin or the user)
- http://localhost:3000/api/users/;id (PUT) (Only access if admin or the user)
- http://localhost:3000/api/users:id (DELETE) (Only access if admin or the user)
- http://localhost:3000/api/users/ (GET) (Only access if admin)


For further information about methods, routes, controllers -> download or clone repository and open /FastBooker/api/docs/index.html
