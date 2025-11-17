import * as XLSX from 'xlsx';
import type { ParsedSalesData } from '../types';

/**
 * 엑셀 파일을 읽어서 파싱합니다.
 * @param file - 엑셀 파일
 * @returns ParsedSalesData 배열
 */
export const parseExcelFile = async (file: File): Promise<ParsedSalesData[]> => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

  // 엑셀 데이터를 API 규격에 맞게 변환
  // 예상 엑셀 형식: 상품명 | 수량 | 단가
  return jsonData.map((row, index) => ({
    productName: String(row['상품명'] || row['productName'] || ''),
    quantity: Number(row['수량'] || row['quantity'] || 0),
    unitPrice: Number(row['단가'] || row['unitPrice'] || 0),
    rowNumber: index + 2, // 헤더 행 제외
  }));
};

