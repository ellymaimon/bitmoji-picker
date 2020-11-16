import { useState } from 'react';
import BitmojiButton from './BitmojiPicker';
import faunadb from 'faunadb';

function App() {
  const [bitmojiURL, setBitmojiURL] = useState(null);

  const saveToDB = () => {
    if ( !bitmojiURL ) {
      return;
    }
    const database = new faunadb.Client({ secret: process.env.REACT_APP_DB_KEY });
    const q = faunadb.query;

    database.query(
      q.Create(
        q.Collection('bitmojis'),
        { data: { url: bitmojiURL } },
      )
    )
  }

  return (
    <div className='container'>
      <BitmojiButton setBitmojiURL={setBitmojiURL} />
      <button
        onClick={saveToDB}
        disabled={!bitmojiURL}
      >
        Save to DB
      </button>
      {bitmojiURL && <img src={bitmojiURL} alt='chosen bitmoji' /> }
    </div>
  );
}

export default App;
