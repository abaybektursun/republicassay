/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "republic",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "fuelos",
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    // Pure static export (next.config.ts sets output: "export").
    // StaticSite = S3 + CloudFront + auto ACM cert + Route 53 records.
    new sst.aws.StaticSite("Web", {
      build: {
        command: "npm run build",
        output: "out",
      },
      domain: {
        name: "republicassay.us",
        redirects: ["www.republicassay.us"],
        dns: sst.aws.dns({
          zone: "Z08197652PR6OB710XTAB",
        }),
      },
    });
  },
});
