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
              href="https://startaitools.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-smooth"
            >
              blog
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
          </div>

          <p className="text-xs text-zinc-600 pt-6">
            © 2025 intent solutions io. all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
