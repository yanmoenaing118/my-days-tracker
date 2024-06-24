const ReusableModal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal relative">
        <div className="modal-header ">
          <button
            className="modal-close-btn absolute top-1 right-2"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ReusableModal;
