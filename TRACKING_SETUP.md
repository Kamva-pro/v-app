# Google Sheets Tracking Setup

## Quick Setup (5 minutes)

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Sign in with `kamvelihlefatman@gmail.com`
3. Create new sheet named **"Sinothando - Valentine Responses"**
4. In **Row 1**, add headers:
   - `A1`: **Timestamp**
   - `B1`: **Name**
   - `C1`: **Selection**

### Step 2: Create Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.selection
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name it: **"Valentine Tracker"**

### Step 3: Deploy
1. Click **Deploy** → **New deployment**
2. Click ⚙️ → Select **Web app**
3. Settings:
   - **Description**: "Valentine Response Logger"
   - **Execute as**: Me
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. **COPY THE WEB APP URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)

### Step 4: Update Website Code
1. Open `script.js`
2. Find line 1, add this at the very top:

```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

3. Replace `'PASTE_YOUR_WEB_APP_URL_HERE'` with your actual URL from Step 3

### Step 5: Test
1. Open the website
2. Click "Yes" → Select any option
3. Check your Google Sheet - you should see the entry!

---

## What Gets Saved
Every time Sinothando selects an option:
- **Timestamp**: When she clicked
- **Name**: "Sinothando"
- **Selection**: Which date option she chose

## Privacy Note
The data is only saved to YOUR Google Sheet. No one else can access it.
