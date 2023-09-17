import React, { Component, useContext } from 'react'
import { deleteNote, getArchivedNotes, unarchiveNote } from '../../utils/api';
import NotesList from '../../components/NotesList';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import { MdKeyboardBackspace } from "react-icons/md";
import PropTypes from 'prop-types';
import LocaleContext from '../../contexts/LocaleContext';

const ArchivedPageWrapper = () => {
    const localeContext = useContext(LocaleContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return (
        <ArchivedPage defaultKeyword={keyword} keywordChange={changeSearchParams} localeContext={localeContext} />
    )
}

class ArchivedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        notes: [],
        contextLang: this.props.localeContext.contextLang,
        contextTheme: this.props.localeContext.contextTheme,
    }
  }

  async componentDidMount() {
    const allArchivedNotes = await getArchivedNotes();
    this.setState({notes: allArchivedNotes.data, loading: false})
  }

  handleDelete = async (id) => {
    const response = await deleteNote(id);
    if (response.error === false) {
      const allArchivedNotes = await getArchivedNotes();
      this.setState({notes: allArchivedNotes.data});
    }
  }

  handleUnarchive = async (id) => {
    const response = await unarchiveNote(id);
    if (response.error === false) {
      const allArchivedNotes = await getArchivedNotes();
      this.setState({notes: allArchivedNotes.data});
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      )
    }
    
    let displayedNotes = this.state.notes;
    if (this.props.defaultKeyword) {
        displayedNotes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(
                this.props.defaultKeyword.toLowerCase()
            );
        });
    }
    return (
      <>
        <header className='notes-app__header d-flex align-items-center gap-2'>
            <Link to={'/'}><MdKeyboardBackspace className={this.state.contextTheme.theme === 'dark' ? 'text-white' : 'text-dark'} size={32} /></Link>
            <div className='mb-0'>Archived Note</div>
        </header>
        <main>
            <SearchBar defaultKeyword={this.props.defaultKeyword} keywordChange={this.props.keywordChange} />
            <h2>{this.state.contextLang.lang === 'id' ? "Daftar Catatan Terarsip" : "Archived Note List"}</h2>
            <NotesList notes={displayedNotes} handleDelete={this.handleDelete} handleUnarchive={this.handleUnarchive} />
        </main>
      </>
    )
  }
}

ArchivedPage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  localeContext: PropTypes.object.isRequired,
}

export default ArchivedPageWrapper;