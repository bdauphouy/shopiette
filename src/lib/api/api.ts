import { PUBLIC_VITE_API_URL } from '$env/static/public';

export class Api {
	static async get(route: string) {
		const response = await fetch(PUBLIC_VITE_API_URL + route);

		return response.json();
	}

	static async post<T>(route: string, body: T = {} as T) {
		const response = await fetch(PUBLIC_VITE_API_URL + route, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return response.json();
	}

	static async put<T>(route: string, body: T = {} as T) {
		const response = await fetch(PUBLIC_VITE_API_URL + route, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return response.json();
	}

	static async delete<T>(route: string, body: T = {} as T) {
		const response = await fetch(PUBLIC_VITE_API_URL + route, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		return response.json();
	}
}
