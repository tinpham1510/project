import React from 'react';
import * as ReactBoostrap from 'react-bootstrap';
function Loading(props) {
    return (
        <div>
             <ReactBoostrap.Spinner animation="grow" >
            <div>
            <span className="sr-only">Loading...</span>
            </div>
     </ReactBoostrap.Spinner>
        </div>
    );
}

export default Loading;