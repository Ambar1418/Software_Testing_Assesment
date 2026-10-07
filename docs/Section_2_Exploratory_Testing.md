# Section 2: Exploratory Testing Scenarios

**Deliverable**: A list of 10 important scenarios tested across the AbleSpace staging application (`staging.ablespace.io`), with one line each on what was checked and the result.

---

### 📋 Exploratory Testing Scenarios

| # | Scenario Title | What Was Checked | Test Result |
|---|---|---|---|
| **1** | Signup Email Required Validation | Submitted the initial signup form on `/signup` with an empty email field. | **PASS**: Inline validation error `"Email is required"` was correctly displayed under the input field. |
| **2** | Password Strength Real-Time Feedback | Entered weak (`"123"`), moderate (`"Password1"`), and strong (`"P@ssw0rd123!"`) passwords during step 2 of signup. | **PASS**: Password strength indicator dynamically updated from `Weak` to `Strong`. |
| **3** | Account Creation & Onboarding Redirection | Completed Step 2 signup with valid fictional user details and submitted the form. | **FAIL**: Form submitted with `"Signing up"` spinner state, but stayed stuck on `/signup` without redirecting or showing error. |
| **4** | Signin Email Field State on Step 2 | Entered valid email on `/signin` step 1 and checked the email field on step 2. | **PASS**: Email input field became disabled/read-only on step 2, preventing accidental email modification. |
| **5** | OAuth Third-Party Login Options | Clicked "Continue with Google", "Continue with Microsoft", "Continue with Clever", and "Continue with Classlink". | **PASS**: Redirected cleanly to respective third-party authentication providers. |
| **6** | Legal Links & Privacy Policy Accessibility | Clicked "Privacy Policy" and "Terms of Service" footer links from signup and signin screens. | **PASS**: Pages loaded successfully with complete legal documentation without broken 404 errors. |
| **7** | Mobile Responsive Layout (390 x 844) | Inspected landing, signin, and signup screens on mobile screen emulation (390 x 844). | **PASS**: Layout adapted responsively without unexpected horizontal scrolling or text clipping. |
| **8** | Unauthenticated Direct Route Access | Attempted to navigate directly to `/dashboard` and `/students` without an active session. | **PASS**: Protected routes successfully intercepted unauthenticated requests and redirected to `/signin`. |
| **9** | Form Re-submission & Rapid Double Click | Rapidly clicked the "Continue" button on the signup and signin forms. | **PASS**: Button disabled itself during request processing, preventing duplicate submission requests. |
| **10** | Role Dropdown Selection & Keyboard Accessibility | Searched and selected "Special Education Teacher" in the role dropdown using keyboard navigation. | **PASS**: Filtered options accurately and responded to `ArrowDown` + `Enter` key presses. |
