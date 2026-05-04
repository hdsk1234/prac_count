import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

// DB와 통신할 클라이언트 생성
const client = generateClient<Schema>();

function App() {
  const [count, setCount] = useState(0);
  const [recordId, setRecordId] = useState<string | null>(null);

  // 1. 앱 실행 시 DB에서 데이터 불러오기
  useEffect(() => {
    const fetchCount = async () => {
      const { data: items } = await client.models.Counter.list();
      
      if (items.length > 0) {
        // 기존 데이터가 있으면 불러옴
        setCount(items[0].value || 0);
        setRecordId(items[0].id);
      } else {
        // 데이터가 없으면 DB에 초기값 0으로 새 레코드 생성
        const { data: newRecord } = await client.models.Counter.create({ value: 0 });
        if (newRecord) setRecordId(newRecord.id);
      }
    };
    fetchCount();
  }, []);

  // 2. 버튼 클릭 시 DB 값 업데이트
  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount); // 화면 즉시 반영

    if (recordId) {
      await client.models.Counter.update({
        id: recordId,
        value: newCount
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <button 
        onClick={handleIncrement}
        style={{ fontSize: '24px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {count}
      </button>
    </div>
  );
}

export default App;