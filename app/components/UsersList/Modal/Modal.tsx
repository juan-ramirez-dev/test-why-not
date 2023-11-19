'use client';

import React, { useState, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import CustomInput from '@/app/components/CustomInput/CustomInput';
import CustomButton from '@/app/components/CustomButton/CustomButton';
import { UserState } from '@/app/redux/features/userSlice';

import style from './Modal.module.css';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserState,) => void;
  initialData?: UserState | null; // Datos iniciales para la edición
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialData }) => {

  const [UserData, setIUserData] = useState<UserState>(
    initialData || { name: '',  email: '' }
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(UserData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      {ReactDOM.createPortal( 
        <div className={style.modalOverlay}>
          <div className={style.Modal}>
            <h2>Edit User</h2>
            <CustomInput
              type="text"
              name="name"
              value={UserData.name}
              onChange={handleInputChange}
              label='Title'
            />
            <CustomInput
              type="email"
              name="email"
              value={UserData.email}
              onChange={handleInputChange}
              label='Email'
            />
            <div className={style.modalButtons}>
              <CustomButton 
                text='Cancelar'
                onClick={onClose}
                className={style.cancelButton}
              />
              <CustomButton 
                text='Update'
                onClick={handleSave}
              />
            </div>
          </div>
        </div>,
      document.body)}
    </div>
  )

};
export default Modal;