export const Paging = (page: any, totalPost: number) => {
  const maxPost = 10;
  const maxPage = 10;
  let currentPage = page ? parseInt(page) : 1;
  const offset = page === 1 ? 0 : maxPost * (page - 1);
  const totalPage = Math.ceil(totalPost / maxPost);

  if (currentPage > totalPage) {
    currentPage = totalPage;
  }

  const startPage = Math.floor((currentPage - 1) / maxPage) * maxPage + 1;
  let endPage = startPage + maxPage - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
  }

  return { startPage, endPage, offset, maxPost, totalPage, currentPage };
};
