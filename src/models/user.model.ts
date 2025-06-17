import db from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class User {

	private id?: number | undefined;
	private _name: string;
	private _email: string;
	private _password: string

	constructor(name: string, email: string, password: string) {
		this._name = name;
		this._email = email;
		this._password = password;
	}

	async save() {
		const [res] = await db.query<ResultSetHeader>(
			'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
			[this._name, this._email, this._password]
		);

		return res.insertId;
	}

	static async searchForEmail(email: string): Promise<string | null> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT name FROM users WHERE email = ?',
			[email]
		);

		if (rows.length === 0) {
			return null;
		}

		return rows[0].name;

	}

	static async searchForId(id: number): Promise<string | null> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT name FROM users WHERE id = ?',
			[id]
		)

		if(rows.length === null) {
			return null;
		}

		return rows[0].name;

	}

	// Getter e Setter para name
	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	// Getter e Setter para email
	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}


}

export default User;