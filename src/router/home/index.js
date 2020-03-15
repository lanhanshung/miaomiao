export default {
    path: '/home',
    component: () => import('@/views/home'),
    children: [{
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: '/home',
            name: "nowPlaying",
            redirect: "/home/nowPlaying"
        },
    ]
}