import { Avatar, Spin } from "antd";
import { useEffect, useState } from "react";

const LoadingAvatar = ({ src, spinStyle, ...props }) => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const image = new Image();
      image.src = src;
      image.onload = () => setLoading(false);
    }, [src]);
  
    if (loading) {
      return <Spin size='large' style={spinStyle} />;
    }
  
    return <Avatar src={src} {...props} />
};

export default LoadingAvatar;