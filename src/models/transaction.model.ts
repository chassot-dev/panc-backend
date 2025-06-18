import db from '../config/database';
import Decimal from 'decimal.js';
import { RowDataPacket } from 'mysql2';

class Transaction {

	private _id?: number;
	private _userId: number;
	private _amount: Decimal;
	private _typeId: number;
	private _transactionDate?: Date;
	private _createdAt?: Date

	private constructor(
		userId: number,
		amount: Decimal,
		typeId: number,
		id?: number,
		transactionDate?: Date,
		createdAt?: Date
	) {
		this._id = id;
		this._userId = userId;
		this._amount = amount;
		this._typeId = typeId;
		this._transactionDate = transactionDate;
		this._createdAt = createdAt;
	}

	static async createFromId(id: number): Promise<Transaction | null> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT * FROM transactions WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return null;
		}

		const row = rows[0];

		const amountDecimal = new Decimal(row.amount);

		return new Transaction(
			row.user_id,
			amountDecimal,
			row.type_id,
			row.id,
			row.transaction_date,
			row.created_at
		);

	}

	/*static async getAll(): Promise<{ id: number; name: string, isExpense: boolean }[]> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT id, name, is_expense FROM transaction_types'
		);

		return rows as { id: number; name: string, isExpense: boolean }[];

	}*/

	toSafeObject() {
		return {
			id: this._id,
			userId: this._userId,
			amount: this._amount.toNumber(),
			typeId: this._typeId,
			transactionDate: this._transactionDate,
			createdAt: this._createdAt,
		};
	}

}

export default Transaction;