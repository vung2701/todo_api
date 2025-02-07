export function paginate(array, page_size, page_number, sort) {
    // Xác định thứ tự sắp xếp
    let descending = false;
    if (sort && sort.startsWith('-')) {
        descending = true;
        sort = sort.substring(1);
    }

    // Sắp xếp mảng theo field chỉ định
    if (sort) {
        array = [...array].sort((a, b) => {
            if (a[sort] < b[sort]) return descending ? 1 : -1;
            if (a[sort] > b[sort]) return descending ? -1 : 1;
            return 0;
        });
    }
    
    let totalItems = array.length;
    let totalPages = Math.ceil(totalItems / page_size);
    let from = (page_number - 1) * page_size + 1;
    let to = Math.min(page_number * page_size, totalItems);
    let items = array.slice(from - 1, to);
    
    return {
        items,
        totalItems,
        totalPages,
		currenPage: page_number,
		perPage: page_size,
        from,
        to
    };
}
