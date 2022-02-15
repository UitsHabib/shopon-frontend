import Pagination from './common/pagination.component';
import Table from './common/table.component';

const ShowShops = (props) => {
    const {
        items,
        columns,
        onSort,
        sortColumn,
        totalItems,
        pageCount,
        activePage,
        onClickPage,
    } = props;

    return (
        <>
            <div className="d-flex flex-wrap justify-content-around">
                <h5 className="my-3">Shop Table</h5>
                {/* incomplete */}
                <button className="my-3"> Add New Shop</button>
                {/* <Filter
                        items={shopCategories}
                        selectedCategory={selectedCategory}
                        onClickFilter={handleClickFilter}
                    /> */}
            </div>
            <div className="d-flex flex-wrap flex-column align-items-center">
                <div className="card" style={{ width: '75%' }}>
                    <div className="card-body">
                        <div className="d-flex flex-wrap flex-column align-items-center">
                            <Table
                                items={items}
                                columns={columns}
                                onSort={onSort}
                                sortColumn={sortColumn}
                            />
                            <Pagination
                                totalItems={totalItems}
                                pageCount={pageCount}
                                activePage={activePage}
                                onClickPage={onClickPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowShops;
