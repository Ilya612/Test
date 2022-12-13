import { AxiosResponse } from "axios";
import { $apiQuize } from "../http/http";
import { QuizeData } from "../components/Quize/types";

export interface QuizeResponse {
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
}
class Quize {
  shuffleQuestions(value: string[]) {
    return value.sort(() => Math.random() - 0.5);
  }
  async getQuestions(): Promise<QuizeData[] | null> {
    return await $apiQuize
      .get("")
      .then((res: AxiosResponse<QuizeResponse[]>): QuizeData[] => {
        return res.data.map((dat) => {
          return {
            title: dat.question,
            options: this.shuffleQuestions([
              ...dat.incorrectAnswers,
              dat.correctAnswer,
            ]),
            answer: dat.correctAnswer,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
export default new Quize();
