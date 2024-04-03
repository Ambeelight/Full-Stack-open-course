import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaries';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            {diary.date} {diary.visibility} {diary.weather} {diary.comment}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
