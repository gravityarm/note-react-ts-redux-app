import React, { useCallback, useEffect } from 'react';
import './Modal.css';
export const Modal = ({ children, isOpen, onClose }: any) => {
  const handleEscapeDown = useCallback(
    ({ key }: any) => {
      if (key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayCheck = ({ target }: any) => {
    if (target.className === 'modal') {
      onClose();
    }
  };

  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    document.addEventListener('keydown', handleEscapeDown);

    return () => {
      document.documentElement.style.overflowY = '';
      document.removeEventListener('keydown', handleEscapeDown);
    };
  }, [handleEscapeDown]);

  return (
    <>
      {isOpen && (
        <div className="modal" onClick={handleOverlayCheck}>
          {children}
        </div>
      )}
    </>
  );
};
