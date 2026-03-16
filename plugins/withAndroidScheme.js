const { withAndroidManifest } = require("@expo/config-plugins");

/** @type import("@expo/config-plugins").ConfigPlugin<{ scheme: string; expoScheme?: string }> */
const withAndroidScheme = (config, { scheme, expoScheme }) => {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;
    if (
      !manifest.manifest ||
      !Array.isArray(manifest.manifest.application) ||
      !manifest.manifest.application[0]
    ) {
      return config;
    }

    const mainApplication = manifest.manifest.application[0];
    if (!Array.isArray(mainApplication.activity)) {
      return config;
    }

    const activity = mainApplication.activity.find(
      (a) => a?.$?.["android:name"] === ".MainActivity",
    );
    if (!activity) return config;

    const intentFilters = activity["intent-filter"] ?? [];

    // find VIEW intent-filter (for deep links), don't touch MAIN launcher
    const viewIntentFilter =
      intentFilters.find((filter) =>
        (filter.action ?? []).some(
          (action) =>
            action.$?.["android:name"] === "android.intent.action.VIEW",
        ),
      ) ?? null;

    if (!viewIntentFilter) {
      return config;
    }

    if (!Array.isArray(viewIntentFilter.data)) {
      viewIntentFilter.data = [];
    }

    // remove all existing schemes from VIEW intent-filter only
    viewIntentFilter.data = viewIntentFilter.data.filter(
      (d) => !d.$?.["android:scheme"],
    );

    const newData = [
      {
        $: {
          "android:scheme": scheme,
        },
      },
    ];

    if (expoScheme) {
      newData.push({
        $: {
          "android:scheme": expoScheme,
        },
      });
    }

    viewIntentFilter.data = [...(viewIntentFilter.data ?? []), ...newData];
    return config;
  });
};

module.exports = withAndroidScheme;
