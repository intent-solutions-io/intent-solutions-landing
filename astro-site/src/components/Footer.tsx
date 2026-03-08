export default function Footer() {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-zinc-800/50">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="font-semibold text-zinc-50">intent solutions io</p>
          <p className="text-sm text-zinc-400">creating industries that don't exist</p>
          <p className="text-sm text-zinc-500">gulf shores, alabama</p>

          <div className="pt-6 flex justify-center gap-6 text-sm">
            <a
              href="mailto:jeremy@intentsolutions.io"
              className="text-zinc-400 hover:text-zinc-200 transition-smooth"
            >
              email
            </a>
            <a
              href="https://github.com/jeremylongshore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-smooth"
            >
              github
            </a>
            <a
              href="https://x.com/asphaltcowb0y"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-smooth inline-flex items-center gap-1"
              aria-label="Follow us on X"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              x
            </a>
            <a
              href="https://startaitools.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-smooth"
            >
              blog
            </a>
          </div>

          <div className="pt-4 flex justify-center gap-6 text-sm">
            <a
              href="/learn"
              className="text-zinc-400 hover:text-zinc-200 transition-smooth"
            >
              learn
            </a>
            <a
              href="/resellers"
              className="text-zinc-400 hover:text-zinc-200 transition-smooth"
            >
              resellers
            </a>
          </div>

          <div className="pt-4 flex justify-center gap-6 text-xs">
            <a
              href="/terms"
              className="text-zinc-500 hover:text-zinc-300 transition-smooth"
            >
              terms of service
            </a>
            <a
              href="/privacy"
              className="text-zinc-500 hover:text-zinc-300 transition-smooth"
            >
              privacy policy
            </a>
            <a
              href="/acceptable-use"
              className="text-zinc-500 hover:text-zinc-300 transition-smooth"
            >
              acceptable use
            </a>
          </div>

          <p className="text-xs text-zinc-600 pt-6">
            © 2025 intent solutions io. all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
