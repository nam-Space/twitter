import React, { useEffect, useRef } from "react";
import userError from "../../assets/images/userError.png";

import "../../sass/img.scss";

const Img = ({ url, alt, className }) => {
    const imgRef = useRef();

    useEffect(() => {
        handleImage();
    }, [imgRef, url]);

    const handleImage = () => {
        if (url) {
            imgRef.current.src = url;
        } else {
            imgRef.current.src = userError;
        }
    };

    return <img className={className} ref={imgRef} src={url} alt={alt} />;
};

export default Img;
