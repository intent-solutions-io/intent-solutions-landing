#!/bin/bash
# TaskWarrior Project Setup for Intent Solutions IO Rebuild
# All tasks tracked for premium site transformation

PROJECT="intentsolutions-rebuild"

echo "🚀 Setting up TaskWarrior project: $PROJECT"
echo "============================================"

# Phase 1: Foundation
task add project:$PROJECT priority:H +foundation +next -- "create astro project with react and tailwind"
task add project:$PROJECT priority:H +foundation -- "configure tailwind design system with purple-blue palette"
task add project:$PROJECT priority:H +foundation -- "install all premium packages (framer-motion, gsap, lenis)"
task add project:$PROJECT priority:H +foundation -- "create base layout with inter display fonts and seo"

# Phase 2: Content Sections
task add project:$PROJECT priority:M +content -- "build hero section with animated mesh gradient"
task add project:$PROJECT priority:M +content -- "build products section (diagnosticpro, vibe prd, hustle)"
task add project:$PROJECT priority:M +content -- "build client work section"
task add project:$PROJECT priority:M +content -- "build expertise section (3-column layout)"
task add project:$PROJECT priority:M +content -- "build services section (4-card grid)"
task add project:$PROJECT priority:M +content -- "build contact section with react hook form"
task add project:$PROJECT priority:M +content -- "build footer with all contact info"

# Phase 3: Animations
task add project:$PROJECT priority:M +animations -- "implement framer motion page load animations"
task add project:$PROJECT priority:M +animations -- "implement gsap scroll animations with scrolltrigger"
task add project:$PROJECT priority:M +animations -- "implement lenis smooth scrolling"
task add project:$PROJECT priority:M +animations -- "add micro-interactions (hovers, focus states)"

# Phase 4: Optimization
task add project:$PROJECT priority:M +optimization -- "optimize images and convert to webp/avif"
task add project:$PROJECT priority:M +optimization -- "run lighthouse audit and fix performance issues"
task add project:$PROJECT priority:M +optimization -- "test mobile responsiveness on multiple devices"
task add project:$PROJECT priority:M +optimization -- "qa all links and ctas"

# Phase 5: Deployment
task add project:$PROJECT priority:H +deployment -- "configure netlify deployment"
task add project:$PROJECT priority:H +deployment -- "deploy to production and verify dns"
task add project:$PROJECT priority:H +deployment -- "final qa and monitoring setup"

echo ""
echo "✅ Created 23 tasks for $PROJECT"
echo ""
echo "📋 Quick Commands:"
echo "  task project:$PROJECT                    # View all tasks"
echo "  task project:$PROJECT +next              # See next action"
echo "  task <id> start                          # Start a task"
echo "  task <id> done                           # Complete a task"
echo "  task burndown                            # View progress"
echo "  task project:$PROJECT status:pending     # View remaining tasks"
echo ""
