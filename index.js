'use strict';
// This is the random seeding script used by Orteil.
(function (a, b, c, d, e, f) {
  function k(a) {
    var b,
      c = a.length,
      e = this,
      f = 0,
      g = (e.i = e.j = 0),
      h = (e.S = []);
    for (c || (a = [c++]); d > f; ) h[f] = f++;
    for (f = 0; d > f; f++)
      ((h[f] = h[(g = j & (g + a[f % c] + (b = h[f])))]), (h[g] = b));
    (e.g = function (a) {
      for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--; )
        ((b = h[(f = j & (f + 1))]),
          (c = c * d + h[j & ((h[f] = h[(g = j & (g + b))]) + (h[g] = b))]));
      return ((e.i = f), (e.j = g), c);
    })(d);
  }

  function l(a, b) {
    var e,
      c = [],
      d = (typeof a)[0];
    if (b && 'o' == d)
      for (e in a)
        try {
          c.push(l(a[e], b - 1));
        } catch (f) {}
    return (
      c.length ? c
      : 's' == d ? a
      : a + '\0'
    );
  }

  function m(a, b) {
    for (var d, c = a + '', e = 0; c.length > e; )
      b[j & e] = j & ((d ^= 19 * b[j & e]) + c.charCodeAt(e++));
    return o(b);
  }

  function n(c) {
    try {
      return (a.crypto.getRandomValues((c = new Uint8Array(d))), o(c));
    } catch (e) {
      return [+new Date(), a, a.navigator.plugins, a.screen, o(b)];
    }
  }

  function o(a) {
    return String.fromCharCode.apply(0, a);
  }

  var g = c.pow(d, e),
    h = c.pow(2, f),
    i = 2 * h,
    j = d - 1;
  ((c.seedrandom = function (a, f) {
    var j = [],
      p = m(
        l(
          f ? [a, o(b)]
          : 0 in arguments ? a
          : n(),
          3
        ),
        j
      ),
      q = new k(j);
    return (
      m(o(q.S), b),
      (c.random = function () {
        for (var a = q.g(e), b = g, c = 0; h > a; )
          ((a = (a + c) * d), (b *= d), (c = q.g(1)));
        for (; a >= i; ) ((a /= 2), (b /= 2), (c >>>= 1));
        return (a + c) / b;
      }),
      p
    );
  }),
    m(c.random(), b));
})(this, [], Math, 256, 6, 52);

function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

class LocalStorageManager {
  constructor(key, configs) {
    this.key = key;
    this.always = configs.always ?? (() => {});
    this.firstLoad = configs.firstLoad ?? (() => {});
    this.loadFunc = configs.load ?? (() => {});
    if (configs.save) {
      this.saveFunc = configs.save;
    } else {
      this.saveFunc = null;
    }
  }

  static all = {};
  static register(manager) {
    this.all[manager.key] = manager;
    return manager;
  }
  static get(name) {
    return this.all[name] ?? null;
  }

  save() {
    if (this.saveFunc && localStorage?.setItem) {
      localStorage.setItem(this.key, JSON.stringify(this.saveFunc()));
    }
  }
  load() {
    if (this.loadFunc && localStorage?.getItem) {
      const result = localStorage.getItem(this.key);
      if (!result) {
        this.firstLoad();
        this.always();
        return;
      }
      this.always();
      this.loadFunc(JSON.parse(result));
    }
  }
  static loadAll() {
    for (let i in this.all) {
      this.all[i].load();
    }
  }
}

var app = angular.module('myApp', [
  'ngMaterial',
  'colorPicker',
  'dndLists',
  '720kb.tooltips'
]);

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('normal');
  $mdThemingProvider.theme('dark').dark();
});

