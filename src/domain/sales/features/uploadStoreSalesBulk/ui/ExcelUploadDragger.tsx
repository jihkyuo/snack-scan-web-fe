import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Upload } from 'antd';

interface Props {
  fileList: UploadFile[];
  onFileUpload: (file: File) => void;
  onRemove: () => void;
  onSetFileList: (fileList: UploadFile[]) => void;
}

export const ExcelUploadDragger = ({
  fileList,
  onFileUpload,
  onRemove,
  onSetFileList,
}: Props) => {
  return (
    <Upload.Dragger
      accept=".xlsx,.xls"
      maxCount={1}
      fileList={fileList}
      beforeUpload={(file) => {
        onSetFileList([file]);
        onFileUpload(file);
        return false; // 자동 업로드 방지
      }}
      onRemove={onRemove}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        클릭하거나 파일을 드래그하여 업로드하세요
      </p>
      <p className="ant-upload-hint">
        엑셀 파일 (.xlsx, .xls) 지원
        <br />
        형식: 상품명 | 수량 | 단가
      </p>
    </Upload.Dragger>
  );
};

