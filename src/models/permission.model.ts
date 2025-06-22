import db from '../config/database';
import { RowDataPacket } from 'mysql2';

class Permission {

	private _id?: number;
	private _name: string;

	private constructor(id: number, name: string) {

		this._id = id;
		this._name = name;

	}

	static async getById(id: number): Promise<Permission | null> {

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

	static async grantPermissionToUser(userId: number, permissionName: string): Promise<void> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT id FROM permissions WHERE name = ? LIMIT 1',
			[permissionName]
		);

		if (rows.length === 0) {
			throw new Error(`Permissão "${permissionName}" não encontrada.`);
		}

		const permissionId = rows[0].id;

		await db.query(
			'INSERT INTO users_permissions (user_id, permission_id) VALUES (?, ?)',
			[userId, permissionId]
		);

	}

	static async userHasPermission(userId: number, permissionName: string): Promise<boolean> {
		const [rows] = await db.query<RowDataPacket[]>(`
			SELECT 
				1
			FROM 
				users_permissions up
			INNER JOIN 
				permissions p 
				ON 
				up.permission_id = p.id
			WHERE 
				up.user_id = ? AND p.name = ?
			LIMIT 1
		`,
			[userId, permissionName]
		);

		return rows.length > 0;
	}

	// Retorna um objeto seguro a ser mandado para o front //
	toSafeObject() {
		return {
			id: this.id,
			name: this.name,
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
	
}

export default Permission;