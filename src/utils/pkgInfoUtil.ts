import axios from "axios";

type PkgInfo = {
  pkgVersion?: string;
};

export default async function pkgInfoUtil(): Promise<PkgInfo | undefined> {
  try {
    const response = await axios(process.env.REACT_APP_GIT_URI!, {
      method: "GET",
    });
    const pkg:
      | {
          browserslist?: ObjectType;
          dependencies?: ObjectType;
          devDependencies?: ObjectType;
          eslintConfig: ObjectType;
          name?: string;
          private?: boolean;
          scripts?: ObjectType;
          version?: string;
        }
      | ObjectType = JSON.parse(
      Buffer.from(response.data.content, response.data.encoding).toString()
    );
    return {
      pkgVersion: pkg?.version,
    };
  } catch (err) {
    console.warn("error", err);
    return undefined;
  }
}

export async function versionCheck(callback: (version?: string) => void) {
  const version = localStorage.getItem("version");
  const pkgInfo = await pkgInfoUtil();
  if (pkgInfo?.pkgVersion && (!version || pkgInfo.pkgVersion > version)) {
    localStorage.setItem("version", pkgInfo.pkgVersion || "");
    callback(pkgInfo.pkgVersion);
  }
}
