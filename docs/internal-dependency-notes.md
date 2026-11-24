# Internal note — dependency alerts (not for the client)

A dependency upgrade was attempted to close open npm/Dependabot alerts. It was reverted because the newer Astro toolchain loads a native binding that is blocked by Application Control on this machine, which broke the local build. The repository was restored to the last known-good state and `npm run build` passes again.

The remaining alerts are transitive advisories with no published fix for some packages, plus a Node-adapter image-path issue that does not apply to this static site. At the time of writing, GitHub reported 3 alerts (1 high, 1 moderate, 1 low) and local `npm audit` reported 2 (astro moderate, zod high).

They can be handled separately via a controlled override, an alert dismissal with justification, or a retry of the upgrade in an environment where the native binding is allowed. Always re-run `npm run build` after any dependency change.
