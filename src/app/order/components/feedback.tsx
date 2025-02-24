import {Carousel, Card, Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useGlobalRequest} from "@/helpers/Quary/quary.tsx";
import {BASE_URL} from "@/helpers/Url.tsx";
import {useParams} from "react-router-dom";

const {Meta} = Card;

const Feedback = () => {
    const {id} = useParams<string>()
    const [slidesToShow, setSlidesToShow] = useState<number>(3);
    const [page, setPage] = useState<number>(0)

    const {
        response,
        globalDataFunc
    } = useGlobalRequest(BASE_URL + `/api/leave/feedback/one/master?page=${page}&size=10&masterId=${id}`, 'GET')

    useEffect(() => {
        globalDataFunc().then(() => "")

        const updateSlidesToShow = () => {
            const width = window.innerWidth;
            if (width >= 991) setSlidesToShow(3);
            else if (width >= 600) setSlidesToShow(2);
            else setSlidesToShow(1);
        };

        updateSlidesToShow();
        window.addEventListener("resize", updateSlidesToShow);
        return () => window.removeEventListener("resize", updateSlidesToShow);
    }, [globalDataFunc]);

    useEffect(() => {
        globalDataFunc().then(() => "")
    }, [globalDataFunc, page]);

    const handleAfterChange = (current: number) => {
        const totalElements = response?.body?.totalElements || 0;
        const totalPages = Math.ceil(totalElements / 10);
        const maxSlides = totalElements - slidesToShow;

        if (current >= maxSlides) {
            if (page + 1 >= totalPages) setPage(0);
            else setPage(prev => prev + 1);
        }
    };

    return (
        <Carousel
            autoplay
            autoplaySpeed={4000}
            dots={false}
            slidesToShow={slidesToShow}
            afterChange={handleAfterChange}
        >
            {response?.body?.object?.length > 0 ? response?.body?.object.map((item: any) => (
                <div key={item.id} className="p-2">
                    <Card
                        className="shadow-lg rounded-2xl bg-[#E2E2E2] dark:bg-[#25232D] border-none"
                        cover={
                            <div className="flex items-center p-4">
                                <Avatar
                                    size={50}
                                    src={BASE_URL + '/api/attachment/getFile/' + item.clientAttachmentId}
                                    icon={<UserOutlined/>}
                                />
                                <span className="text-red-500 text-3xl ml-3">“</span>
                            </div>
                        }
                    >
                        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                            {item.text}
                        </p>
                        <div className="border-b border-red-400 my-4 w-full"></div>
                        <Meta
                            title={item.masterName}
                            description={item.salonName}
                            className="text-gray-500 text-sm flex-row"
                        />
                    </Card>
                </div>
            )) : null}
        </Carousel>
    );
};

export default Feedback;
