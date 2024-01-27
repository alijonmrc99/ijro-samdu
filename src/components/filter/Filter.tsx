import { FC, useContext, useEffect, useRef, useState } from "react";
import { FilterContext, IFilter, IInnerFilter } from "../../common/contexts/filter.context";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Col, DatePicker, Input, Row } from "antd";
import './sytle.scss';
import { SearchOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { formatDate } from "../../common/utils/functions";
import { useForm } from "react-hook-form";
import { TextFieldController } from "../../common/inputs/text-feild-controller";
import { DatePickerController } from "../../common/inputs/datepicker-controller";

export const Filter: FC = () => {
    const { filter, setFilter } = useContext(FilterContext) as IFilter;
    const { t } = useTranslation();
    const [filterObj, setFilterObj] = useState<IInnerFilter>({});
    const [inputsName, setInputsName] = useState({ name: "lke", title: "lke" });
    const [dates, setDates] = useState<{ startDate: any, endDate: any }>({ startDate: null, endDate: null });
    const defaultValues: IInnerFilter = {
        title: {
            lke: ""
        },
        name: {
            lke: ""
        },
        createdAt: {
            lke: ""
        }
    }

    const { control, setValue, handleSubmit, reset } = useForm<IInnerFilter>({
        defaultValues: defaultValues,
    })

    const onChange = (value: any) => {
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
            setFilterObj({
                ...filterObj,
                createdAt: {
                    bt: `${formatDate(dates.startDate)}|${formatDate(dates.endDate)}`
                }
            })
        } else if (dates.startDate || dates.endDate) {
            setFilterObj({
                ...filterObj,
                createdAt: {
                    lke: `${formatDate(dates.startDate || dates.endDate)}`
                }
            })
        } else {
            setFilterObj({
                ...filterObj,
                createdAt: {
                    lke: ""
                }
            })
        }


    }, [dates])


    // const handleSubmit = () => {
    //     setFilterObj({ ...filter, ...filterObj })

    //     Object.entries(filterObj).map(([k, v]: [string, any]) => {
    //         console.log(Object.values(v)[0]);
    //         if (Object.values(v)[0].length === 0) {
    //             delete filterObj[k];
    //         }
    //     });

    //     setFilter({
    //         ...filterObj
    //     })
    // }



    return (
        <form onSubmit={handleSubmit((val) => console.log(val))}>
            <Row className="filter-content">
                <Col xs={24} sm={12} xl={7} className="input-filter">
                    <div className="filter-label">{t('name')}:</div>
                    <div>
                        <Input
                            title="name"
                            placeholder={t('name')}
                            name={inputsName.name}
                            onChange={onChange} />
                        <TextFieldController
                            control={control}
                            name="name.lke"
                            placeholder={t('name')}
                            onChange={onChange}
                        />
                        {/* <Checkbox
                        title="name"
                        name="name"
                        onChange={checkEqual}>
                        <div className="filter-label">{t('equal')}</div>
                    </Checkbox> */}
                    </div>
                </Col>
                <Col xs={24} sm={12} xl={7} className="input-filter">
                    <div className="filter-label">{t('title')}:</div>
                    <div>
                        <TextFieldController
                            control={control}
                            name="title.lke"
                            placeholder={t('title')}
                            onChange={onChange}
                        />
                        <Input
                            title="title"
                            placeholder={t('title')}
                            name={inputsName.title}
                            onChange={onChange} />
                        {/* <Checkbox
                        onChange={checkEqual}
                        name="title" >
                        <div className="filter-label">{t('equal')}</div>
                    </Checkbox> */}
                    </div>
                </Col>

                <Col xs={24} sm={12} xl={7} className="input-filter">
                    <div className="filter-label">{t('date')}:</div>
                    {/* <div> */}
                    <DatePickerController
                        setValue={setValue}
                        control={control}
                        placeholder={t('date')}
                        name="createdAt.lke"
                    // onChange={(date) => setDates({ ...dates, startDate: date })}
                    />
                    {/* <DatePicker
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
                    /> */}
                    {/* <Checkbox ><div className="filter-label">{t('equal')}</div></Checkbox> */}
                    {/* </div> */}
                </Col>
                <Col xs={24} sm={12} xl={3} >
                    <Button
                        htmlType="submit"
                        style={{ width: "100%" }} type="primary"><SearchOutlined />{t('search')}</Button>
                    <Button
                        htmlType="reset"
                        onClick={() => reset()}
                        style={{ width: "100%" }} type="primary"><SearchOutlined />{t('search')}</Button>
                </Col>

            </Row>
        </form>
    )
}