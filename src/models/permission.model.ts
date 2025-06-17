import db from '../config/database';
import { RowDataPacket } from 'mysql2';

class Permission {

	private _id?: number;
	private _name: string;

	private constructor(id: number, name: string) {

		this._id = id;
		this._name = name;

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
		return new Permission(id, name);

	}

	static async getAll(): Promise<{ id: number; name: string }[]> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT id, name FROM permissions'
		);

		return rows as { id: number; name: string }[];

	}

	static async grantPermissionToUser(userId: number, permissionId: number): Promise<void> {

		await db.query(
			`INSERT INTO users_permissions (user_id, permission_id)
     		VALUES (?, ?)`,
			[userId, permissionId]
		);

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