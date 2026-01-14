import React, { useState } from 'react'
import useGetAiResponse from '../../hooks/useGetAiResponse';

const AiSample = () => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const {data, isLoading, refetch} = useGetAiResponse(file);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    refetch();
  };

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
        <button onClick={handleSubmit} disabled={!file}>
          업로드
        </button>
      </div>
      {isLoading
      ? <div>loading...</div>
      : (<div>
          <div>식물 이름: {data?.plantName}</div>
          <div>식물 설명: {data?.plantDesc}</div>
          <div>식물 상태: {data?.plantStatus}</div>
          <div>식물 주의사항: {data?.plantCaution}</div>
        </div>)}
    </div>
  )
}

export default AiSample
