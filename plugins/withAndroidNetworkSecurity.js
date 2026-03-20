const {
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

/** @type import("@expo/config-plugins").ConfigPlugin<{ domain: string; certResourceName: string }> */
const withAndroidNetworkSecurity = (config, { domain, certResourceName }) => {
  // 1) Ensure AndroidManifest has networkSecurityConfig attribute on application
  config = withAndroidManifest(config, (config) => {
    const manifest = config.modResults;

    if (
      !manifest.manifest ||
      !Array.isArray(manifest.manifest.application) ||
      !manifest.manifest.application[0]
    ) {
      return config;
    }

    const mainApplication = manifest.manifest.application[0];
    if (!mainApplication.$) {
      mainApplication.$ = {};
    }

    mainApplication.$["android:networkSecurityConfig"] =
      "@xml/network_security_config";

    return config;
  });

  // 2) Write / overwrite res/xml/network_security_config.xml
  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const androidMainRes = path.join(
        projectRoot,
        "android",
        "app",
        "src",
        "main",
        "res",
      );

      const xmlDir = path.join(androidMainRes, "xml");
      const xmlPath = path.join(xmlDir, "network_security_config.xml");

      const rawDir = path.join(androidMainRes, "raw");
      const rawCertPath = path.join(rawDir, `${certResourceName}.pem`);
      const sourceCertPath = path.join(
        projectRoot,
        "certs",
        `${certResourceName}.pem`,
      );

      if (!fs.existsSync(xmlDir)) {
        fs.mkdirSync(xmlDir, { recursive: true });
      }

      if (!fs.existsSync(rawDir)) {
        fs.mkdirSync(rawDir, { recursive: true });
      }

      const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- Allow cleartext for dev tools like Metro / localhost -->
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>

    <!-- Force HTTPS with custom cert for API domain -->
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">${domain}</domain>
        <trust-anchors>
            <certificates src="@raw/${certResourceName}" />
        </trust-anchors>
    </domain-config>
</network-security-config>
`;

      fs.writeFileSync(xmlPath, xmlContent, "utf8");

      // copy certificate into res/raw so it survives prebuild/clean
      if (fs.existsSync(sourceCertPath)) {
        fs.copyFileSync(sourceCertPath, rawCertPath);
      } else {
        console.warn(
          `[withAndroidNetworkSecurity] Source cert not found at ${sourceCertPath}`,
        );
      }

      return config;
    },
  ]);

  return config;
};

module.exports = withAndroidNetworkSecurity;
