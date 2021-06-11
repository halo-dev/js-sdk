import { TokenStore } from "../auth/TokenStore";
import { AccessToken } from "../auth/CredentialsInterface";
import * as fs from "fs";

export class FileTokenStore implements TokenStore {
  private tokenFilePath: string

  constructor(filePath: string) {
    fs.accessSync(filePath,
      fs.constants.F_OK
      | fs.constants.R_OK
      | fs.constants.W_OK)
    this.tokenFilePath = filePath
  }

  set(token: AccessToken): void {
    fs.writeFile(
      this.tokenFilePath,
      JSON.stringify(token),
      { flag: "w+" },
      (err: any) => {
        if (err) {
          throw err;
        }
      }
    );
  }

  get(): Promise<AccessToken> {
    return new Promise((resove, reject) => {
      fs.readFile(this.tokenFilePath, { encoding: "utf8" }, (err, data) => {
        if (err) {
          reject(err)
        }
        if (this.isEmpty(data)) {
          data = "{}"
        }
        resove(JSON.parse(data))
      });
    })
  }

  clear(): void {
    fs.truncateSync(this.tokenFilePath, 0)
  }

  private isEmpty(obj: any): boolean {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  }
}