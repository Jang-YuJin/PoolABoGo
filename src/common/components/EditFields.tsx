import React from "react";
import { Box, Typography, styled } from "@mui/material";

type EditFieldsProps = {
  label: string;
  value: string;
};

const EditFields = ({ label, value }: EditFieldsProps) => {
  const isEmpty = value.trim().length === 0;
  const displayText = isEmpty ? `${label}에 대한 값입니다` : value;

  return (
    <Field>
      <Label>{label}</Label>
      <ValueText data-empty={isEmpty}>{displayText}</ValueText>
    </Field>
  );
};

export default EditFields;

// 스타일드 컴포넌트
const Field = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: "1.111rem",
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

const ValueText = styled("p")(({ theme }) => ({
  margin: 0,
  padding: "12px 12px",
  borderRadius: 10,
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontSize: "1.222rem",
  "&[data-empty='true']": {
    // 데이터 값이 없을 때
    opacity: 0.7,
  },
}));
