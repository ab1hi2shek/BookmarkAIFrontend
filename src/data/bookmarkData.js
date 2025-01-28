export const getBookmarksList = () => {
    const bookmarks = [];

    const bookmark1 = {
        title: 'React learning tutorial',
        id: 'bookmark1',
        notes: 'Basic react tutorial to start. I want to get it done by this week.',
        tags: ['tag-#react', 'tag-#self_project', 'tag-#coding'],
        url: 'https://legacy.reactjs.org/docs/handling-events.html',
    };

    const bookmark2 = {
        title: 'Chatgpt playground',
        id: 'bookmark2',
        notes: 'Chatgpt playground to ask questions',
        tags: ['tag-#chatgpt', 'tag-#ai'],
        url: 'https://chatgpt.com/',
    };

    const bookmark3 = {
        title: 'User-defined types and hoisting in JavaScript',
        id: 'bookmark3',
        notes: `User-defined types and hoisting in JavaScript`,
        tags: ['tag-#js', 'tag-#js_types', 'tag-#hoisting', 'tag-#user_defined', 'tag-#react'],
        url: `https://medium.com/@_benaston/user-defined-types-in-javascript-and-hoisting-6337c929a339`,
    };

    const bookmark4 = {
        title: 'Reddit groups ban X links in protest at Musk arm gesture',
        id: 'bookmark4',
        notes: "More than 100 Reddit communities have banned users from posting links to X in protest at owner Elon Musk's controversial arm gesture at a rally celebrating Donald Trump's return to office.",
        tags: ['tag-#musk', 'tag-#trump', 'tag-#news'],
        url: 'https://www.bbc.com/news/articles/c77r1p887e5o',
    };

    const bookmark5 = {
        title: 'Introducing JSX from react website',
        id: 'bookmark5',
        notes: 'SX produces React “elements”. We will explore rendering them to the DOM in the next section. Below, you can find the basics of JSX necessary to get you started.',
        tags: ['tag-#react', 'tag-#jsx', 'tag-#coding'],
        url: 'https://legacy.reactjs.org/docs/introducing-jsx.html',
    };

    const bookmark6 = {
        title: 'How do you loop inside React JSX?',
        id: 'bookmark6',
        notes: 'You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template. You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template. You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template. You have a set of elements, and you’d like to loop over them to generate a JSX partial. In templating languages, you can write a for loop directly inside the template.',
        tags: ['tag-#react', 'tag-#for_loop', 'tag-#coding'],
        url: 'https://sentry.io/answers/react-for-loops/',
    };

    const bookmark7 = {
        title: 'TextField API',
        id: 'bookmark7',
        notes: 'API reference docs for the React TextField component. Learn about the props, CSS, and other APIs of this exported module.',
        tags: ['tag-#mui', 'tag-#react'],
        url: 'https://mui.com/material-ui/api/text-field/?srsltid=AfmBOoo-Z_iIucWP6r-e9w6e1p6ViI-9_CN3y9LK-EdeTIVd4LUCZLFw',
    };

    const bookmark8 = {
        title: 'JavaScript String split()',
        id: 'bookmark8',
        notes: 'The split() method splits a string into an array of substrings. The split() method returns the new array. The split() method does not change the original string. If (" ") is used as separator, the string is split between words.',
        tags: ['tag-#js', 'tag-#string', 'tag-#coding'],
        url: 'https://www.w3schools.com/jsref/jsref_split.asp',
    };

    const bookmark9 = {
        title: 'Nvidia (NVDA) Stock Forecast & Price Target',
        id: 'bookmark9',
        notes: 'Next quarter’s sales forecast for NVDA is $38.02B with a range of $36.65B to $42.15B. The previous quarter’s sales results were $35.08B. NVDA beat its sales estimates 100.00% of the time in past 12 months, while its overall industry beat sales estimates 60.00% of the time in the same period. In the last calendar year NVDA has Outperformed its overall industry.',
        tags: ['tag-#nvidia', 'tag-#stocks'],
        url: 'https://www.tipranks.com/stocks/nvda/forecast',
    };

    const bookmark10 = {
        title: 'Transformer (deep learning architecture)',
        id: 'bookmark10',
        notes: 'A transformer is a deep learning architecture that was developed by researchers at Google and is based on the multi-head attention mechanism, which was proposed in the 2017 paper "Attention Is All You Need".[1] Text is converted to numerical representations called tokens, and each token is converted into a vector via lookup from a word embedding table.[1] At each layer, each token is then contextualized within the scope of the context window with other (unmasked) tokens via a parallel multi-head attention mechanism, allowing the signal for key tokens to be amplified and less important tokens to be diminished.',
        tags: ['tag-#deep_learning', 'tag-#ai', 'tag-#llm'],
        url: 'https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)',
    };

    bookmarks.push(bookmark1);
    bookmarks.push(bookmark2);
    bookmarks.push(bookmark3);
    bookmarks.push(bookmark4);
    bookmarks.push(bookmark5);
    bookmarks.push(bookmark6);
    bookmarks.push(bookmark7);
    bookmarks.push(bookmark8);
    bookmarks.push(bookmark9);
    bookmarks.push(bookmark10);

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
            "id": tag,
            "name": tag.split("-")[1],
            "creator": "USER",
            "userId": "user-1",
            "isSelected": false
        }
        resultTagListObj.push(tagItem);
        count += 1;
    });

    return resultTagListObj;
};