import { DiaryEntry } from '../types';

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Flight diaries</h2>
      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
          </div>
        ))}
      </div>
    </>
  );
};

export default Diaries;
