import { GoogleGenerativeAI } from "@google/generative-ai";
import { NomePopular, Panc, PartesComestiveis } from "../domain/panc";

export class GeminiService {
	private genAI: GoogleGenerativeAI;

	constructor() {
		this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
	}

	async ask(id: number, prompt: string): Promise<string> {

		console.log(prompt);

		const panc = await Panc.findByPk(id, {
			include: [
				{ model: NomePopular, as: 'nome_popular' },
				{ model: PartesComestiveis, as: 'partes_comestiveis' }
			]
		});

		if (!panc) throw new Error(`Panc ${id} não encontrada`);

		const nome = (panc as any).nome ?? (panc as any).nome_principal ?? 'N/A';
		const nomeCientifico = (panc as any).nome_cientifico ?? 'N/A';
		const familia = (panc as any).familia_botanica ?? 'N/A';
		const nomesPopulares = ((panc as any).nome_popular ?? []).map((n: any) => n.nome ?? n).join(', ') || 'N/A';
		const partes = ((panc as any).partes_comestiveis ?? [])
			.map((p: any) => `${p.parte} (${p.modo})`)
			.join('; ') || 'N/A';
		const img = (panc as any).img ?? 'N/A';

		const intro = 'PANC = Plantas Alimentícias Não Convencionais. Use apenas as informações abaixo:';
		const context = [
			`Nome: ${nome}`,
			`Nome científico: ${nomeCientifico}`,
			`Família: ${familia}`,
			`Nomes populares: ${nomesPopulares}`,
			`Partes comestíveis e modos: ${partes}`,
			`Imagem: ${img}`
		].join('\n');

		const fullPrompt = `${intro}\n\n${context}\n\nPergunta do usuário: ${prompt}\n\nResponda apenas com um texto simples, sem formatação nem emojis, em linguagem leiga.`;

		const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
		const result = await model.generateContent(fullPrompt);
		return result.response.text();
	}
}

export default new GeminiService();
