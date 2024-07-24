export const getEnvVariableValues = (key: any) => {
  if (!key) throw new Error("Please pass the env key to get value");
  else return import.meta.env[key];
};

export const getInitialLetterUpperCase = (test: string) => {
  if (test) {
    const wordArr = test.split(" ");
    const modifiedWordArr = [];
    for (const word of wordArr) {
      modifiedWordArr.push(
        word?.charAt(0)?.toUpperCase() + word.slice(1).toLowerCase()
      );
    }
    return modifiedWordArr?.join(" ");
  } else {
    return test;
  }
};

export const getLabel = (constant: string) => {
  const WEBSITE_LABEL: { [key: string]: string } = {
    PHARMACEUTICAL: "Pharmaceutical",
  };
  return WEBSITE_LABEL[constant];
};

export const validateGetRequest = (res: any) => {
  if (res?.status === 200) return true;
  else return false;
};

export const validatePostRequest = (res: any) => {
  if (res?.status === 201 || res?.status === 200) return true;
  else return false;
};

export const validatePutRequest = (res: any) => {
  if (res?.status === 200) return true;
  else return false;
};

export const validatePatchRequest = (res: any) => {
  if (res?.status === 200) return true;
  else return false;
};

export const validateDeleteRequest = (res: any) => {
  if (res?.status === 202) return true;
  else return false;
};
