import Amplify, {  Storage } from "aws-amplify";

export async function fire(apiName, path, inputParams, callback) {
    try {
          Storage.get("public/language/" + apiName).then((resp) => {
              console.error(resp);
          }).catch(err => console.error(err))
        } catch (err) {
            callback(false, err);
        }
}

export async function lookupSystemResource(path, callback) {

    try {
        const result = await Storage.get(path, { download: true });
        result.Body.text().then(string => { 
            callback(true, string);
          })
          .catch(err => callback(false, err));
      } catch (err) {
          callback(false, err);
      }
}




window.fire = fire;
window.lookupSystemResource = lookupSystemResource;