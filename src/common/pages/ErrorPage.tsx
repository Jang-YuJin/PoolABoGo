import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

// 에러 페이지
function ErrorPage() {
  const error = useRouteError();
  console.error('에러 발생:', error);

  // 라우터 에러
  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>오류가 발생했습니다</h1>
        <h2>{error.status} - {error.statusText}</h2>
        {error.data?.message && <p>{error.data.message}</p>}
        <button onClick={() => window.location.reload()}>새로고침</button>
      </div>
    );
  }

  // 일반 JavaScript 에러
  return (
    <div style={{ padding: '20px' }}>
      <h1>오류가 발생했습니다</h1>
      <p>{error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}</p>
      <button onClick={() => window.location.reload()}>새로고침</button>
    </div>
  );
}

export default ErrorPage;
