import db from '../../resources/database/config/database';
import bcrypt from 'bcrypt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class Panc {

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

	static async create(name: string, email: string, plainPassword: string): Promise<Panc> {

		const passwordHash = await bcrypt.hash(plainPassword, 10);
		const panc = new Panc(name, email, passwordHash);
		const pancId = await panc.saveOnDB();

		panc._id = pancId;

		return panc;

	}

	static async getById(id: number): Promise<Panc | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT name, email, password FROM pancs WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return null;
		}

		const { name, email, password } = rows[0];
		return new Panc(name, email, password, id);
	}

	async saveOnDB() {
		if (!this._id) {
			return this.createOnDB();
		} else {
			return this.updateOnDB();
		}
	}

	async createOnDB(): Promise<number> {
		const [res] = await db.query<ResultSetHeader>(
			'INSERT INTO pancs (name, email, password) VALUES (?, ?, ?)',
			[this._name, this._email, this._password]
		);
		this._id = res.insertId;
		return this._id;
	}

	async updateOnDB(): Promise<number> {
		if (!this._id) throw new Error('ID não definido para update');
		const [res] = await db.query<ResultSetHeader>(
			'UPDATE pancs SET name = ?, email = ?, password = ? WHERE id = ?',
			[this._name, this._email, this._password, this._id]
		);
		return res.affectedRows;
	}

	static async searchForEmail(email: string): Promise<Panc | null> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT id FROM pancs WHERE email = ?',
			[email]
		);

		if (rows.length === 0) {
			return null;
		}

		const pancId = rows[0].id

		return this.getById(pancId)

	}

	static async getAll(): Promise<{ id: number; name: string; email: string }[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT id, name, email FROM pancs'
		);

		// Fazemos um cast para dizer que rows é do tipo esperado
		return rows as { id: number; name: string; email: string }[];
	}


	// Retorna um objeto seguro a ser mandado para o front //
	toSafeObject() {
		return {
			id: this.id,
			name: this.name,
			email: this.email
		};
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

export default Panc;