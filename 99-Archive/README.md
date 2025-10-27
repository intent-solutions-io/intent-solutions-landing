# legacy archives

This directory stores compressed snapshots of previous implementations. Each archive packs an entire project folder so the working tree stays light while the historical code remains accessible.

## available snapshots

| file | description |
| --- | --- |
| `legacy-react-spa.tar.gz` | Original React + Vite single-page app that formerly powered intentsolutions.io. Includes Bun-based toolchain, shadcn/ui components, and design mockups. |

## usage

```bash
tar -xzf legacy-react-spa.tar.gz
```

Extracts the archived project into the current directory. Avoid committing extracted folders back into the repo—use them locally for reference only.
