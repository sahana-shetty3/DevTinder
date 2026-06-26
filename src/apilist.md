## authRouter
-POST /signup
-POST /login
-POST /logout

## Profile Router
-GET /profile(viewing data)
-PATCH /profile/edit
-PATCH /profile/password

 ## connectionRequestRouter
-POST /request/send/interested/:userId
-POST /ignore/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## User
-GET /user/connection
-GET /user/request/received
-GET /user/feed -gets you feeds others profiles o the platform




Status:ignore,interested,accepted,rejected