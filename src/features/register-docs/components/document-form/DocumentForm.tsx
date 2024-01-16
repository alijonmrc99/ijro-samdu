import { Button, Modal } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { TextFieldController } from "../../../../common/inputs/text-feild-controller";
import { useRegisterForm } from "../../hooks";
import { DOC_COMMIT, DOC_NAME } from "../../constants";

export const ConfirmModalDialog: FC = () => {
    const { t } = useTranslation();
    // const [open, setOpen] = useState(false);
    const { data: doc } = useAppSelector(state => state.registerDoc)
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<{ action: "rejected" | "approved" | null, isOpen: boolean }>({ action: null, isOpen: false });
    const { data, isLoading } = useAppSelector(state => state.registerDoc)
    const formRef = useRef<any>();

    // const showModal = (event: any) => {
    //     setOpen(true);
    //     event.stopPropagation();
    // };


    const { control, handleCompanyForm, setValue, isSubmitting, onSuccess } = useRegisterForm();

    useEffect(() => {
        if (onSuccess) {
            setOpen((state) => ({ ...state, isOpen: false }));

        }
    }, [onSuccess, dispatch])

    useEffect(() => {
        if (doc) {
            setValue('name', doc.name);
            setValue('id', doc.id)
        }
    }, [data, setValue])

    const handleOk = (e: FormEvent) => {
        e.stopPropagation();
        setValue('status', open.action)
        formRef?.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    };

    const handleCancel = (e: FormEvent) => {
        e.stopPropagation();
        setOpen((state) => ({ ...state, isOpen: false }))
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            {/* <Button type="primary" onClick={showModal} icon={<ShoppingCartOutlined />}>
            </Button> */}
            <Button onClick={() => setOpen({ action: "approved", isOpen: true })} disabled={isLoading} className="submit-btn" type="primary" >
                {t('confirm')}
            </Button>
            <Button onClick={() => setOpen({ action: "rejected", isOpen: true })} disabled={isLoading} className="submit-btn danger"  >
                {t('cancel')}
            </Button>
            <Modal
                open={open.isOpen}
                title={t('confirm')}
                onOk={handleOk}
                onCancel={handleCancel}
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
                <form ref={formRef} onSubmit={handleCompanyForm} className="form-container" style={{ height: 'auto' }}>
                    <div>
                        {
                            open.action === "approved" ? <TextFieldController
                                placeholder={t('enter_value') || ""}
                                name={DOC_NAME}
                                label={t('title') || ""}
                                control={control}
                            /> : <TextFieldController
                                inputCompound={'TextArea'}
                                rows={3}
                                control={control}
                                placeholder={t('enter_value') || ""}
                                name={DOC_COMMIT}
                                label={t('reject-commit') || ""}
                            />
                        }


                    </div>
                </form>
            </Modal>
        </div>
    );
};
