import _ from "lodash";
const paginate = (items, pageSize, pageIndex) => {
  const startIndex = (pageIndex - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
};

export default paginate;
