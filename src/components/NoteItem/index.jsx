import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever, MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import { showFormattedDate } from '../../utils';
import { Link } from 'react-router-dom';

function NoteItem({ id, title, createdAt, body, handleDelete, archived, handleArchive, handleUnarchive }) {
 return (
   <div className="note-item">
     <div className='d-flex justify-content-between'>
        <Link to={`/notes/${id}`} className='fs-5'>{title}</Link>
        <div className='d-flex'>
            <MdDeleteForever fontSize={28} onClick={() => handleDelete(id)}/>
            {archived ? <MdOutlineUnarchive fontSize={28} onClick={() => handleUnarchive(id)} /> : <MdOutlineArchive fontSize={28} onClick={() => handleArchive(id)} />}
        </div>
     </div>
     <div>{body}</div>
     <div>{'Created at: ' + showFormattedDate(createdAt)}</div>
   </div>
 );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  handleArchive: PropTypes.func,
  handleUnarchive: PropTypes.func,
}

export default NoteItem;