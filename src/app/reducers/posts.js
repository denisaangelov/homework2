import { NEW_POST, EDIT_POST, DELETE_POST, REQUEST_POSTS, RECEIVE_POSTS } from '../actions/list';

const postReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_POST:
            return {
                id: action.id,
                title: action.data.title,
                author: action.data.author,
                text: action.data.text,
                tags: action.data.tags,
                status: action.data.status,
                date: action.data.date
            };
        case EDIT_POST:
            if (state.id !== action.post.id) {
                return state;
            }
            return Object.assign({}, { ...action.post });
        case DELETE_POST:
            return state.filter(post =>
                post.id !== action.id
            );
        default: // GET_POSTS
            return state;
    }
};

const postsReducer = (state = [], action) => {
    switch (action.type) {
        case NEW_POST:
            return [
                ...state,
                postReducer(undefined, action)
            ].sort(compare);
        case EDIT_POST:
            console.log(state);
            console.log(action);
            return state.map(post =>
                postReducer(post, action)
            );
        case DELETE_POST:
            return postReducer(state, action);

        case REQUEST_POSTS:
            return Object.assign({}, state, {});

        case RECEIVE_POSTS:
            return receivePosts(state, action);
        default:
            return state;
    }
};

const receivePosts = (state, action) => {
    const posts = action.posts.sort(compare);
    return posts;
}

const compare = (a, b) => {
    return b.date - a.date;
}

export default postsReducer;

