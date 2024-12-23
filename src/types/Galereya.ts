export interface ImageProps {
    id?: number;
    url?: string;
    title?: string;
    width?: number;
    height?: number;
    alt?: string;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
    name?: string;
}