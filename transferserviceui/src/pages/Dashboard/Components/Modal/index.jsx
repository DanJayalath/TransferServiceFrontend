// src/components/Modal/index.jsx
export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button onClick={onClose} className="float-right">
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }