import { RoboflowClient } from "./roboflow.client";

export class RoboflowService {
  private roboflow: RoboflowClient;

  constructor() {
    this.roboflow = new RoboflowClient();
  }

  public async detect(imageBase64: string): Promise<any> {
    const result = await this.roboflow.predict(imageBase64);

    if (!result?.predictions || result.predictions.length === 0) {
      throw new Error("Nenhum objeto identificado na imagem (Not Found)");
    }

    return result;
  }
}

export default new RoboflowService();