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
    const zone = "Z08197652PR6OB710XTAB";

    // The MCP server: a Lambda answering JSON-RPC on mcp.republicassay.us/mcp.
    // CORS is open so the website can call it live from the browser.
    const mcp = new sst.aws.ApiGatewayV2("Mcp", {
      domain: {
        name: "mcp.republicassay.us",
        dns: sst.aws.dns({ zone }),
      },
      cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["content-type", "accept", "mcp-session-id", "mcp-protocol-version"],
      },
    });
    mcp.route("POST /mcp", "mcp/index.handler");
    mcp.route("GET /mcp", "mcp/index.handler");

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
        dns: sst.aws.dns({ zone }),
      },
    });
  },
});
