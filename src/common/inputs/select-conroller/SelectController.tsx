import { Select, SelectProps, Space } from "antd";
import { FC } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ID } from "../../models";
export type SelectContreollerProps = SelectProps & {
    control: Control<any>,
    name: string,
    items: { value: ID, label: string }[],
    label?: string,
    setValue: UseFormSetValue<any>
}
const { Option } = Select
export const SelectContreoller: FC<SelectContreollerProps> = ({
    control,
    name,
    setValue,
    items,
    defaultValue,
    label,
    ...props
}) => {
    const { t } = useTranslation()
    const onChange = (value: any) => {
        setValue(name, value)
    }
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { name, ...feildProps }, fieldState: { error } }) => (
                <Space style={{ width: "100%" }} size={'small'} direction="vertical">
                    {label && <label className="controller-label">{label}</label>}
                    <Select
                        {...feildProps}
                        onChange={onChange}
                        {...props}>
                        {items.map((option) => <Option key={option.value} value={option.value}>{t(option.label)}</Option>)}
                    </Select>
                    <small style={{ color: "red" }}>{error?.message ? t(error.message) : null}</small>
                </Space >
            )}
        />
    )
}