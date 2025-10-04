DOCS=ai-dev/docs
SOP=ai-dev/sop
TPL=ai-dev/templates
T?=create-prd.md
N?=new-doc.md

.PHONY: status create list-templates help

status:
	@echo "📊 AI-Dev Pipeline Status: $(shell basename $(PWD))"
	@echo "========================================"
	@echo "📚 Templates: $(shell [ -L $(TPL) ] && echo "✅ Linked" || echo "❌ Missing")"
	@echo "📁 Documents: $(shell [ -d $(DOCS) ] && ls -1 $(DOCS) 2>/dev/null | wc -l || echo "0") files"
	@echo ""
	@echo "📋 Current Documents:"
	@[ -d $(DOCS) ] && ls -1 $(DOCS) 2>/dev/null | sed 's/^/  ✓ /' || echo "  (no documents yet)"

create:
	@mkdir -p $(DOCS) $(SOP)
	@if [ ! -f "$(TPL)/$(T)" ]; then echo "❌ Template not found: $(T)"; exit 1; fi
	@if echo "$(N)" | grep -q "sop"; then
		cp "$(TPL)/$(T)" "$(SOP)/$(N)"
		echo "📄 Created: $(SOP)/$(N)"
	else
		cp "$(TPL)/$(T)" "$(DOCS)/$(N)"
		echo "📄 Created: $(DOCS)/$(N)"
	fi

list-templates:
	@echo "📚 Available Templates:"
	@[ -d $(TPL) ] && ls -1 $(TPL)/*.md 2>/dev/null | sed 's|.*/||; s|\.md$$||' | sed 's/^/  - /'

help:
	@echo "make status    - Show pipeline status"
	@echo "make create    - Create document from template"
	@echo "make help      - Show this help"
