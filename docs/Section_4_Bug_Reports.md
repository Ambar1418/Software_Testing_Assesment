# Section 4: Bug Reports

**Overview**: Full bug reports for the 3 most important functional & UX bugs identified during live testing of `staging.ablespace.io`, followed by a list of minor cosmetic/usability issues.

---

### 🐛 BUG-01: Silent Account Creation Failure on Signup Step 2 (reCAPTCHA / Backend Block)

| Field | Description |
|---|---|
| **Bug ID** | BUG-01 |
| **Title** | Signup form remains frozen on `/signup` after step 2 submission without user error message |
| **Severity** | **Critical** (Blocks new user onboarding and account creation entirely) |
| **Priority** | **High** (High impact on user acquisition) |
| **Environment** | `https://staging.ablespace.io/signup` (Tested on 2026-10-07) |
| **Browser / Device** | Google Chrome 129 on macOS Sonoma (1280 × 800) |
| **Reproducibility** | **Always** |
| **Steps to Reproduce** | 1. Open `https://staging.ablespace.io/signup`.<br>2. Enter valid unused email address (e.g. `qa.test.user.1791353404383@gmail.com`) and click **Continue**.<br>3. On Step 2 screen, enter Full Name (`Alex Tester`), select Role (`Special Education Teacher`), enter strong Password (`TestPassword123!`), and check Privacy Policy checkbox.<br>4. Click **Continue** button to submit registration. |
| **Expected Result** | User account should be created in Firebase/Backend, and user should be automatically redirected to `/onboarding` or `/dashboard` with an active session. If verification fails, an explicit error notification should be rendered. |
| **Actual Result** | Button text briefly changes to `"Signing up"`, network request to reCAPTCHA/Firebase fails silently or returns permission error, and user remains stuck permanently on `/signup` without any visual feedback or error banner. |
| **Evidence** | Screenshot evidence: `scratch/evidence_post_signup.png` & trace log in `scratch/console_logs.txt`. |

---

### 🐛 BUG-02: Search & Filter Options Broken on Mobile Viewport (Horizontal Overflow & Button Clipping)

| Field | Description |
|---|---|
| **Bug ID** | BUG-02 |
| **Title** | Mobile screen layout at 390px width experiences horizontal scrolling and cutoff action buttons |
| **Severity** | **Medium** (Affects usability on mobile phones & tablets) |
| **Priority** | **Medium** (Core mobile experience degraded) |
| **Environment** | `https://staging.ablespace.io/signup` & `https://staging.ablespace.io/signin` (Tested on 2026-10-07) |
| **Browser / Device** | Mobile View Emulation (390 × 844 viewport, iPhone 12/13/14 / Pixel 5) |
| **Reproducibility** | **Always** |
| **Steps to Reproduce** | 1. Set browser viewport to 390px width × 844px height (mobile viewport).<br>2. Navigate to `https://staging.ablespace.io/signup`.<br>3. Inspect bottom footer compliance badges ("HIPAA COMPLIANT", "FERPA COMPLIANT", "ISO 27001").<br>4. Attempt to scroll horizontally. |
| **Expected Result** | Page layout should be strictly fluid and non-scrolling horizontally (`overflow-x: hidden`). Badges and buttons should wrap cleanly into vertical grid columns. |
| **Actual Result** | ISO 27001 badge forces fixed container width, causing unwanted horizontal scrollbar and pushing action buttons off-screen on small viewports. |
| **Evidence** | Screenshot evidence: `scratch/mobile_signup.png`. |

---

### 🐛 BUG-03: Strict Mode Selector Collisions for OAuth Action Buttons

| Field | Description |
|---|---|
| **Bug ID** | BUG-03 |
| **Title** | OAuth buttons ("Continue with Google", "Continue with Clever") reuse identical button accessibility labels causing DOM ambiguity |
| **Severity** | **Medium** (Impacts accessibility tree and test automation locators) |
| **Priority** | **Medium** (Affects accessibility compliance and screen readers) |
| **Environment** | `https://staging.ablespace.io/signin` & `/signup` |
| **Browser / Device** | All browsers (Chrome, Firefox, Mobile) |
| **Reproducibility** | **Always** |
| **Steps to Reproduce** | 1. Inspect DOM for OAuth buttons on `/signin` page.<br>2. Check accessibility label and button text for main submit vs. third-party login buttons.<br>3. Query element by role `button` with name `"Continue"`. |
| **Expected Result** | Each button should possess a distinct, unique accessible name (e.g. `aria-label="Sign in with Google"`, `aria-label="Submit login form"`). |
| **Actual Result** | Multiple buttons return non-unique accessible names containing `"Continue"`, causing screen reader ambiguity and Playwright strict locator collisions. |
| **Evidence** | Playwright test runner log trace: `strict mode violation: getByRole('button', { name: 'Continue' }) resolved to 5 elements`. |

---

### 📝 Minor Issues List (One-Liner Reports)

1. **MINOR-01**: Missing `aria-live` region on Password Strength Indicator, preventing screen readers from announcing password security level updates.
2. **MINOR-02**: Signup Step 2 email text field uses `cursor-not-allowed` but lacks an explicit `disabled` HTML attribute, allowing focus via keyboard navigation.
3. **MINOR-03**: Compliance footer badges (`HIPAA`, `FERPA`) wrap onto two lines unnaturally on intermediate tablet screens (768px width).
