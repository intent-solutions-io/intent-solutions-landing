"""Browser regression for the public site. All form traffic is intercepted.

Run after build against a local preview:
  python scripts/test-brand-polish.py http://127.0.0.1:4896
Dependency: pip install playwright && playwright install chromium
"""
import sys
from playwright.sync_api import sync_playwright, expect

base = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4896'
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width in (320, 390, 768, 1440):
        page = browser.new_page(viewport={'width': width, 'height': 1000}, reduced_motion='reduce')
        page.goto(base, wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        expect(page.locator('#hero-title')).to_have_text('Bring us the work you need AI to do.')
        bounds = page.locator('#hero-title').evaluate('''el => {
          const range = document.createRange(); range.selectNodeContents(el);
          return [...range.getClientRects()].map(r => ({left:r.left,right:r.right}));
        }''')
        assert all(r['left'] >= 0 and r['right'] <= width for r in bounds), (width, bounds)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        assert page.locator('.hero .primary').bounding_box()['y'] < 1000
        for link in page.locator('.network-inner a').all():
            assert link.bounding_box()['height'] >= 44
        if width < 850:
            menu = page.locator('.mobile-menu')
            page.locator('summary').click()
            expect(menu).to_have_attribute('open', '')
            page.keyboard.press('Escape')
            expect(menu).not_to_have_attribute('open', '')
            expect(page.locator('summary')).to_be_focused()
            page.locator('summary').click()
            page.locator('.mobile-panel').get_by_role('link', name='Proof', exact=True).click()
            expect(menu).not_to_have_attribute('open', '')
        page.goto(base, wait_until='networkidle')
        page.screenshot(path=f'/tmp/intent-fixed-{width}.png', full_page=True)
        for path in ('/projects/', '/about/', '/support/', '/site-map/', '/contact/?door=outcome', '/cloud/', '/learn/security/'):
            page.goto(base + path, wait_until='networkidle')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, path)
            expect(page.locator('main h1')).to_have_count(1)
        page.close()
    page = browser.new_page(viewport={'width': 390, 'height': 900})
    page.goto(base + '/contact/?door=outcome', wait_until='networkidle')
    expect(page.get_by_label('What kind of request is this?')).to_have_value('consulting')
    page.get_by_role('button', name='Send request').click()
    expect(page.locator('#name')).to_have_attribute('aria-invalid', 'true')
    page.get_by_label('Name', exact=False).fill('Browser test')
    page.get_by_label('Email', exact=False).fill('browser-test@example.invalid')
    page.get_by_label('What outcome do you need, and how will you know it worked?').fill('Verify the form locally without sending a real request.')
    calls = []
    def fail(route):
        calls.append(route.request.post_data_json)
        route.fulfill(status=503, json={'error': 'Test service unavailable. Please retry.'})
    page.route('**/api/forms/contact', fail)
    page.get_by_role('button', name='Send request').click()
    expect(page.get_by_role('alert')).to_contain_text('Please email jeremy@intentsolutions.io')
    expect(page.locator('#name')).to_have_value('Browser test')
    page.unroute('**/api/forms/contact', fail)
    page.route('**/api/forms/contact', lambda route: route.fulfill(status=200, json={'ok': True}))
    page.get_by_role('button', name='Send request').click()
    expect(page.get_by_role('status')).to_contain_text('Request received')
    expect(page.get_by_role('button', name='Sent', exact=True)).to_be_disabled()
    assert calls[0]['interest'] == 'consulting'
    page.close()
    page = browser.new_page(viewport={'width': 390, 'height': 900}, java_script_enabled=False)
    page.goto(base + '/contact/')
    assert 'The form needs JavaScript to submit. You can email' in page.locator('body').inner_text()
    expect(page.get_by_role('button', name='Loading form...')).to_be_disabled()
    page.close()
    page = browser.new_page(viewport={'width': 768, 'height': 1000}, reduced_motion='reduce')
    page.goto(base, wait_until='networkidle')
    page.add_style_tag(content='html {font-size:200% !important;}')
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), '200% text reflow'
    browser.close()
print('PASS: 4 viewport sizes, 8 routes, hero glyph bounds, menu keyboard/anchor dismissal, touch targets, form validation/failure/retry/success, no-JS fallback, 200% text reflow. No real submissions sent.')
