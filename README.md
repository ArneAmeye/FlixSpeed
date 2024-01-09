# FlixSpeed

## This browser extension allows you the choose your desired Netflix video speed.

Ever wanted to watch Netflix a little faster or slower?\
Video speed at 1.2x so you can bingewatch more or handle slow-pacing storylines?\
FlixSpeed gives you full control via videoplayer buttons and/or customizable keyboard shortcuts!

Includes visual feedback when changing speed in the center of the video (your current speed).

Use the extensions icon in the upper right corner of your browser to open the FlixSpeed settings.\
Set your own preferred keyboard shortcuts or disable/enable the on-screen videoplayer buttons.


## There are other extensions like this, why this one?
- I developed this because similar extensions are tracking your privacy or adding affiliate (marketing) links when you go to webshops. I don't like any of that, neither do you probably.
- I'm a web developer and wanted to learn about chrome extension development.

## Free to use
This will always remain free.\
[If you like this, you can always buy me a coffee](https://www.paypal.com/paypalme/arneameye)

## Changelog:
### V1.0.11:
- Update: Less strict host permissions. We now only ask permissions to have access to the webpage when you're on a netflix domain. This means we can guarantee more privacy to you.
- Update: Improve layout and styling code of settings dialog.
- Misc: Added readme to Github containing the description and changelog that was already posted in the web/chrome extension store.
- Misc: Change the donate link to the new PayPal Me donation link. This improves the settings dialog to open a little faster than with the previous approach.
### V1.0.10:
- Update: rename background.js to service_worker.js as recommended by Google for the manifest V3 rules.
### V1.0.9:
- Update: Migrated the manifest from V2 to V3 as recommended by Google.
### V1.0.8:
- Update & Fix:  Make Flixspeed work with new videoplayer changes of Netflix.
### v1.0.7:
- Bugfix: Now we're keeping video controls when changing movies or tv shows completely.
### v1.0.6:
- Bugfix: When watching more than 1 episode, video control buttons now check for the speed feedback element and add it to the page structure if needed.
### v1.0.5:
- Feature: Added video player controls onscreen.
### v1.0.0 -> v1.0.4:
- Initial Release.
- Fixes: extension icons, styling, and small bugs.
