# TaskManager
## Before installing, make sure that you have installed:

* Local Server(WAMP, Open Server, ...) with MYSQL module.
* Node.js
* The port 3000 is free.

## Setup application Task Manager:

* At first make a git clone this repos:
```
git clone https://github.com/Danny-Clink/TaskManager
```
* Then install node modules:
```
npm install
```
* Migrate database:

at path "migration/create" find file "migration_create_db.js" setup your server **username** and **password**(default: username: 'root', password: ' ') and save this file:

```js
const sequelize = new Sequelize('', 'username', 'password', {
	...
});
```

at path "migration/create" find file "migration_create_tables.js" setup your server **username** and **password**(default: username: 'root', password: ' ') and save this file:

```js
const sequelize = new Sequelize('taskmanager', 'username', 'password', {
	...
});
```

then find the file "migration" along the path "migration" and run it in the terminal:

```
node migration.js
```

wait until the program ends with the words: "tables created".

* Include database:

at path "database" find file "database.js" setup your server **user** and **password**(default: user: 'root', password: ' ') and save this file:

```js
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'username',
	password: 'password',
	database: 'taskmanager'
});
```

* Open in the terminal project general path and run the application:

```
npm run start
```

* Open your browser and write:

```
https://localhost:3000
```

* Use the application.

## Authors

* **Denis Voloshin** - [Danny-Clink](https://github.com/Danny-Clink)