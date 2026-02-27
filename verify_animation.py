from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the app
    # Assuming the app is running on localhost:3000
    page.goto("http://localhost:3000")

    # Wait for the app to load
    page.wait_for_timeout(2000)

    # Find a note button
    # In SingleNoteGame, there are buttons for notes 'c', 'd', 'e', etc.
    # We don't know the correct answer easily from the DOM without more logic,
    # but we can try to click a button and see if it triggers an animation.
    # However, the animation is on the active state or the streak update.

    # Let's try to click 'c'
    button_c = page.locator("button").filter(has_text="c").first

    # We want to capture the active state style, which is hard with a screenshot as it's transient.
    # But we can capture the "Streak" animation if we get it right.
    # Since we don't know the correct note, we might just click all of them until we hit the right one?
    # Or we can just click one and capture the visual state.

    # Let's just take a screenshot of the initial state first to ensure it loaded.
    page.screenshot(path="verification_initial.png")

    # Try to find the correct note by checking the internal state or just trying all?
    # The game picks a random note.
    # Let's try to click 'c'. If it's wrong, we get "Wrong!". If right "Great job!".
    button_c.click()

    # Wait a tiny bit for React to update
    page.wait_for_timeout(500)

    # Take a screenshot after click
    page.screenshot(path="verification_after_click.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
