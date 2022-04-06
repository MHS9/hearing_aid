# Hearing Aid Augmentation

## Summary
This project uses mediapipe to capture motion from American Sign Language(ASL) videos. These motion data is then displayed on a chrome extension. The chrome extension, once opened by the user, it is supposed to read the content on the current opened tab, whether it is text, video caption or audio. Then the data collected should be mapped to a avatar doing the word/phrases respective ASL. 

## How to run it:

### FrontEnd
 -```npm install```
 -```npm run start```
 **NOTE:** We are still trying to make it into a chrome extension & it still doesn't read the motion data points from firebase 100% correctly.
 
### Backend
- ```cd /mediapipeholistic/dist```
-`` npm install``
-`` npm run serve``
- upload video  from  SignSchool(https://www.signschool.com/tools/dictionary/all/), and motion data points will be stored on firebase
**NOTE:** We are still working on fixing certain minor bugs and try to automate this process.

**Thanks!**__
