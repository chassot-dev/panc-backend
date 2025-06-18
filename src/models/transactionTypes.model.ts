import db from '../config/database';
import { RowDataPacket } from 'mysql2';

class TransactionType {

	private _id?: number;
	private _name: string;
	private _isExpense: boolean;

	private constructor(id: number, name: string, isExpense: boolean) {

		this._id = id;
		this._name = name;
		this._isExpense = isExpense;

	}

	static async createFromId(id: number): Promise<TransactionType | null> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT name, is_expense FROM transaction_types WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return null;
		}

		const row = rows[0];
		return new TransactionType(id, row.name, row.is_expense)

	}

	static async getAll(): Promise<{ id: number; name: string, isExpense: boolean }[]> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT id, name, is_expense FROM transaction_types'
		);

		return rows as { id: number; name: string, isExpense: boolean }[];

	}

	toSafeObject() {
		return {
			id: this._id,
			name: this._name,
			isExpense: this._isExpense,
		};
	}


	// Getter e Setter para name
	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	// Getter e Setter para name
	get isExpense(): boolean {
		return this._isExpense;
	}

	set isExpense(value: boolean) {
		this._isExpense = value;
	}
}

export default TransactionType;