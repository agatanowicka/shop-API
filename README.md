Shop API consumed by [React app](https://github.com/agatanowicka/shop)

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all required dependencies. Based on package.json file.

### `npm run dev`

Runs app in development mode. Including hot reload by [nodemon](https://www.npmjs.com/package/nodemon)

### `npm run prod`

Runs app in production mode.

## API description

* ```GET - /cardMenu/``` Fetch all types of products
* ```POST- /cardMenu/``` (secured-admin) Create new type of product
* ```POST- /cardMenu/product/cardMenuId``` (secured-admin) Update type of product
* ```DELETE- /cardMenu/product/cardMenuId``` (secured-admin) Delete type of product

* ```GET - /order/``` (secured) Fetch all user's orders 
* ```POST- /order/``` (secured) Create new order

* ```POST - /user/signup```Create new user
* ```POST- /user/login```  Login user

* ```GET - /collection/product```Fetch all products
* ```GET- /collection/product/productId```  Fetch one products
* ```POST - /collection/product```(secured-admin) Create new product
* ```POST- /collection/edit/productId```  (secured-admin) Update product
* ```DELETE - /collection/product/productId``` (secured-admin) Delete product