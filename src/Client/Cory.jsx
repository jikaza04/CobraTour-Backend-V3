import React, { useEffect } from 'react';

function Cory() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
        script.async = true;
        script.type = 'module';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <zapier-interfaces-chatbot-embed 
                is-popup='true' 
                chatbot-id='cm7sstze8000tivebfpax0y8v'>
            </zapier-interfaces-chatbot-embed>
        </div>
    );
}

export default Cory;