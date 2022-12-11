import { Analysis } from "../../../models";

export interface GetAnalysisInterface {
  (url: string): Promise<Analysis>;
}
