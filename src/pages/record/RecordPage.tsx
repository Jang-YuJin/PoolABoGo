import React, { useState } from 'react';
import { savePlantRecord } from '../../utils/plantRecordService';
import { PlantStatus, type PlantStatusType } from '../../models/record';

const RecordPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');
  const [plantName, setPlantName] = useState('');
  const [plantDesc, setPlantDesc] = useState('');
  const [plantStatus, setPlantStatus] = useState<PlantStatusType | string>(PlantStatus.UNKNOWN);
  const [plantCaution, setPlantCaution] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      setError('이미지를 선택해주세요.');
      return;
    }

    if (!userId) {
      setError('사용자 ID를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const recordId = await savePlantRecord({
        imageFile,
        userId,
        plantName,
        plantDesc,
        plantStatus,
        plantCaution
      });
      setResult(`저장 완료! 기록 ID: ${recordId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>식물 기록 저장 테스트</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            사용자 ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Firebase Auth UID"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            식물 이미지:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
          {imageFile && (
            <div style={{ marginTop: '5px', fontSize: '14px', color: '#666' }}>
              선택된 파일: {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            식물 이름 (Gemini API 응답):
            <input
              type="text"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="예: 장미"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            식물 설명 (Gemini API 응답):
            <textarea
              value={plantDesc}
              onChange={(e) => setPlantDesc(e.target.value)}
              placeholder="식물에 대한 설명"
              style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            식물 상태 (Gemini API 응답):
            <select
              value={plantStatus}
              onChange={(e) => setPlantStatus(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value={PlantStatus.HEALTHY}>건강 (healthy)</option>
              <option value={PlantStatus.WARNING}>주의 (warning)</option>
              <option value={PlantStatus.CRITICAL}>위험 (critical)</option>
              <option value={PlantStatus.UNKNOWN}>알 수 없음 (unknown)</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            주의사항 (Gemini API 응답):
            <textarea
              value={plantCaution}
              onChange={(e) => setPlantCaution(e.target.value)}
              placeholder="재배 시 주의사항"
              style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? '저장 중...' : '저장하기'}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
          오류: {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#efe', color: '#060', borderRadius: '4px' }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default RecordPage;
