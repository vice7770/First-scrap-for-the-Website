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


export const SITE_URL = 'https://astro-blog.netlify.app';

export const partners : Partner[] = [
    {
        id: 1,
        name: 'Tbilisi Shop',
        logo: '/images/astro.png',
        x: 67,
        y: 53,
    },
    {
        id: 2,
        name: 'Kakheti Shop',
        logo: '/images/blog.png',
        x: 75,
        y: 45,
    },
    {
        id: 3,
        name: 'Batumi Shop',
        logo: '/images/netlify.png',
        x: 27,
        y: 49
    }
];
