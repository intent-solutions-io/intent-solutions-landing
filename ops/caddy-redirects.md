# Caddy redirects for the removed routes (VPS `intentsolutions`)

**Version:** 1.0 (2026-09-06)

The site deploys as `file_server` from `/srv/intentsolutions/dist`, so redirects live in `/etc/caddy/Caddyfile`, not in the repo. Apply after the PR that removes the routes has deployed, and only after `dig +short intentsolutions.io` returns 167.86.106.29.

Procedure: edit the `intentsolutions.io, www.intentsolutions.io { ... }` block, replace the "Migration redirects" lines with the block below, then `caddy validate --config /etc/caddy/Caddyfile` and `systemctl reload caddy` (never restart). Smoke each removed route with `curl -sI https://intentsolutions.io/<route>` and expect `301` with the target below.

```caddyfile
    # Migration redirects. Firebase-era set restored 2026-05-25; gateway prune 2026-09-06
    # (intent-solutions-landing 000-docs/080-RA-AUDT). Every removed route lands on the
    # nearest surviving page.
    redir /survey / permanent
    redir /survey/* / permanent
    redir /a2a / permanent
    redir /a2a/* / permanent
    redir /agents / permanent
    redir /agents/* / permanent
    redir /ai-agents / permanent
    redir /ai-agents/* / permanent
    redir /ai-models / permanent
    redir /ai-models/* / permanent
    redir /applications / permanent
    redir /applications/* / permanent
    redir /automation / permanent
    redir /automation/* / permanent
    redir /cloud / permanent
    redir /cloud/* / permanent
    redir /colab /contact/ permanent
    redir /colab/* /contact/ permanent
    redir /infrastructure / permanent
    redir /infrastructure/* / permanent
    redir /intel-engine / permanent
    redir /intel-engine/* / permanent
    redir /learn https://learn.intentsolutions.io permanent
    redir /learn/* https://learn.intentsolutions.io permanent
    redir /private-ai / permanent
    redir /private-ai/* / permanent
    redir /resellers /contact/ permanent
    redir /resellers/* /contact/ permanent
    redir /security-compliance / permanent
    redir /security-compliance/* / permanent
    redir /support /contact/ permanent
    redir /support/* /contact/ permanent
```

Targets: service pages to the front page (the doors replace them); Colab, Resellers, Support to the contact page (they were engagement forms); the old `/learn/*` pages to the learn site, which replaced them.
