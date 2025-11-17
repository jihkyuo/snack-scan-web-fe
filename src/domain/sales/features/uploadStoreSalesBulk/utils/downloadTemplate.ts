import * as XLSX from 'xlsx';

/**
 * 매출 데이터 업로드용 엑셀 템플릿을 다운로드합니다.
 */
export const downloadSalesTemplate = () => {
  // 템플릿 예시 데이터
  const templateData = [
    { 상품명: '초코파이', 수량: 10, 단가: 1500 },
    { 상품명: '새우깡', 수량: 20, 단가: 1000 },
    { 상품명: '포카칩', 수량: 15, 단가: 2000 },
  ];

  // 워크시트 생성
  const worksheet = XLSX.utils.json_to_sheet(templateData);
  
  // 컬럼 너비 설정
  worksheet['!cols'] = [
    { wch: 20 }, // 상품명
    { wch: 10 }, // 수량
    { wch: 10 }, // 단가
  ];

  // 워크북 생성
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '매출');

  // 파일 다운로드
  const fileName = `매출_업로드_템플릿_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

