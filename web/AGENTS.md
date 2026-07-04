<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploying

The live stage is **production**: `npx sst deploy --stage production`.
A bare `sst deploy` targets your personal default stage, which tries to
re-create the CloudFront distributions and domains and collides with the live
stack (CNAMEAlreadyExists). If that happens: `sst remove --stage <personal>`,
restore any ACM validation CNAMEs it deleted, and redeploy production.
