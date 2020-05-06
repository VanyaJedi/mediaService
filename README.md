# mediaService
Simplify using mediaQueryList on project

## Installing

npm i jedi-mediaservice

## Usage

Function constructor MediaService getting as input array of objects with 2 properites 'key' and 'matchMedia' where key is a screenType and matchMedia is a media query, for example

```
import MediaService from "jedi-mediaservice";

const settings = [
    {
        key: 'mobile',
        matchMedia: '(max-width: 767px)'
    },
    {
        key: 'tablet',
        matchMedia: '(min-width: 768px)'
    },
    {
        key: 'desktop',
        matchMedia: '(min-width: 1440px)'
    }
]

const mediaService = new MediaService(settings);
```

both of properties must be not null and string



We can add new pairs of key and matchMedia via 'addMatchMedia' method and remove pair with method 'removeMatchMedia'

```
mediaService.addMatchMedia('mobileTablet', '(max-width: 1439px)');
mediaService.removeMatchMedia('mobileTablet');

```

For each setting item is a listener with name - 'mql' + key with whose help we can check current screen;

```
mediaService.addMatchMedia('mobileTablet', '(max-width: 1439px)');
const isMobileTabletScreen = mediaService.mqlmobileTablet.matches;
```


Then we can subscribe some procedures for every screen via method subscribe with 4 parametres: id, screenType (key from settings) and 2 functions, first when matchmedia true and second wheh matchmedia false

```

const whenScreenIsMobile = () => {
    console.log('add mobile menu functional');
}

const whenScreenIsNotMobile = () => {
    console.log('remove mobile menu functional');
}

mediaService.subscribe('mobileMenu', 'mobile', whenScreenIsMobile, whenScreenIsNotMobile)

```

So now our mediaService listening changing screen size and execute functions we passed in method 'subscribe'.

We can unsubscribe this procedures by id

```

mediaService.unsubscribe('mobileMenu');

```
