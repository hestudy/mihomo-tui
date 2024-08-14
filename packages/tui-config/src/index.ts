import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

export const tuiConfig = <T extends { [key: string]: any }>(
  name: string,
  initValues?: T
) => {
  const configDirPath = join(homedir(), ".config", name);
  const configFilePath = join(configDirPath, "config.json");

  const dirExists = () => existsSync(configDirPath);

  if (!dirExists()) {
    mkdirSync(configDirPath, { recursive: true });
  }

  const fileExists = () => existsSync(configFilePath);

  if (!fileExists()) {
    writeFileSync(configFilePath, JSON.stringify(initValues || {}, null, 2));
  }

  const configStr = readFileSync(configFilePath, "utf-8");
  const config = {
    ...initValues,
    ...JSON.parse(configStr),
  };

  const clear = () => {
    if (dirExists()) {
      rmSync(configDirPath, { recursive: true });
    }
  };

  const set = (key: string, value: any) => {
    config[key] = value;
    writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  };

  const get = (key: string) => {
    return config[key];
  };

  const setAll = (values: T) => {
    Object.keys(values).forEach((key) => {
      set(key, values[key]);
    });
  };

  const getAll = () => {
    return config;
  };

  const remove = (key: string) => {
    delete config[key];
    writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  };

  return {
    config,
    clear,
    set,
    get,
    setAll,
    getAll,
    remove,
  };
};
