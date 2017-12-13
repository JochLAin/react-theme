'use strict';

module.exports.slugify = text => {
    text = text.replace(/~[^\pL\d]+~u/, '-');
    text = text.replace(/~[^-\w]+~/, '');
    text = text.trim('-');
    text = text.replace(/~-+~/, '-');
    text = text.toLowerCase();
    return text;
};
