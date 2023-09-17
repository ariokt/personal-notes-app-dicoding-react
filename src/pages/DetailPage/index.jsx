import React, { useContext, useEffect, useState } from 'react';
import { archiveNote, getNote, unarchiveNote } from '../../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace, MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import LocaleContext from '../../contexts/LocaleContext';


const DetailPage = () => {
    const { id } = useParams();
    const { contextTheme } = useContext(LocaleContext);
    const navigate = new useNavigate();
    const [detailNote, setDetailNote] = useState('');
    console.log(detailNote)
    

    useEffect(() => {
      const getDetail = async () => {
        const response = await getNote(id);
        if (!response.error) {
          setDetailNote(response.data);
        } else {
          navigate(-1);
        }
      }
      getDetail();
    }, [])

    const handleArchive = async (id) => {
      const response = await archiveNote(id);
      if (response.error === false) {
        const noteDetail = await getNote(id);
        setDetailNote(noteDetail.data);
      }
    }
  
    const handleUnarchive = async (id) => {
      const response = await unarchiveNote(id);
      if (response.error === false) {
        const noteDetail = await getNote(id);
        setDetailNote(noteDetail.data);
      }
    }

    return (
      <>
        <header className='notes-app__header d-flex align-items-center gap-2'>
            <a onClick={!detailNote.archived ? () => navigate('/') : () => navigate('/archived-note')}><MdKeyboardBackspace className={contextTheme.theme === 'dark' ? 'text-white' : 'text-dark'} size={32} /></a>
            <div className='mb-0'>Detail</div>
        </header>
        <main>
            <div className='d-flex align-items-center gap-2'>
              <h1 className='m-0 p-0 w-fit'>{detailNote.title}</h1>
              {detailNote.archived ? <MdOutlineUnarchive fontSize={28} onClick={() => handleUnarchive(id)} /> : <MdOutlineArchive fontSize={28} onClick={() => handleArchive(id)} />}
            </div>
            <p>{detailNote.body}</p>
        </main>
      </>
      )
}

export default DetailPage