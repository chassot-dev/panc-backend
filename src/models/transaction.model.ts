import db from '../config/database';
import Decimal from 'decimal.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

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

	static async create(
		userId: number,
		amount: Decimal,
		typeId: number
	): Promise<Transaction> {

		const transaction = new Transaction(userId, amount, typeId);
		const transactionId = await transaction.saveOnDB();

		transaction._id = userId;

		return transaction;

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
			`INSERT INTO transactions (user_id, amount, type_id, transaction_date)
		 VALUES (?, ?, ?, ?)`,
			[
				this._userId,
				this._amount.toNumber(), // assume que o banco espera decimal(10,2)
				this._typeId,
				this._transactionDate ?? new Date()
			]
		);
		this._id = res.insertId;
		return this._id;
	}

	async updateOnDB(): Promise<number> {
		if (!this._id) throw new Error('ID não definido para update');

		const [res] = await db.query<ResultSetHeader>(
			`UPDATE transactions SET
			user_id = ?, amount = ?, type_id = ?, transaction_date = ?
		 WHERE id = ?`,
			[
				this._userId,
				this._amount.toNumber(),
				this._typeId,
				this._transactionDate ?? new Date(),
				this._id
			]
		);
		return res.affectedRows;
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

	static async getAll(): Promise<{ id: number, userId: number, amount: number, type: {id: number, name: String, is_expense: number}, transactionDate: String | null, createdAt: String | null }[]> {

		const [rows] = await db.query<RowDataPacket[]>(`
			SELECT 
				t.id, t.user_id, t.amount, t.transaction_date, t.created_at, tp.id as type_id, tp.name as type_name, tp.is_expense
			FROM 
				transactions t
			INNER JOIN transaction_types tp
				ON tp.id = t.type_id
		`);

		return rows.map(row => ({
			id: row.id,
			userId: row.user_id,
			amount: Number(row.amount),
			type: {
				id: row.type_id,
				name: row.type_name,
				is_expense: row.is_expense
			},
			transactionDate: row.transaction_date ? row.transaction_date.toISOString() : null,
			createdAt: row.created_at ? row.created_at.toISOString() : null,
		}));

	}
	
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