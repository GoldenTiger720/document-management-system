# Update Guide - Version 1.1.0

## 🎯 What Changed?

This guide shows you exactly what changed and how to use the new features.

---

## 1️⃣ New Login/Registration System

### Before:
```
Login Page had:
- Username field
- Password field
- Demo Accounts section (4 quick login buttons)
```

### After:
```
Login Page now has:
- Username field
- Password field
- ✨ Role selection dropdown (NEW!)
- ✨ Department selection dropdown (NEW!)
- ❌ Demo Accounts removed
```

### How It Works:

#### Creating a New Account:
```
1. Enter a NEW username (e.g., "john_smith")
2. Enter password (e.g., "mypass123")
3. Select role:
   - Administrator (full access)
   - Operator (read-only)
4. Select department:
   - Finance
   - HR
   - IT
   - Legal
   - Operations
5. Click "Sign In"

→ Account created automatically!
→ You're logged in immediately!
```

#### Logging into Existing Account:
```
1. Enter EXISTING username (e.g., "admin1")
2. Enter correct password (e.g., "admin123")
3. Select any role/department (system uses stored values)
4. Click "Sign In"

→ Password validated
→ Logged in with your existing account
```

---

## 2️⃣ Username Display in Navigation

### Before:
```
Navigation showed:
User icon → [Name from database]
Example: "John Doe"
```

### After:
```
Navigation shows:
User icon → [Username entered at login]
Example: "john_smith"
```

### Why This Matters:
- You see exactly what you typed to login
- More intuitive for users
- Easier to remember which account you're using

---

## 3️⃣ Fixed Dropdown Menu Behavior

### Before (Problem):
```
1. Click user avatar → Menu opens ✓
2. Click "Profile" → Menu stays open ✗
3. Click "Settings" → Menu stays open ✗
4. Have to click avatar again to close ✗
```

### After (Fixed):
```
1. Click user avatar → Menu opens ✓
2. Click "Profile" → Menu closes ✓
3. Click "Settings" → Menu closes ✓
4. Click anywhere outside → Menu closes ✓
5. Click "Logout" → Menu closes ✓
```

### What Was Fixed:
- ✅ Menu items now close the dropdown when clicked
- ✅ Clicking anywhere on the page closes the dropdown
- ✅ Event propagation properly handled
- ✅ No more "stuck" dropdown menus

---

## 🎮 Try It Yourself!

### Test 1: Create a New User
```bash
# 1. Open browser: http://localhost:8080
# 2. You'll see the login page

# 3. Fill in the form:
Username: testuser123
Password: secure123
Role: Administrator
Department: Finance

# 4. Click "Sign In"
# 5. ✅ You should be logged in with a new account!
# 6. Check top-right corner: Should show "testuser123"
```

### Test 2: Login with Existing User
```bash
# 1. Logout if you're logged in
# 2. Go to login page

# 3. Fill in the form:
Username: admin1
Password: admin123
Role: (select any)
Department: (select any)

# 4. Click "Sign In"
# 5. ✅ You should be logged in with existing account
# 6. Notice: System uses stored role (Administrator) and department (Finance)
```

### Test 3: Test Dropdown Menu
```bash
# 1. Login to dashboard
# 2. Click user avatar in top-right
# 3. ✅ Dropdown opens
# 4. Click "Profile"
# 5. ✅ Dropdown closes immediately
# 6. Click user avatar again
# 7. Click outside the menu (anywhere on the page)
# 8. ✅ Dropdown closes immediately
```

---

## 📋 Complete Feature Comparison

| Feature | Before | After |
|---------|--------|-------|
| **Login Fields** | Username + Password | Username + Password + Role + Department |
| **Demo Accounts** | Visible on page | Removed (cleaner UI) |
| **New User Creation** | Not available | ✅ Automatic |
| **Username Display** | Shows name | ✅ Shows username |
| **Dropdown Behavior** | Stays open | ✅ Auto-closes |
| **Click Outside** | No effect | ✅ Closes menu |

---

## 🔧 Technical Changes Summary

### Files Modified:

```
1. app/views/login.html
   ├─ Added: Role dropdown
   ├─ Added: Department dropdown
   └─ Removed: Demo accounts section

2. app/controllers/loginController.js
   ├─ Updated: credentials object
   ├─ Modified: login() function
   └─ Removed: quickLogin() function

3. app/services/authService.js
   ├─ Updated: login() signature
   ├─ Added: User registration logic
   └─ Added: Auto-increment user IDs

4. app/controllers/mainController.js
   ├─ Updated: toggleUserMenu() with $event
   ├─ Added: closeUserMenu() function
   └─ Modified: logout() to close menu

5. index.html
   ├─ Updated: User avatar display
   ├─ Added: $event parameter
   └─ Added: ng-click to menu items
```

---

## 🎯 User Roles Explained

### Administrator Role:
```
Can access:
✅ Dashboard
✅ User Management (create, edit, deactivate users)
✅ Documents (view, upload)
✅ Document Signing (sign documents)
✅ Notifications

Restrictions:
❌ Can only see their own department's data
```

### Operator Role:
```
Can access:
✅ Dashboard
✅ Documents (view only)
✅ Notifications

Cannot access:
❌ User Management
❌ Document Signing
❌ Create/Edit operations
```

---

## 🏢 Department Isolation

### How It Works:
```
Finance Department Users:
→ Can only see Finance users
→ Can only see Finance documents
→ Can only see Finance notifications

HR Department Users:
→ Can only see HR users
→ Can only see HR documents
→ Can only see HR notifications

(Same for IT, Legal, Operations)
```

### Example:
```
User: john_smith
Role: Administrator
Department: Finance

What john_smith sees:
✅ Finance documents
✅ Finance users
✅ Finance notifications

What john_smith CANNOT see:
❌ HR documents
❌ HR users
❌ Legal documents
❌ IT users
```

---

## 💡 Pro Tips

### Tip 1: Quick Testing
```
Create multiple users with different roles/departments:

testadmin_finance (Admin, Finance)
testoper_finance (Operator, Finance)
testadmin_hr (Admin, HR)
testoper_hr (Operator, HR)

Then login with each to see how access differs!
```

### Tip 2: Username Display
```
The navigation bar shows your username.
This helps you remember which account you're using,
especially if you're testing multiple accounts!
```

### Tip 3: Dropdown Menu
```
The dropdown now works naturally:
- Click to open
- Click anywhere to close
- Click an option to select AND close

Just like native browser dropdowns!
```

---

## 🐛 Known Behaviors

### Mock Data Reset
```
⚠️ Remember: All data resets on page refresh!

New users you create will disappear when you refresh.
This is because we're using in-memory mock data.

For persistent data, see: MOCK_DATA_PERSISTENCE.md
```

### Role/Department on Existing Users
```
When logging in with existing users (admin1, admin2, etc.),
the role/department dropdowns are still required,
but the system uses the stored values from the user database.

The dropdowns are mainly for new user registration.
```

---

## 🎉 Enjoy the Updates!

Your application is now:
- ✅ More user-friendly
- ✅ Cleaner interface
- ✅ Better usability
- ✅ Self-service registration

### Questions?
Check these files:
- **README.md** - Full documentation
- **CHANGELOG.md** - Detailed changes
- **QUICK_START_KR.md** - Korean quick start
- **README_KR.md** - Korean documentation

---

**Happy coding!** 🚀
