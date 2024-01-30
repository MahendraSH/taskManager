class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                title: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category and status 
        const removeFields = ["keyword", "page"];

        removeFields.forEach((key) => delete queryCopy[key]);

        this.query = this.query.find(queryCopy);

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 0;

        const skip = currentPage > 0 ? resultPerPage * (currentPage - 1) : 0;

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;