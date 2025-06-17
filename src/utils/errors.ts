export class BadRequestError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BadRequestError';
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotFoundError';
	}
}

export class DuplicatedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DuplicatedError';
	}
}

export class NotAllowedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotAllowedError';
	}
}

