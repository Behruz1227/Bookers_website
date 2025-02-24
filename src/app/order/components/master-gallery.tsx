import React from "react";
import {Image, Spin} from 'antd'
import {BASE_URL} from "@/helpers/Url.tsx";

export interface IMasterGallery {
    id: number
    albumName: string
    date: string
    photos: null | string
    mainPhotos: null | string
    resGalleryAttachments: IGallery[]
}

export interface IGallery {
    attachmentId: string
    attachmentStatus: string
    message: null | string
    newStatus: boolean
    main: boolean
}

const MasterGallery: React.FC<IMasterGallery> = (props) => {
    return (
        <div className={'rounded-xl p-5 shadow-[4px_4px_4px_0px_#00000040] border border-[#353535]'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-5'}>
                {props.resGalleryAttachments.map((item, index) => (
                    <Image
                        key={index}
                        src={BASE_URL + '/api/attachment/getFile/' + item.attachmentId}
                        alt={item.message || item.attachmentId}
                        placeholder={
                            <div className="flex items-center justify-center h-full w-full">
                                <Spin size="large"/>
                            </div>
                        }
                        height={400}
                        className={'object-cover'}
                    />
                ))}
            </div>
        </div>
    );
};

export default MasterGallery;