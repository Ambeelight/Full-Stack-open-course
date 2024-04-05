import { useState } from 'react';
import axios from 'axios';
import { createDiary } from '../services/diaries';
import { Visibility, Weather, DiaryEntry } from '../types';

const DiaryForm = ({
  diaries,
  setDiaries,
  setMessage,
}: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('' as Weather);
  const [visibility, setVisibility] = useState('' as Visibility);
  const [comment, setComment] = useState('');

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      createDiary({ date, weather, visibility, comment }).then((data) =>
        setDiaries(diaries.concat(data))
      );
    } catch (error) {
      let errorMessage = 'Reason:';
      if (axios.isAxiosError(error)) {
        errorMessage += error.response?.data;
      }
      console.log('Error message:', errorMessage);
      setMessage(errorMessage);
    }

    setDate('');
    setWeather('' as Weather);
    setVisibility('' as Visibility);
    setComment('');
  };

  return (
    <>
      <h2>Add new diary</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date:
          <input
            type='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          weather: sunny
          <input
            type='radio'
            value={weather}
            checked={weather === 'sunny'}
            onChange={() => setWeather('sunny' as Weather)}
          />
          rainy
          <input
            type='radio'
            value={weather}
            checked={weather === 'rainy'}
            onChange={() => setWeather('rainy' as Weather)}
          />
          cloudy
          <input
            type='radio'
            value={weather}
            checked={weather === 'cloudy'}
            onChange={() => setWeather('cloudy' as Weather)}
          />
          stormy
          <input
            type='radio'
            value={weather}
            checked={weather === 'stormy'}
            onChange={() => setWeather('stormy' as Weather)}
          />
          windy
          <input
            type='radio'
            value={weather}
            checked={weather === 'windy'}
            onChange={() => setWeather('windy' as Weather)}
          />
        </div>
        <div>
          visibility: great
          <input
            type='radio'
            value={visibility}
            checked={visibility === 'great'}
            onChange={() => setVisibility('great' as Visibility)}
          />
          good
          <input
            type='radio'
            value={visibility}
            checked={visibility === 'good'}
            onChange={() => setVisibility('good' as Visibility)}
          />
          ok
          <input
            type='radio'
            value={visibility}
            checked={visibility === 'ok'}
            onChange={() => setVisibility('ok' as Visibility)}
          />
          poor
          <input
            type='radio'
            value={visibility}
            checked={visibility === 'poor'}
            onChange={() => setVisibility('poor' as Visibility)}
          />
        </div>
        <div>
          comment:
          <input
            type='text'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default DiaryForm;
