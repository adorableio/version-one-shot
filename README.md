# VersionOne-Shot

Make VersionOne more adorable.

## What is VersionOne-Shot?

For a client project we use [VersionOne](http://www.versionone.com) which has a ton of functionality that is useful for their organization, but is not necessary in our day to day usage of the tool. We found that limiting the *columns* displayed and removing stories related to *epics* we were not working on provided a much better view of the work in front of us.

Additionally, when viewing an individual card we cleaned-up the padding and whitespace to make it easier to see the information most relevant to us.

### Dependecies

* gulp
* npm
* node 4.0.0 or higher

### Setup
1. Clone repository and `cd` into the directory
1. Run the following:
  ```
  npm install &&
  bower install &&
  $(npm bin)/gulp build
  ```
1. In Chrome, open the [Chrome Extensions page](chrome://extensions/)
1. Check the `Developer mode` checkbox
1. Click `Load unpacked extension ...` button
1. Navigate to the `/app` directory wherever you cloned the repository above.

### Usage
It should *"just work"*. Load VersionOne and watch the columns and epics you configured get hidden **automagically**.

#### Keyboard Shortcut
The `v` key reruns the page enhancements.

#### Hide a Column
1. Right-click on the header of the column you would like to remove.
2. Find the `data-token` value (i.e. StoryStatus1065) and note the number on the end
3. Open the [Chrome Extensions page](chrome://extensions/)
4. Open the `Options` pop-up for the VersionOne-Shot extension
5. Add the number from step 2 above to the **Columns to hide** comma-separated list.
6. Click `Save`
7. Reload your project in VersionOne.

#### Hide an Epic
1. Right-click on the bottom tab on an Epic you would like to remove.
2. Find the `rel` value (i.e. Epic:208545) and note the number on the end
3. Open the [Chrome Extensions page](chrome://extensions/)
4. Open the `Options` pop-up for the VersionOne-Shot extension
5. Add the number from step 2 above to the **Epics to hide** comma-separated list.
6. Click `Save`
7. Reload your project in VersionOne.

### Building a Release for Chrome Web Store

Note: This action requires membership in the [Google Group: Adorable VersionOne-Shot](https://groups.google.com/forum/#!members/adorable-versionone-shot) and a valid Google developer account ($5.00 registration fee).

1. Bump the `version` in the `app/manifest.json` as necessary. Note that the build process will increase the version in the manifest of the output directory (`dist`).
2. Run `ne gulp build`
3. Note the version in the output directory (`dist/manifest.json`).
4. From the root directory run `zip -r releases/version-one-shot-0.0.5.zip dist`.
5. Upload the result to the Chrome Web Store Developer Dashboard.
