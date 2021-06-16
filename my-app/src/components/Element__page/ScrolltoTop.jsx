import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowScroll } from 'react-use';
import './ScrolltoTop.css';
ScrolltoTop.propTypes = {
    
};
function ScrolltoTop(props) {
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisiblity] = useState(false)
    useEffect(()=>{
        if(pageYOffset > 400){
          setVisiblity(true);
        }
        else{
          setVisiblity(false);
        }
       
     },[pageYOffset])
    
     const scrollToTop = ()=>window.scrollTo({ top:0, behavior:"smooth"})
    
     if(!visible){
       return false;
     }
    return (
        <div className="scroll-to-top text-center"
        onClick={scrollToTop}
      >
        <i className="icon fas fa-chevron-up"></i>

      </div>
    );
}

export default ScrolltoTop;