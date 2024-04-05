import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaries';
import DiaryForm from './components/DiaryForm';
import Diaries from './components/Diaries';
import Notification from './components/Notification';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <>
      <Notification message={notification} />
      <DiaryForm
        diaries={diaries}
        setDiaries={setDiaries}
        setMessage={setNotification}
      />
      <Diaries diaries={diaries} />
    </>
  );
}

export default App;
