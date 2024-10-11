import React, { useEffect } from 'react';

const ConsentRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://forms.gle/iZPXAdRd2hTA9tDc9';
  }, []);

  return <div>Redirecting to consent form...</div>;
};

export default ConsentRedirect;