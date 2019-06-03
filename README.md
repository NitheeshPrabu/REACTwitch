# REACTwitch
A React based application from setting up RTMP based stream from your computer. Needs installation of some broadcasting system (preferably OBS) which is not part of this repo.

The app itself comprises of 3 parts - the `client` side code to render the streams, the `streamlist-server` which helps manage the list of stream servers currently up, and the `rtmp-server` which is used to stream the broadcasted content onto the browser.

You can find the `streamlist-server` and `rtmp-server` under the `client/src/components` directory.

## Setting up the environment
Make sure you have npm installed in your system. Install dependencies by going into the folders mentioned above and running:

```bash
npm install
```

## To run the project
Clone the repo. You need to start the client and the two content servers to run the application. To do that, open your terminal and run `npm start` in each of the folders mentioned above.

**NOTE:** Requires the installation of an OBS and proper configuration of the [RTMP server](https://github.com/illuspas/Node-Media-Server).