import BaseApiService from "./BaseApiService";

const DEFAULT_PATH = "/";

class SpeakerService extends BaseApiService {
  getSpeakers = () => {
    let path = DEFAULT_PATH;
    return this.makeGetRequest(path);
  };
}

export default new SpeakerService();
