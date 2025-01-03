import React from 'react';
import { Card, Avatar } from 'antd';
import line from "../../assets/cards/Rectangle.svg";

interface TestimonialCardProps {
  avatarUrl: string;
  content: string;
  author: string;
  company: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  avatarUrl,
  content,
  author,
  company
}) => {
  return (
    <Card
      className="max-w-md  py-5 rounded-3xl shadow-lg  bg-[#B9B9C9] border-none"
    >
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="relative mb-3">
            <Avatar
              src={avatarUrl}
              size={48}
              className="shadow-sm "
            />
            <div className="absolute -top-1 -right-1">
              <svg
                width="24"
                height="19"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6603 6.23453C14.3756 8.74324 13.7332 11.1708 13.7332 13.5172V14.2552C13.7332 16.3498 15.4312 18.0479 17.5259 18.0479C19.6205 18.0479 21.3185 16.3498 21.3185 14.2552V13.4049C21.3185 11.4329 21.6465 9.57947 22.3026 7.84459C22.6214 7.00155 23.0208 6.16294 23.501 5.32875C24.349 3.8555 24.0304 1.91128 22.5858 1.01525C21.5973 0.402079 20.3196 0.435653 19.4616 1.22112C17.913 2.63884 16.6459 4.30997 15.6603 6.23453ZM1.99544 6.23454C0.710714 8.74325 0.0683594 11.1708 0.0683594 13.5172V14.2552C0.0683594 16.3498 1.76639 18.0479 3.86102 18.0479C5.95565 18.0479 7.65369 16.3498 7.65369 14.2552V13.4049C7.65369 11.4329 7.9817 9.57947 8.63773 7.8446C8.95652 7.00156 9.35599 6.16295 9.83614 5.32875C10.6841 3.8555 10.3655 1.91128 8.921 1.01525C7.93249 0.402083 6.65475 0.435657 5.79675 1.22113C4.24812 2.63885 2.98103 4.30997 1.99544 6.23454Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6603 6.23453C14.3756 8.74324 13.7332 11.1708 13.7332 13.5172V14.2552C13.7332 16.3498 15.4312 18.0479 17.5259 18.0479C19.6205 18.0479 21.3185 16.3498 21.3185 14.2552V13.4049C21.3185 11.4329 21.6465 9.57947 22.3026 7.84459C22.6214 7.00155 23.0208 6.16294 23.501 5.32875C24.349 3.8555 24.0304 1.91128 22.5858 1.01525C21.5973 0.402079 20.3196 0.435653 19.4616 1.22112C17.913 2.63884 16.6459 4.30997 15.6603 6.23453ZM1.99544 6.23454C0.710714 8.74325 0.0683594 11.1708 0.0683594 13.5172V14.2552C0.0683594 16.3498 1.76639 18.0479 3.86102 18.0479C5.95565 18.0479 7.65369 16.3498 7.65369 14.2552V13.4049C7.65369 11.4329 7.9817 9.57947 8.63773 7.8446C8.95652 7.00156 9.35599 6.16295 9.83614 5.32875C10.6841 3.8555 10.3655 1.91128 8.921 1.01525C7.93249 0.402083 6.65475 0.435657 5.79675 1.22113C4.24812 2.63885 2.98103 4.30997 1.99544 6.23454Z"
                  fill="#9C0B35"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <p
            className="mt-2  text-black text-[18px] font-manrope tracking-[-0.25px] leading-[27px] font-normal"

          >
            {content}
          </p>
          <div className="py-5">
            <img src={line} alt="line" />
          </div>
        </div>
        <div
          className="flex items-center gap-2 text-black text-[16px] leading-[24px] font-medium "
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <span className='font-manrope font-medium text-[16px] leading-[24px] tracking-[-0.25px]'>{author}</span>
          <span>/</span>
          <span className='text-[#9C0B35] font-manrope font-medium text-[16px] leading-[24px] tracking-[-0.25px]'>{company}</span>
        </div>
      </div>
    </Card>
  );
};

