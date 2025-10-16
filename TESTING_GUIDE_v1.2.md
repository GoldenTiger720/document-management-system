# Testing Guide - Version 1.2.0

## 🧪 Complete Testing Instructions

This guide will help you test all the new features in version 1.2.0.

---

## Test 1: File Upload in Upload Document Modal

### Setup:
1. Open browser: `http://localhost:8080`
2. Login with: `admin1` / `admin123`
3. Navigate to **"Documents"** page
4. Click **"Upload Document"** button

### Test Steps:

#### Step 1: Open File Browser
```
Action: Click "Add Attachment" button
Expected: Native file browser window opens
Result: ✅ Pass / ❌ Fail
```

#### Step 2: Select Single File
```
Action: Select one PDF file
Expected:
  - File browser closes
  - File appears in table below
  - File name displayed correctly
  - File size formatted (e.g., "2.4 MB")
  - File extension shown (e.g., "PDF")
  - Red PDF icon displayed
Result: ✅ Pass / ❌ Fail
```

#### Step 3: File Table Display
```
Check the table has these columns:
  [ ] File Name column with icon
  [ ] Size column with formatted size
  [ ] Type column with extension
  [ ] Actions column with trash icon
Result: ✅ Pass / ❌ Fail
```

#### Step 4: Remove File
```
Action: Click trash icon on the file
Expected: File removed from table
Result: ✅ Pass / ❌ Fail
```

#### Step 5: Multiple Files
```
Action: Click "Add Attachment" again
        Select multiple files:
        - 1 PDF
        - 1 Word document
        - 1 Excel file
        - 1 Image

Expected: All 4 files appear in table with:
  [ ] PDF file has RED icon
  [ ] Word file has BLUE icon
  [ ] Excel file has GREEN icon
  [ ] Image has PURPLE icon
Result: ✅ Pass / ❌ Fail
```

#### Step 6: File Size Formatting
```
Check file sizes are formatted correctly:
  [ ] Less than 1KB: "xxx Bytes"
  [ ] 1KB - 1MB: "xxx KB"
  [ ] 1MB - 1GB: "xxx MB"
  [ ] Over 1GB: "xxx GB"
Result: ✅ Pass / ❌ Fail
```

#### Step 7: Table Hover Effect
```
Action: Hover mouse over each file row
Expected: Row background changes on hover
Result: ✅ Pass / ❌ Fail
```

#### Step 8: Complete Upload
```
Action:
  1. Enter document name: "Test Document"
  2. Enter document key: "TEST-2024-001"
  3. Keep the files in the table
  4. Click "Upload Document"

Expected:
  - Success toast appears
  - Modal closes
  - Document appears in list
Result: ✅ Pass / ❌ Fail
```

---

## Test 2: Confirmation Modal for User Deactivation

### Setup:
1. Stay logged in as `admin1`
2. Navigate to **"Users"** page
3. Find a user card (not yourself)

### Test Steps:

#### Step 1: Open Confirmation Modal
```
Action: Click "Deactivate" button on user card
Expected:
  - Modal appears (NOT browser alert)
  - Modal has smooth slide-in animation
  - Backdrop is visible and blurred
Result: ✅ Pass / ❌ Fail
```

#### Step 2: Check Modal Content
```
Verify modal displays:
  [ ] Warning icon (⚠️) with orange background
  [ ] Title: "Deactivate User"
  [ ] Subtitle: "This action will disable the user's account"
  [ ] Warning message
  [ ] User information card showing:
      [ ] Name with user icon
      [ ] Username with @ icon
      [ ] Role with shield icon
      [ ] Department with building icon
  [ ] Cancel button (gray)
  [ ] Deactivate User button (red)
Result: ✅ Pass / ❌ Fail
```

#### Step 3: Check User Information
```
Verify the displayed information matches the user:
  [ ] Name is correct
  [ ] Username is correct
  [ ] Role is correct (ADMINISTRATOR/OPERATOR)
  [ ] Department is correct
Result: ✅ Pass / ❌ Fail
```

