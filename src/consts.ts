// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export type Partner = {
    id: number;
    name: string;
    logo: string;
    x: number;
    y: number;
};

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const SITE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:4321' : import.meta.env.PROD_URL;;

// export const SITE_URL = 'http://localhost:4321';

export const partners : Partner[] = [
    {
        id: 0,
        name: 'Tbilisi Shop',
        logo: '/images/astro.png',
        x: 67,
        y: 53,
    },
    {
        id: 1,
        name: 'Kakheti Shop',
        logo: '/images/blog.png',
        x: 75,
        y: 45,
    },
    {
        id: 2,
        name: 'Batumi Shop',
        logo: '/images/netlify.png',
        x: 27,
        y: 49
    },
    {
        id: 3,
        name: 'Zugdidi Shop',
        logo: '/images/netlify.png',
        x: 27,
        y: 40
    }
];
