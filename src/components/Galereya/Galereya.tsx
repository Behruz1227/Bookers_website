import React from 'react';
import { Image } from 'antd';
import { ImageProps } from '../../types/Galereya';

// ImageProps interfeysi, props sifatida qabul qilinadigan ma'lumotlar

// Galereya komponenti, imgData tashqaridan prop sifatida keladi
interface GalereyaProps {
    imgData: ImageProps[];
    name?: string;
}
export const Galereya: React.FC<GalereyaProps> = ({ imgData, name }) => {
    // imgData bo'lsa, uni ishlatamiz, aks holda '' qaytaramiz
    const images = imgData.length > 0 ? imgData : '';

    const style: React.CSSProperties = {
        width: '100%',
        height: 'auto',
        aspectRatio: '1 / 1',
        borderRadius: '16px'
    };
    // images bo'lmasa null qaytaramiz
    if(images === '') return null
    return (
        <div className='bg-[#111827 my-10'>
            <div className=' border border-[#353535] shadow-[5px_5px_5px_0px_#000111] rounded-[20px] py-8 px-6 '>
                <h2 className="text-2xl font-bold text-white pb-8">{name}</h2>
                <div className='grid lg:grid-cols-2 grid-cols-1 justify-center gap-6'>
                    {images && images.map(image => (
                        <Image
                            key={image.id}
                            style={style}
                            alt={image.title}
                            src={image.url}
                            preview={{ mask: null }}  // Ko‘zcha tugmasini yashirish
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


// ishlatish qo'lanmasi


// imgData ga rasm obj data yuborasiz

{/* <Galereya name="Капсульное наращивание волос" imgData={[{
    id: 1,
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    title: '1'
},
{
    id: 2,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1LcwTW44kfdUu-JXmRbe_Xc4DU-1tt5p0Q&s',
    title: '2'
},
{
    id: 3,
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    title: '3'
},
{
    id: 4,
    url: 'https://st3.depositphotos.com/7531416/33179/i/450/depositphotos_331791150-stock-photo-rose-isolated-white-background.jpg',
    title: '4'
},]} /> */}