const tempdb = [
    {
        id: 1,
        title: 'Morbi in sem quis dui placerat ornare',
        author: 'Morbi',
        text: 'Morbi in sem quis dui placerat ornare.Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi. Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.',
        tags: 'euismod pharetra',
        status: 'Inactive',
        date: new Date(1992, 4, 12)
    }, {
        id: 2,
        title: 'Lorum ipsum dolor sit amet',
        author: 'Lorem',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.',
        tags: 'congue ornare augue',
        status: 'Active',
        date: new Date(1992, 4, 12)
    }, {
        id: 3,
        title: 'Vestibulum lacinia arcu eget nulla.',
        author: 'Cras Ut',
        text: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        tags: 'action data tags',
        status: 'Inactive',
        date: new Date(2017, 3, 18)
    }, {
        id: 4,
        title: 'Pellentesque fermentum dolor',
        author: 'Pellentesque',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        tags: 'action.data.tags',
        status: 'Inactive',
        date: new Date(2000, 5, 12)
    }, {
        id: 5,
        title: 'Aliquam tincidunt mauris eu risus',
        author: 'Aliquam',
        text: 'Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus neque.',
        tags: 'neque tincidunt auctor',
        status: 'Inactive',
        date: new Date(2001, 5, 12)
    }, {
        id: 6,
        title: 'Curabitur et varius tellus.',
        author: 'Curabitur ',
        text: 'Etiam sit amet nisl libero. Quisque nunc mi, tempus vel ullamcorper a, efficitur sed leo. Nullam suscipit accumsan massa, a eleifend dui dictum quis. Proin sit amet sodales arcu. Morbi at volutpat ex, ut dapibus urna. Donec nec lectus vitae ex vehicula pulvinar. Vivamus nec consequat.',
        tags: 'varius libero libero',
        status: 'Inactive',
        date: new Date(2015, 5, 12)
    }, {
        id: 7,
        title: 'Nam ornare et augue ac congue.',
        author: 'Donec Duis',
        text: 'Donec congue finibus ligula, eget blandit ante suscipit vestibulum. Nam ornare et augue ac congue. Integer sed erat dapibus, hendrerit metus tincidunt, sodales mauris. Donec aliquam, ante consequat vehicula blandit, erat justo auctor neque, ultrices vulputate metus nibh nec mi. Duis molestie est eget pellentesque pretium. Pellentesque est est, ultrices ut accumsan id, condimentum a dolor. Nam hendrerit ullamcorper condimentum. Suspendisse potenti. Curabitur dapibus nisi laoreet, iaculis magna nec, blandit nisl. Donec viverra venenatis felis. Praesent ultrices, massa ac egestas finibus, urna eros accumsan elit, quis vestibulum nunc est quis diam. Donec in nisi purus. Nulla semper lorem nec viverra vestibulum. Donec pellentesque, tortor ac maximus ullamcorper, augue lorem scelerisque nulla, id elementum quam dolor sed ligula. Nam vitae efficitur ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ac viverra odio, nec iaculis turpis. Aenean at ipsum euismod enim tempor elementum ac sit amet massa. Vestibulum auctor varius nibh, nec fringilla urna facilisis at. Nam vitae aliquet magna, non sollicitudin neque. Sed et bibendum elit, eget ultrices odio. Sed sit amet lacus neque. Vivamus blandit vitae augue sit amet lobortis. Fusce hendrerit metus vitae arcu venenatis faucibus. Vivamus id mi eu lacus consequat iaculis eget pretium lacus. Morbi sit amet turpis euismod, pellentesque ex eget, efficitur purus. Aliquam mauris mi, condimentum et pretium id, ultrices quis velit. Nulla at massa in nisi aliquet auctor. Aliquam erat volutpat. Cras volutpat magna a porttitor posuere. Pellentesque habitant morbi tristique senectus et.',
        tags: 'Duis diam ipsum',
        status: 'Inactive',
        date: new Date(1922, 5, 12)
    }, {
        id: 8,
        title: 'Donec',
        author: 'Suspendisse Curabitur',
        text: 'Donec feugiat molestie neque, sed ornare mi sodales eu. Curabitur bibendum purus sed tempus auctor. Suspendisse id sapien interdum, tempor.',
        tags: 'donec neque',
        status: 'Inactive',
        date: new Date(1999, 5, 12)
    }, {
        id: 9,
        title: 'Morbi semper vestibulum urna vitae ultricies',
        author: 'Suspendisse Curabitur',
        text: 'Morbi semper vestibulum urna vitae ultricies. Suspendisse commodo enim et nulla tempus congue. Etiam euismod congue dolor. Etiam ullamcorper, sapien vitae dignissim malesuada, libero odio porta lorem, fringilla cursus massa dolor a felis. Aliquam lacinia ut orci eget euismod. Donec et justo vehicula, malesuada augue non, egestas lorem. Curabitur porttitor.',
        tags: 'vestibulum ultricies commodo',
        status: 'Inactive',
        date: new Date(2017, 4, 17)
    }, {
        id: 10,
        title: 'Ut imperdiet lorem sed convallis blandit',
        author: 'Sed Curabitur',
        text: 'Ut imperdiet lorem sed convallis blandit. Sed facilisis tempus pellentesque. Curabitur consectetur, sapien at lacinia dictum, leo odio consectetur lectus, non consectetur felis ligula sit amet arcu. Donec a lacus eget purus dignissim fringilla. In consequat dui et luctus dictum. Sed risus est, lobortis sed varius quis, suscipit vitae purus.',
        tags: 'imperdiet lorem facilisis pellentesque',
        status: 'Inactive',
        date: new Date(2010, 5, 12)
    }, {
        id: 11,
        title: 'Vivamus nec auctor eros.',
        author: 'Sed Nullam',
        text: 'Sed viverra felis eu hendrerit pulvinar. Proin ac nunc nisl. Nullam vel pretium odio. Vivamus nec auctor eros. Donec dictum luctus mauris. In hac habitasse platea dictumst. Etiam sit amet nisi tellus. Phasellus blandit ante quis odio sollicitudin, sit amet tempor lacus tempor. Pellentesque congue lectus sed dui gravida, condimentum.',
        tags: 'viverra felis',
        status: 'Active',
        date: new Date(2011, 5, 12)
    }, {
        id: 12,
        title: 'Sed at pellentesque tellus',
        author: 'Aenean Orci',
        text: 'Sed at pellentesque tellus. Aenean rhoncus nec purus vitae eleifend. Ut suscipit dictum dolor scelerisque luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In at dapibus ex. Integer ac mollis purus. Etiam feugiat ipsum in eros sagittis fringilla. Vestibulum iaculis risus fringilla condimentum molestie. Nulla ullamcorper leo gravida turpis aliquam vehicula non non odio. Sed elementum lacus id neque laoreet posuere. Aliquam pretium nisi massa, in consectetur magna sagittis sed. Curabitur commodo imperdiet sapien, vitae aliquam magna rutrum nec. Phasellus lobortis eros at tincidunt vulputate. Morbi pulvinar, augue a commodo elementum, sapien ipsum congue orci, nec sollicitudin sapien velit a leo. Suspendisse pulvinar mi finibus elit condimentum congue. Morbi dignissim euismod nulla. Ut finibus ornare neque. Nam euismod imperdiet dolor, ut vehicula nibh. Donec ornare non quam eu rutrum. Aliquam ac lacus eget dui molestie tempus ut sit amet augue. Ut eget ultricies est. Duis porta semper enim. Nam viverra rutrum risus tincidunt finibus. Integer faucibus volutpat metus ac mattis. Nam placerat nulla elit, nec luctus mauris venenatis et. Nullam mauris elit, luctus vel vulputate at, vestibulum a velit. Suspendisse tellus est, porttitor ut odio in, fermentum dictum felis. Morbi diam erat, accumsan ut eleifend.',
        tags: 'pellentesque tellus eleifend',
        status: 'Active',
        date: new Date(1998, 5, 12)
    }, {
        id: 13,
        title: 'Vestibulum dictum eu lacus.',
        author: 'Fusce Vestibulum',
        text: 'Vestibulum tempus erat at laoreet bibendum. Fusce egestas magna non arcu convallis, non eleifend sem placerat. Vestibulum dictum eu lacus.',
        tags: 'lacus tempus erat',
        status: 'Active',
        date: new Date(2017, 0, 12)
    }, {
        id: 14,
        title: 'Pellentesque fermentum dolor',
        author: 'Pellentesque',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus',
        tags: 'javascript react bootstrap',
        status: 'Active',
        date: new Date(1991, 4, 12)
    }
]