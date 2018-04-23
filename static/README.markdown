## Where is the media?

If you are looking for the media, it is not here. To de-dupe the media from the repository I did the following -

* put all the images in static/media/
* setup .gitignore to ignore the static/media/
* built Hugo site so the static/media/ got copied to the site's build directory, which in this case is the docs/

This setup works fine as I have a local copy of the media/ in the static directory. If you are cloning this repository, you must make sure that the docs/media/ gets copied or moved to the static directory.

```bash
git clone https://github.com/lobopraveen/praveenlobo.com.git
cd praveenlobo.com
cp -r docs/media static/media
```
