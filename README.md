![shopiette](./static/readme/shopiette-banner.png)

# Shopiette

Shopiette simplifies creating SvelteKit apps with the Shopify Storefront API, enabling you to quickly build and customize e-commerce sites. Enjoy the best of both worlds with minimal effort, saving you time and allowing you to focus on your design integration.

## Summary

- [Getting started](#getting-started)
  - [Installation](#installation)
- [Methods](#methods)
  - [Cart](#cart)
    - [get](#getparams-cartgetparams-promisecartgetdatacart)
    - [create](#create-promisecartcreatedatacartcreate)
    - [updateBuyer](#updatebuyerparams-cartupdatebuyerparams-promisecartupdatebuyerdatacartbuyeridentityupdate)
    - [addLine](#addlineparams-cartaddlineparams-promisecartaddlinedatacartlinesadd)
    - [updateLines](#updatelinesparams-cartupdatelinesparams-promisecartupdatelinesdatacartlinesupdate)
    - [deleteLines](#deletelinesparams-cartdeletelinesparams-promisecartdeletelinesdatacartlinesremove)
  - [Customer](#customer)
    - [get](#getparams-customergetparams-promisecustomergetdatacustomer)
    - [create](#createparams-customercreateparams-promisecustomercreatedatacustomercreate)
    - [login](#loginparams-customerloginparams-promisecustomerlogindatacustomeraccesstokencreate)
    - [logout](#logoutparams-customerlogoutparams-promisecustomerlogoutdatacustomeraccesstokendelete)
    - [recover](#recoverparams-customerrecoverparams-promisecustomerrecoverdatacustomerrecover)
    - [reset](#resetparams-customerresetparams-promisecustomerresetdatacustomerreset)
  - [Product](#product)
    - [get](#getparams-productgetparams-promiseproductgetdataproduct)
    - [getAll](#getallparams-productgetallparams-promiseproductgetalldataproducts)
  - [Search](#search)
    - [getProducts](#getproductsparams-searchgetproductsparams-promisesearchgetproductsdata)
  - [Shop](#shop)
    - [get](#get-promiseshopgetdatashop)
- [Types](#types)
  - [Cart](#cart-1)
  - [Customer](#customer-1)
  - [Image](#image)
  - [Price](#price)
  - [Product](#product-1)
  - [Shop](#shop-1)
  - [UserError](#usererror)

## Getting started

### Installation

Soon...

## Methods

### Cart

#### `get(params: CartGetParams): Promise<CartGetData['cart']>`

Get cart information.

```ts
const cart = Cart.get({
	id: 'gid://shopify/Cart/1'
});
```

#### Parameters

| name | type     | default     | description   |
| ---- | -------- | ----------- | ------------- |
| `id` | `string` | `undefined` | The cart's id |

#### Returns

```ts
type Return = Cart;
```

[Reference](#cart-1)

---

#### `create(): Promise<CartCreateData['cartCreate']>`

Create a cart.

```ts
const { cart } = Cart.create();
```

#### Returns

```ts
type Return = {
	cart: Cart;
};
```

[Reference](#cart-1)

---

#### `updateBuyer(params: CartUpdateBuyerParams): Promise<CartUpdateBuyerData['cartBuyerIdentityUpdate']>`

Add or update a cart buyer identity.

```ts
const { userErrors } = Cart.updateBuyer({
	cartId: 'gid://shopify/Cart/1',
	customerAccessToken: 'H3fDFVT5JyB2yRLr0rNJNdBsdSqDxk7k',
	email: 'customer@email.com'
});
```

#### Parameters

| name                  | type     | default     | description                 |
| --------------------- | -------- | ----------- | --------------------------- |
| `cartId`              | `string` | `undefined` | The cart's id               |
| `customerAccessToken` | `string` | `undefined` | The customer's access token |
| `email`               | `string` | `undefined` | The customer's email        |

#### Returns

```ts
type Return = {
	userErrors: UserError[];
};
```

[Reference](#usererror)

---

#### `addLine(params: CartAddLineParams): Promise<CartAddLineData['cartLinesAdd']>`

Add a line to a cart.

```ts
const { cart, userErrors } = Cart.addLine({
	cartId: 'gid://shopify/Cart/1',
	productVariantId: 'gid://shopify/Variant/1',
	quantity: 2
});
```

#### Parameters

| name               | type     | default     | description                          |
| ------------------ | -------- | ----------- | ------------------------------------ |
| `cartId`           | `string` | `undefined` | The cart's id                        |
| `productVariantId` | `string` | `undefined` | The product variant's id token       |
| `quantity`         | `number` | `1`         | The quantity to be added to the cart |

#### Returns

```ts
type Return = {
	cart: Cart;
	userErrors: UserError[];
};
```

[Reference](#cart-1)

---

#### `updateLines(params: CartUpdateLinesParams): Promise<CartUpdateLinesData['cartLinesUpdate']>`

Update a line in a cart.

```ts
const { cart, userErrors } = Cart.addLine({
	cartId: 'gid://shopify/Cart/1',
	lines: [
		{
			id: 'gid://shopify/Line/1',
			quantity: 3
		}
	]
});
```

#### Parameters

| name     | type                                                            | default     | description               |
| -------- | --------------------------------------------------------------- | ----------- | ------------------------- |
| `cartId` | `string`                                                        | `undefined` | The cart's id             |
| `lines`  | `Pick<Cart['lines']['edges'][0]['node'], 'id' \| 'quantity'>[]` | `1`         | The new lines of the cart |

#### Returns

```ts
type Return = {
	cart: Cart;
	userErrors: UserError[];
};
```

[Reference](#cart-1)

---

#### `deleteLines(params: CartDeleteLinesParams): Promise<CartDeleteLinesData['cartLinesRemove']>`

Delete a line in a cart.

```ts
const { cart, userErrors } = Cart.addLine({
	cartId: 'gid://shopify/Cart/1',
	lineIds: ['gid://shopify/Line/1']
});
```

#### Parameters

| name      | type       | default     | description               |
| --------- | ---------- | ----------- | ------------------------- |
| `cartId`  | `string`   | `undefined` | The cart's id             |
| `lineIds` | `string[]` | `undefined` | The new lines of the cart |

#### Returns

```ts
type Return = {
	cart: Cart;
	userErrors: UserError[];
};
```

[Reference](#cart-1)

### Customer

#### `get(params: CustomerGetParams): Promise<CustomerGetData['customer']>`

Get customer information.

```ts
const customer = Customer.get({
	accessToken: 'H3fDFVT5JyB2yRLr0rNJNdBsdSqDxk7k'
});
```

#### Parameters

| name          | type     | default     | description                 |
| ------------- | -------- | ----------- | --------------------------- |
| `accessToken` | `string` | `undefined` | The customer's access token |

#### Returns

```ts
type Return = Customer;
```

[Reference](#customer-1)

---

#### `create(params: CustomerCreateParams): Promise<CustomerCreateData['customerCreate']>`

Create a customer.

```ts
const customer = Customer.create({
	firstName: 'John',
	lastName: 'Doe',
	email: 'customer@email.com',
	password: 'Password123!'
});
```

#### Parameters

| name        | type     | default     | description               |
| ----------- | -------- | ----------- | ------------------------- |
| `firstName` | `string` | `undefined` | The customer's first name |
| `lastName`  | `string` | `undefined` | The customer's last name  |
| `email`     | `string` | `undefined` | The customer's email      |
| `password`  | `string` | `undefined` | The customer's password   |

#### Returns

```ts
type Return = {
	customer: Customer;
	customerUserErrors: UserError[];
};
```

[Reference](#customer-1)

---

#### `login(params: CustomerLoginParams): Promise<CustomerLoginData['customerAccessTokenCreate']>`

Generate an access token in order to log in a customer.

```ts
const customer = Customer.login({
	email: 'customer@email.com',
	password: 'Password123!'
});
```

#### Parameters

| name       | type     | default     | description             |
| ---------- | -------- | ----------- | ----------------------- |
| `email`    | `string` | `undefined` | The customer's email    |
| `password` | `string` | `undefined` | The customer's password |

#### Returns

```ts
type Return = {
	customerAccessToken: {
		accessToken: string;
	};
	customerUserErrors: UserError[];
};
```

[Reference](#usererror)

---

#### `logout(params: CustomerLogoutParams): Promise<CustomerLogoutData['customerAccessTokenDelete']>`

Expire an access token in order to log out a customer.

```ts
const { userErrors } = Customer.logout({
	accessToken: 'H3fDFVT5JyB2yRLr0rNJNdBsdSqDxk7k'
});
```

#### Parameters

| name          | type     | default     | description                 |
| ------------- | -------- | ----------- | --------------------------- |
| `accessToken` | `string` | `undefined` | The customer's access token |

#### Returns

```ts
type Return = {
	deletedAccessToken: string;
	deleteCustomerAccessTokenId: string;
	userErrors: UserError[];
};
```

[Reference](#usererror)

---

#### `recover(params: CustomerRecoverParams): Promise<CustomerRecoverData['customerRecover']>`

Send an email with a reset password link.

```ts
const { customerUserErrors } = Customer.recover({
	email: 'customer@email.com'
});
```

#### Parameters

| name    | type     | default     | description          |
| ------- | -------- | ----------- | -------------------- |
| `email` | `string` | `undefined` | The customer's email |

#### Returns

```ts
type Return = {
	customerUserErrors: UserError[];
};
```

[Reference](#usererror)

---

#### `reset(params: CustomerResetParams): Promise<CustomerResetData['customerReset']>`

Reset a customer's password.

```ts
const { customerUserErrors } = Customer.reset({
	password: 'customer@email.com',
	resetUrl: 'https://yourdomain.com/account/reset/customerId/resetToken'
});
```

#### Parameters

| name    | type     | default     | description          |
| ------- | -------- | ----------- | -------------------- |
| `email` | `string` | `undefined` | The customer's email |

#### Returns

```ts
type Return = {
	customerUserErrors: UserError[];
};
```

[Reference](#usererror)

[Reference](#usererror)

### Product

#### `get(params: ProductGetParams): Promise<ProductGetData['product']>`

Get a single product.

```ts
const product = Product.get({
	id: 'gid://shopify/Product/1'
});
```

#### Parameters

| name | type     | default     | description      |
| ---- | -------- | ----------- | ---------------- |
| `id` | `string` | `undefined` | The product's id |

#### Returns

```ts
type Return = Product;
```

[Reference](#product-1)

---

#### `getAll(params: ProductGetAllParams): Promise<ProductGetAllData['products']>`

Get all the products.

```ts
const product = Product.getAll();
```

#### Returns

```ts
type Return = {
	products: {
		edges: {
			node: Product;
		};
		[];
	};
};
```

[Reference](#product-1)

### Search

#### `getProducts(params: SearchGetProductsParams): Promise<SearchGetProductsData>`

Search for a product.

```ts
const product = Search.getProducts({
	query: 'Bottle',
	first: 3
});
```

#### Parameters

| name    | type     | default     | description                |
| ------- | -------- | ----------- | -------------------------- |
| `query` | `string` | `undefined` | The search query           |
| `first` | `number` | `5`         | The number of result items |

#### Returns

```ts
type Return = {
	products: {
		edges: {
			node: Product;
		};
		[];
	};
};
```

[Reference](#product-1)

### Shop

#### `get(): Promise<ShopGetData['shop']>`

Get shop information.

```ts
const shop = Shop.get();
```

#### Returns

```ts
type Return = Shop;
```

[Reference](#shop-1)

## Types

### Cart

```ts
type Cart = {
	id: string;
	checkoutUrl: string;
	cost: {
		totalAmount: Price;
	};
	lines: {
		edges: {
			node: {
				id: string;
				quantity: number;
				merchandise: {
					availableForSale: boolean;
					compareAtPrice: Price | null;
					id: string;
					image: Image;
					price: Price;
					product: Product;
					selectedOptions: {
						name: string;
						value: string;
					};
					[];
					title: string;
				};
			};
		};
		[];
	};
};
```

---

### Customer

```ts
type Customer = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};
```

### Image

```ts
type Image = {
	originalSrc: string;
	altText: string;
};
```

### Price

```ts
type Price = {
	amount: string;
};
```

### Product

```ts
type Product = {
	id: string;
	title: string;
	description: string;
	totalInventory: number;
	featuredImage: Image;
	priceRange: {
		maxVariantPrice: Price;
		minVariantPrice: Price;
	};
	variants: {
		edges: {
			node: {
				id: string;
				title: string;
				availableForSale: boolean;
				compareAtPrice: Price | null;
				price: Price;
				selectedOptions: {
					name: string;
					value: string;
				};
				[];
				image: Image;
				product: {
					id: string;
					title: string;
					description: string;
					images: {
						edges: {
							node: Image;
						};
						[];
					};
				};
			};
		};
		[];
	};
};
```

### Shop

```ts
type Shop = {
	name: string;
	brand: {
		logo: {
			image: Image;
		};
	};
};
```

### UserError

```ts
type UserError {
  field: string;
  message: string;
}
```

#

Made with ❤️ by [Bado](https://bdau.fr).

_Copyright &copy; 2024 Baptiste Dauphouy_
