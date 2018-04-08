(function () {
    angular.module('app.base', ['ngRoute']);
    angular.module('app.common', []);
    angular.module('alerts', ['ui.bootstrap', 'ngAnimate', 'toaster']);
    ﻿angular.module('app.constants', []);

    angular.module('account', ['alerts']);
    angular.module('favorites', ['alerts']);
    angular.module('company', ['alerts']);
    angular.module('project', ['alerts']);
    ﻿angular.module('team', ['alerts']);

    angular.module('release', ['alerts']);
    angular.module('favorites', ['alerts']);

    angular.module('navigation', ['alerts']);
    ﻿angular.module('wizard', []);
    ﻿angular.module('notifications', []);
    ﻿angular.module('search', []);
})();
