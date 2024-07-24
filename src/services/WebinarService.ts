import BaseApiService from "./BaseApiService";

const DEFAULT_PATH = "/";

class WebinarService extends BaseApiService {
  getWebinars = () => {
    let path = DEFAULT_PATH;
    return this.makeGetRequest(path);
  };

  getWebinarById = (endPoint: any) => {
    let path = DEFAULT_PATH + endPoint;
    return this.makeGetRequest(path);
  };
}

export default new WebinarService();
