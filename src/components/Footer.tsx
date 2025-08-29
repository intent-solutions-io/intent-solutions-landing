import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg"></div>
              <span className="font-bold text-xl">Intent Solutions</span>
            </div>
            <p className="text-background/80 leading-relaxed mb-6 max-w-md">
              Pioneering AI/ML solutions that transform industries through innovative 
              diagnostic platforms and youth sports development.
            </p>
            <p className="text-background/60 text-sm">
              © 2024 Intent Solutions Inc. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platforms</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://diagnosticpro.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors flex items-center"
                >
                  DiagnosticPro
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <span className="text-background/60">HUSTLE (Coming Soon)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://jeremylongshore.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors flex items-center"
                >
                  Jeremy Longshore
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/jeremylongshore/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors flex items-center"
                >
                  LinkedIn
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.upwork.com/freelancers/jeremylongshore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors flex items-center"
                >
                  Upwork
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;