app.controller('myCtrl', function ($scope) {
  $scope.advancedFeatures = false;
  $scope.unifiedGuideIsOpen = false;
  $scope.visualOptionsShowing = false;

  $scope.seed = '';
  $scope.hasSeed = true;
  $scope.ascensionMode = 0;
  $scope.spellsCastTotal = 0;
  $scope.spellsCastThisAscension = 0;
  $scope.dragonflight = false;
  $scope.supremeintellect = false;
  $scope.diminishineptitude = false;
  $scope.on_screen_cookies = 0;
  $scope.min_combo_length = 2;
  $scope.max_combo_length = 4;
  $scope.max_spread = 2;
  //$scope.save_string = "Mi4wMTl8fDE1NTcwMjQwMjkzMjQ7MTUyNTU2Mzg4NjQ5ODsxNTU3MDI2MDY3NTI2O1ByZXR0eSBCaXNjdWl0O2ljb2NkfDExMTExMTExMTAwMTAwMTAwMDAxMHwzMTcyOTc5ODU2ODk2MS4wNzsyNDk5OTU5MzQxMDEyOTYuNjszNTE0OzgzMzc7Nzc3NzExMzQ3NDEzMDIuMjc7NzI2ODU7MDszOzEuNjMwODE0MDg0NjAwMTQxOGUrMTAxOzA7MDswOzA7MDsxMDg7MTE7MDswOzExOzE7MjU4MzAzNjsxO2NocmlzdG1hczswOzA7NS40NjM0NjQ4MjMyNzM2MjRlKzI5OzUuNDYzNDY0ODIzMjczNjI0ZSsyOTsxMDM0OTI0NTIwNTExOzA7MDsyMjY7MjI4OzIyMzsyMjI7MjI1OzU7MTswOzE7MTAwOzA7MDsxODk7NDY3OzE1NTcwMjM1NTE1NDY7MTU1Njk5MjAzMDQ0ODswOzEyOSwyMjc7NDA7fDE2MCwxNjAsMTg0MDI4NTc4NDIyMCwxLCwwOzE1MCwxNTAsNzE2NTA1ODQ0NTcwLDEsLDA7MTAwLDIxMCwyODczMDgyMzkzMyw5LDE1NTcwMjYyODY2MDQ6MDoxNTU3MDI0MDI5MzMxOjA6MDozNzM5OjE6MToxNTU3MDI0MDI5MzMxOiAxMTExMTAxMDExMTExMTAwMDAwMDEwMTEwMDAwMDAwMTAwIDA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOjA6MDowOiwwOzEwMCwyMDAsODg2MTIxODQ2MDMsMSwsMDsxMDAsMTgwLDE5NjIxNTUxOTQzMSwxLCwwOzgwLDE1MCw3MzUxMjI3MzcxNzcsMSwsMDs1MCw1MCwxNzUzMjgyNjI2MDA4LDEsMi8tMS8tMSAyIDE1NTcwMjU5NTgwMzQgMSwwOzUwLDUxLDY5OTUwMzAwMjc2NTksMSwzNiAwIDM1NTUgMSwwOzMwLDMwLDE5Njg2NTA3NjkzNjA0LDEsLDA7MTUsMTUsMjE5ODQxODMyNjA2NDIsMSwsMDsxMCwxMCwyMzI3OTQ1NzQyMDkyOCwxLCwwOzUsNSw1OTkyOTYzODI0OTY5OSwyLCwwOzAsMCwwLDQsLDA7MCwwLDAsMTAsLDA7MCwwLDAsNCwsMDswLDAsMCwxMCwsMDt8MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAxMDEwMDAxMDEwMDAxMTExMTExMTExMTExMTExMTExMTExMTEwMDExMTExMTExMDAwMDAwMDAxMTExMTAxMTExMTExMTExMTExMTAwMDAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTEwMDExMTEwMDAwMDAwMDExMDAxMTExMTAwMDEwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTAxMDEwMTAwMDExMTExMTExMDAwMDAwMDAwMDExMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDExMDAxMTAwMTEwMDExMTExMTExMTEwMDAwMDAwMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTAxMDEwMDAxMDAwMDAxMDAwMTEwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDEwMTEwMDAwMDAxMTAwMDAwMDAwMDAwMDAwMTExMTAwMTExMTAwMTEwMDAwMDAxMTExMTExMTAwMDAxMTExMTExMTAwMDAxMTExMTExMDAwMDAxMTExMTExMTExMTEwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTAxMDExMTExMTExMTExMTExMDAxMDAwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMTExMTExMTExMTExMTExMDExMTExMTExMDAwMDExMDAwMDEwMDAwMDAwMDAxMDAwMDAxMDAwMTAwMDEwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMDAwMDAwMDAwMDAwMDExMTExMTEwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDEwMTAxMDEwMTAxMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMTExMTAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTEwMDExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTEwMTEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExMXwxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTEwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDExMTEwMTExMTExMTExMTEwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMDExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExfA%3D%3D%21END%21%3D%3D%21END%21"
  $scope.save_string = '';
  $scope.lookahead = 200;
  $scope.level = 200;
  $scope.wantedBS = 200;
  $scope.magic = 999;
  $scope.max_magic = 999;
  $scope.config = '';
  // Preset decent strategies; TODO
  // $scope.possibleStrats = [null, "522fthof 52di/F 22fthof R+522fthof 22fthof\r\n522fthof 52F/hc 22fthof R+522di/hc 322fthof 22fthof", "547fthof 47di/F 27fthof R+547 47\r\n547fthof 47F/hc 27fthof, 547di/hc, 347fthof, 27fthof\r\n547fthof, 47di/F, 27fthof, R+517st, 317fthof, 17fthof\r\n547fthof, 47F/gfd, R+547di/hc, 327fthof, 27fthof"]

  $scope.load_more = function () {
    $scope.lookahead += 50;
    $scope.update_cookies();
  };

  $scope.cast_spell = function () {
    $scope.spellsCastThisAscension++;
    $scope.spellsCastTotal++;
    $scope.update_cookies();
  };

  // $scope.get_data = function () {
  // 	var cookies = []
  // 	var randomSeeds = [];
  // 	$scope.baseBackfireChance = 0.15 * ($scope.supremeintellect ? 1.1 : 1) * ($scope.diminishineptitude ? 0.1 : 1);
  // 	$scope.backfireChance = $scope.baseBackfireChance + 0.15 * $scope.on_screen_cookies;
  // 	var bsIndices = [];
  // 	var skipIndices = [];
  // 	var currentTime = Date.now();
  // 	for (var i = 0; i < $scope.lookahead; i++) {
  // 		var currentSpell = i + $scope.spellsCastTotal;
  // 		Math.seedrandom($scope.seed + '/' + currentSpell);
  // 		var roll = Math.random();
  // 		randomSeeds.push(roll);

  // 		var c = []
  // 		cookie1Success = check_cookies($scope.spellsCastTotal + i, 0, true)
  // 		cookie2Success = check_cookies($scope.spellsCastTotal + i, 1, true)
  // 		//cookie3 = check_cookies($scope.spellsCastTotal + i, 1)
  // 		cookie1Backfire = check_cookies($scope.spellsCastTotal + i, 0, false)
  // 		cookie2Backfire = check_cookies($scope.spellsCastTotal + i, 1, false)
  // 		var gambler = check_gambler($scope.spellsCastTotal + i)
  // 		c.push(cookie1Success)
  // 		c.push(cookie2Success)
  // 		c.push(cookie1Backfire)
  // 		c.push(cookie2Backfire)
  // 		c.push(gambler)
  // 		cookies.push(c)

  // 		if (cookiesContainBuffs($scope.include_ef_in_sequence, cookie1Success, cookie2Success, cookie1Backfire, cookie2Backfire) || gambler.hasBs || ($scope.include_ef_in_sequence && gambler.hasEf)) {
  // 			bsIndices.push(i);
  // 		}

  // 		if (($scope.skip_abominations && gambler.type == 'Resurrect Abomination') || ($scope.skip_edifices && gambler.type == 'Spontaneous Edifice' && !gambler.backfire)) {
  // 			skipIndices.push(i);
  // 		}

  // 		var arr = [];
  // 		if (randomSeeds[i] + $scope.backfireChance < 1) {
  // 			arr.push(c[0]);
  // 			arr.push(c[1]);
  // 			if (c[2].type == "Elder Frenzy") { arr[0].type += " (EF)"; arr[0].noteworthy = true; }
  // 			if (c[3].type == "Elder Frenzy") { arr[1].type += " (EF)"; arr[1].noteworthy = true; }
  // 			if (c[2].type == "Free Sugar Lump") { arr[0].type += " (Lump)"; }
  // 			if (c[3].type == "Free Sugar Lump") { arr[1].type += " (Lump)"; }
  // 		}
  // 		else {
  // 			arr.push(c[2]);
  // 			arr.push(c[3]);
  // 			if (c[0].type == "Building Special") { arr[0].type += " (BS)"; arr[0].noteworthy = true; }
  // 			if (c[1].type == "Building Special") { arr[1].type += " (BS)"; arr[1].noteworthy = true; }
  // 			if (c[0].type == "Free Sugar Lump") { arr[0].type += " (Lump)"; }
  // 			if (c[1].type == "Free Sugar Lump") { arr[1].type += " (Lump)"; }
  // 		}
  // 		arr.push(gambler);
  // 	}
  // 	return cookies;
  // }

  // $scope.calculate_combos = function () {
  // 	var data = $scope.get_data()
  // 	console.info("Raw data: ", data)
  // 	delete $scope.combos
  // }

  $scope.guideHidingStatuses = new Array(5).fill(false);

  $scope.load_game = function (str, fromURL) {
    if (!str) {
      str = $scope.save_string;
    }
    str = str.trim();
    $scope.hasSeed = true;
    if (str.length === 5) {
      $scope.seed = str;
      if (!fromURL)
        $scope.spellsCastTotal = Number(prompt('Total spells cast?'));
      if (!isFinite($scope.spellsCastTotal)) $scope.spellsCastTotal = 0;
      $scope.spellsCastThisAscension = $scope.spellsCastTotal;
      $scope.update_cookies();
      return;
    }
    var str = str.split('!END!')[0];
    str = Base64.decode(str);
    str = str.split('|');
    var spl = str[2].split(';');
    $scope.seed = spl[4];
    console.log('Seed: ' + $scope.seed);

    spl = str[4].split(';');
    $scope.ascensionMode = parseInt(spl[29]);
    console.log(spl);
    spl = str[5].split(';');
    console.log(spl[7]);

    $scope.spellsCastTotal = parseInt(spl[7].split(' ')[2]) || 0;
    console.log('Total spells cast: ' + $scope.spellsCastTotal);

    $scope.spellsCastThisAscension = parseInt(spl[7].split(' ')[1]) || 0;
    console.log(
      'Spells cast this ascension: ' + $scope.spellsCastThisAscension
    );

    $scope.update_cookies();
  };

  class CastRow {
    constructor(
      noChangeSuccess,
      noChangeBackfire,
      changeSuccess,
      changeBackfire,
      firstCall,
      index
    ) {
      this.firstCall = firstCall;
      this.firstCall.setParent(this);
      this.noChangeSuccess = noChangeSuccess;
      this.noChangeBackfire = noChangeBackfire;
      this.changeSuccess = changeSuccess;
      this.changeBackfire = changeBackfire;
      this.index = index;
    }

    getCast(change, backfireChance = $scope.baseBackfireChance) {
      return change ?
          this.getCastChange(backfireChance)
        : this.getCastNoChange(backfireChance);
    }
    getOtherCast(change, backfireChance = $scope.baseBackfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1 ? 0 : 1;
      return change ?
          this.getCastChange(backfiring)
        : this.getCastNoChange(backfiring);
    }
    getCastNoChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      return backfiring ? this.noChangeBackfire : this.noChangeSuccess;
    }
    getCastChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      return backfiring ? this.changeBackfire : this.changeSuccess;
    }

    backfiring(backfireChance = $scope.baseBackfireChance) {
      return backfireChance + this.firstCall.value >= 1;
    }

    stringify(change, backfireChance = $scope.baseBackfireChance) {
      return change ?
          this.stringifyChange(backfireChance)
        : this.stringifyNoChange(backfireChance);
    }
    postfix(change, backfireChance = $scope.baseBackfireChance) {
      return change ?
          this.postfixChange(backfireChance)
        : this.postfixNoChange(backfireChance);
    }
    stringifyNoChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.noChangeSuccess.name;
      } else {
        return this.noChangeBackfire.name;
      }
    }
    postfixNoChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.noChangeSuccess.settings.hiddenIndicator ?
            ` (${this.noChangeSuccess.shorthand})`
          : ``;
      } else {
        return this.noChangeBackfire.settings.hiddenIndicator ?
            ` (${this.noChangeBackfire.shorthand})`
          : ``;
      }
    }
    stringifyChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.changeSuccess.name;
      } else {
        return this.changeBackfire.name;
      }
    }
    postfixChange(backfireChance) {
      const backfiring = backfireChance + this.firstCall.value >= 1;
      if (!backfiring) {
        return this.changeSuccess.settings.hiddenIndicator ?
            ` (${this.changeSuccess.shorthand})`
          : ``;
      } else {
        return this.changeBackfire.settings.hiddenIndicator ?
            ` (${this.changeBackfire.shorthand})`
          : ``;
      }
    }

    parseHighlights() {
      this.firstCall.setHighlights(this);
      this.noChangeSuccess.setHighlights(this);
      this.noChangeBackfire.setHighlights(this);
      this.changeSuccess.setHighlights(this);
      this.changeBackfire.setHighlights(this);
    }
  }
  $scope.access_cookie = function (row) {
    return $scope.cookies[row];
  };
  $scope.update_cookies = function () {
    $scope.cookies = [];
    $scope.randomSeeds = [];
    $scope.baseBackfireChance =
      0.15 *
      ($scope.supremeintellect ? 1.1 : 1) *
      ($scope.diminishineptitude ? 0.1 : 1);
    $scope.backfireChance =
      $scope.baseBackfireChance + 0.15 * $scope.on_screen_cookies;
    $scope.displayCookies = [];
    var bsIndices = [];
    var skipIndices = [];
    var currentTime = Date.now();
    for (var i = 0; i < $scope.lookahead; i++) {
      var currentSpell = i + $scope.spellsCastTotal;
      Math.seedrandom($scope.seed + '/' + currentSpell);
      const allSpells = new Array(10);
      for (let ii = 0; ii < 10; ii++) {
        allSpells[ii] = Math.random();
      }

      var cookie1Success = check_cookies(allSpells, 0, true);
      var cookie2Success = check_cookies(allSpells, 1, true);
      //cookie3 = check_cookies(allSpells, '', true)
      var cookie1Backfire = check_cookies(allSpells, 0, false);
      var cookie2Backfire = check_cookies(allSpells, 1, false);
      var gambler = check_first_call(allSpells);
      const c = new CastRow(
        cookie1Success,
        cookie1Backfire,
        cookie2Success,
        cookie2Backfire,
        gambler,
        $scope.cookies.length
      );
      $scope.cookies.push(c);

      if (
        cookiesContainBuffs(
          $scope.include_ef_in_sequence,
          cookie1Success,
          cookie2Success,
          cookie1Backfire,
          cookie2Backfire
        ) ||
        gambler.hasBs ||
        ($scope.include_ef_in_sequence && gambler.hasEf)
      ) {
        bsIndices.push(i);
      }

      if (
        ($scope.skip_abominations && gambler.type == 'Resurrect Abomination') ||
        ($scope.skip_edifices &&
          gambler.type == 'Spontaneous Edifice' &&
          !gambler.backfire)
      ) {
        skipIndices.push(i);
      }

      continue;
      var arr = [];
      if ($scope.randomSeeds[i] + $scope.backfireChance < 1) {
        arr.push(c[0]);
        arr.push(c[1]);
        if (c[2].type == 'Elder Frenzy') {
          arr[0].type += ' (EF)';
          arr[0].noteworthy = true;
        }
        if (c[3].type == 'Elder Frenzy') {
          arr[1].type += ' (EF)';
          arr[1].noteworthy = true;
        }
        if (c[2].type == 'Free Sugar Lump') {
          arr[0].type += ' (Lump)';
        }
        if (c[3].type == 'Free Sugar Lump') {
          arr[1].type += ' (Lump)';
        }
      } else {
        arr.push(c[2]);
        arr.push(c[3]);
        if (c[0].type == 'Building Special') {
          arr[0].type += ' (BS)';
          arr[0].noteworthy = true;
        }
        if (c[1].type == 'Building Special') {
          arr[1].type += ' (BS)';
          arr[1].noteworthy = true;
        }
        if (c[0].type == 'Free Sugar Lump') {
          arr[0].type += ' (Lump)';
        }
        if (c[1].type == 'Free Sugar Lump') {
          arr[1].type += ' (Lump)';
        }
      }
      arr.push(gambler);
      $scope.displayCookies.push(arr);
    }
    for (let i in $scope.cookies) {
      $scope.cookies[i].parseHighlights();
    }
    console.log($scope.cookies);
    console.log(bsIndices);
    console.log(skipIndices);

    $scope.combos = {};

    for (
      var combo_length = $scope.min_combo_length;
      combo_length <= $scope.max_combo_length;
      combo_length++
    ) {
      $scope.combos[combo_length] = findCombos(
        combo_length,
        $scope.max_spread,
        bsIndices,
        skipIndices
      );
    }

    console.log('Combos: ');
    console.log($scope.combos);
    console.log(Date.now() - currentTime);
  };

  $scope.collapse_interface = function (contentId) {
    console.log('content-' + contentId);
    if (contentId) {
      var content = document.getElementById('content-' + contentId);
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    }
  };

  //want to return shortest, and first sequence for a given combo_length
  //if nothing that satisfies max_spread, shortest will still be filled but first will be empty
  $scope.comboFinder = false;
  function findCombos(combo_length, max_spread, bsIndices, skipIndices) {
    let shortestDistance = 10000000;
    let shortestStart = -1;

    let firstDistance = 10000000;
    let firstStart = -1;

    for (var i = 0; i + combo_length <= bsIndices.length; i++) {
      let seqStart = bsIndices[i];
      let seqEnd = bsIndices[i + combo_length - 1];
      let baseDistance = seqEnd - seqStart + 1;

      let skips = skipIndices.filter(
        (idx) => idx > seqStart && idx < seqEnd && !bsIndices.includes(idx)
      );

      let distance = baseDistance - skips.length;
      if (firstStart == -1 && distance <= combo_length + max_spread) {
        firstStart = seqStart;
        firstDistance = distance;
      }

      if (distance < shortestDistance) {
        shortestStart = seqStart;
        shortestDistance = distance;
      }
    }

    return {
      shortest: { idx: shortestStart, length: shortestDistance },
      first: { idx: firstStart, length: firstDistance }
    };
  }

  function cookiesContainBuffs(include_ef, ...cookies) {
    return cookies.some((cookie) => {
      return (
        cookie.type == 'Building Special' ||
        (include_ef && cookie.type == 'Elder Frenzy')
      );
    });
  }

  function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getSpellCost(spellName, costMult) {
    var spell = $scope.spells[spellName];
    var out = spell.costMin;
    if (spell.costPercent) out += $scope.max_magic * spell.costPercent;
    out *= Math.floor(1 - (costMult ?? 0.1 * $scope.supremeintellect));
    return out;
  }

  class FirstCallEntry {
    // GFD and backfiring shares the same RNG call, so we need to store them together
    constructor(GFDRS) {
      this.GFDRS = GFDRS;
    }
    parent = null;
    setParent(parent) {
      this.parent = parent;
    }

    get value() {
      return this.GFDRS;
    }

    backfires(backfireChance = $scope.baseBackfireChance) {
      return this.value + backfireChance >= 1;
    }

    /**
     * @private
     * @param {*} magic
     * @param {*} maxMagic
     * @param {*} costMult
     */
    GFDOutcome(
      magic = $scope.magic,
      maxMagic = $scope.max_magic,
      costMult = 1 - $scope.supremeintellect * 0.1
    ) {
      const selfCost = getSpellCost("gambler's fever dream", costMult);
      if (magic < selfCost) {
        return null;
      }
      let pool = [];
      for (let i in $scope.spells) {
        const spell = $scope.spells[i];
        const cost =
          0.5 *
            Math.floor(
              costMult * (spell.costMin + spell.costPercent * maxMagic)
            ) +
          selfCost;
        if (cost <= magic) {
          pool.push(spell);
        }
      }

      if (pool.length === 0) {
        return null;
      }

      const selectedIndex = Math.floor(this.value * pool.length);
      return pool[selectedIndex];
    }

    GFDOutcomeText(magic, maxMagic, costMult) {
      return (
        this.GFDOutcome(magic, maxMagic, costMult)?.name ?? 'Not enough mana'
      );
    }

    GFDOutcomeIcon(backfires, magic, maxMagic, costMult) {
      const outcome = this.GFDOutcome(magic, maxMagic, costMult);
      if (!outcome) {
        return 'img/img9.png';
      }
      if (!backfires) {
        if (outcome === $scope.spells['hand of fate']) {
          return 'img/img8.png';
        }
        return 'img/img10.png';
      } else {
        if (outcome === $scope.spells['hand of fate']) {
          return 'img/img9.png';
        }
        return 'img/img11.png';
      }
    }

    onHover(relevantRow) {
      // Show possible outcomes, if it is a FtHoF
      if (this.GFDOutcome() === $scope.spells['hand of fate']) {
        // Show possible outcomes
        /**
         * @type {CastRow}
         */
        const castRow = relevantRow;
        return (
          castRow.stringifyNoChange($scope.baseBackfireChance) +
          '; ' +
          castRow.stringifyChange($scope.baseBackfireChance)
        );
      }
      return this.GFDOutcomeText();
    }

    highlightsCSS = '';
    highlights = [];
    setHighlights(castRow, allRows = $scope.cookies) {
      this.highlights = computeHighlights(this, castRow, allRows);
      this.highlightsCSS = generateEqualSplitGradient(this.highlights);
    }
    getHighlightColor() {
      return { backgroundImage: this.highlightsCSS };
    }
  }
  function check_first_call(calls) {
    return new FirstCallEntry(calls[0]);
  }
  $scope.getMarginDividers = function () {
    return `<md-divider class="margined"></md-divider>`;
  };
  $scope.getFooter = function (innerHTML) {
    return `<small class="footer">${innerHTML}</small>`;
  };
  $scope.hideTooltips = false;
  $scope.shiftEventListenerCheck = (e) => {
    $scope.hideTooltips = e.shiftKey;
    document.documentElement.style.setProperty(
      '--cast-tooltip-style',
      $scope.hideTooltips ? 'none' : 'block'
    );
    console.log(e.shiftKey, $scope.hideTooltips);
  };
  document.addEventListener('keydown', $scope.shiftEventListenerCheck);
  document.addEventListener('keyup', $scope.shiftEventListenerCheck);

  // In your controller/directive
  angular.element(window).on('resize', function () {
    // Force a digest cycle
    $scope.$applyAsync(function () {
      // Trigger a fake click or reflow
      return;
      var buttons = document.querySelectorAll('.cast-tooltip');
      console.log(buttons);
      buttons.forEach(function (btn) {
        // Method 1: Force browser reflow
        void btn.offsetHeight;

        // Method 2: Trigger library's internal update if accessible
        if (angular.element(btn).controller) {
          // Some libraries expose update methods
          angular.element(btn).controller().updateLayout();
        }
      });
    });

    // Fallback: delay to let browser finish resize
    setTimeout(function () {
      $scope.$applyAsync();
    }, 50);
  });

  class EffectEntry {
    // Interface
    static _name = 'Unknown effect';
    static _description = 'Unknown description';
    static _customIcon = '';
    static _shorthand = '';
    static _aliases = new Set();
    static _settings = {
      // Customized by user
      hiddenIndicator: false, // Whether to show its shorthand if it is inaccessible due to incorrect backfiring status
      underlined: false // Whether to underline the buff OR the shorthand (if shown)
    };
    constructor() {}

    get name() {
      return this.constructor._name;
    }
    get description() {
      return this.constructor._description;
    }
    get icon() {
      return $scope.change_icons ? this.constructor._customIcon : null;
    }
    get shorthand() {
      return this.constructor._shorthand;
    }
    get aliases() {
      return this.constructor._aliases;
    }
    get settings() {
      return this.constructor._settings;
    }
    getIcon(backfiring) {
      if (!backfiring) {
        return this.icon ?? 'img/GoldCookie.png';
      } else {
        return this.icon ?? 'img/WrathCookie.png';
      }
    }
    is(thing) {
      return this instanceof thing || this.aliases.has(thing);
    }

    toString(withHighlights) {
      if (withHighlights) {
        return (
          '<span style="background-image: ' +
          this.highlightsCSS +
          '">' +
          this.name +
          '</span>'
        );
      }
      return this.name;
    }

    getTooltip() {
      return `
        <small>${this.description}</small>
      `;
    }
    getSecondaryTooltip() {
      return `

      `;
    }

    highlightsCSS = '';
    highlights = [];
    setHighlights(castRow, allRows = $scope.cookies) {
      this.highlights = computeHighlights(this, castRow, allRows);
      this.highlightsCSS = generateEqualSplitGradient(this.highlights);
    }
    getHighlightColor() {
      return { backgroundImage: this.highlightsCSS };
    }
  }
  const allEffects = {};
  class EffectEntryFactory {
    static create(fromConfigs) {
      const Effect = class extends EffectEntry {
        static _name = fromConfigs.name;
        static _description = fromConfigs.description ?? '???';
        static _customIcon = fromConfigs.icon ?? 'img/GoldCookie.png';
        static _shorthand =
          fromConfigs.shorthand ?? fromConfigs.name.toUpperCase();
        static _aliases = new Set(
          fromConfigs.aliases.concat(fromConfigs.name.toLowerCase()) ?? [
            fromConfigs.name.toLowerCase()
          ]
        );
        static _settings = Object.create(fromConfigs.settings ?? {});
        constructor(...args) {
          super();
          if (args.length < (fromConfigs.requiredArgsCount ?? 0)) {
            throw new Error(
              'Missing arguments for effect entry ' + fromConfigs.name
            );
          }
          if (fromConfigs.constructor) {
            fromConfigs.constructor.apply(this, args);
          }
        }
      };
      return Effect;
    }
  }
  allEffects['Frenzy'] = EffectEntryFactory.create({
    name: 'Frenzy',
    description: 'Gives x7 cookie production for 77 seconds.',
    icon: 'img/img4.png',
    shorthand: 'F',
    aliases: ['f']
  });
  allEffects['Lucky'] = EffectEntryFactory.create({
    name: 'Lucky',
    description:
      'Gain 13 cookies, plus the lesser of 15% of bank or 15 minutes of production.',
    icon: 'img/img5.png',
    shorthand: 'L',
    aliases: ['l']
  });
  allEffects['Click Frenzy'] = EffectEntryFactory.create({
    name: 'Click Frenzy',
    description: 'Gives x777 cookies per click for 13 seconds.',
    icon: 'img/img3.png',
    shorthand: 'CF',
    aliases: ['cf']
  });
  allEffects['Blab'] = EffectEntryFactory.create({
    name: 'Blab',
    description: 'Does nothing but contains a funny message.',
    icon: 'img/img5.png',
    shorthand: 'BLAB',
    aliases: ['b']
  });
  allEffects['Cookie Storm'] = EffectEntryFactory.create({
    name: 'Cookie Storm',
    description:
      'Golden cookies fill the screen, each granting you 1 to 7 minutes worth of cookies.',
    icon: 'img/img6.png',
    shorthand: 'CS',
    aliases: ['cs', 'storm']
  });
  allEffects['Cookie Storm Drop'] = EffectEntryFactory.create({
    name: 'Cookie Storm Drop',
    description: 'Grants 1 to 7 minutes worth of production.',
    icon: 'img/img5.png',
    shorthand: 'CSD',
    aliases: ['csd', 'storm drop', 'drop', 'cs drop'],
    requiredArgsCount: 1,
    constructor(calls) {
      this.sizeMult = calls[9];
    }
  });
  allEffects['Building Special'] = EffectEntryFactory.create({
    name: 'Building Special',
    description: 'Get a variable bonus to cookie production for 30 seconds.',
    icon: 'img/img3.png',
    shorthand: 'BS',
    aliases: ['bs'],
    settings: {
      hiddenIndicator: true
    }
  });
  allEffects['Free Sugar Lump'] = EffectEntryFactory.create({
    name: 'Free Sugar Lump',
    description: 'Gives you a free sugar lump.',
    icon: 'img/img5.png',
    shorthand: 'LUMP',
    aliases: ['sweet', 'sweet!', 'lump', 'sugar lump']
  });
  allEffects['Clot'] = EffectEntryFactory.create({
    name: 'Clot',
    description: 'Reduce production by 50% for 66 seconds.',
    icon: 'img/img6.png',
    shorthand: 'CLOT',
    aliases: []
  });
  allEffects['Ruin'] = EffectEntryFactory.create({
    name: 'Ruin',
    description:
      'Lose 13 cookies plus the lesser of 5% of bank or 15 minutes of production.',
    icon: 'img/img5.png',
    shorthand: 'RUIN',
    aliases: []
  });
  allEffects['Cursed Finger'] = EffectEntryFactory.create({
    name: 'Cursed Finger',
    description:
      'Cookie production halted for 10 seconds, but each click is worth 10 seconds of production.',
    icon: 'img/img6.png',
    shorthand: 'CUF',
    aliases: ['cuf']
  });
  allEffects['Elder Frenzy'] = EffectEntryFactory.create({
    name: 'Elder Frenzy',
    description: 'Gives x666 cookie production for 6 seconds.',
    icon: 'img/img2.png',
    shorthand: 'EF',
    aliases: ['ef', 'elder', 'blood frenzy'],
    settings: {
      hiddenIndicator: true
    }
  });
  $scope.getEffectTooltip = function (cookie_list, change) {
    const cast = cookie_list;
    return ($scope.hide_effect_elaboration?'':cookie_list.getCast(change).getTooltip()
     + $scope.getMarginDividers())
      + (cookie_list.backfiring() ? 'If it does not backfire: ' : 'If it backfires: ')
       + '<b>' + cookie_list.getOtherCast(change).toString(true)
        + '</b>' + ($scope.hide_effect_elaboration?'':'<br>' + cookie_list.getOtherCast(change).getTooltip())
         + '<br>' + $scope.getFooter('Hold SHIFT to hide this menu.')
  }
  function check_cookies(calls, changes, forcedGold) {
    let n = 2 + changes;

    if (forcedGold) {
      let choices = [];
      choices.push(allEffects.Frenzy, allEffects.Lucky);
      if (!$scope.dragonflight) choices.push(allEffects['Click Frenzy']);
      if (calls[++n] < 0.1)
        choices.push(
          allEffects['Cookie Storm'],
          allEffects['Cookie Storm'],
          allEffects.Blab
        );
      if (calls[++n] < 0.25) choices.push(allEffects['Building Special']);
      if (calls[++n] < 0.15) choices = [allEffects['Cookie Storm Drop']];
      if (calls[++n] < 0.0001) choices.push(allEffects['Free Sugar Lump']);
      const type = choose(choices);
      return new type(calls);
    } else {
      let choices = [];
      choices.push(allEffects.Clot, allEffects.Ruin);
      if (Math.random() < 0.1)
        choices.push(allEffects['Cursed Finger'], allEffects['Elder Frenzy']);
      if (Math.random() < 0.003) choices.push(allEffects['Free Sugar Lump']);
      if (Math.random() < 0.1) choices = [allEffects.Blab];
      const type = choose(choices);
      return new type(calls);
    }
  }

  $scope.spells = {
    'conjure baked goods': {
      name: 'Conjure Baked Goods',
      desc: 'Summon half an hour worth of your CpS, capped at 15% of your cookies owned.',
      failDesc: 'Trigger a 15-minute clot and lose 15 minutes of CpS.',
      aliases: ['cbg'],
      icon: [21, 11],
      costMin: 2,
      costPercent: 0.4,
      win: function () {
        var val = Math.max(
          7,
          Math.min(Game.cookies * 0.15, Game.cookiesPs * 60 * 30)
        );
        Game.Earn(val);
        Game.Notify(
          'Conjure baked goods!',
          'You magic <b>' +
            Beautify(val) +
            ' cookie' +
            (val == 1 ? '' : 's') +
            '</b> out of thin air.',
          [21, 11],
          6
        );
        Game.Popup(
          '<div style="font-size:80%;">+' +
            Beautify(val) +
            ' cookie' +
            (val == 1 ? '' : 's') +
            '!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var buff = Game.gainBuff('clot', 60 * 15, 0.5);
        var val = Math.min(Game.cookies * 0.15, Game.cookiesPs * 60 * 15) + 13;
        val = Math.min(Game.cookies, val);
        Game.Spend(val);
        Game.Notify(buff.name, buff.desc, buff.icon, 6);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Summoning failed! Lost ' +
            Beautify(val) +
            ' cookie' +
            (val == 1 ? '' : 's') +
            '!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'hand of fate': {
      name: 'Force the Hand of Fate',
      desc: 'Summon a random golden cookie. Each existing golden cookie makes this spell +15% more likely to backfire.',
      failDesc: 'Summon an unlucky wrath cookie.',
      aliases: ['fthof'],
      icon: [22, 11],
      costMin: 10,
      costPercent: 0.6,
      failFunc: function (fail) {
        return fail + 0.15 * Game.shimmerTypes['golden'].n;
      },
      win: function () {
        var newShimmer = new Game.shimmer('golden', { noWrath: true });
        var choices = [];
        choices.push('frenzy', 'multiply cookies');
        if (!Game.hasBuff('Dragonflight')) choices.push('click frenzy');
        if (Math.random() < 0.1)
          choices.push('cookie storm', 'cookie storm', 'blab');
        if (Game.BuildingsOwned >= 10 && Math.random() < 0.25)
          choices.push('building special');
        //if (Math.random()<0.2) choices.push('clot','cursed finger','ruin cookies');
        if (Math.random() < 0.15) choices = ['cookie storm drop'];
        if (Math.random() < 0.0001) choices.push('free sugar lump');
        newShimmer.force = choose(choices);
        if (newShimmer.force == 'cookie storm drop') {
          newShimmer.sizeMult = Math.random() * 0.75 + 0.25;
        }
        Game.Popup(
          '<div style="font-size:80%;">Promising fate!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var newShimmer = new Game.shimmer('golden', { wrath: true });
        var choices = [];
        choices.push('clot', 'ruin cookies');
        if (Math.random() < 0.1) choices.push('cursed finger', 'blood frenzy');
        if (Math.random() < 0.003) choices.push('free sugar lump');
        if (Math.random() < 0.1) choices = ['blab'];
        newShimmer.force = choose(choices);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Sinister fate!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'stretch time': {
      name: 'Stretch Time',
      desc: 'All active buffs gain 10% more time (up to 5 more minutes).',
      failDesc:
        'All active buffs are shortened by 20% (up to 10 minutes shorter).',
      aliases: ['st'],
      icon: [23, 11],
      costMin: 8,
      costPercent: 0.2,
      win: function () {
        var changed = 0;
        for (var i in Game.buffs) {
          var me = Game.buffs[i];
          var gain = Math.min(Game.fps * 60 * 5, me.maxTime * 0.1);
          me.maxTime += gain;
          me.time += gain;
          changed++;
        }
        if (changed == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No buffs to alter!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Zap! Buffs lengthened.</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var changed = 0;
        for (var i in Game.buffs) {
          var me = Game.buffs[i];
          var loss = Math.min(Game.fps * 60 * 10, me.time * 0.2);
          me.time -= loss;
          me.time = Math.max(me.time, 0);
          changed++;
        }
        if (changed == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No buffs to alter!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Fizz! Buffs shortened.</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'spontaneous edifice': {
      name: 'Spontaneous Edifice',
      desc: 'The spell picks a random building you could afford if you had twice your current cookies, and gives it to you for free. The building selected must be under 400, and cannot be your most-built one (unless it is your only one).',
      failDesc: 'Lose a random building.',
      aliases: ['se'],
      icon: [24, 11],
      costMin: 20,
      costPercent: 0.75,
      win: function () {
        var buildings = [];
        var max = 0;
        var n = 0;
        for (var i in Game.Objects) {
          if (Game.Objects[i].amount > max) max = Game.Objects[i].amount;
          if (Game.Objects[i].amount > 0) n++;
        }
        for (var i in Game.Objects) {
          if (
            (Game.Objects[i].amount < max || n == 1) &&
            Game.Objects[i].getPrice() <= Game.cookies * 2 &&
            Game.Objects[i].amount < 400
          )
            buildings.push(Game.Objects[i]);
        }
        if (buildings.length == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No buildings to improve!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        var building = choose(buildings);
        building.buyFree(1);
        Game.Popup(
          '<div style="font-size:80%;">A new ' +
            building.single +
            '<br>bursts out of the ground.</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        if (Game.BuildingsOwned == 0) {
          Game.Popup(
            '<div style="font-size:80%;">Backfired, but no buildings to destroy!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        var buildings = [];
        for (var i in Game.Objects) {
          if (Game.Objects[i].amount > 0) buildings.push(Game.Objects[i]);
        }
        var building = choose(buildings);
        building.sacrifice(1);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>One of your ' +
            building.plural +
            '<br>disappears in a puff of smoke.</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    "haggler's charm": {
      name: "Haggler's Charm",
      desc: 'Upgrades are 2% cheaper for 1 minute.',
      failDesc:
        "Upgrades are 2% more expensive for an hour.<q>What's that spell? Loadsamoney!</q>",
      aliases: ['hc', 'hagglers', "haggler's"],
      icon: [25, 11],
      costMin: 10,
      costPercent: 0.1,
      win: function () {
        Game.killBuff("Haggler's misery");
        var buff = Game.gainBuff('haggler luck', 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Upgrades are cheaper!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        Game.killBuff("Haggler's luck");
        var buff = Game.gainBuff('haggler misery', 60 * 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Upgrades are pricier!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'summon crafty pixies': {
      name: 'Summon Crafty Pixies',
      desc: 'Buildings are 2% cheaper for 1 minute.',
      failDesc: 'Buildings are 2% more expensive for an hour.',
      aliases: ['scp', 'crafty pixies', 'pixies'],
      icon: [26, 11],
      costMin: 10,
      costPercent: 0.2,
      win: function () {
        Game.killBuff('Nasty goblins');
        var buff = Game.gainBuff('pixie luck', 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Crafty pixies!<br>Buildings are cheaper!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        Game.killBuff('Crafty pixies');
        var buff = Game.gainBuff('pixie misery', 60 * 60, 2);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Nasty goblins!<br>Buildings are pricier!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    "gambler's fever dream": {
      name: "Gambler's Fever Dream",
      desc: 'Cast a random spell at half the magic cost, with twice the chance of backfiring.',
      aliases: ['gfd'],
      icon: [27, 11],
      costMin: 3,
      costPercent: 0.05,
      win: function () {
        var spells = [];
        var selfCost = M.getSpellCost(M.spells["gambler's fever dream"]);
        for (var i in M.spells) {
          if (
            i != "gambler's fever dream" &&
            M.magic - selfCost >= M.getSpellCost(M.spells[i]) * 0.5
          )
            spells.push(M.spells[i]);
        }
        if (spells.length == 0) {
          Game.Popup(
            '<div style="font-size:80%;">No eligible spells!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        var spell = choose(spells);
        var cost = M.getSpellCost(spell) * 0.5;
        setTimeout(
          (function (spell, cost, seed) {
            return function () {
              if (Game.seed != seed) return false;
              var out = M.castSpell(spell, {
                cost: cost,
                failChanceMax: 0.5,
                passthrough: true
              });
              if (!out) {
                M.magic += selfCost;
                setTimeout(function () {
                  Game.Popup(
                    '<div style="font-size:80%;">That\'s too bad!<br>Magic refunded.</div>',
                    Game.mouseX,
                    Game.mouseY
                  );
                }, 1500);
              }
            };
          })(spell, cost, Game.seed),
          1000
        );
        Game.Popup(
          '<div style="font-size:80%;">Casting ' +
            spell.name +
            '<br>for ' +
            Beautify(cost) +
            ' magic...</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'resurrect abomination': {
      name: 'Resurrect Abomination',
      desc: 'Instantly summon a wrinkler if conditions are fulfilled.',
      failDesc: 'Pop one of your wrinklers.',
      aliases: ['ra'],
      icon: [28, 11],
      costMin: 20,
      costPercent: 0.1,
      win: function () {
        var out = Game.SpawnWrinkler();
        if (!out) {
          Game.Popup(
            '<div style="font-size:80%;">Unable to spawn a wrinkler!</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Rise, my precious!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        var out = Game.PopRandomWrinkler();
        if (!out) {
          Game.Popup(
            '<div style="font-size:80%;">Backfire!<br>But no wrinkler was harmed.</div>',
            Game.mouseX,
            Game.mouseY
          );
          return -1;
        }
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>So long, ugly...</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    },
    'diminish ineptitude': {
      name: 'Diminish Ineptitude',
      desc: 'Spells backfire 10 times less for the next 5 minutes.',
      failDesc: 'Spells backfire 5 times more for the next 10 minutes.',
      aliases: ['di'],
      icon: [29, 11],
      costMin: 5,
      costPercent: 0.2,
      win: function () {
        Game.killBuff('Magic inept');
        var buff = Game.gainBuff('magic adept', 5 * 60, 10);
        Game.Popup(
          '<div style="font-size:80%;">Ineptitude diminished!</div>',
          Game.mouseX,
          Game.mouseY
        );
      },
      fail: function () {
        Game.killBuff('Magic adept');
        var buff = Game.gainBuff('magic inept', 10 * 60, 5);
        Game.Popup(
          '<div style="font-size:80%;">Backfire!<br>Ineptitude magnified!</div>',
          Game.mouseX,
          Game.mouseY
        );
      }
    }
  };

  const ParsingException = {
    INVALID_STATEMENT: 'INVALID_STATEMENT',
    INVALID_CONDITION_CHECK: 'INVALID_CONDITION_CHECK',
    MISMATCHED_BRACKETS: 'MISMATCHED_BRACKETS',
    MISSING_ARGUMENT: 'MISSING_ARGUMENT',
    INVALID_ARGUMENT: 'INVALID_ARGUMENT',
    UNEXPECTED_TOKEN: 'UNEXPECTED_TOKEN',
    INVALID_RANGE: 'INVALID_RANGE'
  };

  class StatementType {
    constructor(name, aliases = [], requiresArg = false) {
      this.name = name;
      this.aliases = new Set(
        [name.toLowerCase().replaceAll(' ', '')].concat(
          Array.from(aliases).map((a) => a.toLowerCase().replaceAll(' ', ''))
        )
      );
      this.requiresArg = requiresArg;
    }
    static type = 'Unknown';

    evaluate(arg, context) {
      throw new Error('Not implemented');
    }
    addAlias(string) {
      this.aliases.add(string.toLowerCase().replaceAll(' ', ''));
      this.constructor.ALLOWEDNAMES.add(
        string.toLowerCase().replaceAll(' ', '')
      );
    }

    static register(statement) {
      this.ALL.add(statement);
      this.ALLOWEDNAMES.add(statement.name.toLowerCase().replaceAll(' ', ''));
      for (let alias of statement.aliases) {
        this.ALLOWEDNAMES.add(alias.toLowerCase().replaceAll(' ', ''));
      }
    }
    static isAllowed(statementStr) {
      return this.ALLOWEDNAMES.has(statementStr);
    }
    static getByName(statementStr) {
      const str = statementStr.toLowerCase();
      for (let statement of this.ALL) {
        if (statement.aliases.has(str)) {
          return statement;
        }
      }
      return null;
    }

    static ALL = new Set();
    static ALLOWEDNAMES = new Set();
  }

  class EffectStatement extends StatementType {
    constructor(effect) {
      super(effect._name, effect._aliases, false);
      this.effect = effect;
      if (effect.shorthand) {
        this.addAlias(effect.shorthand);
      }
    }
    static type = 'Effect';

    evaluate(arg, context) {
      if (!(context.element instanceof EffectEntry)) {
        return false;
      }
      return context.element.is(this.effect);
    }
  }

  class SpellStatement extends StatementType {
    constructor(spell, internalKey) {
      super(spell.name, (spell.aliases ?? []).concat(internalKey), false);
      this.spell = spell;
    }
    static type = "Gambler's fever dream spell";

    evaluate(arg, context) {
      if (!(context.element instanceof FirstCallEntry)) {
        return false;
      }
      return context.element.GFDOutcome()?.name === this.spell.name;
    }
  }

  class SpecialStatement extends StatementType {
    constructor(name, func, aliases = []) {
      super(name, aliases, true);
      this.func = func;
    }

    evaluate(arg, context) {
      return this.func(arg, context);
    }
  }

  for (let effectName in allEffects) {
    const effect = allEffects[effectName];
    StatementType.register(new EffectStatement(effect));
  }
  for (let spellName in $scope.spells) {
    const spell = $scope.spells[spellName];
    StatementType.register(new SpellStatement(spell, spellName));
  }
  StatementType.register(
    new SpecialStatement('EFFECT', (arg, context) => {
      return context.element instanceof EffectEntry;
    })
  );
  StatementType.register(
    new SpecialStatement('GFDOUTCOME', (arg, context) => {
      return context.element instanceof FirstCallEntry;
    })
  );

  class Token {
    check(context) {
      throw new Error('Not implemented');
    }
  }

  class StatementToken extends Token {
    constructor(statement, args = null) {
      super();
      if (!StatementType.isAllowed(statement.toLowerCase())) {
        throw { type: ParsingException.INVALID_STATEMENT, statement };
      }
      const def = StatementType.getByName(statement.toLowerCase());
      if (def.requiresArg && arg === null) {
        throw { type: ParsingException.MISSING_ARGUMENT, statement };
      }
      this.statement = statement;
      this.args = args;
      this.statementType = def;
    }
    static type = 'statement';

    check(context) {
      return this.statementType.evaluate(this.args[0], context);
    }
  }

  class ConditionCheckToken extends Token {
    constructor(id, index = null) {
      super();
      if (!$scope.highlightConditions.has(id)) {
        throw { type: ParsingException.INVALID_CONDITION_CHECK, id };
      }
      this.id = id;
      this.indexMod = parseInt(index);
    }
    static type = 'condition_check';

    check(context) {
      const condition = $scope.highlightConditions.get(this.id);
      const newRow =
        context.allRows[context.castRow.index + (this.indexMod ?? 0)];
      if (!newRow) {
        return false;
      }
      return (
        condition &&
        (condition.check({
          allRows: context.allRows,
          castRow: newRow,
          element: newRow.firstCall
        }) ||
          condition.check({
            allRows: context.allRows,
            castRow: newRow,
            element: newRow.noChangeSuccess
          }) ||
          condition.check({
            allRows: context.allRows,
            castRow: newRow,
            element: newRow.noChangeBackfire
          }) ||
          condition.check({
            allRows: context.allRows,
            castRow: newRow,
            element: newRow.changeSuccess
          }) ||
          condition.check({
            allRows: context.allRows,
            castRow: newRow,
            element: newRow.changeBackfire
          }))
      );
    }
  }

  class RangeToken extends Token {
    constructor(num1, num2) {
      super();
      if (num1 < 0 || num2 < 0) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Range numbers must be positive'
        };
      }
      if (num2 <= num1) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Second number must be greater than first number'
        };
      }
      this.lower = num1;
      this.upper = num2;
    }
    static type = 'range';

    check(context) {
      // Empty implementation
      return (
        context.element instanceof FirstCallEntry &&
        context.element.GFDRS < this.upper &&
        context.element.GFDRS >= this.lower
      );
    }
  }

  class GroupToken extends Token {
    constructor(tokens) {
      super();
      this.tokens = tokens;
    }
    static type = 'group';

    check(context) {
      return this.tokens.check(context);
    }
  }

  class BinaryOpToken extends Token {
    constructor(left, operator, right) {
      super();
      this.left = left;
      this.operator = operator; // "&", "|"
      this.right = right;
    }
    static type = 'binary_op';

    check(context) {
      if (this.operator === '&') {
        return this.left.check(context) && this.right.check(context);
      } else if (this.operator === '|') {
        return this.left.check(context) || this.right.check(context);
      }
      return false;
    }
  }

  class UnaryOpToken extends Token {
    constructor(operator, operand) {
      super();
      this.operator = operator; // "!"
      this.operand = operand;
    }
    static type = 'unary_op';

    check(context) {
      if (this.operator === '!') {
        return !this.operand.check(context);
      }
      return false;
    }
  }

  function parseNumber(str) {
    // Parse decimal or fraction (e.g., "0.5" or "1/2")
    if (str.includes('/')) {
      const parts = str.split('/');
      if (parts.length !== 2) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Invalid fraction format'
        };
      }
      const num = parseFloat(parts[0]);
      const denom = parseFloat(parts[1]);
      if (isNaN(num) || isNaN(denom) || denom === 0) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Invalid fraction values'
        };
      }
      return num / denom;
    } else {
      const num = parseFloat(str);
      if (isNaN(num)) {
        throw {
          type: ParsingException.INVALID_RANGE,
          message: 'Invalid number format'
        };
      }
      return num;
    }
  }

  function tokenizeCondition(str) {
    str = str.replace(/\s+/g, ''); // Strip whitespace
    const tokens = [];
    let i = 0;

    while (i < str.length) {
      const char = str[i];

      if (char === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        i++;
      } else if (char === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        i++;
      } else if (char === '&') {
        tokens.push({ type: 'OP', value: '&' });
        i++;
      } else if (char === '|') {
        tokens.push({ type: 'OP', value: '|' });
        i++;
      } else if (char === '!') {
        tokens.push({ type: 'NOT', value: '!' });
        i++;
      } else if (char === '{') {
        // Parse range {number1-number2}
        let j = i + 1;
        while (j < str.length && str[j] !== '}') j++;
        if (j >= str.length) {
          throw {
            type: ParsingException.UNEXPECTED_TOKEN,
            message: 'Missing closing brace for range'
          };
        }
        const rangeStr = str.substring(i + 1, j);
        const dashIndex = rangeStr.lastIndexOf('-');
        if (dashIndex === -1 || dashIndex === 0) {
          throw {
            type: ParsingException.INVALID_RANGE,
            message: 'Invalid range format'
          };
        }
        const num1Str = rangeStr.substring(0, dashIndex);
        const num2Str = rangeStr.substring(dashIndex + 1);
        const num1 = parseNumber(num1Str);
        const num2 = parseNumber(num2Str);
        tokens.push({ type: 'RANGE', value: [num1, num2] });
        i = j + 1;
      } else if (/[a-zA-Z_\:\']/.test(char)) {
        // Parse identifier
        let j = i;
        while (j < str.length && /[a-zA-Z0-9-_\:\']/.test(str[j])) j++;
        const identifier = str.substring(i, j).split(':');
        tokens.push({
          type: 'IDENT',
          value: identifier[0],
          args: identifier.slice(1)
        });
        i = j;
      } else if (/[0-9]/.test(char)) {
        // Parse number
        let j = i;
        while (j < str.length && /[0-9]/.test(str[j])) j++;
        const number = parseInt(str.substring(i, j), 10);
        tokens.push({ type: 'NUM', value: number });
        i = j;
      } else {
        throw { type: ParsingException.UNEXPECTED_TOKEN, char, position: i };
      }
    }
    return tokens;
  }

  function parseExpression(tokens, pos = 0) {
    const result = parseOr(tokens, pos);
    return result;
  }

  function parseOr(tokens, pos) {
    let left = parseAnd(tokens, pos);
    pos = left.pos;

    while (
      pos < tokens.length &&
      tokens[pos].type === 'OP' &&
      tokens[pos].value === '|'
    ) {
      pos++; // consume |
      const right = parseAnd(tokens, pos);
      pos = right.pos;
      left = { node: new BinaryOpToken(left.node, '|', right.node), pos };
    }
    return left;
  }

  function parseAnd(tokens, pos) {
    let left = parseNot(tokens, pos);
    pos = left.pos;

    while (
      pos < tokens.length &&
      tokens[pos].type === 'OP' &&
      tokens[pos].value === '&'
    ) {
      pos++; // consume &
      const right = parseNot(tokens, pos);
      pos = right.pos;
      left = { node: new BinaryOpToken(left.node, '&', right.node), pos };
    }
    return left;
  }

  function parseNot(tokens, pos) {
    if (pos < tokens.length && tokens[pos].type === 'NOT') {
      pos++; // consume !
      const operand = parseNot(tokens, pos);
      return {
        node: new UnaryOpToken('!', operand.node),
        pos: operand.pos
      };
    }
    return parsePrimary(tokens, pos);
  }

  function parsePrimary(tokens, pos) {
    if (pos >= tokens.length) {
      throw {
        type: ParsingException.UNEXPECTED_TOKEN,
        message: 'Unexpected end of expression'
      };
    }

    if (tokens[pos].type === 'LPAREN') {
      pos++; // consume (
      const expr = parseExpression(tokens, pos);
      pos = expr.pos;
      if (pos >= tokens.length || tokens[pos].type !== 'RPAREN') {
        throw {
          type: ParsingException.MISMATCHED_BRACKETS,
          message: 'Missing closing bracket'
        };
      }
      pos++; // consume )
      return { node: new GroupToken(expr.node), pos };
    }

    if (tokens[pos].type === 'RANGE') {
      const rangeValues = tokens[pos].value;
      const node = new RangeToken(rangeValues[0], rangeValues[1]);
      return { node, pos: pos + 1 };
    }

    if (tokens[pos].type === 'IDENT') {
      const ident = tokens[pos].value;

      // Check if it's a condition check (reference to another HighlightCondition)
      if ($scope.highlightConditions.has(ident)) {
        let index = tokens[pos].args[0] ?? null;
        return { node: new ConditionCheckToken(ident, index), pos: pos + 1 };
      }

      // Otherwise it's a statement
      if (!StatementType.isAllowed(ident.toLowerCase())) {
        throw { type: ParsingException.INVALID_STATEMENT, statement: ident };
      }

      const def = StatementType.getByName(ident.toLowerCase());

      pos++;

      return { node: new StatementToken(ident, tokens[pos - 1].args), pos };
    }

    throw {
      type: ParsingException.UNEXPECTED_TOKEN,
      token: tokens[pos],
      position: pos
    };
  }

  class HighlightCondition {
    constructor(id, conditionsStr, color) {
      this.id = id;
      if (StatementType.isAllowed(id)) {
        throw {
          type: ParsingException.INVALID_CONDITION_CHECK,
          message: `Condition ID "${id}" cannot be the same as a statement name`
        };
      }
      this.color = color ?? null;
      this.conditionsText = conditionsStr;
      //this.compile(this.conditionsText);
    }
    _enabled = true;
    _advanced = true;

    static register(condition) {
      $scope.highlightConditions.set(condition.id, condition);
      $scope.highlightConditionsList.push({ value: condition.id });
      this.intId = $scope.highlightConditions.size; // Just a unique integer for this condition, used for ng-repeat tracking
      return condition;
    }

    get enabled() {
      return this._enabled;
    }
    set enabled(bool) {
      this._enabled = bool;
    }
    get advanced() {
      return this._advanced;
    }
    set advanced(bool) {
      this._advanced = bool;
    }

    compile(conditionsStr = this.conditionsText) {
      try {
        const tokens = tokenizeCondition(conditionsStr);
        //console.log(tokens);
        const parsed = parseExpression(tokens);
        if (parsed.pos !== tokens.length) {
          throw {
            type: ParsingException.UNEXPECTED_TOKEN,
            message: 'Extra tokens after expression'
          };
        }
        this.ast = parsed.node;
        this.parseError = null;
      } catch (error) {
        this.parseError = error;
        this.ast = null;
      }
    }

    // Context: allRows, castRow, element
    check(context) {
      if (this.parseError) {
        return false;
      }
      if (!this.ast) {
        return false;
      }
      return this.ast.check(context);
    }

    save() {
      return {
        id: this.id,
        conditionsText: this.conditionsText,
        color: this.color
      };
    }
    static load(object) {
      return HighlightCondition.register(
        new HighlightCondition(object.id, object.conditionsText, object.color)
      );
    }
  }
  $scope.highlightConditions = new Map();
  $scope.highlightConditionsList = [];
  $scope.reindexAllConditions = function () {
    for (let [key, condition] of $scope.highlightConditions) {
      condition.intId = $scope.highlightConditionsList.reduce((acc, cur, i) => {
        if (cur.value === condition.id) {
          return i;
        }
        return acc;
      }, -1);
      condition.compile();
    }
  };

  /**
   * Generates a CSS linear-gradient string that divides the background into
   * equal-width vertical slices, one per color, using hard stops.
   *
   * @param {string[]} colors - Array of CSS color strings (e.g., ['red', '#00ff00', 'rgb(0,0,255)'])
   * @returns {string} - CSS linear-gradient value (e.g., "linear-gradient(to right, red 0%, red 25%, ...)")
   */
  function generateEqualSplitGradient(colors) {
    if (!Array.isArray(colors) || colors.length === 0) {
      return '';
    }

    // Single color: still return a valid gradient (or could be simplified, but gradient works)
    if (colors.length === 1) {
      return `linear-gradient(to right, ${colors[0]}, ${colors[0]})`;
    }

    const n = colors.length;
    const stops = [];

    for (let i = 0; i < n; i++) {
      const startPercent = (i / n) * 100;
      const endPercent = ((i + 1) / n) * 100;

      // Hard transition: color at startPercent, same color at endPercent
      stops.push(`${colors[i]} ${startPercent}%`);
      stops.push(`${colors[i]} ${endPercent}%`);
    }

    return `linear-gradient(to right, ${stops.join(', ')})`;
  }

  function computeHighlights(element, castRow, allRows) {
    const context = { element, castRow, allRows };
    const colors = [];
    for (const [key, condition] of $scope.highlightConditions.entries()) {
      if (condition.enabled && condition.check(context)) {
        if (condition.color) {
          colors.push(condition.color);
        }
      }
    }
    return colors;
  }

  function constructDefaultHighlightConditions() {
    $scope.highlightConditions.clear();
    $scope.highlightConditionsList = [];
    HighlightCondition.register(
      new HighlightCondition('isBS', 'Building Special', '#ffff00')
    );
    HighlightCondition.register(
      new HighlightCondition('isEF', 'Elder Frenzy', '#ffff00')
    );
    HighlightCondition.register(
      new HighlightCondition('isRA', 'Resurrect Abomination', '#add8e6')
    );
    HighlightCondition.register(
      new HighlightCondition('isSE', 'Spontaneous Edifice', '#add8e6')
    );
    HighlightCondition.register(
      new HighlightCondition(
        'FtHoFHighlight',
        'Force the Hand of Fate & (isBS:1 | isEF:1)',
        '#ffff00'
      )
    );
    for (let [id, condition] of $scope.highlightConditions) {
      condition.compile();
    }
  }
  LocalStorageManager.register(
    new LocalStorageManager('highlights', {
      firstLoad: constructDefaultHighlightConditions,
      save: () => {
        return {
          conditions: $scope.highlightConditionsList.map((e) =>
            $scope.highlightConditions.get(e.value).save()
          )
        };
      },
      load: (obj) => {
        $scope.highlightConditions.clear();
        $scope.highlightConditionsList = [];
        for (let i in obj.conditions) {
          HighlightCondition.load(obj.conditions[i]);
        }
        for (let [id, condition] of $scope.highlightConditions) {
          condition.compile();
        }
      }
    })
  );

  $scope.highlightRearrangementEnabled = false;
  $scope.toggleRearrangementMode = function () {
    $scope.highlightRearrangementEnabled =
      !$scope.highlightRearrangementEnabled;
    if (!$scope.highlightRearrangementEnabled) {
      $scope.reindexAllConditions();
    }
    LocalStorageManager.get('highlights').save();
  };

  $scope.highlightSettingsExpanded = false;
  $scope.advancedModeEnabled = false;
  $scope.availableStatements = Array.from(StatementType.ALL);
  $scope.removeHighlightCondition = function (condition) {
    const id = condition.id;
    $scope.highlightConditions.delete(id);
    const index = $scope.highlightConditionsList.reduce((acc, cur, i) => {
      if (cur.value === id) {
        return i;
      }
      return acc;
    }, -1);
    if (index > -1) {
      $scope.highlightConditionsList.splice(index, 1);
    }
    LocalStorageManager.get('highlights').save();
  };
  $scope.addHighlightCondition = function () {
    const newId = prompt(
      'Enter a unique ID for this highlight condition (used for referencing in conditions, no spaces, only letters numbers and underscore):'
    );
    if (!newId) {
      return;
    }
    if (
      $scope.highlightConditions.has(newId) ||
      StatementType.isAllowed(newId)
    ) {
      alert(
        'ID already in use as a condition or statement name. Please choose a different one.'
      );
      return;
    }
    if (!newId || newId.match(/[^a-zA-Z0-9_]|\s/)) {
      alert(
        'Invalid ID name. ID name must only contain letters, numbers, underscores, cannot be empty, and cannot contain whitespace. Please choose a different one.'
      );
      return;
    }
    const highlight = HighlightCondition.register(
      new HighlightCondition(newId, 'Frenzy')
    );
    highlight.compile();
    LocalStorageManager.get('highlights').save();
  };
  $scope.updateConditionId = function (oldId, newId) {
    if (oldId === newId) {
      return;
    }
    const condition = $scope.highlightConditions.get(oldId);
    if (
      $scope.highlightConditions.has(newId) ||
      StatementType.isAllowed(newId) ||
      !newId ||
      newId.match(/[^a-zA-Z0-9_]|\s/)
    ) {
      alert(
        'Invalid ID name. ID name must only contain letters, numbers, underscores, cannot be empty, cannot contain whitespace, and cannot be the names or abbreviations of spells and effects. Please choose a different one.'
      );
      condition.id = oldId;
      return oldId;
    }
    $scope.highlightConditions.delete(oldId);
    $scope.highlightConditions.set(newId, condition);
    const index = $scope.highlightConditionsList.reduce((acc, cur, i) => {
      if (cur.value === oldId) {
        return i;
      }
      return acc;
    }, -1);
    if (index > -1) {
      $scope.highlightConditionsList[index].value = newId;
    }
    for (let [key, cond] of $scope.highlightConditions.entries()) {
      if (
        cond.conditionsText.match(
          new RegExp(
            `(?<![a-zA-Z0-9_])${oldId.replace(/[.*+?^$\:{}()|[\]\\]/g, '\\$&')}(?![a-zA-Z0-9_])`
          )
        )
      ) {
        $scope.updateConditionExpression(
          cond,
          cond.conditionsText.replace(
            new RegExp(
              `(?<![a-zA-Z0-9_])${oldId.replace(/[.*+?\:^${}()|[\]\\]/g, '\\$&')}(?![a-zA-Z0-9_])`,
              'g'
            ),
            newId
          )
        ); // Re-parse to update any references to this condition
      }
    }
    LocalStorageManager.get('highlights').save();
    return newId;
  };
  $scope.updateConditionColor = function (condition, newColor) {
    if (condition) {
      condition.color =
        newColor && newColor.trim().length > 0 ? newColor : null;
    }
    LocalStorageManager.get('highlights').save();
  };
  $scope.updateConditionStatement = function (condition, statementName) {
    $scope.updateConditionExpression(condition, statementName);
  };
  $scope.updateConditionExpression = function (condition, expressionStr) {
    if (condition) {
      condition.conditionsText = expressionStr;
      condition.compile();
      LocalStorageManager.get('highlights').save();
    }
  };
  $scope.splitColorAndAlpha = function (colorString) {
    if (!colorString) {
      return { color: null, alpha: 1 };
    }

    // Handle rgba() format
    const rgbaMatch = colorString.match(
      /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/
    );
    if (rgbaMatch) {
      const r = rgbaMatch[1];
      const g = rgbaMatch[2];
      const b = rgbaMatch[3];
      const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
      const rgbColor = `rgb(${r}, ${g}, ${b})`;
      return { color: rgbColor, alpha: alpha };
    }

    // Handle hex format
    const hexMatch = colorString.match(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/);
    if (hexMatch) {
      return { color: colorString.substring(0, 8), alpha: 1 };
    }

    // Default: assume it's just a color string
    return { color: colorString, alpha: 1 };
  };
  $scope.test = (e) => {
    console.log(e);
    console.trace();
  };
  $scope.exportHighlights = function () {
    const highlightData = {
      conditions: Array.from($scope.highlightConditions.values()).map((e) =>
        e.save()
      )
    };
    const jsonString = JSON.stringify(highlightData);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        alert('Highlights copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy to clipboard');
      });
  };
  $scope.importHighlights = function () {
    const jsonString = prompt('Paste your highlights JSON:');
    if (jsonString === null) return;
    try {
      const obj = JSON.parse(jsonString);
      $scope.highlightConditions.clear();
      $scope.highlightConditionsList = [];
      for (let i in obj.conditions) {
        const cond = HighlightCondition.load(obj.conditions[i]);
        cond.compile();
      }
      alert('Highlights imported successfully!');
    } catch (error) {
      alert('Failed to import highlights: ' + error.message);
    }
  };

  $scope.advancedHelpVisibility = false;
  $scope.resetDefaultHighlights = function () {
    if (
      confirm(
        "Are you sure you want to reset to the default highlight conditions? This will remove any custom conditions you've created."
      )
    ) {
      constructDefaultHighlightConditions();
      LocalStorageManager.get('highlights').save();
    }
  };

  var urlParams = new URLSearchParams(window.location.search);
  var seed = urlParams.get('seed');
  if (seed != null && seed.trim().length === 5) {
    document.querySelector('[ng-model=save_string]').textContent =
      $scope.save_string = seed;
    var spellsCast = urlParams.get('spellsCast');
    $scope.spellsCastTotal = Number(spellsCast);
    $scope.spellsCastThisAscension = $scope.spellsCastTotal;
    $scope.load_game(null, true);
  }

  LocalStorageManager.loadAll();
  window.app = $scope;
});
