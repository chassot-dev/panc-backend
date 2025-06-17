import db from '../config/database';
import bcrypt from 'bcrypt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class User {

	private _id?: number;
	private _name: string;
	private _email: string;
	private _password: string

	private constructor(name: string, email: string, password: string, id?: number) {

		this._name = name;
		this._email = email;
		this._password = password;

		if (id) {
			this._id = id;
		}

	}

	static async create(name: string, email: string, plainPassword: string): Promise<number> {

		const passwordHash = await bcrypt.hash(plainPassword, 10);
		const user = new User(name, email, passwordHash);
		const userId = await user.saveOnDB();

		user._id = userId;

		return userId;

	}

	static async createFromId(id: number): Promise<User | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT name, email, password FROM users WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return null;
		}

		const { name, email, password } = rows[0];
		return new User(name, email, password, id);
	}

	async saveOnDB() {
		let res: ResultSetHeader;

		if (!this._id) {
			[res] = await db.query<ResultSetHeader>(
				'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
				[this._name, this._email, this._password]
			);
			this._id = res.insertId;
		} else {
			[res] = await db.query<ResultSetHeader>(
				'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
				[this._name, this._email, this._password, this._id]
			);
		}

		return this._id;
	}

	static async searchForEmail(email: string): Promise<User | null> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT id FROM users WHERE email = ?',
			[email]
		);

		if (rows.length === 0) {
			return null;
		}

		const userId = rows[0].id

		return this.createFromId(userId)

	}

	// Getter para id
	get id(): number {
		return this._id!;
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

	// Getter e Setter para senha
	get password(): string {
		return this._password;
	}

	async setPassword(plainPassword: string): Promise<void> {
		this._password = await bcrypt.hash(plainPassword, 10);
	}
}

export default User;