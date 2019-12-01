#16Lynx

**Project Blog Post:** [im663.com](https://im663.com/projects/16Lynx)

**Live site:** [16chan.xyz](https://16chan.xyz)

16Lynx is the offical frontend for both [16chan.xyz](https://16chan.xyz) as well as
[formerlychucks.com](https://formerlychucks.com/), this project was initially a fork of the
default frontend provided by the LynxChan projected called
[PenumbraLynx](https://formerlychucks.com/). PenumbraLynx, although extemely functional,
lightweight, and somewhat feature heavy lacked many of the core
features that I wanted to provide for my community, as well as
features that I would consider essentially, such as catalog
sorting.

## Features
*16Lynx features several additions to PenumbraLynx, such as:*
  - 3 additional themes (Yotsuba, Yotsuba B, and Warosu)
  - Additional embedding support for BitChute and Invidio.
  - A default theme built off of the commonly used 'Tomorrow'
    theme. (This theme is slightly different for Formerly Chuck's as it
    features more of a Simpsons twist).
  - An additional file in `~/static/` that acts as a board directory
    for DashChan which allows for DashChan support.
  - Announcements, nav, and footer information is globally pulled
    from template pages making management of said content extremely
    easy to manage for when new information is to be added.
  - Catalog sorting options by: bump order, last reply, creation date,
    and reply count.
  - Clipboard paste support for several image formats
  - Several utility features:
    - reclicking floating menu buttons such as Side Catalog,
      Settings, and Watching will result in closing the window).
    - Additonal top and bottom navigation controls on `board.html`,
      `thread.html`, and `catalog.html`.
    - Reformatting of `boards.html` and `archive.html`, making
      these pages significantly more readable and usable.

## Setting a favicon
The favicon in the static directory is served from mongo and will need to be uploaded into MongoDB manually. To do this you need to get the
mongofiles tool and run:
``` 
mongofiles -h localhost -d lynxchan -l {/path/to/yourfavicon/favicon.ico} put /favicon.ico
```
When setting the directory of the favicon do not include the braces (`{`,`}`).

## Questions?
If you have any additional questions feel free to email me at: admin@16chan.xyz