import { storeUserDetails } from "@/utils/AtomProviders";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { sendUserMessage, uploadImage } from "@/service/user";
import { MessageProp } from "@/types/service";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import VMPopup from "../General/Widget/VMPopup";
import { Alerter } from "../General/Alerter";
import TextInput from "../General/TextInput";
import FileUpload from "../General/FileUpload";

const SendMessage = ({ options }: { options: any }) => {
    const { onClose, meta } = options;
    const [_, setUserDetails] = useAtom(storeUserDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [attachment, setSelectedFile] = useState<File | any>(null);
    const [attachment_type, setAttachmentType] = useState<String | null>(null);  
    const [NotificateionAlert, setNotificateionAlert] = useState({
        isEnabled: false,
        message: "",
        type: "",
    });
    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { errors },
    } = useForm<MessageProp>({
        defaultValues: {
            message: '',
        },
    });

    const clearAlert = () => {
        setNotificateionAlert({
            isEnabled: false,
            message: "",
            type: "",
        });
    };

    const alertPreviewer = (
        AlStatus: boolean,
        AlStmt: string,
        AlType: string
    ) => {
        setNotificateionAlert({
            isEnabled: AlStatus,
            message: AlStmt,
            type: AlType,
        });
    };

    const onSubmit: SubmitHandler<MessageProp> = async (data) => {
        clearAlert();
      //  setIsLoading(true);
        console.log({
           
        })

        const formData = new FormData();
        formData.append('files', attachment, 'image');
      
        const attachmentString = attachment ? await uploadImage('image',formData) : null;
        console.log(attachmentString,'string')
        // const response: any = await sendUserMessage({
        //     message: data.message,
        //    // ...(attachmentString && {attachment: attachmentString}),
        //     ...(attachment_type && { attachment_type }),
        //     receiver_ids: [meta?.id]
        // });

        // console.log(response)
        // if (response?.status) {
        //     setIsLoading(false);
        //     alertPreviewer(true, "Message Sent Successfully", "success");
        // } else {
        //     setIsLoading(false);
        //     alertPreviewer(true, "An error occured. Please try again", "error");
        // }
    };


    const blobToString = (blob: Blob)=> {
        
    };

    const handleFileSelect = (file: File, attachmentType: String) => {
        setSelectedFile(file);
        setAttachmentType(attachmentType);
        console.log('Selected file:', file);
        console.log('Attachment type:', attachmentType);
    };

    return (
        <>
            {NotificateionAlert.isEnabled && (
                <Alerter
                    Alerttype={NotificateionAlert.type}
                    AlertStmt={NotificateionAlert.message}
                    AlertTimeout={5000}
                />
            )}
            <VMPopup
                title={`Send ${meta?.display_name} Message`}
                isClose={() => {
                    return onClose();
                }}
                size="4xl"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4">
                        <TextInput
                            isTextArea
                            type="text"
                            placeholder="message"
                            control={control}
                            label={"message"}
                            name="message"
                            id="message"
                            required={"message is required"}
                        />
                       

                    </div>
                   <div>
                      <FileUpload onFileSelect={handleFileSelect} />
                   </div>
                    <div className="mt-4">
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={isLoading}
                            style={{
                                height: 56,
                                outline: "none !important",
                            }}
                            className="w-full outline-none"
                        >
                            Send
                        </Button>
                    </div>
                </form>
            </VMPopup>
        </>
    );
};

export default SendMessage;