#### Step 4: Cancel Button
```
Action: Click "Cancel" button
Expected:
  - Modal closes with animation
  - User is NOT deactivated
  - User card still shows "Active"
Result: ✅ Pass / ❌ Fail
```

#### Step 5: Click Outside Modal
```
Action:
  1. Click "Deactivate" button again
  2. Click on the dark backdrop (outside modal)

Expected:
  - Modal closes
  - User is NOT deactivated
Result: ✅ Pass / ❌ Fail
```

#### Step 6: Confirm Deactivation
```
Action:
  1. Click "Deactivate" button again
  2. Click "Deactivate User" button

Expected:
  - Modal closes
  - Success toast appears: "User deactivated successfully"
  - User card updates to show "Inactive" badge
  - User card opacity decreases
Result: ✅ Pass / ❌ Fail
```

#### Step 7: Reactivation Still Works
```
Action: Click "Reactivate" button on the deactivated user
Expected:
  - User is reactivated
  - Success toast appears
  - User card shows "Active" badge
  - No modal for reactivation (immediate action)
Result: ✅ Pass / ❌ Fail
```

---

## Test 3: Cross-Browser Compatibility

### Browsers to Test:

#### Chrome:
```
Browser: Chrome 90+
Test 1 (File Upload): ✅ Pass / ❌ Fail
Test 2 (Modal): ✅ Pass / ❌ Fail
```

#### Firefox:
```
Browser: Firefox 88+
Test 1 (File Upload): ✅ Pass / ❌ Fail
Test 2 (Modal): ✅ Pass / ❌ Fail
```

#### Safari:
```
Browser: Safari 14+
Test 1 (File Upload): ✅ Pass / ❌ Fail
Test 2 (Modal): ✅ Pass / ❌ Fail
```

#### Edge:
```
Browser: Edge 90+
Test 1 (File Upload): ✅ Pass / ❌ Fail
Test 2 (Modal): ✅ Pass / ❌ Fail
```

---

## Test 4: Theme Compatibility

### Light Theme:
```
Action: Ensure light theme is active
Test 1 (File Upload):
  [ ] Table is readable
  [ ] Icons are visible
  [ ] Colors are appropriate
Result: ✅ Pass / ❌ Fail

Test 2 (Modal):
  [ ] Modal is readable
  [ ] Backdrop is visible
  [ ] Colors are appropriate
Result: ✅ Pass / ❌ Fail
```

### Dark Theme:
```
Action: Toggle to dark theme (moon/sun icon)
Test 1 (File Upload):
  [ ] Table is readable on dark background
  [ ] Icons are visible
  [ ] Colors contrast well
Result: ✅ Pass / ❌ Fail

Test 2 (Modal):
  [ ] Modal is readable on dark background
  [ ] Backdrop is visible
  [ ] Colors contrast well
Result: ✅ Pass / ❌ Fail
```

---

## Test 5: Edge Cases

### File Upload Edge Cases:

#### Very Large File:
```
Action: Select a file > 100MB
Expected:
  - File added to table
  - Size formatted correctly (e.g., "125.5 MB")
Result: ✅ Pass / ❌ Fail
```

#### Many Files:
```
Action: Select 10+ files at once
Expected:
  - All files added to table
  - Table scrolls if needed
  - No performance issues
Result: ✅ Pass / ❌ Fail
```

#### Special Characters in Filename:
```
Action: Select file with name: "Test (1) - Report [2024].pdf"
Expected:
  - Filename displayed correctly
  - No encoding issues
Result: ✅ Pass / ❌ Fail
```

#### Unknown File Type:
```
Action: Select file with unusual extension (.xyz)
Expected:
  - File added to table
  - Generic file icon displayed
  - Extension shown correctly
Result: ✅ Pass / ❌ Fail
```

### Modal Edge Cases:

