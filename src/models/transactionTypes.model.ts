import db from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

class TransactionType {

	private _id?: number;
	private _name: string;
	private _isExpense: boolean;

	private constructor(name: string, isExpense: boolean, id?: number) {

		this._name = name;
		this._isExpense = isExpense;

		if (id) {
			this._id = id;
		}

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
		const transactionType = new TransactionType(row.name, row.is_expense, id);

		return transactionType;
	}

	static async create(
		name: string, isExpense: boolean
	): Promise<TransactionType> {

		const transactionType = new TransactionType(name, isExpense);
		const transactionTypeId = await transactionType.saveOnDB();

		transactionType._id = transactionTypeId;

		return transactionType;

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
			`INSERT INTO transaction_types (name, is_expense)
		 VALUES (?, ?)`,
			[
				this._name,
				this._isExpense
			]
		);
		this._id = res.insertId;
		return this._id;
	}

	async updateOnDB(): Promise<number> {
		if (!this._id) throw new Error('ID não definido para update');

		const [res] = await db.query<ResultSetHeader>(
			`UPDATE transactions SET
			name = ?, is_expense = ?
		 WHERE id = ?`,
			[
				this._name,
				this._isExpense,
				this._id
			]
		);
		return res.affectedRows;
	}

	static async getById(id: number): Promise<TransactionType | null> {

		const [rows] = await db.query<RowDataPacket[]>(
			'SELECT name, is_expense FROM transaction_types WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return null;
		}

		const row = rows[0];
		return new TransactionType(row.name, row.is_expense)

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