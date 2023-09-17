import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem';

function NotesList({ notes, handleDelete, handleUnarchive, handleArchive }) {
  return (
    <div className="notes-list">
      { notes.length > 0 ?
        notes.map((note) => {
        if (note.archived) {
          return (
            <NoteItem 
              key={note.id}
              handleDelete={handleDelete}
              handleUnarchive={handleUnarchive}
              {...note}
            />
          )
        } else {
          return (
            <NoteItem 
              key={note.id}
              handleDelete={handleDelete}
              handleArchive={handleArchive}
              {...note}
            />
          )
        }}
        )
        :
        <h2 className='fs-5'>
            Data Tidak Ditemukan
        </h2>
      }
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUnarchive: PropTypes.func,
  handleArchive: PropTypes.func,
}

export default NotesList;