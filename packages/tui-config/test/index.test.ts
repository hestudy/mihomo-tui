import { tuiConfig } from "../src";

afterEach(() => {
  const { clear } = tuiConfig("tui-config");
  clear();
});

test("初始化配置文件", () => {
  const { config } = tuiConfig("tui-config");
  expect(config).toStrictEqual({});
});

test("初始化配置文件，带默认值", () => {
  const { config } = tuiConfig("tui-config", {
    name: "tui-config",
  });
  expect(config).toStrictEqual({
    name: "tui-config",
  });
});

test("设置配置", () => {
  const { config, set } = tuiConfig("tui-config");
  set("name", "tui-config");
  expect(config).toStrictEqual({
    name: "tui-config",
  });
});

test("获取配置", () => {
  const { get, set } = tuiConfig("tui-config");
  set("name", "tui-config");
  expect(get("name")).toBe("tui-config");
});

test("设置所有配置", () => {
  const { config, setAll } = tuiConfig("tui-config");
  setAll({
    name: "tui-config",
    version: "1.0.0",
  });
  expect(config).toStrictEqual({
    name: "tui-config",
    version: "1.0.0",
  });
});

test("获取所有配置", () => {
  const { getAll, setAll } = tuiConfig("tui-config");
  setAll({
    name: "tui-config",
    version: "1.0.0",
  });
  expect(getAll()).toStrictEqual({
    name: "tui-config",
    version: "1.0.0",
  });
});

test("删除配置", () => {
  const { config, set, remove } = tuiConfig("tui-config");
  set("name", "tui-config");
  remove("name");
  expect(config).toStrictEqual({});
});

test("清除配置文件", () => {
  const { config, clear } = tuiConfig("tui-config");
  clear();
  expect(config).toStrictEqual({});
});
