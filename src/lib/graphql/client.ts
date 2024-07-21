import { VITE_SHOPIFY_STORE_NAME, VITE_SHOPIFY_STOREFRONT_API_TOKEN } from '$env/static/private';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const client = createStorefrontApiClient({
	storeDomain: `http://${VITE_SHOPIFY_STORE_NAME}.myshopify.com`,
	apiVersion: '2023-10',
	privateAccessToken: VITE_SHOPIFY_STOREFRONT_API_TOKEN
});
