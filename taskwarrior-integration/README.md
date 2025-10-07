# taskwarrior integration

automated task tracking for intent solutions io rebuild

## quick start

```bash
# make script executable
chmod +x setup-tasks.sh

# run task setup
./setup-tasks.sh

# view all tasks
task project:intentsolutions-rebuild

# start first task
task project:intentsolutions-rebuild +next
```

## task breakdown

### phase 1: foundation (4 tasks)
- create astro project
- configure design system
- install packages
- create base layout

### phase 2: content sections (7 tasks)
- hero section
- products section
- client work section
- expertise section
- services section
- contact form
- footer

### phase 3: animations (4 tasks)
- framer motion page loads
- gsap scroll animations
- lenis smooth scroll
- micro-interactions

### phase 4: optimization (4 tasks)
- image optimization
- lighthouse audit
- mobile testing
- qa

### phase 5: deployment (3 tasks)
- netlify config
- production deploy
- final qa

## progress tracking

```bash
# view progress
task burndown

# see what's next
task project:intentsolutions-rebuild status:pending

# mark task complete
task <id> done

# start next task
task <next-id> start
```

## tags

- `+foundation` - initial setup
- `+content` - page sections
- `+animations` - motion and interactions
- `+optimization` - performance tuning
- `+deployment` - production launch
- `+next` - current action item

total: 23 tasks for complete premium rebuild
