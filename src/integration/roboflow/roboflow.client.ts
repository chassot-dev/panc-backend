// src/clients/RoboflowClient.ts
import axios, { AxiosInstance } from "axios";

export class RoboflowClient {
  private apiKey: string;
  private http: AxiosInstance;

  constructor() {
    this.apiKey = process.env.ROBOFLOW_API_KEY || "";
    const baseUrl = process.env.ROBOFLOW_URL;

    if (!this.apiKey) {
      throw new Error("ROBOFLOW_API_KEY não configurada no .env");
    }

    if (!baseUrl) {
      throw new Error("ROBOFLOW_URL não configurada no .env");
    }

    this.http = axios.create({
      baseURL: baseUrl,
      params: {
        api_key: this.apiKey,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Faz a inferência de uma imagem base64
   * @param imageBase64 - Imagem em base64 (sem prefixo data:image/..)
   */
  async predict(imageBase64: string): Promise<any> {
    try {
      const response = await this.http.post("", imageBase64);
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro na requisição Roboflow: ${error.message || "desconhecido"}`
      );
    }
  }
}
