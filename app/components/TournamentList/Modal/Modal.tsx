'use client';

import React, { useState, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import CustomInput from '@/app/components/CustomInput/CustomInput';
import style from './Modal.module.css';
import CustomButton from '@/app/components/CustomButton/CustomButton';
import { ITournamentList } from '@/app/components/TournamentList/TournamentList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ITournamentList, isEditMode : boolean) => void;
  isEditMode: boolean; // Nueva prop para indicar el modo de edición
  initialData?: ITournamentList | null; // Datos iniciales para la edición
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, isEditMode, initialData }) => {

  const [ITournamentList, setITournamentList] = useState<ITournamentList>(
    initialData || { name: '', description: '' }
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setITournamentList((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(ITournamentList, isEditMode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      {ReactDOM.createPortal( 
        <div className={style.modalOverlay}>
          <div className={style.Modal}>
            <h2>{isEditMode ? 'Edit Tournament' : 'Create Tournament'}</h2>
            <CustomInput
              type="text"
              name="name"
              value={ITournamentList.name}
              onChange={handleInputChange}
              label='Title'
            />
            <CustomInput
              type="text"
              name="description"
              value={ITournamentList.description}
              onChange={handleInputChange}
              label='Description'
            />
            <div className={style.modalButtons}>
              <CustomButton 
                text='Cancelar'
                onClick={onClose}
                className={style.cancelButton}
              />
              <CustomButton 
                text={isEditMode ? 'Update' : 'Save'}
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