import db from '../config/database';
import bcrypt from 'bcrypt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class Permission {

	private _id?: number;
	private _name: string;

	private constructor(name: string, id?: number) {

		this._name = name;

		if (id) {
			this._id = id;
		}

	}

	static async createFromId(id: number): Promise<Permission | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT name FROM permissions WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return null;
		}

		const { name } = rows[0];
		return new Permission(name, id);
	}

	// Getter e Setter para name
	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}
}

export default Permission;