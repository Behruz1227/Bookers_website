interface LineProps {
    className?: string;
    opacity?: number;
  }
  
  export function Line({ 
    className = "", 
    opacity = 0.2 
  }: LineProps) {
    return (
      <div 
        className={`w-full my-10 md:px-6 lg:px-8 ${className}`}
        role="separator"
      >
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#B9B9C9',
            opacity: opacity,
          }}
        />
      </div>
    );
  }
  
  