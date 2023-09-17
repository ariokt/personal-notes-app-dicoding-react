import React, { Component, useContext } from 'react'
import { archiveNote, deleteNote, getActiveNotes } from '../../utils/api';
import NotesList from '../../components/NotesList';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import { IoIosAddCircleOutline, IoMdMoon, IoMdSunny } from "react-icons/io";
import { MdOutlineArchive, MdLogout, MdOutlineGTranslate } from "react-icons/md";
import PropTypes from 'prop-types';
import LocaleContext from '../../contexts/LocaleContext';

const HomePageWrapper = () => {
  const navigate = useNavigate();
  const localeContext = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
      setSearchParams({ keyword });
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  return (
      <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} handleLogout={handleLogout} localeContext={localeContext} />
  )
}

class HomePage extends Component {
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
    const allNotes = await getActiveNotes();
    this.setState({notes: allNotes.data, loading: false})
  }

  handleDelete = async (id) => {
    const response = await deleteNote(id);
    if (response.error === false) {
      const allNotes = await getActiveNotes();
      this.setState({notes: allNotes.data});
    }
  }

  handleArchive = async (id) => {
    const response = await archiveNote(id);
    if (response.error === false) {
      const allNotes = await getActiveNotes();
      this.setState({notes: allNotes.data});
    }
  }

  handleLang = () => {
    if (this.props.localeContext.contextLang.lang === 'id') {
      this.props.localeContext.contextLang.handleLang('eng');
      localStorage.setItem('lang', 'eng');
    } else {
      this.props.localeContext.contextLang.handleLang('id');
      localStorage.setItem('lang', 'id');
    }
  }

  handleTheme = () => {
    if (this.props.localeContext.contextTheme.theme === 'light') {
      this.props.localeContext.contextTheme.handleTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.props.localeContext.contextTheme.handleTheme('light');
      localStorage.setItem('theme', 'light');
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
        <header className='notes-app__header justify-content-between'>
            <div className='d-flex flex-column flex-md-row gap-md-2'>
              <h1>Ario Notes</h1>
              <div className='d-flex gap-2 justify-content-center align-items-center'>
                <MdOutlineGTranslate style={{fontSize:"32px"}} onClick={this.handleLang} />
                {this.props.localeContext.contextTheme.theme === 'light' ? <IoMdMoon style={{fontSize:"32px"}} onClick={this.handleTheme} /> : <IoMdSunny style={{fontSize:"32px"}} onClick={this.handleTheme} />}
              </div>
            </div>
            <div className='d-flex gap-2'>
              <Link to={'/notes/add'} className='d-flex align-items-center p-2 notes-app__header-button bg-white'>
                <IoIosAddCircleOutline />
                <div>Add</div>
              </Link>
              <Link  to={'/archived-note'} className='d-flex align-items-center p-2 notes-app__header-button bg-white'>
                <MdOutlineArchive />
                <div>Archived</div>
              </Link>
              <button className='d-flex align-items-center p-2 notes-app__header-button bg-white' onClick={this.props.handleLogout}>
                <MdLogout />
                <div>Logout</div>
              </button>
            </div>
        </header>
        <main>
            <SearchBar defaultKeyword={this.props.defaultKeyword} keywordChange={this.props.keywordChange} />
            <h2>{this.state.contextLang.lang === 'id' ? "Daftar Catatan" : "Note List"}</h2>
            <NotesList notes={displayedNotes} handleDelete={this.handleDelete} handleArchive={this.handleArchive} />
        </main>
      </>
    )
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  localeContext: PropTypes.object.isRequired,
}

export default HomePageWrapper;
