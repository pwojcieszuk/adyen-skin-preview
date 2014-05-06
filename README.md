#A simple tool to work with adyen skins


## How it works:

1. Fork the repo, run `npm install`
2. Copy your unzipped skin (generated in Adyen service admin panel) files into views/skin directory 
3. run `node app`
4. You can now work on the skin elements, preview of your skin is available on [http://0.0.0.0:3000](http://0.0.0.0:3000)
5. When happy with result, archive your skin folder and upload it to Adyen. **Make sure root folder inside of the archive is the same as skin name**, e.g. if you skin called MzBvaf3f, your archive structure should be 
```
    MzBvaf3f
        css
        img
        ...
```
6. In Adyen control panel:

    1. Configure "Result URL" (admin.[yourhost]/adyen/callbacks/back/)
    2. Configure "HMAC Key" (`dowant.conf.adyen.secret` in public-config)
    3. Make sure `dowant.conf.adyen.merchant matches` the environment
    4. Choose language via "Edit language files"

In a nutshell, Adyen skin consists of index.html file which cannot be changed, the customisation is provided by changing CSS, images and partials.   

Consult [Adyen materials](https://www.adyen.com/dam/documentation/manuals/SkinManual.pdf) for some more info on skin structure.

##Notes:

+ Skin files are not part of this repo - remember to save them somewhere, or you might lose your work.
