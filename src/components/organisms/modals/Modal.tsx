import React, {useEffect} from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [onClose])

    if (!isOpen) return null

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-dark-purple rounded-lg shadow-lg w-1/3 p-6 relative transform transition-transform duration-300 scale-105 hover:scale-110">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-purple-400 text-2xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal