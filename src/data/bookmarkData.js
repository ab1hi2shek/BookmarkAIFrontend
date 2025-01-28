export const getBookmarksList = () => {
    const bookmarks = [];

    const bookmark1 = {
        title: 'React learning tutorial',
        id: 'bookmark1',
        notes: 'Basic react tutorial to start. I want to get it done by this week.',
        tags: ['#react', '#self-project', '#coding'],
        url: 'https://legacy.reactjs.org/docs/handling-events.html',
    };

    const bookmark2 = {
        title: 'Chatgpt playground',
        id: 'bookmark2',
        notes: 'Chatgpt playground to ask questions',
        tags: ['#chatgpt', '#ai'],
        url: 'https://chatgpt.com/',
    };

    const bookmark3 = {
        title: 'User-defined types and hoisting in JavaScript',
        id: 'bookmark3',
        notes: `User-defined types and hoisting in JavaScript`,
        tags: ['#js', '#js-types', '#hoisting', '#user-defined', '#react'],
        url: `https://medium.com/@_benaston/user-defined-types-in-javascript-and-hoisting-6337c929a339`,
    };

    const bookmark4 = {
        title: 'Reddit groups ban X links in protest at Musk arm gesture',
        id: 'bookmark4',
        notes: "More than 100 Reddit communities have banned users from posting links to X in protest at owner Elon Musk's controversial arm gesture at a rally celebrating Donald Trump's return to office.",
        tags: ['#musk', '#trump', '#news'],
        url: 'https://www.bbc.com/news/articles/c77r1p887e5o',
    };

    const bookmark5 = {
        title: 'Introducing JSX from react website',
        id: 'bookmark5',
        notes: 'SX produces React “elements”. We will explore rendering them to the DOM in the next section. Below, you can find the basics of JSX necessary to get you started.',
        tags: ['#react', '#jsx', '#coding'],
        url: 'https://legacy.reactjs.org/docs/introducing-jsx.html',
    };

    const bookmark6 = {
        title: 'How do you loop inside React JSX?',
        id: 'bookmark6',
        notes: 'You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template. You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template. You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template. You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template.',
        tags: ['#react', '#for-loop', '#coding'],
        url: 'https://sentry.io/answers/react-for-loops/',
    };

    bookmarks.push(bookmark1);
    bookmarks.push(bookmark2);
    bookmarks.push(bookmark3);
    bookmarks.push(bookmark4);
    bookmarks.push(bookmark5);
    bookmarks.push(bookmark6);

    return bookmarks;
};

export const getTagsList = () => {
    const bookmarkList = getBookmarksList();
    const tagList = [];
    bookmarkList.forEach((bookmark) => {
        tagList.push(...bookmark.tags);
    });
    let tagListUnique = [...new Set(tagList)];

    let count = 1;
    let resultTagListObj = [];
    tagListUnique.forEach((tag) => {
        let tagItem = {
            "id": "tag-" + count,
            "name": tag,
            "creator": "USER",
            "userId": "user-1",
            "isSelected": false
        }
        resultTagListObj.push(tagItem);
        count += 1;
    });

    return resultTagListObj;
};