import { Pagination, PaginationProps } from "antd";
import { FC } from "react";
import './styles.scss';

interface IPagination {
    onChange: (value: any) => void,
    total: number,
    pageSize: number,
    defaultcurrent: number
};

export const defaultPaginationData = { page: 1, pageSize: 30 };

export const MainPagination: FC<IPagination> = ({ onChange,
    total = 1, pageSize: perPage = defaultPaginationData.pageSize, defaultcurrent = 1 }) => {
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Prev</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    return <div className="main-pagination">
        <Pagination
            onChange={(page, pageSize) => onChange({ pageSize, page: page })}
            pageSize={perPage}
            defaultCurrent={defaultcurrent}
            total={total || 0}
            showTotal={(tatal, range) => `${range[0]} - ${range[1]} on ${tatal}`}
            itemRender={itemRender}
        />
    </div>
}