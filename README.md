# books-app
This is an example of a simple book buying app. In it I used docker v2.0.0.0, symfony v5 (REST API - Api-platform), angular v11. To run the application, you need to run the following commands in the project root:
- make application-up
- make application
- make database

Port: 80 must be free. if you run the project from under windows you need to add some lines to the end of the hosts file, which is located along the path: C: \ Windows \ System32 \ drivers \ etc \ hosts:

- 127.0.0.1 api.books www.api.books
- 127.0.0.1 frontend.books www.frontend.books

Also, you must generate 2 certificates for authentication and place them in the config / jwt directory (https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md#generate-the-ssl-keys )

At now the application in dev mode. You should start symfony dev-server: cd backend -> symfony server:start

After that, go to the http://frontend.books link in your browser and enter the application: admin@gmail.com / 123456.
