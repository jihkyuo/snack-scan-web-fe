import { salesQueryKeys } from '@/domain/sales/entities/sales.query';
import { addStoreSalesBulkApi } from '@/domain/sales/entities/sales.service';
import type { ParsedSalesData } from '@/domain/sales/features/uploadStoreSalesBulk/types';
import { parseExcelFile } from '@/domain/sales/features/uploadStoreSalesBulk/utils/excelParser';
import { validateSalesData } from '@/domain/sales/features/uploadStoreSalesBulk/utils/validateSalesData';
import { useQueryClient } from '@tanstack/react-query';
import type { UploadFile } from 'antd';
import { message } from 'antd';
import { useState } from 'react';

interface UseUploadStoreSalesBulkProps {
  storeId: number;
  onSuccess?: () => void;
}

export const useUploadStoreSalesBulk = ({
  storeId,
  onSuccess,
}: UseUploadStoreSalesBulkProps) => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [parsedData, setParsedData] = useState<ParsedSalesData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 엑셀 파일 업로드 및 파싱
  const handleFileUpload = async (file: File) => {
    try {
      const parsed = await parseExcelFile(file);

      // 데이터 검증
      const { validData, invalidCount } = validateSalesData(parsed, (item) => {
        messageApi.warning(
          `${item.rowNumber}행: 잘못된 데이터가 있습니다. (상품명: ${item.productName}, 수량: ${item.quantity}, 단가: ${item.unitPrice})`
        );
      });

      if (validData.length === 0) {
        messageApi.error('유효한 데이터가 없습니다.');
        return;
      }

      setParsedData(validData);

      if (invalidCount > 0) {
        messageApi.success(
          `${validData.length}개의 데이터를 읽었습니다. (${invalidCount}개 제외)`
        );
      } else {
        messageApi.success(`${validData.length}개의 데이터를 읽었습니다.`);
      }
    } catch (error) {
      console.error('파일 파싱 에러:', error);
      messageApi.error('파일을 읽는 중 오류가 발생했습니다.');
    }
  };

  // API로 데이터 전송
  const handleUpload = async () => {
    if (parsedData.length === 0) {
      messageApi.warning('업로드할 데이터가 없습니다.');
      return;
    }

    setUploading(true);

    try {
      const salesList = parsedData.map(
        ({ productName, quantity, unitPrice }) => ({
          productName,
          quantity,
          unitPrice,
        })
      );

      await addStoreSalesBulkApi(storeId, { salesList });

      messageApi.success(`${parsedData.length}개 데이터 업로드 완료`);

      // 쿼리 캐시 무효화하여 목록 새로고침
      queryClient.invalidateQueries(salesQueryKeys.store.list(storeId));

      // 성공 콜백 호출 및 상태 초기화
      onSuccess?.();
      reset();
    } catch (error) {
      console.error('업로드 에러:', error);
      messageApi.error('데이터 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  // 상태 초기화
  const reset = () => {
    setParsedData([]);
    setFileList([]);
  };

  return {
    parsedData,
    uploading,
    fileList,
    contextHolder,
    handleFileUpload,
    handleUpload,
    setFileList,
    reset,
  };
};
