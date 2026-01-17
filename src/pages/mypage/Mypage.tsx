import { Alert, styled, Typography } from "@mui/material";
import PlantsCard, { SkeletonPlantsCard } from "../../common/components/PlantsCard";
import { useGetUserPlantsRecords } from "../../hooks/useGetUserPlantsRecords";
import { useEffect, useRef } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";

// 마이페이지
// 로그인한 유저만 접근 가능, 로그인 안 되어 있으면 로그인으로 리다이렉션
// 저장된 나의 반려식물 카드 보임-> 무한스크롤구현
// 카드는 pc : 3 / tablet : 2 / mo : 1 씩 보임
const MyPage = () => {
  const { user } = useAuthUser();
  const userId = user!.uid;

  const {
    data,
    isLoading: isPlantsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetUserPlantsRecords(userId);

  const records = data?.flatItems ?? [];
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!hasNextPage) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) return <Alert severity="error">식물 기록을 불러오지 못했어요.</Alert>;

  return (
    <div>
      <Typography variant="h1">나의 반려식물 둘러보기</Typography>

      <CardWrap>
        {isPlantsLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonPlantsCard key={index} variant="rectangular" />
          ))
        ) : records.length === 0 ? (
          <Alert severity="error">아직 저장된 기록이 없어요.</Alert>
        ) : (
          records.map((record) => <PlantsCard key={record.id} record={record} />)
        )}
      </CardWrap>

      {/* 무한스크롤 */}
      {hasNextPage && <div ref={sentinelRef} style={{ height: 1 }} />}

      {isFetchingNextPage && (
        <CardWrap>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonPlantsCard key={`next-${index}`} variant="rectangular" />
          ))}
        </CardWrap>
      )}
    </div>
  );
};

export default MyPage;

const CardWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",

  marginTop: "40px",

  [theme.breakpoints.down("md")]: {
    marginTop: "30px",
    gap: "15px",
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
    gap: "12px",
  },
}));
