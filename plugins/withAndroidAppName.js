const { withStringsXml } = require("@expo/config-plugins");

/** @type import("@expo/config-plugins").ConfigPlugin<{ appName: string }> */
const withAndroidAppName = (config, { appName }) => {
  return withStringsXml(config, (config) => {
    const strings = config.modResults;

    if (!Array.isArray(strings.resources.string)) {
      return config;
    }

    const appNameString = strings.resources.string.find(
      (item) => item.$?.name === "app_name",
    );

    if (appNameString) {
      appNameString._ = appName;
    } else {
      strings.resources.string.push({
        $: { name: "app_name" },
        _: appName,
      });
    }

    return config;
  });
};

module.exports = withAndroidAppName;