#### Rapid Clicks:
```
Action: Rapidly click "Deactivate" multiple times
Expected:
  - Only one modal appears
  - No duplicate modals
  - No errors in console
Result: ✅ Pass / ❌ Fail
```

#### Long Username:
```
Action: Try to deactivate user with very long name
Expected:
  - Modal adjusts to fit content
  - No text overflow
  - Still readable
Result: ✅ Pass / ❌ Fail
```

---

## Test 6: Responsive Design

### Desktop (1920px):
```
File Upload Table:
  [ ] All columns visible
  [ ] Proper spacing
  [ ] Icons aligned

Confirmation Modal:
  [ ] Centered on screen
  [ ] Proper width
  [ ] All content visible

Result: ✅ Pass / ❌ Fail
```

### Tablet (768px):
```
File Upload Table:
  [ ] Columns readable
  [ ] Horizontal scroll if needed
  [ ] Touch-friendly buttons

Confirmation Modal:
  [ ] Fits screen width
  [ ] No horizontal scroll
  [ ] Touch-friendly buttons

Result: ✅ Pass / ❌ Fail
```

### Mobile (375px):
```
File Upload Table:
  [ ] Horizontal scroll available
  [ ] Touch-friendly
  [ ] Icons visible

Confirmation Modal:
  [ ] Full screen width
  [ ] All content visible
  [ ] Easy to tap buttons

Result: ✅ Pass / ❌ Fail
```

---

## Test 7: Integration Tests

### Upload → Sign → Deactivate Flow:
```
1. Upload document with files
   Result: ✅ Pass / ❌ Fail

2. Sign the uploaded document
   Result: ✅ Pass / ❌ Fail

3. Check notification created
   Result: ✅ Pass / ❌ Fail

4. Deactivate a user (with new modal)
   Result: ✅ Pass / ❌ Fail

5. Verify toast notifications work
   Result: ✅ Pass / ❌ Fail

6. Verify user list updates
   Result: ✅ Pass / ❌ Fail

Overall Integration: ✅ Pass / ❌ Fail
```

---

## Test 8: Accessibility

### Keyboard Navigation:
```
File Upload:
  [ ] Tab to "Add Attachment" button
  [ ] Press Enter to open file browser
  [ ] Tab through file table
  [ ] Tab to trash icons
  [ ] Press Enter to remove file

Confirmation Modal:
  [ ] Tab to Cancel button
  [ ] Tab to Deactivate button
  [ ] Press Enter to confirm
  [ ] Press Escape to close

Result: ✅ Pass / ❌ Fail
```

### Screen Reader:
```
File Upload:
  [ ] Button has descriptive label
  [ ] Table has proper headers
  [ ] File information is announced

Confirmation Modal:
  [ ] Modal title is announced
  [ ] User information is readable
  [ ] Button labels are clear

Result: ✅ Pass / ❌ Fail
```

---

## 📊 Test Results Summary

### Feature 1: File Upload
```
Total Tests: __
Passed: __
Failed: __
Pass Rate: ___%
```

### Feature 2: Confirmation Modal
```
Total Tests: __
Passed: __
Failed: __
Pass Rate: ___%
```

### Overall
```
Total Tests: __
Passed: __
Failed: __
Pass Rate: ___%

Status: ✅ All Pass / ⚠️ Some Fails / ❌ Major Issues
```

---

## 🐛 Bug Report Template

If you find any issues:

```
Bug #:
Feature: File Upload / Confirmation Modal
Severity: Critical / Major / Minor

Description:


Steps to Reproduce:
1.
2.
3.

Expected Result:


Actual Result:


Browser:
OS:
Screenshot:
```

---

## ✅ Sign-Off

```
Tester Name: _________________
Date: _________________
Overall Status: ✅ Pass / ❌ Fail
Notes:




Approved for Production: Yes / No
```

---

**Testing Version**: 1.2.0
**Last Updated**: 2025-10-16
**Status**: Ready for Testing 🧪
