const links = [
    { href: '/', text: 'Home' },
    { href: '/brands', text: 'Brands' },
    { href: '/categories', text: 'Categories' },
    { href: '/items', text: 'All Items' },
    { href: '/brands/new', text: 'Create Brand' },
    { href: '/categories/new', text: 'Create Category' },
    { href: '/items/new', text: 'Create Item' }
];

function checkPassword(password) {
    if (password === process.env.PASSWORD) return true;
}

module.exports = {
    links,
    checkPassword
}