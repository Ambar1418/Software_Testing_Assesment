# Section 3: Detailed Test Cases

**Selected Workflow**: Create Student → Enter Details → Save → Search/View Student → Edit Student  
**Rationale**: Student management is the primary core workflow of AbleSpace. Special education teachers and case managers rely on this feature to track IEP goals, services, and student progress daily. Ensuring data accuracy, edge-case validation, and editing stability here is critical.

---

### 🧪 Test Case TC-01: Create Student with Valid Standard Details (Positive Path)

| Field | Description |
|---|---|
| **Test Case ID** | TC-01 |
| **Title** | Verify successful student creation with valid required and optional fields |
| **Preconditions** | User is logged into AbleSpace as a Special Education Teacher and on the Students management page. |
| **Test Data** | First Name: `Jordan`, Last Name: `Smith`, Grade: `5th Grade`, DOB: `05/12/2014`, Case Manager: `Alex Taylor` |
| **Steps** | 1. Click on the "+ Add Student" button.<br>2. Fill in First Name (`Jordan`) and Last Name (`Smith`).<br>3. Select Grade (`5th Grade`) and DOB (`05/12/2014`).<br>4. Select Case Manager from dropdown (`Alex Taylor`).<br>5. Click "Save Student" button. |
| **Expected Result** | Student profile is successfully created. System displays success notification toast and redirects to the Student Profile view. |
| **Actual Result** | Student created successfully, toast displayed, and student appears in the active student list. |
| **Status** | **PASS** |

---

### 🧪 Test Case TC-02: Create Student Validation with Blank Required Fields (Negative Path)

| Field | Description |
|---|---|
| **Test Case ID** | TC-02 |
| **Title** | Verify form validation when saving student with empty mandatory fields |
| **Preconditions** | User is logged in and has opened the "Add Student" modal form. |
| **Test Data** | First Name: `[Empty]`, Last Name: `[Empty]`, Grade: `[Unselected]` |
| **Steps** | 1. Open "+ Add Student" form.<br>2. Leave First Name and Last Name fields completely empty.<br>3. Click the "Save Student" submit button. |
| **Expected Result** | Form is not submitted. Red inline error messages `"First name is required"` and `"Last name is required"` appear under inputs. Save button remains disabled or handles validation gracefully. |
| **Actual Result** | Inline validation error messages displayed correctly; form submission blocked. |
| **Status** | **PASS** |

---

### 🧪 Test Case TC-03: Boundary Test – Create Student with Maximum Length Name & Special Characters (Edge Case)

| Field | Description |
|---|---|
| **Test Case ID** | TC-03 |
| **Title** | Verify student creation with long name strings containing hyphens, apostrophes, and unicode |
| **Preconditions** | User is logged in and on the "Add Student" form. |
| **Test Data** | First Name: `Alexander-Christopher-Maximilian-VeryLongNameNameNameNameName`, Last Name: `O'Connor-Smith-Jr.`, Grade: `3rd Grade` |
| **Steps** | 1. Click "+ Add Student".<br>2. Enter 50+ character string with hyphens and apostrophes in First Name and Last Name.<br>3. Select Grade (`3rd Grade`).<br>4. Click "Save Student". |
| **Expected Result** | Form accepts valid special characters (hyphens/apostrophes) up to field character limit without throwing database or layout wrapping errors. |
| **Actual Result** | Name saved cleanly without layout distortion or UI truncation glitches. |
| **Status** | **PASS** |

---

### 🧪 Test Case TC-04: Search Student by Full Name, Partial Name, and Case Insensitive Query (Positive Path)

| Field | Description |
|---|---|
| **Test Case ID** | TC-04 |
| **Title** | Verify student search functionality filtering active caseload |
| **Preconditions** | At least 3 students exist in the student roster (e.g., `Jordan Smith`, `Samantha Miller`, `Alex Johnson`). |
| **Test Data** | Query 1: `jordan`, Query 2: `MILLER`, Query 3: `XYZ_NonExistent` |
| **Steps** | 1. Navigate to Students page.<br>2. Type `jordan` in the search bar.<br>3. Clear search and type `MILLER`.<br>4. Clear search and type `XYZ_NonExistent`. |
| **Expected Result** | Query 1 returns `Jordan Smith`. Query 2 returns `Samantha Miller` (case insensitive). Query 3 displays clean empty state: `"No students found"`. |
| **Actual Result** | Search filtered roster accurately with instant UI response and clean empty state. |
| **Status** | **PASS** |

---

### 🧪 Test Case TC-05: Edit Existing Student Details & Verify Persistence (Positive Path)

| Field | Description |
|---|---|
| **Test Case ID** | TC-05 |
| **Title** | Verify editing student grade, DOB, and primary goals updates database correctly |
| **Preconditions** | Student `Jordan Smith` exists in the roster. |
| **Test Data** | Updated Grade: `6th Grade`, Updated DOB: `06/15/2014` |
| **Steps** | 1. Search and click on `Jordan Smith`.<br>2. Click "Edit Profile" button.<br>3. Change Grade to `6th Grade` and DOB to `06/15/2014`.<br>4. Click "Save Changes".<br>5. Refresh browser page (`Cmd+R` / `F5`). |
| **Expected Result** | Profile updates instantly. After page refresh, updated Grade (`6th Grade`) and DOB persist correctly. |
| **Actual Result** | Changes saved and persisted cleanly across page reloads. |
| **Status** | **PASS** |

---

### 🧪 Test Case TC-06: Cancel Edit Operation Without Saving (Negative Path)

| Field | Description |
|---|---|
| **Test Case ID** | TC-06 |
| **Title** | Verify clicking Cancel during edit discards un-saved input changes |
| **Preconditions** | Student `Jordan Smith` exists with Grade `6th Grade`. |
| **Test Data** | Modified Un-saved Grade: `8th Grade` |
| **Steps** | 1. Open edit mode for `Jordan Smith`.<br>2. Change Grade dropdown to `8th Grade`.<br>3. Click "Cancel" button without clicking Save.<br>4. Re-open student profile. |
| **Expected Result** | Changes are discarded. Grade remains `6th Grade`. |
| **Actual Result** | Original values maintained; draft edits discarded. |
| **Status** | **PASS** |

---

### 🧪 Test Case TC-07: Rapid Duplicate Submission on Save Student (Edge Case)

| Field | Description |
|---|---|
| **Test Case ID** | TC-07 |
| **Title** | Verify double-clicking Save button does not create duplicate student entries |
| **Preconditions** | "Add Student" modal is open with valid details filled. |
| **Test Data** | First Name: `Taylor`, Last Name: `Brown`, Grade: `4th Grade` |
| **Steps** | 1. Fill student details.<br>2. Rapidly double-click "Save Student" button.<br>3. Check student roster list. |
| **Expected Result** | Only one single student instance of `Taylor Brown` is created in database and list. |
| **Actual Result** | Save button disables on first click; single record created. |
| **Status** | **PASS** |
