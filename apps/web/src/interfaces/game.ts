export type RAWGGameSlug = string;

interface RAWGGamePlatform {
  platform: {
    id: number;
    name: string;
    slug: RAWGGameSlug;
  };
}

export interface RAWGGame {
  slug: string;
  name: string;
  playtime: number;
  platforms: RAWGGamePlatform[];
  stores: [
    {
      store: {
        id: 1;
        name: 'Steam';
        slug: 'steam';
      };
    },
    {
      store: {
        id: 3;
        name: 'PlayStation Store';
        slug: 'playstation-store';
      };
    },
    {
      store: {
        id: 2;
        name: 'Xbox Store';
        slug: 'xbox-store';
      };
    },
    {
      store: {
        id: 11;
        name: 'Epic Games';
        slug: 'epic-games';
      };
    }
  ];
  released: '2018-10-26';
  tba: false;
  background_image: 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg';
  rating: 4.56;
  rating_top: 5;
  ratings: [
    {
      id: 5;
      title: 'exceptional';
      count: 1863;
      percent: 71.52;
    },
    {
      id: 4;
      title: 'recommended';
      count: 505;
      percent: 19.39;
    },
    {
      id: 3;
      title: 'meh';
      count: 157;
      percent: 6.03;
    },
    {
      id: 1;
      title: 'skip';
      count: 80;
      percent: 3.07;
    }
  ];
  ratings_count: 2560;
  reviews_text_count: 36;
  added: 7867;
  added_by_status: {
    yet: 405;
    owned: 4240;
    beaten: 1269;
    toplay: 1145;
    dropped: 220;
    playing: 588;
  };
  metacritic: 96;
  suggestions_count: 645;
  id: 28;
  score: '10.979992';
  clip: {
    clip: 'https://media.rawg.io/media/stories-640/b19/b1904018c12b752274008720a9f9cc2f.mp4';
    clips: {
      '320': 'https://media.rawg.io/media/stories-320/130/1309c8ea2eb2c7fedf96048e8de53e0c.mp4';
      '640': 'https://media.rawg.io/media/stories-640/b19/b1904018c12b752274008720a9f9cc2f.mp4';
      full: 'https://media.rawg.io/media/stories/cd6/cd62fd7cded52a72d11b39b188237540.mp4';
    };
    video: '55OoIvMU8b4';
    preview: 'https://media.rawg.io/media/stories-previews/c63/c6377b573b3549bfefddc0d9ae982ba1.jpg';
  };
  tags: [
    {
      id: 40837;
      name: 'In-App Purchases';
      slug: 'in-app-purchases';
      language: 'eng';
      games_count: 1044;
      image_background: 'https://media.rawg.io/media/screenshots/6d3/6d367773c06886535620f2d7fb1cb866.jpg';
    },
    {
      id: 78;
      name: 'America';
      slug: 'america';
      language: 'eng';
      games_count: 84;
      image_background: 'https://media.rawg.io/media/games/a7d/a7db93278cf083eb22bd1fd50072f50e.jpg';
    },
    {
      id: 40845;
      name: 'Partial Controller Support';
      slug: 'partial-controller-support';
      language: 'eng';
      games_count: 6220;
      image_background: 'https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg';
    },
    {
      id: 13;
      name: 'Atmospheric';
      slug: 'atmospheric';
      language: 'eng';
      games_count: 8462;
      image_background: 'https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg';
    },
    {
      id: 270;
      name: 'Blood';
      slug: 'blood';
      language: 'eng';
      games_count: 1266;
      image_background: 'https://media.rawg.io/media/games/a79/a79d2fc90c4dbf07a8580b19600fd61d.jpg';
    },
    {
      id: 110;
      name: 'Cinematic';
      slug: 'cinematic';
      language: 'eng';
      games_count: 154;
      image_background: 'https://media.rawg.io/media/games/81b/81b138691f027ed1f8720758daa0d895.jpg';
    },
    {
      id: 18;
      name: 'Co-op';
      slug: 'co-op';
      language: 'eng';
      games_count: 5266;
      image_background: 'https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg';
    },
    {
      id: 144;
      name: 'Crime';
      slug: 'crime';
      language: 'eng';
      games_count: 1468;
      image_background: 'https://media.rawg.io/media/games/bd7/bd7cfccfececba1ec2b97a120a40373f.jpg';
    },
    {
      id: 6;
      name: 'Exploration';
      slug: 'exploration';
      language: 'eng';
      games_count: 6784;
      image_background: 'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg';
    },
    {
      id: 8;
      name: 'First-Person';
      slug: 'first-person';
      language: 'eng';
      games_count: 7637;
      image_background: 'https://media.rawg.io/media/games/e46/e462e92b46e8df13e78a806191610d47.jpg';
    },
    {
      id: 30;
      name: 'FPS';
      slug: 'fps';
      language: 'eng';
      games_count: 5083;
      image_background: 'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg';
    },
    {
      id: 26;
      name: 'Gore';
      slug: 'gore';
      language: 'eng';
      games_count: 3136;
      image_background: 'https://media.rawg.io/media/games/8d4/8d46786ca86b1d95f3dc7e700e2dc4dd.jpg';
    },
    {
      id: 42;
      name: 'Great Soundtrack';
      slug: 'great-soundtrack';
      language: 'eng';
      games_count: 2953;
      image_background: 'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg';
    },
    {
      id: 181;
      name: 'Hunting';
      slug: 'hunting';
      language: 'eng';
      games_count: 516;
      image_background: 'https://media.rawg.io/media/games/275/2759da6fcaa8f81f21800926168c85f6.jpg';
    },
    {
      id: 192;
      name: 'Mature';
      slug: 'mature';
      language: 'eng';
      games_count: 601;
      image_background: 'https://media.rawg.io/media/games/471/4712c9ac591f556f553556b864a7e92b.jpg';
    },
    {
      id: 7;
      name: 'Multiplayer';
      slug: 'multiplayer';
      language: 'eng';
      games_count: 20486;
      image_background: 'https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg';
    },
    {
      id: 9;
      name: 'Online Co-Op';
      slug: 'online-co-op';
      language: 'eng';
      games_count: 2046;
      image_background: 'https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg';
    },
    {
      id: 36;
      name: 'Open World';
      slug: 'open-world';
      language: 'eng';
      games_count: 2667;
      image_background: 'https://media.rawg.io/media/games/088/088b41ca3f9d22163e43be07acf42304.jpg';
    },
    {
      id: 157;
      name: 'PvP';
      slug: 'pvp';
      language: 'eng';
      games_count: 2282;
      image_background: 'https://media.rawg.io/media/games/7d9/7d9fd2b2b53a27f1af20b96b8d40c538.jpg';
    },
    {
      id: 77;
      name: 'Realistic';
      slug: 'realistic';
      language: 'eng';
      games_count: 620;
      image_background: 'https://media.rawg.io/media/games/b22/b227810b1a1bcbe9cf3dda22534c686e.jpg';
    },
    {
      id: 37;
      name: 'Sandbox';
      slug: 'sandbox';
      language: 'eng';
      games_count: 2604;
      image_background: 'https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg';
    },
    {
      id: 31;
      name: 'Singleplayer';
      slug: 'singleplayer';
      language: 'eng';
      games_count: 77096;
      image_background: 'https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg';
    },
    {
      id: 118;
      name: 'Story Rich';
      slug: 'story-rich';
      language: 'eng';
      games_count: 6558;
      image_background: 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg';
    },
    {
      id: 149;
      name: 'Third Person';
      slug: 'third-person';
      language: 'eng';
      games_count: 2397;
      image_background: 'https://media.rawg.io/media/games/ee3/ee3e10193aafc3230ba1cae426967d10.jpg';
    },
    {
      id: 150;
      name: 'Third-Person Shooter';
      slug: 'third-person-shooter';
      language: 'eng';
      games_count: 942;
      image_background: 'https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg';
    },
    {
      id: 34;
      name: 'Violent';
      slug: 'violent';
      language: 'eng';
      games_count: 3700;
      image_background: 'https://media.rawg.io/media/games/a0e/a0ef08621301a1eab5e04fa5c96978fa.jpeg';
    },
    {
      id: 152;
      name: 'Western';
      slug: 'western';
      language: 'eng';
      games_count: 608;
      image_background: 'https://media.rawg.io/media/screenshots/168/16840899b589ffde76915c3d95417b31.jpg';
    },
    {
      id: 478;
      name: '3rd-Person Perspective';
      slug: '3rd-person-perspective';
      language: 'eng';
      games_count: 79;
      image_background: 'https://media.rawg.io/media/games/d89/d89bd0cf4fcdc10820892980cbba0f49.jpg';
    },
    {
      id: 577;
      name: 'Beautiful';
      slug: 'beautiful';
      language: 'eng';
      games_count: 1328;
      image_background: 'https://media.rawg.io/media/screenshots/5ff/5ffea4d92d0838d9387ca7958e32b42e.jpg';
    },
    {
      id: 578;
      name: 'Masterpiece';
      slug: 'masterpiece';
      language: 'eng';
      games_count: 147;
      image_background: 'https://media.rawg.io/media/screenshots/4b5/4b5f453f554f4b0d1a4ce904bfcb63df.jpg';
    },
    {
      id: 5452;
      name: '3rd-person';
      slug: '3rd-person';
      language: 'eng';
      games_count: 52;
      image_background: 'https://media.rawg.io/media/screenshots/652/652a9a361771e0cf0387dae0248ee683.jpg';
    },
    {
      id: 42392;
      name: 'Приключение';
      slug: 'prikliuchenie';
      language: 'rus';
      games_count: 16394;
      image_background: 'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg';
    },
    {
      id: 42394;
      name: 'Глубокий сюжет';
      slug: 'glubokii-siuzhet';
      language: 'rus';
      games_count: 3061;
      image_background: 'https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg';
    },
    {
      id: 42396;
      name: 'Для одного игрока';
      slug: 'dlia-odnogo-igroka';
      language: 'rus';
      games_count: 9384;
      image_background: 'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg';
    },
    {
      id: 42400;
      name: 'Атмосфера';
      slug: 'atmosfera';
      language: 'rus';
      games_count: 4147;
      image_background: 'https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg';
    },
    {
      id: 42401;
      name: 'Отличный саундтрек';
      slug: 'otlichnyi-saundtrek';
      language: 'rus';
      games_count: 4184;
      image_background: 'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg';
    },
    {
      id: 42417;
      name: 'Экшен';
      slug: 'ekshen';
      language: 'rus';
      games_count: 18256;
      image_background: 'https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg';
    },
    {
      id: 42425;
      name: 'Для нескольких игроков';
      slug: 'dlia-neskolkikh-igrokov';
      language: 'rus';
      games_count: 3838;
      image_background: 'https://media.rawg.io/media/games/15c/15c95a4915f88a3e89c821526afe05fc.jpg';
    },
    {
      id: 42427;
      name: 'Шутер от первого лица';
      slug: 'shuter-ot-pervogo-litsa';
      language: 'rus';
      games_count: 1682;
      image_background: 'https://media.rawg.io/media/games/530/5302dd22a190e664531236ca724e8726.jpg';
    },
    {
      id: 42428;
      name: 'Шутер';
      slug: 'shuter';
      language: 'rus';
      games_count: 2239;
      image_background: 'https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg';
    },
    {
      id: 42429;
      name: 'От первого лица';
      slug: 'ot-pervogo-litsa';
      language: 'rus';
      games_count: 2205;
      image_background: 'https://media.rawg.io/media/games/c6b/c6bfece1daf8d06bc0a60632ac78e5bf.jpg';
    },
    {
      id: 42435;
      name: 'Шедевр';
      slug: 'shedevr';
      language: 'rus';
      games_count: 1058;
      image_background: 'https://media.rawg.io/media/games/ed5/ed5b7d01dd68fd8d598c91ad61f153af.jpg';
    },
    {
      id: 42441;
      name: 'От третьего лица';
      slug: 'ot-tretego-litsa';
      language: 'rus';
      games_count: 1064;
      image_background: 'https://media.rawg.io/media/games/d46/d46373f39458670305704ef089387520.jpg';
    },
    {
      id: 42442;
      name: 'Открытый мир';
      slug: 'otkrytyi-mir';
      language: 'rus';
      games_count: 1983;
      image_background: 'https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg';
    },
    {
      id: 42444;
      name: 'Песочница';
      slug: 'pesochnitsa';
      language: 'rus';
      games_count: 1417;
      image_background: 'https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg';
    },
    {
      id: 42446;
      name: 'Шутер от третьего лица';
      slug: 'shuter-ot-tretego-litsa';
      language: 'rus';
      games_count: 434;
      image_background: 'https://media.rawg.io/media/games/10d/10d19e52e5e8415d16a4d344fe711874.jpg';
    },
    {
      id: 42460;
      name: 'Реализм';
      slug: 'realizm';
      language: 'rus';
      games_count: 634;
      image_background: 'https://media.rawg.io/media/games/f66/f666ec88b6676ede75320fbae5874f43.jpg';
    },
    {
      id: 42475;
      name: 'Вестерн';
      slug: 'vestern';
      language: 'rus';
      games_count: 109;
      image_background: 'https://media.rawg.io/media/screenshots/98c/98c25faca7a3e594188e0ae5fa112eed.jpg';
    },
    {
      id: 42491;
      name: 'Мясо';
      slug: 'miaso';
      language: 'rus';
      games_count: 2555;
      image_background: 'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg';
    },
    {
      id: 42529;
      name: 'Для взрослых';
      slug: 'dlia-vzroslykh';
      language: 'rus';
      games_count: 513;
      image_background: 'https://media.rawg.io/media/games/471/4712c9ac591f556f553556b864a7e92b.jpg';
    },
    {
      id: 42690;
      name: 'Красивая';
      slug: 'krasivaia';
      language: 'rus';
      games_count: 289;
      image_background: 'https://media.rawg.io/media/games/8cd/8cd179c85bd3de8f79bef245b15075fb.jpg';
    },
    {
      id: 45878;
      name: 'Online PvP';
      slug: 'online-pvp';
      language: 'eng';
      games_count: 310;
      image_background: 'https://media.rawg.io/media/screenshots/df6/df678aef82bc9f3e41c8409813722ae2.jpg';
    }
  ];
  user_game: null;
  reviews_count: 2605;
  saturated_color: '0f0f0f';
  dominant_color: '0f0f0f';
  short_screenshots: [
    {
      id: -1;
      image: 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg';
    },
    {
      id: 778173;
      image: 'https://media.rawg.io/media/screenshots/7b8/7b8895a23e8ca0dbd9e1ba24696579d9.jpg';
    },
    {
      id: 778174;
      image: 'https://media.rawg.io/media/screenshots/b8c/b8cee381079d58b981594ede46a3d6ca.jpg';
    },
    {
      id: 778175;
      image: 'https://media.rawg.io/media/screenshots/fd6/fd6e41d4c30c098158568aef32dfed35.jpg';
    },
    {
      id: 778176;
      image: 'https://media.rawg.io/media/screenshots/2ed/2ed3b2791b3bbed6b98bf362694aeb73.jpg';
    },
    {
      id: 778177;
      image: 'https://media.rawg.io/media/screenshots/857/8573b9f4f06a0c112d6e39cdf3544881.jpg';
    },
    {
      id: 778178;
      image: 'https://media.rawg.io/media/screenshots/985/985e3e1f1d1af1ab0797d43a95d472cc.jpg';
    }
  ];
  parent_platforms: [
    {
      platform: {
        id: 1;
        name: 'PC';
        slug: 'pc';
      };
    },
    {
      platform: {
        id: 2;
        name: 'PlayStation';
        slug: 'playstation';
      };
    },
    {
      platform: {
        id: 3;
        name: 'Xbox';
        slug: 'xbox';
      };
    }
  ];
  genres: [
    {
      id: 3;
      name: 'Adventure';
      slug: 'adventure';
    },
    {
      id: 4;
      name: 'Action';
      slug: 'action';
    }
  ];
}
