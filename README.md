# subtracker
A simple script to integrate PSA's API into a Shopify website

## Setup
1. Replace `<access token>` in the script with your access token
2. Add the script to the "Assets" folder
    * Click Online Store > Themes > ... > Edit Code
    * Scroll down to find the Assets folder and click "Add a new asset"
    * Upload the `SubTracker.js` file
3. Under the "Layout" folder, click on `theme.liquid`
    * add `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js" defer="defer"></script>` somewhere in the `<header>` section. This is required because the script makes a jquery call.
    * add `{{ 'SubTracker.js' | asset_url | script_tag }}` at the bottom right before the closing `</body>` tag. This lets a custom page see the script.
4. Create the interface for the script
    * Navigate back to "Online Store"
    * Click "Pages" and create a new page
    * In the page editor, click `<>` to show HTML
    * copy and paste the following into the editor
    ```HTML
    <div style="text-align: center;">Enter your Submission Number here to see your order status.</div>
    <br />
    <div style="text-align: center;"><input type="text" id="YQNum" maxlength="30" /> <input type="button" value="Enter" onclick="trackSubmission(YQNum.value)" /> <br /> <br />
    <div id="trackResult"></div>
    </div>
    ```
## Example
https://www.levelupsubs.com/pages/sub-tracker

## Resources
* https://www.psacard.com/publicapi/documentation
* https://api.psacard.com/publicapi/swagger/ui/index
