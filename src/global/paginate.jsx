import _ from 'lodash';

const paginate = (items, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage;
    return _(items)
        .slice(startIndex)
        .take(perPage)
        .value();
};
export default paginate
