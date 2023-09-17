import React, { Component, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { addNote } from '../../utils/api';
import PropTypes from 'prop-types';
import LocaleContext from '../../contexts/LocaleContext';

const AddPageWrapper = () => {
  const navigate = useNavigate();
  const localeContext = useContext(LocaleContext);

  const handleAddNote = (note) => {
    addNote(note);
    navigate('/');
  }

  return (
    <AddPage handleAddNote={handleAddNote} localeContext={localeContext} />
  )
}

export class AddPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      contextLang: this.props.localeContext.contextLang,
      contextTheme: this.props.localeContext.contextTheme,
    }
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleBodyChange = (e) => {
    this.setState({body: e.target.value});
  }

  onSubmitEventHandler = (e) => {
    e.preventDefault();
    this.props.handleAddNote({title: this.state.title, body: this.state.body});
  }

  render() {
    return (
        <>
        <header className='notes-app__header d-flex align-items-center gap-2'>
            <Link to={'/'}><MdKeyboardBackspace className={this.state.contextTheme.theme === 'dark' ? 'text-white' : 'text-dark'} size={32} /></Link>
            <h1 className='mb-0'>Add Note</h1>
        </header>
        <main>
          <form className='note-input' onSubmit={this.onSubmitEventHandler}>
            <input type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange} />
            <input type="text" placeholder="Body" value={this.state.body} onChange={this.handleBodyChange} />
            <button type="submit">{this.state.contextLang.lang === 'id' ? 'Tambah' : 'Add'}</button>
          </form>
        </main>
      </>
    )
  }
}

AddPage.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
  localeContext: PropTypes.object.isRequired,
}

export default AddPageWrapper