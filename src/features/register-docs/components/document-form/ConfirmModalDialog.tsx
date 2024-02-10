import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useConfirmModal } from "../../hooks";
import { Button, Col, Flex, Modal } from "antd";
import './style.scss';
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { DOC_COMMENT, DOC_NAME } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { RegdocFetchById } from "../../thunks";
import { ID } from "../../../../common/models";

export const ConfirmModalDialog: FC<{ id: ID }> = ({ id }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<"approved" | "rejected" | null>(null);
    const { data: doc } = useAppSelector(state => state.registerDoc)
    const formRef = useRef<any>();
    const dispatch = useAppDispatch()
    const showModal = (value: "approved" | "rejected") => {
        setOpen(true);
        setStatus(value);
    }

    const { onSuccess, setValue, isSubmitting, contextHolder, control, handleCheckDoc } = useConfirmModal();

    useEffect(() => {
        if (onSuccess) {
            setOpen(false);
            setStatus(null);
            dispatch(RegdocFetchById(id))
        }
    }, [onSuccess]);

    useEffect(() => {
        setValue('status', status);
    }, [status]);

    useEffect(() => {
        if (doc) {
            setValue('id', doc.id);
            setValue('name', doc.name);
        }
    }, [doc]);



    const handleOk = (e: FormEvent) => {
        e.stopPropagation();


        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    };

    const handleCancel = (e: FormEvent) => {
        e.stopPropagation();
        setStatus(null);
        setOpen(false);
        setValue('comment', "");
        setValue('name', "");
    };

    return (
        <div className="document-form">
            <Flex justify="end">
                <Col span={4}>
                    <Button danger className="submit-btn danger" onClick={() => showModal('rejected')}>{t('cancel')}</Button>
                </Col>
                <Col>
                    <Button type="primary" className="submit-btn" onClick={() => showModal('approved')}>{t('save')}</Button>
                </Col>
            </Flex>
            <Modal
                title={t('confirm')}
                open={open}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        {t('close')}
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isSubmitting}
                        onClick={handleOk}
                    >
                        {t('save')}
                    </Button>
                ]}
            >
                <form className="buttons-container" ref={formRef} onSubmit={handleCheckDoc}>
                    {
                        status === 'approved' ? (
                            <TextFieldController
                                control={control}
                                name={DOC_NAME}
                                label={t('title')}
                                placeholder={t("title")}
                            />) : (
                            <TextFieldController
                                inputCompound="TextArea"
                                control={control}
                                name={DOC_COMMENT}
                                label={t('reject-commit')}
                                placeholder={t("reject-commit")}
                            />
                        )
                    }
                    {contextHolder}
                </form>
            </Modal>

        </div>
    )
}