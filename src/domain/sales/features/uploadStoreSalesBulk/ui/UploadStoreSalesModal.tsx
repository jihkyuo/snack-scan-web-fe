import { useUploadStoreSalesBulk } from '@/domain/sales/features/uploadStoreSalesBulk/hooks/useUploadStoreSalesBulk';
import { ExcelUploadDragger } from '@/domain/sales/features/uploadStoreSalesBulk/ui/ExcelUploadDragger';
import { SalesPreviewTable } from '@/domain/sales/features/uploadStoreSalesBulk/ui/SalesPreviewTable';
import { TemplateDownloadSection } from '@/domain/sales/features/uploadStoreSalesBulk/ui/TemplateDownloadSection';
import { useParams } from '@tanstack/react-router';
import { Button, Modal } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const UploadStoreSalesModal = ({ open, onClose }: Props) => {
  const { storeId } = useParams({ from: '/stores/$storeId' });
  const {
    parsedData,
    uploading,
    fileList,
    contextHolder,
    handleFileUpload,
    handleUpload,
    setFileList,
    reset,
  } = useUploadStoreSalesBulk({
    storeId: Number(storeId),
    onSuccess: onClose,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="매출 일괄 업로드"
      width={800}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          취소
        </Button>,
        <Button
          key="upload"
          type="primary"
          onClick={handleUpload}
          loading={uploading}
          disabled={parsedData.length === 0}
        >
          업로드
        </Button>,
      ]}
    >
      {contextHolder}
      <div style={{ marginBottom: 16 }}>
        <TemplateDownloadSection />
        <ExcelUploadDragger
          fileList={fileList}
          onFileUpload={handleFileUpload}
          onRemove={reset}
          onSetFileList={setFileList}
        />
      </div>
      <SalesPreviewTable data={parsedData} />
    </Modal>
  );
};
