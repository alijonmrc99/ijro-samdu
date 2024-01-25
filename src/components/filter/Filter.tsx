import { FC, useContext, useEffect, useRef, useState } from "react";
import { FilterContext, IFilter, IInnerFilter } from "../../common/contexts/filter.context";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Col, DatePicker, Input, Row } from "antd";
import './sytle.scss';
import { SearchOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { formatDate } from "../../common/utils/functions";

export const Filter: FC = () => {
    const { filter, setFilter } = useContext(FilterContext) as IFilter;
    const { t } = useTranslation();
    const [filterObj, setFilterObj] = useState<IInnerFilter>({});
    const [inputsName, setInputsName] = useState({ name: "lke", title: "lke" });
    const [dates, setDates] = useState<{ startDate: any, endDate: any }>({ startDate: null, endDate: null })

    const onChange = (value: React.FormEvent<HTMLInputElement>) => {
        setFilterObj({
            ...filterObj,
            [value.currentTarget.title]: {
                [value.currentTarget.name]: value.currentTarget.value
            }
        })
    }

    const checkEqual = (event: CheckboxChangeEvent) => {
        setInputsName({
            ...inputsName,
            [event.target.name || ""]: event.target.checked ? "eq" : "lke"
        })
    }

    const disabledEndDate = (endValue: any) => {
        const startValue = dates.startDate;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    useEffect(() => {
        if (dates.startDate && dates.endDate) {
            setFilter({
                ...filterObj,
                createdAt: {
                    bt: `${formatDate(dates.startDate)}|${formatDate(dates.endDate)}`
                }
            })
        } else if (dates.startDate || dates.endDate) {
            setFilter({
                ...filterObj,
                createdAt: {
                    eq: `${formatDate(dates.startDate || dates.endDate)}`
                }
            })
        }
    }, [dates])

    const handleSubmit = () => {
        setFilter({
            ...filter,
            ...filterObj
        })
    }



    return (
        <Row className="filter-content">
            <Col xs={24} sm={12} xl={7} className="input-filter">
                <div className="filter-label">{t('name')}:</div>
                <div>
                    <Input
                        title="name"
                        placeholder={t('name')}
                        name={inputsName.name}
                        onChange={onChange} />
                    <Checkbox
                        title="name"
                        name="name"
                        onChange={checkEqual}>
                        <div className="filter-label">{t('equal')}</div>
                    </Checkbox>
                </div>
            </Col>
            <Col xs={24} sm={12} xl={7} className="input-filter">
                <div className="filter-label">{t('title')}:</div>
                <div>
                    <Input
                        title="title"
                        placeholder={t('title')}
                        name={inputsName.title}
                        onChange={onChange} />
                    <Checkbox
                        onChange={checkEqual}
                        name="name" ><div className="filter-label">{t('equal')}</div></Checkbox></div>
            </Col>

            <Col xs={24} sm={12} xl={7} className="input-filter">
                <div className="filter-label">{t('date')}:</div>
                <div>
                    <DatePicker
                        style={{ width: "100%" }}
                        placeholder={t('date')}
                        name="date1"
                        onChange={(date) => setDates({ ...dates, startDate: date })}
                    />
                    <DatePicker
                        style={{ width: "100%" }}
                        placeholder={t('date')}
                        disabledDate={disabledEndDate}
                        name="date2"
                        onChange={(date) => setDates({ ...dates, endDate: date })}
                    />
                    {/* <Checkbox ><div className="filter-label">{t('equal')}</div></Checkbox> */}
                </div>
            </Col>
            <Col xs={24} sm={12} xl={3} >
                <Button
                    onClick={handleSubmit}
                    style={{ width: "100%" }} type="primary"><SearchOutlined />{t('search')}</Button>
            </Col>

        </Row>
    )
}